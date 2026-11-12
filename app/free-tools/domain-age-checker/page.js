"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedResources from "@/components/RelatedResources";
import { ArrowRight, CalendarDays, Check, ChevronDown, Clock3, ExternalLink, RotateCcw, Search } from "lucide-react";

const formatDate = (date) => new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
}).format(date);

function addYearsClamped(date, years) {
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const result = new Date(Date.UTC(date.getUTCFullYear() + years, month, 1));
  const lastDay = new Date(Date.UTC(result.getUTCFullYear(), month + 1, 0)).getUTCDate();
  result.setUTCDate(Math.min(day, lastDay));
  return result;
}

function getAgeParts(start, now) {
  let years = now.getUTCFullYear() - start.getUTCFullYear();
  let anniversary = addYearsClamped(start, years);
  if (anniversary > now) {
    years -= 1;
    anniversary = addYearsClamped(start, years);
  }

  let months = 0;
  let cursor = new Date(anniversary);
  while (months < 11) {
    const nextMonth = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1));
    const lastDay = new Date(Date.UTC(nextMonth.getUTCFullYear(), nextMonth.getUTCMonth() + 1, 0)).getUTCDate();
    nextMonth.setUTCDate(Math.min(cursor.getUTCDate(), lastDay));
    if (nextMonth > now) break;
    cursor = nextMonth;
    months += 1;
  }

  const days = Math.floor((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate())) / 86400000);
  return { years, months, days };
}

function getNextAnniversary(start, now) {
  let anniversary = addYearsClamped(start, now.getUTCFullYear() - start.getUTCFullYear());
  if (anniversary <= now) anniversary = addYearsClamped(start, now.getUTCFullYear() - start.getUTCFullYear() + 1);
  return anniversary;
}

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "RankStack Domain Age Checker",
  applicationCategory: "NetworkApplication",
  operatingSystem: "Any",
  description: "Calculate a domain's age from the registration event reported by its authoritative RDAP registry.",
  url: "https://rankstack.dev/free-tools/domain-age-checker",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rankstack.dev/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://rankstack.dev/free-tools" },
    { "@type": "ListItem", position: 3, name: "Domain Age Checker", item: "https://rankstack.dev/free-tools/domain-age-checker" },
  ],
};

