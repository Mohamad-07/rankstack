import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import Card from "@/constant/Card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { createMetadata } from "@/lib/seo";
import img01 from "@/public/Untitled-design-1024x1024.webp";
import img02 from "@/public/Untitled-design-2-1024x1024.webp";
import img03 from "@/public/Untitled-design-1-1024x1024.webp";
import img04 from "@/public/hostinger.webp";

export const metadata = createMetadata({
  title: "Domain Registration Offers & Promo Codes",
  description:
    "Compare verified domain registration deals from Namecheap, Domain.com, Hostinger, and Name.com. Register your next domain for less with RankStack.",
  path: "/domain",
  keywords: [
    "domain registration",
    "domain promo codes",
    "Namecheap promo",
    "Domain.com coupon",
    "Hostinger domain offer",
  ],
  image:
    "https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/domain-registration-banner.webp",
  imageAlt: "Domain registration offers and promo codes",
});

const cardsData = [
  {
    image: img01,
    text: "Save big with the promo code below",
    buttonText: "Save15",
    link: "https://domain.mno8.net/Nker32",
    alt: "Domain.com promo code",
  },
  {
    image: img02,
    text: "Save big with the promo code below",
    buttonText: "Nameboy",
    link: "https://namecheap.pxf.io/EKoANe",
    alt: "Namecheap promo code",
  },
  {
    image: img03,
    text: "Save big with the promo code below",
    buttonText: "NEWCOM598",
    link: "https://name.sjv.io/LX5Q3Y",
    alt: "Name.com promo code",
  },
  {
    image: img04,
    text: "Save big with the promo code below",
    buttonText: "hostinger",
    link: "https://hostinger.sjv.io/rnV05j",
    alt: "Hostinger domain offer",
  },
];

const Domain = () => {
  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://rankstack.dev" },
            { "@type": "ListItem", position: 2, name: "Domain Partners", item: "https://rankstack.dev/domain" },
          ],
        })}
      </Script>

      <Script id="offers-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Domain Registration Offers 2026",
          itemListElement: cardsData.map((card, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: card.buttonText,
            url: card.link,
            description:
              "Domain registration offer and promo code available via RankStack partner links.",
          })),
        })}
      </Script>

      <Script id="organization-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "RankStack",
          url: "https://rankstack.dev",
          logo: "https://rankstack.dev/rankstack-logo.png",
          sameAs: [
            "https://www.linkedin.com/company/rankstack",
            "https://twitter.com/rankstack",
          ],
        })}
      </Script>

      <Header />

      <main role="main">
        <PageHero
          eyebrow="Domain deals"
          title="Best domain registration deals for 2026"
          description="Find your next domain at a better price. Compare exclusive offers and promo codes from Domain.com, Namecheap, Name.com, and Hostinger."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Domains" },
          ]}
        />

        <section className="section bg-white">
          <div className="shell">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cardsData.map((card) => (
                <article key={card.buttonText} className="card card-hover flex h-full flex-col p-5">
                  <Card link={card.link}>
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      loading="lazy"
                      className="object-contain p-2"
                    />
                  </Card>
                  <div className="mt-4 flex flex-1 flex-col text-center">
                    <strong className="text-sm font-semibold text-slate-900">
                      {card.text}
                    </strong>
                    <p className="mt-1 text-xs text-slate-500">
                      Use code{" "}
                      <span className="font-semibold text-slate-700">
                        {card.buttonText}
                      </span>
                    </p>
                    <Link
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="btn-primary mt-4 w-full"
                      aria-label={`Get promo code ${card.buttonText} for domain offers`}
                    >
                      Get deal
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-8 text-center text-xs leading-relaxed text-slate-500">
              Offers and prices are set by each provider and can change without
              notice. Always confirm the final price at checkout.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Domain;
