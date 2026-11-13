import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SOCIAL_LINKS,
  TARGET_KEYWORDS,
} from "@/lib/seo";

export default function SchemaMarkup() {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const applicationId = `${SITE_URL}/#software`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/rankstack-logo.png`,
        },
        email: "support@rankstack.dev",
        description: SITE_TAGLINE,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@rankstack.dev",
          availableLanguage: ["English"],
        },
        sameAs: SOCIAL_LINKS,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_TAGLINE,
        publisher: { "@id": organizationId },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": applicationId,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_TAGLINE,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript. Compatible with all modern browsers.",
        isAccessibleForFree: true,
        keywords: TARGET_KEYWORDS.join(", "),
        creator: { "@id": organizationId },
        publisher: { "@id": organizationId },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "DNS propagation checker",
          "IP lookup tool",
          "Free IP checker",
          "AI image compressor",
          "AI hosting recommender",
          "Technical SEO audit resources",
          "Programmable SEO guides",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
