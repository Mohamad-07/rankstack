# Commercial Outbound Link Audit

**Date:** 2026-11-22  
**Scope:** entire codebase (`app/`, `components/`, `content/blogs/` (36 posts), `Data/`, `constant/`, `lib/`, `hooks/`, `scripts/`) + rendered SSG HTML in `.next/server/app/` (60 pages)  
**Mode:** audit-only — no content, link, component, layout, SEO, tracking, redirect, cookie or script changes were made. The only files created are this report and its CSV companion.

**Row-level inventory:** [`commercial-outbound-link-audit.csv`](./commercial-outbound-link-audit.csv) — one row per CTA/commercial placement (classes A, B, C, F), 15 columns. Classes D (editorial) and E (non-commercial) are counted below but excluded from the CSV to keep it focused on monetizable placements.

---

## Phase 6 — Complete inventory

### Method

1. **Source inspection** — every `.js/.jsx/.ts/.tsx/.json` file under the scoped directories was scanned for outbound-link constructs: raw `<a href>` anchors, `<AffiliateLink>` tags, URL attributes on CTA/HostInfoBox/DealBanner/Content/Card component tags (including `buttonLink`, `link`, `btnLink`, `secondaryLink`), URL-bearing props in data arrays, and `getAffiliateUrl()` registry calls.
2. **Rendered-HTML comparison** — every external `<a>` anchor in the pre-built `.next/server/app/**/*.html` output was extracted (route, href, anchor text, attributes) and traced back to its source construct by route + URL + anchor-text scoring. **All 477 rendered external anchors were traced to source** (0 untraced non-social rows).
3. **Registry match** — each destination was compared against `lib/affiliates.generated.js` (20 brands, generated from `affiliatelinks.txt`) for exact-URL and brand-level matches.
4. **Classification** — A–F rules below, applied per placement (no merging).

### Classification rules

| Class | Definition | Rule |
|---|---|---|
| **A** | Existing affiliate / tracked | URL matches a registry entry exactly, or carries a known tracking pattern (`pvxt`/`sjv`/`pxf`/`7eer`/`mno8`/`i3f2`/`anrdoezrs` networks, `a_aid`/`aid=`/`aff_c`, `/c/<digits>`, `/r/<digits>`, `/track/`, `ref/<id>`, affiliate `#hash` fragments, `missaffiliate`), or a placeholder token in a CTA that is *intended* to be an affiliate link |
| **B** | Direct merchant, non-CTA context | Plain merchant URL outside a CTA component/label pattern |
| **C** | Commercial CTA, untracked | Plain merchant URL inside a CTA component or behind a CTA label (`Visit…`, `Get…`, `View Deal…`, `…→`) |
| **D** | Editorial reference | Documentation, standards, government, payment/provider docs and similar informational links |
| **E** | Non-commercial | Social profiles, portfolio/client sites, internal assets |
| **F** | Unknown / manual review | Runtime-generated values that cannot be statically resolved (WHOIS RDAP registrar URL) |

### Counts

| Metric | Value |
|---|---|
| Files examined (js/jsx/json) | 195 |
| Source link constructs found | 304 |
| Rendered external anchors (SSG HTML) | 477 |
| Final audited placements (after source↔rendered merge) | 519 |
| Unique external destinations | 142 |

| Class | Placements | Unique destinations |
|---|---:|---:|
| A — existing affiliate/tracked | 124 | 34 |
| B — direct merchant (non-CTA context) | 29 | 14 |
| C — commercial CTA, untracked | 45 | 25 |
| D — editorial reference | 55 | 37 |
| E — non-commercial | 265 | 36 |
| F — unknown / manual review | 1 | 1 |
| **Total** | **519** | **142** |

### Commercial (monetizable) placements by component

| Component | Placements |
|---|---:|
| raw <a> | 69 |
| AffiliateLink | 45 |
| Cta | 23 |
| HostInfoBox | 20 |
| next/link | 18 |
| Card | 10 |
| Content | 10 |
| ResultsCard | 3 |
| whois-lookup | 1 |

Full row-level detail (A/B/C/F): **[commercial-outbound-link-audit.csv](./commercial-outbound-link-audit.csv)** (199 rows).

---

