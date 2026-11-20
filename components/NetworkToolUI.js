'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ClipboardIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline';
import { NETWORK_TOOLS } from '@/lib/network-tools';

const STATUS_STYLES = {
  pass: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-700 ring-amber-200',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-200',
};

const ERROR_LABELS = {
  ipAddress: 'IP address',
  connectionProfile: 'Connection profile',
  location: 'Location lookup',
};

export function formatDiagnosticErrors(errors = {}) {
  return Object.entries(errors)
    .map(([key, value]) => `${ERROR_LABELS[key] || 'Lookup'} — ${value}`)
    .join('; ');
}

export function StatusBadge({ status = 'neutral', children }) {
  const Icon =
    status === 'pass' ? CheckCircleIcon : status === 'warning' ? ExclamationTriangleIcon : MinusCircleIcon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${
        STATUS_STYLES[status] || STATUS_STYLES.neutral
      }`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}

export function MetricCard({ label, value, mono = false, hint }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className={`mt-2 break-words text-sm font-semibold text-slate-900 ${mono ? 'font-mono' : ''}`}>
        {value === null || value === undefined || value === '' ? 'Not available' : value}
      </div>
      {hint ? <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{hint}</p> : null}
    </div>
  );
}

export function ScanControls({
  onRescan,
  loading,
  onGps,
  gpsLoading,
  hasGps,
  gpsLabel = 'Refine with Live GPS',
  note,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={onRescan} disabled={loading} className="btn-primary">
        <ArrowPathIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
        {loading ? 'Scanning…' : 'Re-scan'}
      </button>
      {onGps ? (
        <button
          type="button"
          onClick={onGps}
          disabled={gpsLoading || loading}
          className="btn-secondary"
        >
          <MapPinIcon className={`h-4 w-4 ${gpsLoading ? 'animate-pulse' : ''}`} aria-hidden="true" />
          {gpsLoading ? 'Waiting for permission…' : hasGps ? 'Refresh Live GPS' : gpsLabel}
        </button>
      ) : null}
      {note ? <span className="text-xs text-slate-500">{note}</span> : null}
    </div>
  );
}

export function ErrorNotice({ error, title = 'We could not complete that lookup' }) {
  if (!error) return null;
  return (
    <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 leading-relaxed">{error}</p>
    </div>
  );
}

export function JsonViewer({ title = 'View raw data', data }) {
  if (!data) return null;
  return (
    <details className="card overflow-hidden">
      <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-slate-900">
        {title}
      </summary>
      <pre className="max-h-96 overflow-auto border-t border-slate-200 bg-slate-950 p-5 text-xs leading-relaxed text-emerald-200">
        {JSON.stringify(data, null, 2)}
      </pre>
    </details>
  );
}

export function CopyButton({ value, label = 'Copy', copiedLabel = 'Copied!' }) {
  const [status, setStatus] = useState(label);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setStatus(copiedLabel);
    } catch {
      setStatus('Copy failed');
    }
    setTimeout(() => setStatus(label), 2000);
  };

  return (
    <button type="button" onClick={handleCopy} disabled={!value} className="btn-secondary">
      <ClipboardIcon className="h-4 w-4" aria-hidden="true" />
      {status}
    </button>
  );
}

export function ToolCrossLinks({ heading = 'Continue your diagnostics', exclude }) {
  const tools = NETWORK_TOOLS.filter((tool) => tool.href !== exclude);
  return (
    <section className="card p-6 sm:p-8" aria-label="Related network tools">
      <h2 className="text-xl font-bold text-slate-950">{heading}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40"
          >
            <div className="text-sm font-semibold text-slate-950 group-hover:text-indigo-700">
              {tool.label}
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
