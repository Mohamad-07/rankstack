import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_TAGLINE, SITE_URL, createMetadata } from "@/lib/seo";
import {
  Globe,
  Search,
  Network,
  Fingerprint,
  Clock3,
  Rocket,
  Sparkles,
  Image
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

       <div className="pt-10">
        <Header />
      </div>

      {/* Breadcrumb */}
      <nav className="text-center text-xs text-gray-500 mt-4 mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-2">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/free-tools" className="hover:text-blue-600">Free Tools</Link></li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative mx-auto mb-10 max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 bg-gradient-radial px-6 py-14 text-center text-white shadow-2xl shadow-indigo-950/20">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"></div>
        <div className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-100 backdrop-blur-xl">
            <Sparkles className="w-4 h-4" />
            New: AI Hosting Recommender & AI Image Compressor
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Free Online Tools by <span className="text-gradient">RankStack</span>
          </h1>
          <p className="mx-auto mb-3 max-w-3xl text-base font-medium text-indigo-200">
            {SITE_TAGLINE}
          </p>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Check domain registration and DNS, inspect IP details, compress images, and compare hosting options with tools built for practical technical work.
          </p>
        </div>
      </section>

      {/* Featured Tools Banner */}
      <section className="max-w-6xl mx-auto px-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* AI Hosting Recommender Banner */}
          <div className="glass-card rounded-2xl p-6 text-center">
            <h2 className="mb-3 text-xl font-bold text-white">
              🚀 Try Our AI Hosting Recommender
            </h2>
            <p className="mb-4 text-sm text-slate-300">
              Take our 2-minute AI-powered quiz to find your perfect hosting match from 30+ providers.
            </p>
            <Link
              href="/free-tools/hosting-recommender"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-all duration-300 hover:shadow-lg"
            >
              <Rocket className="w-4 h-4" />
              Start AI Quiz
            </Link>
          </div>

          {/* AI Image Compressor Banner */}
          <div className="glass-card rounded-2xl p-6 text-center">
            <h2 className="mb-3 text-xl font-bold text-white">
              🖼️ New AI Image Compressor
            </h2>
            <p className="mb-4 text-sm text-slate-300">
              Compress images by up to 80% without quality loss. Perfect for SEO and faster websites.
            </p>
            <Link
              href="/free-tools/image-compressor"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-all duration-300 hover:shadow-lg"
            >
              <Image className="w-4 h-4" />
              Compress Images
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Cards */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 mb-20">
        {cardsData.map((card, index) => (
          <Link
            key={index}
            href={card.url}
            className={`group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-xl ${
              card.featured ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
            }`}
          >
            <div className="flex flex-col items-center text-center h-full">
              <div
                className={`w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gradient-to-r ${card.bg} ${
                  card.featured ? 'ring-2 ring-white ring-opacity-50' : ''
                }`}
              >
                {card.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600">
                {card.title}
                {card.featured && (
                  <span className="inline-block ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                {card.description}
              </p>
              <div className="mt-4 text-blue-600 font-medium text-sm group-hover:underline">
                Use Tool →
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Tools Categories */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Tool Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">AI & Hosting Tools</h3>
              <p className="text-gray-600 text-sm">Smart tools for hosting selection and optimization</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Image className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Image Optimization</h3>
              <p className="text-gray-600 text-sm">AI-powered image compression and optimization</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Network Tools</h3>
              <p className="text-gray-600 text-sm">IP analysis and network diagnostics</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Network className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">DNS Tools</h3>
              <p className="text-gray-600 text-sm">Domain and DNS management utilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Author / Trust Section */}
      <section className="max-w-3xl mx-auto mb-16 px-6 text-center border-t border-gray-200 pt-8">
        <p className="text-gray-700 text-base">
          Developed and maintained by{" "}
          <span className="font-semibold text-blue-600">
            RankStack Experts
          </span>{" "}
          — combining real-world hosting, SEO, and performance testing experience 
          to deliver tools you can trust.
        </p>
      </section>

      <Footer />
    </>
  );
};

export default ToolsPage;