## Phase 7 — Missed monetization opportunities

Eight categories, ordered by revenue urgency. Every item is a *recommendation only* — nothing has been changed.

### 1. Broken placeholder affiliate tokens — 13 placements, 7 brands

These CTAs ship a literal placeholder path (`/affiliate-link`, `/r/your-affiliate-link`) instead of a real affiliate URL. They are live, visible, and clicking them lands on a 404/non-affiliate path — **these are currently earning nothing and may be actively leaking trust**. None of these brands exist in `affiliatelinks.txt`, so a real program URL must be provisioned first.

| Brand | Placeholder URL | Placements | Pages | Example |
|---|---|---:|---|---|
| a2hosting | `https://www.a2hosting.com/affiliate-link` | 2 | /blogs/a2-hosting-review-turbo-speed-tested | `content/blogs/a2-hosting-review-turbo-speed-tested.js:357` |
| cloud86 | `https://www.cloud86.com/affiliate-link` | 2 | /blogs/cloud86-web-hosting-review | `content/blogs/cloud86-web-hosting-review.js:319` |
| dreamhost | `https://www.dreamhost.com/affiliate-link` | 2 | /blogs/dreamhost-review | `content/blogs/dreamhost-review.js:411` |
| hostiso | `https://www.hostiso.com/affiliate-link` | 2 | /blogs/hostiso-web-hosting-review | `content/blogs/hostiso-web-hosting-review.js:323` |
| scalahosting | `https://www.scalahosting.com/affiliate-link` | 2 | /blogs/scalahosting-review | `content/blogs/scalahosting-review.js:566` |
| veerotech | `https://www.veerotech.net/affiliate-link` | 2 | /blogs/veerotech-web-hosting-review | `content/blogs/veerotech-web-hosting-review.js:318` |
| interserver | `https://www.interserver.net/r/your-affiliate-link` | 1 | /blogs/point-interserver-domain-to-network-solutions | `content/blogs/point-interserver-domain-to-network-solutions.js:226` |

### 2. Commercial CTAs with zero tracking (class C, non-placeholder) — 31 placements

CTA-shaped links (component or label) that go straight to the merchant with no affiliate parameter at all. Each is an immediate monetization gap once a program URL is obtained.

| Destination | Domain | Detected brand | Placements | Pages | Example |
|---|---|---|---:|---|---|
| `https://www.jethost.com` | jethost.com | jethost | 5 | /blogs/bluehost-review, /blogs/fastcomet-review | `content/blogs/bluehost-hosting-review.js:474` |
| `https://siteground.com` | siteground.com | siteground | 4 | /blogs/bluehost-review | `content/blogs/bluehost-hosting-review.js:441` |
| `https://www.smarterasp.net/` | smarterasp.net | smarterasp | 3 | /blogs/best-windows-hosting-providers | `content/blogs/top-windows-hosting-providers.js:449` |
| `https://www.greengeeks.com` | greengeeks.com | greengeeks | 2 | /blogs/best-linux-hosting-providers, /blogs/top-shared-hosting-providers | `content/blogs/best-linux-hosting-providers.js:890` |
| `https://www.ionos.com` | ionos.com | ionos | 2 | /blogs/best-linux-hosting-providers, /blogs/top-shared-hosting-providers | `content/blogs/best-linux-hosting-providers.js:920` |
| `https://www.hostmetro.com` | hostmetro.com | hostmetro | 2 | /blogs/hostmetro-web-hosting-review | `content/blogs/hostmetro-web-hosting-review.js:332` |
| `https://www.webcentral.com.au` | webcentral.com.au | webcentral | 2 | /blogs/webcentral-review | `content/blogs/webcentral-review.js:524` |
| `https://www.fastmail.com` | fastmail.com | fastmail | 1 | /blogs/best-email-hosting-providers | `content/blogs/best-email-hosting-providers.js:812` |
| `https://www.rackspace.com/email-hosting` | rackspace.com | rackspace | 1 | /blogs/best-email-hosting-providers | `content/blogs/best-email-hosting-providers.js:827` |
| `https://www.icewarp.com` | icewarp.com | icewarp | 1 | /blogs/best-email-hosting-providers | `content/blogs/best-email-hosting-providers.js:857` |
| `https://www.dreamhost.com` | dreamhost.com | dreamhost | 1 | /blogs/best-linux-hosting-providers | `content/blogs/best-linux-hosting-providers.js:860` |
| `https://www.veerotech.net/` | veerotech.net | veerotech | 1 | /blogs/best-web-hosting-for-new-bloggers-in-2025 | `content/blogs/best-web-hosting-for-new-bloggers-in-2025.js:296` |
| `https://hostpresto.com/windows-asp-hosting/` | hostpresto.com | hostpresto | 1 | /blogs/best-windows-hosting-providers | `content/blogs/top-windows-hosting-providers.js:1081` |
| `https://eukhost.com` | eukhost.com | eukhost | 1 | /blogs/best-windows-hosting-providers | `content/blogs/top-windows-hosting-providers.js:1304` |
| `https://ionos.com` | ionos.com | ionos | 1 | /blogs/best-windows-hosting-providers | `content/blogs/top-windows-hosting-providers.js:1335` |
| `https://scalahosting.com` | scalahosting.com | scalahosting | 1 | /blogs/best-windows-hosting-providers | `content/blogs/top-windows-hosting-providers.js:1366` |
| `https://www.godaddy.com` | godaddy.com | godaddy | 1 | /blogs/top-shared-hosting-providers | `content/blogs/top-shared-hosting-providers.js:916` |
| `https://www.taxuni.com/oregon-state-income-tax/` | taxuni.com | — | 1 | (shared component) | `components/InstagramEmbed.js:44` |

