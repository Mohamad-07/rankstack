import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import React from 'react';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Privacy Policy',
  description:
    'Read the RankStack privacy policy to understand how we handle data for our developer utilities, network diagnostics, and SEO tools.',
  path: '/privacy',
  keywords: ['RankStack privacy policy', 'data privacy', 'tool privacy'],
});

const Privacy = () => {
    return (
        <div className="min-h-screen">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://rankstack.dev" },
                    { "@type": "ListItem", position: 2, name: "Privacy", item: "https://rankstack.dev/privacy" },
                  ],
                }),
              }}
            />

            <Header />

      <main>
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          description="How RankStack handles information when you use our website, tools, and contact channels."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Privacy" },
          ]}
        />

        <section className="section bg-white">
          <div className="shell max-w-3xl prose-site">

                <p >
                    At <strong>RankStack</strong>, we are committed to providing high-quality web development, SEO, and digital marketing services designed to enhance your online presence and drive growth.
                </p>

                <p >
                    If you have additional questions or require more information about our privacy policy, do not hesitate to contact us.
                </p>

                <p >
                    This privacy policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collected in RankStack. This policy is not applicable to any information collected offline or via channels other than this website.
                </p>

                <hr className="my-4 border-gray-300" />

                <h3 >
                    Information we collect.
                </h3>
                <p >
                    The personal information that you are asked to provide and the reasons why you are asked to provide it will be made clear to you at the point at which we ask you to provide your personal information.
                </p>
                <p >
                    If you contact us directly, we may receive additional information about you, such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                </p>
                <p >
                    When you register for an account, we may ask for your contact information, including items such as your name, company name, address, email address, and telephone number.
                </p>

                <h3 >
                    How we use your information
                </h3>
                <p >
                    We use the information we collect in various ways, including to:
                </p>

                <ul>
                    <li>Provide, operate, and maintain our website.</li>
                    <li>Improve, personalise, and expand our website.</li>
                    <li>Understand and analyse how you use our website.</li>
                    <li>Develop new products, services, features, and functionality.</li>
                    <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                    <li>Send you emails.</li>
                    <li>Find and prevent fraud.</li>
                </ul>

                <h3 >
                    Log Files
                </h3>
                <p >
                    RankStack follows a standard procedure for using log files. These files log visitors visit to websites. All hosting companies do this and are a part of hosting services’ analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring and exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analysing trends, administering the site, tracking users movements on the website, and gathering demographic information.
                </p>

                <h3 >
                    Cookies and web beacons
                </h3>
                <p >
                    Like any other website, RankStack uses “cookies”. These cookies are used to store information, including visitors preferences and the pages on the website that the visitor accessed or visited. The information is used to optimise the users experience by customising our web page content based on visitors browser type and/or other information.
                </p>

                <h3 >
                    Our advertising partners
                </h3>
                <p >
                    Some of the advertisers on our site may use cookies and web beacons. Our advertising partners are listed below: Each of our advertising partners has their own privacy policy for their policies on user data. For easier access, we hyperlinked to their privacy policies below.
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-4">
                    <li>Google: <a href="https://policies.google.com/technologies/ads" className="text-blue-500">https://policies.google.com/technologies/ads</a></li>
                </ul>

                <h3 >
                    Third-party privacy policies
                </h3>
                <p >
                    RankStacks Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective privacy policies of these third-party ad servers for more detailed information. It may include their practises and instructions about how to opt out of certain options.
                </p>
                <p >
                    You can choose to disable cookies through your individual browser options. For more detailed information about cookie management with specific web browsers, it can be found at the browsers’ respective websites.
                </p>

                <h3 >
                    CCPA Privacy Rights
                </h3>
                <p >
                    Under the CCPA, among other rights, California consumers have the right to:
                </p>

                <ul>
                    <li>Request that a business that collects a consumer’s personal data disclose the categories and specific pieces of personal data that it has collected about consumers.</li>
                    <li>Request that a business delete any personal data about the consumer that it has collected.</li>
                    <li>Request that a business that sells a consumer’s personal data not sell the consumer’s personal data.</li>
                </ul>
                <p >
                    If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                </p>

                <h3 >
                    GDPR Data Protection Rights
                </h3>
                <p >
                    We would like to make sure you are fully aware of all your data protection rights. Every user is entitled to the following:
                </p>

                <ul>
                    <li><strong>The right to access:</strong> You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
                    <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                    <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data under certain conditions.</li>
                    <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data under certain conditions.</li>
                    <li><strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data under certain conditions.</li>
                    <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organisation or directly to you under certain conditions.</li>
                </ul>

                <p >
                    If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                </p>

                <p >
                    For more information, please refer to our full <a href="#" className="text-blue-500">Privacy Policy</a>.
                </p>
          </div>
        </section>
      </main>

      <Footer />
        </div>
    );
};

export default Privacy;
