import { domainToASCII } from "node:url";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const BOOTSTRAP_URL = "https://data.iana.org/rdap/dns.json";
const MAX_BOOTSTRAP_AGE = 24 * 60 * 60 * 1000;
let bootstrapCache;

function normalizeDomain(input) {
  const candidate = input.trim().replace(/\.$/, "");
  if (!candidate || candidate.includes("://") || /[\s/@?#]/.test(candidate)) {
    return null;
  }

  const asciiDomain = domainToASCII(candidate).toLowerCase();
  if (
    !asciiDomain ||
    asciiDomain.length > 253 ||
    !asciiDomain.includes(".") ||
    asciiDomain.split(".").some((label) =>
      !label || label.length > 63 || !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label)
    )
  ) {
    return null;
  }

  return asciiDomain;
}

async function getBootstrap() {
  if (bootstrapCache && Date.now() - bootstrapCache.loadedAt < MAX_BOOTSTRAP_AGE) {
    return bootstrapCache.data;
  }

  const response = await fetch(BOOTSTRAP_URL, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(7000),
    next: { revalidate: 86400 },
  });
  if (!response.ok) throw new Error("Registry directory is temporarily unavailable.");

  const data = await response.json();
  if (!Array.isArray(data.services)) throw new Error("Registry directory response was invalid.");
  bootstrapCache = { data, loadedAt: Date.now() };
  return data;
}

function findRegistryUrls(domain, bootstrap) {
  const labels = domain.split(".");
  const matches = [];

  for (const service of bootstrap.services) {
    const [suffixes, urls] = service;
    if (!Array.isArray(suffixes) || !Array.isArray(urls)) continue;

    for (const suffix of suffixes) {
      const normalizedSuffix = String(suffix).toLowerCase().replace(/^\./, "");
      if (domain === normalizedSuffix || domain.endsWith(`.${normalizedSuffix}`)) {
        matches.push({ suffix: normalizedSuffix, urls });
      }
    }
  }

  matches.sort((left, right) => right.suffix.length - left.suffix.length);
  for (const match of matches) {
    const secureUrls = match.urls.filter((value) => {
      try {
        const url = new URL(value);
        return url.protocol === "https:" && !url.username && !url.password;
      } catch {
        return false;
      }
    });
    if (secureUrls.length) return secureUrls;
  }

  return [];
}

function vcardValue(entity, propertyName) {
  const vcard = entity?.vcardArray;
  if (!Array.isArray(vcard) || !Array.isArray(vcard[1])) return "";
  const property = vcard[1].find((item) => String(item[0]).toLowerCase() === propertyName);
  return property?.[3] ? String(property[3]) : "";
}

function findEntities(entities = [], role) {
  const found = [];
  for (const entity of entities) {
    if (entity.roles?.includes(role)) found.push(entity);
    found.push(...findEntities(entity.entities, role));
  }
  return found;
}

function parseRegistration(data, domain) {
  const entities = data.entities || [];
  const registrar = findEntities(entities, "registrar")[0];
  const abuse = findEntities(entities, "abuse")[0];
  const eventValue = (actions) => {
    const event = data.events?.find((item) => actions.includes(item.eventAction?.toLowerCase()));
    return event?.eventDate || null;
  };

  return {
    domain,
    handle: data.handle || null,
    ldhName: data.ldhName || domain,
    unicodeName: data.unicodeName || null,
    status: Array.isArray(data.status) ? data.status : [],
    registrar: registrar ? {
      name: vcardValue(registrar, "fn") || registrar.handle || null,
      url: registrar.links?.find((link) => link.rel === "about" && link.href?.startsWith("https://"))?.href || null,
    } : null,
    dates: {
      registered: eventValue(["registration"]),
      updated: eventValue(["last changed", "last update of rdap database"]),
      expires: eventValue(["expiration", "expiry"]),
    },
    nameservers: (data.nameservers || []).map((item) => item.ldhName || item.unicodeName).filter(Boolean),
    dnssec: data.secureDNS?.delegationSigned === true ? "Signed" : data.secureDNS?.delegationSigned === false ? "Not signed" : "Not reported",
    abuse: abuse ? {
      email: vcardValue(abuse, "email") || null,
      phone: vcardValue(abuse, "tel") || null,
    } : null,
    source: new URL(data.links?.find((link) => link.rel === "self" && link.href?.startsWith("https://"))?.href || BOOTSTRAP_URL).hostname,
    notice: "Some registries redact or omit registration details. Missing fields are not necessarily an error.",
  };
}

export async function GET(request) {
  const domain = normalizeDomain(new URL(request.url).searchParams.get("domain") || "");
  if (!domain) {
    return NextResponse.json(
      { error: "Enter a valid domain name, such as example.com. Do not include a URL or path." },
      { status: 400 }
    );
  }

  try {
    const bootstrap = await getBootstrap();
    const registryUrls = findRegistryUrls(domain, bootstrap);
    if (!registryUrls.length) {
      return NextResponse.json(
        { error: `No secure RDAP registry is currently listed for .${domain.split(".").at(-1)}.` },
        { status: 422 }
      );
    }

    let lastFailure;
    for (const registryUrl of registryUrls) {
      try {
        const endpoint = new URL(`domain/${encodeURIComponent(domain)}`, registryUrl.endsWith("/") ? registryUrl : `${registryUrl}/`);
        const response = await fetch(endpoint, {
          headers: { Accept: "application/rdap+json, application/json" },
          redirect: "manual",
          signal: AbortSignal.timeout(8000),
          cache: "no-store",
        });

        if ([301, 302, 303, 307, 308].includes(response.status)) {
          lastFailure = new Error("The registry requires a redirect that could not be verified.");
          continue;
        }
        if (response.status === 404) {
          return NextResponse.json(
            { error: "This domain was not found in the registry, or the registry does not expose its record through RDAP." },
            { status: 404 }
          );
        }
        if (response.status === 429) {
          return NextResponse.json(
            { error: "The registry is rate-limiting lookups. Please wait a moment and try again." },
            { status: 429, headers: { "Retry-After": response.headers.get("retry-after") || "30" } }
          );
        }
        if (!response.ok) {
          lastFailure = new Error(`Registry returned status ${response.status}.`);
          continue;
        }

        const data = await response.json();
        if (!data || typeof data !== "object" || data.errorCode) {
          lastFailure = new Error("Registry returned an invalid response.");
          continue;
        }

        return NextResponse.json(parseRegistration(data, domain), {
          headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
        });
      } catch (error) {
        lastFailure = error;
      }
    }

    console.error("RDAP lookup failed:", lastFailure?.message || "No registry response");
    return NextResponse.json(
      { error: "The domain registry could not be reached. Try again shortly." },
      { status: 502 }
    );
  } catch (error) {
    console.error("RDAP service error:", error.message);
    return NextResponse.json(
      { error: "The registry directory is temporarily unavailable. Try again shortly." },
      { status: 502 }
    );
  }
}