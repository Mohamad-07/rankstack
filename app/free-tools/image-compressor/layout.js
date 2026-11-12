import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Free AI Image Compressor",
  description:
    "Compress JPG, PNG, and WebP images instantly. Reduce image file size by up to 80% without visible quality loss using RankStack's free image compressor.",
  path: "/free-tools/image-compressor",
  keywords: [
    "image compressor",
    "AI image compressor",
    "compress images",
    "reduce image size",
    "SEO image optimization",
  ],
  image:
    "https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif",
  imageAlt: "RankStack free AI image compressor",
});

export default function ImageCompressorLayout({ children }) {
  return children;
}
