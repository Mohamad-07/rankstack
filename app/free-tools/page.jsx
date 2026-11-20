import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { SITE_URL, createMetadata } from "@/lib/seo";
import {
  ArrowRight,
  Globe,
  Search,
  Network,
  Fingerprint,
  Clock3,
  Rocket,
  Image,
  ShieldAlert,
  ScanEye,
  MonitorSmartphone,
} from "lucide-react";

export const metadata = createMetadata({
  title: 'Free Web Tools — WHOIS, IP, DNS & Image Utilities',
  description:
    'Use free RankStack tools for domain registration lookups, DNS propagation, IP diagnostics, image compression, and hosting recommendations.',
  path: '/free-tools',
  keywords: [
    'free web tools',
    'free developer tools',
    'online web tools',
    'technical SEO tools',
    'free online utilities',
  ],
  image: 'https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif',
  imageAlt: 'RankStack free web tools',
});

const ToolsPage = () => {
  const cardsData = [
    {
      icon: <Rocket className="w-8 h-8 text-white" />,
      title: "AI Hosting Recommender",
      description:
        "Find your perfect web hosting match with our AI-powered quiz. Get personalized recommendations based on your needs, budget, and technical level.",
      url: "/free-tools/hosting-recommender",
      bg: "from-purple-500 to-pink-500",
      featured: true
    },
    {
      icon: <Image className="w-8 h-8 text-white" />,
      title: "AI Image Compressor",
      description:
        "Compress JPG, PNG, WebP & GIF images instantly with AI. Reduce file size by up to 80% without quality loss. Perfect for SEO & faster websites.",
      url: "/free-tools/image-compressor",
      bg: "from-cyan-500 to-blue-500",
      featured: true
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "IP Checker",
      description:
        "Quickly identify your public IP address and view essential network details — ideal for diagnostics and security checks.",
      url: "/free-tools/ipchecker",
      bg: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "IP Lookup",
      description:
        "Discover detailed information about any IP address, including geolocation, timezone, and ISP data.",
      url: "/free-tools/iplookup",
      bg: "from-green-500 to-teal-500",
    },
    {
      icon: <Network className="w-8 h-8 text-white" />,
      title: "DNS Propagation Checker",
      description:
        "Check DNS propagation globally to verify if your domain's DNS updates are live and consistent worldwide.",
      url: "/free-tools/dns-propagation",
      bg: "from-orange-500 to-red-500",
    },
    {
      icon: <Fingerprint className="w-8 h-8 text-white" />,
      title: "WHOIS Domain Lookup",
      description:
        "Check public domain registration dates, registrar, status codes, nameservers, and DNSSEC using authoritative RDAP registry data.",
      url: "/free-tools/whois-lookup",
      bg: "from-emerald-600 to-teal-700",
    },
    {
      icon: <Clock3 className="w-8 h-8 text-white" />,
      title: "Domain Age Checker",
      description:
        "Calculate a domain's age from its registry-reported creation date, with registration anniversary and RDAP source details.",
      url: "/free-tools/domain-age-checker",
      bg: "from-amber-600 to-orange-700",
    },
    {
      icon: <ShieldAlert className="w-8 h-8 text-white" />,
      title: "Proxy & Location Detector",
      description:
        "Check proxy headers, timezone and language alignment, WebRTC leaks, and IP-versus-GPS location consistency.",
      url: "/free-tools/proxy-detector",
      bg: "from-rose-500 to-red-600",
      featured: true,
    },
    {
      icon: <ScanEye className="w-8 h-8 text-white" />,
      title: "Privacy Exposure Audit",
      description:
        "See what your browser reveals without permission and what stays protected until you grant location access.",
      url: "/free-tools/privacy-audit",
      bg: "from-teal-500 to-emerald-600",
      featured: true,
    },
    {
      icon: <MonitorSmartphone className="w-8 h-8 text-white" />,
      title: "User-Agent Inspector",
      description:
        "Decode your user-agent string into browser, OS, device, and crawler details, then cross-check your browser APIs.",
      url: "/free-tools/user-agent-inspector",
      bg: "from-violet-600 to-fuchsia-600",
      featured: true,
    },
  ];

  // JSON-LD Schemas
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Online Tools by RankStack",
    description:
      "Access free online tools including AI Hosting Recommender, AI Image Compressor, IP Checker, IP Lookup, DNS Propagation Checker, and WHOIS Domain Lookup to analyze and troubleshoot web infrastructure.",
    url: "https://rankstack.dev/free-tools",
    itemListElement: cardsData.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: card.title,
      url: `${SITE_URL}${card.url}`,
      description: card.description,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are RankStack tools free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all RankStack tools are 100% free with no registration required.",
        },
      },
      {
        "@type": "Question",
        name: "Do these tools work on all devices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, every tool is mobile-friendly and optimized for performance across all browsers.",
        },
      },
      {
        "@type": "Question",
        name: "Can I share these tools on my website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Of course! Feel free to share or link to our free tools — attribution is appreciated.",
        },
      },
      {
        "@type": "Question",
        name: "What is the AI Hosting Recommender?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our AI Hosting Recommender is an intelligent quiz that analyzes your website needs, budget, and technical requirements to recommend the perfect hosting provider from 30+ options.",
        },
      },
      {
        "@type": "Question",
        name: "How does the AI Image Compressor work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our AI Image Compressor uses advanced algorithms to reduce image file sizes by up to 80% without visible quality loss, processing everything locally in your browser for maximum privacy and security.",
        },
      },
      {
        "@type": "Question",
        name: "What information does the WHOIS Domain Lookup show?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It checks public RDAP registry data for a domain, including registrar, registration dates, status codes, nameservers, and DNSSEC when those details are published.",
        },
      },
      {
        "@type": "Question",
        name: "How does the Domain Age Checker calculate a domain's age?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It calculates elapsed calendar years, months, and days from the domain creation date published by the authoritative RDAP registry. The result does not indicate website age, ownership history, or search ranking.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://rankstack.dev/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Free Tools",
        item: "https://rankstack.dev/free-tools",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

       <Header />

      <main>
        <PageHero
          eyebrow="Free tools"
          title="Free online tools for developers and site owners"
          description="Check domain registration and DNS, inspect IP details, compress images, and compare hosting options with tools built for practical technical work."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Free Tools" },
          ]}
          actions={
            <Link href="/free-tools/hosting-recommender" className="btn-primary">
              Find my hosting match
            </Link>
          }
        />

        <section className="section bg-white">
          <div className="shell">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50 p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                    <Rocket className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold text-slate-950">
                        AI Hosting Recommender
                      </h2>
                      <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                        New
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Take a two-minute quiz to shortlist hosting plans that fit
                      your traffic, budget, and technical comfort level.
                    </p>
                    <Link href="/free-tools/hosting-recommender" className="btn-primary mt-4">
                      Start the quiz
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-cyan-100 bg-cyan-50 p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-600 text-white">
                    <Image className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold text-slate-950">
                        AI Image Compressor
                      </h2>
                      <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-cyan-700">
                        New
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Compress JPG, PNG, WebP, and GIF files in your browser
                      without a noticeable drop in quality.
                    </p>
                    <Link href="/free-tools/image-compressor" className="btn-primary mt-4">
                      Compress images
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-slate-50">
          <div className="shell">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">All tools</span>
              <h2 className="section-title mt-4">Pick a tool and get an answer</h2>
              <p className="section-copy mt-4">
                Every tool runs in your browser where possible, requires no
                account, and is free to use.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cardsData.map((card) => (
                <Link
                  key={card.url}
                  href={card.url}
                  className="card card-hover group flex h-full flex-col p-5"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.bg}`}
                  >
                    {card.icon}
                  </div>
                  <div className="mt-4 flex items-start gap-2">
                    <h3 className="flex-1 text-base font-semibold text-slate-950 group-hover:text-indigo-700">
                      {card.title}
                    </h3>
                    {card.featured ? (
                      <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-700">
                        New
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {card.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600">
                    Use tool
                    <ArrowRight
                      className="h-4 w-4 transition group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="shell">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <div className="mx-auto max-w-2xl text-center">
                <span className="eyebrow">Tool categories</span>
                <h2 className="section-title mt-4">Browse by what you need</h2>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: Rocket,
                    title: "AI & hosting",
                    copy: "Hosting selection and optimization",
                    color: "bg-violet-50 text-violet-600",
                  },
                  {
                    icon: Image,
                    title: "Image optimization",
                    copy: "Compression without visible quality loss",
                    color: "bg-cyan-50 text-cyan-600",
                  },
                  {
                    icon: Globe,
                    title: "Network tools",
                    copy: "IP analysis and network diagnostics",
                    color: "bg-emerald-50 text-emerald-600",
                  },
                  {
                    icon: Network,
                    title: "DNS tools",
                    copy: "Domain and DNS management",
                    color: "bg-orange-50 text-orange-600",
                  },
                ].map((category) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.title} className="rounded-xl border border-slate-200 bg-white p-5">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.color}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-slate-950">
                        {category.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">
                        {category.copy}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-600">
              Built and maintained by{" "}
              <Link href="/about" className="link-inline">
                RankStack Experts
              </Link>{" "}
              using real-world hosting, SEO, and performance testing experience.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ToolsPage;