import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Tech from "@/components/Tech";
import Teams from "@/components/Teams";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Explore RankStack services for web development, technical SEO audits, programmable SEO, hosting optimization, and digital growth.",
  path: "/services",
  keywords: [
    "technical SEO audit",
    "programmable SEO",
    "web development",
    "SEO services",
  ],
});

const ServicesPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://rankstack.dev" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://rankstack.dev/services" },
            ],
          }),
        }}
      />

      <Header />
      <main>
        <PageHero
          eyebrow="Services"
          title="Technical fixes that support long-term growth"
          description="From technical SEO audits to hosting and performance work, we focus on the issues that actually affect visibility, speed, and revenue."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Services" },
          ]}
        />
        <Services />
        <Tech />
        <Teams />
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;
