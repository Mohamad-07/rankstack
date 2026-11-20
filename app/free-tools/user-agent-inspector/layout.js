import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "What Is My User Agent? Free User Agent Checker",
  description:
    "Find out what is my user agent with RankStack's free user agent checker. Decode browser and OS details, check your user agent string, and detect mobile or bot clients.",
  path: "/free-tools/user-agent-inspector",
  keywords: [
    "what is my user agent",
    "user agent checker",
    "what is my browser",
    "browser and os detector",
    "check user agent string",
    "mobile and bot user agent check",
  ],
  image:
    "https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif",
  imageAlt: "RankStack browser and user-agent inspector",
});

export default function UserAgentInspectorLayout({ children }) {
  return children;
}
