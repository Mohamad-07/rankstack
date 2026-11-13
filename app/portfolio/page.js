import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import PortfolioFilter from "@/components/PortfolioFilter";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Portfolio",
  description:
    "Explore RankStack projects spanning web development, technical SEO, performance optimization, and developer tooling.",
  path: "/portfolio",
  keywords: ["RankStack portfolio", "web development projects", "SEO case studies"],
});

const Portfolio = () => {
  return (
    <>
      <Header />

      <main>
        <PageHero
          eyebrow="Selected work"
          title="Websites and stores built to perform"
          description="A selection of WordPress, Shopify, and custom development projects delivered for businesses across different industries."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Portfolio" },
          ]}
        />

        <section className="section bg-white">
          <div className="shell">
            <PortfolioFilter />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Portfolio;
