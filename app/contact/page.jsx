import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactUs from "@/components/ContactUs";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact RankStack",
  description:
    "Contact RankStack for support with developer tools, DNS and IP diagnostics, image compression, technical SEO, and hosting questions.",
  path: "/contact",
  keywords: ["contact RankStack", "RankStack support", "technical SEO help"],
});

const ContactPage = () => {
  return (
    <>
      <Header />
      <main>
        <ContactUs />
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
