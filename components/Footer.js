import Image from "next/image";
import Link from "next/link";
import logo from "@/public/rankstack-logo.png";

const exploreLinks = [
  { label: "Web Hosting", href: "/hosting" },
  { label: "Domains", href: "/domain" },
  { label: "Blogs", href: "/blogs" },
  { label: "Courses", href: "/courses" },
  { label: "Portfolio", href: "/portfolio" },
];

const toolLinks = [
  { label: "All Free Tools", href: "/free-tools" },
  { label: "IP Checker", href: "/free-tools/ipchecker" },
  { label: "DNS Propagation", href: "/free-tools/dns-propagation" },
  { label: "WHOIS Lookup", href: "/free-tools/whois-lookup" },
  { label: "Image Compressor", href: "/free-tools/image-compressor" },
  { label: "Proxy Detector", href: "/free-tools/proxy-detector" },
  { label: "Privacy Audit", href: "/free-tools/privacy-audit" },
  { label: "User-Agent Inspector", href: "/free-tools/user-agent-inspector" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/rankstack",
    path: "M22.675 0H1.325C0.593 0 0 0.593 0 1.325v21.351C0 23.407 0.593 24 1.325 24h11.489V14.708h-3.13v-3.631h3.13V8.045c0-3.1 1.893-4.787 4.66-4.787 1.325 0 2.463 0.099 2.794 0.143v3.241l-1.918 0.001c-1.504 0-1.795 0.716-1.795 1.763v2.313h3.587l-0.467 3.631h-3.12V24h6.117C23.407 24 24 23.407 24 22.676V1.325C24 0.593 23.407 0 22.675 0z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/rankstack/",
    path: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.2 2.4.4.6.2 1.1.5 1.6 1 .5.5.8 1 1 1.6.2.5.4 1.2.4 2.4.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.9-.4 2.4-.2.6-.5 1.1-1 1.6-.5.5-1 .8-1.6 1-.5.2-1.2.4-2.4.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.2-2.4-.4-.6-.2-1.1-.5-1.6-1-.5-.5-.8-1-1-1.6-.2-.5-.4-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.9.4-2.4.2-.6.5-1.1 1-1.6.5-.5 1-.8 1.6-1 .5-.2 1.2-.4 2.4-.4C8.4 2.2 8.8 2.2 12 2.2M12 0.3c-3.3 0-3.7 0-4.9.1-1.2.1-2.1.2-2.8.4-.9.2-1.7.6-2.4 1.3-.7.7-1.1 1.5-1.3 2.4-.2.7-.3 1.6-.4 2.8C0.3 9.5 0.3 9.9 0.3 13.2s0 3.7.1 4.9c.1 1.2.2 2.1.4 2.8.2.9.6 1.7 1.3 2.4.7.7 1.5 1.1 2.4 1.3.7.2 1.6.3 2.8.4 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.2-.1 2.1-.2 2.8-.4.9-.2 1.7-.6 2.4-1.3.7-.7 1.1-1.5 1.3-2.4.2-.7.3-1.6.4-2.8.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.2-.2-2.1-.4-2.8-.2-.9-.6-1.7-1.3-2.4-.7-.7-1.5-1.1-2.4-1.3-.7-.2-1.6-.3-2.8-.4C15.7.3 15.3.3 12 .3z M12 5.8c-3.4 0-6.2 2.8-6.2 6.2 0 3.4 2.8 6.2 6.2 6.2 3.4 0 6.2-2.8 6.2-6.2 0-3.4-2.8-6.2-6.2-6.2z M12 16.3c-2.4 0-4.3-1.9-4.3-4.3 0-2.4 1.9-4.3 4.3-4.3 2.4 0 4.3 1.9 4.3 4.3 0 2.4-1.9 4.3-4.3 4.3z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@rankstack",
    path: "M23.498 6.186c-.275-1.033-1.078-1.84-2.114-2.128C19.552 3.504 12 3.504 12 3.504s-7.552 0-9.384.554C1.579 4.346.777 5.154.502 6.186 0 8.023 0 12 0 12s0 3.977.502 5.814c.275 1.033 1.078 1.84 2.114 2.128 1.832.554 9.384.554 9.384.554s7.552 0 9.384-.554c1.036-.288 1.839-1.096 2.114-2.128C24 15.977 24 12 24 12s0-3.977-.502-5.814zM9.751 15.205V8.795L15.545 12l-5.794 3.205z",
  },
];

const FooterLink = ({ href, children }) => (
  <Link href={href} className="text-sm text-slate-400 transition hover:text-white">
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent" />
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex rounded-xl bg-white px-3 py-2 shadow-sm"
              aria-label="RankStack home"
            >
              <Image
                src={logo}
                alt="RankStack"
                className="h-8 w-auto"
                width={640}
                height={109}
                loading="lazy"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Practical developer utilities, network diagnostics, hosting research,
              and technical SEO resources built for people who ship.
            </p>
            <a
              href="mailto:hello@rankstack.dev"
              className="mt-5 inline-flex text-sm font-medium text-indigo-300 transition hover:text-white"
            >
              hello@rankstack.dev
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="text-sm font-semibold text-white">Explore</h2>
              <ul className="mt-4 space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">Free Tools</h2>
              <ul className="mt-4 space-y-3">
                {toolLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">Company</h2>
              <ul className="mt-4 space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} RankStack. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`RankStack on ${social.label}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-indigo-400/40 hover:bg-white/10 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
