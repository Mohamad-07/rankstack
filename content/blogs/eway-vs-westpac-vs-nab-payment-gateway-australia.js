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
    question: "Is eWAY cheaper than Westpac or NAB?",
    answer:
      "It depends on your card mix and eligibility. eWAY's published page shows 1.5% + 25c per transaction with no monthly fee, Westpac OnlinePay lists 1.25% for eligible merchants, and NAB Gateway lists $30 per month plus 1.30% and 25c. Compare the full bundle, including international cards, chargebacks, platform fees and settlement, before calling any one cheapest.",
  },
  {
    question: "Are Westpac OnlinePay and PayWay the same product?",
    answer:
      "No. Westpac describes OnlinePay as its payment gateway. PayWay is a broader suite with hosted checkout, API, virtual terminal, batch and recurring-billing modules. They have different pricing pages and different 3-D Secure behaviour, so keep the names separate in your notes.",
  },
  {
    question: "Are NAB Gateway and NAB Transact the same thing?",
    answer:
      "Official NAB pages use both names and maintain a separate NAB Transact portal. Do not treat them as interchangeable without asking NAB. Current public pages describe NAB Gateway as an online and virtual payment solution with published setup, monthly and transaction fees.",
  },
  {
    question: "Can I still surcharge cards in Australia in 2026?",
    answer:
      "From 1 October 2026, ACCC guidance says businesses cannot surcharge Visa, Mastercard, American Express or eftpos cards. RBA guidance records no-surcharge decisions for those schemes and for PayPal and UnionPay. Check the current network and PSP rules for exceptions; this is not legal advice.",
  },
  {
    question: "Does a weekend or public-holiday fee count as a card surcharge?",
    answer:
      "Not if the fee applies regardless of how the customer pays. A fee that is applied because the customer used a card can still be a card surcharge even if you rename it an admin, service or booking fee. ACCC guidance focuses on how the fee is described and whether prices are misleading.",
  },
  {
    question: "Which provider has an official WooCommerce plugin?",
    answer:
      "eWAY's own site links to the Eway Payments for Woo extension, authored by ewaypayments on WordPress.org. We did not find an official Westpac or NAB plugin on WordPress.org. Plugins using those bank names were third-party, lightly installed or outdated in the 23 November 2026 snapshot.",
  },
  {
    question: "Do these gateways support digital wallets?",
    answer:
      "eWAY lists Apple Pay, Google Pay and Click to Pay. Westpac lists Apple Pay and Google Pay across several modules and PayWay also lists PayTo Biller. NAB Gateway lists Apple Pay, Google Pay, Samsung Pay and Click to Pay. Exact availability depends on the product and device, so confirm with the provider.",
  },
  {
    question: "How quickly do merchants receive funds?",
    answer:
      "Westpac OnlinePay advertises same-day settlement for payments before 8pm Sydney time into an eligible Westpac business transaction account. NAB Gateway says before 10pm AEST/AEDT to a NAB Business Everyday Account. eWAY states 1–3 day settlement. Eligibility and cut-offs apply.",
  },
  {
    question: "Do I need an ABN to apply?",
    answer:
      "NAB Gateway's published eligibility includes an active ABN and an eligible business office holder. eWAY and Westpac also require business verification, and eWAY references AUSTRAC AML/CTF obligations and beneficial-owner checks. Confirm the exact checklist for your entity type with each provider.",
  },
  {
    question: "Does hosted checkout remove PCI DSS obligations?",
    answer:
      "It can reduce the card data your systems touch, but it does not automatically remove every obligation. PCI SSC says the validation method is determined by the payment brand, acquirer or programme manager. PCI DSS v4.0.1 was the current non-archived version as at 23 November 2026.",
  },
  {
    question: "Can I use these gateways with Shopify?",
    answer:
      "Westpac and NAB both publish Shopify integration information on their official pages. eWAY publishes WooCommerce information and an API. Shopify availability can also depend on your plan and whether you use Shopify Payments, so check the platform guide linked in this article before deciding.",
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
  ["product-names-that-get-confused", "Product names that get confused"],
  ["side-by-side-comparison", "Side-by-side comparison"],
  ["eway-payment-gateway", "eWAY"],
  ["westpac-payment-gateway", "Westpac"],
  ["nab-payment-gateway", "NAB"],
  ["fees-that-catch-merchants-out", "Fees that catch merchants out"],
  ["woocommerce-and-shopify", "WooCommerce and Shopify"],
  ["2026-surcharging-changes", "2026 surcharging changes"],
  ["how-to-choose", "How to choose"],
  ["faq-eway-westpac-nab", "Frequently asked questions"],
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

const EwayVsWestpacVsNabContent = () => (
  <main>
    <FAQJsonLd />

    <section className="relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sky-950 via-slate-900 to-indigo-950 text-white">
      <div className="relative max-w-4xl px-6 py-16 text-center md:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-200">
          Australian gateway comparison
        </p>
        <p className="mt-3 text-xl font-semibold md:text-2xl">
          eWAY vs Westpac vs NAB: compare the product, not just the rate
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
          Official product facts checked 23 November 2026, with unclear terms marked for provider confirmation.
        </p>
      </div>
    </section>

    <article className="mx-auto max-w-3xl space-y-6 px-5 py-10 text-lg leading-relaxed text-slate-800">
      <Toc />
      <JumpLinks />

      <QuickSummary
        intro="eWAY, Westpac and NAB are all credible Australian payment options, but they are not the same kind of product. eWAY is a specialist online payments provider, Westpac separates OnlinePay from its broader PayWay suite, and NAB publishes a bank-backed Gateway product with a monthly fee."
        points={[
          { text: "eWAY lists 1.5% + 25c with no monthly fee; confirm Amex and international-card treatment." },
          { text: "Westpac OnlinePay lists 1.25% for eligible merchants; PayWay modules are mostly quote-based." },
          { text: "NAB Gateway lists $0 setup, $30 monthly, 1.30% and 25c per transaction." },
          { text: "No official Westpac or NAB WordPress.org plugin was found; eWAY links to its own WooCommerce extension." },
        ]}
      />

      <KeyTakeaways
        title="Key takeaways"
        points={[
          "Keep OnlinePay, PayWay, NAB Gateway and NAB Transact as separate product names in your notes.",
          "The lowest published transaction rate is not always the lowest total cost.",
          "Check wallet support, 3-D Secure, settlement cut-offs and chargeback fees in writing.",
          "Surcharging rules changed on 1 October 2026; do not rely on old checkout copy.",
          "Use the pillar guide for the wider market and the platform guide for Shopify or WooCommerce setup.",
        ]}
      />

      <p>
        Searches for an <strong>eway payment gateway</strong>, a{" "}
        <strong>Westpac payment gateway</strong> or a{" "}
        <strong>NAB payment gateway</strong> often lead to provider pages that
        look similar but describe different products. One may be an all-in-one
        payment service, another a bank gateway module, and another a suite with
        separate hosted, API and virtual-terminal components. This comparison
        keeps the product boundaries clear and uses only official information
        available on 23 November 2026.
      </p>
      <p>
        If you are still deciding what a gateway actually does, start with our
        <Link href="/blogs/best-payment-gateways-australia" className="text-sky-800 underline">
          {" "}
          Australian payment gateway pillar guide
        </Link>
        . It explains acquirers, merchant facilities, RBA reforms and the
        broader provider landscape. This article goes deeper on the three names
        in the title.
      </p>

      <h2 id="short-answer" className="text-2xl font-bold">
        Short answer: which one fits which store?
      </h2>
      <p>
        Choose <strong>eWAY</strong> if you want a specialist online payments
        provider with published online pricing, a documented API and a
        provider-linked WooCommerce extension. Choose <strong>Westpac OnlinePay</strong>{" "}
        if you already bank with Westpac and want a simple gateway with a
        published eligible-merchant rate and same-day settlement conditions.
        Choose <strong>NAB Gateway</strong> if you want a bank-backed online and
        virtual payment solution with published transparent pricing and a NAB
        settlement account.
      </p>
      <p>
        None of those statements is a universal winner. Your card mix, monthly
        volume, platform, international-card share and support expectations can
        flip the decision. Treat the published figures below as a shortlist, not
        a quote.
      </p>

      <h2 id="product-names-that-get-confused" className="text-2xl font-bold">
        Product names that get confused
      </h2>
      <h3 id="eways-two-routes" className="text-xl font-semibold">
        eWAY online payments and eWAY gateway services
      </h3>
      <p>
        eWAY's official material describes an all-in-one online payments
        solution with an internet merchant facility, and also a gateway option
        for businesses using their own merchant facility. Those are different
        commercial arrangements. Do not describe eWAY as an acquirer in every
        case; use the acquirer label only if eWAY confirms it for your specific
        product.
      </p>
      <h3 id="westpac-onlinepay-and-payway" className="text-xl font-semibold">
        Westpac OnlinePay and PayWay
      </h3>
      <p>
        Westpac calls OnlinePay its payment gateway. PayWay is a wider family
        that includes Hosted PayWay, PayWay API, Phone, Virtual Terminal, Batch
        and Recurring Billing. The distinction matters because pricing,
        3-D Secure support and settlement cut-offs differ across the modules.
      </p>
      <h3 id="nab-gateway-and-nab-transact" className="text-xl font-semibold">
        NAB Gateway and NAB Transact
      </h3>
      <p>
        NAB's current public pages describe NAB Gateway as an online and virtual
        payments solution, while a separate NAB Transact portal and terms remain
        published. We do not treat the two names as interchangeable. Ask NAB
        which product applies to your application.
      </p>

      <h2 id="side-by-side-comparison" className="text-2xl font-bold">
        Side-by-side comparison
      </h2>
      <p>
        Figures are from official pages checked 23 November 2026. Quote-only
        terms remain quote-only.
      </p>

      <div className="my-8 w-full overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th>Product</th>
              <th>Published pricing</th>
              <th>Methods and features</th>
              <th>Settlement</th>
              <th>Platform evidence</th>
              <th>Confirm with provider</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>eWAY online payments</td>
              <td>1.5% + 25c per Amex, Mastercard and Visa transaction; +1.99% international credit cards; no setup, monthly or lock-in fees.</td>
              <td>Visa, Mastercard, Amex; custom rates for JCB/Discover; Apple Pay, Google Pay, Click to Pay; token, recurring, MOTO and manual payments.</td>
              <td>eWAY states 1–3 day settlement.</td>
              <td>Provider-linked Eway Payments for Woo extension, authored by ewaypayments; v4.0.0, updated 12 Oct 2026.</td>
              <td>Amex treatment, international-card definition, exact cut-offs and acquirer role.</td>
            </tr>
            <tr>
              <td>Westpac OnlinePay</td>
              <td>1.25% flat fee for eftpos, Mastercard and Visa for eligible merchants; no lock-in, establishment or monthly fee; chargeback fees apply.</td>
              <td>eftpos, Visa, Mastercard, Apple Pay, Google Pay; Amex and JCB by separate agreement; 3DS in checkout.</td>
              <td>Before 8pm Sydney time, same day to eligible Westpac business transaction account.</td>
              <td>No official WordPress.org plugin found.</td>
              <td>Foreign-card share condition, April/October rate reviews and chargeback amounts.</td>
            </tr>
            <tr>
              <td>Westpac PayWay</td>
              <td>Product pages are largely quote-based. Westpac's cost-of-acceptance page refers to 0.79% for eligible EFTPOS terminals and PayWay from 1 Oct 2026.</td>
              <td>Hosted cards, PayPal, Apple Pay, Google Pay and PayTo Biller; API and virtual terminal support additional card brands.</td>
              <td>Approved Visa/Mastercard/UnionPay before 6pm Sydney time, same day.</td>
              <td>No official WordPress.org plugin found.</td>
              <td>Exact module fee, 0.79% eligibility, limits and 3DS availability by module.</td>
            </tr>
            <tr>
              <td>NAB Gateway</td>
              <td>$0 setup, $30 monthly access, 1.30% merchant service fee and $0.25 per transaction; negotiated pricing available.</td>
              <td>Online and virtual payments, Flex Microform, Apple Pay, Google Pay, Samsung Pay, Click to Pay, virtual terminal, recurring and batch.</td>
              <td>Before 10pm AEST/AEDT to a NAB Business Everyday Account, seven days a week.</td>
              <td>Official page references WooCommerce and Shopify integrations, not a WordPress.org plugin.</td>
              <td>Disputed-charge fees, exact card-brand list and Gateway versus Transact scope.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="eway-payment-gateway" className="text-2xl font-bold">
        eWAY: specialist online payments with a documented WooCommerce route
      </h2>
      <p>
        eWAY says it began in 1998 and became part of Global Payments in 2016.
        Its site footer identifies Web Active Corporation as the Australian
        entity. That background matters because some merchants want a
        payments-specialist provider rather than a bank bundle. The trade-off is
        that you still need to understand which eWAY product you are applying
        for: all-in-one payments or gateway-only with your own facility.
      </p>
      <p>
        The public pricing page is useful because it is specific. At the check
        date it showed 1.5% + 25c per transaction for Amex, Mastercard and Visa,
        plus a 1.99% international credit-card fee, with no setup, monthly or
        lock-in fees. However, eWAY's WooCommerce page describes 1.5% + 25c for
        domestic Visa and Mastercard. Confirm how Amex and international cards
        appear on your merchant agreement before you publish a price on your
        own site. See the
        <ExternalLink href="https://www.eway.com.au/pricing">
          {" "}
          official eWAY pricing page
        </ExternalLink>
        .
      </p>
      <p>
        On integration, eWAY publishes API documentation and links to the
        WooCommerce extension Eway Payments for Woo. The WordPress.org snapshot
        on 23 November 2026 listed the plugin under author <code>ewaypayments</code>,
        version 4.0.0, last updated 12 October 2026, with around 3,000 active
        installs. A separate plugin named eway-payment-gateway is by a different
        author and should not be treated as eWAY-authored. For platform setup
        detail, read our
        <Link href="/blogs/payment-gateways-shopify-woocommerce-australia" className="text-sky-800 underline">
          {" "}
          Shopify and WooCommerce Australia guide
        </Link>
        .
      </p>

      <h2 id="westpac-payment-gateway" className="text-2xl font-bold">
        Westpac: map OnlinePay before PayWay
      </h2>
      <p>
        Westpac's OnlinePay page calls it Westpac's payment gateway and lists a
        1.25% flat fee for eftpos, Mastercard and Visa for eligible merchants.
        There is no lock-in, establishment or monthly fee, but chargeback fees
        apply and the rate is tied to conditions including foreign-issued cards
        staying under 25% of card sales transactions. Westpac says the rate may
        be reviewed each April and October. Payments before 8pm Sydney time can
        settle the same day to an eligible Westpac business transaction account.
      </p>
      <p>
        PayWay is different. Its hosted checkout supports cards, PayPal, Apple
        Pay, Google Pay and PayTo Biller, while the API and virtual terminal
        pages list additional card brands. Westpac states that 3DS is available
        on the hosted payment page only for Visa and Mastercard. Most PayWay
        pricing is quote-based, so do not assume the OnlinePay 1.25% rate
        applies to a PayWay API agreement. A separate Westpac cost-of-acceptance
        page refers to 0.79% for eligible EFTPOS terminals and PayWay from 1
        October 2026; the interaction with quote-based agreements should be
        confirmed directly.
      </p>
      <p>
        We found no Westpac-authored plugin on WordPress.org. Plugins using the
        PayWay name were third-party, with low install counts and, in one case,
        no recent compatibility updates. If your store runs on WooCommerce,
        treat a custom or vetted third-party integration as a project with
        support ownership, not a one-click bank feature. Start with the
        <ExternalLink href="https://www.westpac.com.au/business-banking/merchants-and-payments/online-payments/onlinepay">
          {" "}
          official OnlinePay page
        </ExternalLink>
        and the relevant PayWay module page.
      </p>

      <h2 id="nab-payment-gateway" className="text-2xl font-bold">
        NAB: transparent published numbers, with naming to clarify
      </h2>
      <p>
        NAB Gateway's current public page is unusually specific: $0 setup, $30
        per month, 1.30% merchant service fee and $0.25 per transaction, with
        negotiated pricing available on application. The page describes online
        and virtual payments, Flex Microform, digital wallets, a virtual
        terminal, recurring billing and batch payments. It also says payments
        before 10pm AEST/AEDT settle the same day, seven days a week, to a NAB
        Business Everyday Account.
      </p>
      <p>
        Eligibility is not automatic. NAB lists an active ABN, an eligible
        business owner or office holder, no merchant facility terminated by an
        Australian financial institution in the previous 12 months, and a
        website that displays business details, prices, refund and delivery
        terms, privacy information and cardholder-data security information.
        Identity documents are required during application.
      </p>
      <p>
        Older cached pages refer to a 1.40% merchant service fee, so use the
        current page and ask NAB to confirm your rate in writing. Disputed-charge
        fees are referenced but not quantified publicly. Also note that NAB says
        surcharging functionality was disabled for NAB Gateway and NAB Transact
        on 30 September 2026. Review the
        <ExternalLink href="https://www.nab.com.au/business/payments-and-merchants/ecommerce-and-online-payments/nab-gateway">
          {" "}
          official NAB Gateway page
        </ExternalLink>
        and the broader
        <Link href="/blogs/best-payment-gateways-australia" className="text-sky-800 underline">
          {" "}
          Australian gateway comparison
        </Link>
        before you shortlist.
      </p>

      <h2 id="fees-that-catch-merchants-out" className="text-2xl font-bold">
        Fees that catch merchants out
      </h2>
      <ul className="list-disc space-y-3 pl-6">
        <li>
          <strong>Monthly fees.</strong> eWAY and OnlinePay publish no monthly
          fee; NAB Gateway lists $30. Monthly fees can still be cheaper at
          higher volume if the transaction rate is lower.
        </li>
        <li>
          <strong>International cards.</strong> eWAY lists +1.99%, while other
          providers may use different definitions or quote-based terms.
        </li>
        <li>
          <strong>Chargebacks.</strong> OnlinePay says chargeback fees apply;
          NAB references disputed-charge fees without a public amount.
        </li>
        <li>
          <strong>Platform fees.</strong> Shopify and other platforms may add
          their own charges when you use a third-party gateway. That belongs in
          your total-cost model.
        </li>
        <li>
          <strong>Eligibility conditions.</strong> Westpac's rate depends on a
          foreign-card threshold and review dates; NAB's rate may be negotiated.
        </li>
      </ul>
      <p>
        A useful way to compare is to model three monthly scenarios: your
        current volume, a low month and a peak month. Include transaction fees,
        monthly fees, international-card share, chargeback estimates and
        platform fees. The answer often changes when the assumptions change.
      </p>

      <h2 id="woocommerce-and-shopify" className="text-2xl font-bold">
        WooCommerce and Shopify practicalities
      </h2>
      <p>
        eWAY has the clearest provider-linked WooCommerce route of the three.
        NAB publishes WooCommerce and Shopify integration information on its
        Gateway page but not an official WordPress.org plugin. Westpac has
        product pages for OnlinePay and PayWay but no official plugin found in
        the directory snapshot.
      </p>
      <p>
        That does not mean bank gateways cannot be used with WooCommerce. It
        means you need a named integration route, a tested callback flow and a
        support owner. For Shopify, check whether the gateway is supported on
        your plan and how third-party gateway fees apply. Our
        <Link href="/blogs/payment-gateways-shopify-woocommerce-australia" className="text-sky-800 underline">
          {" "}
          platform-specific Australian gateway guide
        </Link>
        covers those checks in detail. If you are comparing broader brand
        options, see the
        <Link href="/blogs/stripe-payment-gateway-australia" className="text-sky-800 underline">
          {" "}
          Stripe Australia deep dive
        </Link>
        or the
        <Link href="/blogs/square-payment-gateway-australia" className="text-sky-800 underline">
          {" "}
          Square Australia deep dive
        </Link>
        .
      </p>

      <h2 id="2026-surcharging-changes" className="text-2xl font-bold">
        The 2026 surcharging change affects your checkout copy
      </h2>
      <p>
        From 1 October 2026, ACCC guidance says businesses can no longer
        surcharge Visa, Mastercard, American Express or eftpos cards. RBA
        material records no-surcharge decisions for eftpos, Mastercard and Visa,
        with Amex, PayPal and UnionPay also recorded as removing surcharging.
        Network rules and exceptions should be checked with your PSP. This is
        general information, not legal or tax advice.
      </p>
      <p>
        Do not simply rename a card fee as an admin or service fee. ACCC
        guidance says a fee linked to card use can still be a card surcharge. A
        weekend or public-holiday fee that applies regardless of payment method
        is different. Discounts for cash or another method may still be
        possible, provided prices are displayed clearly and not misleadingly.
        See the
        <ExternalLink href="https://www.accc.gov.au/business/pricing/card-surcharges">
          {" "}
          ACCC card surcharge guidance
        </ExternalLink>
        and the
        <ExternalLink href="https://www.rba.gov.au/payments-and-infrastructure/review-of-retail-payments-regulation/2026-03/conclusions-paper/surcharging.html">
          {" "}
          RBA surcharging conclusions
        </ExternalLink>
        .
      </p>

      <h2 id="how-to-choose" className="text-2xl font-bold">
        How to choose between the three
      </h2>
      <ol className="list-decimal space-y-3 pl-6">
        <li>Write down your exact card mix, including Amex and foreign-issued cards.</li>
        <li>Confirm whether you need an all-in-one facility or a gateway for an existing merchant account.</li>
        <li>Ask for written pricing, chargeback fees and settlement cut-offs.</li>
        <li>Check platform support and plugin ownership, not just a logo on a marketing page.</li>
        <li>Update checkout copy for the 2026 surcharging rules.</li>
        <li>Run a small live payment and reconcile it against the provider report before scaling.</li>
      </ol>
      <p>
        For a wider view that includes global providers and fraud context,
        return to the
        <Link href="/blogs/best-payment-gateways-australia" className="text-sky-800 underline">
          {" "}
          Australian payment gateway pillar guide
        </Link>
        . If you want to understand gateway platforms that sit behind resellers,
        read the
        <Link href="/blogs/nmi-payment-gateway-australia" className="text-sky-800 underline">
          {" "}
          NMI gateway explanation
        </Link>
        .
      </p>

      <h2 id="faq-eway-westpac-nab" className="text-2xl font-bold">
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
          <li>
            <ExternalLink href="https://www.eway.com.au/pricing">eWAY pricing</ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.eway.com.au/add-ons/woocommerce/">
              eWAY WooCommerce extension
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.westpac.com.au/business-banking/merchants-and-payments/online-payments/onlinepay">
              Westpac OnlinePay
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.westpac.com.au/business-banking/merchants-and-payments/online-payments/payway">
              Westpac PayWay
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.nab.com.au/business/payments-and-merchants/ecommerce-and-online-payments/nab-gateway">
              NAB Gateway
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.accc.gov.au/business/pricing/card-surcharges">
              ACCC card surcharges
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.rba.gov.au/payments-and-infrastructure/review-of-retail-payments-regulation/2026-03/conclusions-paper/interchange-fees.html">
              RBA interchange conclusions
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.pcisecuritystandards.org/document_library">
              PCI SSC Document Library
            </ExternalLink>
          </li>
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
  slug: "eway-vs-westpac-vs-nab-payment-gateway-australia",
  title: "eWAY vs Westpac vs NAB Payment Gateway: Which Is Best for Australian Stores? (2026)",
  author: "RankStack",
  date: "2026-11-23",
  updatedDate: "2026-11-23",
  type: "Comparison",
  categories: ["Payments", "Australia"],
  readingTime: "13 min read",
  description:
    "Compare eWAY, Westpac OnlinePay, PayWay and NAB Gateway with official 2026 pricing, settlement, wallets, WooCommerce plugin evidence, surcharging rules and key provider checks.",
  imageUrl: "/blog-banner-1200x675.webp",
  keywords: [
    "eway payment gateway",
    "westpac payment gateway",
    "nab payment gateway",
    "eWAY vs Westpac vs NAB",
    "Australian bank payment gateway",
    "eWAY pricing",
    "Westpac OnlinePay",
    "NAB Gateway",
    "payment gateway Australia comparison",
    "best payment gateway Australia",
  ],
  content: EwayVsWestpacVsNabContent,
};

export default article;
