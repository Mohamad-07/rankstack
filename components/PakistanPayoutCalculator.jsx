"use client";

import { useState } from "react";
import { Calculator, RotateCcw } from "lucide-react";

const money = (value, currency) => new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency,
  maximumFractionDigits: currency === "PKR" ? 0 : 2,
}).format(value);

const initialQuotes = {
  amount: "500",
  jazzRate: "",
  jazzFee: "3",
  jazzLocalFee: "0",
  bankRate: "",
  bankFee: "",
  bankLocalFee: "",
};

export default function PakistanPayoutCalculator() {
  const [values, setValues] = useState(initialQuotes);
  const [calculated, setCalculated] = useState(false);

  const update = (key) => (event) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
  };

  const amount = Number(values.amount);
  const jazzRate = Number(values.jazzRate);
  const bankRate = Number(values.bankRate);
  const jazzNet = (amount * (1 - Number(values.jazzFee || 0) / 100) * jazzRate) - Number(values.jazzLocalFee || 0);
  const bankNet = (amount * (1 - Number(values.bankFee || 0) / 100) * bankRate) - Number(values.bankLocalFee || 0);
  const canCompare = calculated && amount > 0 && jazzRate > 0 && bankRate > 0 && values.bankFee !== "" && values.bankLocalFee !== "";
  const fields = [
    { key: "amount", label: "Gross payout (USD)", step: "0.01", min: "0.01" },
    { key: "jazzRate", label: "JazzCash quote (PKR per USD)", step: "0.0001", min: "0.0001" },
    { key: "jazzFee", label: "Payoneer fee (%)", step: "0.01", min: "0" },
    { key: "jazzLocalFee", label: "Other JazzCash-route fees (PKR)", step: "1", min: "0" },
    { key: "bankRate", label: "Bank quote (PKR per USD)", step: "0.0001", min: "0.0001" },
    { key: "bankFee", label: "Payoneer fee (%)", step: "0.01", min: "0" },
    { key: "bankLocalFee", label: "Bank/intermediary fees (PKR)", step: "1", min: "0" },
  ];

  const reset = () => {
    setValues(initialQuotes);
    setCalculated(false);
  };

  return (
    <section className="my-10 border-y border-slate-300 bg-white p-5 sm:p-7" aria-labelledby="payout-calculator-heading">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
            <Calculator className="h-4 w-4" /> NET-PAYOUT WORKSHEET
          </div>
          <h3 id="payout-calculator-heading" className="mt-2 text-xl font-bold text-slate-950">Compare the quotes in your accounts</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Enter both providers&apos; live PKR-per-USD quotes and applicable fees. The JazzCash route starts with the 3% Payoneer withdrawal fee JazzCash currently publishes; check your own account before relying on it.</p>
        </div>
        <button type="button" onClick={reset} className="inline-flex items-center gap-2 border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.slice(0, 4).map((field) => (
            <label key={field.key} className={`block text-sm font-medium text-slate-700 ${field.key === "amount" ? "sm:col-span-2" : ""}`}>
              {field.label}
              <input type="number" min={field.min} step={field.step} value={values[field.key]} onChange={update(field.key)} className="mt-1 h-10 w-full border border-slate-300 px-3 font-normal text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20" />
            </label>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.slice(4).map((field) => (
            <label key={field.key} className="block text-sm font-medium text-slate-700">
              {field.label}
              <input type="number" min={field.min} step={field.step} value={values[field.key]} onChange={update(field.key)} className="mt-1 h-10 w-full border border-slate-300 px-3 font-normal text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20" />
            </label>
          ))}
          <p className="self-end text-xs leading-5 text-slate-500 sm:col-span-2">Use quotes captured at roughly the same time and for the same payout amount. Add any intermediary or receiving fees shown by your providers.</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setCalculated(true)} disabled={!amount || amount <= 0} className="bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-400">Compare net payout</button>
        {(!values.bankFee || !values.bankLocalFee) && <span className="text-xs text-amber-800">Enter the bank-route Payoneer fee and any bank/intermediary fee. Blank values are not treated as zero.</span>}
      </div>

      {canCompare && (
        <div className="mt-6 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2" aria-live="polite">
          {[
            ["Payoneer → JazzCash", jazzNet, values.jazzRate],
            ["Payoneer → bank", bankNet, values.bankRate],
          ].map(([label, total, rate]) => (
            <div key={label} className="border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-600">{label}</div>
              <div className="mt-1 text-2xl font-bold tabular-nums text-slate-950">{money(total, "PKR")}</div>
              <div className="mt-1 text-xs text-slate-500">Net estimate at {Number(rate).toLocaleString("en-PK")} PKR/USD</div>
            </div>
          ))}
          <p className="text-xs leading-5 text-slate-500 sm:col-span-2">Estimate only. It excludes any fee not entered above and does not model taxes, rate changes, reversals, or account-specific limits. Use the final confirmation screen as the authoritative quote.</p>
        </div>
      )}
    </section>
  );
}