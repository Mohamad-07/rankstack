import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Proxy Checker & VPN Leak Test | Location Mismatch Detector",
  description:
    "Run a free proxy checker and VPN leak test. Check WebRTC leaks, timezone mismatch, IP-versus-GPS location, and anonymity signals in your browser.",
  path: "/free-tools/proxy-detector",
  keywords: [
    "proxy checker",
    "vpn leak test",
    "webrtc leak test",
    "ip leak test",
    "check if using vpn or proxy",
    "timezone mismatch check",
    "ip fraud and anonymity check",
  ],
  image:
    "https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif",
  imageAlt: "RankStack proxy and location mismatch detector",
});

export default function ProxyDetectorLayout({ children }) {
  return children;
}
