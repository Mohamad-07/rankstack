import dynamic from 'next/dynamic';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'AI-Powered Developer Utilities & Technical SEO',
  description:
    'RankStack brings free web tools, network diagnostics, hosting reviews, and programmable SEO resources together for developers and site owners.',
  path: '/',
  keywords: [
    'developer utilities',
    'network diagnostics',
    'technical SEO',
    'programmable SEO',
    'web hosting reviews',
  ],
});

// Critical components for initial load
import Header from '../components/Header';
import Hero from '@/components/Hero';
import Tutorials from '@/components/Tutorials'; 
import FeaturedBlogs from '@/components/FeaturedBlogs';

// Dynamically imported components (disable SSR for client-heavy ones)
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const Services = dynamic(() => import('@/components/Services'), { ssr: false });
const Tech = dynamic(() => import('@/components/Tech'), { ssr: false });
const Teams = dynamic(() => import('@/components/Teams'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false });
const Blogs = dynamic(() => import('@/components/Blogs'), { ssr: false });
const ContactUs = dynamic(() => import('@/components/ContactUs'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Facebook = dynamic(() => import('@/components/Facebook'), { ssr: false });
const InstagramEmbed = dynamic(() => import('@/components/InstagramEmbed'), { ssr: false });

export default function Home() {
  return (
    <>
      <div className="bg-slate-950">
        <Header />
        <Hero />
      </div>
      <FeaturedBlogs />
      {/* Put Categories before Blogs for better UX */}
      <Blogs />
      <Tutorials />
      <Services />
      <Tech />
      <Testimonials />
      <ContactUs />
      <Footer />
    </>
  );
}
