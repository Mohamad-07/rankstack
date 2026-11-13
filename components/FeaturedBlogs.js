import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { blogData } from "@/content/blogs";
import BlogCard from "./BlogCard";

const sortByNewest = (a, b) => {
  const dateA = new Date(a.updatedDate || a.date).getTime();
  const dateB = new Date(b.updatedDate || b.date).getTime();
  return (Number.isNaN(dateB) ? 0 : dateB) - (Number.isNaN(dateA) ? 0 : dateA);
};

const FeaturedBlogs = () => {
  const posts = [...blogData].sort(sortByNewest).slice(0, 3);

  return (
    <section className="section bg-gradient-to-b from-white to-slate-50">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Featured reading
          </span>
          <h2 className="section-title mt-4">Latest hosting insights & SEO guides</h2>
          <p className="section-copy mt-4">
            Evidence-based reviews, practical tutorials, and technical SEO
            breakdowns to help you make better infrastructure decisions.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} blog={post} featured />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/blogs" className="btn-secondary group">
            View all articles
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
