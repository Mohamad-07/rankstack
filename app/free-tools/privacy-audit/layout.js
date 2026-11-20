import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Browser Privacy Test & Digital Footprint Checker",
  description:
    "Run a browser privacy test to see what your browser reveals. Check your digital footprint, IP and location exposure, and browser leak signals instantly.",
  path: "/free-tools/privacy-audit",
  keywords: [
    "browser privacy test",
    "digital footprint checker",
    "what does my browser reveal",
    "ip and location privacy check",
    "browser leak test",
  ],
  image:
    "https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif",
  imageAlt: "RankStack web footprint and privacy exposure audit",
});

export default function PrivacyAuditLayout({ children }) {
  return children;
}
