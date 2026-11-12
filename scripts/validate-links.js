/**
 * Internal link validation — run with: node scripts/validate-links.js
 *
 * Detects:
 *  - internal hrefs pointing at routes that do not exist
 *  - links to removed locale pages (/blogs/br, /blogs/sa)
 *  - orphaned blog articles (no incoming internal link anywhere in source)
 *  - duplicate identical links within a single file
 *  - trailing-slash variants of canonical (slashless) routes
 *
 * Exit code 1 when broken links or locale references are found.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SCAN_DIRS = ["app", "components", "content", "Data", "constant", "hooks", "lib"];
const SOURCE_EXT = new Set([".js", ".jsx", ".ts", ".tsx", ".json", ".mjs"]);
const SKIP = new Set(["node_modules", ".next", ".git"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (SOURCE_EXT.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

// ---------------------------------------------------------- route inventory
function collectRoutes() {
  const routes = new Set(["/", "/blogs", "/free-tools", "/hosting", "/domain",
    "/about", "/services", "/courses", "/portfolio", "/contact",
    "/privacy", "/terms", "/disclaimer"]);

  const appDir = path.join(ROOT, "app");
  const stack = [""];
  while (stack.length) {
    const rel = stack.pop();
    const dir = path.join(appDir, rel);
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (entry.name.startsWith("api")) continue;
        stack.push(path.join(rel, entry.name));
        continue;
      }
      if (/^page\.(js|jsx)$/.test(entry.name)) {
        const route = "/" + rel.split(path.sep).filter(Boolean).join("/");
        routes.add(route || "/");
      }
    }
  }

  // blog slugs from content registry
  const indexPath = path.join(ROOT, "content", "blogs", "index.js");
  const indexSrc = fs.readFileSync(indexPath, "utf8");
  const files = [...indexSrc.matchAll(/from\s+'\.\/([^']+)'/g)].map((m) => m[1]);
  for (const f of files) {
    const p = path.join(ROOT, "content", "blogs", `${f}.js`);
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, "utf8");
    const slug = src.match(/slug:\s*"([^"]+)"/);
    if (slug) routes.add(`/blogs/${slug[1]}`);
  }

  return routes;
}

// ------------------------------------------------------------ link scanning
function extractHrefs(src) {
  const found = [];
  const patterns = [
    { kind: "href", re: /href=\{?["'`]([^"'`$]+)["'`]\}?/g },
    { kind: "href", re: /href:\s*["'](\/[^"']*)["']/g },
    { kind: "href", re: /href:\s*["'](\.{1,2}\/[^"']*)["']/g },
    { kind: "other", re: /url:\s*["'](\/[^"']*)["']/g },
    { kind: "other", re: /path:\s*["'](\/[^"']*)["']/g },
    { kind: "other", re: /destination:\s*["'](\/[^"']*)["']/g },
  ];
  for (const { kind, re } of patterns) {
    for (const m of src.matchAll(re)) found.push({ value: m[1], kind });
  }
  return found;
}

function isInternal(href) {
  if (!href || href.startsWith("http") || href.startsWith("#") ||
      href.startsWith("mailto:") || href.startsWith("tel:") ||
      href.startsWith("//")) return false;
  return true;
}

function normalise(href) {
  let p = href.split("#")[0].split("?")[0];
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

function main() {
  const routes = collectRoutes();
  const files = [];
  for (const dir of SCAN_DIRS) {
    const full = path.join(ROOT, dir);
    if (fs.existsSync(full)) walk(full, files);
  }

  const broken = [];
  const localeRefs = [];
  const trailingSlash = [];
  const duplicates = [];
  const incoming = new Map(); // target -> Set(source files)

  for (const file of files) {
    const src = fs.readFileSync(file, "utf8");
    const rel = path.relative(ROOT, file).replace(/\\/g, "/");
    const found = extractHrefs(src);
    const counts = new Map();
    for (const { value: raw, kind } of found) {
      if (!isInternal(raw)) continue;
      if (/\/blogs\/(br|sa)(\/|$)/.test(raw)) {
        localeRefs.push(`${rel} -> ${raw}`);
      }
      if (raw.length > 1 && raw.endsWith("/")) {
        trailingSlash.push(`${rel} -> ${raw}`);
      }
      const target = normalise(raw);
      if (kind === "href") counts.set(target, (counts.get(target) || 0) + 1);
      if (!incoming.has(target)) incoming.set(target, new Set());
      incoming.get(target).add(rel);

      const known = routes.has(target) ||
        target.startsWith("/api/") ||
        target.startsWith("/_next") ||
        /\.(png|jpg|jpeg|webp|avif|svg|ico|css|js|mp4|pdf|txt|xml)$/i.test(target);
      if (!known) broken.push(`${rel} -> ${raw}`);
    }
    for (const [target, n] of counts) {
      if (n > 1) duplicates.push(`${rel} -> ${target} (x${n})`);
    }
  }

  // blog slugs linked through the <RelatedResources /> data also count as inbound
  const dataSlugs = new Set();
  for (const p of [
    path.join(ROOT, "lib", "resource-map.js"),
    path.join(ROOT, "lib", "seo", "keyword-map.js"),
  ]) {
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, "utf8");
    for (const m of src.matchAll(/(?:articles|tools):\s*\[([^\]]*)\]/g)) {
      for (const s of m[1].matchAll(/["']([^"']+)["']/g)) {
        dataSlugs.add(s[1].startsWith("/") ? s[1] : `/blogs/${s[1]}`);
      }
    }
    for (const m of src.matchAll(/^\s*["'][^"']+["']:\s*\[([^\]]*)\]/gm)) {
      for (const s of m[1].matchAll(/["']([^"']+)["']/g)) {
        dataSlugs.add(s[1].startsWith("/") ? s[1] : `/blogs/${s[1]}`);
      }
    }
  }

  // orphaned articles: no inbound link from anywhere but their own file
  const orphans = [];
  for (const route of routes) {
    if (!route.startsWith("/blogs/") || route === "/blogs") continue;
    if (route.includes("[")) continue;
    const slug = route.slice("/blogs/".length);
    const ownFile = `content/blogs/${slug}.js`;
    const sources = [...(incoming.get(route) || [])].filter((s) => s !== ownFile);
    if (sources.length === 0 && !dataSlugs.has(route)) orphans.push(route);
  }

  const report = [
    "# Internal Link Validation Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Routes known: ${routes.size}`,
    `Files scanned: ${files.length}`,
    "",
    `## Broken internal links (${broken.length})`,
    ...broken.map((b) => `- ${b}`),
    "",
    `## Removed locale references (${localeRefs.length})`,
    ...localeRefs.map((b) => `- ${b}`),
    "",
    `## Trailing-slash links (${trailingSlash.length})`,
    ...trailingSlash.map((b) => `- ${b}`),
    "",
    `## Duplicate links within a file (${duplicates.length})`,
    ...duplicates.map((b) => `- ${b}`),
    "",
    `## Orphaned blog articles (${orphans.length})`,
    ...orphans.map((b) => `- ${b}`),
    "",
  ].join("\n");

  const outDir = path.join(ROOT, "docs");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  fs.writeFileSync(path.join(outDir, "internal-link-validation.md"), report, "utf8");

  console.log(report);
  if (broken.length || localeRefs.length) process.exit(1);
}

main();