### 3. Direct merchant links outside CTA components (class B) — 29 placements

Mostly listicle/table links (`Google Workspace →`, `SiteGround.com →`, `View Deal →` tables) rendered as plain anchors. Lower intent than class C but same fix: wrap with `AffiliateLink` once a program URL exists.

| Destination | Domain | Detected brand | Placements | Pages | Example |
|---|---|---|---:|---|---|
| `https://www.a2hosting.com` | a2hosting.com | a2hosting | 4 | /blogs/best-linux-hosting-providers, /blogs/top-shared-hosting-providers | `content/blogs/best-linux-hosting-providers.js:526` |
| `https://www.siteground.com` | siteground.com | siteground | 4 | /blogs/best-linux-hosting-providers, /blogs/top-shared-hosting-providers | `content/blogs/best-linux-hosting-providers.js:610` |
| `https://workspace.google.com` | workspace.google.com | google-workspace | 2 | /blogs/best-email-hosting-providers | `content/blogs/best-email-hosting-providers.js:413` |
| `https://www.microsoft.com/microsoft-365` | microsoft.com | microsoft-365 | 2 | /blogs/best-email-hosting-providers | `content/blogs/best-email-hosting-providers.js:508` |
| `https://www.zoho.com/mail` | zoho.com | zoho-mail | 2 | /blogs/best-email-hosting-providers | `content/blogs/best-email-hosting-providers.js:599` |
| `https://proton.me/mail` | proton.me | proton-mail | 2 | /blogs/best-email-hosting-providers | `content/blogs/best-email-hosting-providers.js:690` |
| `https://www.cloudways.com` | cloudways.com | cloudways | 2 | /blogs/best-linux-hosting-providers | `content/blogs/best-linux-hosting-providers.js:431` |
| `https://www.krystal.co.uk` | krystal.co.uk | krystal | 2 | /blogs/best-web-hosting-small-business-uk | `content/blogs/best-cheap-uk-hosting-for-small-businesses.js:372` |
| `https://ionos.com` | ionos.com | ionos | 2 | /blogs/best-web-hosting-small-business-uk | `content/blogs/best-cheap-uk-hosting-for-small-businesses.js:464` |
| `https://siteground.com` | siteground.com | siteground | 2 | /blogs/best-web-hosting-small-business-uk | `content/blogs/best-cheap-uk-hosting-for-small-businesses.js:553` |
| `https://www.dreamhost.com` | dreamhost.com | dreamhost | 2 | /blogs/top-shared-hosting-providers | `content/blogs/top-shared-hosting-providers.js:774` |
| `https://www.fastmail.com` | fastmail.com | fastmail | 1 | /blogs/best-email-hosting-providers | `content/blogs/best-email-hosting-providers.js:1108` |
| `https://www.smarterasp.net/` | smarterasp.net | smarterasp | 1 | /blogs/best-windows-hosting-providers | `content/blogs/top-windows-hosting-providers.js:1740` |
| `https://interserver.net` | interserver.net | interserver | 1 | /blogs/point-interserver-domain-to-network-solutions | `content/blogs/point-interserver-domain-to-network-solutions.js:92` |

