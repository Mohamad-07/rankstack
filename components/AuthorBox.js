import Image from "next/image";
import Link from "next/link";

export default function AuthorBox() {
  return (
    <section
      className="mx-auto my-10 flex max-w-3xl flex-col items-start gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:items-center"
      itemScope
      itemType="https://schema.org/Person"
    >
      <figure className="shrink-0">
        <Image
          src="https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif"
          alt="RankStack editorial team"
          width={80}
          height={80}
          className="h-20 w-20 rounded-xl object-cover"
          itemProp="image"
        />
      </figure>

      <figcaption className="flex-1">
        <meta itemProp="jobTitle" content="Hosting and SEO Research Team" />
        <meta itemProp="url" content="https://rankstack.dev/about" />

        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          Written by
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-950" itemProp="name">
          RankStack
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600" itemProp="description">
          The RankStack editorial team tests hosting, SEO, and performance tools
          hands-on so recommendations reflect real-world results.
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
          <a
            href="https://twitter.com/RankStack"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-700"
            itemProp="sameAs"
          >
            X / Twitter
          </a>
          <a
            href="https://www.linkedin.com/company/rankstack"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-700"
            itemProp="sameAs"
          >
            LinkedIn
          </a>
          <Link href="/about" className="text-slate-600 hover:text-slate-950">
            About RankStack
          </Link>
        </div>
      </figcaption>
    </section>
  );
}
