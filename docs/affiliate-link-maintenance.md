# Affiliate Link Maintenance (single source of truth)

This guide is for anyone who needs to add, replace, or update an affiliate
destination on RankStack. You only need to edit **one** file:

```
affiliatelinks.txt
```

Everything else is generated automatically. You do **not** need to touch React
components, blog posts, or the registry file.

## The rule

- ✅ Edit `affiliatelinks.txt`.
- ✅ Run `npm run affiliates:sync` (or just start/build the site — it runs for you).
- ❌ Never edit `lib/affiliates.generated.js` by hand. It is overwritten on every
  sync.
- ❌ Never paste a tracking URL directly into a blog post or component again.
- ❌ Never put a placeholder such as `/affiliate-link` or `/r/your-affiliate-link`
  in the file. Use `PENDING` instead.

How the link travels:

```
affiliatelinks.txt
  -> scripts/import-affiliates.js  (validate + generate)
  -> lib/affiliates.generated.js   (generated; do not edit)
  -> lib/affiliates.js             (aliases / display names, manual layer)
  -> components/AffiliateLink.jsx, Cta.js, HostInfoBox.js
  -> every commercial CTA
```

---

## STEP 1 — Open the source file

Open `affiliatelinks.txt` in any text editor. It has two sections:

- `# ACTIVE AFFILIATE LINKS` — brands with a real, working affiliate URL.
- `# PENDING AFFILIATE LINKS` — genuine commercial recommendations that are
  still waiting for a real affiliate URL.

A brand in the ACTIVE section looks like this:

```
23) GreenGeeks
Affiliate link: https://www.greengeeks.com/track/munazza
```

Copy the whole URL exactly, including `?`, `&`, `#`, and every tracking ID.
Never shorten or "clean up" a URL.

## STEP 2 — Find the brand, or add a new one

Search the file for the brand name.

- **If it already has an `Affiliate link:` line**, edit that line (STEP 3).
- **If it is listed as `PENDING)`,** add an `Affiliate link:` line underneath it
  and it becomes ACTIVE on the next sync.
- **If it is not in the file at all**, add it under the correct section header
  (see Example 1).

Use this name style for the header:

```
31) Name.com
Affiliate link: https://name.sjv.io/LX5Q3Y
```

The number is only an ordering aid; the importer uses the **name** to build the
lookup slug (`Name.com` → `name-com`, `Miss Hosting` → `miss-hosting`).

## STEP 3 — Add or replace the URL

Replace only the URL, leave the label alone:

```
Affiliate link: https://name.sjv.io/LX5Q3Y
```

Optional extra destinations go on their own labelled lines. Each label must be
unique for that brand:

```
Deep link (wordpress 078d15b4): https://hosting.com/hosting/platforms/wordpress-hosting/?aid=695f54098c685&bid=078d15b4
```

## STEP 4 — Run the sync

```
npm run affiliates:sync
```

The sync prints a report like this:

```
affiliatelinks.txt sync complete
  source entries parsed       : 54
  active affiliate URLs       : 46
  pending affiliate URLs      : 21 (awaiting a real URL; no href emitted)
  invalid affiliate URLs      : 0
  duplicate affiliate entries : 1
```

What the four required counts mean:

| Count | Meaning |
| --- | --- |
| active affiliate URLs | Distinct valid URLs that can be used in production (primary URLs plus deep links). |
| pending affiliate URLs | Brands still waiting for a real URL. They emit **no** production href. |
| invalid affiliate URLs | Malformed URLs or ACTIVE brands with no URL. This should stay at `0`. |
| duplicate affiliate entries | The same URL entered more than once (within a brand or shared by two brands). Review these. |

`PENDING` is **not** an error. It is a valid "waiting for a URL" state and is
never emitted as a link. An `http://` URL is preserved exactly (with a warning)
because some legacy programs still issue them.

## STEP 5 — Verify without clicking real links

Check the sync report first (`invalid` should be `0`). Then inspect the generated
file or the locally rendered HTML — for example, search the built files in
`.next/` for a brand or URL. Do **not** open, navigate, or click real affiliate
URLs to test; use static source/HTML inspection only.

---

## Worked examples

### Example 1 — New brand with a tracked URL

Add under `# ACTIVE AFFILIATE LINKS`:

```
32) ExampleHost
Affiliate link: https://examplehost.sjv.io/ABC123
```

