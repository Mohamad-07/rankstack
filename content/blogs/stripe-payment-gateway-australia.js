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
    className="font-medium text-indigo-700 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-950"
  >
    {children}
  </a>
);

const FAQ_ITEMS = [
  {
    question: "What are Stripe's Australian card rates in 2026?",
    answer:
      "As checked on 23 November 2026, Stripe's AU pricing page displays 1.65% + A$0.30 for domestic cards and 3.5% + A$0.30 for international cards. Its AU payments page displays 1.7% + A$0.30 for domestic cards. Because the official pages differ, confirm the applicable rate in your Dashboard or with Stripe before budgeting.",
  },
  {
    question: "Does Stripe charge setup or monthly fees in Australia?",
    answer:
      "Stripe's AU pricing page says Standard has no setup fees, monthly fees or hidden fees. Separate products such as Radar, Tax or premium plans can have their own charges, so read the full pricing page for the services you actually enable.",
  },
  {
    question: "Which payment methods can Australian Stripe users offer?",
    answer:
      "AU pages and docs list cards, Apple Pay, Google Pay, BECS Direct Debit, PayTo, Afterpay, Klarna and Zip. Actual availability depends on account approval, configuration and the specific method agreement; do not promise a method at checkout until it is enabled in your account.",
  },
  {
    question: "How quickly does Stripe pay Australian merchants?",
    answer:
      "Stripe's payout docs say the first live payout is typically scheduled within 7–14 days, depending on industry, country and risk. Later payouts follow the account schedule, and the receiving bank may add processing time. Confirm your own payout schedule in the Dashboard.",
  },
  {
    question: "Are Stripe processing fees returned on refunds?",
    answer:
      "No. Stripe's refund docs state that full and partial refunds are supported, but original processing fees are not returned. Customers typically see card refunds around 5–10 business days later, depending on their bank.",
  },
  {
    question: "What happens when a customer disputes a Stripe payment?",
    answer:
      "Stripe describes disputes as chargebacks: the issuer creates a network dispute that immediately reverses the payment, and Stripe debits the business for the payment amount and any dispute fee. The Dashboard guides the evidence response.",
  },
  {
    question: "Is Stripe Radar included for free?",
    answer:
      "Stripe AU lists Radar for fraud and abuse protection, with paid options starting at A$16.00 per month or A$0.08 per screened transaction on the AU pricing page checked 23 November 2026. Check which tier applies to your account before assuming a cost.",
  },
  {
    question: "Is there an official Stripe plugin for WooCommerce?",
    answer:
      "Yes. The WordPress.org listing for woocommerce-gateway-stripe says it is the official plugin created by Stripe and WooCommerce. The 23 November 2026 snapshot showed version 11.2.0, last updated 10 November 2026, with 700,000+ active installs and tested up to WordPress 7.1.5.",
  },
  {
    question: "Can Stripe work with Shopify in Australia?",
    answer:
      "Stripe's AU features pages list Shopify-related integrations, but Shopify availability depends on your store country, plan and whether you use Shopify Payments. Read the platform guide linked in this article and confirm in Shopify's payment settings before installing anything.",
  },
  {
    question: "Is Stripe a payment gateway or an acquirer in Australia?",
    answer:
      "Stripe presents an end-to-end payments platform with Checkout, Elements, Payment Links, Terminal and APIs. Its AU acquirer disclosure names Stripe Payments Australia Pty Ltd A.C.N. 160 180 343 as the payment method acquirer, while the Services Agreement says the contracting entity depends on account country and services. Use precise wording in your records.",
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
  ["what-stripe-is-in-australia", "What Stripe is in Australia"],
  ["pricing-that-is-public", "Public pricing"],
  ["local-payment-methods", "Local payment methods"],
  ["onboarding-and-verification", "Onboarding"],
  ["payouts-refunds-and-disputes", "Payouts, refunds and disputes"],
  ["fraud-and-security", "Fraud and security"],
  ["woocommerce-and-shopify", "WooCommerce and Shopify"],
  ["how-it-compares", "How it compares"],
  ["common-mistakes", "Common mistakes"],
  ["faq-stripe-australia", "Frequently asked questions"],
  ["official-sources", "Official sources"],
];

const JumpLinks = () => (
  <nav
    aria-label="On this page"
    className="my-6 rounded-xl border border-slate-200 bg-white p-5 text-base shadow-sm"
  >
    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-indigo-700">
      Quick jump
    </p>
    <ul className="grid gap-2 sm:grid-cols-2">
      {JUMP_LINKS.map(([id, label]) => (
        <li key={id}>
          <a
            href={`#${id}`}
            className="text-indigo-700 underline decoration-indigo-200 underline-offset-2 hover:text-indigo-950"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const StripePaymentGatewayAustraliaContent = () => (
  <main>
    <FAQJsonLd />

    <section className="relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 text-white">
      <div className="relative max-w-4xl px-6 py-16 text-center md:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-200">
          Stripe deep dive — Australia
        </p>
        <p className="mt-3 text-xl font-semibold md:text-2xl">
          Strong API platform, but confirm the domestic card rate
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
          Official AU pricing, local methods, payouts, disputes and plugin evidence checked 23 November 2026.
        </p>
      </div>
    </section>

    <article className="mx-auto max-w-3xl space-y-6 px-5 py-10 text-lg leading-relaxed text-slate-800">
      <Toc />
      <JumpLinks />

      <QuickSummary
        intro="Stripe is a full payments platform used by Australian businesses for cards, wallets, bank debits, buy now pay later and API-driven checkouts. Its public AU pages are detailed, but the displayed domestic card rate differs between two official pages, so written confirmation matters."
        points={[
          { text: "AU pricing page: 1.65% + A$0.30 domestic cards; AU payments page: 1.7% + A$0.30." },
          { text: "International cards are listed at 3.5% + A$0.30; local methods have separate rates." },
          { text: "BECS Direct Debit, PayTo, Afterpay, Klarna and Zip are listed, subject to account eligibility." },
          { text: "The WooCommerce Stripe plugin is officially created by Stripe and WooCommerce." },
        ]}
      />

      <KeyTakeaways
        title="Key takeaways"
        points={[
          "Use Australian Stripe pages only; US or global rates do not apply to this decision.",
          "Treat the 1.65% versus 1.7% domestic-rate difference as a question for Stripe.",
          "Model the cost of your actual method mix, not just the card headline rate.",
          "First payouts are typically 7–14 days; later payouts follow your account schedule.",
          "Use the cluster guides to compare Stripe with bank gateways, Square and NMI.",
        ]}
      />

      <p>
        Searches for <strong>stripe payment gateway</strong> often surface US
        pricing and generic product pages. For an Australian business, that is
        the wrong starting point. This deep dive uses Stripe's AU pages and
        official docs so the rates, methods and disclosures reflect the local
        product. All figures were checked on 23 November 2026.
      </p>
      <p>
        If you are still mapping the market, begin with our
        <Link href="/blogs/best-payment-gateways-australia" className="text-indigo-700 underline">
          {" "}
          Australian payment gateway pillar guide
        </Link>
        . For a bank-by-bank alternative, read the
        <Link href="/blogs/eway-vs-westpac-vs-nab-payment-gateway-australia" className="text-indigo-700 underline">
          {" "}
          eWAY vs Westpac vs NAB comparison
        </Link>
        .
      </p>

      <h2 id="quick-answer" className="text-2xl font-bold">
        Quick answer: is Stripe a good fit for Australian merchants?
      </h2>
      <p>
        Stripe is a strong fit if you want a developer-friendly platform, a
        wide method set and a mature WooCommerce plugin. It is less attractive
        if you need a fixed quote before you build, because two official AU pages
        display different domestic card rates and many method rates vary by
        account. Ask Stripe for a written rate card and enable only the methods
        you have confirmed.
      </p>

      <h2 id="what-stripe-is-in-australia" className="text-2xl font-bold">
        What Stripe is in Australia
      </h2>
      <p>
        Stripe is more than a hosted checkout. Its AU pages describe Checkout,
        Elements, Payment Links, invoicing, Terminal, wallets, refunds and APIs
        for custom flows. That breadth is useful, but it also means you should
        specify what you are buying: a payment page, an embedded form, a payment
        link, a point-of-sale device or an API integration.
      </p>
      <p>
        Stripe's AU acquirer disclosure names{" "}
        <strong>Stripe Payments Australia Pty Ltd A.C.N. 160 180 343</strong> as
        the payment method acquirer. Its Services Agreement overview says the
        contracting Stripe entity depends on account country and the services
        used. Keep those statements distinct: one is an acquirer disclosure, the
        other a contracting-entity rule. See the
        <ExternalLink href="https://stripe.com/au/legal/acquirer-disclosure">
          {" "}
          official acquirer disclosure
        </ExternalLink>
        .
      </p>

      <h2 id="pricing-that-is-public" className="text-2xl font-bold">
        Public pricing: what the AU pages actually say
      </h2>
      <p>
        The table separates card rates, method-specific rates and add-on costs.
        Everything is dated 23 November 2026 and should be rechecked before
        purchase.
      </p>

      <div className="my-8 w-full overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th>Charge</th>
              <th>Official figure shown</th>
              <th>Important context</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Domestic cards</td>
              <td>1.65% + A$0.30 on /au/pricing; 1.7% + A$0.30 on /au/payments</td>
              <td>Official-page conflict; confirm in Dashboard or with Stripe.</td>
            </tr>
            <tr>
              <td>International cards</td>
              <td>3.5% + A$0.30</td>
              <td>Shown on both AU pages at the check date.</td>
            </tr>
            <tr>
              <td>Setup and monthly</td>
              <td>None for Standard</td>
              <td>Add-ons such as Radar, Tax or premium services may cost extra.</td>
            </tr>
            <tr>
              <td>Stripe Radar</td>
              <td>From A$16.00/month or A$0.08 per screened transaction</td>
              <td>Paid tier shown on AU pricing page; check the tier that applies.</td>
            </tr>
            <tr>
              <td>Future pricing note</td>
              <td>"Lower pricing from 1 Apr 2027"</td>
              <td>A forward-looking note, not a current account rate.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Review the
        <ExternalLink href="https://stripe.com/au/pricing">
          {" "}
          Stripe AU pricing page
        </ExternalLink>
        and the
        <ExternalLink href="https://stripe.com/au/payments">
          {" "}
          AU payments page
        </ExternalLink>
        side by side. If you need a simple rule: do not publish a single
        domestic-rate number in your own planning until Stripe confirms which
        one applies to your account.
      </p>

      <h2 id="local-payment-methods" className="text-2xl font-bold">
        Local payment methods and their separate rates
      </h2>
      <p>
        Stripe's AU local payment methods page gives method-specific prices.
        These are not covered by the card headline rate.
      </p>
      <ul className="list-disc space-y-3 pl-6">
        <li>Alipay: 2.9% + A$0.30</li>
        <li>WeChat Pay: 2.9% + A$0.30</li>
        <li>PayTo: 1% + A$0.30</li>
        <li>Australia BECS Direct Debit: 1% + A$0.30</li>
        <li>Afterpay: 6% + A$0.30</li>
        <li>Klarna AU/NZ: 4.99% + A$0.55</li>
        <li>Zip: 5.49% + A$0.30</li>
      </ul>
      <p>
        Availability depends on account approval and method agreements. A logo
        on a pricing page is not a promise that the method can be switched on
        for your business category. See the
        <ExternalLink href="https://stripe.com/au/pricing/local-payment-methods">
          {" "}
          official local method pricing
        </ExternalLink>
        and the
        <ExternalLink href="https://stripe.com/au/payments/payment-methods">
          {" "}
          AU payment methods page
        </ExternalLink>
        .
      </p>

      <h2 id="onboarding-and-verification" className="text-2xl font-bold">
        Onboarding and verification
      </h2>
      <p>
        Stripe's activation docs describe a straightforward sequence: create an
        account, complete the checklist and verify the business in the
        Dashboard. Stripe may request additional information as services are
        used. The documentation ties KYC collection to regulatory and
        financial-partner obligations.
      </p>
      <p>
        Practically, complete onboarding before you build the checkout. If a
        method or service is gated by verification, you do not want to discover
        that during a launch. Keep your ABN, business details, bank details and
        beneficial-owner information ready.
      </p>

      <h2 id="payouts-refunds-and-disputes" className="text-2xl font-bold">
        Payouts, refunds and disputes
      </h2>
      <h3 id="payouts" className="text-xl font-semibold">
        Payouts
      </h3>
      <p>
        Stripe docs say the first live payout is typically scheduled within
        7–14 days, depending on industry, country and risk. Later payouts follow
        the account payout schedule. The bank can add time after Stripe sends
        funds, so a Stripe payout date is not always the date money appears in
        your account.
      </p>
      <h3 id="refunds" className="text-xl font-semibold">
        Refunds
      </h3>
      <p>
        Full and partial refunds are available through the Dashboard or API.
        Original processing fees are not returned. Refunds use the available
        balance, and customers typically see card refunds around 5–10 business
        days later depending on their bank.
      </p>
      <h3 id="disputes" className="text-xl font-semibold">
        Disputes
      </h3>
      <p>
        Stripe defines a dispute as a chargeback. The issuer creates a network
        dispute that immediately reverses the payment; Stripe debits the
        business for the payment amount and any dispute fee, and the Dashboard
        guides the evidence response. Budget for disputes separately from your
        transaction rate.
      </p>

      <h2 id="fraud-and-security" className="text-2xl font-bold">
        Fraud and security tools
      </h2>
      <p>
        Stripe AU lists Radar for AI-powered fraud and abuse protection, with
        paid options shown from A$16.00 per month or A$0.08 per screened
        transaction. Checkout also supports CVC and AVS checks according to the
        AU features page. These tools reduce risk; they do not remove your duty
        to monitor payments or respond to disputes.
      </p>
      <p>
        PCI DSS v4.0.1 was the current non-archived version in PCI SSC's library
        at the check date. Validation requirements are set by payment brands,
        acquirers or programme managers, not PCI SSC. A provider saying it is
        PCI compliant does not determine your merchant validation form.
      </p>

      <h2 id="woocommerce-and-shopify" className="text-2xl font-bold">
        WooCommerce and Shopify integration
      </h2>
      <p>
        The WordPress.org listing for <code>woocommerce-gateway-stripe</code>{" "}
        explicitly says it is the official plugin created by Stripe and
        WooCommerce. The 23 November 2026 API snapshot showed version 11.2.0,
        last updated 10 November 2026, 700,000+ active installs and tested up to
        WordPress 7.1.5. That is strong evidence of plugin ownership, but you
        still need to test your exact checkout and plugin stack.
      </p>
      <p>
        Stripe's AU features page lists WooCommerce and WordPress among
        integrations, and Shopify-related ecosystem options. Shopify support
        depends on your store country, plan and use of Shopify Payments. For
        the full platform decision, see our
        <Link href="/blogs/payment-gateways-shopify-woocommerce-australia" className="text-indigo-700 underline">
          {" "}
          Shopify and WooCommerce Australia guide
        </Link>
        . If you want a side-by-side brand view, compare the
        <Link href="/blogs/square-payment-gateway-australia" className="text-indigo-700 underline">
          {" "}
          Square Australia deep dive
        </Link>
        next.
      </p>

      <h2 id="how-it-compares" className="text-2xl font-bold">
        How Stripe compares in this cluster
      </h2>
      <p>
        Against bank gateways, Stripe offers a broader API and method set but
        less certainty from public pricing. Against Square, Stripe is more
        developer-led, while Square bundles POS, online and BNPL in a simpler
        product family. Against NMI, Stripe is a direct platform you can sign up
        for, whereas NMI is typically reached through a partner.
      </p>
      <p>
        Use the
        <Link href="/blogs/best-payment-gateways-australia" className="text-indigo-700 underline">
          {" "}
          pillar comparison
        </Link>
        for the wider shortlist, the
        <Link href="/blogs/eway-vs-westpac-vs-nab-payment-gateway-australia" className="text-indigo-700 underline">
          {" "}
          local bank comparison
        </Link>
        for eWAY, Westpac and NAB detail, and the
        <Link href="/blogs/nmi-payment-gateway-australia" className="text-indigo-700 underline">
          {" "}
          NMI explainer
        </Link>
        for the reseller model.
      </p>

      <h2 id="common-mistakes" className="text-2xl font-bold">
        Common mistakes when evaluating Stripe in Australia
      </h2>
      <ul className="list-disc space-y-3 pl-6">
        <li>
          <strong>Using US or global rates.</strong> Generic Stripe pages often
          show US pricing. An Australian decision must use the AU pricing,
          payments and local-method pages checked on the date of your decision.
        </li>
        <li>
          <strong>Picking one domestic card rate.</strong> Two official AU pages
          displayed different figures on 23 November 2026. Ask Stripe to confirm
          the rate for your account instead of averaging or guessing.
        </li>
        <li>
          <strong>Treating method logos as guaranteed availability.</strong>{" "}
          BECS, PayTo, Afterpay, Klarna and Zip are subject to account approval,
          configuration and method agreements. Enable only what your Dashboard
          actually supports.
        </li>
        <li>
          <strong>Forgetting refund economics.</strong> Stripe supports full and
          partial refunds, but the original processing fee is not returned. Model
          refunds as a cost, not a reversal of revenue.
        </li>
        <li>
          <strong>Confusing payout timing with bank arrival.</strong> Stripe docs
          say the first live payout is typically 7–14 days and later payouts
          follow the account schedule. The receiving bank can add more time.
        </li>
        <li>
          <strong>Assuming Radar is free.</strong> The AU pricing page showed
          paid Radar options from A$16.00 per month or A$0.08 per screened
          transaction. Confirm the tier before adding it to your budget.
        </li>
        <li>
          <strong>Reading plugin metadata as a compatibility guarantee.</strong>{" "}
          A “tested up to” field is a snapshot, not proof that your theme,
          checkout blocks and other plugins will work together.
        </li>
        <li>
          <strong>Assuming hosted checkout removes all PCI work.</strong> It can
          reduce scope, but validation requirements come from the payment brand,
          acquirer or programme manager.
        </li>
      </ul>
      <p>
        Most of these mistakes are easy to avoid with a short written due
        diligence checklist. Ask for the rate card, method list, dispute fee,
        payout schedule and plugin ownership in one document, then test a real
        payment before launch. If you are also comparing platform-native
        options, the{" "}
        <Link href="/blogs/payment-gateways-shopify-woocommerce-australia" className="text-indigo-700 underline">
          {" "}
          Shopify and WooCommerce Australia guide
        </Link>
        explains why a processor's availability does not by itself settle the
        checkout decision.
      </p>

      <h2 id="faq-stripe-australia" className="text-2xl font-bold">
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
      <aside className="rounded-xl border-l-4 border-indigo-700 bg-indigo-50 p-5 text-base">
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <ExternalLink href="https://stripe.com/au/pricing">Stripe AU pricing</ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://stripe.com/au/payments">Stripe AU payments</ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://stripe.com/au/pricing/local-payment-methods">
              Stripe AU local method pricing
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://stripe.com/au/legal/acquirer-disclosure">
              Stripe AU acquirer disclosure
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://docs.stripe.com/payouts">Stripe payouts docs</ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://docs.stripe.com/refunds">Stripe refunds docs</ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://wordpress.org/plugins/woocommerce-gateway-stripe/">
              Official WooCommerce Stripe plugin
            </ExternalLink>
          </li>
        </ul>
      </aside>

      <h2 id="final-verdict" className="text-2xl font-bold">
        Final verdict
      </h2>
      <p>
        Stripe is a capable Australian payments platform with broad method
        coverage and the clearest official WooCommerce plugin in this cluster.
        The decision hinge is pricing certainty: get the domestic card rate,
        method rates and dispute fees in writing before you commit. If you want
        a simpler bundled POS-and-online product, compare Square. If you are
        buying through a bank or SaaS partner, compare the local and NMI guides.
      </p>
      <p className="text-sm text-slate-500">
        Reviewed 23 November 2026. Prices and plugin data are point-in-time
        snapshots. This is general information, not legal, tax or financial
        advice. Confirm all terms with Stripe.
      </p>
    </article>
  </main>
);

const article = {
  slug: "stripe-payment-gateway-australia",
  title: "Stripe Payment Gateway in Australia: Fees, Features and Setup Guide (2026)",
  author: "RankStack",
  date: "2026-11-23",
  updatedDate: "2026-11-23",
  type: "Guide",
  categories: ["Payments", "Australia"],
  readingTime: "13 min read",
  description:
    "Stripe payment gateway in Australia: official AU card rates, BECS, PayTo, Afterpay, Klarna, payouts, disputes, Radar pricing and official WooCommerce plugin evidence, checked 23 Nov 2026.",
  imageUrl: "/blog-banner-1200x675.webp",
  keywords: [
    "stripe payment gateway",
    "stripe payment gateway australia",
    "stripe australia pricing",
    "stripe au payments",
    "stripe checkout australia",
    "stripe woocommerce australia",
    "Stripe BECS Direct Debit",
    "Stripe PayTo",
    "Stripe Radar Australia",
    "Stripe Australia fees",
  ],
  content: StripePaymentGatewayAustraliaContent,
};

export default article;
