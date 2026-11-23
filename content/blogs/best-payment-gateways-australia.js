import React from "react";
import Link from "next/link";
import KeyTakeaways from "@/components/KeyTakeaways";
import QuickSummary from "@/components/QuickSummary";
import Toc from "@/components/Toc";

const SITE_URL = "https://rankstack.dev";

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-sky-800 underline decoration-sky-300 underline-offset-2 hover:text-sky-950"
  >
    {children}
  </a>
);

const SeoImage = ({
  src,
  srcSet,
  sizes,
  width,
  height,
  alt,
  caption,
  priority = false,
}) => (
  <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className="block h-auto w-full"
    />
    {caption && (
      <figcaption className="border-t border-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-600">
        {caption}
      </figcaption>
    )}
  </figure>
);

const IMAGES = [
  {
    src: "/australian-payment-gateway-comparison-2026-1160.webp",
    width: 1160,
    height: 504,
    alt: "Australian payment gateway comparison guide showing 2026 fees, features and provider fit",
    caption:
      "Australian payment gateway fees, features and eligibility checked against official provider and regulator pages in 2026.",
  },
  {
    src: "/cheapest-australian-payment-gateway-costs-573.webp",
    width: 573,
    height: 300,
    alt: "Cost components that decide the cheapest payment gateway in Australia",
    caption:
      "Monthly fees, card rates, platform charges, disputes and settlement timing all affect the real cost.",
  },
  {
    src: "/australian-payment-gateway-step-by-step-selection-563.webp",
    width: 563,
    height: 299,
    alt: "Seven-step process for choosing an Australian payment gateway",
    caption:
      "A practical selection process: eligibility, methods, total cost, platform fit, terms and a live test.",
  },
  {
    src: "/eway-payment-gateway-australia-960.webp",
    width: 960,
    height: 419,
    alt: "eWAY payment gateway for Australian online stores",
    caption: "eWAY is an online specialist with published pricing and a documented WooCommerce route.",
  },
  {
    src: "/nab-payment-gateway-australia-960.webp",
    width: 960,
    height: 347,
    alt: "NAB Gateway online payment service for Australian businesses",
    caption: "NAB Gateway publishes setup, monthly and transaction fees for eligible Australian businesses.",
  },
  {
    src: "/nmi-payment-gateway-australia-960.webp",
    width: 960,
    height: 352,
    alt: "NMI partner-led payment gateway technology used in Australia",
    caption: "NMI is usually encountered through a bank, ISO, PayFac or SaaS partner rather than a public merchant price list.",
  },
  {
    src: "/shopify-woocommerce-payment-gateway-australia-599.webp",
    width: 599,
    height: 326,
    alt: "Shopify and WooCommerce payment gateway options for Australian stores",
    caption: "Platform-native checkout changes the gateway decision because platform fees and plugin rules apply.",
  },
];

const FAQ_ITEMS = [
  {
    topic: "Choosing",
    question: "What is the best payment gateway in Australia in 2026?",
    answer:
      "There is no single best gateway for every business. eWAY suits merchants wanting published online pricing and a provider-linked WooCommerce route; Westpac OnlinePay suits eligible Westpac banking customers; NAB Gateway suits businesses wanting bank-backed published pricing; Square suits combined in-person and online selling; NMI suits partner-led or embedded payments. Choose by eligibility, total cost and support.",
  },
  {
    topic: "Costs",
    question: "What is the cheapest payment gateway in Australia?",
    answer:
      "The lowest headline rate is not always the lowest total cost. Compare monthly fees, transaction rates, Amex and international-card charges, platform fees, chargebacks, hardware, settlement timing and eligibility. eWAY lists 1.5% + 25c with no monthly fee, Westpac OnlinePay lists 1.25% for eligible merchants and NAB Gateway lists $30 per month plus 1.30% and 25c, all checked 23 November 2026.",
  },
  {
    topic: "Costs",
    question: "Do lower RBA interchange caps mean my merchant fees automatically fall?",
    answer:
      "Not necessarily. The RBA caps affect the interchange component of card costs, but merchant service fees are set by acquirers and payment service providers. Transparency reporting due from late 2026 and 2027 should make comparisons easier, but you still need a written quote.",
  },
  {
    topic: "Regulation",
    question: "What changed for Australian card surcharging in 2026?",
    answer:
      "From 1 October 2026, ACCC guidance says businesses cannot surcharge Visa, Mastercard, American Express or eftpos cards. RBA material also records no-surcharge decisions for Amex, PayPal and UnionPay. Network rules and exceptions should be checked with your payment service provider; this is not legal advice.",
  },
  {
    topic: "Regulation",
    question: "Can I rename a card surcharge as an admin or service fee?",
    answer:
      "No. ACCC guidance says a fee linked to card use can still be a card surcharge even if renamed. A weekend or public-holiday fee that applies regardless of payment method is different. Cash discounts may still be possible if prices are displayed clearly and not misleadingly.",
  },
  {
    topic: "Security",
    question: "Is a hosted checkout enough to avoid PCI DSS work?",
    answer:
      "It can reduce the card data your systems handle, but it does not automatically remove every obligation. PCI SSC says validation requirements and SAQ versus ROC are determined by payment brands, acquirers or programme managers. PCI DSS v4.0.1 was the current non-archived version as at 23 November 2026.",
  },
  {
    topic: "Platforms",
    question: "Which gateways support Shopify and WooCommerce in Australia?",
    answer:
      "Shopify Payments is available in Australia and third-party providers are also supported, with third-party transaction fees by plan. WooCommerce supports WooPayments and a wide plugin ecosystem, but eligibility and Checkout Blocks compatibility must be checked. See the platform guide linked in this article for the detailed rules.",
  },
  {
    topic: "Providers",
    question: "Is NMI a direct payment gateway for Australian merchants?",
    answer:
      "NMI says it works exclusively through partners such as banks, ISOs, PayFacs and SaaS providers. You may encounter NMI technology through a reseller, but no public Australian merchant pricing was found on official NMI pages as at 23 November 2026.",
  },
  {
    topic: "Providers",
    question: "Are Square's rates the same in Australia and the United States?",
    answer:
      "No. Australian Square pages displayed 1.6% in person, 2.2% online and 2.2% for MOTO/remote payments at the check date. Always use the /au/en/ pages for Australian decisions.",
  },
  {
    topic: "Providers",
    question: "How quickly do Australian online payments settle?",
    answer:
      "It varies. Westpac OnlinePay advertises same-day settlement before 8pm Sydney time into an eligible account; NAB Gateway says before 10pm AEST/AEDT to a NAB Business Everyday Account; eWAY states 1–3 day settlement; Square describes daily 1 p.m. AEST payouts. Eligibility and bank processing apply.",
  },
  {
    topic: "Due diligence",
    question: "What should I ask a provider before signing?",
    answer:
      "Ask for written pricing, card and method list, international-card definition, chargeback fee, settlement cut-off, reserve policy, contract and exit terms, plugin or integration ownership, support hours and PCI validation responsibility. Also confirm whether the entity on the quote is the one that will contract with you.",
  },
];

const FAQJsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }),
    }}
  />
);

const ImagesJsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: IMAGES.map((image, index) => ({
          "@type": "ImageObject",
          position: index + 1,
          name: image.alt,
          contentUrl: `${SITE_URL}${image.src}`,
          caption: image.caption,
          width: image.width,
          height: image.height,
        })),
      }),
    }}
  />
);

const PROVIDERS = [
  {
    id: "provider-eway",
    name: "eWAY payment gateway",
    label: "Online payments specialist",
    image: SeoImage({
      src: "/eway-payment-gateway-australia-960.webp",
      srcSet:
        "/eway-payment-gateway-australia-480.webp 480w, /eway-payment-gateway-australia-960.webp 960w",
      sizes: "(max-width: 768px) 100vw, 420px",
      width: 960,
      height: 419,
      alt: "eWAY payment gateway for Australian online stores",
      caption: "eWAY publishes an online card rate and supports recurring and WooCommerce payments.",
    }),
    description:
      "eWAY is an Australian online payments provider aimed at businesses that sell primarily through a website. It publishes a clear online rate, supports common card types and offers both API and plugin routes. Treat it as an online gateway option rather than assuming it replaces every merchant facility or in-person terminal arrangement.",
    features: [
      "1.5% + 25c published online rate",
      "No setup, monthly or lock-in fee listed",
      "Visa, Mastercard, Amex and wallets",
      "Recurring, tokenisation, MOTO and API options",
    ],
    bestFit:
      "Online-only Australian businesses that want published pricing, common card support and a documented WooCommerce route.",
    cta: { label: "Visit eWAY", href: "https://www.eway.com.au/" },
  },
  {
    id: "provider-westpac",
    name: "Westpac OnlinePay",
    label: "Bank-owned online gateway",
    image: SeoImage({
      src: "/australian-payment-gateway-comparison-2026-1160.webp",
      srcSet:
        "/australian-payment-gateway-comparison-2026-640.webp 640w, /australian-payment-gateway-comparison-2026-1160.webp 1160w",
      sizes: "(max-width: 768px) 100vw, 420px",
      width: 1160,
      height: 504,
      alt: "Australian online checkout representing Westpac OnlinePay card payments",
      caption: "Westpac OnlinePay is a bank-owned online gateway for eligible Westpac customers.",
    }),
    description:
      "Westpac OnlinePay is Westpac's online payment gateway for eligible business banking customers. Its headline rate is 1.25% for eftpos, Visa and Mastercard, but that rate depends on meeting Westpac's eligibility conditions, including a foreign-card share condition. OnlinePay is a distinct product from other Westpac merchant services, so confirm exactly what you are being offered.",
    features: [
      "1.25% rate for eligible merchants",
      "eftpos, Visa and Mastercard support",
      "Apple Pay and Google Pay in checkout",
      "3DS in the OnlinePay checkout",
    ],
    bestFit:
      "Existing Westpac business banking customers that want a simple online checkout and settlement into an eligible account.",
    cta: {
      label: "Visit Westpac OnlinePay",
      href: "https://www.westpac.com.au/business-banking/merchants-and-payments/online-payments/onlinepay",
    },
  },
  {
    id: "provider-nab",
    name: "NAB Gateway",
    label: "Bank-backed card gateway",
    image: SeoImage({
      src: "/nab-payment-gateway-australia-960.webp",
      srcSet:
        "/nab-payment-gateway-australia-480.webp 480w, /nab-payment-gateway-australia-960.webp 960w",
      sizes: "(max-width: 768px) 100vw, 420px",
      width: 960,
      height: 347,
      alt: "NAB Gateway online payment service for Australian businesses",
      caption: "NAB Gateway lists setup, monthly and transaction fees for online payments.",
    }),
    description:
      "NAB Gateway is an online and virtual payment service with published bank pricing: $0 setup, $30 per month, a 1.30% merchant service fee and 25c per transaction. It is useful for businesses that want a bank-backed gateway with a straightforward fee card. Confirm whether the quote covers Gateway, Transact or another NAB merchant product before you sign.",
    features: [
      "$0 setup and $30 monthly fee listed",
      "1.30% merchant service fee plus 25c",
      "Virtual terminal, recurring and batch options",
      "Wallet and platform integration references",
    ],
    bestFit:
      "NAB banking customers that want bank-backed online payments with published fees and virtual payment tools.",
    cta: {
      label: "Visit NAB Gateway",
      href: "https://www.nab.com.au/business/payments-and-merchants/ecommerce-and-online-payments/nab-gateway",
    },
  },
  {
    id: "provider-square",
    name: "Square payment gateway",
    label: "In-person and online selling",
    image: SeoImage({
      src: "/australian-payment-gateway-comparison-2026-1160.webp",
      srcSet:
        "/australian-payment-gateway-comparison-2026-640.webp 640w, /australian-payment-gateway-comparison-2026-1160.webp 1160w",
      sizes: "(max-width: 768px) 100vw, 420px",
      width: 1160,
      height: 504,
      alt: "Australian retail and online business using Square card payments",
      caption: "Square combines card readers, online checkout, invoices and payment links in Australia.",
    }),
    description:
      "Square suits businesses that sell both face to face and online. Australian pages listed 1.6% for in-person payments and 2.2% for online and MOTO/remote payments at the check date. Hardware, Square Plus, Afterpay and Instant Transfer are separate cost items, so model them before comparing Square with a pure online gateway.",
    features: [
      "1.6% in-person and 2.2% online rates",
      "Square Online, invoices and payment links",
      "Tap to Pay and physical readers",
      "Afterpay listed at 6% + 30c excl. GST",
    ],
    bestFit:
      "Retailers, cafés and service businesses that need one provider for counter, mobile and online sales.",
    cta: { label: "Visit Square Australia", href: "https://squareup.com/au/en" },
  },
  {
    id: "provider-platforms",
    name: "Shopify Payments and WooPayments",
    label: "Platform-native checkout",
    image: SeoImage({
      src: "/shopify-woocommerce-payment-gateway-australia-599.webp",
      srcSet:
        "/shopify-woocommerce-payment-gateway-australia-480.webp 480w, /shopify-woocommerce-payment-gateway-australia-599.webp 599w",
      sizes: "(max-width: 768px) 100vw, 420px",
      width: 599,
      height: 326,
      alt: "Shopify and WooCommerce payment gateway options for Australian stores",
      caption: "Platform-native checkout can be convenient, but platform-specific fees and plugin rules still apply.",
    }),
    description:
      "Shopify Payments and WooPayments are built into their respective platforms. Shopify's AU card rates started at 1.7% + 30c on Basic, while WooPayments listed 1.75% + $0.30 for cards. The real decision is not only the card rate: Shopify charges third-party transaction fees on some plans, and WooCommerce Checkout Blocks compatibility can determine whether a plugin appears at checkout.",
    features: [
      "Shopify AU Basic cards from 1.7% + 30c",
      "WooPayments cards at 1.75% + $0.30",
      "Native checkout and wallet support",
      "Platform-specific third-party and plugin rules",
    ],
    bestFit:
      "Merchants already committed to Shopify or WooCommerce who value a native checkout over maximum processor choice.",
    cta: {
      label: "Visit Shopify AU pricing",
      href: "https://www.shopify.com/au/pricing?country=au&lang=en",
    },
    secondaryCta: {
      label: "Visit WooPayments",
      href: "https://woocommerce.com/products/woopayments/",
    },
  },
  {
    id: "provider-nmi",
    name: "NMI payment gateway",
    label: "Partner-led infrastructure",
    image: SeoImage({
      src: "/nmi-payment-gateway-australia-960.webp",
      srcSet:
        "/nmi-payment-gateway-australia-480.webp 480w, /nmi-payment-gateway-australia-960.webp 960w",
      sizes: "(max-width: 768px) 100vw, 420px",
      width: 960,
      height: 352,
      alt: "NMI partner-led payment gateway technology used in Australia",
      caption: "NMI access in Australia is usually provided through a bank, ISO, PayFac or SaaS partner.",
    }),
    description:
      "NMI is not a public-price merchant brand in Australia. It provides gateway technology to partners such as banks, ISOs, PayFacs and SaaS platforms. If a platform tells you payments are powered by NMI, the partner sets the price, onboarding, settlement and support. No public Australian merchant price was found on official NMI pages at the check date.",
    features: [
      "White-label gateway and hosted pages",
      "Virtual terminal and tokenisation",
      "Webhooks and Merchant Central reporting",
      "Pricing set by the partner, not NMI",
    ],
    bestFit:
      "Businesses receiving payments through a bank, ISO, PayFac or SaaS platform that uses NMI technology behind the scenes.",
    cta: {
      label: "Visit NMI Payments Australia",
      href: "https://www.nmi.com/products/nmi-payments-au",
    },
  },
];

