"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import RelatedResources from "@/components/RelatedResources";
import FAQ from "@/components/FAQ";
import Loader from "@/components/Loader";
import { ArrowRight, Globe2, Lock, Search } from "lucide-react";

const fetchIpDetails = async (ip) => {
  const res = await fetch(`/api/ip?ip=${encodeURIComponent(ip)}`, {
    cache: "no-store",
  });
  return res.json();
};

const resultFields = ["ip", "city", "region", "country", "postal", "timezone"];

export default function IpLookup() {
  const [ipAddress, setIpAddress] = useState("");
  const [ipDetails, setIpDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!ipAddress.trim()) return;

    setLoading(true);
    setError("");

    try {
      const data = await fetchIpDetails(ipAddress.trim());
      if (data.error) {
        setError(
          typeof data.error === "string"
            ? data.error
            : data.error.message || "Failed to fetch IP details."
        );
      } else {
        setIpDetails(data);
      }
    } catch {
      setError("An error occurred while fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free IP Lookup Tool",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    description:
      "Find ISP, location, timezone, and network details for any public IP address with RankStack's free IP Lookup Tool.",
    url: "https://rankstack.dev/free-tools/iplookup",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: {
      "@type": "Organization",
      name: "RankStack",
      url: "https://rankstack.dev",
      logo: {
        "@type": "ImageObject",
        url: "https://rankstack.dev/rankstack-logo.png",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rankstack.dev" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://rankstack.dev/free-tools" },
      { "@type": "ListItem", position: 3, name: "IP Lookup", item: "https://rankstack.dev/free-tools/iplookup" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does the IP Lookup Tool do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The IP Lookup Tool by RankStack lets you find the ISP, city, region, and timezone associated with any public IP address.",
        },
      },
      {
        "@type": "Question",
        name: "Is the IP Lookup Tool free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The IP Lookup Tool is free, requires no registration, and does not require installation.",
        },
      },
      {
        "@type": "Question",
        name: "Does RankStack track or store my IP searches?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RankStack does not use your IP lookups to build a personal profile. Standard server logs may be retained for security and abuse prevention.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <main>
        <PageHero
          eyebrow="Free tool"
          title="IP lookup"
          description="Enter an IP address or domain to see the ISP, approximate location, timezone, and network details behind it."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Free Tools", href: "/free-tools" },
            { label: "IP Lookup" },
          ]}
        />

        <section className="section bg-white">
          <div className="shell max-w-4xl">
            <div className="card p-5 sm:p-7">
              <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <label htmlFor="ip-address" className="sr-only">
                    IP address or domain
                  </label>
                  <div className="relative">
                    <Search
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    />
                    <input
                      id="ip-address"
                      type="text"
                      inputMode="url"
                      autoComplete="off"
                      placeholder="Enter an IP address or domain"
                      value={ipAddress}
                      onChange={(event) => setIpAddress(event.target.value)}
                      required
                      className="field pl-11"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary shrink-0" disabled={loading}>
                  {loading ? "Looking up..." : "Look up IP"}
                  {!loading ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
                </button>
              </form>

              <p className="mt-3 text-xs text-slate-500">
                Examples: <code className="rounded bg-slate-100 px-1.5 py-0.5">8.8.8.8</code>{" "}
                or <code className="rounded bg-slate-100 px-1.5 py-0.5">rankstack.dev</code>
              </p>

              {error ? (
                <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              ) : null}
            </div>

            {loading ? (
              <div className="mt-8 flex justify-center">
                <Loader />
              </div>
            ) : null}

            {ipDetails && !loading && !error ? (
              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-lift sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">
                      Lookup result
                    </p>
                    <p className="mt-1 text-xl font-semibold">
                      {ipDetails.ip || ipAddress}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-indigo-100">
                    <Globe2 className="h-4 w-4" aria-hidden="true" />
                    Public IP data
                  </span>
                </div>

                <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {resultFields.map((key) => (
                    <div key={key} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <dt className="text-xs font-medium capitalize text-slate-400">
                        {key}
                      </dt>
                      <dd className="mt-1 break-words text-sm font-semibold text-white">
                        {ipDetails?.[key] || "Not available"}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-slate-400">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Location data is approximate and may be affected by VPNs, proxies,
                  mobile networks, or ISP routing.
                </p>
              </div>
            ) : null}
          </div>
        </section>

        <section className="section bg-slate-50">
          <div className="shell">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">How it works</span>
              <h2 className="section-title mt-4">Understand any public IP address</h2>
              <p className="section-copy mt-4">
                An IP lookup helps with troubleshooting, fraud checks, and basic
                network research. Results are approximate and should not be used
                as proof of a person&apos;s physical location.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Find network details",
                  copy: "Identify the internet service provider, connection type, and network owner for a public IP.",
                },
                {
                  title: "Check approximate location",
                  copy: "See country, region, city, postal code, and timezone data derived from IP allocation records.",
                },
                {
                  title: "Investigate safely",
                  copy: "Use results for diagnostics and research, remembering that VPNs and mobile networks can shift location data.",
                },
              ].map((item) => (
                <div key={item.title} className="card p-6">
                  <h3 className="text-base font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/free-tools/ipchecker" className="btn-secondary">
                Check your own IP
              </Link>
              <Link href="/free-tools/dns-propagation" className="btn-secondary">
                Check DNS propagation
              </Link>
            </div>
          </div>
        </section>

        <FAQ />

        <section className="section bg-white">
          <div className="shell max-w-5xl">
            <RelatedResources context="/free-tools/iplookup" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
