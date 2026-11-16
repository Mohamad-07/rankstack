import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import SchemaMarkup from "../components/SchemaMarkup";
import AdLayer from "../components/AdLayer";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TAGLINE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "developer utilities",
    "network diagnostics",
    "technical SEO",
    "web hosting reviews",
    "free developer tools",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: DEFAULT_OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rankstack",
    creator: "@rankstack",
    title: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "mZSMz06ltjtJcV2zHs99bK21oUWsCvUA9_pJYstYYsQ",
    other: {
      "msvalidate.01": "AA411660E6AE8993F02C8D8121B70546",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ---------- EZOIC PRIVACY SCRIPTS ---------- */}
        <Script
          src="https://cmp.gatekeeperconsent.com/min.js"
          strategy="beforeInteractive"
          data-cfasync="false"
        />
        <Script
          src="https://the.gatekeeperconsent.com/cmp.min.js"
          strategy="beforeInteractive"
          data-cfasync="false"
       />
       {/* ---------- EZOIC Verification ---------- */}
       <meta name="ezoic-site-verification" content="r0QMAE8flXLoIDq6TJMUjaMfBddMYB" />
        {/* ---------- EZOIC HEADER SCRIPT ---------- */}
        <Script
          src="//www.ezojs.com/ezoic/sa.min.js"
          strategy="beforeInteractive"
        />
        <Script id="ezoic-init" strategy="beforeInteractive">
          {`
            window.ezstandalone = window.ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
          `}
        </Script>

        {/* ---------- ADSENSE ACCOUNT VERIFICATION ---------- */}
        <meta
          name="google-adsense-account"
          content="ca-pub-9280103042501049"
        />

        {/* ---------- HILLTOPADS VERIFICATION ---------- */}
        <meta
          name="663333591aa821153ed80420bd3b4de6022d8ec8"
          content="663333591aa821153ed80420bd3b4de6022d8ec8"
        />

        {/* ---------- SCHEMA MARKUP ---------- */}
        <SchemaMarkup />

        {/* ---------- EXTERNAL CSS ---------- */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/keen-slider.min.css"
        />
      </head>

      <body className={`${inter.variable} font-sans antialiased`}>
        {children}

        {/* ---------- EZOIC AD PLACEMENTS EXAMPLE ---------- */}
        {/* 
          Example placeholders can be added in your pages individually. 
          For instance, on a page you can do:

          <div id="ezoic-pub-ad-placeholder-115"></div>
          <div id="ezoic-pub-ad-placeholder-114"></div>
          <div id="ezoic-pub-ad-placeholder-113"></div>
          <div id="ezoic-pub-ad-placeholder-111"></div>
          <div id="ezoic-pub-ad-placeholder-110"></div>

          <script dangerouslySetInnerHTML={{
            __html: \`
              if(window.ezstandalone) {
                ezstandalone.cmd.push(function() {
                  ezstandalone.showAds(115,114,113,111,110);
                });
              }
            \`
          }}></script>
        */}

        {/* ---------- AD LAYER (anchor + pop, client-only) ---------- */}
        <AdLayer />
      </body>
    </html>
  );
}
