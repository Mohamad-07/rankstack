"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Menu } from "lucide-react";
import logo from "@/public/rankstack-logo.png";

const MobileMenu = dynamic(() => import("./MobileMenu"), {
  ssr: false,
});

const navLinks = [
  { label: "Web Hosting", href: "/hosting" },
  { label: "Domains", href: "/domain" },
  { label: "Free Tools", href: "/free-tools" },
  { label: "Blogs", href: "/blogs" },
  { label: "Services", href: "/services" },
];

const secondaryLinks = [
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const isActivePath = (pathname, href) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-lg focus-visible:ring-offset-4"
            aria-label="RankStack home"
          >
            <Image
              src={logo}
              alt="RankStack"
              className="h-9 w-auto sm:h-10"
              width={640}
              height={109}
              priority
            />
          </Link>

          <nav className="hidden lg:flex lg:items-center" aria-label="Main navigation">
            <ul className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1">
              {navLinks.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition ${
                        active
                          ? "bg-white text-slate-950 shadow-sm"
                          : "text-slate-600 hover:bg-white/70 hover:text-slate-950"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 lg:inline-flex"
            >
              Let&apos;s Connect
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50 lg:hidden"
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <MobileMenu
          navLinks={navLinks}
          secondaryLinks={secondaryLinks}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
