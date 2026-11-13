import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "WHOIS Domain Lookup | Registration, Registrar & DNS Status",
  description:
    "Look up public domain registration data from authoritative RDAP registries. Check registrar, registration and expiry dates, domain status, nameservers, and DNSSEC.",
  path: "/free-tools/whois-lookup",
  keywords: [
    "WHOIS lookup",
    "domain lookup",
    "domain registration lookup",
    "RDAP lookup",
    "domain registrar lookup",
    "domain expiry checker",
  ],
  image: "https://rankstack.dev/rankstack-logo.png",
  imageAlt: "RankStack domain WHOIS lookup tool",
});

export default function WhoisLookupLayout({ children }) {
  return children;
}