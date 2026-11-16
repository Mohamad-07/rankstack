'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { usePathname } from 'next/navigation';
import { ANCHOR_DESKTOP, ANCHOR_MOBILE, POP } from '@/lib/adzones';
import type { Zone } from '@/lib/adzones';

const GAP = 35;          // seconds minimum between ads
const JITTER = 20;       // random extra so the timing looks human
const MAX_ADS = 10;      // hard cap per visit
const FIRST = 4500;      // wait for content to paint before the first ad
const MAX_POP = 6;

let lastFire = 0;
const mQ: Zone[] = [];
const dQ: Zone[] = [];

const num = (k: string) => Number(sessionStorage.getItem('ad_' + k) || 0);
const bump = (k: string) => sessionStorage.setItem('ad_' + k, String(num(k) + 1));

const shuffle = <T,>(a: T[]) => {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
};

const take = (q: Zone[], src: Zone[]) => {
  if (!q.length) q.push(...shuffle(src));
  return q.shift()!;
};

function mount(host: HTMLDivElement, src: string, onBlocked?: () => void) {
  host.replaceChildren();
  const s = document.createElement('script');
  s.src = `${src}?cb=${Date.now()}`;
  s.async = true;
  s.referrerPolicy = 'no-referrer-when-downgrade';
  host.appendChild(s);
  if (onBlocked) {
    setTimeout(() => {
      if (!host.querySelector('iframe, ins, img, a, div:not(:empty)')) onBlocked();
    }, 4000);
  }
}

export function AnchorAd() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [closed, setClosed] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const path = usePathname();

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => { host.current?.replaceChildren(); }, [mobile]);

  const fire = useCallback(() => {
    if (closed || mobile === null || !host.current || document.hidden) return;
    if (num('n') >= MAX_ADS) return;
    if (Date.now() - lastFire < (GAP + Math.random() * JITTER) * 1000) return;
    const z = mobile ? take(mQ, ANCHOR_MOBILE) : take(dQ, ANCHOR_DESKTOP);
    mount(host.current, z.src, () => setBlocked(true));
    lastFire = Date.now();
    bump('n');
  }, [closed, mobile]);

  useEffect(() => {
    if (closed || mobile === null) return;
    const t = setTimeout(fire, FIRST);
    const loop = setInterval(fire, 3000);
    const vis = () => { if (!document.hidden) setTimeout(fire, 1500); };
    document.addEventListener('visibilitychange', vis);
    window.addEventListener('scroll', fire, { passive: true });
    return () => {
      clearTimeout(t); clearInterval(loop);
      document.removeEventListener('visibilitychange', vis);
      window.removeEventListener('scroll', fire);
    };
  }, [fire, closed, mobile, path]);

  if (closed || mobile === null) return null;

  const box: CSSProperties = mobile
    ? { position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, background: '#fff',
        borderTop: '1px solid #ddd', textAlign: 'center' }
    : { position: 'fixed', bottom: 16, right: 16, zIndex: 40, background: '#fff',
        border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' };

  return (
    <div style={box}>
      <button onClick={() => setClosed(true)} aria-label="Close ad"
        style={{ position: 'absolute', right: 4, top: 0, zIndex: 2, border: 0,
                 background: 'none', fontSize: 18, cursor: 'pointer', lineHeight: 1 }}>×</button>
      <div ref={host} style={{ width: mobile ? 320 : 300, height: mobile ? 100 : 250,
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }} />
      {blocked && (
        <div style={{ fontSize: 11, padding: 4, background: '#f6f6f6', color: '#555' }}>
          Ads keep these tools free — turn off your ad blocker.
        </div>
      )}
    </div>
  );
}

export function InlineAd() {
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      const i = num('inl') % ANCHOR_DESKTOP.length;
      bump('inl');
      mount(el, ANCHOR_DESKTOP[i].src);
      io.disconnect();
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} style={{ width: 300, height: 250, margin: '28px auto', overflow: 'hidden' }} />;
}

export function PopAd() {
  const path = usePathname();
  useEffect(() => {
    if (num('pop') >= MAX_POP) return;
    if (Date.now() - Number(sessionStorage.getItem('ad_popAt') || 0) < 45000) return;
    const s = document.createElement('script');
    s.src = `${POP.src}?cb=${Date.now()}`;
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';
    document.body.appendChild(s);
    bump('pop');
    sessionStorage.setItem('ad_popAt', String(Date.now()));
  }, [path]);
  return null;
}

export default function AdLayer() {
  return <><AnchorAd /><PopAd /></>;
}