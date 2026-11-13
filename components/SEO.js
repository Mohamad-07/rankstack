import { SITE_NAME, SITE_URL } from "@/lib/seo"

const SEO = ({ blog, path }) => {
  if (!blog) return null

  const { title, description, imageUrl, slug, author, date, updatedDate } = blog
  const canonicalUrl = `${SITE_URL}${path || `/blogs/${slug}`}`
  const image =
    typeof imageUrl === "string" ? imageUrl : imageUrl?.src || `${SITE_URL}/rankstack-logo.png`

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          description,
          image,
          author: {
            "@type": "Person",
            name: author,
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/rankstack-logo.png`,
            },
          },
          datePublished: date,
          dateModified: updatedDate || date,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
          },
        }),
      }}
    />
  )
}

export default SEO