export default function DomainAgeCheckerPage() {
  const [domain, setDomain] = useState("");
  const [record, setRecord] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkAge = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setRecord(null);

    try {
      const response = await fetch(`/api/whois-lookup?domain=${encodeURIComponent(domain)}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The registry record could not be retrieved.");
      if (!data.dates?.registered || Number.isNaN(new Date(data.dates.registered).getTime())) {
        throw new Error("The registry returned no usable registration date for this domain.");
      }
      setDomain(data.domain);
      setRecord(data);
    } catch (lookupError) {
      setError(lookupError.message || "The domain age could not be calculated. Try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  const createdAt = record ? new Date(record.dates.registered) : null;
  const now = new Date();
  const age = createdAt ? getAgeParts(createdAt, now) : null;
  const anniversary = createdAt ? getNextAnniversary(createdAt, now) : null;
  const nextMilestone = createdAt ? addYearsClamped(createdAt, Math.ceil((now.getUTCFullYear() - createdAt.getUTCFullYear() + 1) / 5) * 5) : null;
  const lastMilestone = nextMilestone ? addYearsClamped(createdAt, Math.max(0, Math.floor((now.getUTCFullYear() - createdAt.getUTCFullYear()) / 5) * 5)) : null;
  const progress = lastMilestone && nextMilestone
    ? Math.max(0, Math.min(100, ((now.getTime() - lastMilestone.getTime()) / (nextMilestone.getTime() - lastMilestone.getTime())) * 100))
    : 0;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <main className="min-h-screen bg-[#f5f7f8] text-slate-900">
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
              <ol className="flex items-center gap-2">
                <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/free-tools" className="hover:text-slate-900">Free Tools</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-slate-800">Domain Age Checker</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <header className="mb-8 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-800">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              DOMAIN HISTORY
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Domain age checker</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Calculate how long a domain has been registered using its registry-reported creation date. See its registration anniversary, registrar, and the RDAP source.
            </p>
          </header>

          <section aria-labelledby="age-check-heading" className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.75fr)]">
            <div className="min-w-0">
              <form onSubmit={checkAge} className="border-y border-slate-300 bg-white px-5 py-6 sm:px-7">
                <label id="age-check-heading" htmlFor="age-domain-input" className="mb-2 block text-sm font-semibold text-slate-800">Domain name</label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="age-domain-input"
                    type="text"
                    inputMode="url"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    required
                    maxLength={253}
                    value={domain}
                    onChange={(event) => setDomain(event.target.value)}
                    placeholder="example.com"
                    aria-describedby="age-domain-help"
                    className="h-12 min-w-0 flex-1 border border-slate-300 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
                  />
                  <button type="submit" disabled={loading || !domain.trim()} className="inline-flex h-12 items-center justify-center gap-2 bg-amber-800 px-6 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:bg-slate-400">
                    {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <Search className="h-4 w-4" />}
                    {loading ? "Checking registry" : "Check domain age"}
                  </button>
                </div>
                <p id="age-domain-help" className="mt-2 text-xs text-slate-500">Enter a domain only, without https:// or a page path. Age is calculated from the registry creation event.</p>
                {error && <p role="alert" className="mt-4 border-l-2 border-rose-700 bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p>}
              </form>

              {loading && <div role="status" className="mt-6 flex items-center gap-3 border-y border-slate-300 bg-white px-5 py-5 text-sm text-slate-600"><span className="h-4 w-4 animate-spin rounded-full border-2 border-amber-800/20 border-t-amber-800" />Reading the authoritative registry record…</div>}

              {record && age && createdAt && anniversary && nextMilestone && lastMilestone && (
                <section aria-live="polite" className="mt-8 border-y border-slate-300 bg-white">
                  <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
                    <p className="text-xs font-semibold uppercase text-slate-500">Calculated registration age</p>
                    <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="break-all font-mono text-xl font-bold text-slate-950">{record.ldhName}</h2>
                      <span className="text-sm text-slate-500">as of {formatDate(now)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 divide-x divide-slate-200 border-b border-slate-200">
                    {[[age.years, "Years"], [age.months, "Months"], [age.days, "Days"]].map(([value, label]) => (
                      <div key={label} className="px-3 py-6 text-center sm:px-6 sm:py-8">
                        <div className="text-3xl font-bold tabular-nums text-amber-900 sm:text-4xl">{value}</div>
                        <div className="mt-1 text-xs font-semibold uppercase text-slate-500">{label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border-b border-slate-200 px-5 py-6 sm:px-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Registration timeline</h3>
                        <p className="mt-1 text-xs text-slate-500">Time since the previous 5-year mark</p>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-700"><CalendarDays className="h-4 w-4 text-amber-800" />{age.years} years registered</span>
                    </div>
                    <div className="mt-5 h-2 overflow-hidden bg-slate-100" role="progressbar" aria-label="Progress toward next five-year domain-age milestone" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
                      <div className="h-full bg-amber-700 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="mt-2 flex justify-between gap-4 text-xs text-slate-500">
                      <span>{formatDate(lastMilestone)}</span>
                      <span>{formatDate(nextMilestone)} · {nextMilestone.getUTCFullYear() - createdAt.getUTCFullYear()}-year mark</span>
                    </div>
                  </div>

                  <div className="grid gap-0 sm:grid-cols-2">
                    <div className="border-b border-slate-100 px-5 py-4 sm:px-7">
                      <div className="text-xs font-semibold uppercase text-slate-500">First registered</div>
                      <div className="mt-1 text-sm font-medium text-slate-900">{formatDate(createdAt)}</div>
                    </div>
                    <div className="border-b border-slate-100 px-5 py-4 sm:px-7">
                      <div className="text-xs font-semibold uppercase text-slate-500">Next anniversary</div>
                      <div className="mt-1 text-sm font-medium text-slate-900">{formatDate(anniversary)}</div>
                    </div>
                    <div className="border-b border-slate-100 px-5 py-4 sm:px-7">
                      <div className="text-xs font-semibold uppercase text-slate-500">Registrar</div>
                      <div className="mt-1 break-words text-sm font-medium text-slate-900">{record.registrar?.name || "Not published"}</div>
                    </div>
                    <div className="border-b border-slate-100 px-5 py-4 sm:px-7">
                      <div className="text-xs font-semibold uppercase text-slate-500">Registry source</div>
                      <div className="mt-1 break-all font-mono text-sm font-medium text-slate-900">{record.source}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 text-xs leading-5 text-slate-600 sm:px-7">
                    <RotateCcw className="h-4 w-4 shrink-0 text-amber-800" />
                    Registration age is not the same as website age, ownership history, or search-engine trust. Registry dates may be missing or reflect a re-registration.
                    <Link href={`/free-tools/whois-lookup?domain=${encodeURIComponent(record.domain)}`} className="inline-flex items-center gap-1 font-semibold text-amber-900 underline underline-offset-2">View full record <ArrowRight className="h-3 w-3" /></Link>
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-6">
              <section className="border-y border-slate-300 bg-white p-5 sm:p-6">
                <h2 className="text-sm font-bold uppercase text-slate-800">What the age means</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">The result uses the registry&apos;s domain creation event. It does not show when a website first launched, how long the current owner has held the domain, or whether the domain changed hands.</p>
              </section>
              <section className="border-y border-slate-300 bg-white p-5 sm:p-6">
                <h2 className="text-sm font-bold uppercase text-slate-800">Data limitations</h2>
                <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                  <li>Some TLD registries do not publish RDAP records or creation dates.</li>
                  <li>Deleted and re-registered domains may have a newer creation date than their earlier history.</li>
                  <li>Age alone is not a ranking, trust, or ownership signal.</li>
                </ul>
              </section>
            </aside>
          </section>

          <section className="mt-14 max-w-4xl border-t border-slate-300 pt-8">
            <h2 className="text-xl font-bold text-slate-900">Domain age questions</h2>
            <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200 bg-white">
              <details className="group px-4 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-800">How is domain age calculated?<ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" /></summary>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">We calculate the elapsed calendar years, months, and days between the registry-reported creation date and today. If the registry does not publish that event, the checker cannot calculate an age.</p>
              </details>
              <details className="group px-4 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-800">Does an older domain rank better in search?<ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" /></summary>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Domain age by itself does not establish quality, ownership, or rankings. Search visibility depends on many factors, including useful content and how a site serves its audience.</p>
              </details>
              <details className="group px-4 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-800">Can this tell me who owns a domain?<ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" /></summary>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">No. Registration data may show a registrar or redacted registrant details, but this age check does not verify current ownership. Use the <Link className="text-amber-900 underline underline-offset-2" href="/free-tools/whois-lookup">WHOIS domain lookup</Link> for other public registry fields.</p>
              </details>
            </div>
          </section>

          <RelatedResources context="/free-tools/domain-age-checker" />
        </div>
      </main>
      <Footer />
    </>
  );
}