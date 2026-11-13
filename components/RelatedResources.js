import Link from "next/link";
import ToolsCard from "./ToolsCard";
import { resourceMap, toolResources } from "@/lib/resource-map";
import { keywordMap } from "@/lib/seo/keyword-map";

// Display metadata for tool cards (title + short description per tool route).
const TOOL_META = {
  "/free-tools/dns-propagation": {
    title: "DNS Propagation Checker",
    description: "Check DNS record propagation across global resolvers in real time.",
  },
  "/free-tools/ipchecker": {
    title: "IP Checker",
    description: "See your public IPv4 and IPv6 address and network details instantly.",
  },
  "/free-tools/iplookup": {
    title: "IP Lookup",
    description: "Look up any IP address for location, ISP, and timezone details.",
  },
  "/free-tools/whois-lookup": {
    title: "WHOIS Domain Lookup",
    description: "Check public registrar, dates, nameservers, status codes, and DNSSEC using RDAP.",
  },
  "/free-tools/domain-age-checker": {
    title: "Domain Age Checker",
    description: "Calculate domain age from the registry creation date and view its anniversary.",
  },
  "/free-tools/image-compressor": {
    title: "Image Compressor",
    description: "Compress JPEG, PNG, and WebP images without visible quality loss.",
  },
  "/free-tools/hosting-recommender": {
    title: "AI Hosting Recommender",
    description: "Get a hosting match for your budget and traffic in a 2-minute quiz.",
  },
};

// Short, natural anchor text for article links (unique per target page).
const LINK_TEXT = {
  "best-web-hosting-for-new-bloggers-in-2025": "best hosting picks for new bloggers",
  "fastcomet-review": "our FastComet review",
  "jethost-review-can-it-really-beat-bluehost-hostinger": "our JetHost review",
  "point-interserver-domain-to-network-solutions": "pointing an InterServer domain to Network Solutions",
  "misshosting-review-the-stress-free-web-host-youve-been-looking-for": "our MissHosting review",
  "best-web-hosting-small-business-uk": "best UK hosting for small business",
  "interserver-web-hosting-review": "our InterServer review",
  "cloud86-web-hosting-review": "our Cloud86 review",
  "veerotech-web-hosting-review": "our VeeroTech review",
  "hostiso-web-hosting-review": "our Hostiso review",
  "a2-hosting-review-turbo-speed-tested": "our A2 Hosting review",
  "dreamhost-review": "our DreamHost review",
  "scalahosting-review": "our Scala Hosting review",
  "accuweb-hosting-review": "our AccuWeb Hosting review",
  "jet-web-hosting-vs-misshosting": "Jet Hosting vs Miss Hosting compared",
  "crazydomains-review": "our CrazyDomains review",
  "greengeeks-review": "our GreenGeeks review",
  "hostarmada-review-2025": "our HostArmada review",
  "inmotion-hosting-review": "our InMotion Hosting review",
  "webcentral-review": "our WebCentral review",
  "hostmetro-web-hosting-review": "our Hostmetro review",
  "ultimate-website-caching-guide-hosting": "how website caching improves page speed",
  "quick-image-optimization-speed-guide": "the 15-minute image optimization fix",
  "website-speed-seo-rankings-guide": "how page speed affects SEO rankings",
  "hosting-dot-com-review": "our Hosting.com review",
  "best-windows-hosting-providers": "best Windows hosting providers",
  "bluehost-review": "our Bluehost review",
  "best-linux-hosting-providers": "best Linux hosting providers",
  "best-email-hosting-providers": "best email hosting providers",
  "top-shared-hosting-providers": "best shared hosting providers",
  "receive-wise-payments-pakistan": "Wise account eligibility and receiving details in Pakistan",
  "stripe-pakistan-uk-ltd-vs-us-llc": "Stripe setup requirements for a UK LTD or US LLC",
  "virtual-dollar-cards-pakistan": "virtual dollar card costs and payment checks in Pakistan",
  "payoneer-jazzcash-vs-bank-pakistan": "compare Payoneer JazzCash and bank payouts",
  "facebook-reels-monetization-pakistan": "Facebook Reels monetization eligibility in Pakistan",
};

const PILLAR_TEXT = {
  A: "check DNS propagation across global resolvers",
  B: "run a full IP diagnostic",
  C: "compress images before you optimise speed",
  D: "browse all hosting reviews and comparisons",
  E: "explore all free developer tools",
};

/**
 * Server-rendered related resources block for blog posts and tool pages.
 *
 * @param {object} props
 * @param {string} props.context - blog slug (e.g. "dreamhost-review") or
 *                                 tool path (e.g. "/free-tools/ipchecker")
 * @param {string} [props.title] - section heading override
 */
const RelatedResources = ({ context, title = "Related tools & diagnostic guides" }) => {
  if (!context) return null;

  const isTool = context.startsWith("/free-tools");
  const entry = isTool ? toolResources[context] : resourceMap[context];
  if (!entry) return null;

  const seen = new Set([context, isTool ? context : `/blogs/${context}`]);

  const toolPaths = (entry.tools || []).filter((t) => {
    if (seen.has(t) || !TOOL_META[t]) return false;
    seen.add(t);
    return true;
  });

  const articleLinks = (entry.articles || [])
    .filter((slug) => {
      const path = `/blogs/${slug}`;
      if (seen.has(path) || !LINK_TEXT[slug] || !keywordMap[path]) return false;
      seen.add(path);
      return true;
    })
    .map((slug) => ({ href: `/blogs/${slug}`, text: LINK_TEXT[slug] }));

  const pillar = entry.pillar;
  const pillarLink =
    pillar &&
    !seen.has(pillar) &&
    (PILLAR_TEXT[entry.cluster] ? { href: pillar, text: PILLAR_TEXT[entry.cluster] } : null);
  if (pillarLink) seen.add(pillar);

  // Tool pages always keep a path back to the tools hub when no pillar link remains.
  const hubLink =
    isTool && !pillarLink ? { href: "/free-tools", text: PILLAR_TEXT.E } : null;
  if (hubLink) seen.add("/free-tools");

  const links = [pillarLink, hubLink, ...articleLinks].filter(Boolean);

  if (!toolPaths.length && !links.length) return null;

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
      aria-label="Related tools and guides"
    >
      <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">{title}</h2>

      {toolPaths.length > 0 && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toolPaths.map((path) => (
            <ToolsCard
              key={path}
              title={TOOL_META[path].title}
              description={TOOL_META[path].description}
              url={path}
            />
          ))}
        </div>
      )}

      {links.length > 0 && (
        <ul className="mt-5 space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-indigo-600 underline-offset-2 hover:text-indigo-700 hover:underline"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RelatedResources;
