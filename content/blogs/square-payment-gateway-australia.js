import React from "react";
import Link from "next/link";
import KeyTakeaways from "@/components/KeyTakeaways";
import QuickSummary from "@/components/QuickSummary";
import Toc from "@/components/Toc";

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-emerald-800 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-950"
  >
    {children}
  </a>
);

const FAQ_ITEMS = [
  {
    question: "Is Square available in Australia?",
    answer:
      "Yes. Square operates Australian pages and its AU Payment Terms name Square AU Pty Ltd, ABN 38 167 106 176. The terms state they apply to all Square Sellers from 1 October 2026.",
  },
  {
    question: "What are Square's Australian processing rates in 2026?",
    answer:
      "As checked on 23 November 2026, Square's AU pricing page displayed 1.6% for in-person payments, 2.2% for online payments and 2.2% for MOTO/remote payments. Afterpay is listed at 6% + 30 cents excl. GST. Some older sellers may be on a legacy 1.9% rate.",
  },
  {
    question: "Are there monthly fees for Square in Australia?",
    answer:
      "The AU pricing page shows a Free plan at $0 per month plus processing fees, a Plus plan from $40 per month and custom Premium pricing for higher-volume businesses. Hardware and Instant Transfers are separate costs.",
  },
  {
    question: "Which cards and payment methods does Square accept in Australia?",
    answer:
      "The AU Payment Terms name American Express, eftpos, Mastercard and Visa. The AU features page also lists JCB at the in-person rate. Tap to Pay accepts contactless cards and digital wallets, and Afterpay is available through Afterpay Australia Pty Ltd or an affiliate, subject to eligibility.",
  },
  {
    question: "How quickly are Square funds available to Australian sellers?",
    answer:
      "Square's marketing says funds can reach a bank as fast as the next business day. The AU Payment Terms describe a daily payout initiated at 1 p.m. AEST for transactions before midnight AEST, with possible delays on public holidays, for ineligible bank accounts or during NPP downtime. Check your own account timetable.",
  },
  {
    question: "What does Square's Instant Transfer cost in Australia?",
    answer:
      "Square's AU terms state the Instant Transfer fee increased from 1.5% to 1.95% from 1 October 2026. The minimum is A$5 and the daily maximum is A$5,000, with new sellers limited to A$500 per day. Standard payouts follow the normal schedule.",
  },
  {
    question: "Can Square issue refunds?",
    answer:
      "Yes. The AU Payment Terms allow sellers to process refunds up to 120 days from the original payment. Processing fees are not refunded to the seller, and the full purchase amount is returned to the customer, subject to available balance rules.",
  },
  {
    question: "How does Square handle chargebacks and disputes?",
    answer:
      "Square's AU features page says dispute management is included and that Square covers the fee for disputes it fights on the seller's behalf. The legal terms still allow Square to withhold amounts in a Reserve, delay payouts and recover chargeback-related fees, fines or penalties. Treat those as separate statements.",
  },
  {
    question: "Does Square offer fraud protection in Australia?",
    answer:
      "Square's AU pages list fraud prevention, dispute management, PCI compliance and end-to-end encryption, and say machine learning helps spot and block payment fraud at no extra cost. Ask Square how these controls apply to your account; a provider control does not replace your own monitoring.",
  },
  {
    question: "Does Square integrate with WooCommerce?",
    answer:
      "Square's AU pages list WooCommerce among eCommerce connections. The WordPress.org plugin woocommerce-square showed author WooCommerce, version 5.5.3, last updated 4 November 2026 and 80,000 active installs in the 23 November 2026 snapshot. The API wording does not explicitly say it was created by Square, so do not make that claim.",
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

const JUMP_LINKS = [
  ["quick-answer", "Quick answer"],
  ["what-square-is", "What Square is"],
  ["square-pricing-australia", "Australian pricing"],
  ["cards-and-checkout", "Cards and checkout"],
  ["onboarding", "Onboarding"],
  ["payouts-and-transfers", "Payouts and transfers"],
  ["refunds-and-disputes", "Refunds and disputes"],
  ["fraud-and-security", "Fraud and security"],
  ["afterpay", "Afterpay"],
  ["integrations", "Integrations"],
  ["how-it-compares", "How it compares"],
  ["who-should-choose-square", "Who should choose Square"],
  ["faq-square-australia", "Frequently asked questions"],
  ["official-sources", "Official sources"],
];

const JumpLinks = () => (
  <nav
    aria-label="On this page"
    className="my-6 rounded-xl border border-slate-200 bg-white p-5 text-base shadow-sm"
  >
    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-700">
      Quick jump
    </p>
    <ul className="grid gap-2 sm:grid-cols-2">
      {JUMP_LINKS.map(([id, label]) => (
        <li key={id}>
          <a
            href={`#${id}`}
            className="text-emerald-800 underline decoration-emerald-200 underline-offset-2 hover:text-emerald-950"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const SquarePaymentGatewayAustraliaContent = () => (
  <main>
    <FAQJsonLd />

    <section className="relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white">
      <div className="relative max-w-4xl px-6 py-16 text-center md:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
          Square deep dive — Australia
        </p>
        <p className="mt-3 text-xl font-semibold md:text-2xl">
          One product family for in-person, online and Afterpay
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
          AU pricing, legal terms, payouts, disputes and plugin evidence checked 23 November 2026.
        </p>
      </div>
    </section>

    <article className="mx-auto max-w-3xl space-y-6 px-5 py-10 text-lg leading-relaxed text-slate-800">
      <Toc />
      <JumpLinks />

      <QuickSummary
        intro="Square is an Australian payment facilitator that bundles point-of-sale, online checkout, payment links, invoicing and Afterpay. Its published rates are clear, but the real cost also depends on your plan, hardware, Instant Transfers and any legacy pricing."
        points={[
          { text: "In-person 1.6%, online 2.2% and MOTO/remote 2.2%, checked 23 November 2026." },
          { text: "Free plan at $0 per month; Plus from $40 per month; custom Premium available." },
          { text: "Afterpay is listed at 6% + 30 cents excl. GST; Instant Transfer is 1.95%." },
          { text: "Square AU Pty Ltd is a payment facilitator, not a bank; legal terms apply from 1 Oct 2026." },
        ]}
      />

      <KeyTakeaways
        title="Key takeaways"
        points={[
          "Use the /au/en/ pages for Australian rates; US Square pricing is not relevant here.",
          "Marketing statements about fast payouts and dispute fees should be read alongside the legal Payment Terms.",
          "Instant Transfers cost 1.95% with daily limits; standard payouts follow a daily 1 p.m. AEST schedule.",
          "Processing fees are not refunded when a seller issues a full refund.",
          "Compare Square with Stripe, bank gateways and platform-specific options before deciding.",
        ]}
      />

      <p>
        Searches for <strong>square payment gateway</strong> often surface US
        pages and US dollar rates. This deep dive stays on Square's Australian
        pages because the pricing, legal entity and payment methods are
        different. All figures below were checked on 23 November 2026.
      </p>
      <p>
        If you have not yet narrowed the field, read the{" "}
        <Link href="/blogs/best-payment-gateways-australia" className="text-emerald-800 underline">
          {" "}
          Australian payment gateway pillar guide
        </Link>
        first. For the broader concept of gateways and processors, the{" "}
        <Link href="/blogs/payment-gateways" className="text-emerald-800 underline">
          {" "}
          global payment gateways guide
        </Link>
        provides useful background. Platform-specific rules are in the{" "}
        <Link href="/blogs/payment-gateways-shopify-woocommerce-australia" className="text-emerald-800 underline">
          {" "}
          Shopify and WooCommerce Australia guide
        </Link>
        .
      </p>

      <h2 id="quick-answer" className="text-2xl font-bold">
        Quick answer: when is Square a good fit?
      </h2>
      <p>
        Square is a strong fit for a business that sells both in person and
        online and wants one provider for cards, payment links, invoices and
        Afterpay. It is less suitable if you want a quoted interchange-plus
        arrangement, need a direct merchant account in your own name or want a
        narrow API-only gateway. Square's public pricing is simple, but add
        hardware, plan fees, Instant Transfers and BNPL costs before calling it
        cheap.
      </p>

      <h2 id="what-square-is" className="text-2xl font-bold">
        What Square is in Australia
      </h2>
      <p>
        Square's AU Payment Terms identify{" "}
        <strong>Square AU Pty Ltd, ABN 38 167 106 176</strong> and state that
        Square is a payment facilitator, not a bank. That matters because the
        contractual relationship is not the same as opening a merchant facility
        directly with an acquirer. The terms say they apply to all Square
        Sellers from 1 October 2026, with changes including surcharging and an
        Instant Transfer fee increase from 1.5% to 1.95%.
      </p>
      <p>
        The product family includes Square Reader, Square Stand, Tap to Pay,
        Square Online, Payment Links, invoices and developer APIs. You can use
        Square for a physical counter, a online store or both. The unified
        product set is the main reason merchants shortlist it; the trade-off is
        that you are buying inside Square's ecosystem rather than assembling
        components from different vendors.
      </p>

      <h2 id="square-pricing-australia" className="text-2xl font-bold">
        Square pricing in Australia, checked 23 November 2026
      </h2>
      <div className="my-8 w-full overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th>Cost item</th>
              <th>Official figure</th>
              <th>Context</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Free plan</td><td>$0 per month + processing fees</td><td>Shown on the AU pricing page.</td></tr>
            <tr><td>Plus plan</td><td>From $40 per month + processing fees</td><td>Check current inclusions before upgrading.</td></tr>
            <tr><td>Premium</td><td>Custom pricing</td><td>Directed at higher-volume businesses.</td></tr>
            <tr><td>In-person cards</td><td>1.6%</td><td>Some legacy sellers may be on 1.9%.</td></tr>
            <tr><td>Online cards</td><td>2.2%</td><td>Shown on the AU pricing page.</td></tr>
            <tr><td>MOTO / remote</td><td>2.2%</td><td>Shown on the AU pricing page.</td></tr>
            <tr><td>Afterpay</td><td>6% + 30 cents excl. GST</td><td>Subject to Afterpay eligibility.</td></tr>
            <tr><td>Instant Transfer</td><td>1.95%</td><td>Increased from 1.5% from 1 Oct 2026; daily limits apply.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The AU pricing page says there are no setup fees and no lock-in
        contracts. It also notes that sellers who signed up before 30 May 2024
        may have a 1.9% rate when using Square Reader, Square Stand or Tap to
        Pay, and that custom rates may be available above $250,000 of annual
        processing. Neither note replaces a written quote for your account.
      </p>
      <p>
        Hardware is separate. If you compare Square with a software-only
        gateway, include the reader or stand cost and any replacement or
        support charges. See the{" "}
        <ExternalLink href="https://squareup.com/au/en/pricing">
          {" "}
          official Square AU pricing page
        </ExternalLink>
        and the{" "}
        <ExternalLink href="https://squareup.com/au/en/legal/general/payment">
          {" "}
          AU Payment Terms
        </ExternalLink>
        side by side.
      </p>

      <h2 id="cards-and-checkout" className="text-2xl font-bold">
        Cards, wallets and checkout options
      </h2>
      <p>
        The AU Payment Terms name American Express, eftpos, Mastercard and Visa.
        The AU payments features page also lists JCB at the same in-person rate.
        Tap to Pay supports contactless cards and digital wallets on a compatible
        device. Availability can depend on your account and the device used, so
        confirm the exact method list before advertising a card or wallet at
        checkout.
      </p>
      <p>
        For online selling, Square offers Square Online, Payment Links,
        invoices and an eCommerce API. This is useful if you want a hosted page
        rather than building a custom card form. If you are deciding between a
        hosted page and a plugin-based checkout, the platform guide linked
        earlier explains how Shopify and WooCommerce treat third-party payment
        methods.
      </p>

      <h2 id="onboarding" className="text-2xl font-bold">
        Onboarding: what Square says and what to verify
      </h2>
      <p>
        Square's “How Square works” page says account creation and verification
        take minutes and require no bank visit, credit check or merchant
        account. Treat that as a provider claim about the typical flow, not a
        guarantee of approval. Verification still applies, and the documents
        required for your entity type should be confirmed directly with Square.
      </p>
      <p>
        Before launch, prepare your ABN or business registration details,
        beneficial-owner information, bank account details and any documents
        Square requests. Complete verification before you print QR codes, send
        payment links or connect an online store, so you do not discover a hold
        after customers start paying.
      </p>

      <h2 id="payouts-and-transfers" className="text-2xl font-bold">
        Payouts and Instant Transfers
      </h2>
      <p>
        Square's marketing says funds can reach your bank as fast as the next
        business day. The legal terms are more specific: Square initiates a
        payout at 1 p.m. AEST each day for transactions before midnight AEST.
        Standard next-day payouts can be delayed on public holidays, for
        ineligible bank accounts or during NPP downtime.
      </p>
      <p>
        Instant Transfer is a separate, optional service. The AU terms list a
        fee of 1.95%, a minimum of A$5 and a daily maximum of A$5,000, with new
        sellers limited to A$500 per day. Use it for genuine cash-flow needs,
        not as a default for every sale; at scale the percentage can outweigh
        the difference between two processors' base rates.
      </p>

      <h2 id="refunds-and-disputes" className="text-2xl font-bold">
        Refunds, chargebacks and reserves
      </h2>
      <h3 id="refunds" className="text-xl font-semibold">
        Refunds
      </h3>
      <p>
        The AU Payment Terms allow refunds up to 120 days from the original
        payment. Processing fees are not refunded to the seller, the full
        purchase amount goes back to the customer and available balance rules
        apply. A generous refund window is useful for customer service, but it
        should be modelled in your margin calculations.
      </p>
      <h3 id="disputes" className="text-xl font-semibold">
        Disputes
      </h3>
      <p>
        Square's AU features page says dispute management is included and that
        Square covers the fee for disputes it fights on the seller's behalf. The
        legal terms separately allow Square to withhold funds in a Reserve,
        delay payouts and recover chargeback-related fees, fines or penalties.
        Those statements are not contradictory; one describes a product benefit
        and the other describes the legal framework. Ask Square which disputes
        qualify before assuming every chargeback fee is covered.
      </p>

      <h2 id="fraud-and-security" className="text-2xl font-bold">
        Fraud and security claims
      </h2>
      <p>
        Square's AU pages list fraud prevention, dispute management, PCI
        compliance and end-to-end encryption as included. The online payments
        page says machine learning helps spot and block payment fraud at no
        extra cost. These are useful controls, but they do not remove your own
        responsibilities: monitor unusual orders, verify high-risk deliveries
        and respond to disputes on time.
      </p>
      <p>
        PCI DSS v4.0.1 was the current non-archived version in PCI SSC's document
        library at the check date. Validation requirements are set by payment
        brands, acquirers or programme managers, not PCI SSC. A provider saying
        it is PCI compliant does not decide which validation form your business
        must complete.
      </p>

      <h2 id="afterpay" className="text-2xl font-bold">
        Afterpay and buy now, pay later
      </h2>
      <p>
        Square's AU BNPL page says Afterpay customers pay four interest-free
        instalments over six weeks, while the merchant is paid upfront and
        Afterpay takes the fraud risk. The listed merchant fee is 6% + 30 cents
        excl. GST. BNPL can lift conversion for some categories, but the fee is
        materially higher than a standard card rate. Compare the incremental
        sales benefit against the extra cost rather than treating it as free
        financing for your business.
      </p>

      <h2 id="integrations" className="text-2xl font-bold">
        Integrations and the WooCommerce plugin
      </h2>
      <p>
        Square's AU pages list Square Online, Payment Links, invoices, the
        eCommerce API, Terminal API and Reader SDK, plus connections for
        WooCommerce, Magento, BigCommerce and GoDaddy. The WordPress.org API
        snapshot on 23 November 2026 showed <code>woocommerce-square</code> with
        author field “WooCommerce”, version 5.5.3, last updated 4 November 2026,
        80,000 active installs and tested up to WordPress 7.1.5.
      </p>
      <p>
        The API description does not explicitly say the plugin was created by
        Square, so call it a WooCommerce-listed plugin rather than a
        Square-created one. Test the exact checkout path, including refunds and
        webhooks, and confirm current Australian eligibility with Square. For
        detailed platform rules, revisit the{" "}
        <Link href="/blogs/payment-gateways-shopify-woocommerce-australia" className="text-emerald-800 underline">
          {" "}
          Shopify and WooCommerce gateway guide
        </Link>
        .
      </p>

      <h2 id="how-it-compares" className="text-2xl font-bold">
        How Square compares in this cluster
      </h2>
      <p>
        Against <Link href="/blogs/stripe-payment-gateway-australia" className="text-emerald-800 underline">Stripe</Link>,
        Square is less developer-led and more of a bundled POS-plus-online
        product. Stripe offers a wider range of local methods and a plugin
        explicitly described as officially created by Stripe and WooCommerce;
        Square offers simpler published rates and a unified seller experience.
      </p>
      <p>
        Against the bank options in the{" "}
        <Link href="/blogs/eway-vs-westpac-vs-nab-payment-gateway-australia" className="text-emerald-800 underline">
          {" "}
          eWAY vs Westpac vs NAB comparison
        </Link>
        , Square is a payment facilitator rather than a bank gateway, with no
        separate merchant account required according to its own onboarding
        page. Against{" "}
        <Link href="/blogs/nmi-payment-gateway-australia" className="text-emerald-800 underline">
          {" "}
          NMI
        </Link>
        , Square is a direct provider you can sign up for; NMI is typically sold
        through banks, ISOs, PayFacs and SaaS partners.
      </p>
      <p>
        The{" "}
        <Link href="/blogs/best-payment-gateways-australia" className="text-emerald-800 underline">
          {" "}
          Australian pillar guide
        </Link>
        keeps the full shortlist in one place if you want to compare all six
        options against the same criteria.
      </p>

      <h2 id="who-should-choose-square" className="text-2xl font-bold">
        Who should choose Square?
      </h2>
      <ul className="list-disc space-y-3 pl-6">
        <li>A café, retail store or service business taking both card-present and online payments.</li>
        <li>A merchant that wants Afterpay in the same provider account.</li>
        <li>A seller willing to accept a managed payment facilitator model instead of negotiating directly with an acquirer.</li>
        <li>A business that values simple published rates over custom interchange-plus pricing.</li>
      </ul>
      <p>
        If you need a direct merchant facility, a specialist bank gateway or a
        white-label platform for your own SaaS product, one of the other guides
        in this cluster will fit better.
      </p>

      <h2 id="faq-square-australia" className="text-2xl font-bold">
        Frequently asked questions
      </h2>
      <div className="space-y-4">
        {FAQ_ITEMS.map(({ question, answer }) => (
          <details key={question} className="rounded-lg border border-slate-200 p-4">
            <summary className="cursor-pointer font-semibold">
              <h3 id={`faq-${question.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`} className="text-lg font-semibold">
                {question}
              </h3>
            </summary>
            <p className="mt-3 text-base text-slate-700">{answer}</p>
          </details>
        ))}
      </div>

      <h2 id="official-sources" className="text-2xl font-bold">
        Official sources
      </h2>
      <aside className="rounded-xl border-l-4 border-emerald-700 bg-emerald-50 p-5 text-base">
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><ExternalLink href="https://squareup.com/au/en/pricing">Square AU pricing</ExternalLink></li>
          <li><ExternalLink href="https://squareup.com/au/en/payments/features">Square AU payments features</ExternalLink></li>
          <li><ExternalLink href="https://squareup.com/au/en/legal/general/payment">Square AU Payment Terms</ExternalLink></li>
          <li><ExternalLink href="https://squareup.com/au/en/how-square-works">How Square works in Australia</ExternalLink></li>
          <li><ExternalLink href="https://squareup.com/au/en/buy-now-pay-later">Square AU buy now, pay later</ExternalLink></li>
          <li><ExternalLink href="https://squareup.com/au/en/payments/online-payments">Square AU online payments</ExternalLink></li>
          <li><ExternalLink href="https://wordpress.org/plugins/woocommerce-square/">WooCommerce Square plugin listing</ExternalLink></li>
        </ul>
      </aside>

      <h2 id="final-verdict" className="text-2xl font-bold">
        Final verdict
      </h2>
      <p>
        Square is a credible Australian option when you want one provider for
        card-present, online, invoiced and Afterpay payments with clear public
        rates. Get the plan, hardware, Instant Transfer and dispute details in
        writing, and read the 1 October 2026 Payment Terms before launch. If you
        need broader methods, custom APIs or a partner-led platform, compare
        Stripe, the local bank gateways and NMI in the linked guides.
      </p>
      <p className="text-sm text-slate-500">
        Reviewed 23 November 2026. Rates, plugin metadata and terms can change.
        This is general information, not legal, tax or financial advice. Confirm
        all terms with Square.
      </p>
    </article>
  </main>
);

const article = {
  slug: "square-payment-gateway-australia",
  title: "Square Payment Gateway in Australia: Fees, Features and Setup Guide (2026)",
  author: "RankStack",
  date: "2026-11-23",
  updatedDate: "2026-11-23",
  type: "Guide",
  categories: ["Payments", "Australia"],
  readingTime: "13 min read",
  description:
    "Square payment gateway in Australia: official AU rates, Payment Terms, payouts, Instant Transfer, Afterpay, disputes, WooCommerce plugin evidence and provider checks, checked 23 Nov 2026.",
  imageUrl: "/blog-banner-1200x675.webp",
  keywords: [
    "square payment gateway",
    "square payment gateway australia",
    "square australia pricing",
    "square payment terms australia",
    "square instant transfer australia",
    "square afterpay australia",
    "square woocommerce australia",
    "Square AU Pty Ltd",
    "Square payment facilitator Australia",
  ],
  content: SquarePaymentGatewayAustraliaContent,
};

export default article;