### 4. Tracked links whose brand is missing from the registry — 39 placements, 11 brands

These already carry working affiliate/referral codes but are hard-coded per page instead of flowing through `getAffiliateUrl()`. They work today, yet they cannot be centrally updated, audited or variant-switched. Adding them to `affiliatelinks.txt` + regenerating the registry makes them manageable without touching their URLs (supplied URLs are preserved exactly).

| Brand | Current tracking URL | Placements | Pages | Example |
|---|---|---:|---|---|
| misshosting | `https://tracking.missaffiliate.com/SHga` (+2 more distinct URLs) | 8 | /blogs/best-web-hosting-for-new-bloggers-in-2025, /blogs/jet-web-hosting-vs-misshosting, /blogs/misshosting-review-the-stress-free-web-host-youve-been-looking-for (+2 more) | `content/blogs/best-web-hosting-for-new-bloggers-in-2025.js:251` |
| interserver | `https://www.anrdoezrs.net/click-101156682-15733719` (+2 more distinct URLs) | 6 | /blogs/best-windows-hosting-providers, /blogs/interserver-web-hosting-review, /hosting | `content/blogs/top-windows-hosting-providers.js:1242` |
| jethost | `https://jethost.com/?a_aid=rankstack` (+2 more distinct URLs) | 5 | /blogs/best-web-hosting-for-new-bloggers-in-2025, /blogs/jet-web-hosting-vs-misshosting, /blogs/jethost-review-can-it-really-beat-bluehost-hostinger (+1 more) | `content/blogs/best-web-hosting-for-new-bloggers-in-2025.js:326` |
| greengeeks | `https://www.greengeeks.com/track/munazza` | 3 | /blogs/best-web-hosting-for-new-bloggers-in-2025, /blogs/greengeeks-review | `content/blogs/best-web-hosting-for-new-bloggers-in-2025.js:218` |
| scalahosting | `https://www.scalahosting.com/#661e37f21eb85` | 3 | /hosting | `app/hosting/page.jsx:56` |
| chemicloud | `https://chemicloud.com/#660526c05255d` | 3 | /hosting | `app/hosting/page.jsx:58` |
| atspace | `http://www.atspace.com?aid=MTkyNDE4MjYyNTI2MjE=` | 3 | /hosting | `app/hosting/page.jsx:62` |
| shopify | `https://shopify.pxf.io/ZQdaoK` | 3 | /hosting | `app/hosting/page.jsx:68` |
| namecheap | `https://namecheap.pxf.io/EKoANe` | 2 | /domain | `app/domain/page.jsx:43` |
| name-com | `https://name.sjv.io/LX5Q3Y` | 2 | /domain | `app/domain/page.jsx:50` |
| liquidweb | `https://liquidweb.i3f2.net/WqDnA3` | 1 | /blogs/best-windows-hosting-providers | `content/blogs/top-windows-hosting-providers.js:1273` |

### 5. Registry affiliate links never used in any CTA — 8 of 20 brands

These brands have a live, supplied affiliate URL in the registry but **zero placements** anywhere in the codebase — pure untapped inventory.

| Slug | Name | Supplied affiliate URL |
|---|---|---|
| flashcloud | Flashcloud | `https://flashcloud.pxf.io/m4rgYq` |
| eurodns | EuroDNS | `https://eurodns.pxf.io/5kJRN1` |
| pyproxy | pyproxy | `https://pyproxy.sjv.io/qWd1jN` |
| wegic | wegic | `https://wegic-ai.pxf.io/DWx5Na` |
| kamatera | Kamatera | `https://kamatera.sjv.io/QY1BQx` |
| 10web | 10Web | `https://10web.sjv.io/PzGoDN` |
| vodien | Vodien | `https://vodien.sjv.io/aNdyXo` |
| ultahost | Ultahost | `https://ultahost.sjv.io/Ag6rNN` |

