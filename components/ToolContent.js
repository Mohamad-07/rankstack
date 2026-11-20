'use client';

import { useState } from 'react';

export function ResultGuide({ items }) {
  return (
    <section id="how-to-read" className="card p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">How to Read Your Results</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
        Every value below is measured live in your browser or inferred from the network address your browser uses. Treat approximate fields as clues, not proof.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.term} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="text-sm font-semibold text-slate-950">{item.term}</div>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TroubleshootingGuide({ items }) {
  return (
    <section id="troubleshooting" className="card p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
        Practical Troubleshooting &amp; Privacy Guidance
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
        Use these checks to turn the readings into a decision you can act on, without changing anything you did not intend to change.
      </p>
      <ol className="mt-6 space-y-3">
        {items.map((item, index) => (
          <li key={item.title} className="flex gap-4 rounded-xl border border-slate-200 p-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-700">
              {index + 1}
            </span>
            <div>
              <div className="text-sm font-semibold text-slate-950">{item.title}</div>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ToolFaq({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="card overflow-hidden">
      <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
        <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">Frequently Asked Questions</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Clear answers to the searches people make before they run a network or browser diagnostic.
        </p>
      </div>
      <div className="divide-y divide-slate-200">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
              >
                <span className="text-sm font-semibold text-slate-950 sm:text-base">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`text-lg text-indigo-600 transition-transform ${isOpen ? 'rotate-45' : ''}`}
                >
                  +
                </span>
              </button>
              {isOpen ? (
                <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600 sm:px-8">{item.answer}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ToolHelpSection({ results, troubleshooting, faqs, intro }) {
  return (
    <section className="section bg-slate-50">
      <div className="shell max-w-6xl space-y-8">
        {intro ? (
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{intro.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{intro.description}</p>
          </div>
        ) : null}
        <ResultGuide items={results} />
        <TroubleshootingGuide items={troubleshooting} />
        <ToolFaq items={faqs} />
      </div>
    </section>
  );
}
