"use client";

import { motion } from "framer-motion";
import { ArrowRight, HelpCircle } from "lucide-react";

export default function QuizStep({ step, question, total, onNext }) {
  return (
    <div>
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <HelpCircle className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Step {step + 1} of {total}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {question.question}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Choose the option that best fits your requirements.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-2xl space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={option}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + index * 0.04 }}
            onClick={() => onNext(option)}
            className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:p-5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-sm font-semibold text-slate-500 transition group-hover:border-indigo-200 group-hover:bg-white group-hover:text-indigo-700">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="flex-1 text-sm font-medium text-slate-900 sm:text-base">
              {option}
            </span>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-600"
              aria-hidden="true"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
