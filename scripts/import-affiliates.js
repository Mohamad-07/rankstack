/* eslint-disable no-console */
/**
 * Affiliate registry importer / sync.
 *
 * Reads `affiliatelinks.txt` (the single source of truth for affiliate URLs),
 * validates it, and regenerates `lib/affiliates.generated.js`.
 *
 * Behaviour:
 * - Preserves every supplied URL exactly (tracking domains, query strings,
 *   identifiers and deep links untouched).
 * - Understands `# ACTIVE AFFILIATE LINKS` and `# PENDING AFFILIATE LINKS`
 *   sections plus inline `PENDING` markers.
 * - PENDING brands are valid entries with no affiliate URL; they emit no
 *   production href and are never counted as invalid URLs.
 * - Counts active URLs, pending URLs, invalid URLs and duplicate entries
 *   separately in the sync report.
 * - Never edits `lib/affiliates.js` (manual aliases / display overrides).
 * - Safe to re-run at any time; output is deterministic.
 *
 * Usage: node scripts/import-affiliates.js   (npm run affiliates:sync)
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const SOURCE = path.join(root, "affiliatelinks.txt");
const OUT = path.join(root, "lib", "affiliates.generated.js");

if (!fs.existsSync(SOURCE)) {
  console.error(`ERROR: source file not found: ${SOURCE}`);
  process.exit(1);
}

const raw = fs.readFileSync(SOURCE, "utf8");
const lines = raw.split(/\r?\n/);

const report = {
  sourceEntries: 0,
  activeUrls: new Set(),
  pendingEntries: 0,
  variants: 0,
  bannerUrlsSkipped: 0,
  duplicates: [],
  invalid: [],
  warnings: [],
  brandOrder: [],
};

function slugify(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidUrl(u) {
  try {
    const parsed = new URL(u);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/** Derive a fallback brand name from a URL host. */
function brandFromUrl(u) {
  try {
    const host = new URL(u).hostname.replace(/^www\./, "");
    return host.split(".")[0];
  } catch {
    return null;
  }
}

function labelFromText(text) {
  return slugify(String(text).replace(/links?$/i, "").trim()) || "alt";
}

const brands = new Map(); // slug -> entry
const urlOwners = new Map(); // exact URL -> Set of brand slugs
let current = null;
let bannerMode = false;
let section = "active";

function ensureBrand(name, forcedStatus) {
  const cleanName = String(name).trim();
  const slug = slugify(cleanName);
  if (!slug) return null;
  if (!brands.has(slug)) {
    brands.set(slug, {
      slug,
      name: cleanName,
      affiliateUrl: null,
      network: null,
      variants: [],
      evidence: [],
      status: forcedStatus || (section === "pending" ? "pending" : "active"),
    });
    report.brandOrder.push(slug);
  }
  const entry = brands.get(slug);
  if (forcedStatus === "pending" && !entry.affiliateUrl) entry.status = "pending";
  report.sourceEntries += 1;
  return entry;
}

function recordUrl(url, entry) {
  if (!urlOwners.has(url)) urlOwners.set(url, new Set());
  urlOwners.get(url).add(entry.slug);
}

function addVariant(entry, label, url) {
  if (!isValidUrl(url)) {
    report.invalid.push({ brand: entry.slug, url, reason: "malformed variant URL" });
    return;
  }
  if (entry.variants.some((v) => v.url === url)) {
    report.duplicates.push({ brand: entry.slug, url, reason: "duplicate variant URL" });
    return;
  }
  entry.variants.push({ label: label || "alt", url });
  report.variants += 1;
  recordUrl(url, entry);
}

function addPrimary(entry, url, label) {
  if (!isValidUrl(url)) {
    report.invalid.push({ brand: entry.slug, url, reason: "malformed affiliate URL" });
    return;
  }
  // A PENDING brand becomes active as soon as a real URL is supplied.
  if (entry.status === "pending") entry.status = "active";
  if (entry.affiliateUrl === null) {
    entry.affiliateUrl = url;
    if (label) entry.primaryLabel = label;
    recordUrl(url, entry);
  } else if (entry.affiliateUrl === url) {
    report.duplicates.push({ brand: entry.slug, url, reason: "duplicate of primary URL" });
  } else {
    addVariant(entry, label || "alt", url);
  }
}

function networkFor(url, htmlEvidence) {
  if (!url) return null;
  let host = "";
  try {
    host = new URL(url).hostname;
  } catch {
    return null;
  }
  // Evidence taken from affiliatelinks.txt itself: banner markup references
  // Impact's ad server for the tracking hosts below.
  const impactHosts = [
    "impactradius-go.com",
    "imp.pxf.io",
    "pvxt.net",
    "pxf.io",
    "sjv.io",
    "partners.inmotionhosting.com",
  ];
  if (impactHosts.some((h) => host === h || host.endsWith("." + h))) return "impact";
  // Merchant-owned affiliate platforms (link lives on the merchant's domain).
  const directHints = [
    "affiliate.fastcomet.com",
    "affiliates.hostarmada.com",
    "hostpapa.com",
    "hosting.com",
    "accuwebhosting.com",
  ];
  if (directHints.some((h) => host === h || host.endsWith("." + h))) return "direct";
  if (htmlEvidence && /impactradius-go\.com/.test(htmlEvidence)) return "impact";
  return "unknown";
}

