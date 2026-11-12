# RankStack.dev — SEO, Keyword Clustering & Programmatic SEO Master Blueprint

> **Role:** Expert Technical SEO Architect · Programmatic SEO Engineer · Content Strategist
> **Scope reviewed:** `app/free-tools/*`, `content/blogs/*`, `lib/seo.js`, `components/SchemaMarkup.js`, `app/sitemap.js` (plus `app/blogs/*`, `components/*`, `app/api/*`)
> **Production domain:** `https://rankstack.dev` · **Stack:** Next.js 14 App Router (JS/JSX), Tailwind 3
> **Document purpose:** Single source of truth for the 90-day organic growth program.

---

## Table of Contents

1. [Current Codebase SEO & SERP Audit](#1-current-codebase-seo--serp-audit)
2. [Topical Authority & Keyword Clustering (Hub-and-Spoke)](#2-topical-authority--keyword-clustering-hub-and-spoke)
3. [Programmatic SEO Blueprint & Dataset Schemas](#3-programmatic-seo-blueprint--dataset-schemas)
4. [AI Search & Generative Engine Optimization (GEO / AEO)](#4-ai-search--generative-engine-optimization-geo--aeo)
5. [Automated Internal Linking & Schema Expansion Plan](#5-automated-internal-linking--schema-expansion-plan)
6. [Phased Execution Roadmap (30-60-90)](#6-phased-execution-roadmap-30-60-90)

---

# 1. Current Codebase SEO & SERP Audit

## 1.1 Indexable Asset Inventory

### Interactive tools (money pages)

| Route | Metadata source | Primary keyword targets (as coded) | Schema present |
|---|---|---|---|
| `/free-tools` (hub) | `app/free-tools/page.jsx:14` | free web tools, DNS propagation checker, IP lookup tool, image compressor | FAQPage + BreadcrumbList (inline) |
| `/free-tools/ipchecker` | `app/free-tools/ipchecker/layout.js` | what is my ip, IP address checker, IP lookup tool, my IP location, ISP lookup | FAQPage + BreadcrumbList (inline, `page.js:59,91`) |
| `/free-tools/iplookup` | `app/free-tools/iplookup/layout.js` | IP lookup, IP address lookup, IP lookup tool, IP location, IP finder | BreadcrumbList + FAQPage (inline, `page.js:68,78`) |
| `/free-tools/dns-propagation` | `app/free-tools/dns-propagation/layout.js` | DNS propagation checker, DNS checker, DNS propagation, DNS records | **None** |
| `/free-tools/image-compressor` | `app/free-tools/image-compressor/layout.js` | image compressor, AI image compressor, compress images, reduce image size | **None** (FAQ copy exists in `components/FAQSection.js` but emits no JSON-LD) |
| `/free-tools/hosting-recommender` | `app/free-tools/hosting-recommender/layout.js` | AI hosting recommender, hosting quiz, best web hosting tool | **None** |

### Editorial inventory (from `content/blogs/index.js` + `br/`, `sa/`)

| Segment | Count | Composition |
|---|---|---|
| EN posts (`/blogs/[slug]`) | 29 | ~22 hosting reviews/comparisons, 4 performance guides, 1 DNS how-to, listicles (linux/windows/shared/email/UK hosting) |
| PT posts (`/blogs/br/[slug]`) | 1 | `bestHostingBR` — hub page `blogs/br` is effectively thin |
| AR posts (`/blogs/sa/[slug]`) | 1 | `afdal-istidafat-mawaqe3-fi-als3wdia` — hub page `blogs/sa` is effectively thin |
| **Total sitemap URLs** | **52** | 15 static + 5 tools + 32 blog posts (`app/sitemap.js`) |

### Sitewide schema (from `components/SchemaMarkup.js`)

`Organization` + `WebSite` + `SoftwareApplication` (`@graph`) injected in `app/layout.js:117`. This is correct and should remain the global baseline.

## 1.2 Critical Findings (ranked by traffic impact)

### F1 — ZERO editorial → tool internal links (highest impact)

```text
Scan: content/blogs/**, content/blogs/br/**, content/blogs/sa/**
Matches for "/free-tools": 0
```

Every one of 31+ articles is an orphan relative to our money pages. The only tool links sitewide are global chrome (`Header.js:68`, `Footer.js:68`, `Hero.js:57`, `Text.js:17`). **We are publishing topical content that passes zero relevance signals to the tools that convert.** This is the single biggest lever in this blueprint.

### F2 — `components/ToolsCard.js` is dead code

The component exists (`components/ToolsCard.js:4`, accepts `title/description/url`) but has **zero imports** across the repo. The hub page hand-rolls its own cards in `app/free-tools/page.jsx:34-71`. We are one import away from a reusable cross-linking primitive.

### F3 — Keyword cannibalization (3 active conflicts)

| Conflict | Evidence | Risk |
|---|---|---|
| **ipchecker vs iplookup** | `ipchecker/layout.js` targets `IP lookup tool`, `IP location`, `ISP lookup`; `iplookup/layout.js` targets `IP lookup`, `IP lookup tool`, `IP location` — near-identical SERP intent | Google will rotate the two URLs for "ip lookup tool" and "ip location"; neither stabilizes |
| **Hub vs tool pages** | `app/free-tools/page.jsx:19-24` targets `DNS propagation checker`, `IP lookup tool`, `image compressor` — the *exact* primary keywords of the child tool pages | Hub competes with children for the head term |
| **Sitewide keyword bleed** | `lib/seo.js:53` — `createMetadata` merges `TARGET_KEYWORDS` into **every** page's keywords array | All 52 URLs declare the same 6 keywords (`free web tools`, `DNS propagation checker`, `IP lookup tool`, `image compressor`, `technical SEO audit`, `programmable SEO`) → diluted relevance, no page owns a term |

### F4 — Meta description overflow caused by our own tagline append

`lib/seo.js:46-48` appends the full 86-character tagline to any description that doesn't already contain it:

```js
const resolvedDescription = description.includes(SITE_TAGLINE)
  ? description
  : `${description} ${SITE_TAGLINE}`;
```

Example: DNS tool description (~110 chars) + tagline (~86 chars) ≈ **196 chars → Google truncates at ~155-160**. Every `createMetadata` page ships a clipped description. Fix in §5.1.

### F5 — Thin / fallback content

| Issue | Evidence |
|---|---|
| **28/29 blog sidebars render generic fallback** | `content/blogs/blog-sidebars.json` has only 4 keys (`fastcomet-review`, `hostinger-review`, `hostarmada-review`, `shopify-review-2024`). Only `fastcomet-review` matches a live slug (`hostarmada-review` ≠ `hostarmada-review-2025`; `hostinger-review`/`shopify-review-2024` don't exist). Fallback (`app/blogs/[slug]/page.js:50-66`) renders a coupon UI ("Explore Reviews / View Coupons") on posts that have no coupons → mismatched, thin sidebar module. |
| **PT/AR hubs are 1-post thin** | `content/blogs/br/index.js` and `content/blogs/sa/index.js` each import 1 post, yet both hubs are in the sitemap at priority 0.7 |
| **GEO blocks missing on 8/29 EN posts** | No `FAQPage` JSON-LD: `best-cheap-uk-hosting-for-small-businesses`, `best-email-hosting-providers`, `best-linux-hosting-providers`, `bluehost-hosting-review`, `fastcomet-review`, `hosting-com-review`, `top-shared-hosting-providers`, `top-windows-hosting-providers` |
| **`KeyTakeaways` missing** | `best-web-hosting-for-new-bloggers-in-2025`, `jethosting-vs-misshosting` (component exists at `components/KeyTakeaways.js`) |
| **`QuickSummary` missing** | 8 posts (incl. `bluehost-hosting-review`, `fastcomet-review`, `website-speed-seo-rankings-guide`, `ultimate-website-caching-guide-hosting`) |

### F6 — Technical / structural defects

| Defect | Evidence | Fix |
|---|---|---|
| Trailing-slash URL mismatch | `app/free-tools/page.jsx:37,46,55,63,71` emit `/free-tools/ipchecker/` while `app/sitemap.js` + canonicals use no trailing slash | Normalize to no trailing slash |
| Uppercase slug in URL | Build output: `/blogs/JetHost-review-can-it-really-beat-bluehost-hostinger` (slug `JetHost-review...` in `content/blogs/jethost-review-*.js`) | Lowercase slug + 301 from old URL |
| Shared OG image across all 5 tool layouts | Every tool `layout.js` uses the identical Cloudinary `web-hosting-for-bloggers_cbnl6u.avif` | Generate per-tool OG images |
| `sitemap.js` `languages` field is non-standard | `app/sitemap.js:52,60,68` puts `languages` at top level; Next.js requires `alternates: { languages: {...} }` for hreflang | Restructure + add `x-default` |
| Feature claim mismatch | `image-compressor/layout.js` description promises GIF support; `app/api/image-compressor/route.js:23` allows only `jpeg/jpg/png/webp` | Align copy with reality (trust + accuracy) |
| Breadcrumb schema is hand-rolled per page | Inline `BreadcrumbList` in 7 files, absent elsewhere | Automate (§5) |
| `components/SEO.js` emits BlogPosting only, no FAQ/HowTo | `components/SEO.js:11-43` | Extend or supersede (§5) |
| No `llms.txt`, no `hreflang`, no `Article`/`FAQPage` on tool layouts | — | Add (§4, §5) |

### F7 — What is already working (protect it)

- `metadataBase` + canonical + OG/Twitter via App Router Metadata API on **all** pages (no `next/head` anywhere).
- `app/sitemap.js` dynamically enumerates every tool, legal page, and all 3 locale blog sets.
- Global `Organization`/`WebSite`/`SoftwareApplication` JSON-LD with `featureList`, `offers`, `keywords` (`components/SchemaMarkup.js`).
- 22/29 EN posts already ship `FAQPage` + `BreadcrumbList` JSON-LD; 15 ship `BlogPosting`.
- `QuickSummary`/`KeyTakeaways` components exist and are proven in production posts (`components/QuickSummary.js`, `components/KeyTakeaways.js`).
- Server-side secrets only (`process.env.TINYPNG_API_KEY`, `process.env.IPINFO_TOKEN`) — no client key leakage.

---

# 2. Topical Authority & Keyword Clustering (Hub-and-Spoke)

## 2.1 Architecture principle

```text
                    ┌────────────────────────────┐
                    │   ONE PILLAR per cluster   │
                    │  (indexable, static, ≤1 H1)│
                    └─────────────┬──────────────┘
              ┌───────────────────┼───────────────────┐
              ▼                   ▼                   ▼
        SPOKE: Tool         SPOKE: Guide        SPOKE: Article
     (interactive,      (pSEO template,      (editorial,
      SoftwareApp        HowTo schema)        BlogPosting)
      schema)
              ▲                   ▲                   ▲
              └───────┬───────────┴───────────┬───────┘
                      │  RelatedResources +   │
                      │  contextual anchors   │
                      └───────────────────────┘
```

**Rules:**
1. Exactly **one** pillar page per cluster owns the head term.
2. Every spoke links **up** to its pillar with a partial-match anchor; the pillar links **down** to every spoke (hub-and-spoke complete loop).
3. Cross-cluster links only via `RelatedResources` (§5.3) or explicit editorial context — never random.
4. Each spoke targets **one** primary query + ≤4 secondaries. No keyword appears as primary on two URLs (see §1.2 F3 dedup table).

---

## Cluster A — Network, DNS & IP Diagnostics

**Primary intent:** Mixed — informational (how-to, definitions) → transactional/tool (run a check).
**Pillar page:** `https://rankstack.dev/free-tools/dns-propagation`
*(DNS propagation is the highest-volume, most linkable query in the cluster; tool pages convert.)*

| # | Spoke | Type | URL | Primary query | Intent |
|---|---|---|---|---|---|
| A1 | IP Checker (What is my IP) | Tool | `/free-tools/ipchecker` | what is my ip | Tool |
| A2 | IP Lookup / Reverse IP | Tool | `/free-tools/iplookup` | ip address lookup | Tool |
| A3 | **NEW:** HTTP Headers Checker | Tool | `/free-tools/http-headers` | http header checker | Tool |
| A4 | **NEW:** SPF/DKIM/DMARC Record Checker | Tool | `/free-tools/email-authentication` | spf dkim dmarc checker | Tool |
| A5 | **pSEO:** DNS Setup Guides | Guide | `/guides/dns-setup/[provider]` | how to set up [dns records] on [provider] | Informational |
| A6 | **pSEO:** ASN Lookup Pages | Landing | `/asn/[asn]` | asn lookup / what is asn [x] | Informational |
| A7 | Article: Point InterServer domain (exists) | Article | `/blogs/point-interserver-domain-to-network-solutions` | point interserver domain to network solutions | Informational |
| A8 | **NEW:** Article: DNS Propagation Explained + Fix Slow Propagation | Article | `/blogs/dns-propagation-explained` | dns propagation how long | Informational |

**Keyword ownership (deduplicated):**

| Query | Owner (primary) | Forbidden on |
|---|---|---|
| what is my ip | `/free-tools/ipchecker` | all others |
| ip address lookup / reverse ip lookup | `/free-tools/iplookup` | ipchecker |
| dns propagation checker | `/free-tools/dns-propagation` | `/free-tools` hub |
| spf dkim dmarc checker | `/free-tools/email-authentication` | — |
| http header checker | `/free-tools/http-headers` | — |

> **Immediate edit:** remove `IP lookup tool`, `IP location`, `ISP lookup` from `app/free-tools/ipchecker/layout.js` (keep `what is my ip`, `public IP address`, `IPv4 IPv6 checker`); remove `IP lookup tool` duplicate claim from `app/free-tools/page.jsx` hub keywords and let the hub own only `free web tools` + `online network tools`.

**Anchor-text rules for Cluster A:**
- Pillar → spoke: `"DNS propagation checker"`, `"our free IP checker"`, `"SPF/DKIM/DMARC checker"` (exact/partial match allowed, 1 per sentence).
- Spoke → pillar: `"check DNS propagation globally"` (verb-first, partial match).
- Article → tool: **actionable anchors only** — `"run the free DNS propagation checker"`, `"check your SPF record with our email authentication tool"`. Never `"click here"`, never bare URLs.
- Max **3 tool links per article**, max 1 exact-match anchor per article for any single keyword.

---

## Cluster B — Web Performance & Core Web Vitals

**Primary intent:** Informational (education) → Tool (compression).
**Pillar page:** `https://rankstack.dev/free-tools/image-compressor`
*(Only existing converting asset in the cluster; performance content funnels into it.)*

| # | Spoke | Type | URL | Primary query | Intent |
|---|---|---|---|---|---|
| B1 | Image Compressor | Tool | `/free-tools/image-compressor` | image compressor / compress image | Tool |
| B2 | Article: Website Speed & SEO (exists) | Article | `/blogs/website-speed-seo-rankings-guide` | website speed seo rankings | Informational |
| B3 | Article: Image Optimization Quick Win (exists) | Article | `/blogs/quick-image-optimization-speed-guide` | image optimization speed | Informational |
| B4 | Article: Caching Guide (exists) | Article | `/blogs/ultimate-website-caching-guide-hosting` | website caching guide | Informational |
| B5 | **NEW:** WebP/AVIF Converter + explainer | Tool | `/free-tools/image-converter` | webp to avif converter | Tool |
| B6 | **NEW:** Article: Core Web Vitals Checklist 2026 | Article | `/blogs/core-web-vitals-checklist` | core web vitals checklist | Informational |
| B7 | **NEW:** Article: LCP/CLS/INP Fix Playbook | Article | `/blogs/fix-lcp-cls-inp` | fix lcp cls inp | Informational |
| B8 | **pSEO:** Format comparison pages | Comparison | `/compare/webp-vs-avif`, `/compare/png-vs-webp` | webp vs avif | Informational |

**Anchor-text rules for Cluster B:**
- Editorial → tool: `"compress images free with RankStack's image compressor"` — place **adjacent to a statistic** (e.g., after "images are 40% of page weight").
- Guide → guide: topical adjacency only (`caching` ↔ `speed` ↔ `image optimization`), partial-match anchors.
- Never link B-spokes to Cluster A tools except via `RelatedResources` (cross-cluster noise hurts anchor relevance).

---

## Cluster C — Hosting & Infrastructure Intelligence

**Primary intent:** Commercial investigation (transactional-adjacent).
**Pillar page:** `https://rankstack.dev/hosting`
*(Already exists: `app/hosting/page.jsx` — "Best Web Hosting Providers & Reviews".)*

| # | Spoke | Type | URL | Primary query | Intent |
|---|---|---|---|---|---|
| C1 | Hosting hub (pillar) | Hub | `/hosting` | best web hosting | Navigational |
| C2 | AI Hosting Recommender | Tool | `/free-tools/hosting-recommender` | hosting quiz / which hosting is best for me | Tool |
| C3 | 22 hosting reviews (existing, e.g. `dreamhost-review`, `a2-hosting-review-turbo-speed-tested`) | Article | `/blogs/[slug]` | [host] review | Commercial |
| C4 | Listicles (existing: `top-shared-hosting-providers`, `best-linux-hosting-providers`, `best-windows-hosting-providers`, `best-email-hosting-providers`, `best-web-hosting-small-business-uk`) | Article | `/blogs/[slug]` | best [segment] hosting | Commercial |
| C5 | Head-to-head comparisons (existing: `jethosting-vs-misshosting`) + **pSEO matrix** | Comparison | `/compare/[a]-vs-[b]` | [host a] vs [host b] | Commercial |
| C6 | **NEW:** Article: How We Test Hosting (methodology) | Article | `/blogs/how-we-test-hosting` | how to test web hosting speed | Informational |
| C7 | **NEW:** Article: TTFB Explained + Benchmark Table | Article | `/blogs/ttfb-explained` | ttfb benchmark | Informational |
| C8 | **NEW:** Article: Cloud vs VPS vs Shared | Article | `/blogs/cloud-vs-vps-vs-shared-hosting` | cloud vs vps hosting | Informational |

**Cannibalization guardrail (Cluster C):** the pillar `/hosting` owns **only** `best web hosting` + `web hosting reviews`. Listicles own segmented heads (`best shared hosting`, `best linux hosting`). Reviews own `[host] review` + `[host] pricing`. Comparison pages own `[a] vs [b]` — and must **canonical to self**, never to the pillar.

**Anchor-text rules for Cluster C:**
- Review → pillar: `"see all our hosting reviews"` (top of post, in Key Takeaways area).
- Review → comparison: `"compare Hostinger vs Bluehost"` — only when the comparison page exists.
- Review → recommender: `"not sure yet? take the 2-minute AI hosting recommender quiz"` (bottom CTA, after pros/cons).
- Comparison → both reviews: `"read our full DreamHost review"` (exact match, 1 per host).
- Affiliate CTAs stay `rel="sponsored nofollow"`; **internal SEO links stay `dofollow`** — never mix.

---

## Cluster D — Technical SEO & Developer Utilities

**Primary intent:** Informational → Tool.
**Pillar page:** `https://rankstack.dev/free-tools`
*(The utilities index — repositioned to own `free web tools` + `developer tools` exclusively; currently also the default fallback for tool keywords — see F3 fix.)*

| # | Spoke | Type | URL | Primary query | Intent |
|---|---|---|---|---|---|
| D1 | Free Tools hub (pillar) | Hub | `/free-tools` | free web tools | Navigational |
| D2 | **NEW:** Schema Markup Generator | Tool | `/free-tools/schema-generator` | schema markup generator | Tool |
| D3 | **NEW:** Robots.txt + Sitemap Validator | Tool | `/free-tools/robots-sitemap-checker` | robots txt validator | Tool |
| D4 | **NEW:** Article: Programmable SEO Playbook | Article | `/blogs/programmable-seo-playbook` | programmable seo | Informational |
| D5 | **NEW:** Article: Technical SEO Audit Checklist | Article | `/blogs/technical-seo-audit-checklist` | technical seo audit | Informational |
| D6 | **NEW:** Article: How AI Overviews Cite Sources (GEO) | Article | `/blogs/generative-engine-optimization` | generative engine optimization | Informational |
| D7 | **pSEO:** DNS setup guides (shared with A5) | Guide | `/guides/dns-setup/[provider]` | … | Informational |
| D8 | **NEW:** Article: Sitemap Best Practices | Article | `/blogs/sitemap-best-practices` | sitemap best practices | Informational |

> Note: `TARGET_KEYWORDS` in `lib/seo.js` currently maps `technical SEO audit` and `programmable SEO` sitewide. After the fix in §5.1, those two terms become **owned exclusively by D5 and D4** respectively; all other pages drop them.

**Anchor-text rules for Cluster D:**
- Every Cluster D article ends with a **"Try it"** link block: 2-3 tool links with imperative anchors (`"generate schema markup"`, `"validate your robots.txt"`).
- Hub → spokes: card grid (revive `components/ToolsCard.js`).
- Tool → article: `"read the technical SEO audit checklist"` inside the tool's educational footer.

---

## 2.2 Global internal-linking SLA (enforced via §5.3)

| Surface | Minimum links out | Rule |
|---|---|---|
| Every blog post | 3-5 internal | ≥1 to its cluster pillar, ≥1 to a cluster tool, ≤2 cross-cluster (via RelatedResources only) |
| Every tool page | 2-4 internal | ≥1 to pillar, ≥2 to related guides/articles |
| Pillar/hub pages | all spokes | exhaustive outbound to children |
| Footer/Header | untouched | global chrome only (already correct) |

---

# 3. Programmatic SEO Blueprint & Dataset Schemas

## 3.0 Shared pSEO infrastructure (build once, reuse 3×)

```text
Data/pseo/                     ← single source of truth (static JSON/JS, build-time)
  dns-providers.js             ← Template 1 dataset
  asns.js                      ← Template 2 dataset
  comparisons.js               ← Template 3 dataset + allowlist
  partners.js                  ← shared host/brand entity registry (dedupe C3/C4/C5)

lib/pseo/
  guards.js                    ← indexation guardrails (word count, uniqueness, allowlist)
  metadata.js                  ← shared generateMetadata formulas (title/desc/canonical)

app/guides/dns-setup/[provider]/page.js      ← Template 1
app/asn/[asn]/page.js                        ← Template 2 (or /tools/asn-lookup/[slug])
app/compare/[matchup]/page.js                ← Template 3
app/guides/page.js                           ← pSEO hub 1 (index of all guides)
app/compare/page.js                          ← pSEO hub 2 (index of comparison matrix)
```

**Non-negotiable guardrails for every template (implemented in `lib/pseo/guards.js`):**

1. **Allowlist first.** A page renders indexable only if its slug exists in the curated dataset. Unknown slug → `notFound()` (404), never a stub.
2. **Uniqueness floor.** ≥600 words of unique narrative + ≥3 unique data blocks before `robots: index`. Below floor → `noindex,follow`.
3. **No N² explosion.** Combinations are hand-picked (e.g., 40 comparisons, not 40×39/2 = 780).
4. **Self-canonical** always (`alternates.canonical` = exact URL). Never canonical a spoke to its hub.
5. **`lastVerified` date** rendered on-page + in `dateModified` — freshness is the #1 ranking factor for pSEO pages.
6. **One H1, one intent, one CTA** — plus a unique `intro` paragraph written per entry (template strings are allowed for *structure*, never for the opening paragraph).

---

## 3.1 Template 1 — DNS & Email Deliverability Setup Guides

**URL pattern:** `/guides/dns-setup/[provider]`
**Examples:** `/guides/dns-setup/cloudflare`, `/guides/dns-setup/godaddy`, `/guides/dns-setup/namecheap`, `/guides/dns-setup/aws-route53`, `/guides/dns-setup/gmail-workspace`

**Search intent:** Informational ("how to set up SPF for Google Workspace on Cloudflare"). Enormous long-tail; each provider × record intent is a distinct query with weak incumbent coverage.

### Dataset schema — `Data/pseo/dns-providers.js`

```js
// Data/pseo/dns-providers.js
export const dnsProviders = [
  {
    slug: "cloudflare",                 // URL segment (lowercase, hyphenated, allowlist key)
    displayName: "Cloudflare",
    category: "dns-registrar",          // dns-registrar | registrar | email-provider | cloud
    audience: "4.2M+ domains use Cloudflare DNS",
    lastVerified: "2026-11-01",         // renders as "Last verified" + dateModified
    difficulty: "beginner",             // beginner | intermediate | advanced
    // ---- unique narrative (NEVER templated) ----
    intro: "Cloudflare's DNS dashboard hides MX priority behind an 'Advanced' toggle…",
    gotchas: [
      "Proxied (orange cloud) records break SPF lookups — set TXT records to DNS-only.",
      "Cloudflare auto-imports existing records on zone activation; verify MX priority before deleting.",
    ],
    // ---- structured DNS records ----
    records: [
      {
        type: "A",
        name: "@",
        value: "192.0.2.1",             // example value, annotated with {placeholder} tokens
        ttl: "Auto",
        proxied: false,
        why: "Points your root domain to your web server.",
        steps: [                        // provider-specific click path
          "Open DNS → Records → Add record",
          "Type: A · Name: @ · IPv4: your server IP",
          "Proxy status: DNS only (grey cloud) for mail-related hosts",
        ],
      },
      {
        type: "TXT",
        name: "@",
        value: "v=spf1 include:_spf.google.com ~all",
        ttl: "Auto",
        why: "SPF authorizes Google Workspace to send mail for your domain.",
        steps: ["Add record → Type: TXT → Name: @ → Content: paste SPF value"],
        errors: [
          {
            symptom: "PermError: too many DNS lookups",
            cause: "SPF includes more than 10 DNS-lookup mechanisms",
            fix: "Flatten nested includes or move to a macro-based SPF.",
          },
        ],
      },
      // MX, DKIM, DMARC, CNAME (verification) entries…
    ],
    // ---- SEO surfaces ----
    faqs: [
      {
        q: "How long do DNS changes take on Cloudflare?",
        a: "Cloudflare propagates authoritatively within ~5 minutes; resolver caches up to TTL (default 300s) mean global visibility in 5-30 minutes.",
      },
    ],
    relatedTools: ["/free-tools/dns-propagation", "/free-tools/email-authentication"],
    relatedGuides: ["gmail-workspace", "microsoft-365"],  // internal cross-links (slugs)
    sources: ["https://developers.cloudflare.com/dns/"],  // outbound citations (GEO)
  },
  // godaddy, namecheap, aws-route53, porkbun, hover, ionos, squarespace, wix…
];
```

### `generateMetadata` formula — `app/guides/dns-setup/[provider]/page.js`

```js
import { notFound } from "next/navigation";
import { dnsProviders } from "@/Data/pseo/dns-providers";
import { createMetadata, absoluteUrl } from "@/lib/seo";

export const dynamicParams = false;            // only allowlisted providers build

export function generateStaticParams() {
  return dnsProviders.map((p) => ({ provider: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = dnsProviders.find((x) => x.slug === params.provider);
  if (!p) return {};

  return createMetadata({
    title: `How to Set Up DNS, SPF, DKIM & DMARC on ${p.displayName} (2026)`,
    description: `Step-by-step ${p.displayName} DNS setup: A, MX, SPF, DKIM and DMARC records with exact click paths, common errors, and propagation checks. Last verified ${p.lastVerified}.`,
    path: `/guides/dns-setup/${p.slug}`,
    keywords: [
      `${p.displayName} DNS setup`,
      `${p.displayName} SPF record`,
      `${p.displayName} DKIM setup`,
      `${p.displayName} DMARC`,
      `set up email on ${p.displayName}`,
    ],
    type: "article",
  });
}
```

**Title formula:** `How to Set Up DNS, SPF, DKIM & DMARC on {Provider} ({Year})` — ≤60 chars for short providers, drop ", SPF, DKIM & DMARC" when `displayName` pushes >60 (helper in `lib/pseo/metadata.js`).
**Description formula:** `{action} {provider}: {record list} with {differentiator}. Last verified {date}.` — hard-capped at 155 chars *after* any tagline handling (see §5.1).

### Indexation guardrails (Template 1)

| Rule | Implementation |
|---|---|
| Allowlist only | `dynamicParams = false` + `notFound()` on miss |
| ≥600 words unique | `guards.js: assertContentDepth(page)` — `intro` + `gotchas` + per-record `why` + FAQ must exceed threshold; else `robots: { index: false }` |
| No near-duplicate templates | `intro` and `gotchas` are **required, non-empty, ≥120 chars each** — build fails lint if missing |
| Canonical | self (`createMetadata` path param) |
| Hub | `/guides` index lists all providers with 1-line unique descriptions (internal PageRank hub) |
| Crawl budget | all guide URLs added to `app/sitemap.js` **only after** passing `guards.js` at build time (assert in `sitemap()` — throw loudly, don't silently noindex) |

---

## 3.2 Template 2 — IP & ASN Diagnostic Lookup Landing Pages

**URL pattern:** `/asn/[asn]` (numeric, e.g. `/asn/13335` = Cloudflare) **and/or** `/tools/asn-lookup/[slug]` (provider narrative pages)
**Examples:** `/asn/13335` (Cloudflare), `/asn/15169` (Google), `/tools/asn-lookup/cloudflare`, `/tools/asn-lookup/hetzner`

**Search intent:** Informational ("what is ASN 13335", "who owns AS15169", "cloudflare ASN lookup"). High query volume from network engineers; Google currently ranks thin RDAP pages — a content-rich, tool-integrated page wins.

**Doorway-page risk is real here.** Mitigation is structural:

### Dataset schema — `Data/pseo/asns.js`

```js
// Data/pseo/asns.js
export const asnPages = [
  {
    asn: 13335,                          // number = canonical identity
    slug: "13335",                       // URL segment; must equal String(asn)
    orgName: "Cloudflare, Inc.",
    country: "US",
    allocated: "2010-07-14",
    registry: "ARIN",
    prefixes: ["104.16.0.0/13", "172.64.0.0/13"],   // top prefixes only (display 5)
    peers: [15169, 32934, 6939],        // internal links to /asn/[peer]
    categories: ["cdn", "security"],
    // ---- unique narrative (required, ≥150 chars) ----
    overview: "AS13335 is Cloudflare's global anycast network… traffic for ~20% of the web traverses these prefixes…",
    whatItMeans: "If a traceroute to your site ends at 104.16.x.x, you are behind Cloudflare's proxy — origin IP checks and SPF lookups must use the origin, not the edge.",
    // ---- tool integration (this is what beats RDAP scrapers) ----
    relatedTools: ["/free-tools/iplookup", "/free-tools/dns-propagation", "/free-tools/http-headers"],
    relatedArticle: "/blogs/ultimate-website-caching-guide-hosting",
    faqs: [
      { q: "How do I find my own ASN?", a: "Run an IP lookup on your public IP in RankStack's IP lookup tool — the ASN field returns your autonomous system number." },
    ],
    lastVerified: "2026-11-01",
    // ---- indexation control ----
    indexable: true,                     // false = render but noindex (reserve for incomplete entries)
  },
  // Curated top ~300-500 ASNs by traffic/relevance. NOT a full RDAP dump.
];
```

### `generateMetadata` formula

```js
export async function generateMetadata({ params }) {
  const entry = asnPages.find((x) => x.slug === params.asn);
  if (!entry || !entry.indexable) return { robots: { index: false, follow: true } };

  return createMetadata({
    title: `ASN ${entry.asn}: ${entry.orgName} Network Details`,
    description: `Who owns AS${entry.asn}? ${entry.orgName} (${entry.country}) — allocated ${entry.allocated}, top prefixes, peers, and how to check any IP in this network with RankStack's IP lookup tool.`,
    path: `/asn/${entry.slug}`,
    keywords: [`asn ${entry.asn}`, `${entry.orgName} ASN`, `AS${entry.asn} lookup`, ...entry.categories],
  });
}
```

### Indexation guardrails (Template 2)

| Rule | Why |
|---|---|
| **Hard cap: 300-500 curated ASNs**, not the full 80k+ table | Full dumps = doorway farm; Google's 2023 spam policy targets "scaled content abuse" |
| `indexable: false` default for any entry missing `overview` or `whatItMeans` | Enforces uniqueness floor |
| Each page must embed **live tool output** (IP lookup box prefilled with a prefix example) | Differentiator vs. RDAP scrapers; adds engagement signals |
| Peer links (`/asn/[peer]`) only between curated entries | Closed internal graph, no orphan stubs |
| Aggregate hub `/asn` (index of curated ASNs by category) required in `app/sitemap.js` | Ensures discoverability without submitting 500 URLs cold |
| If entry is auto-generated from RDAP in the future → **always `noindex`**, keep as tool input data only | Never index machine-generated shells |

---

## 3.3 Template 3 — Hosting & Stack Comparison Matrix

**URL pattern:** `/compare/[matchup]` where `[matchup]` = `{host-a}-vs-{host-b}` (lowercase, alphabetical within pair to avoid dupes: `bluehost-vs-dreamhost`, never `dreamhost-vs-bluehost` as a second URL).

**Search intent:** Commercial investigation — highest commercial-intent long-tail in Cluster C ("siteground vs bluehost").

### Dataset schema — `Data/pseo/comparisons.js`

```js
// Data/pseo/comparisons.js
export const comparisons = [
  {
    slug: "bluehost-vs-dreamhost",       // canonical pair key (alphabetical)
    hostA: "bluehost",                   // must exist in partners.js
    hostB: "dreamhost",
    indexable: true,                     // allowlist gate — false = noindex stub
    // ---- required unique narrative (≥250 words combined) ----
    verdict: "Bluehost wins for WordPress beginners… Dreamhost wins on renewal pricing…",
    summary: "We ran both hosts through a 30-day TTFB/uptime test from 4 regions…",
    bestFor: {
      bluehost: "Beginners who want one-click WordPress + phone support",
      dreamhost: "Budget-conscious site owners who hate renewal price hikes",
    },
    // ---- structured matrix (drives the comparison TABLE + JSON-LD) ----
    dimensions: [
      { label: "Starting price",  a: "$2.95/mo", b: "$2.59/mo", winner: "b", source: "official pricing, Nov 2026" },
      { label: "Renewal price",   a: "$11.99/mo", b: "$6.99/mo", winner: "b", source: "official pricing, Nov 2026" },
      { label: "Storage",         a: "10 GB SSD", b: "50 GB SSD", winner: "b" },
      { label: "Avg TTFB (test)", a: "412 ms", b: "389 ms", winner: "b", source: "RankStack lab, 30-day test" },
      { label: "Uptime (test)",   a: "99.97%", b: "99.94%", winner: "a", source: "RankStack lab, 30-day test" },
      { label: "Free domain",     a: "Yes (1 yr)", b: "Yes (1 yr)", winner: "tie" },
      { label: "Money-back",      a: "30 days", b: "97 days", winner: "b" },
    ],
    // ---- scorecard ----
    scores: { bluehost: 8.4, dreamhost: 8.1 },   // renders as Rating JSON-LD
    prosCons: {
      bluehost: { pros: ["…"], cons: ["…"] },
      dreamhost: { pros: ["…"], cons: ["…"] },
    },
    faqs: [
      { q: "Is Bluehost faster than DreamHost?", a: "In our 30-day test DreamHost edged Bluehost on TTFB (389 ms vs 412 ms)…" },
    ],
    // ---- cross-links (mandatory) ----
    reviewSlugs: { bluehost: "bluehost-review", dreamhost: "dreamhost-review" },  // /blogs/[slug]
    relatedTools: ["/free-tools/hosting-recommender"],
    lastVerified: "2026-11-01",
  },
  // Curated ~40 pairs drawn from hosts we have FIRST-HAND reviews for.
];
```

### `generateMetadata` formula

```js
export async function generateMetadata({ params }) {
  const c = comparisons.find((x) => x.slug === params.matchup);
  if (!c || !c.indexable) return { robots: { index: false, follow: true } };

  const nameA = partners[c.hostA].name;
  const nameB = partners[c.hostB].name;

  return createMetadata({
    title: `${nameA} vs ${nameB} (2026): Real Speed, Pricing & Feature Test`,
    description: `${nameA} vs ${nameB} compared on price, renewal rates, TTFB, uptime and support — with a scored verdict from our 30-day hands-on test. Last verified ${c.lastVerified}.`,
    path: `/compare/${c.slug}`,
    keywords: [`${nameA} vs ${nameB}`, `${nameB} vs ${nameA}`, `compare ${nameA} ${nameB}`],
    type: "article",
  });
}
```

**Canonical rule:** self only. The mirror query (`dreamhost vs bluehost`) is satisfied **inside the page** via the title/description variants and an on-page "Also searched: DreamHost vs Bluehost" line — **never** a second URL (that is the classic duplicate-pair penalty).

### Indexation guardrails (Template 3)

| Rule | Implementation |
|---|---|
| **Allowlist, not N²** | Only pairs present in `comparisons[]` render; `generateStaticParams` reads the array. 40 pairs max at launch. |
| Both hosts must have a first-hand review | `reviewSlugs` must resolve against `content/blogs/index.js` — asserted at build (prevents comparison pages with no supporting E-E-A-T content) |
| ≥600 words unique (`verdict` + `summary` + FAQ answers) | `guards.js` threshold; below → `noindex` |
| Winner claims require `source` | Every `dimensions[]` row with a `winner` must carry `source` (our lab data or "official pricing") — renders as citation + feeds GEO (§4) |
| Hub | `/compare` index (matrix table of all pairs) — required for crawl discovery + internal PageRank |
| Sitemap | pairs appended to `app/sitemap.js` only when `indexable === true` |

---

# 4. AI Search & Generative Engine Optimization (GEO / AEO)

> Goal: RankStack.dev becomes a **citable source** in Google AI Overviews, ChatGPT, Perplexity, and Gemini. Engines reward: extractable answers, dated statistics, structured comparisons, and clean semantic HTML — all things we can ship as components.

## 4.1 The "First 40 Words" rule (every page)

The first paragraph after the H1 must answer the query **standalone, without reading further**. Target 25-40 words, no brand throat-clearing.

```text
✅ "DNS propagation typically takes 5-30 minutes, but can take up to 48 hours
    depending on your TTL settings. RankStack's checker queries 8 global
    resolvers to show your exact propagation status in real time."
❌ "Welcome to RankStack's DNS propagation checker. In this article we'll
    explore what DNS propagation is and why it matters…"
```

**Implementation:** enforce via `QuickSummary` (already exists at `components/QuickSummary.js`) as the **mandatory first block** on all guides/tools, and add an `answerFirst` field to blog content validation.

## 4.2 Required on-page blocks (spec)

| Block | Component | Placement | Applies to |
|---|---|---|---|
| **TL;DR / Key Takeaways** | `components/KeyTakeaways.js` (exists) — retitle prop to `"TL;DR"` for guides | Immediately after H1/intro, before first H2 | All blogs, all pSEO guides |
| **Quick Summary** (answer-first bullets) | `components/QuickSummary.js` (exists) | Directly under TL;DR | All blogs |
| **Structured comparison table** | new `components/DataTable.js` (§4.3) | Mid-article, after first H2 | Comparisons, listicles, pSEO templates |
| **FAQ block** (visible) | new `components/FaqBlock.js` (§4.4) | Last section before CTA | All blogs, all tool pages |
| **Dated statistics callout** | new `components/StatCallout.js` | Adjacent to any numeric claim | Performance/hosting content |
| **"AI Diagnostic Insights" panel** | new `components/DiagnosticInsights.js` (§4.6) | Tool results area | All 5 tools + future tools |

## 4.3 `components/DataTable.js` (new)

```jsx
// Renders <table> with proper <thead>/<tbody>, caption, and optional winner highlighting.
// Props: { caption, columns: string[], rows: string[][], footnotes?: string[] }
// Adds JSON-LD: none (tables are for LLM extraction, not rich results)
// Must output server-rendered HTML — no client-side table construction
// (AI crawlers and the Google renderer both need static markup).
```

Rules: every comparison/pSEO page ships **≥1 DataTable**; column headers must be self-describing (`"Renewal price (monthly)"`, not `"Renewal"`); each table gets a `<caption>` summarizing the takeaway (engines quote captions).

## 4.4 `components/FaqBlock.js` + FAQPage JSON-LD (new, unified)

```jsx
// Props: { faqs: [{ q, a }] }  — visible <details> list + JSON-LD injection
// Renders BOTH:
//   1. Accessible accordion (semantic HTML, <summary>/<details>)
//   2. <script type="application/ld+json"> FAQPage schema via dangerouslySetInnerHTML
```

**Rollout targets:**

| Surface | Current state | Target |
|---|---|---|
| Tool pages `dns-propagation`, `image-compressor`, `hosting-recommender` | **no FAQPage** (and image-compressor has FAQ copy in `components/FAQSection.js` with no schema) | Wire `FaqBlock` + JSON-LD |
| `ipchecker`, `iplookup`, `/free-tools` | inline FAQPage exists | Migrate to `FaqBlock` (dedupe) |
| 8 EN posts missing FAQPage (F5 list) | none | Add 4-6 Q&As each, written from existing H2s |
| pSEO templates 1 & 3 | `faqs[]` in dataset | `FaqBlock` renders automatically |

## 4.5 Tool-page GEO: "AI Diagnostic Insights" (`components/DiagnosticInsights.js`)

Embed a **plain-English interpretation layer** under every tool result. This is our differentiator: raw output + what it means + what to do next.

```jsx
// Props: { domain, insights: [{ severity, headline, explanation, fix, configSnippet? }] }
```

**Concrete examples by tool:**

| Tool | Insight example (renders as HTML + feeds FAQPage/HowTo) |
|---|---|
| `dns-propagation` | **"SPF record missing"** — *"Your domain has no SPF (TXT) record. Mail from your domain may be marked spam. Fix: add `v=spf1 include:_spf.google.com ~all` at your registrar — [copy snippet]"* |
| `dns-propagation` | **"TTL too high (86400s)"** — *"Changes to this record can take up to 24h to propagate. Lower TTL to 300s before your next change."* |
| `ipchecker` | **"You are behind a proxy/VPN"** — *"ASN 13335 (Cloudflare) detected — your traffic is proxied. Origin-based tools (geo-checks) will see the edge location, not you."* |
| `image-compressor` | **"PNG → WebP recommended"** — *"Your upload is a 2.4 MB PNG; converting to WebP would save ~1.8 MB with no visible loss."* |
| `hosting-recommender` | Per-result rationale: *"We recommend Hostinger because your quiz answers prioritize < $3/mo + 100k monthly visits."* |

**Technical spec:**
- Server-rendered where possible (`app/api/*` returns `insights[]` alongside raw data — extend `app/api/dns-propagation/route.js` response shape with `insights`).
- Each insight = `severity` (info/warning/error) + `headline` (≤60 chars, question-free) + `explanation` (≤30 words) + `fix` (imperative) + optional `configSnippet` (monospace `<pre>`, copy-to-clipboard).
- Auto-generate **FAQPage JSON-LD** from the top 3 insights of the last query (client-side `next/head` is banned — inject via a `<script>` tag in the results tree, same pattern as `components/SEO.js`).
- Config snippets double as GEO gold: engines quote exact configs (`v=spf1 …`, `server { gzip on; }`).

## 4.6 Structural signals for crawlers

| Item | Spec | File |
|---|---|---|
| `llms.txt` | Human-readable site map for LLM crawlers: brand one-liner, pillar URLs, top 20 guides/tools with 1-line descriptions | new `app/llms.txt/route.js` (`Content-Type: text/plain`) |
| `robots.txt` | **Allow** GPTBot, ClaudeBot, PerplexityBot, Google-Extended alongside `*` (currently blanket-allow via `app/robots.js` — make explicit allow entries + log them) | `app/robots.js` |
| Answer-first intros | §4.1 rule, lint-enforced (word-count + first-paragraph check in `lib/pseo/guards.js`) | content pipeline |
| Dated claims | Every statistic carries a date (`StatCallout`), e.g. "TTFB 389 ms — RankStack lab, Oct 2026" | all performance content |
| Author entity | `Person` JSON-LD with `sameAs` (GitHub/Twitter) on every post — engines weight named-author expertise (E-E-A-T) | `components/SEO.js` extension |
| Citations | pSEO pages link 2-3 primary sources (docs.cloudflare.com etc.) — outbound citations correlate with AI Overview inclusion | datasets (`sources[]`) |

---

# 5. Automated Internal Linking & Schema Expansion Plan

## 5.1 `lib/seo.js` — surgical upgrades

### Fix A — description overflow (F4)

```js
// lib/seo.js — replace tagline append with a SHORT brand suffix
const SITE_TAGLINE_SHORT = "RankStack — AI-Powered Developer Utilities & Technical SEO";

const resolvedDescription = description.includes("RankStack")
  ? description
  : `${description} ${SITE_TAGLINE_SHORT}`.slice(0, 158);
```

### Fix B — keyword ownership (F3)

```js
// Add a 4th mode: keywords merge becomes OPT-IN per page type.
// createMetadata({ ..., sitewideKeywords = false })
// - Default false → page keywords only (after dedupe against a global blocklist)
// - Hubs may opt in to 1-2 cluster head terms explicitly
// TARGET_KEYWORDS moves OUT of auto-merge; it remains the SoftwareApplication
// schema keyword source in components/SchemaMarkup.js only.
```

### Fix C — route-aware schema factory

```js
// lib/seo.js (new exports)
export function breadcrumbSchema(pathname, labels = []) {
  // Splits pathname → [{name: "Home", item: SITE_URL}, …]
  // Returns BreadcrumbList JSON object; position 1 = Home.
}

export function faqSchema(faqs) {
  // faqs: [{q, a}] → FAQPage JSON-LD object (mainEntity/Question/acceptedAnswer)
}

export function howToSchema({ name, steps, totalTime, estimatedCost, tools, image }) {
  // HowTo JSON-LD for /guides/* templates (Step list + Tool/Supply where relevant)
}

export function softwareAppSchema(tool) {
  // Per-tool SoftwareApplication (supersedes the single global one for tool pages:
  // keep global in SchemaMarkup, add page-level `applicationCategory` + `featureList`
  // matching each tool's real capabilities — e.g. image-compressor lists
  // jpeg/png/webp ONLY, matching app/api/image-compressor/route.js:23)
}

export function routeSchema(pathname, payload) {
  // Dispatcher: picks breadcrumb + (faq | howTo | article) by pathname prefix:
  //   /guides/*            → breadcrumb + howTo + faq
  //   /compare/*           → breadcrumb + faq + Article
  //   /free-tools/*        → breadcrumb + softwareApp + faq
  //   /blogs/*             → breadcrumb + BlogPosting + faq
  //   /asn/*               → breadcrumb + faq + Dataset(?)
  // Returns JSON string for a single <script type="application/ld+json">.
}
```

## 5.2 `components/SchemaMarkup.js` — route-type injection

Current file is a static `@graph` (Organization/WebSite/SoftwareApplication) rendered in `app/layout.js:117`. Upgrade path:

```jsx
// components/SchemaMarkup.js
// 1. Keep the global @graph (Organization, WebSite, SoftwareApplication) — unchanged.
// 2. Accept an optional `pageSchema` prop (JSON object or array):
//      <SchemaMarkup pageSchema={routeSchema(pathname, data)} />
// 3. Render as ONE extra <script type="application/ld+json"> ONLY when pageSchema
//    is present (avoid emitting empty graphs).
//
// Route wiring (server components — no usePathname needed):
//   app/free-tools/*/layout.js  → pass tool-specific schema
//   app/guides/dns-setup/[provider]/page.js → howTo + faq + breadcrumb
//   app/compare/[matchup]/page.js → faq + breadcrumb + Article
//   app/blogs/[slug]/page.js   → extend components/SEO.js to accept faqs +
//                                 author Person + mainEntity
```

**Schema coverage matrix (target state):**

| Schema | Global | Tool pages | Blog posts | pSEO guides | pSEO compare |
|---|---|---|---|---|---|
| Organization / WebSite | ✅ | ✅ | ✅ | ✅ | ✅ |
| SoftwareApplication | ✅ (suite) | ✅ (page-level, accurate featureList) | — | — | — |
| BreadcrumbList | — | ✅ auto | ✅ auto | ✅ auto | ✅ auto |
| FAQPage | — | ✅ all 6 | ✅ all 31 | ✅ | ✅ |
| HowTo | — | — | when procedural | ✅ | — |
| BlogPosting + Person | — | — | ✅ (extend `components/SEO.js`) | Article | Article |
| Review/Rating | — | — | existing (keep) | — | ✅ (scores) |

## 5.3 `components/RelatedResources.js` (new) — automated cross-linking

**The fix for F1.** One component, three surfaces (blogs, tools, pSEO), zero manual link editing.

```jsx
// components/RelatedResources.js
// Props: { context }  where context = pathname or content slug
// Behavior:
//   1. Look up lib/resource-map.js → { slug: { pillar, tools: [], guides: [], articles: [] } }
//   2. Fallback: keyword-match the page's metadata keywords against a
//      keyword→URL index (also in resource-map.js) — covers posts with no manual entry
//   3. Render a titled section:
//        "Related tools & diagnostic guides"
//        - 2-3 tool cards (reuse components/ToolsCard.js — currently dead code, F2)
//        - 2-3 article links with descriptive anchors
//   4. Renders server-side (component included in page JSX, not client fetch)
//      so links are in initial HTML for crawlers
```

```js
// lib/resource-map.js (shape)
export const resourceMap = {
  "dns-propagation-explained": {
    pillar: "/free-tools/dns-propagation",
    tools: ["/free-tools/dns-propagation", "/free-tools/email-authentication"],
    guides: ["/guides/dns-setup/cloudflare"],
    articles: ["/blogs/point-interserver-domain-to-network-solutions"],
  },
  // …one entry per content slug (31 entries); keywordIndex for fallback:
};
export const keywordIndex = [
  { match: ["dns", "propagation", "nameserver"], url: "/free-tools/dns-propagation", anchor: "check DNS propagation across 8 global resolvers" },
  { match: ["image", "compress", "webp", "avif"], url: "/free-tools/image-compressor", anchor: "compress your images with the free AI image compressor" },
  { match: ["hosting", "ttfb", "uptime"], url: "/free-tools/hosting-recommender", anchor: "get a hosting match in 2 minutes with the AI recommender" },
  { match: ["ip", "isp", "asn", "geolocation"], url: "/free-tools/iplookup", anchor: "look up the IP address details" },
  // …
];
```

**Wiring (exact edits):**
1. `app/blogs/[slug]/page.js` — render `<RelatedResources context={blog.slug} />` above `<Footer />` (line ~209).
2. Each `app/free-tools/*/page.*` — render `<RelatedResources />` after the tool UI, before `<Footer />`.
3. pSEO templates — render auto-derived from dataset `relatedTools`/`relatedGuides` (already in schemas §3).
4. Revive `components/ToolsCard.js` inside `RelatedResources` (import it — F2).

**Anchor governance:** all anchors come from `resource-map.js` (curated strings), so writers can't drift into "click here". Review anchors quarterly in GSC "Links" report.

---

# 6. Phased Execution Roadmap (30-60-90)

> Prioritized by traffic impact. Every item names the exact file. "Ship" = merged + build green (`npm run lint && npm run build`) + GSC URL inspected.

## PHASE 1 — Days 1-30: Fix the leaks (fastest wins, zero new content)

### Week 1 — Metadata correctness + cannibalization

| # | Task | File(s) | Impact |
|---|---|---|---|
| 1.1 | Implement Fix A (description overflow, 158-char cap, short tagline) | `lib/seo.js` | Every SERP snippet stops truncating mid-sentence |
| 1.2 | Implement Fix B (sitewide keyword merge → opt-in) | `lib/seo.js` | Ends sitewide cannibalization (F3) |
| 1.3 | Differentiate ipchecker vs iplookup keywords/copy | `app/free-tools/ipchecker/layout.js`, `app/free-tools/iplookup/layout.js`, both `page.js` | Stabilizes 2 head-term rankings |
| 1.4 | Strip tool-primary keywords from hub metadata; hub owns `free web tools` only | `app/free-tools/page.jsx` | Hub/child conflict resolved |
| 1.5 | Fix trailing slashes in hub cards | `app/free-tools/page.jsx:37,46,55,63,71` | Removes duplicate-URL signal |
| 1.6 | Lowercase `JetHost` slug + add permanent redirect | `content/blogs/jethost-review-can-it-really-beat-bluehost-hostinger.js`, `next.config.mjs` (redirects) | Fixes case-duplicate URL |
| 1.7 | Fix GIF claim vs API reality | `app/free-tools/image-compressor/layout.js` (+ `components/FAQSection.js`) | Accuracy/trust |

### Week 2 — Schema + GEO gaps on existing URLs

| # | Task | File(s) |
|---|---|---|
| 2.1 | Build `routeSchema`/`faqSchema`/`breadcrumbSchema`/`howToSchema` helpers | `lib/seo.js` (Fix C) |
| 2.2 | Route-aware `pageSchema` prop + single script emission | `components/SchemaMarkup.js` |
| 2.3 | FAQPage JSON-LD for `dns-propagation`, `image-compressor`, `hosting-recommender` (data from existing FAQ copy) | `app/free-tools/dns-propagation/page.js`, `app/free-tools/image-compressor/components/FAQSection.js`, `app/free-tools/hosting-recommender/page.js` |
| 2.4 | Add `FaqBlock` + FAQPage to the 8 EN posts missing it (F5 list) | `content/blogs/{best-cheap-uk…,best-email…,best-linux…,bluehost…,fastcomet…,hosting-com…,top-shared…,top-windows…}.js` |
| 2.5 | Add `QuickSummary`/`KeyTakeaways` to the 10 posts missing them (F5) | listed files in `content/blogs/` |
| 2.6 | Extend BlogPosting with `Person` author + `dateModified` | `components/SEO.js` |
| 2.7 | Fix `sitemap.js` hreflang (`alternates.languages` + `x-default`) | `app/sitemap.js` |

### Week 3-4 — Internal linking spine (F1 + F2)

| # | Task | File(s) |
|---|---|---|
| 3.1 | Ship `resource-map.js` (31 entries + keywordIndex) | new `lib/resource-map.js` |
| 3.2 | Ship `RelatedResources` (revives `ToolsCard`) | new `components/RelatedResources.js`, `components/ToolsCard.js` (import) |
| 3.3 | Wire into blog template + all 5 tool pages | `app/blogs/[slug]/page.js`, each `app/free-tools/*/page.*` |
| 3.4 | Editorial pass: add 1 contextual tool anchor to the top 10 trafficked posts (pull list from GSC) | `content/blogs/*.js` |
| 3.5 | Repair `blog-sidebars.json` — delete3 dead keys, add real slugs for top 10 posts **or** replace fallback coupon UI with RelatedResources-driven sidebar | `content/blogs/blog-sidebars.json`, `app/blogs/[slug]/page.js:50-66` |

**Phase 1 exit criteria:** 0 keyword overlaps between ipchecker/iplookup; 100% of indexable pages have FAQPage + BreadcrumbList; ≥3 internal links out of every blog post; description ≤158 chars sitewide.

---

## PHASE 2 — Days 31-60: Cluster depth + first pSEO template

### Weeks 5-6 — Template 1 (DNS setup guides)

| # | Task | File(s) |
|---|---|---|
| 5.1 | Dataset: 12 launch providers (Cloudflare, GoDaddy, Namecheap, AWS Route53, Google Domains→Squarespace, Porkbun, Hover, IONOS, DreamHost, Bluehost, Hostinger, Name.com) with full `records[]`, `gotchas[]`, `faqs[]` | new `Data/pseo/dns-providers.js` |
| 5.2 | Guard library (allowlist, depth floor, uniqueness asserts) | new `lib/pseo/guards.js` |
| 5.3 | Route + `generateMetadata` + HowTo/FAQ schema | new `app/guides/dns-setup/[provider]/page.js` |
| 5.4 | Guide hub index | new `app/guides/page.js` |
| 5.5 | Append guide URLs to sitemap **via guard pass** | `app/sitemap.js` |
| 5.6 | Cluster A spoke tool: SPF/DKIM/DMARC checker (uses existing `/api/ip`-style server route pattern) | new `app/free-tools/email-authentication/page.js` + `layout.js` + new `app/api/email-authentication/route.js` |
| 5.7 | Link hub ↔ guides ↔ tool both directions | `app/free-tools/page.jsx`, `app/guides/page.js` |

### Weeks 7-8 — Cluster A/B/D spoke content + llms.txt

| # | Task | File(s) |
|---|---|---|
| 7.1 | New articles: `dns-propagation-explained`, `core-web-vitals-checklist`, `programmable-seo-playbook`, `technical-seo-audit-checklist` (each with TL;DR + DataTable + FaqBlock + RelatedResources) | new `content/blogs/*.js` + register in `content/blogs/index.js` |
| 7.2 | Tool: HTTP headers checker | new `app/free-tools/http-headers/{page.js,layout.js}` |
| 7.3 | Tool: Schema markup generator | new `app/free-tools/schema-generator/{page.js,layout.js}` |
| 7.4 | `llms.txt` endpoint | new `app/llms.txt/route.js` |
| 7.5 | Explicit AI-crawler allow rules | `app/robots.js` |
| 7.6 | Per-tool OG images (stop sharing 1 image) | new assets in `public/` + each `app/free-tools/*/layout.js` `image:` field |

**Phase 2 exit criteria:** 12 guide pages indexed with HowTo+FAQ rich results eligibility; ≥4 new articles live; every cluster has ≥1 new tool; GSC impressions trending +30% vs Phase 1 baseline.

---

## PHASE 3 — Days 61-90: Templates 2 & 3 + GEO at scale

### Weeks 9-10 — Template 3 (comparisons) — highest commercial intent

| # | Task | File(s) |
|---|---|---|
| 9.1 | `partners.js` entity registry + 40 curated comparison pairs (must map to existing review slugs) | new `Data/pseo/partners.js`, new `Data/pseo/comparisons.js` |
| 9.2 | Comparison route with DataTable + scores + Review JSON-LD + FaqBlock | new `app/compare/[matchup]/page.js` |
| 9.3 | Comparison hub (matrix index) | new `app/compare/page.js` |
| 9.4 | Sitemap append via guard | `app/sitemap.js` |
| 9.5 | Wire `ReviewSlugs` cross-links: comparison ↔ both reviews ↔ recommender | inside template + `components/RelatedResources.js` |

### Weeks 11-12 — Template 2 (ASN pages) + GEO hardening

| # | Task | File(s) |
|---|---|---|
| 11.1 | Curated 300-ASN dataset with required narratives | new `Data/pseo/asns.js` |
| 11.2 | ASN route (prefilled IP lookup widget, peer graph, `indexable` gate) | new `app/asn/[asn]/page.js` + new `app/asn/page.js` (hub) |
| 11.3 | `DiagnosticInsights` component + API `insights[]` responses for all 5 tools | new `components/DiagnosticInsights.js`, `app/api/dns-propagation/route.js`, `app/api/ip/route.js`, `app/api/image-compressor/route.js` |
| 11.4 | `DataTable` + `StatCallout` + `FaqBlock` components generalized for reuse | new `components/{DataTable,StatCallout,FaqBlock}.js` |
| 11.5 | HowTo schema verification in GSC; request indexing for pillar + top 10 spokes | GSC |
| 11.6 | PT/AR locale strategy: either add ≥5 posts per locale before keeping hubs indexable, or `noindex` `blogs/br`, `blogs/sa` hubs until then | `app/blogs/br/page.js`, `app/blogs/sa/page.js`, `app/sitemap.js` |

**Phase 3 exit criteria:** 40 comparison + 300 ASN pages live with self-canonicals; all tools emitting `insights[]`; FAQPage coverage 100% indexable URLs; tracked keyword portfolio ≥250 clustered terms in GSC with per-cluster dashboards.

---

## 6.1 Measurement & KPIs

| Horizon | KPI | Tool |
|---|---|---|
| Weekly | Indexed/Submitted ratio ≥95%; no `Crawled - currently not indexed` spikes | GSC Coverage |
| Weekly | Internal links per page ≥3 (blog), ≥2 (tool) | `lib/resource-map.js` coverage script + GSC Links |
| Bi-weekly | Cluster keyword rankings (4 dashboards, one per cluster A-D) | GSC Performance filtered by query groups |
| Monthly | Rich results: FAQ/HowTo/Breadcrumb impressions vs plain | GSC Enhancements |
| Monthly | **AI Overview citation rate** — track branded+non-branded queries where `rankstack.dev` appears in AI answers; log manually for top 50 cluster queries | Manual + SERP API |
| Quarterly | pSEO pages: % passing guardrails, avg word count, bounce/scroll depth | Analytics |

## 6.2 Risk register

| Risk | Mitigation |
|---|---|
| pSEO scaled-content penalty | Allowlists + uniqueness floors in `lib/pseo/guards.js` (§3.0) — never publish a pair/provider/ASN that fails the build assert |
| Comparison pair duplicate URLs | Alphabetical slug normalization enforced in `generateStaticParams` |
| Internal-link over-optimization | Anchor strings only from `lib/resource-map.js`; max 3 tool links/post |
| Tool page keyword overlap returns when adding new tools | Run the dedup table (§2.1 Cluster A) before every new `layout.js` — primary keyword uniqueness is a PR review checklist item |
| Thin locale hubs | Phase 3, item 11.6 gate |

---

*Blueprint version 1.0 · RankStack.dev · Generated for the post-rebrand growth program. All file paths verified against the repository at time of writing.*
