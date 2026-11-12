import Image from 'next/image';
import aboutImg from '@/public/about (1).jpg';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Teams from '@/components/Teams';
import { FaMapMarkerAlt, FaEnvelopeOpen, FaPhoneAlt } from 'react-icons/fa';
import AosAnimation from '@/components/AosAnimation';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'About RankStack',
  description:
    'Learn how RankStack helps developers and site owners with AI-powered utilities, network diagnostics, hosting research, and technical SEO.',
  path: '/about',
  keywords: ['about RankStack', 'developer tools team', 'technical SEO experts'],
});

const About = () => {
    return (
        <>
            <div className="pt-10">
                <Header />
            </div>
            <AosAnimation>
                <div className="container px-5 lg:px-20 mx-auto pt-10 lg:pt-20">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="w-full lg:w-1/2 relative">
                            <Image className="mb-4 lg:mb-0" src={aboutImg} alt="About Us" data-aos="fade-up" />
                        </div>
                        <div className="w-full lg:w-1/2 lg:pl-10" data-aos="fade-left">
                            <h1 className="text-3xl sm:text-4xl font-bold uppercase mb-4">AI-powered tools for developers and site owners</h1>
                            <h5 className="text-lg uppercase text-primary mb-3 bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text text-transparent">
                                RankStack began in 2017 with a simple goal: make sense of inconsistent marketing, hosting, and technical SEO advice. Muhammad Luqman Pervez and Mohammad Shehzad wanted a clearer way to test what actually works.
                            </h5>
                            <p className="mb-4">
                                Today, RankStack brings network diagnostics, asset optimization, hosting research, and technical SEO into one practical toolkit. Whether you are optimizing a WordPress site, launching an online store, or auditing infrastructure, our tools and guides help you make faster, evidence-based decisions.
                            </p>
                            <a href="#reach" className="inline-block rounded bg-gradient-to-r from-purple-400 to-blue-500 text-white uppercase py-3 px-5">Contact Us</a>
                        </div>
                    </div>
                </div>
            </AosAnimation>
            <Teams />

            {/* About text */}
            <AosAnimation>
            <div className="container px-5 lg:px-20 mx-auto mb-14" id="reach">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-center bg-gray-100 rounded-lg p-5 h-40" data-aos="fade-left">
                        <FaMapMarkerAlt className="text-indigo-400 text-5xl mr-3" />
                        <div className="flex flex-col">
                            <h5 className="text-lg font-semibold uppercase">Our Office</h5>
                            <p className="m-0"></p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center bg-gray-100 rounded-lg p-5 h-40" data-aos="fade-down">
                        <FaEnvelopeOpen className="text-indigo-400 text-5xl mr-3" />
                        <div className="flex flex-col">
                            <h5 className="text-lg font-semibold uppercase">Email Us</h5>
                            <p className="m-0">support@rankstack.dev</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center bg-gray-100 rounded-lg p-5 h-40" data-aos="fade-right">
                        <FaPhoneAlt className="text-indigo-400 text-5xl mr-3" />
                        <div className="flex flex-col">
                            <h5 className="text-lg font-semibold uppercase">Call Us</h5>
                            <p className="m-0"></p>
                        </div>
                    </div>
                </div>
            </div>
            </AosAnimation>

            <Footer />
        </>
    );
}

export default About;
