import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import React from 'react';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Disclaimer',
  description:
    'Read the RankStack disclaimer about tool results, hosting recommendations, SEO guidance, and third-party links.',
  path: '/disclaimer',
  keywords: ['RankStack disclaimer', 'tool disclaimer', 'SEO disclaimer'],
});

const Disclaimer = () => {
    return (
        <div className=" min-h-screen">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://rankstack.dev" },
                    { "@type": "ListItem", position: 2, name: "Disclaimer", item: "https://rankstack.dev/disclaimer" },
                  ],
                }),
              }}
            />

            <Header />

      <main>
        <PageHero
          eyebrow="Legal"
          title="Disclaimer"
          description="Important limits on tool results, hosting recommendations, SEO guidance, and third-party links."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Disclaimer" },
          ]}
        />

        <section className="section bg-white">
          <div className="shell max-w-3xl prose-site">

                <p >
                    At <strong>RankStack</strong>, we are committed to providing high-quality web development, SEO, and digital marketing services designed to enhance your online presence and drive growth. While we strive to deliver optimal results, we acknowledge that individual experiences and outcomes may vary based on numerous factors, including but not limited to:
                </p>

                <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Unique business goals and strategies.</li>
                    <li>Market conditions and competition.</li>
                    <li>Implementation of our recommendations.</li>
                    <li>Client involvement and resources allocated to the projects.</li>
                </ul>

                <p >
                    Therefore, while we make every effort to ensure the accuracy of the information provided and the effectiveness of our services, <strong>RankStack</strong> cannot guarantee specific results. We encourage our clients to engage in thorough research and due diligence prior to making decisions based on the information and recommendations we provide.
                </p>

                <hr className="my-4 border-gray-300" />

                <h3 >
                    Limitation of Liability
                </h3>
                <p >
                    RankStack shall not be liable for any direct, indirect, incidental, or consequential damages that may arise from the use of our services, or reliance on the information provided on our website or through our communications. By utilizing our services, you acknowledge that you have read, understood, and agree to this disclaimer.
                </p>

                <h3 >
                    Contact Us
                </h3>
                <p >
                    If you have any questions or concerns regarding our services or this disclaimer, please feel free to contact us for further clarification.
                </p>
          </div>
        </section>
      </main>

      <Footer />
        </div>
    );
}

export default Disclaimer;
