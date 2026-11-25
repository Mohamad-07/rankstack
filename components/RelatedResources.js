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
  "/free-tools/proxy-detector": {
    title: "Proxy & Location Detector",
    description: "Score proxy headers, timezone, WebRTC, and IP-versus-GPS consistency.",
  },
  "/free-tools/privacy-audit": {
    title: "Privacy Exposure Audit",
    description: "See which browser signals leak automatically and which need permission.",
  },
  "/free-tools/user-agent-inspector": {
    title: "User-Agent Inspector",
    description: "Decode your user-agent into browser, OS, device, and crawler details.",
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
  "best-ai-website-builders": "the best AI website builders compared",
  "best-linux-hosting-providers": "best Linux hosting providers",
  "best-email-hosting-providers": "best email hosting providers",
  "top-shared-hosting-providers": "best shared hosting providers",
  "best-wordpress-hosting-australia": "best WordPress hosting in Australia compared",
  "receive-wise-payments-pakistan": "Wise account eligibility and receiving details in Pakistan",
  "stripe-pakistan-uk-ltd-vs-us-llc": "Stripe setup requirements for a UK LTD or US LLC",
  "virtual-dollar-cards-pakistan": "virtual dollar card costs and payment checks in Pakistan",
  "payoneer-jazzcash-vs-bank-pakistan": "compare Payoneer JazzCash and bank payouts",
  "facebook-reels-monetization-pakistan": "Facebook Reels monetization eligibility in Pakistan",
  "payment-gateway-in-pakistan": "complete payment gateway in Pakistan guide",
  "best-payment-gateway-woocommerce-pakistan": "best payment gateway for WooCommerce in Pakistan",
  "payment-gateways": "US-focused payment gateways guide",
  "kenya-payment-gatway": "Kenya payment gateway options for small business websites",
  "best-payment-gateways-australia": "Australian payment gateway comparison guide",
  "eway-vs-westpac-vs-nab-payment-gateway-australia": "eWAY vs Westpac vs NAB payment gateway comparison",
  "payment-gateways-shopify-woocommerce-australia": "Shopify and WooCommerce payment gateways in Australia",
  "stripe-payment-gateway-australia": "Stripe payment gateway Australia deep dive",
  "square-payment-gateway-australia": "Square payment gateway Australia deep dive",
  "nmi-payment-gateway-australia": "NMI payment gateway Australia explainer",
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
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft"
      aria-label="Related tools and guides"
    >
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-5 py-5 sm:px-8 sm:py-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </span>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
              {title}
            </h2>
            <p className="text-sm text-indigo-100">
              Free tools and guides to keep reading
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 sm:px-8 sm:py-7">
        {toolPaths.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Free tools
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {toolPaths.map((path) => (
                <ToolsCard
                  key={path}
                  title={TOOL_META[path].title}
                  description={TOOL_META[path].description}
                  url={path}
                />
              ))}
            </div>
          </div>
        )}

        {links.length > 0 && (
          <div className={toolPaths.length ? "mt-6" : undefined}>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Guides &amp; comparisons
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100"
                >
                  {link.text}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H9m8 0v8"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedResources;
