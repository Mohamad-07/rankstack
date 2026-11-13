import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { blogData } from "@/content/blogs";
import BlogCard from "./BlogCard";

const Tutorials = () => {
  const tutorials = blogData.filter((blog) => blog.type === "tutorial");
  const posts = (tutorials.length ? tutorials : blogData).slice(0, 6);

  return (
    <section className="section bg-white" id="tutorials">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Learn by doing
            </span>
            <h2 className="section-title mt-4">Latest tutorials & guides</h2>
            <p className="section-copy mt-4">
              Step-by-step walkthroughs for web hosting, DNS, technical SEO, and
              performance optimization.
            </p>
          </div>

          <Link href="/blogs" className="btn-secondary group shrink-0">
            View all tutorials
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((blog) => (
            <BlogCard blog={blog} key={blog.slug} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tutorials;
