'use client';

import { ToolFaq } from '@/components/ToolContent';

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

export default function Ipcheckerfaq() {
  return <ToolFaq items={FAQS} />;
}
