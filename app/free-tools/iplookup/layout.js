import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Free IP Lookup Tool",
  description:
    "Look up any IP address for location, ISP, timezone, and network details. RankStack's IP lookup tool is fast, accurate, and private.",
  path: "/free-tools/iplookup",
  keywords: [
    "IP address lookup",
    "IP lookup tool",
    "IP geolocation lookup",
    "ISP lookup",
    "IP finder",
  ],
  image:
    "https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif",
  imageAlt: "RankStack free IP lookup tool",
});

export default function IpLookupLayout({ children }) {
  return children;
}
