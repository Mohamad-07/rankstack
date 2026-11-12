import Link from 'next/link';
import { SITE_TAGLINE, TARGET_KEYWORDS } from '@/lib/seo';

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-slate-950 bg-gradient-radial"
      aria-label="RankStack hero"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl animate-blob"></div>
        <div className="absolute top-10 right-1/4 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pb-32 lg:pt-36">
        <div className="text-center">
          <div className="mb-7 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-100 backdrop-blur-xl">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Network diagnostics, image optimization, and technical SEO in one stack
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            AI-Powered Developer Utilities
            <span className="mt-2 block text-gradient">
              & Technical SEO Engine
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300 sm:text-xl">
            {SITE_TAGLINE}
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-400">
            Run a {TARGET_KEYWORDS[1]}, use an {TARGET_KEYWORDS[2]}, compress
            assets with a free {TARGET_KEYWORDS[3]}, and turn every{' '}
            {TARGET_KEYWORDS[4]} into a repeatable {TARGET_KEYWORDS[5]} workflow.
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="glass-card rounded-2xl p-5">
              <div className="text-2xl font-bold text-white">5</div>
              <div className="mt-1 text-sm text-slate-300">Free web tools</div>
            </div>
            <div className="glass-card rounded-2xl p-5">
              <div className="text-2xl font-bold text-white">3</div>
              <div className="mt-1 text-sm text-slate-300">Diagnostic engines</div>
            </div>
            <div className="glass-card rounded-2xl p-5">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="mt-1 text-sm text-slate-300">Free to use</div>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/free-tools"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-8 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:shadow-xl"
              aria-label="Explore RankStack free tools"
            >
              Explore Free Tools
              <svg
                className="ml-2 h-4 w-4"
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
            </Link>
            <Link
              href="/hosting"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-3 text-base font-semibold text-white backdrop-blur-xl transition hover:border-indigo-300/50 hover:bg-white/10"
              aria-label="Browse hosting reviews"
            >
              Browse Hosting Reviews
            </Link>
          </div>

          <div className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-8">
            {TARGET_KEYWORDS.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
