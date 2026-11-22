/**
 * Central affiliate registry (manual layer).
 *
 * Brand -> affiliate URL mapping for RankStack commercial CTAs.
 *
 * - `lib/affiliates.generated.js` is machine-generated from `affiliatelinks.txt`
 *   by `scripts/import-affiliates.js` (npm run affiliates:sync). Do NOT edit the
 *   generated file by hand; edit `affiliatelinks.txt` and re-run the sync.
 * - Everything in THIS file is manual configuration and is never overwritten
 *   by the importer (aliases, redirects, display-name overrides).
 *
 * URLs are the exact affiliate tracking URLs supplied by each program
 * (Impact, direct merchant programs, etc.). Never strip or alter query
 * parameters when consuming them.
 */
import { AFFILIATE_ENTRIES } from "./affiliates.generated";

/** Display-name overrides for entries whose source name is incomplete. */
const MANUAL_NAMES = {
  accuwebhosting: "AccuWeb Hosting",
  "domain-com": "Domain.com",
  "network-solutions": "Network Solutions",
  "miss-hosting": "MissHosting",
  "liquid-web": "Liquid Web",
  "ats-space-web-hosting": "ATS Space Web Hosting",
  "name-com": "Name.com",
  scalahosting: "ScalaHosting",
  jethost: "JetHost",
  greengeeks: "GreenGeeks",
  interserver: "InterServer",
  chemicloud: "ChemiCloud",
  veerotech: "VeeroTech",
  ionos: "IONOS",
  godaddy: "GoDaddy",
  hostiso: "Hostiso",
  cloud86: "Cloud86",
  webcentral: "Webcentral",
  hostmetro: "Hostmetro",
};

/**
 * Canonical redirects. A2 Hosting was folded into Hosting.com: there is no
 * separate A2 affiliate record, and every A2 spelling resolves to the same
 * Hosting.com registry entry (including its deep links).
 */
const BRAND_REDIRECTS = {
  a2hosting: "hosting-com",
  "a2-hosting": "hosting-com",
  "a2 hosting": "hosting-com",
  "a2hosting.com": "hosting-com",
  "www.a2hosting.com": "hosting-com",
  "a2 hosting turbo": "hosting-com",
};

/**
 * Extra lookup aliases (slug -> alias strings). Used when a caller passes a
 * friendly brand name instead of the canonical slug.
 * Keep these conservative: spelling/spacing variants only, never across brands.
 */
const MANUAL_ALIASES = {
  hostgator: ["host gator"],
  "inmotion-hosting": ["inmotion", "in motion hosting", "inmotion hosting"],
  bluehost: ["blue host"],
  "domain-com": ["domain.com"],
  "network-solutions": ["network solutions"],
  "10web": ["10 web"],
  "crazy-domains": ["crazydomains", "crazy domains"],
  "hosting-com": ["hosting.com", "hosting com", "a2hosting", "a2 hosting", "a2-hosting"],
  fastcomet: ["fast comet"],
  hostinger: ["hostinger hosting"],
  hostarmada: ["host armada", "hostarmada hosting"],
  accuwebhosting: ["accuweb", "accu web", "accuweb hosting", "accu web hosting"],
  hostpapa: ["host papa"],
  "miss-hosting": ["misshosting", "miss hosting", "missaffiliate"],
  "liquid-web": ["liquidweb", "liquid web hosting"],
  "ats-space-web-hosting": ["atspace", "ats space", "atsspace"],
  scalahosting: ["scala hosting", "scala hosting"],
  jethost: ["jet hosting", "jethosting"],
  greengeeks: ["green geeks", "greengeeks.com"],
  interserver: ["inter server", "interserver.net"],
  chemicloud: ["chemi cloud"],
  "name-com": ["name.com"],
  veerotech: ["veero tech"],
  hostiso: ["host iso"],
  smarterasp: ["smarter asp", "smarterasp.net"],
  cloud86: ["cloud 86"],
  hostmetro: ["host metro"],
  webcentral: ["web central"],
  godaddy: ["go daddy"],
  ionos: ["1&1", "ionos.com"],
  "google-workspace": ["google workspace", "workspace.google.com"],
  "microsoft-365": ["microsoft 365", "office 365"],
  "zoho-mail": ["zoho mail"],
  "proton-mail": ["proton mail"],
  fastmail: ["fast mail"],
  cloudways: ["cloud ways"],
  krystal: ["krystal hosting"],
  rackspace: ["rackspace email"],
  icewarp: ["ice warp"],
  hostpresto: ["host presto"],
  eukhost: ["euk host", "eukhost.com"],
};

const INDEX = new Map(); // key (slug or alias) -> entry

function put(key, entry) {
  const k = String(key).toLowerCase().trim();
  if (!k) return;
  if (!INDEX.has(k)) INDEX.set(k, entry);
}

for (const raw of AFFILIATE_ENTRIES) {
  const entry = {
    ...raw,
    name: MANUAL_NAMES[raw.slug] || raw.name,
    variants: raw.variants || [],
  };
  put(raw.slug, entry);
  put(entry.name, entry);
}

for (const [slug, aliases] of Object.entries(MANUAL_ALIASES)) {
  const entry = INDEX.get(slug);
  if (!entry) continue;
  for (const a of aliases) put(a, entry);
}

/** All registry entries (canonical order, including PENDING placeholders). */
export const AFFILIATES = AFFILIATE_ENTRIES.map((raw) => INDEX.get(raw.slug));

/** Look up an affiliate entry by slug or alias (case-insensitive). */
export function getAffiliate(brand) {
  if (!brand) return undefined;
  const key = String(brand).toLowerCase().trim();
  const canonical = BRAND_REDIRECTS[key] || key;
  return INDEX.get(canonical);
}

/**
 * Resolve a brand to its production affiliate tracking URL.
 * Returns `undefined` for unknown OR pending brands — callers must never
 * substitute another brand's URL when this happens.
 */
export function getAffiliateUrl(brand) {
  const entry = getAffiliate(brand);
  if (!entry || entry.enabled === false) return undefined;
  return entry.affiliateUrl || undefined;
}

/** True when a brand is known but still awaiting a real affiliate URL. */
export function isAffiliatePending(brand) {
  const entry = getAffiliate(brand);
  return Boolean(entry && (entry.status === "pending" || entry.enabled === false));
}

/** Resolve a destination-specific variant URL (e.g. a supplied deep link). */
export function getAffiliateVariantUrl(brand, label) {
  const entry = getAffiliate(brand);
  if (!entry || entry.enabled === false || !entry.variants) return undefined;
  const v = entry.variants.find((x) => x.label === label);
  return v ? v.url : undefined;
}

export default getAffiliateUrl;
