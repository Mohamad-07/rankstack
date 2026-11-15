import Image from "next/image";
import Link from "next/link";
import aboutImg from "@/public/about (1).jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Teams from "@/components/Teams";
import PageHero from "@/components/PageHero";
import { Mail, MapPin, Phone } from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About RankStack",
  description:
    "Learn how RankStack helps developers and site owners with AI-powered utilities, network diagnostics, hosting research, and technical SEO.",
  path: "/about",
  keywords: ["about RankStack", "developer tools team", "technical SEO experts"],
});

const contactCards = [
  {
    icon: MapPin,
    title: "Our office",
    value: "Asian Business Center, First Floor, Bahria Town Phase 7, Rawalpindi",
    href: null,
  },
  {
    icon: Mail,
    title: "Email us",
    value: "support@rankstack.dev",
    href: "mailto:support@rankstack.dev",
  },
  {
    icon: Phone,
    title: "Call us",
    value: "+44 7360 506217",
    href: "tel:+447360506217",
  },
];

const About = () => {
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
              { "@type": "ListItem", position: 2, name: "About", item: "https://rankstack.dev/about" },
            ],
          }),
        }}
      />

      <Header />

      <main>
        <PageHero
          eyebrow="About RankStack"
          title="Clear answers for the technical side of the web"
          description="RankStack began with a simple goal: make sense of inconsistent hosting, DNS, and technical SEO advice by testing what actually works."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "About" },
          ]}
        />

        <section className="section bg-white">
          <div className="shell">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-soft">
                <Image
                  src={aboutImg}
                  alt="The RankStack team"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div>
                <span className="eyebrow">Our story</span>
                <h2 className="section-title mt-4">
                  Practical tools, honest research, and no hype
                </h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
                  <p>
                    Muhammad Luqman Pervez and Mohammad Shehzad started RankStack
                    to give developers and site owners a clearer way to evaluate
                    hosting, network configuration, and technical SEO.
                  </p>
                  <p>
                    Today, RankStack brings network diagnostics, asset
                    optimization, hosting research, and technical SEO into one
                    practical toolkit. Whether you are optimizing a WordPress
                    site, launching a store, or auditing infrastructure, our
                    tools and guides help you make faster, evidence-based
                    decisions.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/free-tools" className="btn-primary">
                    Explore free tools
                  </Link>
                  <Link href="/contact" className="btn-secondary">
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-slate-50" id="reach">
          <div className="shell">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Get in touch</span>
              <h2 className="section-title mt-4">How to reach us</h2>
              <p className="section-copy mt-4">
                We reply to every genuine question about tools, hosting, and
                technical SEO.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="card p-6 text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-slate-950">
                      {card.title}
                    </h3>
                    {card.href ? (
                      <a
                        href={card.href}
                        className="mt-2 inline-block text-sm leading-relaxed text-slate-600 transition hover:text-indigo-600"
                      >
                        {card.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {card.value}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Teams />
      </main>

      <Footer />
    </>
  );
};

export default About;
