export const SITE_URL = "https://rankstack.dev";
export const SITE_NAME = "RankStack";

// Brand positioning — used where it fits naturally (hero copy, homepage
// metadata, schema). Never auto-appended to other pages' descriptions.
export const SITE_TAGLINE =
  "RankStack — Free Developer Tools, Network Diagnostics & Technical SEO Utilities";

export const SITE_DESCRIPTION =
  "RankStack offers free developer tools for DNS propagation checks, IP lookup, image compression, technical SEO audits, and programmable SEO.";

// Sitewide keyword themes — homepage/schema use only. Individual pages must
// declare their own keywords; do not merge these into every page.
export const TARGET_KEYWORDS = [
  "free web tools",
  "DNS propagation checker",
  "IP lookup tool",
  "image compressor",
  "technical SEO audit",
  "programmable SEO",
];

export const DEFAULT_OG_IMAGE = `${SITE_URL}/blog-banner-1200x675.webp`;
export const DEFAULT_OG_IMAGE_ALT =
  "RankStack developer utilities, network diagnostics, and technical SEO tools";

export const SOCIAL_LINKS = [
  "https://www.facebook.com/rankstack",
  "https://twitter.com/rankstack",
  "https://www.linkedin.com/company/rankstack",
  "https://www.instagram.com/rankstack",
  "https://www.youtube.com/@rankstack",
];

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Page metadata factory for the App Router Metadata API.
 * - Descriptions are used exactly as provided (no tagline append, no slicing).
 * - Keywords are page-specific (no sitewide merge).
 * - Canonical always matches the sitemap URL (no trailing slash).
 */
export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  type = "website",
  publishedTime,
  modifiedTime,
  section,
  tags,
  noIndex = false,
} = {}) {
  const url = absoluteUrl(path);
  const resolvedTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Free Developer Tools & Technical SEO Utilities`;
  const resolvedDescription = description || SITE_DESCRIPTION;

  return {
    title: { absolute: resolvedTitle },
    description: resolvedDescription,
    keywords: Array.from(new Set(keywords.filter(Boolean))),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(section ? { section } : {}),
      ...(tags?.length ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: "@rankstack",
      creator: "@rankstack",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
