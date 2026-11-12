import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "What Is My IP Address? - Free IP Checker",
  description:
    "Check your public IP address instantly with RankStack's free IP checker. See your IPv4 and IPv6 address, network, and connection details — no setup required.",
  path: "/free-tools/ipchecker",
  keywords: [
    "what is my ip",
    "my public IP address",
    "IP address checker",
    "IPv4 checker",
    "IPv6 checker",
  ],
  image:
    "https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif",
  imageAlt: "RankStack free IP checker tool",
});

export default function IpCheckerLayout({ children }) {
  return children;
}
