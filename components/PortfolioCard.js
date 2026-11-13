import Image from "next/image";
import Link from "next/link";
import React from "react";

const PortfolioCard = ({ ImageHref, category, title, description, link }) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={ImageHref}
          alt={`${title} website preview`}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 p-5">
        <div>
          <h2 className="text-base font-semibold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            {description}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold capitalize text-indigo-700">
          {category}
        </span>
      </div>
    </Link>
  );
};

export default PortfolioCard;
