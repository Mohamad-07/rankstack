'use client';

import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import RelatedResources from "@/components/RelatedResources";
import IpDetails from "@/components/IpDetails";
import PrivacyScore from "@/components/PrivacyScore";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import GeolocationPrivacyMap from "@/components/Geolocation";
import IPv4IPv6Guide from "@/components/IPv4vsIPv6";
import useNetworkData from "@/hooks/useNetworkData";
import { ErrorNotice, MetricCard, ScanControls, ToolCrossLinks, formatDiagnosticErrors } from "@/components/NetworkToolUI";
import { ToolHelpSection } from "@/components/ToolContent";
import { 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  LockClosedIcon,
  CheckCircleIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const RESULT_GUIDE = [
  {
    term: 'Public IP address',
    detail: 'The address websites see when you connect. It identifies your network, not your device or identity.',
  },
  {
    term: 'IPv4 / IPv6 format',
    detail: 'IPv4 looks like 203.0.113.8. IPv6 is longer, uses colons, and lets modern networks assign many more addresses.',
  },
  {
    term: 'Approximate location',
    detail: 'City and region are inferred from the registered network area, so they can be off by tens of kilometres.',
  },
  {
    term: 'Proxy and crawler flags',
    detail: 'These indicate routing or automated-client signals. They are useful context, not definitive proof of intent.',
  },
  {
    term: 'Lookup source',
    detail: 'IP geolocation is instant. Live GPS appears only after you grant permission and produces a more precise comparison.',
  },
];

const TROUBLESHOOTING = [
  {
    title: 'The city looks wrong',
    detail: 'Check whether a VPN, proxy, or mobile carrier is routing your traffic. Those networks often register in a different region.',
  },
  {
    title: 'The address changed unexpectedly',
    detail: 'Reconnect to your router or mobile network, then re-scan. DHCP leases and carrier NAT can rotate public addresses.',
  },
  {
    title: 'You need an address for allowlisting',
    detail: 'Copy the public IP shown here, then confirm it on the network that will actually connect to the service you are configuring.',
  },
  {
    title: 'You want less location exposure',
    detail: 'Keep location permission set to Ask or Block. IP geolocation will still show a broad region, which is expected for every site.',
  },
];

const FAQS = [
  {
    question: 'What is my IP address and why does it change?',
    answer:
      'Your IP address is the public address your network uses on the internet. It can change when you switch networks, restart a router, reconnect through a VPN, or when your provider rotates addresses.',
  },
  {
    question: 'How does this IP address lookup work?',
    answer:
      'Your browser performs the lookup directly over HTTPS. The response is displayed to you and cached only in this browser tab for fifteen minutes. RankStack servers never receive or log the lookup.',
  },
  {
    question: 'Why does the IP location differ from my real location?',
    answer:
      'IP geolocation maps an address to the registered network region of the provider, not your street address. VPNs, mobile carriers, and large ISP routing areas often make the estimated city differ from where you are.',
  },
  {
    question: 'What is the difference between an IPv4 and IPv6 checker?',
    answer:
      'IPv4 uses 32-bit addresses such as 203.0.113.8, while IPv6 uses 128-bit addresses such as 2001:db8::8a2e. A modern connection may use either or both; this tool shows the public address your browser actually presents.',
  },
  {
    question: 'Is it safe to check my public IP here?',
    answer:
      'Yes. The check needs no sign-in, runs client-side, and is not used to build a browsing profile. You can optionally refine with live GPS, but that happens only after you grant browser permission.',
  },
];

export default function IPCheckerPage() {
  const {
    loading,
    error,
    data,
    errors,
    rescan,
    refineWithGps,
    gpsLoading,
    gpsError,
    hasGps,
  } = useNetworkData();
  const [copyStatus, setCopyStatus] = useState('Copy IP');

  // JSON-LD: Tool schema (Upgraded to WebApplication)
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "IP Address Lookup & IPv4/IPv6 Checker",
    operatingSystem: "Any",
    applicationCategory: "NetworkApplication",
    browserRequirements: "Requires JavaScript. Compatible with all major browsers.",
    description: "Run a free IP address lookup to check my public IP, see IPv4 and IPv6 details, and review approximate location and network information.",
    url: "https://rankstack.dev/free-tools/ipchecker/",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "RankStack",
      url: "https://rankstack.dev",
      logo: {
        "@type": "ImageObject",
        url: "https://rankstack.dev/rankstack-logo.png",
      },
    },
    featureList: "Public IP detection, ISP Lookup, Geolocation finding, IPv4/IPv6 check",
  };

  // JSON-LD: FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // JSON-LD: Breadcrumb schema
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
      {
        "@type": "ListItem",
        position: 3,
        name: "What Is My IP",
        item: "https://rankstack.dev/free-tools/ipchecker",
      },
    ],
  };

  const handleCopyIP = () => {
    if (data?.ip) {
      navigator.clipboard.writeText(data.ip);
      setCopyStatus('Copied!');
      setTimeout(() => {
        setCopyStatus('Copy IP');
      }, 2000);
    }
  };

  const yesNo = (value) => (value ? 'Yes' : 'No');
  const joinLanguages = (languages) =>
    Array.isArray(languages) && languages.length ? languages.join(', ') : 'Not available';

  const profileFields = [
    ['Public IP', data?.ipString],
    ['Numeric IP', data?.ipNumeric],
    ['IP type', data?.ipType],
    ['Proxy detected', yesNo(data?.isBehindProxy)],
    ['Proxy IP', data?.proxyIp],
    ['Country', data?.countryName],
    ['Country code', data?.countryCode],
    ['Region', data?.principalSubdivision],
    ['City', data?.city],
    ['Locality', data?.locality],
    ['Postcode', data?.postcode],
    ['Plus Code', data?.plusCode],
    ['Lookup source', data?.lookupSource === 'gps' ? 'Live GPS' : 'IP geolocation'],
    ['Device', data?.device],
    ['Operating system', data?.os],
    ['Browser', data?.userAgentDisplay],
    ['Mobile device', yesNo(data?.isMobile)],
    ['Crawler', yesNo(data?.isSpider)],
    ['Languages', joinLanguages(data?.userLanguages)],
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <Header />

      <main>
        <PageHero
          eyebrow="Free tool"
          title="What is my IP address?"
          description="Get an instant IP address lookup: see your public IP, IPv4/IPv6 details, and approximate location without an account or setup."
          actions={<a href="#diagnostic-tool" className="btn-primary">Run free IP lookup</a>}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Free Tools", href: "/free-tools" },
            { label: "What Is My IP" },
          ]}
        />

        <section id="diagnostic-tool" className="section bg-white">
          <div className="shell">
        {/* Combined IP Display and Privacy Score Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main IP Card (2/3 width) */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Your Public IP Address</h2>
                      <p className="text-blue-100 opacity-90">This is how websites identify you online</p>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <UserGroupIcon className="h-5 w-5 mr-2" />
                      <span>Detecting...</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                      <div>
                        <div className="text-sm text-blue-200 mb-2">IPv4 Address</div>
                        <div className="text-4xl font-bold font-mono tracking-wider break-all">
                          <div className="animate-pulse bg-white/20 h-10 w-64 rounded"></div>
                        </div>
                      </div>
                      <button 
                        disabled
                        className="mt-4 lg:mt-0 px-6 py-3 bg-white/50 text-blue-600 font-semibold rounded-lg transition-colors duration-200 flex items-center shadow-md opacity-50 cursor-not-allowed"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Loading...
                      </button>
                    </div>
                  </div>

                  {/* Loading state for location */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <div className="p-2 bg-white/20 rounded-lg mr-3">
                            <div className="animate-pulse bg-white/30 h-6 w-6 rounded"></div>
                          </div>
                          <div>
                            <div className="text-sm text-blue-200 mb-1">
                              <div className="animate-pulse bg-white/20 h-4 w-16 rounded"></div>
                            </div>
                            <div className="text-xl font-bold">
                              <div className="animate-pulse bg-white/20 h-6 w-24 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="bg-gradient-to-br from-red-600 to-pink-700 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Error Loading IP Address</h2>
                      <p className="text-red-100 opacity-90">Failed to fetch IP details</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <div className="text-center py-8">
                      <p className="text-xl mb-4">Unable to retrieve IP information.</p>
                      <p className="text-sm text-white/70">Error: {error}</p>
                      <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center shadow-md mx-auto"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Your Public IP Address</h2>
                      <p className="text-blue-100 opacity-90">This is how websites identify you online</p>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <UserGroupIcon className="h-5 w-5 mr-2" />
                      <span>Live Detection</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                      <div>
                        <div className="text-sm text-blue-200 mb-2">IPv4 Address</div>
                        <div className="text-4xl font-bold font-mono tracking-wider break-all">
                          {data?.ip || 'Not available'}
                        </div>
                      </div>
                      <button 
                        onClick={handleCopyIP}
                        className="mt-4 lg:mt-0 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center shadow-md"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {copyStatus}
                      </button>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="p-2 bg-white/20 rounded-lg mr-3">
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-blue-200">City</div>
                          <div className="text-xl font-bold">{data?.city || 'Unknown'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="p-2 bg-white/20 rounded-lg mr-3">
                          <GlobeAltIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-sm text-blue-200">Country</div>
                          <div className="text-xl font-bold">{data?.country || 'Unknown'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="p-2 bg-white/20 rounded-lg mr-3">
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-blue-200">Region</div>
                          <div className="text-xl font-bold">{data?.region || 'Unknown'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Privacy Score Sidebar (1/3 width) */}
          <div className="lg:col-span-1">
            <PrivacyScore data={data} loading={loading} />
          </div>
        </div>

        {!loading && !error && data ? (
          <div className="card mb-12 p-6 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-900">Complete network profile</h2>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {data.lookupSource === 'gps' ? 'Live GPS reverse geocode' : 'IP geolocation'}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Lookups run directly from your browser through our client-side diagnostic engine and are cached only for this tab.
                </p>
              </div>
              <ScanControls
                onRescan={rescan}
                loading={loading}
                onGps={refineWithGps}
                gpsLoading={gpsLoading}
                hasGps={hasGps}
                note="GPS is optional and only used after you grant permission."
              />
            </div>

            <ErrorNotice error={gpsError} title="Live GPS could not be used" />
            {Object.keys(errors || {}).length ? (
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Some sources were unavailable: {formatDiagnosticErrors(errors)}
              </div>
            ) : null}

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {profileFields.map(([label, value]) => (
                <MetricCard key={label} label={label} value={value} mono={label === 'Public IP' || label === 'Plus Code' || label === 'Proxy IP'} />
              ))}
            </div>
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="mb-12">
            <ToolCrossLinks heading="Go deeper with these diagnostics" exclude="/free-tools/ipchecker" />
          </div>
        ) : null}

        {/* Detailed Information Grid */}
        <div className="mb-12">
          <IpDetails data={data} loading={loading} />
        </div>

        {/* Network Technical Specifications */}
        <div className="mb-16">
          <TechnicalSpecs data={data} loading={loading} />
        </div>
        {/* Geo Location Map */}
        <div className="mb-16">
          <GeolocationPrivacyMap data={data} loading={loading} />
        </div>

        {/* Ip4 & IP6 Map */}
        <div className="mb-16">
          <IPv4IPv6Guide />
        </div>


        {/* Trust & Statistics Section - Creative Design */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Trusted by Thousands Worldwide
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Users Choose Our IP Checker
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who rely on our accurate, private, and instant IP detection tool.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <UserGroupIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-gray-500">Monthly Active Users</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Trusted by individuals and professionals worldwide for accurate IP detection.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
                  <ChartBarIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-gray-500">Accuracy Rate</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Industry-leading precision in IP geolocation and network data detection.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <ClockIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">&lt;1s</div>
                  <div className="text-sm text-gray-500">Instant Results</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Get your IP information instantly with our optimized detection system.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border border-amber-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-amber-100 rounded-lg mr-4">
                  <ShieldCheckIcon className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">100%</div>
                  <div className="text-sm text-gray-500">Privacy Focused</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                No data storage or tracking. Your privacy is our priority.
              </p>
            </div>
          </div>




          {/* Expert Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-2/3 lg:pr-8 mb-6 lg:mb-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Built by RankStack Experts
                </h3>
                <p className="text-gray-700 mb-4">
                  Our team of web hosting specialists, network engineers, and cybersecurity experts ensure every tool is:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Accurate & Reliable</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Transparent & Trustworthy</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Privacy-First Design</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Continuously Updated</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 text-center lg:text-right">
                <div className="inline-block bg-white px-6 py-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Tool Availability</div>
                  <div className="text-xs text-gray-500 mt-1">Always accessible</div>
                </div>
              </div>
            </div>
          </div>
        </section>
          </div>
        </section>
      </main>

      <ToolHelpSection
        intro={{
          title: 'Understand the IP address lookup before you act on it',
          description: 'These short guides explain the public IP, location estimate, and privacy decisions behind the result you just saw.',
        }}
        results={RESULT_GUIDE}
        troubleshooting={TROUBLESHOOTING}
        faqs={FAQS}
      />

      <section className="section bg-slate-50">
        <div className="shell max-w-6xl">
        <RelatedResources context="/free-tools/ipchecker" />
        </div>
      </section>

      <Footer />
    </>
  );
}