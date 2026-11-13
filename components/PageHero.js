import Link from "next/link";
import { ChevronRight } from "lucide-react";

const PageHero = ({ eyebrow, title, description, breadcrumb, actions, children }) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial opacity-80" />
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-fuchsia-200/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {breadcrumb?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
              {breadcrumb.map((item, index) => (
                <li key={item.href || item.label} className="flex items-center gap-1.5">
                  {index > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  )}
                  {item.href ? (
                    <Link href={item.href} className="transition hover:text-indigo-600">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-slate-700">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="max-w-3xl">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {description}
            </p>
          ) : null}
          {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        {children}
      </div>
    </section>
  );
};

export default PageHero;
