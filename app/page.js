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
import HomeDeferredSections from '@/components/HomeDeferredSections';

export default function Home() {
  return (
    <>
      <div className="bg-slate-950">
        <Header />
        <Hero />
      </div>
      <FeaturedBlogs />
      <HomeDeferredSections>
        <Tutorials />
      </HomeDeferredSections>
    </>
  );
}