function stripPendingToken(text) {
  return String(text)
    .replace(/[\[(]\s*PENDING\s*[\])]/gi, "")
    .replace(/\bPENDING\b/gi, "")
    .replace(/\s*[—–-]\s*$/, "")
    .replace(/^[\s:–—-]+/, "")
    .trim();
}

// --- Parse ------------------------------------------------------------------
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  if (!trimmed) continue;

  // Section markers and comments are always recognised, even inside banners.
  if (/^#\s*ACTIVE AFFILIATE LINKS\b/i.test(trimmed)) {
    section = "active";
    bannerMode = false;
    continue;
  }
  if (/^#\s*PENDING AFFILIATE LINKS\b/i.test(trimmed)) {
    section = "pending";
    bannerMode = false;
    continue;
  }
  if (trimmed.startsWith("#")) continue;

  if (current) current.evidence.push(trimmed);

  // Explicit PENDING entry header: `PENDING) Brand Name`.
  const pendingHeader = trimmed.match(/^PENDING\)\s*(.+)$/i);
  if (pendingHeader) {
    const name = stripPendingToken(pendingHeader[1]);
    if (name) current = ensureBrand(name, "pending");
    bannerMode = false;
    continue;
  }

  // Inline status line: `Status: PENDING`.
  const statusLine = trimmed.match(/^status\s*:\s*PENDING\b/i);
  if (statusLine) {
    if (current && !current.affiliateUrl) current.status = "pending";
    continue;
  }

  // --- Numbered entry header: `N) Name`, `N) Name: URL`, `N.M) URL` ---
  const header = trimmed.match(/^(\d+(?:\.\d+)?)\)\s*(.*)$/);
  if (header) {
    const num = header[1];
    let rest = header[2].trim();

    // Nested HTML noise inside banner blocks: `1) <!DOCTYPE html>` etc.
    if (rest.startsWith("<")) continue;

    const isPending = /\bPENDING\b/i.test(rest);
    if (isPending) rest = stripPendingToken(rest);

    // Nested numbered link inside an entry: `20) 1) https://...`
    const nested = rest.match(/^(\d+)\)\s*(https?:\/\/\S+)$/);
    if (nested) {
      const url = nested[2];
      const name = brandFromUrl(url) || (current && current.name) || "unknown";
      current = ensureBrand(name, isPending ? "pending" : undefined);
      bannerMode = false;
      if (current) addPrimary(current, url, null);
      continue;
    }

    // Sub-entry with only a URL: `17.1) https://...` -> variant of current brand.
    if (/^https?:\/\//.test(rest)) {
      const url = rest;
      if (num.includes(".")) {
        if (current) {
          const seg = (() => {
            try {
              const parts = new URL(url).pathname.split("/").filter(Boolean);
              return parts.length ? parts[parts.length - 1] : "homepage";
            } catch {
              return "alt";
            }
          })();
          addVariant(current, `deep:${slugify(seg)}`, url);
        } else {
          report.warnings.push(`line ${i + 1}: sub-entry URL with no current brand: ${url}`);
        }
      } else {
        const name = brandFromUrl(url) || "unknown";
        current = ensureBrand(name, isPending ? "pending" : undefined);
        bannerMode = false;
        if (current) addPrimary(current, url, null);
      }
      continue;
    }

    // Labeled link used as a header: `1) Affiliate link: https://...`
    const labeledAsHeader = rest.match(/^(.*?link)\s*:\s*(https?:\/\/\S+)$/i);
    if (labeledAsHeader && current && !/banner/i.test(rest)) {
      addPrimary(current, labeledAsHeader[2], labelFromText(labeledAsHeader[1]));
      continue;
    }

    // Plain brand header: `Name` or `Name: URL`
    const nameWithUrl = rest.match(/^(.*?):\s*(https?:\/\/\S+)$/);
    let name;
    let url = null;
    if (nameWithUrl) {
      name = nameWithUrl[1].trim();
      url = nameWithUrl[2];
    } else {
      name = rest.replace(/:$/, "").trim();
    }
    if (!name || /^(banner|affiliate\s*link|link)$/i.test(name)) continue;
    current = ensureBrand(name, isPending ? "pending" : undefined);
    bannerMode = false;
    if (current && url) addPrimary(current, url, null);
    continue;
  }

  // --- Banner sections: skip creative/pixel URLs until the next brand ---
  if (/banner/i.test(trimmed)) {
    bannerMode = true;
    continue;
  }
  if (bannerMode) {
    const found = trimmed.match(/https?:\/\/[^\s"'<>]+/g);
    if (found) report.bannerUrlsSkipped += found.length;
    continue;
  }
  if (trimmed.startsWith("<")) continue;

  // --- Labeled link line: `Affiliate link: URL`, `Deep link (x): URL` ---
  const labeled = trimmed.match(/^([^:]+?):\s*(https?:\/\/\S+)$/);
  if (labeled) {
    if (!current) {
      report.warnings.push(`line ${i + 1}: labeled link with no current brand: ${labeled[2]}`);
      continue;
    }
    addPrimary(current, labeled[2], labelFromText(labeled[1]));
    continue;
  }

  // --- Bare URL line ---
  const bare = trimmed.match(/^(https?:\/\/\S+)$/);
  if (bare && current) addPrimary(current, bare[1], null);
}

// --- Cross-brand duplicate detection ----------------------------------------
for (const [url, owners] of urlOwners.entries()) {
  if (owners.size > 1) {
    for (const slug of [...owners].slice(1)) {
      report.duplicates.push({ brand: slug, url, reason: "URL also used by another brand" });
    }
  }
}

// --- Finalize ----------------------------------------------------------------
const entries = [];
for (const slug of report.brandOrder) {
  const b = brands.get(slug);

  if (b.status === "pending") {
    report.pendingEntries += 1;
    entries.push({
      slug: b.slug,
      name: b.name,
      affiliateUrl: null,
      network: null,
      status: "pending",
      variants: [],
      enabled: false,
    });
    continue;
  }

  if (!b.affiliateUrl) {
    report.invalid.push({ brand: slug, url: null, reason: "active brand has no affiliate URL" });
    continue;
  }
  if (!isValidUrl(b.affiliateUrl)) {
    report.invalid.push({ brand: slug, url: b.affiliateUrl, reason: "malformed primary URL" });
    continue;
  }
  if (b.affiliateUrl.startsWith("http://")) {
    report.warnings.push(`${slug}: primary URL is http:// (not https): ${b.affiliateUrl}`);
  }
  b.network = networkFor(b.affiliateUrl, (b.evidence || []).join("\n"));
  report.activeUrls.add(b.affiliateUrl);
  for (const v of b.variants) report.activeUrls.add(v.url);
  entries.push({
    slug: b.slug,
    name: b.name,
    affiliateUrl: b.affiliateUrl,
    network: b.network,
    status: "active",
    variants: b.variants,
    enabled: true,
  });
}

// --- Serialize (deterministic) ----------------------------------------------
function serialize(e) {
  const variants = e.variants && e.variants.length
    ? `\n    variants: ${JSON.stringify(e.variants, null, 4).replace(/\n/g, "\n    ")},`
    : "";
  return `  {
    slug: ${JSON.stringify(e.slug)},
    name: ${JSON.stringify(e.name)},
    affiliateUrl: ${JSON.stringify(e.affiliateUrl)},
    network: ${JSON.stringify(e.network)},
    status: ${JSON.stringify(e.status)},${variants}
    enabled: ${e.enabled ? "true" : "false"},
  }`;
}

const out = `/**
 * GENERATED FILE — do not edit by hand.
 *
 * Source of truth: affiliatelinks.txt
 * Regenerate with: npm run affiliates:sync  (node scripts/import-affiliates.js)
 *
 * Affiliate URLs are preserved exactly as supplied by the affiliate programs
 * (tracking domains, query parameters, identifiers and deep links untouched).
 * PENDING entries have affiliateUrl: null and enabled: false; they never emit
 * a production href. Manual aliases/overrides live in lib/affiliates.js.
 */
export const AFFILIATE_ENTRIES = [
${entries.map(serialize).join(",\n")}
];

export default AFFILIATE_ENTRIES;
`;

fs.writeFileSync(OUT, out, "utf8");

// --- Sync report -------------------------------------------------------------
console.log("affiliatelinks.txt sync complete");
console.log(`  source entries parsed       : ${report.sourceEntries}`);
console.log(`  active affiliate URLs       : ${report.activeUrls.size}`);
console.log(`  pending affiliate URLs      : ${report.pendingEntries} (awaiting a real URL; no href emitted)`);
console.log(`  invalid affiliate URLs      : ${report.invalid.length}`);
console.log(`  duplicate affiliate entries : ${report.duplicates.length}`);
console.log(`  deep links / variants       : ${report.variants}`);
console.log(`  banner URLs skipped         : ${report.bannerUrlsSkipped}`);
console.log(`  manual aliases / overrides  : preserved (lib/affiliates.js untouched)`);
for (const d of report.duplicates) {
  console.log(`    duplicate - ${d.brand}: ${d.url} (${d.reason})`);
}
for (const d of report.invalid) {
  console.log(`    invalid - ${d.brand}: ${d.url || "(none)"} (${d.reason})`);
}
if (report.warnings.length) {
  console.log(`  warnings                    : ${report.warnings.length}`);
  for (const w of report.warnings) console.log(`    - ${w}`);
}
console.log(`  written                     : lib/affiliates.generated.js (${entries.length} entries)`);
