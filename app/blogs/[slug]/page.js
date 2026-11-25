import { blogData } from '@/content/blogs'
import { Fragment } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import RelatedResources from '@/components/RelatedResources'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  createMetadata,
} from '@/lib/seo'
import {
  displayDateLong,
  modifiedDate,
  publishedDate,
  toIso,
} from '@/lib/blog-dates'

export async function generateStaticParams() {
  return blogData.map((blog) => ({
    slug: blog.slug,
  }))
}

const resolveDescription = (blog) =>
  blog.description ||
  blog.excerpt ||
  blog.sections?.[0]?.content?.slice(0, 155) ||
  SITE_DESCRIPTION

const resolveImage = (blog) =>
  typeof blog.imageUrl === 'string'
    ? blog.imageUrl
    : blog.imageUrl?.src || blog.coverImage || undefined

export async function generateMetadata({ params }) {
  const blog = blogData.find((b) => b.slug === params.slug)
  if (!blog) return {}

  return createMetadata({
    title: blog.title,
    description: resolveDescription(blog),
    path: `/blogs/${blog.slug}`,
    keywords: blog.keywords || [],
    image: resolveImage(blog),
    imageAlt: blog.title,
    type: 'article',
    publishedTime: toIso(publishedDate(blog)),
    modifiedTime: toIso(modifiedDate(blog)),
    ...(blog.type ? { section: blog.type } : {}),
    ...(blog.keywords?.length ? { tags: blog.keywords } : {}),
  })
}

const buildJsonLd = (blog) => {
  const canonicalUrl = `${SITE_URL}/blogs/${blog.slug}`
  const image = resolveImage(blog)
  const organizationId = `${SITE_URL}/#organization`

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: resolveDescription(blog),
    ...(image ? { image } : {}),
    author: {
      '@type': 'Person',
      name: blog.author || SITE_NAME,
    },
    publisher: {
      '@id': organizationId,
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/rankstack-logo.png`,
      },
    },
    datePublished: toIso(publishedDate(blog)),
    dateModified: toIso(modifiedDate(blog)),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    url: canonicalUrl,
    ...(blog.keywords?.length ? { keywords: blog.keywords.join(', ') } : {}),
    ...(blog.type ? { articleSection: blog.type } : {}),
    inLanguage: 'en',
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blogs',
        item: `${SITE_URL}/blogs`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.title,
        item: canonicalUrl,
      },
    ],
  }

  return [blogPosting, breadcrumb]
}

const BreadcrumbArrow = () => (
  <svg
    className="h-4 w-4 text-slate-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
)

const BlogPage = ({ params }) => {
  const blog = blogData.find((b) => b.slug === params.slug)

  if (!blog) {
    return notFound()
  }

  const modifiedIso = toIso(modifiedDate(blog))
  const updatedLabel = displayDateLong(blog)
  const jsonLd = buildJsonLd(blog)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {jsonLd.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}

      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm font-medium text-slate-500"
          >
            <Link
              href="/"
              className="transition-colors hover:text-indigo-600"
            >
              Home
            </Link>
            <BreadcrumbArrow />
            <Link
              href="/blogs"
              className="transition-colors hover:text-indigo-600"
            >
              Blogs
            </Link>
            <BreadcrumbArrow />
            <span className="truncate text-slate-900 max-w-[220px] md:max-w-md">
              {blog.title}
            </span>
          </nav>

          <header className="mt-8 max-w-4xl">
            <div className="flex flex-wrap gap-2">
              {blog.categories?.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700"
                >
                  {category}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="mt-5 text-lg leading-relaxed text-slate-600 sm:text-xl">
                {blog.excerpt}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-200 pt-6 text-sm text-slate-500">
              <div className="flex items-center gap-3">
                {blog.authorAvatar ? (
                  <Image
                    src={blog.authorAvatar}
                    alt={blog.author}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white shadow-sm">
                    {(blog.author || 'R').charAt(0)}
                  </div>
                )}
                <span className="font-semibold text-slate-900">
                  {blog.author}
                </span>
              </div>

              <span className="hidden h-4 w-px bg-slate-200 sm:block" />

              <span>
                Updated{' '}
                <time dateTime={modifiedIso} className="font-medium text-slate-700">
                  {updatedLabel}
                </time>
              </span>

              <span className="hidden h-4 w-px bg-slate-200 sm:block" />

              <span>{blog.readingTime || '5 min read'}</span>
            </div>
          </header>

          <article className="blog-article prose prose-lg prose-slate mt-12 max-w-none">
            {blog.content ? (
              <blog.content />
            ) : (
              blog.sections?.map((section, index) => {
                const rendered = (() => {
                  if (section.type === 'heading') return <h2 key={index}>{section.content}</h2>
                  if (section.type === 'paragraph') return <p key={index}>{section.content}</p>
                  if (section.type === 'image') {
                    return (
                      <figure key={index}>
                        <Image
                          src={
                            typeof section.content === 'string'
                              ? section.content
                              : section.content.src
                          }
                          alt={section.caption || 'Blog image'}
                          width={800}
                          height={500}
                          className="h-auto w-full"
                        />
                        {section.caption && (
                          <figcaption className="mt-2 text-center text-sm text-slate-500">
                            {section.caption}
                          </figcaption>
                        )}
                      </figure>
                    )
                  }
                  return null
                })()

                return <Fragment key={index}>{rendered}</Fragment>
              })
            )}
          </article>
        </div>

        <div className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <RelatedResources context={blog.slug} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default BlogPage
