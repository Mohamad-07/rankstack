import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import Tech from '@/components/Tech';
import Teams from '@/components/Teams';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Services',
  description:
    'Explore RankStack services for web development, technical SEO audits, programmable SEO, hosting optimization, and digital growth.',
  path: '/services',
  keywords: ['technical SEO audit', 'programmable SEO', 'web development', 'SEO services'],
});

const ServicesPage = () => {
    return (
        <> 
            {/* Header with homepage styling */}
            <div className="pt-10 ">
                <Header />  {/* ← ONLY ONE HEADER */}
            </div>
            
            {/* Page content */}
            <Services />
            <Tech />
            <Teams />
            
            <Footer />
        </>
    );
};

export default ServicesPage;