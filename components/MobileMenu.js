"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import logo from "@/public/rankstack-logo.png";

const MobileMenu = ({ navLinks = [], secondaryLinks = [], onClose }) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div id="mobile-navigation" className="fixed inset-0 z-[60] lg:hidden">
      <motion.button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 h-full w-full cursor-default bg-slate-950/50 backdrop-blur-sm"
      />

      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl"
        aria-label="Mobile navigation"
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Link href="/" onClick={onClose} aria-label="RankStack home">
            <Image
              src={logo}
              alt="RankStack"
              className="h-8 w-auto"
              width={640}
              height={109}
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <p className="px-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Explore
          </p>
          <nav className="mt-3" aria-label="Mobile primary navigation">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-slate-800 transition hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="my-5 h-px bg-slate-100" />

          <p className="px-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Company
          </p>
          <nav className="mt-3" aria-label="Mobile secondary navigation">
            <ul className="space-y-1">
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-slate-800 transition hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-slate-100 p-5">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Let&apos;s Connect
          </Link>
          <p className="mt-3 text-center text-xs text-slate-500">
            support@rankstack.dev
          </p>
        </div>
      </motion.aside>
    </div>
  );
};

export default MobileMenu;
