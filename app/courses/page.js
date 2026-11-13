import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseDeferredSections from "@/components/CourseDeferredSections";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Courses",
  description:
    "Build practical skills in technical SEO, hosting, DNS, image optimization, and developer tooling with RankStack courses.",
  path: "/courses",
  keywords: [
    "SEO courses",
    "technical SEO training",
    "developer courses",
    "hosting course",
  ],
});

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className="bg-slate-50">
        <CourseDeferredSections />
      </main>
      <Footer />
    </>
  );
}