Existing CTAs only need `brand="examplehost"` (or `getAffiliateUrl("examplehost")`).
After the sync they automatically point to the new URL.

### Example 2 — Expired link replacement

Suppose a program reissues a link. Replace the URL text on the existing line:

```
# before
Affiliate link: https://oldnetwork.example/OLDID

# after
Affiliate link: https://newnetwork.example/NEWID
```

Deep links keep their own lines; update them too if the program reissued those
IDs. Do not change the label unless the destination's purpose changed.

### Example 3 — URL update (same brand, new tracking ID)

```
# before
21) Miss Hosting
Affiliate link: https://tracking.missaffiliate.com/aff_c?offer_id=42&aff_id=6559

# after
21) Miss Hosting
Affiliate link: https://tracking.missaffiliate.com/aff_c?offer_id=99&aff_id=6559
```

Every CTA for `miss-hosting` changes at once after the sync.

### Example 4 — Second deep-link variant

Under the brand, add another uniquely labelled line:

```
3) BlueHost
Affiliate link: https://bluehost.sjv.io/MXOn22
Deep link (2147539): https://bluehost.sjv.io/c/3600799/2147539/11352
Deep link (2147545): https://bluehost.sjv.io/c/3600799/2147545/11352
Deep link (1376228): https://bluehost.sjv.io/c/3675093/1376228/11352
```

A CTA can then select a specific path with `variant="deep-link-2147539"`, for
example:

```jsx
<AffiliateLink brand="bluehost" variant="deep-link-2147539">Visit</AffiliateLink>
```

### Example 5 — Pending entries

These are valid and intentionally emit no affiliate href:

```
# PENDING AFFILIATE LINKS
PENDING) Cloud86
PENDING) DreamHost
```

Until a real URL is known, review-page CTAs use a temporary **official direct
destination** (for example `https://www.cloud86.com`) as a fallback. To activate
one, add a real URL under its header:

```
PENDING) Cloud86
Affiliate link: https://cloud86.example/REALID
```

After `npm run affiliates:sync` the brand moves to ACTIVE and all of its CTAs
switch to the tracked URL automatically. The `PENDING` word never becomes an
href.

---

## A2 Hosting / Hosting.com

A2 Hosting is now Hosting.com. There is **no separate A2 affiliate record**. The
canonical slug is `hosting-com`:

```
17) Hosting.com: https://hosting.com?aid=695f54098c685
17.1) https://hosting.com/hosting/platforms/wordpress-hosting/?aid=695f54098c685&bid=9edb38b0
Deep link (wordpress 078d15b4): https://hosting.com/hosting/platforms/wordpress-hosting/?aid=695f54098c685&bid=078d15b4
```

Aliases in `lib/affiliates.js` map `a2hosting`, `a2 hosting`, `a2-hosting`, etc.
to `hosting-com`, so both `getAffiliateUrl("hosting-com")` and
`getAffiliateUrl("a2hosting")` return the same Hosting.com URL. Do not add an A2
brand to `affiliatelinks.txt`, and do not invent Hosting.com deep links — only
the supplied variants above exist.

---

## Automatic sync hooks and Cloudflare / OpenNext

`package.json` runs the sync automatically for every real command:

| Command | Hook | Result |
| --- | --- | --- |
| `npm run dev` | `predev` | Sync before local development starts. |
| `npm run build` | `prebuild` | Sync before the production build. |
| `npm run preview` | `prepreview` | Sync before the Cloudflare preview build. |
| `npm run deploy` | `predeploy` | Sync before the Cloudflare deploy build. |

`npm run affiliates:sync` itself is a plain Node script and needs no Cloudflare
credentials.

**If your Cloudflare pipeline bypasses npm lifecycle hooks** (for example it runs
`npx opennextjs-cloudflare deploy`, `npx wrangler deploy`, or a dashboard build
with a raw command), `predeploy` / `prebuild` will not fire. Add the sync as an
explicit step before the OpenNext build:

```
npm run affiliates:sync
npm run build          # or: npx opennextjs-cloudflare build
npx opennextjs-cloudflare deploy
```

For a Cloudflare dashboard build command, use `npm run build` (which triggers
`prebuild`) or `npm run affiliates:sync && npm run build`. Always rebuild the
`.open-next` output after editing `affiliatelinks.txt`; the OpenNext Cloudflare
plugin remains unchanged and compatible — only the source data is regenerated.
