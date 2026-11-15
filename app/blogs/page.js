import { blogData } from "@/content/blogs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BlogCard from "@/components/BlogCard";
import { SITE_URL, createMetadata } from "@/lib/seo";
import { modifiedDate, publishedDate, toIso } from "@/lib/blog-dates";

export const metadata = createMetadata({
  title: "Hosting, SEO & Developer Blog",
  description:
    "Read RankStack guides on web hosting, DNS, IP diagnostics, image optimization, technical SEO audits, and programmable SEO.",
  path: "/blogs",
  keywords: [
    "hosting reviews",
    "technical SEO guides",
    "DNS guides",
    "IP lookup guides",
    "image optimization",
  ],
});

const sortByNewest = (a, b) => {
  const dateA = new Date(a.updatedDate || a.date).getTime();
  const dateB = new Date(b.updatedDate || b.date).getTime();
  return (Number.isNaN(dateB) ? 0 : dateB) - (Number.isNaN(dateA) ? 0 : dateA);
};

const BlogsPage = () => {
  const siteUrl = `${SITE_URL}/blogs`;
  const posts = [...blogData].sort(sortByNewest);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Blogs", item: siteUrl },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "RankStack Blog",
            description:
              "Hosting reviews, technical SEO guides, and practical developer tutorials from RankStack.",
            url: siteUrl,
            blogPost: posts.slice(0, 12).map((blog) => ({
              "@type": "BlogPosting",
              headline: blog.title,
              description: blog.description,
              author: { "@type": "Person", name: blog.author },
              datePublished: toIso(publishedDate(blog)),
              dateModified: toIso(modifiedDate(blog)),
              url: `${SITE_URL}/blogs/${blog.slug}`,
              image:
                typeof blog.imageUrl === "string"
                  ? blog.imageUrl
                  : blog.imageUrl?.src || `${SITE_URL}/blog-banner-1200x675.webp`,
            })),
          }),
        }}
      />

      <Header />

      <main>
        <PageHero
          eyebrow="RankStack journal"
          title="Hosting, SEO, and developer guides"
          description="Evidence-based reviews and practical tutorials to help you choose better infrastructure, fix technical issues, and grow organic traffic."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Blogs" },
          ]}
        />

        <section className="section bg-white">
          <div className="shell">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogsPage;
