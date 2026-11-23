'use client';
import { useEffect, useRef } from 'react';

export default function AdSlot({ src, minHeight = 90 }: { src: string; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    const s = document.createElement('script');
    s.src = src; // exact URL from the panel, never tampered with
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';
    host.appendChild(s);

    return () => {
      s.remove();
    };
  }, [src]);

  return <div ref={ref} className="ad-slot" style={{ minHeight, textAlign: 'center' }} />;
}
