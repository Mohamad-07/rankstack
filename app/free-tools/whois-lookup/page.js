"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import RelatedResources from "@/components/RelatedResources";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Globe2,
  Search,
  ShieldCheck,
} from "lucide-react";

const formatDate = (value) => {
  if (!value) return "Not published";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC",
      }).format(date) + " UTC";
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
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rankstack.dev" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://rankstack.dev/free-tools" },
    { "@type": "ListItem", position: 3, name: "WHOIS Domain Lookup", item: "https://rankstack.dev/free-tools/whois-lookup" },
  ],
};

const faqs = [
  {
    question: "What is a WHOIS domain lookup?",
    answer:
      "It retrieves public registration information for a domain, such as its registrar, key dates, status, and nameservers. Modern services commonly use RDAP, the standardized successor to the WHOIS protocol.",
  },
  {
    question: "Why are registrant details missing?",
    answer:
      "Registries and registrars may redact personal data or omit fields. Available information varies by TLD, registry policy, and privacy rules.",
  },
  {
    question: "Can I check whether a domain is available to register?",
    answer:
      "A missing registry record is not a guarantee that a domain is available. Confirm availability and current pricing with an accredited registrar before purchase.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
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
      const response = await fetch(
        `/api/whois-lookup?domain=${encodeURIComponent(domain.trim())}`,
        { cache: "no-store" }
      );
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

  const facts = result
    ? [
        ["Registrar", result.registrar?.name],
        ["DNSSEC", result.dnssec],
        ["Registered", formatDate(result.dates.registered)],
        ["Expires", formatDate(result.dates.expires)],
        ["Last updated", formatDate(result.dates.updated)],
        ["Registry record", result.handle],
      ]
    : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Header />

      <main>
        <PageHero
          eyebrow="Free tool"
          title="WHOIS domain lookup"
          description="Inspect public registration records from the domain's authoritative RDAP registry, including registrar, key dates, status codes, nameservers, and DNSSEC."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Free Tools", href: "/free-tools" },
            { label: "WHOIS Lookup" },
          ]}
        />

        <section className="section bg-white">
          <div className="shell">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.75fr)]">
              <div className="min-w-0">
                <div className="card p-5 sm:p-7">
                  <form onSubmit={handleLookup}>
                    <label htmlFor="domain-input" className="text-sm font-semibold text-slate-900">
                      Domain name
                    </label>
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
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
                        className="field min-w-0 flex-1"
                      />
                      <button
                        type="submit"
                        disabled={loading || !domain.trim()}
                        className="btn-primary h-12 shrink-0"
                      >
                        {loading ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        ) : (
                          <Search className="h-4 w-4" aria-hidden="true" />
                        )}
                        {loading ? "Looking up" : "Look up domain"}
                      </button>
                    </div>
                    <p id="domain-help" className="mt-2 text-xs text-slate-500">
                      Enter a domain only, without https:// or a page path. Internationalized
                      names are supported.
                    </p>
                    {error ? (
                      <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                      </p>
                    ) : null}
                  </form>
                </div>

                {loading ? (
                  <div role="status" className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600/20 border-t-indigo-600" />
                    Contacting the authoritative domain registry...
                  </div>
                ) : null}

                {result ? (
                  <div className="card mt-8 overflow-hidden">
                    <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Registration record
                        </p>
                        <h2 className="mt-1 break-all font-mono text-xl font-bold text-slate-950">
                          {result.ldhName}
                        </h2>
                      </div>
                      <button onClick={copyResult} type="button" className="btn-secondary shrink-0">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied" : "Copy data"}
                      </button>
                    </div>

                    <dl className="grid sm:grid-cols-2">
                      {facts.map(([label, value]) => (
                        <div key={label} className="border-b border-slate-100 px-5 py-4 sm:px-7">
                          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {label}
                          </dt>
                          <dd className="mt-1 break-words text-sm font-medium text-slate-900">
                            {label === "Registrar" && result.registrar?.url ? (
                              <a
                                href={result.registrar.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-indigo-600 underline-offset-2 hover:underline"
                              >
                                {value || "Not published"}
                                <ExternalLink className="h-3 w-3 shrink-0" />
                              </a>
                            ) : (
                              value || "Not published"
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
                      <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                        <ShieldCheck className="h-4 w-4 text-indigo-600" /> Domain status
                      </h3>
                      {result.status.length ? (
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {result.status.map((status) => (
                            <li key={status} className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-700">
                              {status}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 text-sm text-slate-500">No status codes published.</p>
                      )}
                    </div>

                    <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
                      <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                        <Globe2 className="h-4 w-4 text-indigo-600" /> Nameservers
                      </h3>
                      {result.nameservers.length ? (
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {result.nameservers.map((nameserver) => (
                            <li key={nameserver} className="break-all rounded-md border border-slate-200 px-3 py-2 font-mono text-sm text-slate-700">
                              {nameserver}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 text-sm text-slate-500">No nameservers published.</p>
                      )}
                    </div>

                    <div className="px-5 py-5 sm:px-7">
                      <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                        <CalendarDays className="h-4 w-4 text-indigo-600" /> Registrar abuse contact
                      </h3>
                      <p className="mt-2 text-sm text-slate-700">
                        {result.abuse?.email || result.abuse?.phone
                          ? [result.abuse.email, result.abuse.phone].filter(Boolean).join(" · ")
                          : "Not published by the registry"}
                      </p>
                    </div>

                    <p className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs leading-5 text-slate-600 sm:px-7">
                      {result.notice} Source: {result.source}.
                    </p>
                  </div>
                ) : null}
              </div>

              <aside className="space-y-5">
                <div className="card p-5 sm:p-6">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800">
                    What this lookup includes
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm text-slate-600">
                    {[
                      "Registrar and registry record",
                      "Registration, update, and expiry dates",
                      "EPP status codes and nameservers",
                      "DNSSEC and published abuse contact",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card p-5 sm:p-6">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800">
                    About registration data
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    This tool queries RDAP, the modern HTTP-based replacement for
                    traditional WHOIS. Output varies by TLD. Personal contact
                    information may be redacted, and some registries may not provide RDAP.
                  </p>
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    This is a public-record lookup, not proof of domain ownership or
                    legal availability.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="section bg-slate-50">
          <div className="shell max-w-4xl">
            <h2 className="section-title">WHOIS and RDAP lookup questions</h2>
            <div className="mt-6 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="group card overflow-hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-slate-900">
                    {faq.question}
                    <ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" />
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-6 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="shell max-w-5xl">
            <RelatedResources context="/free-tools/whois-lookup" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