### 6. Inert CTA props that never render — 2 placements

`components/Cta.js` (DealBanner) ignores `secondaryLink`/`secondaryText` entirely, so these configured links are dead code — users never see them:

| Page | File:line | Configured (dead) URL | Label |
|---|---|---|---|
| /blogs/bluehost-review | `content/blogs/bluehost-hosting-review.js:2149` | `https://bluehost.sjv.io/MXOn22` | Or Try BlueHost Risk-Free (30-day refund) |
| /blogs/fastcomet-review | `content/blogs/fastcomet-review.js:1482` | `https://hostinger.sjv.io/rnV05j` | Or Try Hostinger for Better Value |

Note: the dead `bluehost.sjv.io/MXOn22` secondary link sits on the same CTA as the primary button that (incorrectly) points at Hostinger — see category 7. Fixing the component to render `secondaryLink` would both restore the BlueHost offer and resolve half of that mismatch.

### 7. CTA label ↔ destination brand mismatches — 2 placements

| Page | File:line | Anchor text | Actual destination | Resolves to |
|---|---|---|---|---|
| /blogs/bluehost-review | `content/blogs/bluehost-hosting-review.js:1038` | View JetHost Plans (From $1.99/mo) | `https://hostinger.sjv.io/rnV05j` | hostinger |
| /blogs/bluehost-review | `content/blogs/bluehost-hosting-review.js:2149` | Visit BlueHost | `https://hostinger.sjv.io/rnV05j` | hostinger |

Both are in `content/blogs/bluehost-hosting-review.js`: readers expecting BlueHost/JetHost are sent to Hostinger. Either the label or the `brand=` prop is wrong — needs a human decision on intent (manual review, high confidence the two disagree).

### 8. Client-rendered free-tool CTAs (hosting-recommender) — 3 placements

Quiz result cards are rendered client-side only (they do not appear in SSG HTML — see Limitations), so they were audited from source:

| Card CTA | URL | Status |
|---|---|---|
| Visit MissHosting | `https://tracking.missaffiliate.com/aff_c?offer_id=42&aff_id=6559` | Tracked — existing affiliate/referral code (brand not in registry) |
| Visit JetHost | `https://jethost.com/?a_aid=RankStack` | Tracked — existing affiliate/referral code (brand not in registry) |
| Visit SiteGround | `https://siteground.com` | Untracked — direct merchant link in CTA placement |

SiteGround (`siteground.com`, bare, no code) is the actionable gap; MissHosting/JetHost are tracked but uncategorized (category 4).

---

## Phase 8 — Coverage metrics

### Affiliate Coverage Percentage (primary metric)

```
Affiliate Coverage % = tracked commercial placements (A)
                      ÷ total commercial placements (A + B + C)
                    = 124 ÷ 198
                    = 62.6%
```

**Affiliate Coverage Percentage: 62.6%** (124 of 198 commercial placements carry affiliate/tracking parameters; 74 do not. Class F excluded — runtime informational link.)

### Supporting metrics

| Metric | Formula | Result |
|---|---|---|
| CTA-component coverage | tracked CTA-family placements ÷ all CTA-family placements | 96 ÷ 115 = **83.5%** |
| Unique-destination coverage | unique tracked URLs ÷ unique commercial URLs | 34 ÷ 68 = **50.0%** |
| Brand coverage | brands with ≥1 tracked placement ÷ brands seen in commercial placements | 23 ÷ 45 = **51.1%** |
| Registry utilization | registry slugs used in ≥1 tracked placement ÷ registry size | 12 ÷ 20 = **60.0%** |
| Placeholder rate | placeholder placements ÷ commercial placements | 13 ÷ 198 = **6.6%** |
| Rendered-HTML traceability | rendered anchors traced to source ÷ rendered anchors | 477 ÷ 477 = **100%** |

---

## Deep links that must be preserved

These class-A URLs are **destination-specific same-account deep links** (product pages, campaign IDs). They are valid and outperform homepage links — they must **never** be overwritten by a registry homepage URL during any future correction pass:

