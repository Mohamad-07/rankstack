'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { usePathname } from 'next/navigation';
import { ANCHOR_DESKTOP, ANCHOR_MOBILE, POP } from '@/lib/adzones';
import type { Zone } from '@/lib/adzones';

const GAP = 30;            // min seconds between rotations
const JITTER = 15;
const MAX_ADS = 25;        // per session, not per pageview
const FIRST = 3000;
const MAX_POP = 4;
const EMPTY_AFTER = 4000;  // treat as unfilled
const MAX_STRIKES = 3;     // consecutive empties before we show the nag

const sget = (k: string) => {
  try {
    return sessionStorage.getItem(k) ?? '';
  } catch {
    return '';
  }
};

const sset = (k: string, v: string) => {
  try {
    sessionStorage.setItem(k, v);
  } catch {
    // Private mode / in-app browsers can throw. The ad layer must not crash.
  }
};

const num = (k: string) => Number(sget(k) || 0) || 0;
const bump = (k: string) => sset(k, String(num(k) + 1));

const shuffle = <T,>(a: T[]) => {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
};

const mQ: Zone[] = [];
const dQ: Zone[] = [];
const take = (q: Zone[], src: Zone[]) => {
  if (!q.length) q.push(...shuffle(src));
  return q.shift()!;
};

const FILLED = 'iframe, ins, img, a, div:not(:empty)';

type CancelMount = () => void;

function mount(
  host: HTMLDivElement,
  src: string,
  onResult?: (filled: boolean) => void
): CancelMount {
  host.replaceChildren();

  const s = document.createElement('script');
  // Use the exact zone URL from the panel. No cache-busting: it forces a cold
  // fetch on every rotation and depresses fill.
  s.src = src;
  s.async = true;
  s.referrerPolicy = 'no-referrer-when-downgrade';
  host.appendChild(s);

  let active = true;
  const timer = setTimeout(() => {
    if (!active || !host.isConnected) return;
    onResult?.(Boolean(host.querySelector(FILLED)));
  }, EMPTY_AFTER);

  return () => {
    active = false;
    clearTimeout(timer);
  };
}

export function AnchorAd() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [closed, setClosed] = useState(false);
  const [nag, setNag] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const lastFire = useRef(0);
  const strikes = useRef(0);
  const cancelMount = useRef<CancelMount | null>(null);
  const path = usePathname();

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Reset on viewport or route change so stale results cannot leak into a new page.
  useEffect(() => {
    cancelMount.current?.();
    cancelMount.current = null;
    host.current?.replaceChildren();
    lastFire.current = 0;
    strikes.current = 0;
    setNag(false);
  }, [mobile, path]);

  useEffect(() => () => cancelMount.current?.(), []);

  const fire = useCallback(() => {
    if (closed || mobile === null || !host.current || document.hidden) return;
    if (num('n') >= MAX_ADS) return;
    if (Date.now() - lastFire.current < (GAP + Math.random() * JITTER) * 1000) return;

    const z = mobile ? take(mQ, ANCHOR_MOBILE) : take(dQ, ANCHOR_DESKTOP);
    lastFire.current = Date.now();

    cancelMount.current?.();
    cancelMount.current = mount(host.current, z.src, (filled) => {
      if (filled) {
        bump('n');
        strikes.current = 0;
        setNag(false);
      } else {
        strikes.current += 1;
        if (strikes.current >= MAX_STRIKES) setNag(true);
      }
    });
  }, [closed, mobile]);

  useEffect(() => {
    if (closed || mobile === null) return;

    let raf = 0;
    let visTimer: ReturnType<typeof setTimeout> | undefined;
    const t = setTimeout(fire, FIRST);
    const loop = setInterval(fire, 3000);

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        fire();
      });
    };
    const onVis = () => {
      if (!document.hidden) visTimer = setTimeout(fire, 1200);
    };

    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(t);
      clearInterval(loop);
      clearTimeout(visTimer);
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('scroll', onScroll);
    };
  }, [fire, closed, mobile, path]);

  if (closed || mobile === null) return null;

  const box: CSSProperties = mobile
    ? {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: '#fff',
        borderTop: '1px solid #ddd',
        textAlign: 'center',
      }
    : {
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 40,
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: 8,
        overflow: 'hidden',
      };

  return (
    <div style={box}>
      <button
        onClick={() => setClosed(true)}
        aria-label="Close ad"
        style={{
          position: 'absolute',
          right: 4,
          top: 0,
          zIndex: 2,
          border: 0,
          background: 'none',
          fontSize: 18,
          cursor: 'pointer',
          lineHeight: 1,
        }}
      >
        ×
      </button>
      <div
        ref={host}
        style={{
          width: mobile ? 320 : 300,
          height: mobile ? 100 : 250,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      />
      {nag && (
        <div style={{ fontSize: 11, padding: 4, background: '#f6f6f6', color: '#555' }}>
          Ads keep these tools free — turn off your ad blocker.
        </div>
      )}
    </div>
  );
}

export function InlineAd({ index = 0 }: { index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  const cancelMount = useRef<CancelMount | null>(null);

  useEffect(() => () => cancelMount.current?.(), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || done.current) return;
        done.current = true;
        const zones = ANCHOR_DESKTOP;
        cancelMount.current = mount(el, zones[(num('inl') + index) % zones.length].src);
        bump('inl');
        io.disconnect();
      },
      { threshold: 0.5 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  return <div ref={ref} style={{ width: 300, height: 250, margin: '28px auto', overflow: 'hidden' }} />;
}

// Module scope survives React StrictMode's dev-only mount/unmount/mount cycle.
// Without this, the same path injects two popunder handlers in development.
let lastPopPath = '';
let popScript: HTMLScriptElement | null = null;

export function PopAd() {
  const path = usePathname();

  useEffect(() => {
    if (!path || path === lastPopPath) return;
    lastPopPath = path;

    if (num('pop') >= MAX_POP) return;
    if (Date.now() - num('popAt') < 45000) return;

    popScript?.remove();

    const s = document.createElement('script');
    s.src = POP.src; // popunder: never cache-bust the exact zone URL
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';
    document.body.appendChild(s);
    popScript = s;

    bump('pop');
    sset('popAt', String(Date.now()));
  }, [path]);

  return null;
}

export default function AdLayer() {
  return (
    <>
      <AnchorAd />
      <PopAd />
    </>
  );
}
