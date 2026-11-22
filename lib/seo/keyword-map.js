/**
 * Central keyword ownership map — single source of truth for keyword
 * targeting, cannibalisation control and internal linking.
 *
 * Ownership rules (see docs/KEYWORD-CLUSTER-MAP.md):
 *  - Exactly one primary keyword per indexable URL.
 *  - No two URLs share the same primary search intent.
 *  - `competes` lists pages that historically overlapped and how it was resolved.
 *
 * Cluster keys: A dns-email | B ip-network | C image-performance |
 *               D hosting | E technical-seo
 */

export const CLUSTERS = {
  A: {
    key: "dns-email",
    name: "DNS & Email Configuration",
    pillar: "/free-tools/dns-propagation",
    intent: "Informational → Tool",
  },
  B: {
    key: "ip-network",
    name: "IP & Network Diagnostics",
    pillar: "/free-tools/ipchecker",
    intent: "Tool",
  },
  C: {
    key: "image-performance",
    name: "Image Optimisation & Web Performance",
    pillar: "/free-tools/image-compressor",
    intent: "Informational → Tool",
  },
  D: {
    key: "hosting",
    name: "Web Hosting & Comparisons",
    pillar: "/hosting",
    intent: "Commercial investigation",
  },
  E: {
    key: "technical-seo",
    name: "Technical SEO & Developer Utilities",
    pillar: "/free-tools",
    intent: "Informational → Tool",
  },
};

const HOSTING_BLOGS = [
  ["best-web-hosting-for-new-bloggers-in-2025", "best web hosting for new bloggers", ["best hosting for beginners", "cheap web hosting", "wordpress hosting"], "Listicle"],
  ["fastcomet-review", "FastComet review", ["fastcomet pricing", "fastcomet vs siteground", "fastcomet migration"], "Review"],
  ["jethost-review-can-it-really-beat-bluehost-hostinger", "JetHost review", ["jet host vs bluehost", "jet host vs hostinger", "jethost performance"], "Review"],
  ["misshosting-review-the-stress-free-web-host-youve-been-looking-for", "MissHosting review", ["misshosting pricing", "misshosting reliability", "budget web hosting"], "Review"],
  ["best-web-hosting-small-business-uk", "best web hosting for small business UK", ["uk web hosting", "uk business hosting", "cheap uk hosting"], "Listicle"],
  ["interserver-web-hosting-review", "InterServer review", ["interserver pricing", "interserver uptime", "interserver vs hostinger"], "Review"],
  ["cloud86-web-hosting-review", "Cloud86 review", ["cloud86 pricing", "cloud86 hosting performance", "european cloud hosting"], "Review"],
  ["veerotech-web-hosting-review", "VeeroTech review", ["veerotech pricing", "veerotech support", "managed cloud hosting"], "Review"],
  ["hostiso-web-hosting-review", "Hostiso review", ["hostiso pricing", "hostiso hosting", "european budget hosting"], "Review"],
  ["a2-hosting-review-turbo-speed-tested", "A2 Hosting review", ["a2 hosting turbo", "a2 hosting pricing", "a2 hosting vs siteground"], "Review"],
  ["dreamhost-review", "DreamHost review", ["dreamhost pricing", "dreamhost wordpress", "dreamhost vs bluehost"], "Review"],
  ["scalahosting-review", "Scala Hosting review", ["scala hosting pricing", "scala hosting ssvps", "scala hosting vs hostinger"], "Review"],
  ["accuweb-hosting-review", "AccuWeb Hosting review", ["accuweb pricing", "accuweb hosting plans", "windows hosting accuweb"], "Review"],
  ["jet-web-hosting-vs-misshosting", "Jet Web Hosting vs Miss Hosting", ["jet hosting vs misshosting", "hosting comparison budget"], "Comparison"],
  ["crazydomains-review", "CrazyDomains review", ["crazydomains pricing", "crazydomains hosting australia", "crazydomains vs ventraip"], "Review"],
  ["greengeeks-review", "GreenGeeks review", ["greengeeks pricing", "greengeeks eco hosting", "greengeeks vs bluehost"], "Review"],
  ["hostarmada-review-2025", "HostArmada review", ["hostarmada pricing", "hostarmada cloud ssd", "hostarmada vs siteground"], "Review"],
  ["inmotion-hosting-review", "InMotion Hosting review", ["inmotion pricing", "inmotion vs bluehost", "inmotion business hosting"], "Review"],
  ["webcentral-review", "WebCentral review", ["webcentral pricing", "webcentral hosting australia", "webcentral vs crazydomains"], "Review"],
  ["hostmetro-web-hosting-review", "Hostmetro review", ["hostmetro pricing", "hostmetro unlimited hosting", "budget hosting review"], "Review"],
  ["hosting-dot-com-review", "Hosting.com review", ["hosting.com pricing", "hosting.com deal", "hosting.com vs a2"], "Review"],
  ["best-windows-hosting-providers", "best Windows hosting providers", ["windows hosting", "asp.net hosting", "best windows web host"], "Listicle"],
  ["bluehost-review", "Bluehost review", ["bluehost pricing", "bluehost wordpress", "bluehost vs dreamhost"], "Review"],
  ["best-linux-hosting-providers", "best Linux hosting providers", ["linux web hosting", "best linux host", "cpanel hosting"], "Listicle"],
  ["best-email-hosting-providers", "best email hosting providers", ["business email hosting", "email hosting pricing", "hosted email providers"], "Listicle"],
  ["top-shared-hosting-providers", "best shared hosting providers", ["shared hosting pricing", "cheap shared hosting", "shared hosting comparison"], "Listicle"],
];

