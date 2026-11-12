// components/Header.js
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import logo from '@/public/rankstack-logo.png'


const MobileMenu = dynamic(() => import('./MobileMenu'), {
  ssr: false,
});


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (id) => {
    toggleMenu();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };


  return (
    <>
      <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-slate-200/70 bg-white/85 px-6 py-3 backdrop-blur-xl">
        {/* Logo */}
          <Link href="/">
            <Image
              src={logo}
              alt="RankStack logo"
              className="h-10 w-auto"
              width={250}
              height={48}
              priority
            />
          </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-grow justify-center items-center" aria-label="Main navigation">
          <div className="rounded-full border-2 border-gradient mt-1 p-1 px-7">
            <ul className="flex space-x-5 text-lg">
              <li>
                <Link href="/" className="hover:text-blue-500 ">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/hosting" className="hover:text-blue-500 ">
                  Web Hosting
                </Link>
              </li>
              <li>
                <Link href="/domain" className="hover:text-blue-500 ">
                  Domains
                </Link>
              </li>
              <li>
                <Link href="/free-tools" className="hover:text-blue-500">
                  Free Tools
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-blue-500">
                  Blogs
              </Link>
              </li>

              {/* <li>
                <Link href="#services" className="hover:text-blue-500 ">
                  Services
                </Link>
              </li> */}

              {/* <li>
                <Link href="#blogs" className="hover:text-blue-500 ">
                  Blogs
                </Link>
              </li> */}

            </ul>
          </div>
        </nav>

        {/* Let's Connect Button for Desktop */}
        <div className="hidden lg:block">
          <Link href="/contact" className="px-6 py-2 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-slate-950 font-semibold rounded-full hover:shadow-lg transition">
            Let&apos;s Connect
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <div
              className="w-6 h-0.5 bg-gray-800 mb-1"
            ></div>
            <div
              className="w-6 h-0.5 bg-gray-800 mb-1"
            ></div>
            <div
              className="w-6 h-0.5 bg-gray-800"
            ></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} handleLinkClick={handleLinkClick} />
        )}
      </header>


    </>
  );
};

export default Header;
