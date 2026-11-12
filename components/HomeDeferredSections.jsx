'use client';

import dynamic from 'next/dynamic';

const Blogs = dynamic(() => import('@/components/Blogs'), { ssr: false });
const Services = dynamic(() => import('@/components/Services'), { ssr: false });
const Tech = dynamic(() => import('@/components/Tech'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false });
const ContactUs = dynamic(() => import('@/components/ContactUs'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function HomeDeferredSections({ children }) {
  return (
    <>
      <Blogs />
      {children}
      <Services />
      <Tech />
      <Testimonials />
      <ContactUs />
      <Footer />
    </>
  );
}