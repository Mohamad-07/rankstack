'use client';

import { useCallback, useEffect, useState } from 'react';
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
import {
  LanguageIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const RESULT_GUIDE = [
  {
    term: 'Proxy headers',
    detail: 'A warning means the network path advertises an intermediate router. VPNs and corporate proxies commonly do this.',
  },
  {
    term: 'WebRTC leak status',
    detail: 'A WebRTC leak test checks whether browser peer-to-peer candidates reveal a local or differing public IP.',
  },
  {
    term: 'Timezone alignment',
    detail: 'A timezone mismatch check compares your browser clock zone with the region inferred from your network address.',
  },
  {
    term: 'Language alignment',
    detail: 'Reported browser languages that conflict with the detected region can indicate a relocated or configured profile.',
  },
  {
    term: 'IP versus GPS',
    detail: 'This compares your network region with live GPS only after you grant permission. Different cities can still be normal on mobile networks.',
  },
];

const TROUBLESHOOTING = [
  {
    title: 'A VPN or proxy warning surprised you',
    detail: 'Confirm whether your VPN client is connected, then run a re-scan. Corporate networks and some mobile carriers also use proxies.',
  },
  {
    title: 'WebRTC shows a local address',
    detail: 'Disable non-proxied WebRTC candidates in your browser privacy settings, or use a browser that blocks them by default, then re-test.',
  },
  {
    title: 'Your timezone looks mismatched',
    detail: 'Check your operating system timezone and any VPN location setting. Intl timezone comes from the device, not the network lookup.',
  },
  {
    title: 'The score is a guide, not a verdict',
    detail: 'Each of four checks contributes 25 points. Inconclusive checks earn partial credit, so a lower score can simply mean less available data.',
  },
];

const FAQS = [
  {
    question: 'What does a proxy checker actually detect?',
    answer:
      'It inspects routing signals visible to a website, such as proxy headers and IP characteristics. It cannot prove who is behind a connection, but it can show whether traffic appears to be relayed.',
  },
  {
    question: 'Will a VPN leak test expose my real IP?',
    answer:
      'No. The WebRTC leak test only reports candidate addresses to you in this tab. It does not send them to RankStack or store them on a server.',
  },
  {
    question: 'Why do I see a timezone mismatch check result?',
    answer:
      'Your device timezone, browser languages, and network region normally line up. A mismatch can happen when you travel, use a VPN, or configure a browser profile for another locale.',
  },
  {
    question: 'What is an IP fraud and anonymity check used for?',
    answer:
      'It helps you see whether your connection looks consistent to a website. Fraud systems combine many signals, so this tool is a transparency check, not a scoring service.',
  },
  {
    question: 'Do I need to grant GPS permission for every scan?',
    answer:
      'No. The first three checks work without location access. Live GPS is optional and only used when you click the comparison button.',
  },
];

const US_STATE_ZONES = {
  CA: 'America/Los_Angeles', OR: 'America/Los_Angeles', WA: 'America/Los_Angeles', NV: 'America/Los_Angeles',
  AZ: 'America/Phoenix', UT: 'America/Denver', CO: 'America/Denver', MT: 'America/Denver', NM: 'America/Denver',
  TX: 'America/Chicago', IL: 'America/Chicago', MI: 'America/Detroit', NY: 'America/New_York', FL: 'America/New_York',
  GA: 'America/New_York', PA: 'America/New_York', MA: 'America/New_York', NJ: 'America/New_York', VA: 'America/New_York',
  NC: 'America/New_York', SC: 'America/New_York', OH: 'America/New_York', HI: 'Pacific/Honolulu', AK: 'America/Anchorage',
};

const COUNTRY_ZONES = {
  US: ['America/'], CA: ['America/'], GB: ['Europe/London'], IE: ['Europe/Dublin'],
  DE: ['Europe/Berlin'], FR: ['Europe/Paris'], ES: ['Europe/Madrid'], IT: ['Europe/Rome'],
  NL: ['Europe/Amsterdam'], BE: ['Europe/Brussels'], SE: ['Europe/Stockholm'], NO: ['Europe/Oslo'],
  PL: ['Europe/Warsaw'], PK: ['Asia/Karachi'], IN: ['Asia/Kolkata', 'Asia/Calcutta'], CN: ['Asia/Shanghai'],
  JP: ['Asia/Tokyo'], KR: ['Asia/Seoul'], AU: ['Australia/'], BR: ['America/Sao_Paulo'],
  RU: ['Europe/Moscow', 'Asia/'], ZA: ['Africa/Johannesburg'], NG: ['Africa/Lagos'],
  AE: ['Asia/Dubai'], SG: ['Asia/Singapore'], NZ: ['Pacific/Auckland'], MX: ['America/Mexico_City'],
};

const COUNTRY_LANGUAGES = {
  US: ['en'], GB: ['en'], IE: ['en', 'ga'], CA: ['en', 'fr'], AU: ['en'], NZ: ['en'],
  PK: ['ur', 'en'], IN: ['hi', 'en'], DE: ['de', 'en'], FR: ['fr', 'en'], ES: ['es', 'en'],
  IT: ['it', 'en'], NL: ['nl', 'en'], PL: ['pl', 'en'], BR: ['pt', 'en'], CN: ['zh', 'en'],
  JP: ['ja', 'en'], RU: ['ru', 'en'], SA: ['ar', 'en'], AE: ['ar', 'en'], ZA: ['en', 'af'],
};

const asBooleanLabel = (value) => (value ? 'Yes' : 'No');
const languageList = (languages) =>
  Array.isArray(languages) && languages.length ? languages.join(', ') : 'Not available';
const primaryLanguages = (languages) =>
  (Array.isArray(languages) ? languages : [])
    .map((language) => String(language).split('-')[0].toLowerCase())
    .filter(Boolean);

function isPrivateIp(ip) {
  if (ip.includes(':')) {
    return /^(::1|fe80|fc00|fd00)/i.test(ip);
  }
  const octets = ip.split('.').map(Number);
  if (octets.length !== 4 || octets.some((octet) => !Number.isFinite(octet))) return false;
  return (
    octets[0] === 0 ||
    octets[0] === 10 ||
    octets[0] === 127 ||
    (octets[0] === 169 && octets[1] === 254) ||
    (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
    (octets[0] === 192 && octets[1] === 168) ||
    (octets[0] === 100 && octets[1] >= 64 && octets[1] <= 127)
  );
}

function extractCandidateIps(candidate) {
  const ips = new Set();
  const ipv4Matches = candidate.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) || [];
  ipv4Matches.forEach((ip) => {
    const octets = ip.split('.').map(Number);
    if (octets.every((octet) => octet >= 0 && octet <= 255)) ips.add(ip);
  });
  const ipv6Matches = candidate.match(/\b(?:[a-f0-9]{1,4}:){2,}[a-f0-9:.]{1,4}\b/gi) || [];
  ipv6Matches.forEach((ip) => ips.add(ip.replace(/%.*$/, '')));
  return [...ips];
}

function runWebRtcLeakCheck() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.RTCPeerConnection) {
      resolve({
        supported: false,
        ips: [],
        note: 'WebRTC is not available in this browser, so no candidate IPs could be checked.',
      });
      return;
    }

    const found = new Set();
    let settled = false;
    let connection;

    const finish = (note = '') => {
      if (settled) return;
      settled = true;
      if (connection) {
        try {
          connection.close();
        } catch {
          return resolve({ supported: true, ips: [...found], note });
        }
      }
      resolve({ supported: true, ips: [...found], note });
    };

    try {
      connection = new window.RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
    } catch {
      resolve({ supported: false, ips: [], note: 'WebRTC could not be initialised in this browser.' });
      return;
    }

    connection.onicecandidate = (event) => {
      if (!event.candidate) {
        finish();
        return;
      }
      extractCandidateIps(event.candidate.candidate || '').forEach((ip) => found.add(ip));
    };
    connection.onicecandidateerror = () => {};

    try {
      connection.createDataChannel('rankstack-leak-check');
      connection
        .createOffer()
        .then((offer) => connection.setLocalDescription(offer))
        .catch(() => finish('WebRTC candidate gathering was blocked.'));
    } catch {
      finish('WebRTC candidate gathering was blocked.');
    }

    setTimeout(() => finish(), 6000);
  });
}

