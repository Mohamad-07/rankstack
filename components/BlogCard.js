import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { displayDate } from "@/lib/blog-dates";

const getImageSrc = (image) => {
  if (!image) return "/blog-banner-1200x675.webp";
  if (typeof image === "string") return image;
  return image.src || "/blog-banner-1200x675.webp";
};

const BlogCard = ({ blog, featured = false }) => {
  const image = getImageSrc(blog.imageUrl || blog.coverImage);
  const category =
    blog.categories?.[0] || blog.category || (blog.type === "tutorial" ? "Tutorial" : "Guide");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lift">
      <Link
        href={`/blogs/${blog.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
        aria-label={`Read ${blog.title}`}
      >
        <Image
          src={image}
          alt={blog.title || "RankStack article cover"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur">
          {category}
        </span>
        {featured && (
          <span className="absolute right-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            Featured
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {displayDate(blog)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            {blog.readingTime || "6 min read"}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-slate-950 transition group-hover:text-indigo-700 sm:text-xl">
          <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {blog.description || blog.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs font-medium text-slate-500">
            By {blog.author || "RankStack Experts"}
          </span>
          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition group-hover:gap-2.5 hover:text-indigo-800"
            aria-label={`Read more about ${blog.title}`}
          >
            Read more
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