const PERFORMANCE_BLOGS = [
  ["website-speed-seo-rankings-guide", "how website speed affects SEO", ["page speed seo ranking", "core web vitals seo", "site speed optimization"], "Guide"],
  ["quick-image-optimization-speed-guide", "image optimization for website speed", ["compress images for speed", "fix slow website images", "image optimization seo"], "Guide"],
  ["ultimate-website-caching-guide-hosting", "website caching guide", ["browser caching", "server caching hosting", "cache clear best practices"], "Guide"],
];

const DNS_BLOGS = [
  ["point-interserver-domain-to-network-solutions", "point InterServer domain to Network Solutions", ["interServer nameservers", "change nameservers", "domain dns settings"], "How-to"],
];

const PAYMENT_BLOGS = [
  ["receive-wise-payments-pakistan", "Wise account eligibility in Pakistan", ["receive Wise payments in Pakistan", "Wise account details Pakistan", "Wise SWIFT payments Pakistan"], "Guide", ["payoneer-jazzcash-vs-bank-pakistan"]],
  ["stripe-pakistan-uk-ltd-vs-us-llc", "Stripe from Pakistan: UK LTD vs US LLC", ["Stripe account Pakistan", "UK LTD vs US LLC Pakistan", "Stripe foreign-country requirements"], "Guide", ["virtual-dollar-cards-pakistan"]],
  ["virtual-dollar-cards-pakistan", "virtual dollar card fees in Pakistan", ["virtual USD card Pakistan", "Pakistan card for Facebook ads", "international card fees Pakistan"], "Guide", ["stripe-pakistan-uk-ltd-vs-us-llc", "facebook-reels-monetization-pakistan"]],
  ["payoneer-jazzcash-vs-bank-pakistan", "Payoneer JazzCash vs bank withdrawal", ["Payoneer withdrawal Pakistan", "Payoneer JazzCash fee", "Payoneer to Pakistani bank"], "Comparison", ["receive-wise-payments-pakistan"]],
  ["facebook-reels-monetization-pakistan", "Facebook Reels monetization in Pakistan", ["Facebook monetization Pakistan", "Facebook creator payout Pakistan", "Meta monetization eligibility"], "Guide", ["virtual-dollar-cards-pakistan"]],
  ["payment-gateway-in-pakistan", "payment gateway in Pakistan", ["best payment gateway in Pakistan", "online payment gateway in Pakistan", "internet payment gateway Pakistan", "JazzCash payment gateway", "Easypaisa payment gateway", "PayFast Pakistan", "XPay Pakistan"], "Guide", ["best-payment-gateway-woocommerce-pakistan", "receive-wise-payments-pakistan", "stripe-pakistan-uk-ltd-vs-us-llc"]],
  ["best-payment-gateway-woocommerce-pakistan", "best payment gateway for WooCommerce Pakistan", ["WooCommerce payment gateway Pakistan", "payment gateway for WooCommerce Pakistan", "best payment gateway in Pakistan for WooCommerce", "WooCommerce payment integration Pakistan", "JazzCash WooCommerce plugin", "Easypaisa WooCommerce integration", "PayFast WooCommerce integration"], "Guide", ["payment-gateway-in-pakistan", "receive-wise-payments-pakistan", "virtual-dollar-cards-pakistan"]],
];