function evaluateTimezone(data, browserZone) {
  if (!data || !browserZone) {
    return { status: 'neutral', title: 'Timezone Alignment', detail: 'Waiting for location data…' };
  }

  const countryCode = String(data.countryCode || data.ipCountryCode || '').toUpperCase();
  const subdivisionCode = String(data.principalSubdivisionCode || '').split('-')[1];
  const subdivision = subdivisionCode || String(data.principalSubdivision || '');
  const expected = US_STATE_ZONES[subdivision]
    ? [US_STATE_ZONES[subdivision]]
    : COUNTRY_ZONES[countryCode];

  if (!expected) {
    return {
      status: 'neutral',
      title: 'Timezone Alignment',
      detail: `Browser reports ${browserZone}; no reference mapping for ${countryCode || 'this region'}.`,
    };
  }

  const aligned = expected.some(
    (zone) => browserZone === zone || browserZone.startsWith(zone.endsWith('/') ? zone : `${zone}/`)
  );

  return {
    status: aligned ? 'pass' : 'warning',
    title: 'Timezone Alignment',
    detail: aligned
      ? `Browser timezone ${browserZone} matches the detected region.`
      : `Browser reports ${browserZone}, which does not match the expected zone for ${subdivision || countryCode}.`,
  };
}

function evaluateLanguages(data, browserLanguages) {
  if (!data || !browserLanguages.length) {
    return { status: 'neutral', title: 'Language Alignment', detail: 'Waiting for language data…' };
  }

  const browser = primaryLanguages(browserLanguages);
  const api = primaryLanguages(data.userLanguages);
  const countryCode = String(data.countryCode || data.ipCountryCode || '').toUpperCase();
  const expected = COUNTRY_LANGUAGES[countryCode] || [];
  const apiMatches = api.length ? browser.some((language) => api.includes(language)) : null;
  const localeMatches = expected.length ? browser.some((language) => expected.includes(language)) : null;

  if (apiMatches === false || localeMatches === false) {
    return {
      status: 'warning',
      title: 'Language Alignment',
      detail: `Browser languages (${browser.join(', ') || 'none'}) do not match ${api.length ? `reported languages (${api.join(', ')})` : `the expected locale for ${countryCode}`}.`,
    };
  }

  if (apiMatches === null && localeMatches === null) {
    return {
      status: 'neutral',
      title: 'Language Alignment',
      detail: 'No reference languages available for this region.',
    };
  }

  return {
    status: 'pass',
    title: 'Language Alignment',
    detail: `Browser languages (${browser.join(', ')}) align with the detected locale.`,
  };
}

