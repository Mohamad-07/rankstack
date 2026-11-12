import { blogData } from '@/content/blogs'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'
import { SITE_URL, createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Hosting, SEO & Developer Blog',
  description:
    'Read RankStack guides on web hosting, DNS, IP diagnostics, image optimization, technical SEO audits, and programmable SEO.',
  path: '/blogs',
  keywords: [
    'hosting reviews',
    'technical SEO guides',
    'DNS guides',
    'IP lookup guides',
    'image optimization',
  ],
})

const BlogsPage = () => {
  const siteUrl = `${SITE_URL}/blogs`

  return (
    <>
      {/* ✅ Breadcrumb Schema */}
      <Script id="breadcrumb-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://rankstack.dev" },
            { "@type": "ListItem", position: 2, name: "Blogs", item: siteUrl },
          ],
        })}
      </Script>

      {/* ✅ Blog List Schema for Google */}
      <Script id="bloglist-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "RankStack Blog",
          description:
            "Explore the latest articles and guides on SEO, web design, digital marketing, and branding from RankStack.",
          url: siteUrl,
          blogPost: blogData.map((blog) => ({
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.description,
            author: { "@type": "Person", name: blog.author },
            datePublished: blog.date,
            url: `https://rankstack.dev/blogs/${blog.slug}`,
            image:
              typeof blog.imageUrl === 'string'
                ? blog.imageUrl
                : blog.imageUrl?.src || 'https://rankstack.dev/default-blog.jpg',
          })),
        })}
      </Script>

      <div className="pt-10">
        <Header />
      </div>

      {/* ✅ Main Content Section */}
      <main role="main" className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-5xl font-bold mb-6 text-center text-gray-900">
          RankStack Blogs — Expert Insights & Tips
        </h1>
        <p className="max-w-2xl mx-auto text-center text-gray-600 mb-10 leading-relaxed">
          Dive into the world of digital marketing, SEO, and web design with expert articles from
          RankStack. Stay updated on the latest trends, strategies, and tools shaping the digital
          world.
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          {blogData.map((blog) => (
            <article
              key={blog.id}
              className="p-5 border rounded-lg shadow hover:shadow-lg transition bg-white"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              {/* ✅ Next.js Image with Lazy Loading */}
              {blog.imageUrl && (
                <Image
                  src={typeof blog.imageUrl === 'string' ? blog.imageUrl : blog.imageUrl.src}
                  alt={blog.title}
                  width={600}
                  height={400}
                  loading="lazy"
                  className="w-full h-48 object-cover rounded"
                />
              )}

              <h2
                className="text-2xl font-semibold mt-4"
                itemProp="headline"
              >
                {blog.title}
              </h2>
              <p className="text-gray-500 text-sm" itemProp="author">
                By {blog.author} – <time itemProp="datePublished">{blog.date}</time>
              </p>
              <p className="mt-2 text-gray-700" itemProp="description">
                {blog.description}
              </p>

              <Link
                href={`/blogs/${blog.slug}`}
                className="text-blue-600 mt-3 inline-block hover:underline font-medium"
                aria-label={`Read more about ${blog.title}`}
                itemProp="url"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default BlogsPage
