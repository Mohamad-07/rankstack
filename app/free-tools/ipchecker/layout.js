import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "What Is My IP? Free IP Address Lookup & IPv4/IPv6 Checker",
  description:
    "Check my public IP instantly with RankStack's free IP checker. See your IPv4 and IPv6 address, network details, and IP location finder results in one client-side scan.",
  path: "/free-tools/ipchecker",
  keywords: [
    "what is my ip",
    "my ip address",
    "ip address lookup",
    "ipv4 and ipv6 checker",
    "ip location finder",
    "check my public ip",
  ],
  image:
    "https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif",
  imageAlt: "RankStack free IP checker tool",
});

export default function IpCheckerLayout({ children }) {
  return children;
}