function evaluateGps(data, position) {
  if (!data || data.lookupSource !== 'gps' || !position) {
    return {
      status: 'neutral',
      title: 'IP-vs-GPS Location Match',
      detail: 'Grant live location permission to compare IP geolocation with GPS.',
    };
  }

  const gpsCountry = String(data.countryCode || '').toUpperCase();
  const ipCountry = String(data.ipCountryCode || '').toUpperCase();
  const countryMatch = gpsCountry && ipCountry ? gpsCountry === ipCountry : null;
  const cityMatch =
    data.city && data.ipCity
      ? data.city.toLowerCase() === data.ipCity.toLowerCase()
      : null;

  if (countryMatch === false) {
    return {
      status: 'warning',
      title: 'IP-vs-GPS Location Match',
      detail: `IP geolocation points to ${ipCountry || 'an unknown country'} while GPS points to ${gpsCountry || 'an unknown country'}.`,
    };
  }

  return {
    status: 'pass',
    title: 'IP-vs-GPS Location Match',
    detail: cityMatch === false
      ? `Same country (${gpsCountry}); city differs from the IP estimate.`
      : `IP and GPS agree on ${gpsCountry || 'your region'}${data.city ? ` near ${data.city}` : ''}.`,
  };
}

const scoreFor = (status) => (status === 'pass' ? 25 : status === 'neutral' ? 12 : 0);

