"use client";

import React, { useState } from "react";

const faqData = [
  {
    id: 1,
    question: "What is an IP lookup?",
    answer:
      "An IP lookup maps a public IP address to available network information such as its approximate location, internet service provider, and connection type.",
  },
  {
    id: 2,
    question: "Is this IP lookup tool free?",
    answer:
      "Yes. RankStack's IP lookup tool is free to use, requires no account, and has no daily lookup limit.",
  },
  {
    id: 3,
    question: "How accurate is IP geolocation?",
    answer:
      "IP geolocation is approximate. It usually identifies the correct country or region, but city-level results can be affected by VPNs, mobile networks, and ISP routing.",
  },
  {
    id: 4,
    question: "Can I look up my own IP address?",
    answer:
      "Yes. Open the tool without entering an address and it will look up the public IP your connection is using.",
  },
  {
    id: 5,
    question: "Do you store the IP addresses I search?",
    answer:
      "Lookups are processed to return results and are not used to build a personal profile. Standard server logs may be retained for security and abuse prevention.",
  },
  {
    id: 6,
    question: "Can I hide my IP address?",
    answer:
      "Yes. A VPN or proxy can mask your public IP by routing traffic through a server in another location, though it cannot make you anonymous online.",
  },
];

const FAQ = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(1);

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <section className="section bg-slate-50">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="section-title mt-4">Frequently asked questions</h2>
            <p className="section-copy mt-4">
              Quick answers about IP addresses, lookup accuracy, and privacy.
            </p>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, index) => {
              const isOpen = expandedFAQ === faq.id;
              return (
                <div
                  key={faq.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <button
                    type="button"
                    className="flex w-full items-center gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <span className="text-xs font-semibold tabular-nums text-indigo-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm font-semibold text-slate-950 sm:text-base">
                      {faq.question}
                    </span>
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-lg leading-none text-slate-600"
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${faq.id}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pl-11 text-sm leading-relaxed text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
