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
    className="font-medium text-sky-800 underline decoration-sky-300 underline-offset-2 hover:text-sky-950"
  >
    {children}
  </a>
);

const FAQ_ITEMS = [
  {
    question: "What is the best payment gateway in Australia in 2026?",
    answer:
      "There is no single best gateway for every business. eWAY suits merchants wanting published online pricing and a provider-linked WooCommerce route; Westpac OnlinePay suits eligible Westpac banking customers; NAB Gateway suits businesses wanting bank-backed published pricing; Stripe suits API-led stores; Square suits combined in-person and online selling; NMI suits partner-led or embedded payments. Choose by eligibility, total cost and support.",
  },
  {
    question: "What is the cheapest payment gateway in Australia?",
    answer:
      "The lowest headline rate is not always the lowest total cost. Compare monthly fees, transaction rates, Amex and international-card charges, platform fees, chargebacks, hardware, settlement timing and eligibility. eWAY lists 1.5% + 25c with no monthly fee, Westpac OnlinePay lists 1.25% for eligible merchants and NAB Gateway lists $30 per month plus 1.30% and 25c, all checked 23 November 2026.",
  },
  {
    question: "What changed for Australian card surcharging in 2026?",
    answer:
      "From 1 October 2026, ACCC guidance says businesses cannot surcharge Visa, Mastercard, American Express or eftpos cards. RBA material also records no-surcharge decisions for Amex, PayPal and UnionPay. Network rules and exceptions should be checked with your payment service provider; this is not legal advice.",
  },
  {
    question: "Can I rename a card surcharge as an admin or service fee?",
    answer:
      "No. ACCC guidance says a fee linked to card use can still be a card surcharge even if renamed. A weekend or public-holiday fee that applies regardless of payment method is different. Cash discounts may still be possible if prices are displayed clearly and not misleadingly.",
  },
  {
    question: "Do lower RBA interchange caps mean my merchant fees automatically fall?",
    answer:
      "Not necessarily. The RBA caps affect the interchange component of card costs, but merchant service fees are set by acquirers and payment service providers. Transparency reporting due from late 2026 and 2027 should make comparisons easier, but you still need a written quote.",
  },
  {
    question: "Is a hosted checkout enough to avoid PCI DSS work?",
    answer:
      "It can reduce the card data your systems handle, but it does not automatically remove every obligation. PCI SSC says validation requirements and SAQ versus ROC are determined by payment brands, acquirers or programme managers. PCI DSS v4.0.1 was the current non-archived version as at 23 November 2026.",
  },
  {
    question: "Which gateways support Shopify and WooCommerce in Australia?",
    answer:
      "Shopify Payments is available in Australia and third-party providers are also supported, with third-party transaction fees by plan. WooCommerce supports WooPayments and a wide plugin ecosystem, but eligibility and Checkout Blocks compatibility must be checked. See the platform guide linked in this article for the detailed rules.",
  },
  {
    question: "Is NMI a direct payment gateway for Australian merchants?",
    answer:
      "NMI says it works exclusively through partners such as banks, ISOs, PayFacs and SaaS providers. You may encounter NMI technology through a reseller, but no public Australian merchant pricing was found on official NMI pages as at 23 November 2026.",
  },
  {
    question: "Are Square's rates the same in Australia and the United States?",
    answer:
      "No. Australian Square pages displayed 1.6% in person, 2.2% online and 2.2% for MOTO/remote payments at the check date. Always use the /au/en/ pages for Australian decisions.",
  },
  {
    question: "What should I ask a provider before signing?",
    answer:
      "Ask for written pricing, card and method list, international-card definition, chargeback fee, settlement cut-off, reserve policy, contract and exit terms, plugin or integration ownership, support hours and PCI validation responsibility. Also confirm whether the entity on the quote is the one that will contract with you.",
  },
  {
    question: "How quickly do Australian online payments settle?",
    answer:
      "It varies. Westpac OnlinePay advertises same-day settlement before 8pm Sydney time into an eligible account; NAB Gateway says before 10pm AEST/AEDT to a NAB Business Everyday Account; eWAY states 1–3 day settlement; Stripe docs say first payouts are typically 7–14 days; Square describes daily 1 p.m. AEST payouts. Eligibility and bank processing apply.",
  },
  {
    question: "Should I use the same gateway for Australia, Pakistan and Kenya?",
    answer:
      "Not automatically. Business registration, bank rails, local methods and KYC rules differ by country. This cluster separates Australia from the Pakistan, WooCommerce Pakistan and Kenya guides so country-specific rules stay distinct.",
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
  ["short-answer", "Short answer"],
  ["gateway-vs-acquirer", "Gateway vs acquirer"],
  ["comparison-table", "Comparison table"],
  ["cheapest-gateway", "Cheapest gateway"],
  ["provider-picks", "Best by scenario"],
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

      <QuickSummary
        intro="Australian merchants can choose between specialist providers, bank-owned gateways, platform-native payments and partner-led infrastructure. The best option depends on eligibility, card mix, platform and total cost — not just the headline percentage."
        points={[
          { text: "eWAY lists 1.5% + 25c with no monthly fee; Westpac OnlinePay lists 1.25% for eligible merchants." },
          { text: "NAB Gateway lists $0 setup, $30 monthly, 1.30% and 25c per transaction." },
          { text: "Stripe's AU pages disagree on the domestic card rate: 1.65% vs 1.7%; confirm before budgeting." },
          { text: "Square lists 1.6% in person and 2.2% online; NMI has no public AU merchant price." },
        ]}
      />

      <KeyTakeaways
        title="Key takeaways"
        points={[
          "A gateway is not the same as an acquirer, merchant facility or payment service provider.",
          "The cheapest payment gateway depends on your actual card mix, platform fees and settlement needs.",
          "Australian surcharging rules changed on 1 October 2026; old checkout copy may be wrong.",
          "Hosted checkout can reduce PCI scope but does not remove every validation obligation.",
          "Use the cluster guides for local banks, platforms and brand-specific deep dives.",
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
        . For country-specific decisions outside Australia, the cluster includes
        a{" "}
        <Link href="/blogs/payment-gateway-in-pakistan" className="text-sky-800 underline">
          {" "}
          Pakistan payment gateway guide
        </Link>
        , a{" "}
        <Link href="/blogs/best-payment-gateway-woocommerce-pakistan" className="text-sky-800 underline">
          {" "}
          WooCommerce Pakistan guide
        </Link>
        and a{" "}
        <Link href="/blogs/kenya-payment-gateway-options-small-business" className="text-sky-800 underline">
          {" "}
          Kenya payment gateway guide
        </Link>
        . Keep those markets separate; local banking and KYC rules do not
        transfer automatically.
      </p>

      <h2 id="short-answer" className="text-2xl font-bold">
        Short answer: how to pick an Australian payment gateway
      </h2>
      <p>
        Start with the payment experience you need. If you sell online only and
        want straightforward published pricing, shortlist eWAY, Westpac
        OnlinePay, NAB Gateway and Stripe. If you also sell in person, include
        Square. If you run Shopify or WooCommerce, read the platform rules before
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
        A payment gateway routes transaction data between your checkout and the
        payment processor. An acquirer or merchant facility is the arrangement
        that settles card payments into a bank account. A payment service
        provider, or PSP, may bundle gateway, acquiring, fraud, reporting and
        payouts into one service. A bank may sell a gateway module that sits
        alongside your existing merchant facility, while a payment facilitator
        may onboard merchants under its own master agreement.
      </p>
      <p>
        This distinction explains several common naming problems in this
        cluster. eWAY describes both an all-in-one online payments solution and
        a gateway option for merchants using their own facility. Westpac calls
        OnlinePay its payment gateway, while PayWay is a suite of hosted, API,
        phone, virtual terminal, batch and recurring modules. NAB publishes NAB
        Gateway pricing while maintaining a separate NAB Transact portal. NMI
        sells through partners rather than directly to most merchants.
      </p>
      <p>
        Do not label a provider an acquirer unless its own documentation says so
        for the product you are buying. Ask which entity appears on the merchant
        agreement and which entity deposits funds.
      </p>

      <h2 id="comparison-table" className="text-2xl font-bold">
        Australian payment gateway comparison, checked 23 November 2026
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
              <td>Westpac PayWay</td>
              <td>Hosted, API, virtual terminal and recurring modules</td>
              <td>Mostly quote-based; Westpac cost-of-acceptance page refers to 0.79% for eligible merchants from 1 Oct 2026.</td>
              <td>Cards, PayPal, wallets, PayTo Biller, batch and recurring options depending on module.</td>
              <td>Do not assume the OnlinePay rate applies; confirm 3DS by module.</td>
            </tr>
            <tr>
              <td>NAB Gateway</td>
              <td>Bank-backed online and virtual payments</td>
              <td>$0 setup, $30 monthly, 1.30% merchant service fee, 25c per transaction.</td>
              <td>Flex Microform, virtual terminal, recurring, batch, wallets, Shopify and WooCommerce references.</td>
              <td>Disputed-charge fees not quantified; clarify Gateway versus Transact scope.</td>
            </tr>
            <tr>
              <td>Stripe</td>
              <td>API-led platforms and broad method coverage</td>
              <td>/au/pricing: 1.65% + A$0.30 domestic; /au/payments: 1.7% + A$0.30; international 3.5% + A$0.30.</td>
              <td>Checkout, Elements, Payment Links, BECS, PayTo, Afterpay, Klarna, Zip, Radar.</td>
              <td>Official domestic-rate conflict; method eligibility and dispute fees need confirmation.</td>
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
        <Link href="/blogs/stripe-payment-gateway-australia" className="text-sky-800 underline">
          {" "}
          Stripe Australia deep dive
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

      <h2 id="cheapest-gateway" className="text-2xl font-bold">
        The cheapest payment gateway: compare total cost, not a headline rate
      </h2>
      <p>
        “Cheapest” is only meaningful after you define the comparison. A 1.25%
        rate with a foreign-card threshold may cost more than a 1.5% rate with
        no threshold if your customers use international cards. A $0-monthly
        gateway may lose its advantage once a platform adds a third-party
        transaction fee. A bank rate may look competitive but require a specific
        settlement account.
      </p>
      <p>
        Build your comparison from these components:
      </p>
      <ul className="list-disc space-y-3 pl-6">
        <li><strong>Setup and monthly fees.</strong> eWAY and OnlinePay publish none; NAB Gateway lists $30 per month.</li>
        <li><strong>Base transaction rate.</strong> Use the rate that matches your card mix and volume.</li>
        <li><strong>Amex and international cards.</strong> Ask how they are defined and priced.</li>
        <li><strong>Platform fees.</strong> Shopify third-party fees were 2%, 1%, 0.6% and 0.2% by plan in the AU table checked 23 November 2026.</li>
        <li><strong>Chargebacks.</strong> OnlinePay says fees apply; NAB references disputed-charge fees without a public amount.</li>
        <li><strong>Method fees.</strong> Stripe lists separate rates for Afterpay, Klarna, Zip, PayTo and BECS; Square lists Afterpay at 6% + 30c excl. GST.</li>
        <li><strong>Hardware and transfers.</strong> Square hardware and Instant Transfers are separate; Instant Transfer is 1.95%.</li>
        <li><strong>Settlement and reserves.</strong> Faster access to funds can be worth more than a small rate difference.</li>
      </ul>
      <p>
        A simple monthly model is: monthly fees + domestic card fees + Amex and
        international-card fees + platform fees + estimated chargebacks +
        hardware or transfer costs. Run it at your current volume, a quiet month
        and a peak month. The ranking often changes.
      </p>

      <h2 id="provider-picks" className="text-2xl font-bold">
        Best by scenario, not a universal winner
      </h2>
      <h3 id="best-for-banking" className="text-xl font-semibold">
        Best for bank-native businesses
      </h3>
      <p>
        Westpac OnlinePay and NAB Gateway are worth shortlisting if you already
        bank with those institutions and want settlement into their accounts.
        Westpac's published eligible-merchant rate is 1.25%, while NAB Gateway
        publishes $0 setup, $30 monthly, 1.30% and 25c. Confirm eligibility and
        product names carefully; OnlinePay, PayWay, Gateway and Transact are not
        interchangeable.
      </p>
      <h3 id="best-for-developers" className="text-xl font-semibold">
        Best for API-led platforms
      </h3>
      <p>
        Stripe offers Checkout, Elements, Payment Links, Terminal, BECS, PayTo
        and multiple BNPL methods. Its WooCommerce plugin is described in the
        WordPress.org listing as officially created by Stripe and WooCommerce.
        The decision hinge is written pricing: two AU pages displayed different
        domestic card rates at the check date.
      </p>
      <h3 id="best-for-pos" className="text-xl font-semibold">
        Best for in-person plus online
      </h3>
      <p>
        Square bundles readers, Tap to Pay, Square Online, invoices, payment
        links and Afterpay. Its 1.6% in-person and 2.2% online rates are easy to
        understand, but hardware, Plus fees, Instant Transfers and BNPL costs
        belong in the total.
      </p>
      <h3 id="best-for-platforms" className="text-xl font-semibold">
        Best for Shopify and WooCommerce
      </h3>
      <p>
        Shopify Payments and WooPayments are the natural starting points because
        they are built into the platforms. But Shopify's third-party fee and
        one-card-provider rule, and WooCommerce's Checkout Blocks compatibility
        rule, can change the decision. Use the platform guide for the detailed
        matrix.
      </p>
      <h3 id="best-for-partners" className="text-xl font-semibold">
        Best for embedded or partner-led payments
      </h3>
      <p>
        NMI is designed for banks, ISOs, PayFacs and SaaS providers. It is not a
        public-price merchant brand. If a platform offers you NMI-powered
        payments, ask for the contracting entity, full fee schedule and support
        owner before comparing it with direct providers.
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
        3DS varies by provider and module: Westpac, for example, states that
        PayWay 3DS is on the hosted payment page for Visa and Mastercard.
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
        <li>Using US pricing from Stripe or Square pages instead of /au pages.</li>
        <li>Calling every provider an acquirer when the product may be a gateway or payment facilitator.</li>
        <li>Confusing Westpac OnlinePay with PayWay, or NAB Gateway with NAB Transact.</li>
        <li>Ignoring Shopify's third-party transaction fee when comparing gateway rates.</li>
        <li>Assuming a WordPress plugin listing proves Australian eligibility.</li>
        <li>Assuming hosted checkout removes all PCI DSS obligations.</li>
        <li>Keeping old surcharging language after the 1 October 2026 changes.</li>
        <li>Treating NMI's global method list as proof of Australian support.</li>
      </ul>

      <h2 id="faq-australia" className="text-2xl font-bold">
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
          <li><ExternalLink href="https://stripe.com/au/pricing">Stripe AU pricing</ExternalLink></li>
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
  readingTime: "16 min read",
  description:
    "Compare the best payment gateways in Australia with official 2026 fees, RBA and ACCC changes, Shopify and WooCommerce rules, PCI/3DS notes and provider deep dives. Checked 23 Nov 2026.",
  imageUrl: "/blog-banner-1200x675.webp",
  keywords: [
    "payment gateway australia",
    "australian payment gateways",
    "best payment gateways in Australia",
    "cheapest payment gateway Australia",
    "payment gateway comparison Australia",
    "online payment gateway Australia",
    "merchant gateway Australia",
    "eWAY Westpac NAB Stripe Square NMI Australia",
  ],
  content: BestPaymentGatewaysAustraliaContent,
};

export default article;