| URL | Placements | Pages |
|---|---:|---|
| `https://bluehost.sjv.io/c/3600799/2147539/11352` | 4 | /blogs/bluehost-review |
| `https://bluehost.sjv.io/c/3600799/2147545/11352` | 1 | /blogs/bluehost-review |
| `https://hosting.com/hosting/platforms/wordpress-hosting/?aid=695f54098c685&bid=078d15b4` | 3 | /blogs/hosting-dot-com-review |
| `https://network-solutions.7eer.net/c/3600799/2331427/555` | 1 | /blogs/jethost-review-can-it-really-beat-bluehost-hostinger |
| `https://network-solutions.7eer.net/c/3600799/2331419/555` | 1 | /blogs/point-interserver-domain-to-network-solutions |
| `https://bluehost.sjv.io/c/3675093/1376228/11352` | 3 | /hosting |

Also preserve exactly: all supplied affiliate URLs in `lib/affiliates.generated.js` (query parameters, tracking domains and identifiers untouched), and the two registry *variants* (`inmotion-hosting` alt campaign link, `hosting-com` deep WordPress link).

---

## Prioritized recommendations (for review — not yet implemented)

| Priority | Action | Effort | Est. impact |
|---|---|---|---|
| **P0** | Provision real affiliate URLs for the **7 placeholder brands** (a2hosting, cloud86, dreamhost, hostiso, interserver, scalahosting, veerotech) and replace the 13 broken `/affiliate-link` tokens | Medium (needs program sign-ups) | Stops shipping 404-bound CTAs on 7 review posts |
| **P0** | Resolve the **2 label/destination mismatches** in `bluehost-hosting-review.js` (lines 1038 & 2149) — decide intended brand, fix label or `brand=` prop | Low | Correctness/trust on the highest-traffic review page |
| **P1** | Obtain program URLs for the **18 untracked CTA destinations** (class C) and swap in `<AffiliateLink brand=…>` | Medium | Directly raises Affiliate Coverage from 62.6% toward ~90%+ |
| **P1** | Fix `components/Cta.js` to render `secondaryLink`/`secondaryText` (or delete the dead props) — 2 placements | Low | Restores 2 configured CTAs; unblocks the BlueHost fix |
| **P1** | Add the **11 already-tracked brands** to `affiliatelinks.txt` and regenerate (URLs preserved exactly) | Low | Central auditability; no URL changes |
| **P2** | Wrap the **29 class-B listicle links** with `AffiliateLink` as program URLs become available | Medium | Incremental coverage on comparison posts |
| **P2** | Activate the **8 unused registry brands** (flashcloud, eurodns, pyproxy, wegic, kamatera, 10web, vodien, ultahost) in relevant posts/tools | Medium | New revenue from already-supplied links |
| **P3** | Add a lint/CI check that fails on `/affiliate-link` placeholders and bare merchant hosts inside CTA components | Low | Prevents regressions permanently |

---

## Limitations & audit notes

1. **Client-rendered content** — the hosting-recommender quiz results are rendered in the browser after hydration and do not exist in the SSG HTML; they were audited **from source** (`app/free-tools/hosting-recommender/data/hosts.js`). Their live DOM output was not verified.
2. **No browser automation** — no external or affiliate URL was ever clicked, opened or navigated to. All rendered-page evidence comes from the local pre-built `.next` HTML. Redirect chains, cloaking or geolocation-dependent landing pages were therefore not verified (by design).
3. **Network attribution** — affiliate networks for non-registry tracking domains (e.g. `missaffiliate`, `anrdoezrs`, `i3f2`, hash-fragment links) are reported as *unknown*; no network was assumed without evidence from `affiliatelinks.txt` or the registry.
4. **Runtime values** — the WHOIS registrar URL (class F) is populated from a live RDAP response at runtime; only the code path was inspected, not a concrete URL.
5. **Deep links preserved** — no valid deep/referral link was reclassified as a problem or suggested for replacement with a homepage URL.
6. **Duplicate suppression** — identical source constructs that render on many pages (shared footer/author components) are counted once per *placement* in the CSV for commercial classes; D/E counts include per-page renders of shared components.
7. **JSON-LD excluded** — `application/ld+json` `sameAs`/`url` entries are structured data, not user-facing outbound links, and are excluded from placement counts.

---

*End of audit. No corrections have been applied — awaiting review.*
