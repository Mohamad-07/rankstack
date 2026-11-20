'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fingerprint, Globe2, ScanEye, ShieldAlert } from 'lucide-react';
import { NETWORK_TOOLS } from '@/lib/network-tools';

const ICONS = {
  '/free-tools/ipchecker': Globe2,
  '/free-tools/proxy-detector': ShieldAlert,
  '/free-tools/privacy-audit': ScanEye,
  '/free-tools/user-agent-inspector': Fingerprint,
};

const isActivePath = (pathname, href) => pathname === href || pathname.startsWith(`${href}/`);

const NetworkToolsNav = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Network diagnostic tools" className="border-b border-slate-200 bg-white">
      <div className="shell flex flex-wrap items-center gap-2 py-3">
        <span className="mr-1 hidden text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 sm:inline">
          Network tools
        </span>
        {NETWORK_TOOLS.map((tool) => {
          const Icon = ICONS[tool.href] || Globe2;
          const active = isActivePath(pathname, tool.href);
          return (
            <Link
              key={tool.href}
              href={tool.href}
              aria-current={active ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 text-slate-600 hover:border-indigo-200 hover:text-indigo-700'
              }`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {tool.shortLabel}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NetworkToolsNav;
