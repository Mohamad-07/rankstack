'use client';

import dynamic from 'next/dynamic';

const Services = dynamic(() => import('@/components/Services'), { ssr: false });
const Tech = dynamic(() => import('@/components/Tech'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false });
const ContactUs = dynamic(() => import('@/components/ContactUs'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function HomeDeferredSections({ children }) {
  return (
    <>
      {children}
      <Services />
      <Tech />
      <Testimonials />
      <ContactUs />
      <Footer />
    </>
  );
}