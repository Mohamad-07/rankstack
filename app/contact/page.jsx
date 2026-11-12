import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactUs from '@/components/ContactUs';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Contact RankStack',
  description:
    'Contact RankStack for support with developer tools, DNS and IP diagnostics, image compression, technical SEO, and hosting questions.',
  path: '/contact',
  keywords: ['contact RankStack', 'RankStack support', 'technical SEO help'],
});

// This will be your dedicated contact Us page
const ContactPage = () => {  // ← Change this name
    return (
        <>
        {/* Header with homepage styling */}
        <div className="pt-10 ">
                <Header />  {/* ← ONLY ONE HEADER */}
            </div>



            <ContactUs />
            <Footer />
        </>
    );
};

export default ContactPage;  // ← And this export