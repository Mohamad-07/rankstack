import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Domain Age Checker | Check Domain Registration Date",
  description:
    "Find how old a domain is from its authoritative registry creation date. Get its registration date, exact age, next anniversary, registrar, and RDAP source.",
  path: "/free-tools/domain-age-checker",
  keywords: [
    "domain age checker",
    "check domain age",
    "domain registration date",
    "domain creation date lookup",
    "how old is a domain",
  ],
  image: "https://rankstack.dev/logo.png",
  imageAlt: "RankStack domain age checker",
});

export default function DomainAgeCheckerLayout({ children }) {
  return children;
}