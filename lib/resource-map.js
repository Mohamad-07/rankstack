/**
 * Central resource map — drives components/RelatedResources.js and the
 * internal-linking reports. Derived from lib/seo/keyword-map.js so keyword
 * ownership and linking can never drift apart.
 *
 * Shape (per blog slug):
 *   { cluster, pillar, tools[], articles[], anchors: { tool, article } }
 */
import { keywordMap } from "./seo/keyword-map";

const DEFAULT_ANCHORS = {
  A: {
    tool: "check DNS propagation across global resolvers",
    article: "read our guide to DNS records and nameservers",
  },
  B: {
    tool: "check the IP address details",
    article: "learn how IP geolocation works",
  },
  C: {
    tool: "compress your images with the free RankStack image compressor",
    article: "see how page speed affects SEO rankings",
  },
  D: {
    tool: "get a hosting match in 2 minutes with the AI hosting recommender",
    article: "compare the best web hosting providers",
  },
  E: {
    tool: "browse all free developer tools",
    article: "read the technical SEO audit checklist",
  },
};

const resourceMap = {};

for (const [path, entry] of Object.entries(keywordMap)) {
  if (!path.startsWith("/blogs/")) continue;
  const slug = path.replace("/blogs/", "");
  const defaults = DEFAULT_ANCHORS[entry.cluster] || DEFAULT_ANCHORS.E;
  resourceMap[slug] = {
    cluster: entry.cluster,
    pillar: entry.pillar,
    tools: entry.tools || [],
    articles: (entry.articles || []).filter((a) => a !== path),
    anchors: {
      tool: defaults.tool,
      article: defaults.article,
      pillar: `explore ${entry.primary} resources`,
    },
  };
}

// Explicit cross-links between related hosting posts (editorial pairs).
const CROSS_LINKS = {
  "bluehost-review": ["dreamhost-review", "best-web-hosting-for-new-bloggers-in-2025"],
  "dreamhost-review": ["bluehost-review", "a2-hosting-review-turbo-speed-tested", "greengeeks-review"],
  "a2-hosting-review-turbo-speed-tested": ["dreamhost-review", "scalahosting-review", "hosting-dot-com-review"],
  "jet-web-hosting-vs-misshosting": ["jethost-review-can-it-really-beat-bluehost-hostinger", "misshosting-review-the-stress-free-web-host-youve-been-looking-for"],
  "jethost-review-can-it-really-beat-bluehost-hostinger": ["jet-web-hosting-vs-misshosting", "bluehost-review"],
  "misshosting-review-the-stress-free-web-host-youve-been-looking-for": ["jet-web-hosting-vs-misshosting"],
  "best-web-hosting-for-new-bloggers-in-2025": ["bluehost-review", "dreamhost-review", "top-shared-hosting-providers", "best-web-hosting-small-business-uk"],
  "top-shared-hosting-providers": ["best-linux-hosting-providers", "best-windows-hosting-providers"],
  "best-linux-hosting-providers": ["top-shared-hosting-providers", "best-windows-hosting-providers"],
  "best-windows-hosting-providers": ["best-linux-hosting-providers", "top-shared-hosting-providers"],
  "best-email-hosting-providers": ["top-shared-hosting-providers"],
  "best-web-hosting-small-business-uk": ["best-web-hosting-for-new-bloggers-in-2025", "top-shared-hosting-providers", "best-email-hosting-providers"],
  "website-speed-seo-rankings-guide": ["quick-image-optimization-speed-guide", "ultimate-website-caching-guide-hosting"],
  "quick-image-optimization-speed-guide": ["website-speed-seo-rankings-guide", "ultimate-website-caching-guide-hosting"],
  "ultimate-website-caching-guide-hosting": ["website-speed-seo-rankings-guide", "quick-image-optimization-speed-guide"],
  "point-interserver-domain-to-network-solutions": ["interserver-web-hosting-review"],
  "interserver-web-hosting-review": ["point-interserver-domain-to-network-solutions"],
  "fastcomet-review": ["bluehost-review", "inmotion-hosting-review"],
  "inmotion-hosting-review": ["fastcomet-review", "a2-hosting-review-turbo-speed-tested"],
  "greengeeks-review": ["a2-hosting-review-turbo-speed-tested", "dreamhost-review"],
  "hostarmada-review-2025": ["scalahosting-review", "a2-hosting-review-turbo-speed-tested"],
  "veerotech-web-hosting-review": ["cloud86-web-hosting-review", "hostiso-web-hosting-review"],
  "cloud86-web-hosting-review": ["veerotech-web-hosting-review", "webcentral-review"],
  "hostiso-web-hosting-review": ["veerotech-web-hosting-review", "crazydomains-review"],
  "webcentral-review": ["crazydomains-review", "cloud86-web-hosting-review"],
  "crazydomains-review": ["webcentral-review", "hostmetro-web-hosting-review"],
  "hostmetro-web-hosting-review": ["accuweb-hosting-review", "misshosting-review-the-stress-free-web-host-youve-been-looking-for"],
  "accuweb-hosting-review": ["hostmetro-web-hosting-review", "best-windows-hosting-providers"],
  "scalahosting-review": ["hostarmada-review-2025", "cloud86-web-hosting-review"],
  "hosting-dot-com-review": ["a2-hosting-review-turbo-speed-tested", "interserver-web-hosting-review"],
};

// Drop any cross-link targets that are not live slugs (never link to
// nonexistent or removed pages).
const liveSlugs = new Set(Object.keys(resourceMap));
for (const [slug, targets] of Object.entries(CROSS_LINKS)) {
  if (!resourceMap[slug]) continue;
  const valid = targets.filter((t) => liveSlugs.has(t) && t !== slug);
  if (valid.length) {
    resourceMap[slug].articles = Array.from(new Set([...resourceMap[slug].articles, ...valid]));
  }
}

export { resourceMap };

/** Tool-page resource view: which articles/hubs a tool should link to. */
export const toolResources = Object.fromEntries(
  Object.entries(keywordMap)
    .filter(([path]) => path.startsWith("/free-tools/"))
    .map(([path, entry]) => [
      path,
      {
        cluster: entry.cluster,
        pillar: entry.pillar,
        articles: entry.articles || [],
        tools: (entry.tools || []).filter((t) => t !== path),
      },
    ])
);

export default resourceMap;