export default function ProxyDetectorPage() {
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
    position,
  } = useNetworkData();
  const [browserInfo, setBrowserInfo] = useState({ timezone: '', languages: [] });
  const [webRtc, setWebRtc] = useState({ loading: true, result: null });

  useEffect(() => {
    setBrowserInfo({
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      languages: Array.from(
        navigator.languages || (navigator.language ? [navigator.language] : [])
      ),
    });
  }, []);

  const checkWebRtc = useCallback(() => {
    setWebRtc({ loading: true, result: null });
    runWebRtcLeakCheck().then((result) => setWebRtc({ loading: false, result }));
  }, []);

  useEffect(() => {
    checkWebRtc();
  }, [checkWebRtc]);

  const handleRescan = () => {
    rescan();
    checkWebRtc();
  };

  const leakedIps = (webRtc.result?.ips || []).filter(
    (ip) => isPrivateIp(ip) || (data?.ipString && ip !== data.ipString && !isPrivateIp(ip))
  );

  const webRtcCheck = {
    status: webRtc.loading
      ? 'neutral'
      : !webRtc.result?.supported
        ? 'neutral'
        : leakedIps.length
          ? 'warning'
          : 'pass',
    title: 'WebRTC Leak Status',
    detail: webRtc.loading
      ? 'Gathering ICE candidates with a public STUN server…'
      : !webRtc.result?.supported
        ? webRtc.result?.note || 'WebRTC is unavailable in this browser.'
        : leakedIps.length
          ? `Potentially leaked IPs: ${leakedIps.join(', ')}.`
          : `No local or differing public IPs detected${webRtc.result.ips.length ? ` among ${webRtc.result.ips.length} candidate(s)` : ''}.`,
  };

  const proxyCheck = {
    status: data?.isBehindProxy || data?.proxyIp ? 'warning' : data ? 'pass' : 'neutral',
    title: 'Proxy Headers',
    detail: data?.isBehindProxy || data?.proxyIp
      ? `Proxy headers detected${data.proxyIp ? ` (${data.proxyIp})` : ''}. Expected if you are using a VPN or proxy.`
      : data
        ? 'No proxy headers reported by the lookup service.'
        : 'Waiting for network data…',
  };

  const timezoneCheck = evaluateTimezone(data, browserInfo.timezone);
  const languageCheck = evaluateLanguages(data, browserInfo.languages);
  const gpsCheck = evaluateGps(data, position);
  const checks = [proxyCheck, timezoneCheck, webRtcCheck, gpsCheck];
  const score = checks.reduce((total, check) => total + scoreFor(check.status), 0);

  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Proxy Checker & VPN Leak Test',
    operatingSystem: 'Any',
    applicationCategory: 'NetworkApplication',
    description:
      'Run a proxy checker and VPN leak test for WebRTC leaks, timezone mismatch, IP-versus-GPS location, and anonymity signals in your browser.',
    url: 'https://rankstack.dev/free-tools/proxy-detector',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <Header />

      <main>
        <PageHero
          eyebrow="Free tool"
          title="Proxy checker & VPN leak test"
          description="Run a free proxy checker and VPN leak test. Compare WebRTC leaks, timezone mismatch, language signals, and optional live GPS location in one scan."
          actions={<a href="#diagnostic-tool" className="btn-primary">Start anonymity scan</a>}
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Free Tools', href: '/free-tools' },
            { label: 'Proxy Detector' },
          ]}
        />

        <section id="diagnostic-tool" className="section bg-white">
          <div className="shell max-w-6xl">
            <div className="card p-6 sm:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">Anonymity &amp; consistency scan</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                    All checks run in your browser through a client-side diagnostic engine. Results are cached for this tab only; a re-scan refreshes them on demand.
                  </p>
                </div>
                <ScanControls
                  onRescan={handleRescan}
                  loading={loading}
                  onGps={refineWithGps}
                  gpsLoading={gpsLoading}
                  hasGps={hasGps}
                  note="Location is requested only when you click."
                />
              </div>

              <ErrorNotice error={error} />
              <ErrorNotice error={gpsError} title="Live GPS comparison unavailable" />
              {Object.keys(errors || {}).length ? (
                <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  Partial data: {formatDiagnosticErrors(errors)}
                </p>
              ) : null}

              <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
                <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white">
                  <div className="text-sm font-medium text-indigo-100">Overall score</div>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-6xl font-bold tabular-nums">{loading ? '—' : score}</span>
                    <span className="mb-2 text-lg text-indigo-100">/ 100</span>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full rounded-full bg-white transition-all duration-700" style={{ width: `${score}%` }} />
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-indigo-100">
                    Each of the four scored checks contributes 25 points. Not-checked items receive partial credit.
                  </p>
                </div>

                <div className="space-y-3">
                  {checks.map((check) => (
                    <div key={check.title} className="rounded-xl border border-slate-200 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-slate-950">{check.title}</h3>
                        <StatusBadge status={check.status}>
                          {check.status === 'pass' ? 'Pass' : check.status === 'warning' ? 'Warning' : 'Not checked'}
                        </StatusBadge>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{check.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard label="Language check" value={languageCheck.status === 'pass' ? 'Aligned' : languageCheck.status === 'warning' ? 'Mismatch' : 'Inconclusive'} hint={languageCheck.detail} />
              <MetricCard label="Browser timezone" value={browserInfo.timezone} />
              <MetricCard label="Navigator languages" value={languageList(browserInfo.languages)} />
              <MetricCard label="Reported languages" value={languageList(data?.userLanguages)} />
            </div>
          </div>
        </section>

        <section className="section bg-slate-50">
          <div className="shell max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="card p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  <h2 className="text-xl font-bold text-slate-950">Connection signals</h2>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <MetricCard label="Public IP" value={data?.ipString} mono />
                  <MetricCard label="IP type" value={data?.ipType} />
                  <MetricCard label="Proxy detected" value={asBooleanLabel(data?.isBehindProxy)} />
                  <MetricCard label="Proxy IP" value={data?.proxyIp} mono />
                  <MetricCard label="Crawler" value={asBooleanLabel(data?.isSpider)} />
                  <MetricCard label="Lookup source" value={data?.lookupSource === 'gps' ? 'Live GPS' : 'IP geolocation'} />
                </div>
              </div>

              <div className="card p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <LanguageIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  <h2 className="text-xl font-bold text-slate-950">Location &amp; WebRTC</h2>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <MetricCard label="IP country" value={data?.ipCountryCode || data?.countryCode} />
                  <MetricCard label="GPS country" value={hasGps ? data?.countryCode : 'Not shared'} />
                  <MetricCard label="IP city" value={data?.ipCity} />
                  <MetricCard label="GPS city" value={hasGps ? data?.city : 'Not shared'} />
                  <MetricCard label="WebRTC candidates" value={webRtc.result?.ips?.length ?? '—'} />
                  <MetricCard label="Leaked IPs" value={leakedIps.length ? leakedIps.join(', ') : 'None detected'} />
                </div>
                <p className="mt-4 text-xs leading-relaxed text-slate-500">
                  {webRtc.result?.note || 'ICE candidates are gathered with stun:stun.l.google.com:19302, then closed immediately.'}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <JsonViewer title="View raw diagnostic data" data={data?.raw} />
            </div>

            <div className="mt-8">
              <ToolCrossLinks heading="Pair this with another diagnostic" exclude="/free-tools/proxy-detector" />
            </div>

            <div className="mt-8">
              <RelatedResources context="/free-tools/proxy-detector" />
            </div>
          </div>
        </section>
      </main>

      <ToolHelpSection
        intro={{
          title: 'Read the proxy checker like a security professional',
          description: 'These guides explain each signal, what a warning really means, and the next safe step when something looks off.',
        }}
        results={RESULT_GUIDE}
        troubleshooting={TROUBLESHOOTING}
        faqs={FAQS}
      />

      <Footer />
    </>
  );
}
