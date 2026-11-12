import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "DNS Propagation Checker",
  description:
    "Check DNS propagation across Google, Cloudflare, Quad9, OpenDNS, and other global resolvers with RankStack's free DNS propagation checker.",
  path: "/free-tools/dns-propagation",
  keywords: [
    "DNS propagation checker",
    "DNS checker",
    "DNS propagation",
    "DNS records",
    "domain diagnostics",
  ],
  image:
    "https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif",
  imageAlt: "RankStack DNS propagation checker",
});

export default function DnsPropagationLayout({ children }) {
  return children;
}
