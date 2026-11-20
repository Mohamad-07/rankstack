'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import RelatedResources from '@/components/RelatedResources';
import useNetworkData from '@/hooks/useNetworkData';
import {
  CopyButton,
  ErrorNotice,
  JsonViewer,
  MetricCard,
  ScanControls,
  StatusBadge,
  ToolCrossLinks,
  formatDiagnosticErrors,
} from '@/components/NetworkToolUI';
import { ToolHelpSection } from '@/components/ToolContent';
import {
  BugAntIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const RESULT_GUIDE = [
  {
    term: 'User-agent string',
    detail: 'A compact text header that announces your browser, engine, operating system, and sometimes bot or mobile status to every site you visit.',
  },
  {
    term: 'Browser and version',
    detail: 'The decoded family and version are parsed from that header. They can be reduced or frozen by privacy-focused browsers.',
  },
  {
    term: 'Operating system and device',
    detail: 'OS and device class come from the same header and are cross-checked with navigator.platform and touch-point data.',
  },
  {
    term: 'Bot / crawler status',
    detail: 'A crawler flag means the header matches known automated-client patterns. It does not identify a specific person.',
  },
  {
    term: 'Raw match',
    detail: 'An exact match means the parsed header equals navigator.userAgent. A difference can come from a proxy, extension, or privacy setting.',
  },
];

const TROUBLESHOOTING = [
  {
    title: 'Your user agent looks outdated',
    detail: 'Refresh the page after a browser update. Some browsers freeze or simplify their user-agent string to reduce fingerprinting.',
  },
  {
    title: 'The browser and OS detector disagrees with your device',
    detail: 'Check for user-agent spoofing extensions, VPN browsers, or developer tools overrides that rewrite the header.',
  },
  {
    title: 'A mobile or bot user agent check flags you',
    detail: 'Corporate proxies, accessibility tools, and automation extensions can add tokens. Compare with navigator.userAgent to find the source.',
  },
  {
    title: 'You need to report a bug accurately',
    detail: 'Copy the full user-agent string rather than paraphrasing it. Include the exact browser version and OS shown in this report.',
  },
];

const FAQS = [
  {
    question: 'What is my user agent used for?',
    answer:
      'A user agent helps websites serve compatible content, such as the right JavaScript bundle or mobile layout. It also contributes to analytics and fraud checks.',
  },
  {
    question: 'How do I check my user agent string?',
    answer:
      'It appears at the top of this page. You can copy it with one click, then compare the decoded browser, OS, and device cards below it.',
  },
  {
    question: 'Can I change my user agent?',
    answer:
      'Yes, through browser developer tools or extensions. Changing it can break site compatibility and does not make you anonymous, because other signals remain visible.',
  },
  {
    question: 'What is the difference between a browser and OS detector?',
    answer:
      'The browser detector reads the client name and version from the header. The OS detector infers the platform from separate tokens and local navigator values.',
  },
  {
    question: 'Why does a mobile and bot user agent check matter?',
    answer:
      'It explains why a site may show a different layout or challenge page. Mobile tokens, crawler tokens, and automation tokens all change how content is served.',
  },
];

const languageList = (languages) =>
  Array.isArray(languages) && languages.length ? languages.join(', ') : 'Not available';
const asBooleanLabel = (value) => (value ? 'Yes' : 'No');

export default function UserAgentInspectorPage() {
  const { loading, error, data, errors, rescan } = useNetworkData();
  const [browserInfo, setBrowserInfo] = useState(null);

  useEffect(() => {
    setBrowserInfo({
      userAgent: navigator.userAgent,
      platform: navigator.platform || 'Not available',
      viewport: `${window.innerWidth} × ${window.innerHeight}`,
      devicePixelRatio: window.devicePixelRatio || 1,
      maxTouchPoints: navigator.maxTouchPoints ?? 0,
      languages: Array.from(navigator.languages || (navigator.language ? [navigator.language] : [])),
    });
  }, []);

  const version = [data?.versionMajor, data?.versionMinor, data?.versionPatch]
    .filter((part) => part !== '' && part !== null && part !== undefined)
    .join('.');

  const matches =
    data?.userAgentRaw && browserInfo?.userAgent ? data.userAgentRaw === browserInfo.userAgent : null;

  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'What Is My User Agent? User Agent Checker',
    operatingSystem: 'Any',
    applicationCategory: 'BrowserApplication',
    description:
      'Check my user agent with a free user agent checker that decodes browser, OS, device, and crawler details and cross-checks live browser values.',
    url: 'https://rankstack.dev/free-tools/user-agent-inspector',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <Header />

      <main>
        <PageHero
          eyebrow="Free tool"
          title="What is my user agent? Browser & OS detector"
          description="Use a free user agent checker to decode your user-agent string into browser, version, OS, and device signals, then compare them with local browser values."
          actions={<a href="#diagnostic-tool" className="btn-primary">Inspect user agent</a>}
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Free Tools', href: '/free-tools' },
            { label: 'User-Agent Inspector' },
          ]}
        />

        <section id="diagnostic-tool" className="section bg-white">
          <div className="shell max-w-6xl">
            <div className="card p-6 sm:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">Your user-agent string</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                    Read client-side by our diagnostic engine and cross-checked with the values your browser reports locally.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <ScanControls onRescan={rescan} loading={loading} />
                  <CopyButton
                    value={data?.userAgentRaw || browserInfo?.userAgent}
                    label="Copy User-Agent"
                    copiedLabel="Copied!"
                  />
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-950 p-5">
                <code className="block break-all font-mono text-xs leading-relaxed text-emerald-200">
                  {data?.userAgentRaw || browserInfo?.userAgent || (loading ? 'Reading user-agent…' : 'Not available')}
                </code>
              </div>

              <ErrorNotice error={error} />
              {Object.keys(errors || {}).length ? (
                <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  Partial data: {formatDiagnosticErrors(errors)}
                </p>
              ) : null}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="card p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <GlobeAltIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-950">Browser &amp; version</h3>
                <p className="mt-2 text-lg font-bold text-slate-900">{data?.family || 'Unknown'}</p>
                <p className="text-sm text-slate-600">{version ? `Version ${version}` : 'Version not detected'}</p>
                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  <MetricCard label="userAgent" value={data?.userAgent} />
                  <MetricCard label="userAgentDisplay" value={data?.userAgentDisplay} />
                </div>
              </div>

              <div className="card p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <ComputerDesktopIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-950">Operating system</h3>
                <p className="mt-2 text-lg font-bold text-slate-900">{data?.os || 'Unknown'}</p>
                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  <MetricCard label="navigator.platform" value={browserInfo?.platform} />
                  <MetricCard label="Viewport" value={browserInfo?.viewport} />
                </div>
              </div>

              <div className="card p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                  <DevicePhoneMobileIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-950">Device class</h3>
                <p className="mt-2 text-lg font-bold text-slate-900">{data?.device || 'Unknown'}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusBadge status={data?.isMobile ? 'warning' : 'pass'}>
                    Mobile: {asBooleanLabel(data?.isMobile)}
                  </StatusBadge>
                  <StatusBadge status="neutral">Touch points: {browserInfo?.maxTouchPoints ?? '—'}</StatusBadge>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <MetricCard label="Device pixel ratio" value={browserInfo?.devicePixelRatio} />
                </div>
              </div>

              <div className="card p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <BugAntIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-950">Bot / crawler status</h3>
                <p className="mt-2 text-lg font-bold text-slate-900">{data?.isSpider ? 'Crawler detected' : 'Human browser'}</p>
                <div className="mt-3">
                  <StatusBadge status={data?.isSpider ? 'warning' : 'pass'}>
                    isSpider: {asBooleanLabel(data?.isSpider)}
                  </StatusBadge>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <MetricCard label="userLanguages" value={languageList(data?.userLanguages)} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-slate-50">
          <div className="shell max-w-6xl space-y-8">
            <div className="card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-950">Cross-check summary</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <MetricCard
                  label="Raw UA match"
                  value={matches === null ? 'Checking…' : matches ? 'Exact match' : 'Differs from navigator.userAgent'}
                />
                <MetricCard label="navigator.userAgent" value={browserInfo?.userAgent} mono />
                <MetricCard label="Navigator languages" value={languageList(browserInfo?.languages)} />
              </div>
            </div>

            <JsonViewer title="View raw connection profile" data={data?.raw?.connectionProfile} />
            <ToolCrossLinks heading="Inspect the rest of your footprint" exclude="/free-tools/user-agent-inspector" />
            <RelatedResources context="/free-tools/user-agent-inspector" />
          </div>
        </section>
      </main>

      <ToolHelpSection
        intro={{
          title: 'Know what your user agent says about you',
          description: 'These guides decode the header, explain the browser and OS detector output, and show when a mobile or bot signal needs attention.',
        }}
        results={RESULT_GUIDE}
        troubleshooting={TROUBLESHOOTING}
        faqs={FAQS}
      />

      <Footer />
    </>
  );
}
