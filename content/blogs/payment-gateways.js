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
    question: "What is a payment gateway?",
    answer:
      "A payment gateway is the technology that securely captures and routes payment data from a checkout, payment link, virtual terminal, or point of sale into the processing flow. Many vendors bundle gateway, processing, and payout services into one product.",
  },
  {
    question: "Is a payment gateway the same as a payment processor?",
    answer:
      "Not exactly. The gateway handles the secure handoff of payment data, while the processor helps authorise, route, and settle the transaction. The terms overlap in practice: the PCI Security Standards Council notes that payment processor is sometimes used to mean payment gateway or payment service provider.",
  },
  {
    question: "What is a merchant account?",
    answer:
      "A merchant account is an account that holds card proceeds before funds move to a business bank account. Some all-in-one providers include one in their product; gateway-only plans can connect to a merchant account you already have.",
  },
  {
    question: "What is an acquirer?",
    answer:
      "An acquirer, acquiring bank, or merchant bank enables card acceptance and settlement for merchants. PCI SSC notes that the exact definition can depend on card-brand rules, so ask your provider which entity is the acquirer in your setup.",
  },
  {
    question: "Do I need a separate merchant account?",
    answer:
      "It depends on the provider and plan. All-in-one services often bundle account, gateway, and processing. Gateway-only products such as Authorize.Net's gateway-only plan are designed to connect to an existing merchant account. Confirm the structure in writing before you sign.",
  },
  {
    question: "What is the current PCI DSS version?",
    answer:
      "PCI SSC's Document Library features PCI DSS v4.0.1. PCI DSS v4.0 was retired on 31 December 2024, and new v4.0.1 requirements had an effective date of 31 March 2025. Your validation obligations are determined by your acquirer and the payment brands, not by PCI SSC itself.",
  },
  {
    question: "Does a hosted checkout remove all PCI responsibility?",
    answer:
      "It can reduce the card data your systems touch, but it does not automatically remove every obligation. Ask your acquirer or payment brand which validation form applies to your integration. A provider saying it is PCI compliant is not the same as a determination of your merchant validation level.",
  },
  {
    question: "What is 3-D Secure?",
    answer:
      "EMV 3-D Secure is an authentication layer that lets issuers and merchants exchange transaction and device data to help authenticate a cardholder and reduce card-not-present fraud. It does not eliminate fraud or guarantee that chargebacks will not happen.",
  },
  {
    question: "Why is card-not-present fraud different from in-person fraud?",
    answer:
      "The Federal Reserve connects widespread EMV chip security for in-person payments with a shift in fraud toward remote, card-not-present channels. Liability and fraud rules still depend on the card networks, issuer, and your agreement.",
  },
  {
    question: "Are ACH payments the same as card payments?",
    answer:
      "No. ACH moves funds between bank accounts through the ACH Network, while card payments use card networks and card credentials. Pay by Bank can use ACH or faster payment rails, depending on the product.",
  },
  {
    question: "What is a chargeback?",
    answer:
      "A chargeback is a reversal of a card charge, often after a cardholder dispute. Consumer dispute rights and timing are different from merchant dispute and representment rules, so do not treat consumer guidance as a complete merchant playbook.",
  },
  {
    question: "How much do payment gateways cost in the US?",
    answer:
      "Common models include flat per-transaction pricing, monthly gateway fees, interchange-plus pricing, and separate charges for ACH, international cards, currency conversion, or chargebacks. Published rates change; date-stamp every figure and verify it with the provider before purchase.",
  },
  {
    question: "Which payment gateways work with WooCommerce?",
    answer:
      "Verified plugin-directory options include Stripe, PayPal, Square, Authorize.Net, and WooPayments. Check the plugin author, last-updated date, tested version, and provider documentation before treating any plugin as official.",
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
  ["what-a-payment-gateway-does", "What a gateway does"],
  ["gateway-processor-merchant-account-and-acquirer", "Gateway, processor, merchant account, acquirer"],
  ["main-types-of-payment-gateways", "Main gateway types"],
  ["us-payment-methods-and-rails", "US methods and rails"],
  ["us-provider-landscape", "Provider landscape"],
  ["security-compliance-and-disputes", "Security and disputes"],
  ["how-to-choose-a-payment-gateway", "How to choose"],
  ["woocommerce-and-cms-integrations", "WooCommerce integrations"],
  ["regional-guides", "Regional guides"],
  ["faq-payment-gateways", "Frequently asked questions"],
  ["official-sources-for-us-payment-gateways", "Official sources"],
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

const PaymentGatewaysUsContent = () => (
  <main>
    <FAQJsonLd />

    <section className="relative flex w-full items-center justify-center overflow-hidden bg-slate-950 text-white">
      <img
        src="/blog-banner-1200x675.webp"
        alt="Digital payment and checkout interfaces on a laptop and phone"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="relative max-w-4xl px-6 py-16 text-center md:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-200">
          US payments guide
        </p>
        <p className="mt-3 text-xl font-semibold md:text-2xl">
          Understand the rails, the terms, and the real costs
        </p>
      </div>
    </section>

    <article className="mx-auto max-w-3xl space-y-6 px-5 py-10 text-lg leading-relaxed text-slate-800">
      <Toc />
      <JumpLinks />

      <QuickSummary
        intro="Payment gateways are the front door to online payments, but the label covers several different jobs. For US businesses, the right choice depends on the payment methods you need, whether you want a bundled provider or a gateway-only connection, and how you handle PCI validation and disputes."
        points={[
          { text: "Gateway, processor, acquirer, and merchant account are related but not interchangeable terms." },
          { text: "Cards, ACH, Pay by Bank, wallets, and BNPL use different rails and fee structures." },
          { text: "PCI DSS v4.0.1 is current; your acquirer and payment brands determine validation." },
          { text: "Published prices are snapshots, not permanent offers, and need provider confirmation." },
        ]}
      />

      <KeyTakeaways
        title="Key takeaways"
        points={[
          "Map the payment methods your customers use before comparing provider brands.",
          "Decide whether you want an all-in-one platform or a gateway that connects to an existing merchant account.",
          "Ask who is the acquirer and which PCI validation your integration requires.",
          "Compare total cost: transaction rate, monthly fee, ACH, international cards, chargebacks, and currency conversion.",
          "Use our regional guides for Pakistan and Kenya when your business operates outside the US.",
        ]}
      />

      <p>
        Search for payment gateways and you will find a crowded mix of provider pages,
        affiliate lists, and glossaries that disagree on basic terms. That is unsurprising:
        the industry uses several labels for overlapping functions. This guide keeps the
        definitions practical, anchors security claims in primary standards, and date-stamps
        any pricing taken from provider websites.
      </p>
      <p>
        It is written for US businesses choosing a gateway for a website, online store,
        invoice flow, or virtual terminal. If you need a Pakistan-specific comparison, see our
        <Link href="/blogs/payment-gateway-in-pakistan" className="text-indigo-700 underline">
          {" "}
          payment gateway in Pakistan guide
        </Link>
        . For East African markets, see the
        <Link href="/blogs/kenya-payment-gatway" className="text-indigo-700 underline">
          {" "}
          Kenya and Africa small-business gateway guide
        </Link>
        .
      </p>

      <h2 id="what-a-payment-gateway-does" className="text-2xl font-bold">
        What a payment gateway does
      </h2>
      <p>
        A payment gateway securely captures payment information and moves it into the
        processing flow. In an ecommerce checkout, it may display a hosted form, collect card
        details through an embedded field, redirect to a wallet, or receive data from a payment
        API. It then returns an authorisation result so the store knows whether to place the
        order. Gateways also commonly expose reporting, refund, and webhook tools.
      </p>
      <p>
        The useful question is not whether a provider calls itself a gateway. It is what the
        product actually does: does it collect sensitive data for you, connect to a processor,
        include an acquirer relationship, handle payouts, and provide reconciliation reports?
        A hosted checkout and a custom API integration can both be called gateways, but they
        create very different workloads for your team.
      </p>

      <h2 id="gateway-processor-merchant-account-and-acquirer" className="text-2xl font-bold">
        Gateway, processor, merchant account, and acquirer
      </h2>
      <p>
        These four terms cause more confusion than almost any other part of payments. The PCI
        Security Standards Council notes that payment processor is sometimes used to mean
        payment gateway or payment service provider, so do not assume every vendor uses the
        words the same way. Use this working model:
      </p>
      <ul className="list-disc space-y-3 pl-6">
        <li>
          <strong>Gateway:</strong> the secure front end that captures and routes payment
          data, then communicates a result back to your site or system.
        </li>
        <li>
          <strong>Processor:</strong> the service that helps authorise and route transactions
          through the relevant network and supports the settlement flow.
        </li>
        <li>
          <strong>Merchant account:</strong> an account that holds card proceeds before funds
          are paid out to your business bank account.
        </li>
        <li>
          <strong>Acquirer:</strong> the acquiring bank or merchant bank that enables card
          acceptance and settlement. PCI SSC notes that card-brand rules can affect the exact
          definition.
        </li>
      </ul>
      <p>
        Many modern providers bundle several of these roles. Stripe, PayPal, Square, and
        Adyen, for example, present integrated platforms rather than a bare gateway box.
        Authorize.Net offers both an all-in-one plan and a gateway-only plan for existing
        merchant accounts. Neither model is universally better; bundled products reduce the
        number of vendors you manage, while gateway-only products can preserve an existing
        acquiring relationship.
      </p>
      <p>
        For a definition sourced from the standards body itself, see the PCI SSC
        <ExternalLink href="https://www.pcisecuritystandards.org/glossary/payment-processor">
          {" "}
          payment processor glossary entry
        </ExternalLink>
        . For the merchant-account side, Adyen and Chase both publish accessible explainers,
        but remember that they are commercial sources.
      </p>

      <h2 id="main-types-of-payment-gateways" className="text-2xl font-bold">
        Main types of payment gateways
      </h2>
      <p>
        Gateway products usually fall into four practical categories. The boundary between
        them is blurry, but the categories help you compare implementation effort.
      </p>
      <ol className="list-decimal space-y-3 pl-6">
        <li>
          <strong>Hosted checkout.</strong> The provider hosts the payment page or form.
          Implementation is faster and sensitive data stays largely outside your systems, but
          you have less control over the look and feel.
        </li>
        <li>
          <strong>Embedded or API gateway.</strong> You build the checkout experience and call
          the provider's APIs or SDKs. This gives more control but increases engineering and
          security responsibilities.
        </li>
        <li>
          <strong>Payment links and invoicing.</strong> The provider generates a hosted URL or
          invoice. Useful for service businesses and remote sales, though the buyer experience
          differs from a full storefront checkout.
        </li>
        <li>
          <strong>Point-of-sale and virtual terminal.</strong> Card-present terminals and
          manually keyed order entry are still part of many US businesses. Ask how online and
          in-person transactions report together.
        </li>
      </ol>
      <p>
        A single provider may support all four. The choice matters because it determines who
        handles card data, which PCI validation path may apply, and how much custom code you
        must maintain.
      </p>

      <h2 id="us-payment-methods-and-rails" className="text-2xl font-bold">
        US payment methods and rails
      </h2>
      <p>
        A payment method is what the customer uses. A rail is the underlying network that
        moves the money. Confusing the two leads to bad comparisons.
      </p>
      <h3 id="cards-and-card-not-present" className="text-xl font-semibold">
        Cards and card-not-present payments
      </h3>
      <p>
        Credit and debit cards remain central to online checkout. When the card is not
        physically present, issuers face more uncertainty, which is why EMV 3-D Secure and
        fraud screening matter. The Federal Reserve has connected widespread EMV chip security
        for in-person payments with increased relative importance of card-not-present fraud.
        Its 2023 interchange report lists 34.61 billion card-not-present transactions valued
        at $2,213.79 billion. See the
        <ExternalLink href="https://www.federalreserve.gov/paymentsystems/2023-interchange-fee.htm">
          {" "}
          Federal Reserve's 2023 interchange report
        </ExternalLink>
        .
      </p>
      <h3 id="ach-and-pay-by-bank" className="text-xl font-semibold">
        ACH and Pay by Bank
      </h3>
      <p>
        ACH payments move funds between US bank accounts through the ACH Network. Nacha says
        ACH reaches all US bank and credit-union accounts. Card payments use card networks and
        card credentials instead. Pay by Bank is a broader label that can use ACH or faster
        payment rails depending on the product. Nacha sets rules and supports the network; it
        does not itself process each payment. Review
        <ExternalLink href="https://www.nacha.org/content/how-ach-payments-work">
          {" "}
          Nacha's explanation of how ACH works
        </ExternalLink>
        .
      </p>
      <h3 id="wallets-and-buy-now-pay-later" className="text-xl font-semibold">
        Wallets and buy now, pay later
      </h3>
      <p>
        Apple Pay, Google Pay, PayPal, Venmo, and buy now, pay later options sit on top of
        existing funding methods. Availability depends on the provider, device, customer
        account, and merchant configuration. Do not assume a logo on a provider's marketing
        page means every option is enabled for your account.
      </p>

      <h2 id="us-provider-landscape" className="text-2xl font-bold">
        US provider landscape: a dated comparison
      </h2>
      <p>
        The figures below come from official provider pages checked on 22 November 2026.
        They are snapshots for shortlisting, not quotes. Verify every rate with the provider
        before you sign.
      </p>

      <div className="my-8 w-full overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Product model</th>
              <th>Official pricing shown at check date</th>
              <th>Methods and notes</th>
              <th>Integration angle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Stripe</td>
              <td>End-to-end payments platform.</td>
              <td>Domestic cards 2.9% + 30¢; manually entered +0.5%; international +1.5%; currency conversion +1%; ACH Direct Debit 0.8% with $5 cap.</td>
              <td>Cards, wallets, ACH Direct Debit, BNPL and more, per Stripe's method docs.</td>
              <td>APIs, Checkout, Payment Links; official Stripe and WooCommerce plugin.</td>
            </tr>
            <tr>
              <td>PayPal</td>
              <td>Business account and payment provider.</td>
              <td>Card processing from 2.89% + $0.29; PayPal and Venmo 3.49% + $0.49; PayPal Checkout cards 2.99% + $0.49; Expanded Checkout cards 2.89% + $0.29.</td>
              <td>PayPal, Venmo in the US, cards, wallets, Pay Later; availability varies.</td>
              <td>Checkout APIs and WooCommerce PayPal Payments plugin.</td>
            </tr>
            <tr>
              <td>Square</td>
              <td>Payments and business platform with POS.</td>
              <td>Free plan $0 per month plus fees; in-person 2.6% + 15¢; online API 2.9% + 30¢; keyed 3.5% + 15¢; invoices 3.3% + 30¢.</td>
              <td>Cards, Apple Pay, Google Pay, ACH invoices, Afterpay.</td>
              <td>eCommerce API and WooCommerce Square plugin.</td>
            </tr>
            <tr>
              <td>Authorize.Net</td>
              <td>Gateway with all-in-one or gateway-only plans.</td>
              <td>$25 per month; all-in-one 2.9% + 30¢; gateway-only 10¢ per transaction plus 10¢ daily batch fee.</td>
              <td>Cards, eCheck, Apple Pay, Google Pay, digital wallets; eligibility applies.</td>
              <td>REST APIs, SDKs, shopping-cart plugins.</td>
            </tr>
            <tr>
              <td>Adyen</td>
              <td>Global PSP positioned as processor, provider, and acquirer.</td>
              <td>Fixed processing fee plus method-determined fee; no setup or monthly fees listed on generic pricing page.</td>
              <td>200+ methods including cards, wallets, bank transfers, BNPL; confirm US specifics.</td>
              <td>Drop-in, Hosted Checkout, Components, APIs.</td>
            </tr>
            <tr>
              <td>PayPal Braintree</td>
              <td>End-to-end payment platform.</td>
              <td>Cards and third-party wallets 2.89% + $0.29; Venmo 3.49% + $0.49; ACH 0.75% with $5 cap; chargeback $15. Fees page last updated 7 May 2026.</td>
              <td>Cards, PayPal, Venmo, ACH, local methods, 3DS, fraud tools.</td>
              <td>Client and server SDKs, GraphQL, vaulting.</td>
            </tr>
            <tr>
              <td>Amazon Pay</td>
              <td>Digital checkout using methods stored in an Amazon account.</td>
              <td>Domestic web and mobile 2.9% + $0.30 authorisation fee; cross-border 3.9% + $0.30; disputed chargeback $20.</td>
              <td>Credit and debit cards; Amazon gift cards are not accepted for third-party purchases.</td>
              <td>Amazon Pay button and API; partner integrations.</td>
            </tr>
            <tr>
              <td>Chase Payment Solutions</td>
              <td>Merchant services with Authorize.Net-powered ecommerce gateway.</td>
              <td>Ecommerce 2.9% + 25¢; keyed or invoiced 3.5% + 10¢; monthly fee from $9.95; custom pricing available.</td>
              <td>Cards, digital wallets, invoicing, virtual terminal.</td>
              <td>Shopping-cart integrations and Authorize.Net APIs.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        A lower headline rate is not automatically cheaper. Compare the full bundle: monthly
        fees, ACH pricing, international cards, currency conversion, chargeback fees, refund
        behaviour, payout timing, and any setup or early-termination terms. Also confirm
        whether the quoted rate applies to your business category and transaction profile.
      </p>

      <h2 id="security-compliance-and-disputes" className="text-2xl font-bold">
        Security, compliance, and disputes
      </h2>
      <h3 id="pci-dss-version-and-responsibility" className="text-xl font-semibold">
        PCI DSS version and responsibility
      </h3>
      <p>
        PCI SSC's Document Library features PCI DSS v4.0.1. PCI DSS v4.0 was retired on 31
        December 2024, and new v4.0.1 requirements had an effective date of 31 March 2025.
        PCI SSC applies across the payment ecosystem, but it does not decide each merchant's
        validation level. Payment brands and acquirers do. Ask them which validation form your
        integration requires. See the
        <ExternalLink href="https://www.pcisecuritystandards.org/document_library">
          {" "}
          PCI SSC Document Library
        </ExternalLink>
        and
        <ExternalLink href="https://www.pcisecuritystandards.org/merchants/">
          {" "}
          PCI SSC information for merchants
        </ExternalLink>
        .
      </p>
      <h3 id="3ds-fraud-and-card-not-present" className="text-xl font-semibold">
        3DS, fraud, and card-not-present risk
      </h3>
      <p>
        EMVCo describes EMV 3-D Secure as an authentication layer that allows issuers and
        merchants to exchange data to help authenticate cardholders and reduce card-not-present
        fraud. It is a tool, not a guarantee. Do not tell customers it eliminates fraud or
        chargebacks. Review the
        <ExternalLink href="https://www.emvco.com/emv-technologies/3-d-secure">
          {" "}
          EMVCo 3-D Secure overview
        </ExternalLink>
        .
      </p>
      <h3 id="chargebacks-and-consumer-rights" className="text-xl font-semibold">
        Chargebacks and consumer rights
      </h3>
      <p>
        The CFPB defines a chargeback as a reversal of a card charge, often after a cardholder
        dispute. Its guidance also describes consumer notice timing in specified billing-error
        cases. Those consumer rights are not the same as merchant representment rules. Build
        your own dispute workflow from your acquirer's and provider's documentation.
      </p>

      <h2 id="how-to-choose-a-payment-gateway" className="text-2xl font-bold">
        How to choose a payment gateway
      </h2>
      <ol className="list-decimal space-y-3 pl-6">
        <li>List the payment methods and devices your customers actually use.</li>
        <li>Decide between an all-in-one platform and a gateway-only connection.</li>
        <li>Confirm who the acquirer is and how payouts reach your bank account.</li>
        <li>Ask which PCI validation applies to your integration.</li>
        <li>Compare total cost, not just the headline transaction percentage.</li>
        <li>Check refunds, chargeback fees, payout timing, and reporting exports.</li>
        <li>Verify platform compatibility, including CMS or ecommerce plugins.</li>
        <li>Test sandbox payments, failed authorisations, refunds, and webhooks.</li>
      </ol>
      <p>
        A one-page scorecard with pass, fail, and unknown columns works well. Anything unknown
        becomes a written question. If a provider's answer conflicts with its public pricing
        page, ask for the current terms in writing before you proceed.
      </p>

      <h2 id="woocommerce-and-cms-integrations" className="text-2xl font-bold">
        WooCommerce and CMS integrations
      </h2>
      <p>
        WooPayments is officially available to US businesses located in the 50 states, the
        District of Columbia, and Puerto Rico. WooCommerce also publishes an official US page
        describing cards, Apple Pay, 135+ currencies, and optional instant payouts. Check the
        <ExternalLink href="https://woocommerce.com/document/woopayments/compatibility/countries">
          {" "}
          official country compatibility list
        </ExternalLink>
        before assuming availability.
      </p>
      <p>
        Other plugin-directory options include Stripe, PayPal, Square, and Authorize.Net.
        Verify the plugin slug, author, last-updated date, and tested version rather than
        relying on a blog's label of official. For a detailed WooCommerce decision framework,
        see our
        <Link href="/blogs/best-payment-gateway-woocommerce-pakistan" className="text-indigo-700 underline">
          {" "}
          WooCommerce payment gateway guide for Pakistan
        </Link>
        , which covers plugin verification steps that apply in any market.
      </p>

      <h2 id="regional-guides" className="text-2xl font-bold">
        Regional guides in this cluster
      </h2>
      <p>
        Payment method availability is local. A gateway that is excellent for US cards and ACH
        may not support mobile money, local wallets, or local regulatory requirements
        elsewhere. Use these guides when your business crosses borders:
      </p>
      <ul className="list-disc space-y-3 pl-6">
        <li>
          <Link href="/blogs/payment-gateway-in-pakistan" className="text-indigo-700 underline">
            Payment gateway in Pakistan
          </Link>{" "}
          — SBP context, JazzCash, Easypaisa, PayFast, XPay, and Raast.
        </li>
        <li>
          <Link href="/blogs/best-payment-gateway-woocommerce-pakistan" className="text-indigo-700 underline">
            Best payment gateway for WooCommerce in Pakistan
          </Link>{" "}
          — plugin evidence, checkout compatibility, and local integration checks.
        </li>
        <li>
          <Link href="/blogs/kenya-payment-gatway" className="text-indigo-700 underline">
            Kenya payment gateway options for small business websites
          </Link>{" "}
          — M-Pesa, Pesapal, Flutterwave, Paystack, and wider African market context.
        </li>
      </ul>
      <p>
        Read this US guide for the vocabulary, security model, and cost framework, then apply
        the regional guide for the market you actually sell into.
      </p>

      <h2 id="implementation-checklist" className="text-2xl font-bold">
        Implementation checklist
      </h2>
      <ol className="list-decimal space-y-3 pl-6">
        <li>Confirm business eligibility, documents, and payout bank details.</li>
        <li>Get written pricing for your method mix and expected volume.</li>
        <li>Identify the acquirer and ask about PCI validation requirements.</li>
        <li>Choose hosted, embedded, link-based, or POS integration.</li>
        <li>Configure webhooks with signature verification and retry handling.</li>
        <li>Test authorisation, decline, duplicate submission, refund, and dispute flows.</li>
        <li>Reconcile a small live payout against the provider's report.</li>
        <li>Review fraud rules and chargeback evidence before scaling traffic.</li>
      </ol>

      <h2 id="faq-payment-gateways" className="text-2xl font-bold">
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

      <h2 id="official-sources-for-us-payment-gateways" className="text-2xl font-bold">
        Official sources
      </h2>
      <aside className="rounded-xl border-l-4 border-indigo-700 bg-indigo-50 p-5 text-base">
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <ExternalLink href="https://www.pcisecuritystandards.org/document_library">
              PCI SSC Document Library
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.pcisecuritystandards.org/merchants/">
              PCI SSC information for merchants
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.federalreserve.gov/paymentsystems/2023-interchange-fee.htm">
              Federal Reserve 2023 interchange report
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.nacha.org/content/how-ach-payments-work">
              Nacha: how ACH payments work
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-chargeback-en-1969">
              CFPB: what is a chargeback
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.emvco.com/emv-technologies/3-d-secure">
              EMVCo: EMV 3-D Secure
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://woocommerce.com/document/woopayments/compatibility/countries">
              WooPayments country compatibility
            </ExternalLink>
          </li>
        </ul>
      </aside>

      <h2 id="final-verdict" className="text-2xl font-bold">
        Final verdict
      </h2>
      <p>
        There is no single best answer to the query payment gateways. The right product is the
        one that matches your payment methods, platform, risk profile, and accounting workflow.
        Use the definitions and cost framework here to build a shortlist, then verify pricing,
        PCI obligations, and payout terms directly with the provider and your acquirer.
      </p>
      <p className="text-sm text-slate-500">
        Reviewed November 22, 2026. Pricing was checked on that date and can change. This is
        general information, not legal, tax, or financial advice.
      </p>
    </article>
  </main>
);

const article = {
  slug: "payment-gateways",
  title: "Payment Gateways: A Complete Guide for US Businesses (2026)",
  author: "RankStack",
  date: "2026-11-22",
  updatedDate: "2026-11-22",
  type: "Guide",
  categories: ["Payments", "United States"],
  readingTime: "12 min read",
  description:
    "Learn how payment gateways work in the US: gateway vs processor, merchant accounts, PCI DSS v4.0.1, ACH and cards, dated provider pricing, WooCommerce options, and a practical selection checklist.",
  imageUrl: "/blog-banner-1200x675.webp",
  keywords: [
    "payment gateways",
    "payment gateway",
    "online payment gateways",
    "best payment gateways for small business",
    "payment gateway for ecommerce",
    "credit card payment gateway",
    "payment processor vs gateway",
    "merchant account",
    "ACH payments",
    "PCI DSS v4.0.1",
    "3-D Secure",
    "WooPayments United States",
  ],
  content: PaymentGatewaysUsContent,
};

export default article;
