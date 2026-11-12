"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedResources from "@/components/RelatedResources";
import { CalendarDays, Check, ChevronDown, Copy, ExternalLink, Globe2, Search, ShieldCheck } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "Not published";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(date) + " UTC";
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "RankStack WHOIS Domain Lookup",
  applicationCategory: "NetworkApplication",
  operatingSystem: "Any",
  description: "Look up public domain registration data from authoritative RDAP registries.",
  url: "https://rankstack.dev/free-tools/whois-lookup",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rankstack.dev/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://rankstack.dev/free-tools" },
    { "@type": "ListItem", position: 3, name: "WHOIS Domain Lookup", item: "https://rankstack.dev/free-tools/whois-lookup" },
  ],
};

export default function WhoisLookupPage() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLookup = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`/api/whois-lookup?domain=${encodeURIComponent(domain)}`, {
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The lookup could not be completed.");
      setDomain(data.domain);
      setResult(data);
    } catch (lookupError) {
      setError(lookupError.message || "The lookup could not be completed. Try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

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
                <li aria-current="page" className="text-slate-800">WHOIS Domain Lookup</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <header className="mb-8 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
              <Globe2 className="h-4 w-4" aria-hidden="true" />
              DOMAIN INTELLIGENCE
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              WHOIS domain lookup
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Inspect public registration records from the domain&apos;s authoritative RDAP registry, including registrar, key dates, status codes, nameservers, and DNSSEC.
            </p>
          </header>

          <section aria-labelledby="lookup-heading" className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.75fr)]">
            <div className="min-w-0">
              <form onSubmit={handleLookup} className="border-y border-slate-300 bg-white px-5 py-6 sm:px-7">
                <label id="lookup-heading" htmlFor="domain-input" className="mb-2 block text-sm font-semibold text-slate-800">
                  Domain name
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="domain-input"
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
                    aria-describedby="domain-help"
                    className="h-12 min-w-0 flex-1 border border-slate-300 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
                  />
                  <button
                    type="submit"
                    disabled={loading || !domain.trim()}
                    className="inline-flex h-12 items-center justify-center gap-2 bg-emerald-800 px-6 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <Search className="h-4 w-4" />}
                    {loading ? "Looking up" : "Look up domain"}
                  </button>
                </div>
                <p id="domain-help" className="mt-2 text-xs text-slate-500">Enter a domain only, without https:// or a page path. Internationalized names are supported.</p>
                {error && <p role="alert" className="mt-4 border-l-2 border-rose-700 bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p>}
              </form>

              {result && (
                <div className="mt-8 border-y border-slate-300 bg-white">
                  <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase text-slate-500">Registration record</p>
                      <h2 className="mt-1 break-all font-mono text-xl font-bold text-slate-950">{result.ldhName}</h2>
                    </div>
                    <button onClick={copyResult} type="button" className="inline-flex shrink-0 items-center justify-center gap-2 border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" aria-label="Copy lookup results as JSON">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied" : "Copy data"}
                    </button>
                  </div>

                  <div className="grid gap-0 sm:grid-cols-2">
                    {[
                      ["Registrar", result.registrar?.name],
                      ["DNSSEC", result.dnssec],
                      ["Registered", formatDate(result.dates.registered)],
                      ["Expires", formatDate(result.dates.expires)],
                      ["Last updated", formatDate(result.dates.updated)],
                      ["Registry record", result.handle],
                    ].map(([label, value]) => (
                      <div key={label} className="border-b border-slate-100 px-5 py-4 sm:px-7">
                        <div className="text-xs font-semibold uppercase text-slate-500">{label}</div>
                        {label === "Registrar" && result.registrar?.url ? (
                          <a href={result.registrar.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 break-all text-sm font-medium text-emerald-800 underline-offset-2 hover:underline">
                            {value || "Not published"}<ExternalLink className="h-3 w-3 shrink-0" />
                          </a>
                        ) : <div className="mt-1 break-words text-sm font-medium text-slate-900">{value || "Not published"}</div>}
                      </div>
                    ))}
                  </div>

                  <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900"><ShieldCheck className="h-4 w-4 text-emerald-800" /> Domain status</h3>
                    {result.status.length ? (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {result.status.map((status) => <li key={status} className="border border-slate-300 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700">{status}</li>)}
                      </ul>
                    ) : <p className="mt-2 text-sm text-slate-500">No status codes published.</p>}
                  </div>

                  <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Globe2 className="h-4 w-4 text-emerald-800" /> Nameservers</h3>
                    {result.nameservers.length ? (
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {result.nameservers.map((nameserver) => <li key={nameserver} className="break-all border border-slate-200 px-3 py-2 font-mono text-sm text-slate-700">{nameserver}</li>)}
                      </ul>
                    ) : <p className="mt-2 text-sm text-slate-500">No nameservers published.</p>}
                  </div>

                  <div className="px-5 py-5 sm:px-7">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900"><CalendarDays className="h-4 w-4 text-emerald-800" /> Registrar abuse contact</h3>
                    <div className="mt-2 text-sm text-slate-700">
                      {result.abuse?.email || result.abuse?.phone ? <span>{result.abuse.email}{result.abuse.email && result.abuse.phone ? " · " : ""}{result.abuse.phone}</span> : "Not published by the registry"}
                    </div>
                  </div>

                  <p className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs leading-5 text-slate-600 sm:px-7">{result.notice} Source: {result.source}.</p>
                </div>
              )}

              {loading && <div role="status" className="mt-6 flex items-center gap-3 border-y border-slate-300 bg-white px-5 py-5 text-sm text-slate-600"><span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-800/20 border-t-emerald-800" />Contacting the authoritative domain registry…</div>}
            </div>

            <aside className="space-y-6">
              <section className="border-y border-slate-300 bg-white p-5 sm:p-6">
                <h2 className="text-sm font-bold uppercase text-slate-800">What this lookup includes</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" /> Registrar and registry record</li>
                  <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" /> Registration, update, and expiry dates</li>
                  <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" /> EPP status codes and nameservers</li>
                  <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" /> DNSSEC and published abuse contact</li>
                </ul>
              </section>
              <section className="border-y border-slate-300 bg-white p-5 sm:p-6">
                <h2 className="text-sm font-bold uppercase text-slate-800">About registration data</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">This tool queries RDAP, the modern HTTP-based replacement for traditional WHOIS. Registry output varies by TLD. Personal contact information may be redacted under privacy rules, and some registries may not provide RDAP.</p>
                <p className="mt-3 text-xs leading-5 text-slate-500">This is a public-record lookup, not proof of domain ownership or legal availability.</p>
              </section>
            </aside>
          </section>

          <section className="mt-14 max-w-4xl border-t border-slate-300 pt-8">
            <h2 className="text-xl font-bold text-slate-900">WHOIS and RDAP lookup questions</h2>
            <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200 bg-white">
              <details className="group px-4 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-800">What is a WHOIS domain lookup?<ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" /></summary>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">It retrieves public registration information for a domain, such as its registrar, dates, status, and nameservers. Modern lookup services commonly use RDAP, the standardized successor to the WHOIS protocol.</p>
              </details>
              <details className="group px-4 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-800">Why are registrant details missing?<ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" /></summary>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Registries and registrars may redact personal data or omit fields. The information available varies by TLD, registry policy, and privacy rules.</p>
              </details>
              <details className="group px-4 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-800">Can I check whether a domain is available to register?<ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" /></summary>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">A missing registry record is not a guarantee that a domain is available. Confirm availability and current pricing with an accredited registrar before purchase.</p>
              </details>
            </div>
          </section>

          <RelatedResources context="/free-tools/whois-lookup" />
        </div>
      </main>
      <Footer />
    </>
  );
}