const ProviderCard = ({ provider }) => (
  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    {provider.image}
    <div className="flex flex-1 flex-col p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
        {provider.label}
      </p>
      <h3 id={provider.id} className="mt-2 text-xl font-semibold text-slate-900">
        {provider.name}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-slate-700">
        {provider.description}
      </p>
      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-900">Key features</p>
        <ul className="mt-2 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          {provider.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span aria-hidden="true" className="mt-0.5 text-sky-700">
                ✓
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 rounded-xl bg-sky-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
          Best fit for
        </p>
        <p className="mt-1 text-sm leading-relaxed text-slate-700">
          {provider.bestFit}
        </p>
      </div>
      <div className="mt-5 flex flex-wrap gap-3 pt-1">
        <ExternalLink href={provider.cta.href}>
          <span className="inline-flex items-center gap-2 rounded-lg bg-sky-800 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-sky-950">
            {provider.cta.label}
            <span aria-hidden="true">↗</span>
          </span>
        </ExternalLink>
        {provider.secondaryCta && (
          <ExternalLink href={provider.secondaryCta.href}>
            <span className="inline-flex items-center gap-2 rounded-lg border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-900 no-underline hover:bg-sky-50">
              {provider.secondaryCta.label}
              <span aria-hidden="true">↗</span>
            </span>
          </ExternalLink>
        )}
      </div>
    </div>
  </article>
);

