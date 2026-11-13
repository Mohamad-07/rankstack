import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SITE_TAGLINE, TARGET_KEYWORDS } from "@/lib/seo";

const stats = [
  { value: "7", label: "Free web tools" },
  { value: "3", label: "Diagnostic engines" },
  { value: "100%", label: "Free to use" },
];

const HeroSection = () => {
  return (
    <section
      className="relative isolate overflow-hidden bg-slate-950"
      aria-label="RankStack hero"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-radial" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[length:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div className="absolute -top-24 left-1/4 -z-10 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl" />
      <div className="absolute right-1/4 top-10 -z-10 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 -z-10 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="eyebrow-dark mx-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Diagnostics, optimization, and technical SEO in one stack
          </div>

          <h1 className="mt-7 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
            AI-powered developer utilities
            <span className="mt-2 block text-gradient">
              and a technical SEO engine
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {SITE_TAGLINE}
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Run a {TARGET_KEYWORDS[1]}, use an {TARGET_KEYWORDS[2]}, compress
            assets with a free {TARGET_KEYWORDS[3]}, and turn every{" "}
            {TARGET_KEYWORDS[4]} into a repeatable {TARGET_KEYWORDS[5]} workflow.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/free-tools"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-indigo-50 sm:text-base"
              aria-label="Explore RankStack free tools"
            >
              Explore free tools
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/hosting"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/25 hover:bg-white/10 sm:text-base"
              aria-label="Browse hosting reviews"
            >
              Browse hosting reviews
            </Link>
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-slate-400 sm:text-sm">
            <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            No signup. No paywall. Just useful tools.
          </p>

          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-2 border-t border-white/10 pt-8">
          {TARGET_KEYWORDS.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-400"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
