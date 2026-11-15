// app/free-tools/dns-propagation/page.js
"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import RelatedResources from '@/components/RelatedResources';

export default function DNSPropagationPage() {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("A");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const dnsServers = [
    { name: "Google DNS", ip: "8.8.8.8", flag: "🇺🇸", location: "Global" },
    { name: "Cloudflare", ip: "1.1.1.1", flag: "🇺🇸", location: "Global" },
    { name: "Quad9", ip: "9.9.9.9", flag: "🇨🇭", location: "Europe" },
    { name: "OpenDNS", ip: "208.67.222.222", flag: "🇺🇸", location: "Global" },
    { name: "Comodo", ip: "8.26.56.26", flag: "🇺🇸", location: "Global" },
    { name: "Verisign", ip: "64.6.64.6", flag: "🇺🇸", location: "Global" },
    { name: "Yandex", ip: "77.88.8.8", flag: "🇷🇺", location: "Russia" },
    { name: "AliDNS", ip: "223.5.5.5", flag: "🇨🇳", location: "China" },
  ];

  // Method 1: Use our own API
  const checkWithOurAPI = async (server, domain, type) => {
    try {
      const response = await fetch(`/api/dns-propagation?domain=${encodeURIComponent(domain)}&type=${type}&server=${server.ip}`);
      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          resolved: data.resolved,
          records: data.records || [],
          responseTime: data.responseTime,
          message: data.message || "Checked via our API"
        };
      } else {
        throw new Error(data.error || "API check failed");
      }
    } catch (error) {
      throw new Error(`Our API: ${error.message}`);
    }
  };

  // Method 2: Use public DNS-over-HTTPS
  const checkWithDoH = async (provider, domain, type) => {
    const dohProviders = [
      {
        name: "Google DoH",
        url: `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`,
      },
      {
        name: "Cloudflare DoH", 
        url: `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`,
      },
      {
        name: "Quad9 DoH",
        url: `https://dns.quad9.net/dns-query?name=${encodeURIComponent(domain)}&type=${type}`,
      }
    ];

    for (let doh of dohProviders) {
      try {
        const response = await fetch(doh.url, {
          headers: { 'Accept': 'application/dns-json' }
        });
        
        if (response.ok) {
          const data = await response.json();
          return {
            success: true,
            resolved: data.Status === 0 && data.Answer && data.Answer.length > 0,
            records: data.Answer || [],
            responseTime: 0, // DoH doesn't give us response time easily
            message: `Checked via ${doh.name}`
          };
        }
      } catch (error) {
        continue; // Try next DoH provider
      }
    }
    
    throw new Error("All DoH providers failed");
  };

  // Method 3: Fallback to external API (rares.eu)
  const checkWithExternalAPI = async (server, domain, type) => {
    try {
      // Map server names to the format expected by rares.eu API
      const serverMap = {
        "Google DNS": "google",
        "Cloudflare": "cloudflare", 
        "Quad9": "quad9",
        "OpenDNS": "opendns",
        "Comodo": "comodo",
        "Verisign": "verisign",
        "Yandex": "yandex", 
        "AliDNS": "alidns"
      };

      const apiServer = serverMap[server.name] || "google";
      const url = `https://projects.rares.eu/dns/${type.toLowerCase()}/${encodeURIComponent(domain)}?dns=${apiServer}`;
      
      const response = await fetch(url);
      const data = await response.json();

      const answers = data?.Answer || data?.answer || data?.Answers || [];
      const resolved = Array.isArray(answers) && answers.length > 0;

      return {
        success: true,
        resolved,
        records: answers,
        responseTime: 0,
        message: "Checked via external API"
      };
    } catch (error) {
      throw new Error(`External API: ${error.message}`);
    }
  };

  const handleCheck = async (e) => {
    e.preventDefault();
    
    if (!domain.trim()) {
      setError("Please enter a domain name");
      return;
    }

    // Basic domain validation
    const cleanDomain = domain.trim().replace(/^https?:\/\//, '').split('/')[0];
    if (!cleanDomain.includes('.') || cleanDomain.length < 4) {
      setError("Please enter a valid domain name");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);
    setProgress(0);

    try {
      const results = [];
      const totalServers = dnsServers.length;

      for (let i = 0; i < dnsServers.length; i++) {
        const server = dnsServers[i];
        const startTime = performance.now();
        
        let result;
        
        // Try methods in order of preference
        try {
          // Method 1: Our own API
          result = await checkWithOurAPI(server, cleanDomain, type);
        } catch (error1) {
          console.log(`Our API failed for ${server.name}, trying DoH...`);
          
          try {
            // Method 2: DNS-over-HTTPS
            result = await checkWithDoH(server, cleanDomain, type);
          } catch (error2) {
            console.log(`DoH failed for ${server.name}, trying external API...`);
            
            try {
              // Method 3: External API (fallback)
              result = await checkWithExternalAPI(server, cleanDomain, type);
            } catch (error3) {
              result = {
                success: false,
                resolved: false,
                records: [],
                error: `All methods failed: ${error3.message}`
              };
            }
          }
        }

        const responseTime = Math.round(performance.now() - startTime);
        
        results.push({
          ...server,
          status: result.success ? (result.resolved ? "resolved" : "not_resolved") : "error",
          records: result.records || [],
          responseTime: result.responseTime || responseTime,
          error: result.error,
          message: result.message
        });

        // Update progress
        setProgress(Math.round(((i + 1) / totalServers) * 100));
        
        // Delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      setResults(results);
    } catch (err) {
      console.error('Main error:', err);
      setError("Failed to check DNS propagation. Please try again.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const statusStyles = {
    resolved: "border-emerald-200 bg-emerald-50",
    not_resolved: "border-amber-200 bg-amber-50",
    error: "border-red-200 bg-red-50",
  };

  const statusText = {
    resolved: "Resolved",
    not_resolved: "Not resolved",
    error: "Error",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "RankStack DNS Propagation Checker",
            applicationCategory: "NetworkApplication",
            operatingSystem: "Any",
            description:
              "Check how a domain's DNS records resolve across major public resolvers around the world.",
            url: "https://rankstack.dev/free-tools/dns-propagation",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://rankstack.dev" },
              { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://rankstack.dev/free-tools" },
              { "@type": "ListItem", position: 3, name: "DNS Propagation", item: "https://rankstack.dev/free-tools/dns-propagation" },
            ],
          }),
        }}
      />

      <Header />

      <main>
        <PageHero
          eyebrow="Free tool"
          title="DNS propagation checker"
          description="Check how a domain's DNS records resolve across major public resolvers around the world."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Free Tools", href: "/free-tools" },
            { label: "DNS Propagation" },
          ]}
        />

        <section className="section bg-white">
          <div className="shell max-w-6xl">
            <div className="card p-5 sm:p-7">
              <form onSubmit={handleCheck}>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex-1">
                    <label htmlFor="dns-domain" className="sr-only">
                      Domain name
                    </label>
                    <input
                      id="dns-domain"
                      type="text"
                      placeholder="example.com"
                      value={domain}
                      onChange={(event) => setDomain(event.target.value)}
                      className="field h-12"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="dns-type" className="sr-only">
                      DNS record type
                    </label>
                    <select
                      id="dns-type"
                      value={type}
                      onChange={(event) => setType(event.target.value)}
                      className="field h-12 lg:w-44"
                      disabled={loading}
                    >
                      <option value="A">A record</option>
                      <option value="AAAA">AAAA record</option>
                      <option value="CNAME">CNAME record</option>
                      <option value="MX">MX record</option>
                      <option value="TXT">TXT record</option>
                      <option value="NS">NS record</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !domain.trim()}
                    className="btn-primary h-12 shrink-0"
                  >
                    {loading ? "Checking..." : "Check DNS"}
                  </button>
                </div>
              </form>

              {loading ? (
                <div className="mt-5">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Checking DNS servers...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {error ? (
              <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            {results.length > 0 ? (
              <div className="mt-8">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">
                      Results for {domain}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">{type} record across {results.length} resolvers</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {[
                    ["Resolved", results.filter((item) => item.status === "resolved").length, "text-emerald-700"],
                    ["Not resolved", results.filter((item) => item.status === "not_resolved").length, "text-amber-700"],
                    ["Errors", results.filter((item) => item.status === "error").length, "text-red-700"],
                    ["Total", results.length, "text-indigo-700"],
                  ].map(([label, value, color]) => (
                    <div key={label} className="card p-4 text-center">
                      <div className={`text-2xl font-bold tabular-nums ${color}`}>{value}</div>
                      <div className="mt-1 text-xs font-medium text-slate-500">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`rounded-2xl border p-5 ${statusStyles[result.status] || "border-slate-200 bg-slate-50"}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-950">{result.name}</h3>
                          <p className="mt-1 font-mono text-xs text-slate-500">{result.ip}</p>
                        </div>
                        <span className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                          {statusText[result.status] || "Checking"}
                        </span>
                      </div>

                      <p className="mt-3 text-xs text-slate-500">{result.location}</p>

                      {result.responseTime ? (
                        <p className="mt-1 text-xs text-slate-600">{result.responseTime} ms</p>
                      ) : null}

                      {result.records?.length ? (
                        <div className="mt-3 space-y-1.5">
                          {result.records.slice(0, 2).map((record, recordIndex) => (
                            <code
                              key={recordIndex}
                              className="block break-all rounded-md bg-white/70 px-2 py-1.5 text-xs text-slate-700"
                            >
                              {record.data || record.address || JSON.stringify(record)}
                            </code>
                          ))}
                          {result.records.length > 2 ? (
                            <p className="text-xs text-slate-500">+{result.records.length - 2} more</p>
                          ) : null}
                        </div>
                      ) : null}

                      {result.error ? (
                        <p className="mt-2 text-xs text-red-700">{result.error}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="section bg-slate-50">
          <div className="shell max-w-5xl">
            <RelatedResources context="/free-tools/dns-propagation" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