const JUMP_LINKS = [
  ["short-answer", "Short answer"],
  ["gateway-vs-acquirer", "Gateway vs acquirer"],
  ["comparison-table", "Comparison table"],
  ["provider-profiles", "Provider profiles"],
  ["cheapest-gateway", "Cheapest gateway"],
  ["regulatory-changes", "2026 regulatory changes"],
  ["security-and-kyc", "Security and KYC"],
  ["platforms", "Shopify and WooCommerce"],
  ["how-to-choose", "How to choose"],
  ["mistakes", "Common mistakes"],
  ["faq-australia", "Frequently asked questions"],
  ["official-sources", "Official sources"],
];

const JumpLinks = () => (
  <nav
    aria-label="On this page"
    className="my-6 rounded-xl border border-slate-200 bg-white p-5 text-base shadow-sm"
  >
    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-sky-700">
      Quick jump
    </p>
    <ul className="grid gap-2 sm:grid-cols-2">
      {JUMP_LINKS.map(([id, label]) => (
        <li key={id}>
          <a
            href={`#${id}`}
            className="text-sky-800 underline decoration-sky-200 underline-offset-2 hover:text-sky-950"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const BestPaymentGatewaysAustraliaContent = () => (
  <main>
    <FAQJsonLd />
    <ImagesJsonLd />

    <section className="relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sky-950 via-slate-900 to-indigo-950 text-white">
      <div className="relative max-w-4xl px-6 py-16 text-center md:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-200">
          Australian payment gateway guide
        </p>
        <p className="mt-3 text-xl font-semibold md:text-2xl">
          Compare fees, features and 2026 rules from primary sources
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
          Official provider pages, RBA and ACCC guidance checked 23 November 2026. Unconfirmed terms are marked Check with provider.
        </p>
      </div>
    </section>

    <article className="mx-auto max-w-3xl space-y-6 px-5 py-10 text-lg leading-relaxed text-slate-800">
      <Toc />
      <JumpLinks />

      <SeoImage
        src="/australian-payment-gateway-comparison-2026-1160.webp"
        srcSet="/australian-payment-gateway-comparison-2026-640.webp 640w, /australian-payment-gateway-comparison-2026-1160.webp 1160w"
        sizes="(max-width: 768px) 100vw, 1160px"
        width={1160}
        height={504}
        alt="Australian payment gateway comparison guide showing 2026 fees, features and provider fit"
        caption="Australian payment gateway fees, features and eligibility checked against official provider and regulator pages in 2026."
        priority
      />

      <QuickSummary
        intro="Australian merchants can choose between specialist providers, bank-owned gateways, platform-native payments and partner-led infrastructure. The best option depends on eligibility, card mix, platform and total cost — not just the headline percentage."
        points={[
          { text: "eWAY lists 1.5% + 25c with no monthly fee; Westpac OnlinePay lists 1.25% for eligible merchants." },
          { text: "NAB Gateway lists $0 setup, $30 monthly, 1.30% and 25c per transaction." },
          { text: "Square lists 1.6% in person and 2.2% online; NMI has no public AU merchant price." },
          { text: "Shopify and WooPayments are convenient, but platform fees and plugin rules change the comparison." },
        ]}
      />

      <KeyTakeaways
        title="Key takeaways"
        points={[
          "Check the exact product name before comparing fees or features.",
          "The cheapest payment gateway depends on card mix, platform fees and settlement needs.",
          "Australian surcharging rules changed on 1 October 2026; old checkout copy may be wrong.",
          "Hosted checkout can reduce PCI scope but does not remove every validation obligation.",
          "Use the Australian guides for local banks, platforms and brand-specific deep dives.",
        ]}
      />

      <p>
        A search for <strong>payment gateway australia</strong> returns a mix of
        provider pages, listicles and generic explainers. Many use US rates or
        treat all providers as the same product. This pillar guide separates
        verified facts from provider marketing claims, dates every price to 23
        November 2026 and marks unclear terms as <em>Check with provider</em>.
        It is written for Australian businesses choosing how to accept card and
        digital payments online, in person or through Shopify and WooCommerce.
      </p>
      <p>
        For the general concept behind gateways, acquirers and merchant accounts,
        see the{" "}
        <Link href="/blogs/payment-gateways" className="text-sky-800 underline">
          {" "}
          global payment gateways guide
        </Link>
        . That guide explains the underlying concepts without mixing them into
        Australian pricing decisions.
      </p>

      <h2 id="short-answer" className="text-2xl font-bold">
        Short answer: how to pick an Australian payment gateway
      </h2>
      <p>
        Start with the payment experience you need. If you sell online only and
        want straightforward published pricing, shortlist eWAY, Westpac
        OnlinePay and NAB Gateway. If you also sell in person, include Square.
        If you run Shopify or WooCommerce, read the platform rules before
        comparing processors. If a bank or SaaS vendor offers you a service
        powered by NMI, treat it as a partner-led product and ask for a full
        written quote.
      </p>
      <p>
        Then compare total cost: monthly fees, transaction rates, Amex and
        international-card charges, platform fees, chargebacks, hardware,
        currency conversion and settlement timing. A provider with a slightly
        higher headline rate can still be cheaper if it avoids monthly fees or
        third-party platform charges.
      </p>

      <h2 id="gateway-vs-acquirer" className="text-2xl font-bold">
        Gateway, acquirer, PSP and merchant facility are not the same
      </h2>
      <p>
        In short: a gateway carries card data, an acquirer or merchant facility
        settles funds, and a PSP may bundle both. Ask which entity contracts
        with you and which entity pays you; a product name alone does not tell
        you its role.
      </p>

      <h2 id="comparison-table" className="text-2xl font-bold">
        Australian payment gateway comparison (2026)
      </h2>
      <div className="my-8 w-full overflow-x-auto">
        <table className="w-full min-w-[1200px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Best fit</th>
              <th>Published pricing</th>
              <th>Features and methods</th>
              <th>Watch-outs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>eWAY</td>
              <td>Online specialist with WooCommerce route</td>
              <td>1.5% + 25c; +1.99% international credit cards; no setup, monthly or lock-in fees.</td>
              <td>Visa, Mastercard, Amex; wallets; recurring, token, MOTO and manual payments; API.</td>
              <td>Confirm Amex wording, international-card definition and settlement cut-offs.</td>
            </tr>
            <tr>
              <td>Westpac OnlinePay</td>
              <td>Eligible Westpac banking customers</td>
              <td>1.25% flat for eftpos, Mastercard and Visa; no lock-in, establishment or monthly fee.</td>
              <td>eftpos, Visa, Mastercard, Apple Pay, Google Pay; 3DS in checkout.</td>
              <td>Foreign-card share condition and April/October rate reviews.</td>
            </tr>
            <tr>
              <td>NAB Gateway</td>
              <td>Bank-backed online and virtual payments</td>
              <td>$0 setup, $30 monthly, 1.30% merchant service fee, 25c per transaction.</td>
              <td>Flex Microform, virtual terminal, recurring, batch, wallets, Shopify and WooCommerce references.</td>
              <td>Disputed-charge fees not quantified; clarify Gateway versus Transact scope.</td>
            </tr>
            <tr>
              <td>Square</td>
              <td>Combined POS and online selling</td>
              <td>1.6% in person, 2.2% online, 2.2% MOTO; Free plan $0/month, Plus from $40/month.</td>
              <td>Square Online, Payment Links, invoices, Tap to Pay, Afterpay, APIs.</td>
              <td>Instant Transfer 1.95%; legacy rates; dispute-fee wording needs care.</td>
            </tr>
            <tr>
              <td>Shopify Payments / WooPayments</td>
              <td>Platform-native checkout</td>
              <td>Shopify AU standard cards from 1.7% + 30c; WooPayments cards 1.75% + $0.30.</td>
              <td>Built-in checkout, wallets, recurring and method ecosystems specific to each platform.</td>
              <td>Shopify third-party fees by plan; WooPayments business-country and Checkout Blocks rules.</td>
            </tr>
            <tr>
              <td>NMI</td>
              <td>Partner-led or embedded payments</td>
              <td>No public AU merchant pricing found; Check with provider.</td>
              <td>White-label gateway, hosted page, virtual terminal, tokenisation, webhooks, Merchant Central.</td>
              <td>Partner sets fees, KYC, settlement and support; global method lists are not AU proof.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        These are shortlist figures, not quotes. Eligibility, business category,
        card mix and negotiated rates can change the answer. For deeper detail,
        read the{" "}
        <Link href="/blogs/eway-vs-westpac-vs-nab-payment-gateway-australia" className="text-sky-800 underline">
          {" "}
          eWAY vs Westpac vs NAB comparison
        </Link>
        , the{" "}
        <Link href="/blogs/square-payment-gateway-australia" className="text-sky-800 underline">
          {" "}
          Square Australia deep dive
        </Link>
        , the{" "}
        <Link href="/blogs/nmi-payment-gateway-australia" className="text-sky-800 underline">
          {" "}
          NMI explainer
        </Link>
        and the{" "}
        <Link href="/blogs/payment-gateways-shopify-woocommerce-australia" className="text-sky-800 underline">
          {" "}
          Shopify and WooCommerce platform guide
        </Link>
        .
      </p>

      <h2 id="provider-profiles" className="text-2xl font-bold">
        Provider profiles: what each gateway is actually good at
      </h2>
      <p>
        Use these profiles as a shortlist, not as a substitute for a written
        quote. Each provider below is explained in plain English: what it is,
        what you get, who it suits and where to check the current terms.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {PROVIDERS.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>

      <h2 id="cheapest-gateway" className="text-2xl font-bold">
        The cheapest payment gateway: compare total cost, not a headline rate
      </h2>
      <SeoImage
        src="/cheapest-australian-payment-gateway-costs-573.webp"
        srcSet="/cheapest-australian-payment-gateway-costs-480.webp 480w, /cheapest-australian-payment-gateway-costs-573.webp 573w"
        sizes="(max-width: 768px) 100vw, 573px"
        width={573}
        height={300}
        alt="Cost components that decide the cheapest payment gateway in Australia"
        caption="The cheapest gateway is the one with the lowest total cost for your actual card mix, platform and settlement needs."
      />
      <p>
        “Cheapest” is only meaningful after you define the comparison. A 1.25%
        rate with a foreign-card threshold may cost more than a 1.5% rate with
        no threshold if your customers use international cards. A $0-monthly
        gateway may lose its advantage once a platform adds a third-party
        transaction fee. A bank rate may look competitive but require a specific
        settlement account.
      </p>
      <p>Build your comparison from these components:</p>
      <ul className="list-disc space-y-3 pl-6">
        <li><strong>Setup and monthly fees.</strong> eWAY and OnlinePay publish none; NAB Gateway lists $30 per month.</li>
        <li><strong>Base transaction rate.</strong> Use the rate that matches your card mix and volume.</li>
        <li><strong>Amex and international cards.</strong> Ask how they are defined and priced.</li>
        <li><strong>Platform fees.</strong> Shopify third-party fees were 2%, 1%, 0.6% and 0.2% by plan in the AU table checked 23 November 2026.</li>
        <li><strong>Chargebacks.</strong> OnlinePay says fees apply; NAB references disputed-charge fees without a public amount.</li>
        <li><strong>Method fees.</strong> Square lists Afterpay at 6% + 30c excl. GST; other methods may have separate rates.</li>
        <li><strong>Hardware and transfers.</strong> Square hardware and Instant Transfers are separate; Instant Transfer is 1.95%.</li>
        <li><strong>Settlement and reserves.</strong> Faster access to funds can be worth more than a small rate difference.</li>
      </ul>
      <p>
        A simple monthly model is: monthly fees + domestic card fees + Amex and
        international-card fees + platform fees + estimated chargebacks +
        hardware or transfer costs. Run it at your current volume, a quiet month
        and a peak month. The ranking often changes.
      </p>

      <h2 id="regulatory-changes" className="text-2xl font-bold">
        The 2026 regulatory changes merchants need to know
      </h2>
      <h3 id="surcharging" className="text-xl font-semibold">
        Card surcharging changed on 1 October 2026
      </h3>
      <p>
        ACCC guidance says businesses can no longer surcharge Visa, Mastercard,
        American Express or eftpos cards. RBA material records no-surcharge
        decisions for eftpos, Mastercard and Visa, plus Amex, PayPal and UnionPay.
        The RBA does not directly regulate individual merchants; card networks
        and payment service providers enforce their rules. The ACCC enforces
        Australian Consumer Law and misleading-price rules, and does not give
        legal advice about network rules.
      </p>
      <p>
        Do not rename a card fee as an admin, service or booking fee. ACCC
        guidance says a fee linked to card use can still be a card surcharge. A
        weekend or public-holiday fee that applies regardless of payment method
        is different. Cash discounts may still be possible if prices are clear
        and not misleading. Review the{" "}
        <ExternalLink href="https://www.accc.gov.au/business/pricing/card-surcharges">
          {" "}
          ACCC card surcharge guidance
        </ExternalLink>
        and the{" "}
        <ExternalLink href="https://www.rba.gov.au/payments-and-infrastructure/review-of-retail-payments-regulation/2026-03/conclusions-paper/surcharging.html">
          {" "}
          RBA surcharging conclusions
        </ExternalLink>
        before changing checkout copy.
      </p>
      <h3 id="interchange" className="text-xl font-semibold">
        Interchange caps and transparency
      </h3>
      <p>
        The RBA's 2026 conclusions set a domestic debit and prepaid benchmark of
        8c and a cap of 8c/0.16%, a consumer credit cap of 0.30% and a commercial
        credit cap of 0.80%. A foreign-issued card cap of 1.0% starts on 1 April
        2027. These are interchange settings, not your merchant service fee.
        Acquirers and PSPs set the price you pay.
      </p>
      <p>
        RBA transparency measures include specified fee data from designated
        networks and large acquirers from 30 October 2026, flow-through
        reporting from 30 January 2027 and more detailed merchant statements
        from 1 April 2027. Those reports should make comparison easier, but a
        written quote is still the deciding document. See the RBA's{" "}
        <ExternalLink href="https://www.rba.gov.au/payments-and-infrastructure/review-of-retail-payments-regulation/2026-03/conclusions-paper/interchange-fees.html">
          {" "}
          interchange conclusions
        </ExternalLink>
        .
      </p>

      <h2 id="security-and-kyc" className="text-2xl font-bold">
        PCI DSS, 3-D Secure and onboarding checks
      </h2>
      <p>
        PCI SSC's Document Library listed PCI DSS v4.0.1 as the current
        non-archived version as at 23 November 2026. PCI DSS v4.0 was retired on
        31 December 2024; v4.0.1 introduced no new or deleted requirements, and
        updated SAQ A e-commerce script criteria became effective on 1 April
        2025. Validation is not decided by PCI SSC: payment brands, acquirers and
        programme managers determine whether you complete an SAQ or a Report on
        Compliance.
      </p>
      <p>
        Hosted checkout can reduce the cardholder data your systems touch, but
        it does not guarantee zero PCI obligations. Ask your provider which
        validation route applies to your exact integration. PCI SSC also does
        not maintain a list of “PCI DSS compliant” service providers, so treat a
        Level 1 claim as a provider claim rather than a PCI SSC endorsement.
      </p>
      <p>
        EMVCo describes EMV 3DS as an authentication protocol to help prevent
        card-not-present fraud. EMV 3DS v2.4 documents were drafts as at 23
        November 2026, so do not describe that version as final. Availability of
        3DS varies by provider and module, so confirm it for the exact checkout
        you plan to use.
      </p>
      <p>
        AUSTRAC guidance says merchant card payments under the Travel Rule do
        not require ordering institutions to collect and verify payer and payee
        information; a card number or tokenised reference is sufficient.
        Merchant onboarding KYC is a separate provider obligation. For eWAY,
        official material references AUSTRAC AML/CTF requirements and beneficial
        owner verification. NAB Gateway lists active ABN and identity-document
        requirements. Ask each provider for the exact checklist for your entity.
      </p>

      <h2 id="platforms" className="text-2xl font-bold">
        Shopify and WooCommerce need their own decision layer
      </h2>
      <p>
        Shopify Payments is available in Australia, subject to verification and
        an Australian AUD bank account eligible for BECS transfers. Official AU
        card rates checked 23 November 2026 started at 1.7% + 30c on Basic, with
        third-party transaction fees of 2%, 1%, 0.6% and 0.2% by plan. Shopify
        also says only one credit card payment provider can be activated at a
        time.
      </p>
      <p>
        WooCommerce lists Australia as supported for WooPayments and says
        eligibility is based on where the business is registered, not where the
        owner lives. Its card rate was 1.75% + $0.30, with different rates for
        in-person, Afterpay and other methods. Cart and Checkout blocks are the
        default for newer stores, and an incompatible gateway may not appear at
        checkout.
      </p>
      <p>
        These rules are not interchangeable. Read the{" "}
        <Link href="/blogs/payment-gateways-shopify-woocommerce-australia" className="text-sky-800 underline">
          {" "}
          full Shopify and WooCommerce Australia guide
        </Link>
        before you install a plugin or switch your checkout.
      </p>

      <h2 id="how-to-choose" className="text-2xl font-bold">
        A seven-step selection process
      </h2>
      <SeoImage
        src="/australian-payment-gateway-step-by-step-selection-563.webp"
        srcSet="/australian-payment-gateway-step-by-step-selection-480.webp 480w, /australian-payment-gateway-step-by-step-selection-563.webp 563w"
        sizes="(max-width: 768px) 100vw, 563px"
        width={563}
        height={299}
        alt="Seven-step process for choosing an Australian payment gateway"
        caption="Move from eligibility and payment methods to total cost, platform fit, written terms and a live test."
      />
      <ol className="list-decimal space-y-3 pl-6">
        <li>Define whether you need online, in-person, recurring, invoice or embedded payments.</li>
        <li>Confirm business eligibility, ABN and bank-account requirements.</li>
        <li>List the methods you actually need, including Amex, wallets, bank debits and BNPL.</li>
        <li>Model total monthly cost at low, normal and peak volume.</li>
        <li>Check platform fees and plugin compatibility.</li>
        <li>Ask for written settlement, chargeback, reserve and exit terms.</li>
        <li>Run a small live payment and refund, then reconcile the report before scaling.</li>
      </ol>

      <h2 id="mistakes" className="text-2xl font-bold">
        Common mistakes when comparing Australian gateways
      </h2>
      <ul className="list-disc space-y-3 pl-6">
        <li>Using US pricing from generic pages instead of Australian /au pages.</li>
        <li>Calling every provider an acquirer when the product may be a gateway or payment facilitator.</li>
        <li>Assuming all bank merchant products share one rate or settlement rule.</li>
        <li>Ignoring Shopify's third-party transaction fee when comparing gateway rates.</li>
        <li>Assuming a WordPress plugin listing proves Australian eligibility.</li>
        <li>Assuming hosted checkout removes all PCI DSS obligations.</li>
        <li>Keeping old surcharging language after the 1 October 2026 changes.</li>
        <li>Treating NMI's global method list as proof of Australian support.</li>
      </ul>

      <h2 id="faq-australia" className="text-2xl font-bold">
        Frequently asked questions
      </h2>
      <p className="text-base text-slate-600">
        Short, source-checked answers to the questions Australian merchants ask
        before switching or adding a gateway.
      </p>
      <div className="space-y-4">
        {FAQ_ITEMS.map(({ topic, question, answer }, index) => {
          const id = `faq-${question
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")}`;
          return (
            <details
              key={question}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-800">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-sky-700">
                    {topic}
                  </span>
                  <h3 id={id} className="mt-1 text-lg font-semibold text-slate-900">
                    {question}
                  </h3>
                </span>
                <svg
                  aria-hidden="true"
                  className="mt-2 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-slate-100 px-5 py-4 text-base leading-relaxed text-slate-700">
                <p>{answer}</p>
              </div>
            </details>
          );
        })}
      </div>

      <h2 id="official-sources" className="text-2xl font-bold">
        Official sources
      </h2>
      <aside className="rounded-xl border-l-4 border-sky-700 bg-sky-50 p-5 text-base">
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><ExternalLink href="https://www.rba.gov.au/media-releases/2026/mr-26-10.html">RBA retail payments reform media release</ExternalLink></li>
          <li><ExternalLink href="https://www.rba.gov.au/payments-and-infrastructure/review-of-retail-payments-regulation/2026-03/conclusions-paper/surcharging.html">RBA surcharging conclusions</ExternalLink></li>
          <li><ExternalLink href="https://www.rba.gov.au/payments-and-infrastructure/review-of-retail-payments-regulation/2026-03/conclusions-paper/interchange-fees.html">RBA interchange conclusions</ExternalLink></li>
          <li><ExternalLink href="https://www.accc.gov.au/business/pricing/card-surcharges">ACCC card surcharge guidance</ExternalLink></li>
          <li><ExternalLink href="https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/additional-guidance/travel-rule/when-travel-rule-doesnt-apply">AUSTRAC Travel Rule guidance</ExternalLink></li>
          <li><ExternalLink href="https://www.pcisecuritystandards.org/document_library">PCI SSC Document Library</ExternalLink></li>
          <li><ExternalLink href="https://www.emvco.com/emv-technologies/3-d-secure">EMVCo 3-D Secure</ExternalLink></li>
          <li><ExternalLink href="https://www.eway.com.au/pricing">eWAY pricing</ExternalLink></li>
          <li><ExternalLink href="https://www.westpac.com.au/business-banking/merchants-and-payments/online-payments/onlinepay">Westpac OnlinePay</ExternalLink></li>
          <li><ExternalLink href="https://www.nab.com.au/business/payments-and-merchants/ecommerce-and-online-payments/nab-gateway">NAB Gateway</ExternalLink></li>
          <li><ExternalLink href="https://squareup.com/au/en/pricing">Square AU pricing</ExternalLink></li>
          <li><ExternalLink href="https://www.nmi.com/products/nmi-payments-au">NMI Payments Australia</ExternalLink></li>
        </ul>
      </aside>

      <p className="text-sm text-slate-500">
        Reviewed 23 November 2026. Pricing, plugin data and regulatory guidance
        can change. This is general information, not legal, tax or financial
        advice. Verify all terms with the provider before applying.
      </p>
    </article>
  </main>
);

const article = {
  slug: "best-payment-gateways-australia",
  title: "Best Payment Gateways in Australia (2026 Fee & Feature Comparison)",
  author: "RankStack",
  date: "2026-11-23",
  updatedDate: "2026-11-23",
  type: "Comparison",
  categories: ["Payments", "Australia"],
  readingTime: "18 min read",
  description:
    "Compare the best payment gateways in Australia with official 2026 fees, provider profiles, RBA and ACCC changes, Shopify and WooCommerce rules, PCI/3DS notes and expert FAQs. Checked 23 Nov 2026.",
  imageUrl: "/australian-payment-gateway-comparison-2026-1160.webp",
  keywords: [
    "payment gateway australia",
    "australian payment gateways",
    "best payment gateways in Australia",
    "cheapest payment gateway Australia",
    "payment gateway comparison Australia",
    "online payment gateway Australia",
    "merchant gateway Australia",
    "eWAY Westpac NAB Square NMI Australia",
  ],
  content: BestPaymentGatewaysAustraliaContent,
};

export default article;