/**
 * Keyed by canonical path (no trailing slash). Blog entries also carry `slug`.
 */
export const keywordMap = {
  // ---------------------------------------------------------- hubs & landing
  "/": {
    primary: "RankStack",
    secondary: ["developer utilities", "network diagnostics", "technical SEO tools", "web hosting reviews"],
    intent: "Navigational (brand)",
    cluster: "E",
    pillar: null,
    tools: ["/free-tools"],
    articles: ["/blogs"],
    competes: [],
  },
  "/free-tools": {
    primary: "free web tools",
    secondary: ["free developer tools", "online web tools", "technical SEO tools", "free online utilities"],
    intent: "Navigational → Commercial",
    cluster: "E",
    pillar: "/free-tools",
    tools: [
      "/free-tools/dns-propagation",
      "/free-tools/ipchecker",
      "/free-tools/iplookup",
      "/free-tools/image-compressor",
      "/free-tools/hosting-recommender",
    ],
    articles: ["/blogs/technical-seo-audit-checklist"],
    competes: [],
    note: "Hub owns only 'free web tools'; child tools own their own head terms.",
  },
  "/hosting": {
    primary: "best web hosting",
    secondary: ["web hosting reviews", "best web hosting providers", "hosting comparison"],
    intent: "Commercial investigation",
    cluster: "D",
    pillar: "/hosting",
    tools: ["/free-tools/hosting-recommender"],
    articles: ["/blogs/top-shared-hosting-providers", "/blogs/best-linux-hosting-providers"],
    competes: [],
    note: "Hub owns the head term; listicles own segmented heads (shared/linux/windows/email).",
  },
  "/domain": {
    primary: "domain registration deals",
    secondary: ["domain promo codes", "cheap domain names"],
    intent: "Commercial",
    cluster: "E",
    pillar: null,
    tools: [],
    articles: [],
    competes: [],
  },
  "/about": { primary: "RankStack about", secondary: [], intent: "Navigational", cluster: "E", pillar: null, tools: [], articles: [], competes: [] },
  "/services": { primary: "RankStack services", secondary: [], intent: "Navigational", cluster: "E", pillar: null, tools: [], articles: [], competes: [] },
  "/courses": { primary: "RankStack courses", secondary: [], intent: "Navigational", cluster: "E", pillar: null, tools: [], articles: [], competes: [] },
  "/portfolio": { primary: "RankStack portfolio", secondary: [], intent: "Navigational", cluster: "E", pillar: null, tools: [], articles: [], competes: [] },
  "/contact": { primary: "contact RankStack", secondary: [], intent: "Navigational", cluster: "E", pillar: null, tools: [], articles: [], competes: [] },

  // ---------------------------------------------------------- cluster A tools
  "/free-tools/dns-propagation": {
    primary: "DNS propagation checker",
    secondary: ["DNS checker", "DNS propagation", "DNS records checker", "DNS lookup tool", "check nameservers"],
    intent: "Tool",
    cluster: "A",
    pillar: "/free-tools/dns-propagation",
    tools: ["/free-tools/dns-propagation"],
    articles: ["/blogs/point-interserver-domain-to-network-solutions"],
    competes: [],
    note: "Pillar of Cluster A. Hub must not use this as a primary keyword.",
  },
  "/free-tools/whois-lookup": {
    primary: "WHOIS domain lookup",
    secondary: ["domain registration lookup", "RDAP lookup", "domain registrar lookup", "domain expiry checker"],
    intent: "Tool",
    cluster: "A",
    pillar: "/free-tools/whois-lookup",
    tools: ["/free-tools/whois-lookup", "/free-tools/dns-propagation"],
    articles: ["/blogs/point-interserver-domain-to-network-solutions"],
    competes: [],
  },
  "/free-tools/domain-age-checker": {
    primary: "domain age checker",
    secondary: ["check domain age", "domain registration date", "domain creation date lookup", "how old is a domain"],
    intent: "Tool",
    cluster: "A",
    pillar: "/free-tools/domain-age-checker",
    tools: ["/free-tools/domain-age-checker", "/free-tools/whois-lookup", "/free-tools/dns-propagation"],
    articles: [],
    competes: [],
  },

  // ---------------------------------------------------------- cluster B tools
  "/free-tools/ipchecker": {
    primary: "what is my IP",
    secondary: ["my public IP address", "IP address checker", "IPv4 checker", "IPv6 checker"],
    intent: "Tool",
    cluster: "B",
    pillar: "/free-tools/ipchecker",
    tools: ["/free-tools/ipchecker", "/free-tools/iplookup", "/free-tools/proxy-detector", "/free-tools/privacy-audit", "/free-tools/user-agent-inspector"],
    articles: [],
    competes: ["/free-tools/iplookup"],
    note: "Cannibalisation resolved: ipchecker owns self-lookup intent; iplookup owns arbitrary-IP lookup intent.",
  },
  "/free-tools/proxy-detector": {
    primary: "proxy VPN location mismatch detector",
    secondary: ["WebRTC leak test", "timezone mismatch check", "VPN consistency checker"],
    intent: "Tool",
    cluster: "B",
    pillar: "/free-tools/ipchecker",
    tools: ["/free-tools/proxy-detector", "/free-tools/ipchecker", "/free-tools/privacy-audit", "/free-tools/user-agent-inspector"],
    articles: [],
    competes: [],
  },
  "/free-tools/privacy-audit": {
    primary: "browser privacy exposure audit",
    secondary: ["what websites know about me", "browser fingerprint check", "location permission exposure"],
    intent: "Tool",
    cluster: "B",
    pillar: "/free-tools/ipchecker",
    tools: ["/free-tools/privacy-audit", "/free-tools/ipchecker", "/free-tools/proxy-detector", "/free-tools/user-agent-inspector"],
    articles: [],
    competes: [],
  },
  "/free-tools/user-agent-inspector": {
    primary: "user agent inspector",
    secondary: ["my user agent string", "browser OS detector", "user agent breakdown"],
    intent: "Tool",
    cluster: "B",
    pillar: "/free-tools/ipchecker",
    tools: ["/free-tools/user-agent-inspector", "/free-tools/ipchecker", "/free-tools/proxy-detector", "/free-tools/privacy-audit"],
    articles: [],
    competes: [],
  },
  "/free-tools/iplookup": {
    primary: "IP address lookup",
    secondary: ["IP lookup tool", "IP geolocation lookup", "ISP lookup", "IP finder"],
    intent: "Tool",
    cluster: "B",
    pillar: "/free-tools/ipchecker",
    tools: ["/free-tools/iplookup", "/free-tools/ipchecker"],
    articles: [],
    competes: ["/free-tools/ipchecker"],
    note: "Does not target 'what is my IP' or 'IP address checker'.",
  },

  // ---------------------------------------------------------- cluster C tools
  "/free-tools/image-compressor": {
    primary: "image compressor",
    secondary: ["compress image online", "free image compressor", "reduce image size", "image size reducer"],
    intent: "Tool",
    cluster: "C",
    pillar: "/free-tools/image-compressor",
    tools: ["/free-tools/image-compressor"],
    articles: [
      "/blogs/quick-image-optimization-speed-guide",
      "/blogs/website-speed-seo-rankings-guide",
      "/blogs/ultimate-website-caching-guide-hosting",
    ],
    competes: [],
    note: "Supports JPEG, PNG, WebP only — never claim GIF support.",
  },

  // ---------------------------------------------------------- cluster D tools
  "/free-tools/hosting-recommender": {
    primary: "AI hosting recommender",
    secondary: ["hosting quiz", "which hosting is best for me", "web hosting selector"],
    intent: "Tool → Commercial",
    cluster: "D",
    pillar: "/hosting",
    tools: ["/free-tools/hosting-recommender"],
    articles: ["/blogs/best-web-hosting-for-new-bloggers-in-2025", "/blogs/top-shared-hosting-providers"],
    competes: [],
  },
};

