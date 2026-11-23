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
    question: "Is Shopify Payments available in Australia?",
    answer:
      "Yes. Shopify's AU help page says Shopify Payments is available in Australia, subject to verification, business-type eligibility and bank-account requirements. Unsupported business categories must use a third-party provider.",
  },
  {
    question: "What bank account does Shopify Payments Australia require?",
    answer:
      "Shopify says the account must be with an Australian bank, in AUD, and eligible for BECS transfers. Savings accounts, flex-currency accounts, wire-only accounts and some money-transfer-style accounts are listed as unsupported.",
  },
  {
    question: "Do individual or sole-trader merchants need to live in Australia?",
    answer:
      "Shopify's AU requirements FAQ says individual and sole-proprietor applicants are required to live in Australia. Partnerships, companies and non-profits are not required to have a resident representative, but the business must be registered in Australia and have an Australian business address.",
  },
  {
    question: "Which cards and wallets does Shopify Payments support in Australia?",
    answer:
      "Visa, Mastercard, American Express and UnionPay are automatically activated. Apple Pay, Google Pay and Shop Pay are also automatically activated. Shopify POS in Australia can accept all EFTPOS cards. Availability is still subject to Shopify's verification and terms.",
  },
  {
    question: "Are local payment methods shown based on the Australian store location?",
    answer:
      "No. Shopify says local methods are displayed based on the customer's location, not the store's location, and must be activated in the admin. The AU help page lists methods including Bancontact, BLIK, iDEAL | Wero, MB WAY and Satispay, with extra conditions for some methods.",
  },
  {
    question: "What are Shopify Payments Australia's card rates?",
    answer:
      "On the official AU-locale pricing page checked 23 November 2026, online standard card rates were 1.7% + 30¢ on Basic, 1.55% + 30¢ on Grow, 1.35% + 30¢ on Advanced and 1.15% + 30¢ on Plus. Recheck the page before purchase because rates can change.",
  },
  {
    question: "Does Shopify charge extra if I use a third-party gateway?",
    answer:
      "Yes. Shopify charges third-party transaction fees in addition to the provider's processing fees. The AU pricing table checked 23 November 2026 showed 2% on Basic, 1% on Grow, 0.6% on Advanced and 0.2% on Plus. PayPal is exempt when Shopify Payments is the primary provider.",
  },
  {
    question: "Can Shopify Payments and a third-party provider be used together?",
    answer:
      "Yes, with limits. Shopify's help centre describes one direct third-party provider at a time as primary for cards, while Shopify Payments can handle Shop Pay, local methods and failed-card recovery. Shopify states a 1.25% premium applies to Shopify Payments-processed transactions in that setup.",
  },
  {
    question: "Can I use Stripe instead of Shopify Payments in Australia?",
    answer:
      "Shopify's gateway-availability guidance says standalone Stripe is not available where Shopify Payments is supported, because Stripe is Shopify Payments' banking partner. If Shopify Payments cannot be activated because of what you sell, Shopify says to use a different third-party provider that supports the business type. Check your live admin for the exact case.",
  },
  {
    question: "Is WooPayments available to Australian businesses?",
    answer:
      "Yes. WooCommerce lists Australia as a supported country. Its eligibility wording says the relevant country is where the business is registered, not where the owner personally lives. Supported merchants can accept customers anywhere in over 100 currencies.",
  },
  {
    question: "How much does WooPayments charge in Australia?",
    answer:
      "The official fee page checked 23 November 2026 listed cards at 1.75% + $0.30 and in-person at 1.7% + $0.10, with extra charges possible for international cards, currency conversion and disputes. A 10% GST note applies, with reverse-charge treatment where a GST-registered merchant supplies a valid GST ID.",
  },
  {
    question: "Do all WooCommerce payment plugins work with Checkout Blocks?",
    answer:
      "No. WooCommerce says Cart and Checkout blocks are the default for stores started after version 8.3 in November 2023, and an incompatible gateway may not appear as a payment option. Confirm compatibility from the plugin's official documentation or changelog before assuming support.",
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
  ["shopify-or-woocommerce", "Shopify or WooCommerce"],
  ["shopify-payments-australia", "Shopify Payments AU"],
  ["shopify-pricing-table", "Shopify pricing table"],
  ["shopify-third-party-rules", "Third-party gateway rules"],
  ["woopayments-australia", "WooPayments AU"],
  ["woocommerce-plugin-evidence", "Plugin evidence"],
  ["checkout-blocks", "Checkout Blocks"],
  ["provider-deep-dives", "Provider deep dives"],
  ["how-to-choose", "How to choose"],
  ["faq-platform-gateways", "Frequently asked questions"],
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

const PlatformPaymentGatewaysAustraliaContent = () => (
  <main>
    <FAQJsonLd />

    <section className="relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sky-950 via-slate-900 to-indigo-950 text-white">
      <div className="relative max-w-4xl px-6 py-16 text-center md:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-200">
          Platform guide — Australia
        </p>
        <p className="mt-3 text-xl font-semibold md:text-2xl">
          Shopify and WooCommerce gateway rules are not the same
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
          Official AU rates, eligibility, plugin evidence and checkout caveats checked 23 November 2026.
        </p>
      </div>
    </section>

    <article className="mx-auto max-w-3xl space-y-6 px-5 py-10 text-lg leading-relaxed text-slate-800">
      <Toc />
      <JumpLinks />

      <QuickSummary
        intro="A shopify payment gateway decision in Australia is mostly about Shopify Payments eligibility and third-party transaction fees. A woocommerce payment gateway decision is mostly about WooPayments eligibility, plugin ownership and Checkout Blocks compatibility. Treat the two platforms separately."
        points={[
          { text: "Shopify Payments is available in Australia, but requires an AUD BECS-capable Australian bank account." },
          { text: "Shopify AU standard card rates start at 1.7% + 30¢ on Basic; third-party gateways add plan-based fees." },
          { text: "WooPayments lists Australia as supported and charges 1.75% + $0.30 for cards, subject to extra method fees." },
          { text: "Check plugin author, update date and block-checkout compatibility before installing a gateway." },
        ]}
      />

      <KeyTakeaways
        title="Key takeaways"
        points={[
          "Shopify allows only one credit card payment provider at a time; third-party fees sit on top of processor fees.",
          "Use the forced AU-locale Shopify pricing URL; the bare AU URL redirected to Pakistan during research.",
          "WooPayments eligibility is based on where the business is registered, not where the owner lives.",
          "A plugin appearing in the directory does not prove Australian eligibility or Checkout Blocks support.",
          "Compare platform rules first, then choose the provider with the pillar and brand guides.",
        ]}
      />

      <p>
        Choosing a <strong>shopify payment gateway</strong> or a{" "}
        <strong>woocommerce payment gateway</strong> in Australia is not just a
        provider list exercise. Each platform has its own rules about who can
        use built-in payments, which bank accounts qualify, whether external
        processors attract extra fees and which plugins work at checkout. This
        guide uses official Shopify, WooCommerce and WordPress.org evidence
        checked on 23 November 2026.
      </p>
      <p>
        For the wider market, start with the{" "}
        <Link href="/blogs/best-payment-gateways-australia" className="text-sky-800 underline">
          {" "}
          Australian payment gateway pillar guide
        </Link>
        . If you need a processor-first comparison, the{" "}
        <Link href="/blogs/payment-gateways" className="text-sky-800 underline">
          {" "}
          global payment gateways guide
        </Link>
        covers general concepts, and the{" "}
        <Link href="/blogs/eway-vs-westpac-vs-nab-payment-gateway-australia" className="text-sky-800 underline">
          {" "}
          eWAY vs Westpac vs NAB comparison
        </Link>
        covers local options.
      </p>

      <h2 id="shopify-or-woocommerce" className="text-2xl font-bold">
        Shopify or WooCommerce: decide the platform constraints first
      </h2>
      <p>
        Shopify is a hosted platform with a native payments product and a
        directory of third-party providers. WooCommerce is a WordPress plugin
        that gives you more control over hosting, checkout code and plugin
        ownership, but that control moves more of the verification work to you.
        Neither platform has a universal “best gateway”; the right answer
        depends on the rules you can satisfy.
      </p>
      <p>
        A useful sequence is: confirm platform eligibility, confirm bank and
        business details, model the full fee stack, then test checkout on a
        real device. Only after those steps should you compare headline rates.
        That order prevents the common mistake of choosing a provider whose
        plugin installs cleanly but whose merchant agreement cannot be
        activated in Australia.
      </p>

      <h2 id="shopify-payments-australia" className="text-2xl font-bold">
        Shopify Payments Australia: eligibility and methods
      </h2>
      <p>
        Shopify's AU help page says Shopify Payments is available in Australia,
        subject to verification and eligibility. Unsupported business
        categories must use a third-party provider, and two-step authentication
        is required. For an Australian bank account, Shopify specifies an
        Australian bank, AUD currency and BECS eligibility. Savings accounts,
        flex-currency accounts, wire-only accounts and some money-transfer-style
        accounts are listed as unsupported.
      </p>
      <p>
        Individual and sole-proprietor applicants are required to live in
        Australia. Partnerships, companies and non-profits can have
        representatives outside Australia, but the business must be registered
        in Australia with an Australian business address. For prohibited
        categories, use the{" "}
        <ExternalLink href="https://www.shopify.com/legal/terms-payments/au#prohibited-businesses">
          {" "}
          Australia-specific Shopify Payments Terms of Service
        </ExternalLink>
        , not a generic list from another country.
      </p>
      <p>
        Automatically activated methods include Visa, Mastercard, American
        Express and UnionPay, plus Apple Pay, Google Pay and Shop Pay. Shopify
        POS in Australia can accept all EFTPOS cards. Local methods such as
        Bancontact, BLIK, iDEAL | Wero, MB WAY and Satispay must be activated in
        the admin and are displayed based on the customer's location, not the
        store's location. Some have extra conditions, such as an order threshold
        for iDEAL | Wero.
      </p>

      <h2 id="shopify-pricing-table" className="text-2xl font-bold">
        Shopify Payments Australia pricing, checked 23 November 2026
      </h2>
      <p>
        The figures below come from the official AU-locale pricing page with
        <code> ?country=au&lang=en</code>. During research, the bare AU URL
        redirected to a Pakistan locale, so always recheck with the forced
        locale before publishing or budgeting.
      </p>

      <div className="my-8 w-full overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Online standard cards</th>
              <th>Online Amex</th>
              <th>Online international</th>
              <th>In-person cards</th>
              <th>Third-party fee</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Basic</td><td>1.7% + 30¢ AUD</td><td>2.9% + 30¢ AUD</td><td>3.5% + 30¢ AUD</td><td>1.85% + 0¢</td><td>2%</td></tr>
            <tr><td>Grow</td><td>1.55% + 30¢ AUD</td><td>2.8% + 30¢ AUD</td><td>3.4% + 30¢ AUD</td><td>1.75% + 0¢</td><td>1%</td></tr>
            <tr><td>Advanced</td><td>1.35% + 30¢ AUD</td><td>2.7% + 30¢ AUD</td><td>3.3% + 30¢ AUD</td><td>1.65% + 0¢</td><td>0.6%</td></tr>
            <tr><td>Plus</td><td>1.15% + 30¢ AUD</td><td>2.6% + 30¢ AUD</td><td>3.2% + 30¢ AUD</td><td>1.45% + 0¢</td><td>0.2%</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Payouts for Australian stores are available in AUD on all plans. Shopify
        lists no minimum payout amount in Australia and states a minimum
        settlement time of two business days, while noting that the first
        settlement can take longer and banks typically need a further 24–72
        hours to deposit funds. Higher plans can access additional payout
        currencies, with multi-currency payout fees possible. See the{" "}
        <ExternalLink href="https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries/australia/payouts">
          {" "}
          official AU payouts page
        </ExternalLink>
        .
      </p>

      <h2 id="shopify-third-party-rules" className="text-2xl font-bold">
        Shopify third-party gateways: the fees people miss
      </h2>
      <p>
        Shopify says it supports more than 100 credit card payment providers.
        A third-party provider can be the sole card provider or be used alongside
        Shopify Payments, but the store owner is the only person who can add a
        provider, through Settings → Payments. Shopify's help centre also says
        only one credit card payment provider can be activated at a time.
      </p>
      <p>
        The third-party transaction fee is charged by Shopify in addition to the
        provider's processing fee. The plan-based rates are shown in the table
        above. Shopify lists exceptions for Shopify Payments, Shop Pay, Shop Pay
        Installments, cash, cash on delivery and bank transfers when Shopify
        Payments is used; PayPal is also exempt if Shopify Payments is the
        primary provider. For stores created on or after 12 May 2025, orders
        containing store credit or gift cards can attract a third-party fee on
        that portion of the order even when Shopify Payments is used.
      </p>
      <p>
        The combined setup has a further nuance. Shopify's help centre says a
        direct third-party provider can be primary for cards while Shopify
        Payments handles Shop Pay, local methods and failed-card recovery, with a
        <strong> 1.25% premium</strong> on Shopify Payments-processed transactions.
        It is not available in multi-entity configurations and Plus contract
        flexibility may be required.
      </p>
      <p>
        One common question is whether standalone Stripe can replace Shopify
        Payments. Shopify's gateway-availability guidance says standalone Stripe
        is not available where Shopify Payments is supported because Stripe is
        Shopify Payments' banking partner. If Shopify Payments cannot be
        activated because of what you sell, Shopify says to choose another
        third-party provider that supports the business type. Do not assume
        Stripe is the automatic fallback. For a deeper Stripe product review, see
        the{" "}
        <Link href="/blogs/stripe-payment-gateway-australia" className="text-sky-800 underline">
          {" "}
          Stripe Australia deep dive
        </Link>
        .
      </p>
      <p>
        Shopify's gateway directory is dynamic, so this guide does not publish
        an exhaustive Australian gateway list. Use Shopify's{" "}
        <ExternalLink href="https://www.shopify.com/payment-gateways">
          {" "}
          filterable payment gateway directory
        </ExternalLink>
        and check the provider's own AU page before building a shortlist.
      </p>

      <h2 id="woopayments-australia" className="text-2xl font-bold">
        WooPayments Australia: eligibility and fees
      </h2>
      <p>
        WooCommerce lists Australia as a supported country for WooPayments. Its
        wording is precise: for a business, the relevant country is the one
        where the business is registered, not where the owner personally lives.
        Once accepted, a merchant can accept customers anywhere in over 100
        supported currencies. The{" "}
        <ExternalLink href="https://woocommerce.com/payments/australia/">
          {" "}
          Australian WooPayments page
        </ExternalLink>
        positions it as free to start with no setup or monthly fees, supporting
        cards, Apple Pay, recurring revenue, accelerated checkout and 135+
        currencies.
      </p>

      <div className="my-8 w-full overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th>Method</th>
              <th>Base fee</th>
              <th>International payment</th>
              <th>Currency conversion</th>
              <th>Dispute</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Cards</td><td>1.75% + $0.30</td><td>+1.50%</td><td>+2.00%</td><td>$25.00</td></tr>
            <tr><td>In-person</td><td>1.7% + $0.10</td><td>+0.6%</td><td>Not applicable</td><td>$25.00</td></tr>
            <tr><td>Afterpay</td><td>6.00% + $0.30</td><td>Not listed</td><td>Not listed</td><td>Not listed</td></tr>
            <tr><td>Alipay</td><td>2.90% + $0.30</td><td>Not listed</td><td>+2.00%</td><td>Not listed</td></tr>
            <tr><td>WeChat Pay</td><td>2.90% + $0.30</td><td>Not listed</td><td>+2.00%</td><td>Not listed</td></tr>
            <tr><td>SEPA</td><td>0.80% + $0.30, capped at $8.00</td><td>+1.50%</td><td>+2.00%</td><td>$12.00</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The fee page also notes a 10% GST on WooPayments service fees. For
        GST-registered merchants providing a valid GST ID, no GST is charged
        because the supply is subject to reverse-charge treatment. Do not make a
        tax determination from this guide alone; check your own GST position.
        See the{" "}
        <ExternalLink href="https://woocommerce.com/document/woopayments/fees/">
          {" "}
          official WooPayments fee page
        </ExternalLink>
        .
      </p>

      <h2 id="woocommerce-plugin-evidence" className="text-2xl font-bold">
        WooCommerce plugin evidence, checked 23 November 2026
      </h2>
      <p>
        The WordPress.org API does not expose a formal “official” badge. The
        table below reports the author field, version, update date, active
        installs and tested field as a dated snapshot. Treat author evidence as
        a signal, not certification.
      </p>

      <div className="my-8 w-full overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th>Plugin</th>
              <th>Author field</th>
              <th>Version</th>
              <th>Last updated</th>
              <th>Active installs</th>
              <th>Interpretation</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>WooPayments</td><td>WooCommerce</td><td>11.3.0</td><td>11 Nov 2026</td><td>800,000</td><td>WooCommerce first-party author field.</td></tr>
            <tr><td>WooCommerce Stripe Payment Gateway</td><td>WooCommerce</td><td>11.2.0</td><td>10 Nov 2026</td><td>700,000</td><td>Listing says official, created by Stripe and WooCommerce.</td></tr>
            <tr><td>WooCommerce PayPal Payments</td><td>WooCommerce</td><td>4.2.2</td><td>9 Nov 2026</td><td>700,000</td><td>WooCommerce first-party author field.</td></tr>
            <tr><td>WooCommerce Square</td><td>WooCommerce</td><td>5.5.3</td><td>4 Nov 2026</td><td>80,000</td><td>WooCommerce-listed; do not claim Square-created without more evidence.</td></tr>
            <tr><td>Afterpay Gateway for WooCommerce</td><td>Afterpay</td><td>3.9.0</td><td>14 Oct 2026</td><td>10,000</td><td>Brand-author field; check current AU eligibility.</td></tr>
            <tr><td>zipMoney / Zip Co Payments</td><td>Zip Co Limited</td><td>2.4.2</td><td>16 Oct 2026</td><td>2,000</td><td>Brand-author field; check current AU eligibility.</td></tr>
            <tr><td>Eway Payments for Woo</td><td>ewaypayments</td><td>4.0.0</td><td>12 Oct 2026</td><td>3,000</td><td>Brand-author field; homepage points to WooCommerce Marketplace.</td></tr>
            <tr><td>Eway Payment Gateway</td><td>webaware</td><td>5.3.1</td><td>24 Sep 2026</td><td>800</td><td>Third-party developer; not first-party eWAY.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        No Westpac or NAB authored plugin was found in the directory snapshot.
        eWAY's own site links to the Eway Payments for Woo extension under the
        ewaypayments author field. NMI plugins found in the search were
        third-party. These distinctions matter because plugin support and
        merchant approval are separate questions.
      </p>

      <h2 id="checkout-blocks" className="text-2xl font-bold">
        Checkout Blocks can change the answer
      </h2>
      <p>
        WooCommerce says Cart and Checkout blocks are the default experience for
        stores started after version 8.3 in November 2023. If a payment gateway
        is not compatible with block checkout, it may not appear as a payment
        option; the editor can name the incompatible extension and suggest
        switching to classic checkout. WooCommerce also says that if no warning
        appears, you should check the extension's documentation or contact the
        developer to confirm compatibility.
      </p>
      <p>
        WooPayments documentation adds a related caveat: Checkout Field Editor
        works only on the classic shortcode checkout, not the newer Checkout
        block. Before you commit to a gateway, test the full journey: product
        page, cart, checkout, payment, order confirmation, refund and webhook or
        callback reconciliation. A green install badge is not the same as a
        working checkout.
      </p>

      <h2 id="provider-deep-dives" className="text-2xl font-bold">
        Where the provider deep dives fit
      </h2>
      <p>
        If your Shopify store cannot use Shopify Payments, or your WooCommerce
        store needs a specific processor, use the provider guides to narrow the
        list. The{" "}
        <Link href="/blogs/square-payment-gateway-australia" className="text-sky-800 underline">
          {" "}
          Square Australia deep dive
        </Link>
        explains its in-person and online rates, Afterpay and WooCommerce
        connection. The{" "}
        <Link href="/blogs/nmi-payment-gateway-australia" className="text-sky-800 underline">
          {" "}
          NMI gateway explainer
        </Link>
        is most useful if a bank, ISO or SaaS vendor presents you with an NMI
        powered service. The local comparison above covers eWAY, Westpac and
        NAB.
      </p>
      <p>
        For merchants operating outside Australia, the cluster also includes a{" "}
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
        . Keep the country rules separate; a plugin that works in one market
        does not transfer automatically.
      </p>

      <h2 id="how-to-choose" className="text-2xl font-bold">
        A practical selection checklist
      </h2>
      <ol className="list-decimal space-y-3 pl-6">
        <li>Confirm your business category is eligible for Shopify Payments or WooPayments.</li>
        <li>Check the bank account, BECS and business-registration requirements.</li>
        <li>Write down the processing rate, platform fee and method-specific surcharge for each option.</li>
        <li>Verify plugin author, last update and Checkout Blocks compatibility.</li>
        <li>Test a live payment and a refund before moving your full catalogue.</li>
        <li>Recheck pricing on the official locale page on the day you decide.</li>
      </ol>
      <p>
        If you only remember one thing, make it this: platform rules come first,
        provider rates second. A lower processing percentage cannot compensate
        for a gateway that cannot be activated for your business or that fails
        at your checkout.
      </p>

      <h2 id="faq-platform-gateways" className="text-2xl font-bold">
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
          <li><ExternalLink href="https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries/australia">Shopify Payments for Australia</ExternalLink></li>
          <li><ExternalLink href="https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries/australia/payment-methods">Shopify AU payment methods</ExternalLink></li>
          <li><ExternalLink href="https://www.shopify.com/au/pricing?country=au&lang=en">Shopify AU pricing, forced locale</ExternalLink></li>
          <li><ExternalLink href="https://help.shopify.com/en/manual/payments/third-party-providers/configuring-providers">Configuring Shopify third-party providers</ExternalLink></li>
          <li><ExternalLink href="https://help.shopify.com/en/manual/payments/third-party-providers/payment-gateway-availability">Shopify gateway availability</ExternalLink></li>
          <li><ExternalLink href="https://woocommerce.com/document/woopayments/compatibility/countries/">WooPayments supported countries</ExternalLink></li>
          <li><ExternalLink href="https://woocommerce.com/document/woopayments/fees/">WooPayments fees</ExternalLink></li>
          <li><ExternalLink href="https://woocommerce.com/document/woocommerce-store-editing/customizing-cart-and-checkout/">WooCommerce Cart and Checkout blocks</ExternalLink></li>
        </ul>
      </aside>

      <p className="text-sm text-slate-500">
        Reviewed 23 November 2026. Platform fees, plugin metadata and eligibility
        can change. This is general information, not tax or legal advice. Confirm
        all terms with Shopify, WooCommerce or the provider before launch.
      </p>
    </article>
  </main>
);

const article = {
  slug: "payment-gateways-shopify-woocommerce-australia",
  title: "Best Payment Gateways for Shopify & WooCommerce in Australia (2026)",
  author: "RankStack",
  date: "2026-11-23",
  updatedDate: "2026-11-23",
  type: "Guide",
  categories: ["Payments", "Australia", "Ecommerce"],
  readingTime: "15 min read",
  description:
    "Compare Shopify Payments Australia rates, third-party gateway fees, WooPayments eligibility and plugin evidence, Checkout Blocks caveats and provider checks, verified 23 Nov 2026.",
  imageUrl: "/blog-banner-1200x675.webp",
  keywords: [
    "shopify payment gateway",
    "woocommerce payment gateway",
    "shopify payment gateway australia",
    "woocommerce payment gateway australia",
    "Shopify Payments Australia",
    "WooPayments Australia",
    "Shopify third party transaction fees Australia",
    "WooCommerce payment plugins Australia",
    "best payment gateways for Shopify and WooCommerce Australia",
  ],
  content: PlatformPaymentGatewaysAustraliaContent,
};

export default article;
