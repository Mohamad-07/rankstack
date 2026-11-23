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
    className="font-medium text-violet-800 underline decoration-violet-300 underline-offset-2 hover:text-violet-950"
  >
    {children}
  </a>
);

const FAQ_ITEMS = [
  {
    question: "Is NMI a direct merchant payment gateway in Australia?",
    answer:
      "Not usually. NMI's official copy says it works exclusively through partners such as banks, ISOs, PayFacs and SaaS providers. Treat it as a gateway platform sold through partners, not a direct Australian merchant acquirer you simply sign up with.",
  },
  {
    question: "Does NMI operate in Australia?",
    answer:
      "Yes. NMI has an Australian payments page describing partner support for in-store, mobile, in-app, online and unattended payments, and lists an AU phone contact. The page footer also names Australian agent and representative relationships. Confirm which entity will actually contract with you.",
  },
  {
    question: "Does NMI publish Australian merchant pricing?",
    answer:
      "No public AU merchant rate was found on official NMI pages as at 23 November 2026. The AU page refers only to a competitive pricing model. Use Check with provider for setup fees, monthly fees, transaction rates, chargeback fees and settlement terms.",
  },
  {
    question: "What products does NMI offer?",
    answer:
      "Official pages list a white-label payment gateway, the NMI Payments platform and Merchant Central, which provides partner-facing sign-up, onboarding, underwriting and merchant-management tools. These are primarily partner products.",
  },
  {
    question: "What payment channels does NMI support?",
    answer:
      "NMI's AU materials list card-present, mobile and online payments. Its global gateway page also describes in-store, self-service and mobile channels with EMV and contactless support. AU-specific availability should be confirmed with the reseller or acquirer.",
  },
  {
    question: "Which payment methods does NMI support?",
    answer:
      "NMI's global gateway page lists Visa, Mastercard, Discover, American Express, Diners Club, China UnionPay, JCB, Google Pay and Apple Pay, and developer docs mention card, ACH and digital-wallet data. Do not assume every method is available to an Australian merchant; check the exact AU configuration.",
  },
  {
    question: "How does merchant onboarding and KYC work?",
    answer:
      "NMI's Merchant Central is aimed at partners for sign-up, onboarding, underwriting and boarding. Merchant KYC and approval are likely determined by the partner or acquirer, so ask the reseller for the exact document checklist and approval timeline.",
  },
  {
    question: "When does NMI settle funds to Australian merchants?",
    answer:
      "No public AU settlement timeframe was found. NMI developer documentation mentions settlement events and deposit concepts, but timing is partner-specific. Ask for the payout schedule, cut-off time, bank account rules and reserve policy in writing.",
  },
  {
    question: "How do refunds and chargebacks work with NMI?",
    answer:
      "NMI's refund API documentation says only a previously settled transaction can be refunded. Chargeback webhook events are documented. Timelines, representment rules and fees depend on the provider or reseller, so confirm them before signing.",
  },
  {
    question: "Does NMI have an official WordPress plugin?",
    answer:
      "No NMI-authored plugin was found in the WordPress.org search checked on 23 November 2026. Plugins from Pledged Plugins, XLPlugins, wpclubz and Gain Commerce appeared, all apparently third-party. Verify ownership, compatibility and support before using one.",
  },
  {
    question: "Who owns NMI?",
    answer:
      "Official terms define NMI Affiliate as Network Merchants, LLC or its affiliates, and say NMI means the affiliate providing the service. Company and news pages identify investment backing from Insight Partners, Francisco Partners and Great Hill Partners. Do not reduce that to a single unverified owner.",
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
  ["partner-model", "The partner model"],
  ["australian-presence", "Australian presence"],
  ["products", "Products and capabilities"],
  ["pricing", "Pricing reality"],
  ["quote-checklist", "Quote checklist"],
  ["methods-and-channels", "Methods and channels"],
  ["onboarding", "Onboarding and KYC"],
  ["settlement", "Settlement"],
  ["refunds-and-disputes", "Refunds and disputes"],
  ["security", "Security and 3DS"],
  ["plugins", "WordPress plugins"],
  ["who-it-suits", "Who it suits"],
  ["faq-nmi-australia", "Frequently asked questions"],
  ["official-sources", "Official sources"],
];

const JumpLinks = () => (
  <nav
    aria-label="On this page"
    className="my-6 rounded-xl border border-slate-200 bg-white p-5 text-base shadow-sm"
  >
    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-700">
      Quick jump
    </p>
    <ul className="grid gap-2 sm:grid-cols-2">
      {JUMP_LINKS.map(([id, label]) => (
        <li key={id}>
          <a
            href={`#${id}`}
            className="text-violet-800 underline decoration-violet-200 underline-offset-2 hover:text-violet-950"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const NmiPaymentGatewayAustraliaContent = () => (
  <main>
    <FAQJsonLd />

    <section className="relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 text-white">
      <div className="relative max-w-4xl px-6 py-16 text-center md:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-violet-200">
          NMI deep dive — Australia
        </p>
        <p className="mt-3 text-xl font-semibold md:text-2xl">
          A partner-led gateway platform, not a public price-list provider
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
          Official product, AU presence and documentation evidence checked 23 November 2026.
        </p>
      </div>
    </section>

    <article className="mx-auto max-w-3xl space-y-6 px-5 py-10 text-lg leading-relaxed text-slate-800">
      <Toc />
      <JumpLinks />

      <QuickSummary
        intro="NMI is a white-label payment gateway platform sold through banks, ISOs, PayFacs and SaaS providers. In Australia it appears behind a reseller or embedded payments offer rather than as a merchant direct sign-up with public pricing."
        points={[
          { text: "NMI says it works exclusively through partners, not directly with merchants." },
          { text: "No public AU merchant pricing was found; quote terms are provider-specific." },
          { text: "Capabilities include hosted payment pages, virtual terminals, tokenisation, webhooks and partner onboarding tools." },
          { text: "No NMI-authored WordPress plugin was found in the 23 Nov 2026 directory snapshot." },
        ]}
      />

      <KeyTakeaways
        title="Key takeaways"
        points={[
          "Identify the actual contracting entity before comparing an NMI-powered offer with Stripe or Square.",
          "Ask for a written schedule covering gateway fees, transaction fees, chargebacks, settlement and reserves.",
          "Global method lists are not proof of Australian availability.",
          "Settlement, KYC and dispute timelines are partner-specific; use Check with provider.",
          "Use the pillar and platform guides to compare NMI with direct providers and built-in platform payments.",
        ]}
      />

      <p>
        An <strong>nmi payment gateway</strong> search usually surfaces product
        pages that look like a conventional merchant gateway. The important
        difference is distribution: NMI's own copy says it works exclusively
        through partners. That makes this guide less like a fee comparison and
        more like a due-diligence framework for an offer you may already have
        received from a bank, ISO, PayFac, SaaS vendor or reseller. All evidence
        below was checked on 23 November 2026.
      </p>
      <p>
        If you are starting from scratch, read the{" "}
        <Link href="/blogs/best-payment-gateways-australia" className="text-violet-800 underline">
          {" "}
          Australian payment gateway pillar guide
        </Link>
        to understand the market, then return here when a partner presents an
        NMI-powered service. The{" "}
        <Link href="/blogs/payment-gateways" className="text-violet-800 underline">
          {" "}
          global payment gateways guide
        </Link>
        explains gateway, acquirer and processor roles in more general terms.
      </p>

      <h2 id="quick-answer" className="text-2xl font-bold">
        Quick answer: is NMI right for an Australian merchant?
      </h2>
      <p>
        NMI can be a good foundation when a bank, ISO, PayFac or SaaS platform
        is building or reselling a payments product and needs white-label
        gateway infrastructure. It is usually the wrong search destination if
        you want to compare public merchant rates and sign up directly today.
        For a direct platform with published AU pages, compare{" "}
        <Link href="/blogs/stripe-payment-gateway-australia" className="text-violet-800 underline">
          Stripe
        </Link>
        or{" "}
        <Link href="/blogs/square-payment-gateway-australia" className="text-violet-800 underline">
          Square
        </Link>
        . For bank-owned options, see the{" "}
        <Link href="/blogs/eway-vs-westpac-vs-nab-payment-gateway-australia" className="text-violet-800 underline">
          {" "}
          eWAY vs Westpac vs NAB comparison
        </Link>
        .
      </p>

      <h2 id="partner-model" className="text-2xl font-bold">
        The partner model: who actually sells and supports the service
      </h2>
      <p>
        NMI's “Who we are” page says: “Unlike processors that sell directly to
        merchants, we work exclusively through partners — banks, ISOs, PayFacs,
        and SaaS providers.” That single sentence explains most of the due
        diligence. The gateway technology may be NMI's, but the merchant
        agreement, pricing, onboarding, settlement and support usually come from
        the partner.
      </p>
      <p>
        This is not a criticism; embedded payments are a legitimate model. A
        SaaS platform may want payments inside its own dashboard, and a bank may
        want a configurable gateway behind its brand. The practical issue for a
        merchant is accountability. If a transaction fails, you need to know
        whether to contact the reseller, the acquirer or the gateway platform.
        Get that answer in writing before launch.
      </p>

      <h2 id="australian-presence" className="text-2xl font-bold">
        NMI's Australian presence and contracting entities
      </h2>
      <p>
        NMI has a dedicated{" "}
        <ExternalLink href="https://www.nmi.com/products/nmi-payments-au">
          {" "}
          Payments Australia page
        </ExternalLink>
        saying it helps partners deliver payments in-store, mobile, in-app,
        online and unattended environments. It lists card-present, mobile and
        online solutions and an Australian phone contact. The footer states that
        Anovia Payments Pty Ltd is an authorised representative of Tyro Payments
        Limited and a sales agent of Fiserv/First Data Merchant Solutions
        Australia Pty Limited.
      </p>
      <p>
        Those footer statements are not the same as saying NMI contracts with
        every Australian merchant directly. Ask the person making the offer to
        name the legal entity on the agreement, the acquirer or payment facility,
        and the support team responsible for day-to-day issues. NMI's terms
        define “NMI Affiliate” as Network Merchants, LLC or its affiliates, and
        say “NMI” means the affiliate providing the service. Company and news
        pages identify investment backing from Insight Partners, Francisco
        Partners and Great Hill Partners, so avoid claiming a single owner.
      </p>

      <h2 id="products" className="text-2xl font-bold">
        Products and gateway capabilities
      </h2>
      <p>
        NMI's official pages list a white-label payment gateway, the NMI Payments
        platform and Merchant Central. Merchant Central is aimed at partners for
        sign-up, onboarding, underwriting and merchant management. This is a
        different product shape from a merchant-facing checkout brand: much of
        the value sits in the tools the partner uses to onboard and manage you.
      </p>
      <p>
        NMI's global gateway page describes online, in-store, self-service and
        mobile payments; EMV and contactless support; multiple MIDs; a virtual
        terminal; a hosted payment page; webhooks; batch processing; tokenisation;
        point-to-point encryption; and terminal management. It also states 200+
        processors and 125+ shopping carts. Treat those as NMI's global product
        claims, then ask which ones are enabled in the Australian configuration
        you are being offered.
      </p>

      <h2 id="pricing" className="text-2xl font-bold">
        Pricing: what is public and what is not
      </h2>
      <p>
        No public Australian merchant price figure was found on official NMI
        pages as at 23 November 2026. The AU page refers to a “competitive
        pricing model” only. That is not enough to rank NMI against the published
        rates in the pillar guide. It also means any claim that NMI is cheaper
        or more expensive than eWAY, Stripe or Square would be unsupported
        without a quote.
      </p>
      <p>
        Use <strong>Check with provider</strong> for every commercial term. A
        partner quote should be specific to your business category, card mix,
        monthly volume, device needs and integration model. If the quote is
        verbal, write it down and ask for confirmation before you migrate traffic.
      </p>

      <h2 id="quote-checklist" className="text-2xl font-bold">
        Quote checklist: what to ask an NMI-powered reseller
      </h2>
      <ol className="list-decimal space-y-3 pl-6">
        <li>The legal contracting entity and the acquirer or payment facility behind the service.</li>
        <li>Setup fees, monthly platform fees, gateway fees and per-transaction rates.</li>
        <li>Separate rates or surcharges for Amex, international cards, wallets and BNPL.</li>
        <li>Chargeback, representment and dispute-handling fees.</li>
        <li>Settlement cut-off, payout frequency, bank account rules and reserve policy.</li>
        <li>Which card brands, wallets and local methods are enabled for Australian accounts.</li>
        <li>3-D Secure availability, tokenisation costs and PCI validation responsibilities.</li>
        <li>Plugin or integration ownership, update responsibility and support hours.</li>
        <li>Refund timing, webhook reliability and reconciliation reports.</li>
        <li>Contract length, termination fees and data-portability process.</li>
      </ol>
      <p>
        This checklist is deliberately practical. A gateway platform can look
        impressive in a demo and still be a poor fit if your settlement cut-off,
        plugin support or dispute process is unclear. The same questions apply
        when comparing the bank options in the local guide or the platform rules
        in the{" "}
        <Link href="/blogs/payment-gateways-shopify-woocommerce-australia" className="text-violet-800 underline">
          {" "}
          Shopify and WooCommerce Australia guide
        </Link>
        .
      </p>

      <h2 id="methods-and-channels" className="text-2xl font-bold">
        Payment methods and channels: distinguish global from Australian
      </h2>
      <p>
        NMI's global gateway page lists Visa, Mastercard, Discover, American
        Express, Diners Club, China UnionPay, JCB, Google Pay and Apple Pay.
        Developer documentation mentions card, ACH and digital-wallet data. None
        of that automatically proves the same methods are live for an Australian
        merchant account. ACH, for example, should not be assumed to be an
        Australian bank rail.
      </p>
      <p>
        The safe approach is to ask for a screenshot or written list of methods
        enabled in your specific account, including which ones are available at
        hosted checkout, API checkout, virtual terminal and device. Then test
        each method with a small live payment before promoting it to customers.
      </p>

      <h2 id="onboarding" className="text-2xl font-bold">
        Onboarding and KYC
      </h2>
      <p>
        Merchant Central provides partner-facing sign-up, onboarding,
        underwriting and boarding tools. Merchant KYC and approval are therefore
        likely to be determined by the partner or acquirer rather than NMI alone.
        Do not copy a KYC checklist from another provider and assume it applies.
      </p>
      <p>
        Ask which entity performs identity verification, which documents are
        required for your entity type, how long approval usually takes and
        whether additional checks can be requested after launch. If a hold can
        be placed on funds, ask what triggers it and who can release it.
      </p>

      <h2 id="settlement" className="text-2xl font-bold">
        Settlement timing
      </h2>
      <p>
        No public AU merchant settlement timeframe was found. NMI documentation
        includes settlement events and deposit concepts, but those describe data
        structures rather than a guaranteed payout promise. Ask for the schedule,
        cut-off time, weekend and public-holiday treatment, and the bank account
        requirements.
      </p>
      <p>
        Also ask about reserves. A reserve can materially change cash flow even
        when the transaction rate looks competitive. A clear answer here is more
        valuable than a small percentage difference in a quote.
      </p>

      <h2 id="refunds-and-disputes" className="text-2xl font-bold">
        Refunds and disputes
      </h2>
      <p>
        NMI's refund API documentation states that only a previously settled
        transaction can be refunded. Chargeback webhook events are documented,
        which is useful for automation. However, dispute timelines,
        representment rules and fees are partner-specific. Ask how your team is
        notified, where evidence is uploaded, what the deadline is and whether
        a fee is charged when a dispute is lost.
      </p>
      <p>
        Test a refund in a low-value live transaction before launch. Confirm
        that the refund appears correctly in the partner dashboard, the NMI
        report and your accounting reconciliation. A mismatch discovered at
        month end is much harder to fix than one found on day one.
      </p>

      <h2 id="security" className="text-2xl font-bold">
        Security, tokenisation and 3-D Secure
      </h2>
      <p>
        NMI's gateway page lists tokenisation, P2PE, remote key injection and
        terminal management. Its developer pages list an NMI 3-D Secure Server
        for 3DS2. EMVCo describes EMV 3DS as an authentication protocol designed
        to help prevent card-not-present fraud. As at 23 November 2026, EMVCo
        had published EMV 3DS v2.4 documents as drafts, so do not describe that
        version as final in a merchant proposal.
      </p>
      <p>
        PCI DSS v4.0.1 was the current non-archived version in PCI SSC's library
        at the check date. PCI SSC says validation requirements are determined
        by payment brands, acquirers or programme managers, not by PCI SSC
        itself. Ask the partner which SAQ or other validation route applies to
        your integration rather than relying on a generic “PCI compliant”
        statement.
      </p>

      <h2 id="plugins" className="text-2xl font-bold">
        WordPress plugins and integration ownership
      </h2>
      <p>
        A WordPress.org search checked on 23 November 2026 found several NMI
        plugins but no NMI-authored one. Examples included Pledged Plugins PCI
        Gateway for NMI and WooCommerce (version 1.2.11, updated 4 June 2026,
        about 2,000 installs), XL NMI Gateway for WooCommerce (2.5.0, updated 20
        May 2026, about 800 installs), NMI for WooCommerce by wpclubz (1.0.7,
        updated 29 October 2026, about 70 installs) and Gain Commerce NMI Payment
        Gateway for WooCommerce (1.16.9, updated 18 November 2026, about 90
        installs). All appeared third-party in the API results.
      </p>
      <p>
        That does not make them unusable, but it changes the support question.
        Who patches the plugin when WooCommerce changes? Who handles a failed
        webhook at 9 p.m.? Can you export customer and token data if you leave?
        Get named answers before building a store on a lightly installed plugin.
      </p>

      <h2 id="who-it-suits" className="text-2xl font-bold">
        Who NMI suits — and who should look elsewhere
      </h2>
      <ul className="list-disc space-y-3 pl-6">
        <li>A bank or lender adding card acceptance under its own brand.</li>
        <li>An ISO or PayFac managing a portfolio of merchants with underwriting and onboarding needs.</li>
        <li>A SaaS provider embedding payments into an existing dashboard.</li>
        <li>A merchant already introduced to an NMI-powered reseller and willing to complete quote due diligence.</li>
      </ul>
      <p>
        It is a weaker fit for a merchant that wants transparent public rates,
        direct self-service signup or a widely documented first-party WordPress
        plugin. In those cases, the direct providers in this cluster are easier
        to evaluate.
      </p>

      <h2 id="faq-nmi-australia" className="text-2xl font-bold">
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
      <aside className="rounded-xl border-l-4 border-violet-700 bg-violet-50 p-5 text-base">
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><ExternalLink href="https://www.nmi.com/about-us/who-we-are">NMI partner-led business model</ExternalLink></li>
          <li><ExternalLink href="https://www.nmi.com/products/nmi-payments-au">NMI Payments Australia</ExternalLink></li>
          <li><ExternalLink href="https://www.nmi.com/products/payment-gateway/">NMI payment gateway</ExternalLink></li>
          <li><ExternalLink href="https://www.nmi.com/products/merchant-central/">NMI Merchant Central</ExternalLink></li>
          <li><ExternalLink href="https://www.nmi.com/developers/sdks-apis/">NMI SDKs and APIs</ExternalLink></li>
          <li><ExternalLink href="https://docs.nmi.com/reference/refund-payment-v5.md">NMI refund API documentation</ExternalLink></li>
          <li><ExternalLink href="https://www.nmi.com/policy/platform-terms-conditions">NMI platform terms</ExternalLink></li>
        </ul>
      </aside>

      <h2 id="final-verdict" className="text-2xl font-bold">
        Final verdict
      </h2>
      <p>
        NMI is best understood as infrastructure behind a partner's payments
        product, not as a merchant-facing brand with a public Australian price
        list. If a reseller offers an NMI-powered service, use this guide to get
        the contracting entity, fees, settlement, methods, KYC, support and exit
        terms in writing. If you want to compare direct providers with published
        AU pages, start with the pillar guide and the Stripe, Square, local bank
        and platform articles.
      </p>
      <p className="text-sm text-slate-500">
        Reviewed 23 November 2026. Product lists and plugin metadata can change.
        This is general information, not legal, tax or financial advice. Confirm
        all terms with the provider or reseller.
      </p>
    </article>
  </main>
);

const article = {
  slug: "nmi-payment-gateway-australia",
  title: "NMI Payment Gateway in Australia: How the Partner Model Works (2026)",
  author: "RankStack",
  date: "2026-11-23",
  updatedDate: "2026-11-23",
  type: "Guide",
  categories: ["Payments", "Australia"],
  readingTime: "14 min read",
  description:
    "NMI payment gateway in Australia explained: partner-led model, official AU presence, white-label products, pricing checks, quote checklist, settlement, 3DS, plugins and verified sources.",
  imageUrl: "/blog-banner-1200x675.webp",
  keywords: [
    "nmi payment gateway",
    "nmi payment gateway australia",
    "NMI Payments Australia",
    "NMI white label gateway",
    "NMI Merchant Central",
    "NMI partner program Australia",
    "NMI pricing Australia",
    "NMI WooCommerce plugin",
    "NMI 3DS",
  ],
  content: NmiPaymentGatewayAustraliaContent,
};

export default article;
