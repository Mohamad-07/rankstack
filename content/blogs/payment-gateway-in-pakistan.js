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
    question: "What regulates payment gateways in Pakistan?",
    answer:
      "The State Bank of Pakistan regulates the country's payment ecosystem. It licenses non-bank electronic money institutions and sets the rules for payment service providers, while Raast is the national instant-payment infrastructure. Always check a provider's current SBP status through SBP or written confirmation from the company before you treat a licence claim as verified.",
  },
  {
    question: "Is a digital wallet the same as a payment gateway?",
    answer:
      "No. A wallet such as JazzCash or Easypaisa stores value for a consumer. A payment gateway is the merchant-facing layer that accepts a payment, routes it through the relevant rail, and helps reconcile the order. Some brands offer both a consumer wallet and a merchant acceptance product, which is why the terms are often confused.",
  },
  {
    question: "Which payment methods should a Pakistani online store support?",
    answer:
      "Demand varies by audience, but common options include locally issued debit and credit cards, JazzCash and Easypaisa wallets, bank transfers, Raast QR or Raast payment requests, over-the-counter voucher payments, and cash on delivery. Confirm the exact methods a provider supports for your merchant category instead of copying another store's checkout.",
  },
  {
    question: "Does JazzCash have an official WooCommerce plugin?",
    answer:
      "We could not find an official JazzCash WooCommerce plugin in the WordPress.org directory at the time of research. Third-party plugins exist, but at least one states clearly that it is not affiliated with JazzCash. Treat these as independent integrations and verify credentials, settlement, and support directly with both the plugin author and JazzCash.",
  },
  {
    question: "Does Easypaisa have an official WooCommerce plugin?",
    answer:
      "Easypaisa publishes merchant integration guides and operates a merchant portal, but we could not find an official Easypaisa WooCommerce plugin. A WooCommerce store normally needs a custom integration, a vetted third-party connector, or a transparent manual-payment workflow.",
  },
  {
    question: "Is PayFast Pakistan the same company as PayFast in South Africa?",
    answer:
      "No. The Pakistan service is associated with Premier PayFast and uses the gopayfast and premierpayfast domains. PayFast in South Africa uses payfast.io, and the widely installed WordPress plugin named WooCommerce Payfast Gateway is described by its author as a South African gateway. Do not use South African documentation to configure a Pakistani store.",
  },
  {
    question: "Which XPay is the Pakistan payment gateway?",
    answer:
      "The Pakistan product we found is XPay by PostEx at xpay.postexglobal.com. Other unrelated products use similar names, including xpay.app in Egypt, xpaypk.com as a digital-asset exchange, Nexi XPay in Italy, and getxpay.com. We found no verified evidence linking Pakistan XPay to Network International.",
  },
  {
    question: "Are the payment gateway fees in Pakistan fixed by SBP?",
    answer:
      "Not as a single public price list. Providers set commercial terms within the regulatory framework, and merchant discount rates may depend on contract, method, and category. JazzCash and Easypaisa publicly say limits follow SBP regulations and that an MDR may apply under the agreement. Ask for a written schedule and verify any published figure with the provider.",
  },
  {
    question: "Is the Raast merchant QR subsidy still available in 2026?",
    answer:
      "An SBP circular dated 23 September 2025 announced a subsidy for Raast person-to-merchant QR transactions from 1 September 2025 to 30 June 2026. That stated window has ended as of this article's review date. Check for a newer SBP circular before assuming any subsidy still applies.",
  },
  {
    question: "Can I accept payments without a merchant account?",
    answer:
      "You can display a wallet number or QR code and ask customers to upload a receipt, but that is a manual verification workflow, not an automated gateway integration. It creates reconciliation work and does not give you the same API-level status messages, tokenisation, or automated refund paths as a gateway connection.",
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
  ["what-a-payment-gateway-in-pakistan-actually-does", "What a gateway actually does"],
  ["regulatory-basics-sbp-raast-and-licensed-providers", "SBP, Raast and licensed providers"],
  ["payment-methods-customers-expect", "Payment methods customers expect"],
  ["provider-overview-jazzcash-easypaisa-payfast-and-xpay", "Provider overview"],
  ["how-to-choose-payment-gateway-solutions-for-ecommerce-business", "How to choose a gateway"],
  ["integration-paths-api-plugin-or-manual", "API, plugin or manual workflow"],
  ["costs-and-commercial-terms-checklist", "Costs and commercial terms"],
  ["security-and-compliance-checklist", "Security and compliance"],
  ["implementation-checklist-for-businesses", "Implementation checklist"],
  ["faq-payment-gateway-in-pakistan", "Frequently asked questions"],
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

const PaymentGatewayPakistanContent = () => (
  <main>
    <FAQJsonLd />

    <section className="relative flex w-full items-center justify-center overflow-hidden bg-emerald-950 text-white">
      <img
        src="/online-banking-banner-website-internet-mobile-phone-blue-background-electronic-bank-payment-copy-space-digital-204929150.webp"
        alt="Online banking and digital payment interfaces used for business payments"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="relative max-w-4xl px-6 py-16 text-center md:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
          Pakistan payments guide
        </p>
        <p className="mt-3 text-xl font-semibold md:text-2xl">
          Choose a gateway on evidence, not on marketing claims
        </p>
      </div>
    </section>

    <article className="mx-auto max-w-3xl space-y-6 px-5 py-10 text-lg leading-relaxed text-slate-800">
      <Toc />
      <JumpLinks />

      <QuickSummary
        intro="A payment gateway in Pakistan is not a single product. It is a regulated acceptance layer that connects your store or invoice to cards, wallets, bank transfers, and Raast rails. The right choice depends on your customers, your platform, and the terms the provider confirms in writing."
        points={[
          { text: "SBP sets the framework; provider marketing is not the same as regulator verification." },
          { text: "JazzCash and Easypaisa expose merchant acceptance products, but no official WooCommerce plugin was verified." },
          { text: "PayFast Pakistan and XPay Pakistan are frequently confused with unrelated international products." },
          { text: "Fees, settlement, and limits belong in a written schedule, not in a generic comparison table." },
        ]}
      />

      <KeyTakeaways
        title="Key takeaways"
        points={[
          "Start with the payment methods your actual customers use, then shortlist gateways that support them.",
          "Treat SBP and WooCommerce documentation as primary sources; treat provider pages as claims to confirm.",
          "Distinguish an API integration, a third-party plugin, and a manual receipt-upload workflow.",
          "Ask for written merchant terms covering MDR, setup, settlement, refunds, chargebacks, and taxes.",
          "Use a sandbox and a small live test before routing full order volume through any new gateway.",
        ]}
      />

      <p>
        Online payments in Pakistan have moved well beyond a single card form. A customer may
        want to pay from a JazzCash wallet, an Easypaisa app, a locally issued debit card, a
        bank transfer, a Raast QR code, or an over-the-counter voucher. Your business still
        needs one reliable way to authorise the payment, record it against the correct order,
        and reconcile the money that arrives. That is the job of a payment gateway.
      </p>
      <p>
        This guide is written for founders, finance teams, and developers who need to choose
        payment gateway solutions for ecommerce business in Pakistan without repeating
        unverified claims. Where a number or integration cannot be confirmed from a primary
        source, we say so and tell you what to ask instead.
      </p>

      <h2 id="what-a-payment-gateway-in-pakistan-actually-does" className="text-2xl font-bold">
        What a payment gateway in Pakistan actually does
      </h2>
      <p>
        A gateway is the merchant-facing technology between your checkout and the payment
        rails behind it. It presents a payment form or hosted checkout, collects the instrument
        details through an approved flow, requests authorisation, returns a status to your
        store, and exposes reports or APIs for reconciliation. It is not simply a bank account
        number pasted onto a website, and it is not the same thing as a consumer wallet.
      </p>
      <p>
        The confusion is understandable. JazzCash and Easypaisa are widely known as consumer
        wallets, yet both also publish merchant-facing acceptance products. PayFast Pakistan
        and XPay present themselves as payment infrastructure providers with APIs and hosted
        checkout. A wallet can be one funding source inside a gateway checkout, while the
        gateway remains the layer your store integrates with. When comparing providers, always
        ask: <em>what exactly am I integrating, and who owns the settlement relationship?</em>
      </p>
      <p>
        A useful mental model has four parts: the customer instrument, the gateway or payment
        service provider, the rail or network that moves the value, and the merchant's bank or
        business wallet that receives the settlement. Different providers occupy different
        positions in that chain. Some are registered payment service providers, some are
        electronic money institutions, and some are software layers that connect to another
        licensed institution. The commercial label matters less than the regulated entity that
        actually moves the money.
      </p>

      <h2 id="regulatory-basics-sbp-raast-and-licensed-providers" className="text-2xl font-bold">
        Regulatory basics: SBP, Raast, and licensed providers
      </h2>
      <p>
        Pakistan's payment ecosystem is overseen by the State Bank of Pakistan. Before you
        compare feature lists, understand the two institutional categories that appear most
        often in provider copy.
      </p>

      <h3 id="emis-and-pso-psps" className="text-xl font-semibold">
        EMIs and PSO/PSPs
      </h3>
      <p>
        The SBP describes electronic money institutions, or EMIs, as non-bank entities licensed
        to issue e-money services. Their listed use cases include digital wallets, person-to-
        person transfers, merchant payments, bill payments, QR payments, prepaid cards, and
        contactless payments. Payment service operators and payment service providers are
        separate concepts in the same ecosystem. You can read the SBP's own explanation on its
        <ExternalLink href="https://www.sbp.org.pk/our-operations/payments-ecosystem-and-infrastructure/emis-and-pso-psps">
          {" "}
          EMIs and PSO/PSPs page
        </ExternalLink>
        .
      </p>
      <p>
        This distinction matters because a company may operate a wallet, a gateway, or both
        under different permissions. A provider's website saying it is licensed is a claim;
        a current SBP record or written confirmation is stronger evidence. The SBP's public
        directory is the right place to verify an entity, and your merchant agreement should
        name the regulated party that is actually responsible for the service you are buying.
      </p>

      <h3 id="raast-and-p2m-qr" className="text-xl font-semibold">
        Raast and person-to-merchant QR
      </h3>
      <p>
        Raast is Pakistan's national instant-payment system. For merchants, the person-to-
        merchant QR flow lets a customer pay from a participating bank app or wallet, with the
        transaction credited to the merchant's account. JazzCash, for example, publicly
        describes Raast QR as a way for customers of participating apps and wallets to pay a
        merchant in real time. The SBP explains the wider system on its
        <ExternalLink href="https://www.sbp.org.pk/our-operations/payments-ecosystem-and-infrastructure/raast">
          {" "}
          Raast page
        </ExternalLink>
        .
      </p>
      <p>
        Be careful with old articles about the Raast merchant subsidy. An SBP circular dated
        23 September 2025 set out a PKR 3.5 billion allocation for Raast person-to-merchant QR
        transactions between 1 September 2025 and 30 June 2026. It described a subsidy of
        0.5% of transaction value or PKR 100, whichever is lower, shared between the merchant
        and customer financial institutions, with participating institutions also able to
        charge up to 0.25% under the circular's terms. That stated period has ended. Do not
        assume the subsidy is active in 2026; look for a newer SBP circular or ask the provider
        for its current Raast pricing. You can read the original
        <ExternalLink href="https://www.sbp.org.pk/circulars/pspod-circular-no-03-of-2025">
          {" "}
          PSPOD Circular No. 03 of 2025
        </ExternalLink>
        .
      </p>

      <h2 id="payment-methods-customers-expect" className="text-2xl font-bold">
        Payment methods Pakistani customers expect
      </h2>
      <p>
        A good gateway shortlist begins with customer behaviour, not with a provider logo.
        Pakistani online buyers are not uniform: a fashion store, a B2B supplier, and a digital
        service may each need a different mix. Common categories include:
      </p>
      <ul className="list-disc space-y-3 pl-6">
        <li>
          <strong>Locally issued cards.</strong> Visa, Mastercard, and local schemes such as
          PayPak may be relevant, subject to the provider's supported list and the merchant
          category. Ask whether 3-D Secure is used and who bears liability for a disputed card
          transaction.
        </li>
        <li>
          <strong>Mobile wallets.</strong> JazzCash and Easypaisa are household names, and
          both have merchant acceptance offerings. Confirm whether checkout uses a wallet
          app, a mobile account flow, a voucher code, or an over-the-counter payment.
        </li>
        <li>
          <strong>Bank transfer and Raast.</strong> These can suit higher-value orders and
          customers who do not want to share card details online. Ask how the gateway matches
          an incoming transfer to an order and how it handles underpayments.
        </li>
        <li>
          <strong>QR and in-app payments.</strong> QR flows are increasingly common, but the
          customer still needs a participating app. Confirm which apps and financial
          institutions are covered for your merchant setup.
        </li>
        <li>
          <strong>Over-the-counter and voucher payments.</strong> Useful for customers without
          cards or wallets, but they introduce different reconciliation and refund steps.
          Ask for the exact status messages your platform will receive.
        </li>
        <li>
          <strong>Cash on delivery.</strong> Often requested by Pakistani merchants, but it is
          not a card-gateway feature. It needs separate order-state, courier, and reconciliation
          logic.
        </li>
      </ul>
      <p>
        Do not treat a long method list as proof that every method works for every merchant.
        Eligibility can depend on your business category, documents, contract, and the customer's
        own app or bank. A method that appears on a provider's marketing page may still need
        written confirmation for your account.
      </p>

      <h2 id="provider-overview-jazzcash-easypaisa-payfast-and-xpay" className="text-2xl font-bold">
        Provider overview: JazzCash, Easypaisa, PayFast, and XPay
      </h2>
      <p>
        The table below separates what we could confirm from official pages from claims that
        need provider confirmation. It is a shortlisting aid, not a ranking.
      </p>

      <div className="my-8 w-full overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th>Provider</th>
              <th>What it publicly presents</th>
              <th>Payment methods we could verify from official pages</th>
              <th>WooCommerce position</th>
              <th>Confirm before signing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>JazzCash</td>
              <td>Payment Gateway, Raast QR, and Tap on Phone merchant products.</td>
              <td>Mobile Account, voucher or USSD or MPIN flow, Raast QR, and card acceptance through Tap on Phone. The site says 5+ methods, limits per SBP, and MDR per agreement.</td>
              <td>No official WooCommerce plugin found. Third-party plugins exist and at least one disclaims affiliation.</td>
              <td>Merchant account type, method availability, MDR, settlement, refund path, and plugin ownership.</td>
            </tr>
            <tr>
              <td>Easypaisa</td>
              <td>Business online payment gateway with a merchant portal and published integration guides.</td>
              <td>App and over-the-counter acceptance are stated on the business page. Integration guides expose codes including OTC, MA, CC, IB, OMW, QR, TILL, DD, and MINI_APP_MA; the fetched page does not define every code.</td>
              <td>No official WooCommerce plugin found. Integration guides point to a custom connection.</td>
              <td>Meaning of each code, onboarding documents, sandbox access, BVS step, and live credentials.</td>
            </tr>
            <tr>
              <td>PayFast Pakistan</td>
              <td>Premier PayFast and gopayfast present an SBP-licensed PSP and Raast merchant service provider offering hosted checkout and REST APIs.</td>
              <td>Provider FAQ lists Visa and Mastercard with 3-D Secure, UnionPay, PayPak, bank transfers, JazzCash and Easypaisa, Raast QR, and Raast RTP. Treat as provider claims.</td>
              <td>OneCheckout claims ready-made plugins including WooCommerce, but no matching plugin was found in the WordPress.org directory.</td>
              <td>Exact plugin URL, current version, fee schedule, settlement cycle, refund window, and NTN requirement.</td>
            </tr>
            <tr>
              <td>XPay Pakistan</td>
              <td>XPay by PostEx at xpay.postexglobal.com presents on-site checkout, tokenisation, subscriptions, fraud tooling, payment links, and dynamic routing.</td>
              <td>Provider pages list cards, wallets, bank transfers, Google Pay, and cash on delivery. Treat as provider claims.</td>
              <td>Platforms page claims a WooCommerce plugin. No Pakistan-specific plugin was found in WordPress.org; the existing XPay plugin belongs to an Egyptian company.</td>
              <td>Plugin download source, ownership, pricing scope, method list, and ownership of the merchant relationship.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="jazzcash-payment-gateway" className="text-xl font-semibold">
        JazzCash payment gateway
      </h3>
      <p>
        JazzCash's official business page presents a payment gateway, Raast QR, and Tap on
        Phone. Its checkout material says customers can pay using a Mobile Account or voucher
        and USSD or MPIN flow, and that Raast QR payments from participating apps can be
        credited in real time to a JazzCash Business account. Tap on Phone is described for
        NFC-enabled Android devices with supported debit and credit cards. The same material
        says limits follow SBP regulations and that an MDR may apply under the merchant
        agreement. See the official
        <ExternalLink href="https://www.jazzcash.com.pk/business/accept-payments/payment-gateway">
          {" "}
          JazzCash payment gateway page
        </ExternalLink>
        .
      </p>
      <p>
        What we did not find is an official JazzCash WooCommerce plugin in the WordPress.org
        directory. A third-party plugin called Fauran Pay with JazzCash for WooCommerce was
        published in July 2026, lists classic checkout rather than Cart and Checkout Blocks,
        and states that it is not affiliated with JazzCash. That does not make the plugin
        useless, but it does mean your due diligence must cover the plugin author separately
        from the payment brand. For a platform-by-platform breakdown, see our
        <Link href="/blogs/best-payment-gateway-woocommerce-pakistan" className="text-emerald-800 underline">
          {" "}
          WooCommerce payment gateway guide for Pakistan
        </Link>
        .
      </p>

      <h3 id="easypaisa-payment-gateway" className="text-xl font-semibold">
        Easypaisa payment gateway
      </h3>
      <p>
        Easypaisa's business solutions page describes an online payment gateway that lets
        customers pay through the easypaisa app or over the counter, with activity tracked in
        a merchant portal. Its merchant integration guides expose a set of method filters and
        codes, but the publicly fetched page does not expand every acronym, so we will not
        guess what each one means. The practical lesson is to obtain a written method matrix
        for your own account instead of copying a generic list. Start with the official
        <ExternalLink href="https://easypaisa.com.pk/business-solutions/">
          {" "}
          Easypaisa business solutions page
        </ExternalLink>
        .
      </p>
      <p>
        The published onboarding path is equally important. It references a merchant portal,
        review and approval, live credentials by email, sandbox details by email, staging
        integration and testing, go-live, and a BVS step against a seller code at a nearby
        Easypaisa franchise. That last step is easy to miss in a comparison article, yet it can
        affect a launch date. Ask Easypaisa which of these steps apply to your business category
        and documents before promising a go-live date to your team.
      </p>

      <h3 id="payfast-pakistan" className="text-xl font-semibold">
        PayFast Pakistan
      </h3>
      <p>
        The Pakistan service appears under Premier PayFast and gopayfast, with the parent
        company describing Premier PayFast as the first payment gateway in Pakistan to receive
        commercial approval from SBP and as an SBP-licensed PSP and Raast merchant service
        provider. Those are company statements and should be verified against SBP records or
        written confirmation. Its own developer documentation describes a REST API with token
        creation, transaction endpoints, tokenised and recurring charges, OTP and 3-D Secure
        flows, and status polling. Review the
        <ExternalLink href="https://premierpayfast.com/developers/">
          {" "}
          PayFast developer documentation
        </ExternalLink>
        and the parent company's
        <ExternalLink href="https://www.premier.com.pk/avanza-premier-payment-services-pvt-limited/">
          {" "}
          company page
        </ExternalLink>
        .
      </p>
      <p>
        PayFast's FAQ contains specific commercial figures, including a one-time setup amount,
        a stated settlement cycle, and an NTN requirement. Because the site was intermittently
        inaccessible during research and those figures are provider-published rather than
        regulator-verified, we will not present them as universal facts. Put every figure in
        the merchant agreement or in an email from the provider before you budget around it.
        Also note that the widely installed WordPress plugin called WooCommerce Payfast Gateway
        belongs to PayFast South Africa, not PayFast Pakistan.
      </p>

      <h3 id="xpay-pakistan" className="text-xl font-semibold">
        XPay Pakistan
      </h3>
      <p>
        When Pakistani search results say XPay, several unrelated products can appear. The one
        relevant here is XPay by PostEx at xpay.postexglobal.com. Its site describes on-site
        checkout, tokenisation, subscriptions, an XShield fraud engine, payment links, dynamic
        routing, and payment methods including cards, wallets, bank transfers, Google Pay, and
        cash on delivery. Its platforms page claims a WooCommerce plugin, but no Pakistan-
        specific plugin was found in the WordPress.org directory. The plugin named XPay for
        WooCommerce connects to an Egyptian service and should not be presented as Pakistan
        XPay. See
        <ExternalLink href="https://xpay.postexglobal.com/">
          {" "}
          Pakistan XPay
        </ExternalLink>
        and the separate
        <ExternalLink href="https://wordpress.org/plugins/xpay-for-woocommerce/">
          {" "}
          Egyptian XPay plugin
        </ExternalLink>
        to compare the domains yourself.
      </p>
      <p>
        XPay's pricing page displays a per-transaction rate beside some product cards, but the
        page context does not make clear whether that rate applies to every WooCommerce
        merchant in Pakistan. Treat it as an indicative marketing figure and request a written
        quote for your exact method mix. We also found no verified evidence linking Pakistan
        XPay to Network International; do not repeat that claim without a primary source.
      </p>

      <h2 id="how-to-choose-payment-gateway-solutions-for-ecommerce-business" className="text-2xl font-bold">
        How to choose payment gateway solutions for ecommerce business
      </h2>
      <p>
        Once you have a shortlist, score it against the operational reality of your store. A
        gateway that looks impressive in a demo can still create work for your finance and
        support teams if it does not fit your workflow.
      </p>
      <ol className="list-decimal space-y-3 pl-6">
        <li>
          <strong>Method fit.</strong> List the payment methods your customers actually ask
          for, then confirm each one for your merchant category in writing.
        </li>
        <li>
          <strong>Platform fit.</strong> Decide whether you need a hosted checkout, a plugin,
          or a custom API integration. Each has different maintenance and design implications.
        </li>
        <li>
          <strong>Regulatory clarity.</strong> Identify the licensed entity behind the service
          and check its current standing with SBP.
        </li>
        <li>
          <strong>Commercial terms.</strong> Get the MDR, setup cost, monthly fees, settlement
          cycle, refund fees, chargeback handling, and tax treatment in a written schedule.
        </li>
        <li>
          <strong>Reconciliation.</strong> Ask how a payment is matched to an order, how partial
          payments are handled, and what reports or webhooks are available.
        </li>
        <li>
          <strong>Refunds and disputes.</strong> Understand who initiates a refund, how long it
          takes to appear to the customer, and what evidence is needed for a dispute.
        </li>
        <li>
          <strong>Security.</strong> Confirm PCI DSS scope, 3-D Secure behaviour, tokenisation,
          sandbox access, and how API keys or secure keys are stored.
        </li>
        <li>
          <strong>Support and ownership.</strong> Know who handles a failed payment: the
          provider, the plugin author, or your own developer.
        </li>
      </ol>
      <p>
        A practical way to use this list is to create a one-page scorecard and give each
        criterion a pass, fail, or unknown status. Anything marked unknown should become a
        question to the provider. If a sales answer conflicts with the public documentation,
        ask for the answer in writing before signing.
      </p>

      <h2 id="integration-paths-api-plugin-or-manual" className="text-2xl font-bold">
        Integration paths: API, plugin, or manual workflow
      </h2>
      <p>
        There are three realistic routes for a Pakistani online store. A direct API
        integration gives the most control but needs engineering time and careful handling of
        callbacks and key storage. A plugin is faster to deploy, but its quality depends on the
        author, update history, compatibility with your checkout version, and support process.
        A manual workflow shows account details or a QR code and asks the customer to upload a
        receipt; it is simple, but it is not an automated gateway and it creates reconciliation
        work.
      </p>
      <p>
        For WooCommerce specifically, first check whether the plugin is listed on WordPress.
        org, who authored it, when it was last updated, what version of WooCommerce it was
        tested against, and whether it supports the classic checkout or newer cart and checkout
        blocks. We cover those checks in detail in our
        <Link href="/blogs/best-payment-gateway-woocommerce-pakistan" className="text-emerald-800 underline">
          {" "}
          best payment gateway for WooCommerce in Pakistan guide
        </Link>
        .
      </p>
      <p>
        Whichever route you choose, insist on a sandbox or staging test. Place a small live
        order once the integration is approved, then test a failed payment, a duplicate
        submission, a refund, and a slow status callback. These edge cases reveal more about
        an integration than a successful demo checkout ever will.
      </p>

      <h2 id="costs-and-commercial-terms-checklist" className="text-2xl font-bold">
        Costs and commercial terms: what to ask before you sign
      </h2>
      <p>
        Comparison pages often publish a neat fee table and leave it there. In reality, the
        cost of accepting payments is a bundle. Ask about the merchant discount rate by
        method, any setup or annual charge, statement or gateway fees, refund fees, chargeback
        representation fees, currency conversion, withholding tax, and whether the rate changes
        by category or volume.
      </p>
      <p>
        Settlement deserves the same attention. Ask when funds are initiated, when they are
        expected to reach your account, which calendar days count as working days, and what
        happens around weekends or public holidays. Ask for the refund timeline and whether
        the original gateway fee is returned. If a provider gives you a number verbally, ask
        for the same number in the agreement or an email. If it cannot or will not confirm it,
        mark that field as <strong>check with provider</strong> in your scorecard.
      </p>
      <p>
        These questions are not distrustful; they are normal procurement practice. A payment
        partner that cannot explain its own commercial terms clearly is a risky choice for a
        business that depends on predictable cash flow.
      </p>

      <h2 id="security-and-compliance-checklist" className="text-2xl font-bold">
        Security and compliance checklist
      </h2>
      <p>
        Security starts with the checkout flow. Confirm that card data is collected through the
        provider's approved form or SDK rather than your own database, and ask which PCI DSS
        obligations remain yours. Check whether 3-D Secure is applied to card transactions and
        how a challenged payment is reported back to your store. If the provider offers
        tokenisation, ask whether stored tokens can be reused for recurring or one-click
        payments and how a customer revokes them.
      </p>
      <p>
        Next, review operational controls. API keys and secure keys should live in environment
        variables or a managed secret store, never in theme templates. Webhook or callback
        endpoints should verify authenticity, handle retries, and avoid double-processing an
        order. Admin logs should record the payment reference, gateway status, and refund state
        without storing sensitive card data. Finally, confirm how the provider notifies you of
        suspicious activity and what evidence you must supply for a disputed transaction.
      </p>
      <p>
        These controls matter even for small stores. Fraudsters do not scale their attempts to
        your revenue, and a clean reconciliation trail is the fastest way to resolve a genuine
        customer dispute.
      </p>

      <h2 id="implementation-checklist-for-businesses" className="text-2xl font-bold">
        Implementation checklist for businesses
      </h2>
      <ol className="list-decimal space-y-3 pl-6">
        <li>Write down the payment methods and currencies you need for launch.</li>
        <li>Verify the regulated entity behind each shortlisted provider.</li>
        <li>Request written commercial terms, method availability, and onboarding documents.</li>
        <li>Choose the integration route: hosted checkout, plugin, or custom API.</li>
        <li>Set up sandbox credentials and a staging environment.</li>
        <li>Map every payment status to an order status in your system.</li>
        <li>Test success, failure, duplicate submission, refund, and delayed callback cases.</li>
        <li>Configure settlement reports and a monthly reconciliation routine.</li>
        <li>Place a small live transaction before migrating full volume.</li>
        <li>Review logs and support tickets after the first week, then adjust.</li>
      </ol>
      <p>
        This checklist deliberately ends with review rather than launch. Payment behaviour is
        seasonal, and a method that works quietly for one campaign can fail under a different
        traffic mix. A short review cycle keeps the integration healthy.
      </p>

      <h2 id="common-mistakes-to-avoid" className="text-2xl font-bold">
        Common mistakes to avoid
      </h2>
      <ul className="list-disc space-y-3 pl-6">
        <li>
          Copying another country's setup guide. PayFast South Africa and PayFast Pakistan are
          different services; XPay exists in several unrelated markets.
        </li>
        <li>
          Assuming a listed payment method applies to your merchant category without written
          confirmation.
        </li>
        <li>
          Installing a plugin because it has many installs, without checking authorship, last
          update, and checkout-block compatibility.
        </li>
        <li>
          Treating an expired subsidy or a marketing price as a permanent commercial term.
        </li>
        <li>
          Delaying KYC until launch week. Easypaisa's published flow includes approval and a
          seller-code verification step; other providers have their own requirements.
        </li>
        <li>
          Ignoring refunds and disputes until a customer complains.
        </li>
      </ul>

      <h2 id="faq-payment-gateway-in-pakistan" className="text-2xl font-bold">
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
            <ExternalLink href="https://www.sbp.org.pk/our-operations/payments-ecosystem-and-infrastructure/emis-and-pso-psps">
              SBP: EMIs and PSO/PSPs
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.sbp.org.pk/our-operations/payments-ecosystem-and-infrastructure/raast">
              SBP: Raast
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.sbp.org.pk/circulars/pspod-circular-no-03-of-2025">
              SBP circular on Raast P2M QR subsidy
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.jazzcash.com.pk/business/accept-payments/payment-gateway">
              JazzCash payment gateway
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://easypaisa.com.pk/business-solutions/">
              Easypaisa business solutions
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://premierpayfast.com/developers/">
              PayFast Pakistan developer documentation
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://xpay.postexglobal.com/">
              XPay by PostEx Pakistan
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://woocommerce.com/products/woopayments/">
              WooPayments supported countries
            </ExternalLink>
          </li>
        </ul>
      </aside>

      <h2 id="final-verdict" className="text-2xl font-bold">
        Final verdict: match the gateway to the customer
      </h2>
      <p>
        There is no single best payment gateway in Pakistan for every business. A wallet-led
        checkout may suit a consumer store, a card-focused hosted checkout may suit a digital
        product, and a Raast-enabled flow may suit customers who prefer bank apps. The right
        decision comes from verified method support, clear SBP status, written commercial
        terms, and an integration your team can operate.
      </p>
      <p>
        Use this pillar guide to build your shortlist, then read our
        <Link href="/blogs/best-payment-gateway-woocommerce-pakistan" className="text-emerald-800 underline">
          {" "}
          WooCommerce-specific payment gateway comparison
        </Link>
        for plugin and checkout details. Provider features, fees, and eligibility can change,
        so recheck every primary source before you sign.
      </p>
      <p className="text-sm text-slate-500">
        Reviewed November 22, 2026. This is general information, not financial, legal, or tax
        advice. Where a figure or integration is not confirmed by a primary source, it is
        labelled check with provider.
      </p>
    </article>
  </main>
);

const article = {
  slug: "payment-gateway-in-pakistan",
  title: "Payment Gateway in Pakistan: A Complete Guide to Online Payment Solutions in 2026",
  author: "RankStack",
  date: "2026-11-22",
  updatedDate: "2026-11-22",
  type: "Guide",
  categories: ["Payments", "Ecommerce"],
  readingTime: "14 min read",
  description:
    "Compare payment gateway options in Pakistan using SBP and provider sources. Learn about JazzCash, Easypaisa, PayFast, XPay, WooCommerce, fees, and integration checks.",
  imageUrl:
    "/online-banking-banner-website-internet-mobile-phone-blue-background-electronic-bank-payment-copy-space-digital-204929150.webp",
  keywords: [
    "payment gateway in pakistan",
    "jazz cash payment gateway",
    "easypaisa payment gateway",
    "payfast pakistan",
    "xpay",
    "online payment gateway in pakistan",
    "payment gateway solutions for ecommerce business",
    "best payment gateway in pakistan",
    "internet payment gateway pakistan",
  ],
  content: PaymentGatewayPakistanContent,
};

export default article;