// ------------------------------------------------------------ blog ownership
for (const [slug, primary, secondary, format] of HOSTING_BLOGS) {
  keywordMap[`/blogs/${slug}`] = {
    slug,
    primary,
    secondary,
    intent: format === "Listicle" || format === "Comparison" ? "Commercial investigation" : "Commercial (review)",
    cluster: "D",
    pillar: "/hosting",
    tools: ["/free-tools/hosting-recommender"],
    articles: [],
    competes: [],
    format,
  };
}

for (const [slug, primary, secondary, format] of PERFORMANCE_BLOGS) {
  keywordMap[`/blogs/${slug}`] = {
    slug,
    primary,
    secondary,
    intent: "Informational",
    cluster: "C",
    pillar: "/free-tools/image-compressor",
    tools: ["/free-tools/image-compressor"],
    articles: [],
    competes: [],
    format,
  };
}

for (const [slug, primary, secondary, format] of DNS_BLOGS) {
  keywordMap[`/blogs/${slug}`] = {
    slug,
    primary,
    secondary,
    intent: "Informational (how-to)",
    cluster: "A",
    pillar: "/free-tools/dns-propagation",
    tools: ["/free-tools/dns-propagation"],
    articles: [],
    competes: [],
    format,
  };
}

for (const [slug, primary, secondary, format, articles] of PAYMENT_BLOGS) {
  keywordMap[`/blogs/${slug}`] = {
    slug,
    primary,
    secondary,
    intent: "Informational",
    cluster: "E",
    pillar: "/free-tools",
    tools: [],
    articles,
    competes: [],
    format,
  };
}

keywordMap["/blogs/best-ai-website-builders"] = {
  slug: "best-ai-website-builders",
  primary: "best AI website builders",
  secondary: ["AI website builder", "AI site builder", "AI website generator", "prompt to website"],
  intent: "Commercial investigation",
  cluster: "E",
  pillar: "/free-tools",
  tools: [],
  articles: [
    "/blogs/bluehost-review",
    "/blogs/website-speed-seo-rankings-guide",
    "/blogs/top-shared-hosting-providers",
  ],
  competes: [],
  format: "Listicle",
};

/** Resolve ownership for a canonical path (or blog slug). */
export function getKeywordEntry(pathOrSlug) {
  if (!pathOrSlug) return null;
  const path = pathOrSlug.startsWith("/") ? pathOrSlug : `/blogs/${pathOrSlug}`;
  return keywordMap[path] || null;
}

/** All primary keywords — used to detect accidental double-ownership. */
export function listPrimaryKeywords() {
  return Object.entries(keywordMap).map(([path, entry]) => ({
    path,
    primary: entry.primary,
    cluster: entry.cluster,
  }));
}
