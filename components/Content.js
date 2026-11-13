import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Content = ({ title, imageUrl, content, btnText, btnLink, index = 0 }) => {
  return (
    <article className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
      <div
        className={`relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft ${
          index % 2 === 1 ? "lg:order-2" : ""
        }`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title || "Hosting provider"}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-4"
          />
        ) : null}
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">{content}</p>
        {btnLink ? (
          <Link
            href={btnLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary group mt-6"
          >
            {btnText || "Learn more"}
            <ArrowRight
              className="h-4 w-4 transition group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        ) : null}
      </div>
    </article>
  );
};

export default Content;
