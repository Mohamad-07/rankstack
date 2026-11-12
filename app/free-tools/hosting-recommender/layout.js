import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI Hosting Recommender",
  description:
    "Take the free RankStack AI Hosting Recommender quiz to find the best web hosting for your budget, traffic, and technical needs.",
  path: "/free-tools/hosting-recommender",
  keywords: [
    "AI hosting recommender",
    "hosting quiz",
    "best web hosting tool",
    "hosting comparison",
    "web hosting selector",
  ],
  image:
    "https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif",
  imageAlt: "RankStack AI hosting recommender quiz",
});

export default function HostingRecommenderLayout({ children }) {
  return children;
}
