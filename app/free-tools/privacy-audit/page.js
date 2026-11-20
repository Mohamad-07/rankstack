'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import RelatedResources from '@/components/RelatedResources';
import useNetworkData from '@/hooks/useNetworkData';
import {
  ErrorNotice,
  JsonViewer,
  MetricCard,
  ScanControls,
  StatusBadge,
  ToolCrossLinks,
  formatDiagnosticErrors,
} from '@/components/NetworkToolUI';
import { ToolHelpSection } from '@/components/ToolContent';
import { LockClosedIcon, EyeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const RESULT_GUIDE = [
  {
    term: 'Automatically exposed signals',
    detail: 'These values are visible to any site you visit without a permission prompt, including your public IP, browser family, language, and timezone.',
  },
  {
    term: 'Approximate network region',
    detail: 'Country, region, and city come from the registered network area. They are broad estimates, not a precise address.',
  },
  {
    term: 'Browser fingerprint surface',
    detail: 'Screen size, CPU threads, touch points, and viewport help distinguish browsers. Standardising them reduces uniqueness but can break sites.',
  },
  {
    term: 'Permission-gated details',
    detail: 'Exact latitude, longitude, locality, postcode, and Plus Code stay locked until you explicitly grant location access.',
  },
  {
    term: 'Exposure level',
    detail: 'A masked IP can still be paired with browser signals. This field is a quick summary, not a complete anonymity verdict.',
  },
];

const TROUBLESHOOTING = [
  {
    title: 'You want a smaller digital footprint',
    detail: 'Remove unused permissions, limit third-party cookies, and keep a separate browser profile for logins and testing.',
  },
  {
    title: 'A browser leak test shows surprising values',
    detail: 'Compare the navigator values with your system settings. VPN extensions and privacy modes often change one but not the other.',
  },
  {
    title: 'The IP and location privacy check looks inconsistent',
    detail: 'Travel, VPN endpoints, and mobile routing can place your IP region far from your device timezone. Treat it as context, not an error.',
  },
  {
    title: 'You need stronger protection',
    detail: 'Combine a trusted VPN with WebRTC controls and regular permission audits. No single setting hides every signal.',
  },
];

const FAQS = [
  {
    question: 'What does a browser privacy test actually show?',
    answer:
      'It lists signals your browser exposes automatically, such as user agent, language, timezone, screen details, and public IP region. It does not reveal passwords or private files.',
  },
  {
    question: 'What does my browser reveal without asking permission?',
    answer:
      'Your browser reveals its type, version hints, platform, languages, timezone, viewport, and network address region. Exact GPS coordinates require a separate permission prompt.',
  },
  {
    question: 'Is a digital footprint checker the same as a fingerprint test?',
    answer:
      'Not exactly. This audit shows the individual signals that can contribute to a fingerprint. It does not calculate a permanent identifier or track you across visits.',
  },
  {
    question: 'Why does an IP and location privacy check still show my city?',
    answer:
      'Every website you connect to needs your public IP to return a response. That address reveals an approximate network region even when no location permission is granted.',
  },
  {
    question: 'Can this audit stop a browser leak?',
    answer:
      'No. It gives you the evidence to adjust your settings. Use browser privacy controls, permission reviews, and WebRTC settings to reduce what is shared.',
  },
];

const HARDENING_TIPS = [
  {
    title: 'Deny location by default',
    detail: 'Keep browser location prompts set to “Ask” or “Block”, and remove permissions for sites you no longer use.',
  },
  {
    title: 'Limit WebRTC exposure',
    detail: 'Use a browser privacy setting or extension that disables non-proxied WebRTC candidates when you need full IP masking.',
  },
  {
    title: 'Reduce fingerprint surface',
    detail: 'Browser resistance-to-fingerprinting settings can standardise screen, font, and hardware values reported to sites.',
  },
  {
    title: 'Use a trusted VPN',
    detail: 'A reputable VPN changes the IP and approximate region seen by sites, but it does not hide browser or device signals.',
  },
  {
    title: 'Review site permissions regularly',
    detail: 'Camera, microphone, location, and notification permissions are the most revealing ones to prune periodically.',
  },
  {
    title: 'Separate browsing profiles',
    detail: 'Keep logins, research, and testing in separate profiles so cookies and site data cannot join your activity together.',
  },
];

const asBooleanLabel = (value) => (value ? 'Yes' : 'No');
const languageList = (languages) =>
  Array.isArray(languages) && languages.length ? languages.join(', ') : 'Not available';

export default function PrivacyAuditPage() {
  const { loading, error, data, errors, rescan, refineWithGps, gpsLoading, gpsError, hasGps, position } =
    useNetworkData();
  const [browserSignals, setBrowserSignals] = useState(null);

  useEffect(() => {
    setBrowserSignals({
      userAgent: navigator.userAgent,
      platform: navigator.platform || 'Not available',
      languages: Array.from(navigator.languages || (navigator.language ? [navigator.language] : [])),
      screen: typeof screen !== 'undefined' ? `${screen.width} × ${screen.height}` : 'Not available',
      colorDepth: typeof screen !== 'undefined' ? screen.colorDepth : 'Not available',
      hardwareConcurrency: navigator.hardwareConcurrency ?? 'Not available',
      maxTouchPoints: navigator.maxTouchPoints ?? 0,
      viewport: `${window.innerWidth} × ${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Not available',
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack || 'Not set',
    });
  }, []);

  const automaticSignals = [
    ['Public IP (ipString)', data?.ipString, true],
    ['Numeric IP (ipNumeric)', data?.ipNumeric, true],
    ['IP type', data?.ipType, false],
    ['Behind proxy', asBooleanLabel(data?.isBehindProxy), false],
    ['Country / code', data?.countryName ? `${data.countryName} (${data.countryCode || '—'})` : '', false],
    ['Region', data?.principalSubdivision, false],
    ['City / locality', data?.city || data?.locality, false],
    ['Postcode', data?.postcode, false],
    ['Plus Code', data?.plusCode, true],
    ['Browser (userAgentDisplay)', data?.userAgentDisplay, false],
    ['Reported languages', languageList(data?.userLanguages), false],
    ['navigator.userAgent', browserSignals?.userAgent, true],
    ['navigator.platform', browserSignals?.platform, false],
    ['Screen size', browserSignals?.screen, false],
    ['Color depth', browserSignals?.colorDepth, false],
    ['CPU threads', browserSignals?.hardwareConcurrency, false],
    ['Viewport', browserSignals?.viewport, false],
    ['Timezone', browserSignals?.timezone, false],
    ['Navigator languages', languageList(browserSignals?.languages), false],
    ['Cookies enabled', asBooleanLabel(browserSignals?.cookiesEnabled), false],
    ['Max touch points', browserSignals?.maxTouchPoints, false],
    ['Do Not Track', browserSignals?.doNotTrack, false],
  ];

  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Browser Privacy Test & Digital Footprint Checker',
    operatingSystem: 'Any',
    applicationCategory: 'PrivacyApplication',
    description:
      'Run a browser privacy test to see what your browser reveals, review your digital footprint, and check IP and location exposure.',
    url: 'https://rankstack.dev/free-tools/privacy-audit',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <Header />

      <main>
        <PageHero
          eyebrow="Free tool"
          title="Browser privacy test & digital footprint checker"
          description="Run a browser privacy test to see what your browser reveals about your network and device, then reveal the exact location details that stay protected until you grant permission."
          actions={<a href="#diagnostic-tool" className="btn-primary">Start privacy audit</a>}
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Free Tools', href: '/free-tools' },
            { label: 'Privacy Audit' },
          ]}
        />

        <section id="diagnostic-tool" className="section bg-white">
          <div className="shell max-w-6xl">
            <div className="card p-6 sm:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">Your exposure at a glance</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                    Network values come from a client-side diagnostic engine; browser values are read locally. Cached in this tab only.
                  </p>
                </div>
                <ScanControls onRescan={rescan} loading={loading} />
              </div>
              <ErrorNotice error={error} />
              {Object.keys(errors || {}).length ? (
                <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  Partial data: {formatDiagnosticErrors(errors)}
                </p>
              ) : null}

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard label="Automatic signals found" value={automaticSignals.filter(([, value]) => value !== '' && value !== null && value !== undefined).length} />
                <MetricCard label="Permission-gated signals" value={hasGps ? '5 revealed' : '5 protected'} />
                <MetricCard label="Lookup source" value={data?.lookupSource === 'gps' ? 'Live GPS' : 'IP geolocation'} />
                <MetricCard label="Exposure level" value={data?.isBehindProxy ? 'Masked IP, visible browser signals' : 'Direct IP, visible browser signals'} />
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-slate-50">
          <div className="shell max-w-6xl space-y-8">
            <div className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200 bg-amber-50 px-6 py-5">
                <div className="flex items-center gap-3">
                  <EyeIcon className="h-6 w-6 text-amber-600" aria-hidden="true" />
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">Exposed automatically without permission</h2>
                    <p className="mt-1 text-sm text-slate-600">Available to any site you visit — no prompt required.</p>
                  </div>
                </div>
                <StatusBadge status="warning">Visible now</StatusBadge>
              </div>
              <div className="grid gap-3 p-6 sm:grid-cols-2 lg:grid-cols-3">
                {automaticSignals.map(([label, value, mono]) => (
                  <MetricCard key={label} label={label} value={value} mono={mono} />
                ))}
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200 bg-emerald-50 px-6 py-5">
                <div className="flex items-center gap-3">
                  <LockClosedIcon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">Protected until permission granted</h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Exact GPS location is requested only when you click, and coordinates are never stored.
                    </p>
                  </div>
                </div>
                <StatusBadge status={hasGps ? 'warning' : 'pass'}>
                  {hasGps ? 'Shared by you' : 'Protected'}
                </StatusBadge>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" onClick={refineWithGps} disabled={gpsLoading || loading} className="btn-primary">
                    <LockClosedIcon className="h-4 w-4" aria-hidden="true" />
                    {gpsLoading ? 'Waiting for permission…' : hasGps ? 'Refresh exact location' : 'Reveal exact location'}
                  </button>
                  <span className="text-xs text-slate-500">
                    Uses navigator.geolocation.getCurrentPosition(), then reverse geocodes the fresh coordinates.
                  </span>
                </div>

                <ErrorNotice error={gpsError} title="Location permission was not granted" />

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <MetricCard label="locality" value={hasGps ? data?.locality : 'Locked'} />
                  <MetricCard label="postcode" value={hasGps ? data?.postcode : 'Locked'} />
                  <MetricCard label="plusCode" value={hasGps ? data?.plusCode : 'Locked'} mono />
                  <MetricCard label="Latitude (live)" value={hasGps ? position?.latitude : 'Locked'} mono />
                  <MetricCard label="Longitude (live)" value={hasGps ? position?.longitude : 'Locked'} mono />
                  <MetricCard label="Accuracy" value={hasGps && position?.accuracy ? `±${Math.round(position.accuracy)} m` : 'Locked'} />
                </div>
              </div>
            </div>

            <div className="card p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                <h2 className="text-xl font-bold text-slate-950">Privacy hardening checklist</h2>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {HARDENING_TIPS.map((tip, index) => (
                  <div key={tip.title} className="rounded-xl border border-slate-200 p-4">
                    <div className="text-xs font-semibold text-indigo-600">0{index + 1}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-950">{tip.title}</div>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{tip.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <JsonViewer title="View raw diagnostic data" data={data?.raw} />

            <ToolCrossLinks heading="Continue the privacy check" exclude="/free-tools/privacy-audit" />
            <RelatedResources context="/free-tools/privacy-audit" />
          </div>
        </section>
      </main>

      <ToolHelpSection
        intro={{
          title: 'Turn browser signals into informed privacy choices',
          description: 'These guides explain what each reading means, which ones you can change, and which ones are simply part of connecting to the web.',
        }}
        results={RESULT_GUIDE}
        troubleshooting={TROUBLESHOOTING}
        faqs={FAQS}
      />

      <Footer />
    </>
  );
}
