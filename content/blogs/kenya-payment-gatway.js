import React from "react";
import Link from "next/link";
import KeyTakeaways from "@/components/KeyTakeaways";
import QuickSummary from "@/components/QuickSummary";
import Toc from "@/components/Toc";
import ProviderScorecard from "@/components/ProviderScorecard";

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

const REVIEWED = "22 November 2026";

const FAQ_ITEMS = [
  {
    question: "Is M-Pesa itself a payment gateway?",
    answer:
      "No. M-Pesa is a mobile-money service. Merchants accept it through a Paybill or Till, Safaricom's Daraja APIs, or a payment service provider. The Central Bank of Kenya lists Safaricom both as a mobile-money issuer and as a provider authorised to facilitate merchant payments.",
  },
  {
    question: "Which providers in this guide appear in the CBK PSP directory?",
    answer:
      "In the CBK Directory of Authorized Payment Service Providers as at 10 August 2026, Safaricom PLC, Pesapal Limited, and Paystack Payments Kenya Limited were listed. Always recheck the current CBK directory before you rely on a licence claim.",
  },
  {
    question: "Is Flutterwave licensed by the Central Bank of Kenya?",
    answer:
      "Flutterwave was not found in the CBK directory checked for this article. The accurate wording is that it was not listed in that directory as at 10 August 2026. Do not state that it is licensed or unlicensed without a current primary source.",
  },
  {
    question: "Can I accept M-Pesa on a WordPress website?",
    answer:
      "Yes, in principle through an API integration, a payment service provider, or a plugin. However, no Safaricom-authored M-Pesa plugin was found on WordPress.org. Several third-party plugins exist, and one popular M-Pesa plugin actually targets Mozambique rather than Kenya. Verify the provider, country, and maintenance status first.",
  },
  {
    question: "Does Pesapal have an official WooCommerce plugin?",
    answer:
      "Pesapal's developer site lists a WooCommerce extension credited to Paul Kevin and Pesapal. We did not find a Pesapal-authored plugin on WordPress.org. Treat the developer-site listing as the provider's own distribution channel and confirm support before installing.",
  },
  {
    question: "What are Flutterwave's Kenya fees?",
    answer:
      "Flutterwave's Kenya pricing page, checked 22 November 2026, listed 3.2% for local cards, 2.9% for local wallets and mobile money, 4.8% for international payments, and KES 100 per transfer, excluding VAT. It also stated next-day settlement for local payments. Verify before purchase.",
  },
  {
    question: "What are Paystack's Kenya fees?",
    answer:
      "We could not verify Paystack's Kenya fees, methods, or settlement timing from an official page during this research. Do not quote third-party numbers as official. Ask Paystack for a written schedule for your business category.",
  },
  {
    question: "How quickly do merchants receive funds?",
    answer:
      "It depends on the provider and country. Pesapal's FAQ states up to 72 working hours or a maximum of three working days to a bank account in the country of registration. Flutterwave says local payments settle next day. Do not generalise those figures to other providers.",
  },
  {
    question: "What KYC documents are commonly requested?",
    answer:
      "For Pesapal, official guidance lists documents such as ID or passport, business registration, KRA PIN, bank details or a cancelled cheque, and for companies items such as CR12 or annual return, resolutions, and director identification. Flutterwave's Kenya help page lists similar documents plus proof of address and payout details. Requirements vary by entity type.",
  },
  {
    question: "Do Stripe or PayPal support M-Pesa for Kenyan websites?",
    answer:
      "Not as verified in this research. Stripe's global page lists Kenya under its extended network, and PayPal has a Kenya locale page, but neither source we reviewed stated merchant M-Pesa acceptance. Ask each provider directly before promising M-Pesa at checkout.",
  },
  {
    question: "What is PAPSS and can a small shop use it as a checkout?",
    answer:
      "PAPSS is cross-border payment infrastructure supported by Afreximbank, the African Union, and AfCFTA. It is not a small-business website gateway. It enables local-currency cross-border payments between participating financial institutions; a shop would access it through a bank or PSP, not a WordPress plugin.",
  },
  {
    question: "Why is a Kenya guide useful for other African countries?",
    answer:
      "Kenya has a mature mobile-money market and a clear CBK licensing framework, so the questions it raises — local method coverage, regulator status, settlement, and plugin ownership — apply across Africa. Payment methods and licences remain country-specific, so use the framework rather than copying Kenya's provider list wholesale.",
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
  ["why-local-first", "Why local-first matters"],
  ["cbk-and-market-basics", "CBK and market basics"],
  ["m-pesa-is-not-one-thing", "M-Pesa is not one thing"],
  ["provider-options-compared", "Provider options compared"],
  ["payment-methods-to-consider", "Payment methods to consider"],
  ["wordpress-and-woocommerce", "WordPress and WooCommerce"],
  ["fees-settlement-and-kyc", "Fees, settlement and KYC"],
  ["choosing-for-african-markets", "Choosing for African markets"],
  ["implementation-checklist", "Implementation checklist"],
  ["connected-guides", "Connected guides"],
  ["faq-kenya-payment-gateway", "Frequently asked questions"],
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

const KenyaPaymentGatewayContent = () => (
  <main>
    <FAQJsonLd />

    <section className="relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white">
      <div className="relative max-w-4xl px-6 py-16 text-center md:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
          Kenya and African payments guide
        </p>
        <p className="mt-3 text-xl font-semibold md:text-2xl">
          Choose on method fit, regulator evidence, and plugin ownership
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
          A verification-first comparison for small business websites selling in Kenya and
          wider African markets.
        </p>
      </div>
    </section>

    <article className="mx-auto max-w-3xl space-y-6 px-5 py-10 text-lg leading-relaxed text-slate-800">
      <figure>
        <img
          src="/choosing-payment-gateway-in-kenya.jpg"
          alt="Choosing a payment gateway banner showing a card payment terminal, a laptop and currency symbols on a teal background"
          className="w-full"
          decoding="async"
        />
        <figcaption>
          Choosing a gateway for a Kenyan website comes down to method fit,
          regulator evidence, and plugin ownership &mdash; each checked against
          primary sources for this guide.
        </figcaption>
      </figure>

      <Toc />
      <JumpLinks />

      <QuickSummary
        intro="Kenya payment gateway options for small business website owners are not just a list of brands. The real decision is how you accept M-Pesa, who is licensed by the Central Bank of Kenya, how settlement works, and whether your WordPress plugin is built by the provider or a third party."
        points={[
          { text: "CBK's directory as at 10 August 2026 lists Safaricom, Pesapal, and Paystack Payments Kenya as PSPs." },
          { text: "M-Pesa is a mobile-money service, not a single website checkout product." },
          { text: "Flutterwave and Paystack have provider-authored WordPress plugins; M-Pesa plugins are mostly third-party." },
          { text: "Fees and settlement vary widely; use dated official figures and check everything else with the provider." },
        ]}
      />

      <KeyTakeaways
        title="Key takeaways"
        points={[
          "Separate consumer M-Pesa, merchant Paybill or Till, and API-based acceptance in your planning.",
          "Check the CBK PSP directory rather than trusting licence claims in comparison articles.",
          "Verify plugin author, last update, and country support before installing an M-Pesa plugin.",
          "Use dated official pricing only; mark Paystack fees and direct M-Pesa pricing as check with provider.",
          "Apply the same questions across African markets, but recheck local methods and licences in each country.",
        ]}
      />

      <p>
        Most articles about payment gateways in Africa are lists of company names. That is not
        enough for a small business owner who has to launch a website, pass verification, and
        explain to customers how their money will be taken. This guide focuses on the facts
        that change the implementation: regulator status, payment method coverage, settlement,
        and plugin ownership.
      </p>
      <p>
        If you are new to the underlying vocabulary, read our
        <Link href="/blogs/payment-gateways" className="text-emerald-800 underline">
          {" "}
          US-focused payment gateways guide
        </Link>
        first. It explains gateways, processors, merchant accounts, ACH, cards, and PCI DSS.
        Then use this article for Kenya and the wider African context. For South Asian
        comparisons, our
        <Link href="/blogs/payment-gateway-in-pakistan" className="text-emerald-800 underline">
          {" "}
          payment gateway in Pakistan guide
        </Link>
        applies the same verification method to a different market.
      </p>

      <h2 id="why-local-first" className="text-2xl font-bold">
        Why a local-first strategy matters in Kenya
      </h2>
      <p>
        Kenya's payment market is mobile-money heavy. The Central Bank of Kenya's mobile
        payments page for September 2026 records 97.04 million registered mobile money
        accounts, 568,518 active agents, and 216.61 million agent cash-in and cash-out
        transactions worth KSh 733.45 billion. A website that only offers international cards
        can miss a large share of potential buyers.
      </p>
      <p>
        Local-first does not mean ignoring cards or cross-border customers. It means starting
        with the methods your customers already trust, then adding cards, bank transfer, or
        regional options where they make sense. A small shop selling to Nairobi customers has
        a different checkout from a SaaS company billing US clients. Do not copy either one
        blindly.
      </p>

      <h2 id="cbk-and-market-basics" className="text-2xl font-bold">
        CBK and market basics
      </h2>
      <p>
        Kenya's National Payment System Act 2011 and National Payment System Regulations 2014
        provide the framework for payment service providers and mobile money operators. CBK's
        national payments page describes the system participants and the split between
        large-value and retail systems, including KEPSS for high-value settlement and the
        regional cross-border systems EAPS and REPSS.
      </p>
      <p>
        The most useful primary document for this article is CBK's
        <ExternalLink href="https://www.centralbank.go.ke/wp-content/uploads/2026/09/Directory-of-Authorized-Payment-Service-Providers-August-10-2026.pdf">
          {" "}
          Directory of Authorized Payment Service Providers as at 10 August 2026
        </ExternalLink>
        . In that directory, Safaricom PLC, Pesapal Limited, and Paystack Payments Kenya
        Limited appear as authorised PSPs. Check the live directory before you sign: a
        directory is a point-in-time record, not a permanent guarantee. See also CBK's
        <ExternalLink href="https://www.centralbank.go.ke/national-payments-system/">
          {" "}
          national payments system page
        </ExternalLink>
        and
        <ExternalLink href="https://www.centralbank.go.ke/national-payments-system/mobile-payments/">
          {" "}
          mobile payments statistics
        </ExternalLink>
        .
      </p>
      <h3 id="papss-is-infrastructure-not-a-checkout" className="text-xl font-semibold">
        PAPSS is infrastructure, not a checkout
      </h3>
      <p>
        You may see PAPSS mentioned in articles about payment gateways in Africa. PAPSS is
        cross-border payment infrastructure supported by Afreximbank, the African Union, and
        AfCFTA. Its own material describes local-currency cross-border payments between
        participating financial institutions within 120 seconds and net settlement at 11:00
        UTC. A small website does not install PAPSS as a plugin; it may benefit indirectly if
        its bank or PSP participates. Read the
        <ExternalLink href="https://papss.com/how-it-works/">
          {" "}
          PAPSS explanation
        </ExternalLink>
        for context, but never list it as a merchant checkout option.
      </p>

      <h2 id="m-pesa-is-not-one-thing" className="text-2xl font-bold">
        M-Pesa is not one thing
      </h2>
      <p>
        The biggest mistake in this market is treating M-Pesa as a single gateway. It can mean
        at least four different things:
      </p>
      <ul className="list-disc space-y-3 pl-6">
        <li>
          The consumer mobile-money wallet held by a customer on a Safaricom-registered phone.
        </li>
        <li>
          A merchant Paybill or Till number that receives payments and must be reconciled.
        </li>
        <li>
          Safaricom's Daraja APIs, which let an application initiate or receive M-Pesa
          transactions, including an STK push prompt to the customer's phone.
        </li>
        <li>
          A third-party gateway or plugin that wraps one of those flows into a simpler merchant
          product.
        </li>
      </ul>
      <p>
        These are not interchangeable. A Paybill number displayed on a website is not an API
        integration. A plugin that sends an STK push still needs Safaricom credentials, a
        registered merchant setup, and callback handling. A provider that supports M-Pesa
        through its own PSP licence may offer a very different settlement and support model
        from a direct Daraja build.
      </p>
      <p>
        Safaricom's official
        <ExternalLink href="https://developer.safaricom.co.ke/">
          {" "}
          Daraja developer portal
        </ExternalLink>
        is the starting point for direct integration. The
        <ExternalLink href="https://developer.safaricom.co.ke/apis/MpesaExpressSimulate">
          {" "}
          M-Pesa Express API documentation
        </ExternalLink>
        describes the network-initiated push request to the registered phone number. We did
        not verify a current public price list for direct Daraja access, so treat M-Pesa API
        fees as check with provider.
      </p>

      <figure>
        <img
          src="/mpesa-payment-gateway.jpg"
          alt="Safaricom business banner reading made for your business, opening a world of possibilities, with a shop counter scene and a Learn More button"
          className="w-full"
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          Safaricom&rsquo;s business messaging for M-Pesa: the consumer wallet, a merchant
          Till or Paybill number, and Daraja API access are three different integrations
          with three different onboarding paths.
        </figcaption>
      </figure>

      <ProviderScorecard
        name="M-Pesa via Daraja (Safaricom)"
        href="https://developer.safaricom.co.ke/"
        cta="Open the Safaricom Daraja portal"
        checked={REVIEWED}
        bestFor="Businesses with developer resources that want to own the M-Pesa flow directly through Safaricom's APIs"
        overall={3.9}
        scores={[
          { label: "Local method coverage", value: 5.0 },
          { label: "Pricing transparency", value: 2.5 },
          { label: "Settlement clarity", value: 3.0 },
          { label: "WordPress tooling", value: 3.0 },
        ]}
      />

      <h2 id="provider-options-compared" className="text-2xl font-bold">
        Provider options compared
      </h2>
      <p>
        The table uses primary-source information and labels the date of each snapshot. It is
        a shortlist, not a ranking. The star ratings in each provider card are our editorial
        assessment of the verified facts in this guide &mdash; method coverage, published
        pricing, settlement transparency, and plugin ownership &mdash; not results from tests
        we ran ourselves.
      </p>

      <figure>
        <img
          src="/best-payment-gateways-for-small-business.jfif"
          alt="Kenya payment gateway options banner showing M-Pesa, Visa, Mastercard, KES, Pesapal and Airtel Money around a map of Kenya"
          className="w-full"
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          The realistic shortlist for a Kenyan site: mobile money first, then cards and
          regional options where they fit &mdash; each option below is rated on the facts
          we verified on {REVIEWED}.
        </figcaption>
      </figure>

      <div className="my-8 w-full overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th>Option</th>
              <th>CBK directory status</th>
              <th>What is publicly verified</th>
              <th>WordPress or WooCommerce</th>
              <th>Check with provider</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>M-Pesa direct through Daraja</td>
              <td>Safaricom PLC listed as PSP in the 10 Aug 2026 directory.</td>
              <td>APIs for payment receipt processing, B2C disbursements, reversals, and STK push. Consumer M-Pesa is not itself a gateway.</td>
              <td>No Safaricom-authored plugin found on WordPress.org; third-party options vary by country.</td>
              <td>Merchant onboarding, API pricing, callback handling, and settlement.</td>
            </tr>
            <tr>
              <td>Pesapal</td>
              <td>Pesapal Limited listed as PSP in the 10 Aug 2026 directory.</td>
              <td>Mobile money, cards, and mobile banking; Paybill, Till, Xpress, cards, payment links, invoicing, and APIs. FAQ states up to 72 working hours to bank.</td>
              <td>WooCommerce extension listed on Pesapal's developer site; no Pesapal-authored WP.org plugin found.</td>
              <td>Exact fee, contract terms, country of settlement, and plugin support.</td>
            </tr>
            <tr>
              <td>Flutterwave Kenya</td>
              <td>Not found in the CBK directory checked.</td>
              <td>Official Kenya page lists 15+ options including cards, mobile money, M-Pesa, USSD, QR, bank transfer, and POS. Pricing page checked 22 Nov 2026: 3.2% local cards, 2.9% local wallets, 4.8% international, KES 100 transfers, VAT excluded, next-day local settlement.</td>
              <td>Provider-authored WordPress plugin `rave-woocommerce-payment-gateway`, v3.3.2, updated 8 Oct 2026.</td>
              <td>Current regulatory status, method availability for your category, and support.</td>
            </tr>
            <tr>
              <td>Paystack Kenya</td>
              <td>Paystack Payments Kenya Limited listed as PSP in the 10 Aug 2026 directory.</td>
              <td>Official Kenya locale page and API ecosystem exist. We did not verify Kenya-specific fees, methods, or settlement from an official page.</td>
              <td>Provider-authored `woo-paystack` plugin, v5.9.0, updated 16 Nov 2026.</td>
              <td>Fees, supported methods, settlement, and KYC documents.</td>
            </tr>
            <tr>
              <td>Stripe and PayPal</td>
              <td>Not found in the CBK directory checked in this research.</td>
              <td>Stripe lists Kenya under extended network; PayPal has a Kenya locale page. Neither source verified M-Pesa merchant acceptance.</td>
              <td>Stripe and PayPal have general WooCommerce plugins, but Kenya-specific readiness was not verified.</td>
              <td>Kenya merchant eligibility and local method support.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="pesapal" className="text-xl font-semibold">
        Pesapal
      </h3>
      <p>
        Pesapal is a strong fit for Kenya SMEs because its official material covers the
        everyday methods customers use: mobile money, cards, and mobile banking. Its business
        pages describe M-Pesa Till and Paybill support, card schemes, payment links, online
        invoicing, event ticketing, POS, and ecommerce APIs. Its FAQ states that funds are held
        in trust until a settlement request is made and that bank settlement can take up to 72
        working hours or three working days, within the country of registration. See
        <ExternalLink href="https://www.pesapal.com/business/online">
          {" "}
          Pesapal's online business page
        </ExternalLink>
        and its
        <ExternalLink href="https://www.pesapal.com/business/faqs">
          {" "}
          business FAQ
        </ExternalLink>
        .
      </p>
      <p>
        Onboarding is document-heavy, as it should be for a regulated provider. Official
        guidance lists items such as ID or passport, business registration, KRA PIN, bank
        documentation, and, for companies, CR12 or annual return, resolutions, and director
        identification. Ask which list applies to your exact entity type before you start.
      </p>

      <figure>
        <img
          src="/pesapal-payment-gateway.jpg"
          alt="Pesapal banner reading start accepting M-Pesa and card payments, showing a point-of-sale terminal with Tap to Pay and Scan to Pay options"
          className="w-full"
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          Pesapal&rsquo;s pitch to Kenyan merchants: M-Pesa Till, Paybill and Xpress
          alongside Visa and Mastercard on one flow, with funds held in trust until a
          settlement request is made.
        </figcaption>
      </figure>

      <ProviderScorecard
        name="Pesapal"
        href="https://www.pesapal.com/business/online"
        cta="Visit Pesapal's online payments page"
        checked={REVIEWED}
        bestFor="Kenyan SMEs that want M-Pesa, cards, and mobile banking under one CBK-listed provider"
        overall={4.1}
        scores={[
          { label: "Local method coverage", value: 5.0 },
          { label: "Pricing transparency", value: 3.0 },
          { label: "Settlement clarity", value: 4.0 },
          { label: "WordPress tooling", value: 3.5 },
        ]}
      />

      <h3 id="flutterwave-kenya" className="text-xl font-semibold">
        Flutterwave Kenya
      </h3>
      <p>
        Flutterwave's Kenya pages publish the clearest dated pricing in this comparison. The
        Kenya pricing page checked 22 November 2026 listed 3.2% for local cards, 2.9% for local
        wallets and mobile money, 4.8% for international payments, and KES 100 per bank or
        mobile-money transfer, excluding VAT. It also stated next-day settlement for local
        payments. Review
        <ExternalLink href="https://flutterwave.com/ke/pricing">
          {" "}
          Flutterwave Kenya pricing
        </ExternalLink>
        directly before making a decision.
      </p>
      <p>
        The important caveat is regulatory wording. Flutterwave was not found in the CBK PSP
        directory checked for this article. Write that as a factual observation; do not
        conclude that it is licensed or unlicensed. Its WordPress plugin is provider-authored,
        which is useful for integration confidence, but plugin ownership and regulatory status
        are separate questions.
      </p>

      <figure>
        <img
          src="/flutterwave-payment-gateway.jpg"
          alt="Flutterwave homepage hero reading endless possibilities for all, with the tagline empowering businesses of all sizes with seamless payment solutions"
          className="w-full"
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          Flutterwave positions itself for enterprises, startups, and emerging markets
          &mdash; its Kenya pricing page is the most detailed dated fee schedule in this
          comparison, checked {REVIEWED}.
        </figcaption>
      </figure>

      <ProviderScorecard
        name="Flutterwave Kenya"
        href="https://flutterwave.com/ke/pricing"
        cta="View Flutterwave Kenya pricing"
        checked={REVIEWED}
        bestFor="Merchants who want published, dated pricing and a provider-authored WooCommerce plugin"
        overall={4.4}
        scores={[
          { label: "Local method coverage", value: 4.5 },
          { label: "Pricing transparency", value: 5.0 },
          { label: "Settlement clarity", value: 4.5 },
          { label: "WordPress tooling", value: 4.5 },
        ]}
      />

      <h3 id="paystack-kenya" className="text-xl font-semibold">
        Paystack Kenya
      </h3>
      <p>
        Paystack Payments Kenya Limited appears in CBK's directory as at 10 August 2026, and
        its WooCommerce plugin `woo-paystack` is authored by Paystack and was updated on 16
        November 2026 according to the WordPress.org snapshot. Those two facts are useful.
        However, we could not verify Paystack's Kenya fees, supported methods, settlement time,
        or KYC checklist from an official page during this research. Do not quote third-party
        numbers as provider facts; request them in writing.
      </p>

      <figure>
        <img
          src="/paystack-payment-gateway.jpg"
          alt="Paystack homepage hero reading modern online and offline payments for Africa, with a Create a free account button"
          className="w-full"
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          Paystack&rsquo;s Africa-wide positioning: a CBK-listed PSP with a maintained
          WooCommerce plugin &mdash; but Kenya-specific fees still need to be confirmed in
          writing before you commit.
        </figcaption>
      </figure>

      <ProviderScorecard
        name="Paystack Kenya"
        href="https://paystack.com/ke"
        cta="Visit Paystack Kenya"
        checked={REVIEWED}
        bestFor="Merchants that want a CBK-listed PSP with a maintained WooCommerce plugin, after confirming fees in writing"
        overall={3.2}
        scores={[
          { label: "Local method coverage", value: 3.0 },
          { label: "Pricing transparency", value: 2.0 },
          { label: "Settlement clarity", value: 2.5 },
          { label: "WordPress tooling", value: 4.5 },
        ]}
      />

      <h3 id="stripe-and-paypal" className="text-xl font-semibold">
        Stripe and PayPal
      </h3>
      <p>
        Stripe's global page lists Kenya under extended network, and PayPal has a Kenya locale
        page. Neither source we reviewed confirms M-Pesa merchant acceptance for Kenyan
        websites. They may still be relevant for international cards or global customers, but
        they should not be presented as local M-Pesa gateways without written confirmation.
      </p>

      <figure>
        <img
          src="/stripe-and-paypal-payment-gateway.jfif"
          alt="Illustration of the Stripe and PayPal logos either side of a globe icon over a wireframe map of Africa"
          className="w-full"
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          Stripe and PayPal are strong on international cards, but neither source we
          reviewed confirmed M-Pesa acceptance for a Kenyan website &mdash; confirm
          eligibility in writing first.
        </figcaption>
      </figure>

      <ProviderScorecard
        name="Stripe (Kenya, extended network)"
        href="https://stripe.com/"
        cta="Visit Stripe"
        checked={REVIEWED}
        bestFor="Kenyan businesses billing international customers by card, where M-Pesa is not required at checkout"
        overall={3.5}
        scores={[
          { label: "Local method coverage", value: 2.5 },
          { label: "Pricing transparency", value: 3.5 },
          { label: "Settlement clarity", value: 3.5 },
          { label: "WordPress tooling", value: 4.5 },
        ]}
      />

      <ProviderScorecard
        name="PayPal Kenya"
        href="https://www.paypal.com/ke"
        cta="Visit PayPal Kenya"
        checked={REVIEWED}
        bestFor="A familiar buyer-side checkout for international customers, pending written confirmation of Kenya merchant eligibility"
        overall={3.4}
        scores={[
          { label: "Local method coverage", value: 2.5 },
          { label: "Pricing transparency", value: 3.5 },
          { label: "Settlement clarity", value: 3.5 },
          { label: "WordPress tooling", value: 4.0 },
        ]}
      />

      <h2 id="payment-methods-to-consider" className="text-2xl font-bold">
        Payment methods a small business website should consider
      </h2>
      <ul className="list-disc space-y-3 pl-6">
        <li>
          <strong>M-Pesa STK push or Paybill/Till.</strong> Essential for many local customers,
          but decide whether you need a direct API or a PSP that abstracts it.
        </li>
        <li>
          <strong>Local cards.</strong> Visa, Mastercard, and other cards where supported by
          the provider and your business category.
        </li>
        <li>
          <strong>Bank transfer and mobile banking.</strong> Useful for higher-value orders;
          confirm how the gateway matches an incoming payment to an order.
        </li>
        <li>
          <strong>QR and USSD.</strong> Relevant in parts of Africa where smartphones or data
          access are not universal.
        </li>
        <li>
          <strong>Regional and cross-border options.</strong> Useful if you sell into other
          African countries, but check each country's licences and settlement currency.
        </li>
      </ul>
      <p>
        A longer list is not automatically better. Too many poorly labelled options can
        confuse buyers. Start with the two or three methods your customers already use, then
        expand after you have tested reconciliation.
      </p>

      <h2 id="wordpress-and-woocommerce" className="text-2xl font-bold">
        WordPress and WooCommerce reality check
      </h2>
      <p>
        Plugin ownership matters more than install count. In the WordPress.org snapshot checked
        22 November 2026, Flutterwave's `rave-woocommerce-payment-gateway` was authored by
        Flutterwave, v3.3.2, with around 2,000 installs and last updated 8 October 2026.
        Paystack's `woo-paystack` was authored by Paystack, v5.9.0, with around 20,000 installs
        and last updated 16 November 2026.
      </p>
      <p>
        M-Pesa plugins are different. `woo-m-pesa-payment-gateway` was authored by demkitech,
        v1.0.0, with around 900 installs and last updated 2 March 2026. Another M-Pesa plugin
        with more installs references Vodacom Mozambique rather than Kenya. No Safaricom-
        authored plugin was found. Pesapal lists a WooCommerce extension on its own developer
        site, credited to Paul Kevin and Pesapal, but not on WordPress.org.
      </p>
      <p>
        Before installing anything, record the plugin slug, author, version, last-updated date,
        country support, and callback behaviour. Then test it on staging with sandbox
        credentials. If you need a deeper WooCommerce verification workflow, our
        <Link href="/blogs/best-payment-gateway-woocommerce-pakistan" className="text-emerald-800 underline">
          {" "}
          WooCommerce payment gateway guide for Pakistan
        </Link>
        walks through the same authorship and compatibility checks in a different market.
      </p>

      <h2 id="fees-settlement-and-kyc" className="text-2xl font-bold">
        Fees, settlement, and KYC: what to verify
      </h2>
      <p>
        Only a few numbers in this article are safe to publish, and each has a date and a
        source. Flutterwave's Kenya pricing page, checked 22 November 2026, lists specific
        rates. Pesapal's FAQ, checked the same day, states settlement timing but not a public
        percentage fee. Paystack's fees were not verifiable from an official page. Direct
        M-Pesa API pricing was not verifiable either.
      </p>
      <p>
        Ask every provider for a written schedule covering transaction rate by method, VAT or
        other taxes, setup and monthly fees, refund fees, chargeback handling, payout timing,
        and settlement bank country. Ask which KYC documents apply to your entity type and
        whether settlement is only possible to an account in the country of registration. A
        cheap transaction rate is not cheap if funds sit for days or cannot be settled where
        your business banks.
      </p>

      <h2 id="choosing-for-african-markets" className="text-2xl font-bold">
        Choosing a gateway for wider African markets
      </h2>
      <p>
        Kenya is a useful training ground, but African markets are not uniform. A provider that
        is strong in Kenya may not have the same licence, wallet coverage, settlement currency,
        or support in Nigeria, Ghana, Tanzania, Uganda, Zambia, or South Africa. Use this
        checklist for each country:
      </p>
      <ol className="list-decimal space-y-3 pl-6">
        <li>Confirm the current regulator status in that specific country.</li>
        <li>List the local methods customers actually use, including mobile money.</li>
        <li>Check whether cards, bank transfer, QR, or USSD are also needed.</li>
        <li>Verify settlement currency, bank country, and expected timing.</li>
        <li>Confirm KYC documents for your entity type.</li>
        <li>Check plugin or API support from the provider's own documentation.</li>
        <li>Ask how refunds and disputes work for each payment method.</li>
        <li>Test a low-value live transaction before full launch.</li>
      </ol>
      <p>
        Treat regional infrastructure such as PAPSS as context for future cross-border
        capability, not as a product you can install on a small business website today.
      </p>

      <h2 id="implementation-checklist" className="text-2xl font-bold">
        Implementation checklist
      </h2>
      <ol className="list-decimal space-y-3 pl-6">
        <li>Decide whether you need direct M-Pesa API access or a PSP that wraps it.</li>
        <li>Verify the provider in the current CBK directory if you are selling in Kenya.</li>
        <li>Request written pricing, KYC requirements, and settlement terms.</li>
        <li>Choose a plugin only after confirming its author, country support, and update date.</li>
        <li>Set up sandbox credentials and map gateway statuses to order statuses.</li>
        <li>Test STK push or payment-link flows on a real mobile device.</li>
        <li>Test failed payment, duplicate submission, refund, and delayed callback cases.</li>
        <li>Reconcile a small live payment against the provider's report before scaling.</li>
      </ol>

      <h2 id="common-mistakes" className="text-2xl font-bold">
        Common mistakes to avoid
      </h2>
      <ul className="list-disc space-y-3 pl-6">
        <li>Calling consumer M-Pesa a payment gateway.</li>
        <li>Assuming Flutterwave or Stripe is CBK-authorised without current primary evidence.</li>
        <li>Installing a third-party M-Pesa plugin that targets the wrong country.</li>
        <li>Quoting Paystack fees from an old third-party article.</li>
        <li>Ignoring whether settlement is limited to a bank account in a specific country.</li>
        <li>Treating PAPSS as a merchant checkout product.</li>
        <li>Launching before testing callbacks and reconciliation.</li>
      </ul>

      <h2 id="connected-guides" className="text-2xl font-bold">
        Connected guides in this cluster
      </h2>
      <ul className="list-disc space-y-3 pl-6">
        <li>
          <Link href="/blogs/payment-gateways" className="text-emerald-800 underline">
            Payment gateways: US-focused guide
          </Link>{" "}
          — definitions, card and ACH rails, PCI DSS, disputes, and dated US provider pricing.
        </li>
        <li>
          <Link href="/blogs/payment-gateway-in-pakistan" className="text-emerald-800 underline">
            Payment gateway in Pakistan
          </Link>{" "}
          — SBP framework, Raast, JazzCash, Easypaisa, PayFast, and XPay.
        </li>
        <li>
          <Link href="/blogs/best-payment-gateway-woocommerce-pakistan" className="text-emerald-800 underline">
            Best payment gateway for WooCommerce in Pakistan
          </Link>{" "}
          — plugin verification and checkout checks that also apply in Africa.
        </li>
      </ul>

      <h2 id="faq-kenya-payment-gateway" className="text-2xl font-bold">
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
          <li>
            <ExternalLink href="https://www.centralbank.go.ke/wp-content/uploads/2026/09/Directory-of-Authorized-Payment-Service-Providers-August-10-2026.pdf">
              CBK Directory of Authorized PSPs, 10 Aug 2026
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.centralbank.go.ke/national-payments-system/">
              CBK National Payments System
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.centralbank.go.ke/national-payments-system/mobile-payments/">
              CBK mobile payments statistics
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://developer.safaricom.co.ke/">
              Safaricom Daraja developer portal
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.pesapal.com/business/online">
              Pesapal online payments
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://flutterwave.com/ke/pricing">
              Flutterwave Kenya pricing
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://paystack.com/ke">
              Paystack Kenya
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://papss.com/how-it-works/">
              PAPSS how it works
            </ExternalLink>
          </li>
        </ul>
      </aside>

      <h2 id="final-verdict" className="text-2xl font-bold">
        Final verdict
      </h2>
      <p>
        For a Kenyan small business website, the shortlist usually starts with M-Pesa
        acceptance through a verified route. Pesapal is strong on local method coverage and
        CBK listing; Flutterwave publishes detailed dated pricing and has a provider-authored
        plugin; Paystack has CBK listing and a provider-authored plugin but needs direct fee
        confirmation. Direct Daraja access gives control but requires real integration work.
      </p>
      <p>
        Across Africa, keep the framework and recheck the local facts. Licences, methods,
        settlement, and plugin maintenance change country by country. Use the primary sources
        in this guide, request written terms, and test a small live payment before you scale.
      </p>
      <p className="text-sm text-slate-500">
        Reviewed November 22, 2026. Regulatory directories, plugin data, and pricing are
        point-in-time snapshots. This is general information, not legal, tax, or financial
        advice.
      </p>
    </article>
  </main>
);

const article = {
  slug: "kenya-payment-gatway",
  title: "Kenya Payment Gateway Options for Small Business Website: African Market Guide (2026)",
  author: "RankStack",
  date: "2026-11-22",
  updatedDate: "2026-11-22",
  type: "Guide",
  categories: ["Payments", "Africa"],
  readingTime: "13 min read",
  description:
    "Compare Kenya payment gateway options for small business websites: CBK status, M-Pesa routes, Pesapal, Flutterwave, Paystack, plugin ownership, fees, settlement, and African market checks.",
  imageUrl: "/blog-banner-1200x675.webp",
  keywords: [
    "kenya payment gateway options for small business website",
    "payment gateway Kenya",
    "payment gateways in Africa",
    "M-Pesa payment gateway",
    "Pesapal Kenya",
    "Flutterwave Kenya",
    "Paystack Kenya",
    "small business payment gateway Kenya",
    "online payment gateway Kenya",
    "African payment gateways for ecommerce",
    "Kenya payment gateway for WordPress",
    "accept M-Pesa on website",
    "mobile money payment gateway Kenya",
    "payment gateway for small business Africa",
  ],
  content: KenyaPaymentGatewayContent,
};

export default article;
