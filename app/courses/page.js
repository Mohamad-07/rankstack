

import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Courses',
  description:
    'Build practical skills in technical SEO, hosting, DNS, image optimization, and developer tooling with RankStack courses.',
  path: '/courses',
  keywords: ['SEO courses', 'technical SEO training', 'developer courses', 'hosting course'],
});

// Dynamic imports for components
const CoursePolicy = dynamic(() => import('@/components/CoursePolicy'), { ssr: false });
const CoursesCard = dynamic(() => import('@/components/CoursesCard'), { ssr: false });
const CoursesDetails = dynamic(() => import('@/components/CoursesDetails'), { ssr: false });


export default function CoursesPage() {
    return (
        <>
            <div className="bg-gray-100 pt-10 pb-16">
                <Header />
                <CoursePolicy />
            </div>
            <CoursesCard />
            <CoursesDetails />
            <Footer />
        </>
    );
}
