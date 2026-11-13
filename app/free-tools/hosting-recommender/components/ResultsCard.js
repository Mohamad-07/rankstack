"use client";

import { motion } from "framer-motion";
import { ExternalLink, Gauge, LifeBuoy, Star, Wallet } from "lucide-react";

const badges = ["Top choice", "Great value", "Recommended"];

export default function ResultsCard({ host, rank }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * rank, duration: 0.4 }}
      className="card flex h-full flex-col p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-950">{host.name}</h3>
        <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700">
          {badges[rank - 1]}
        </span>
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {host.description}
      </p>

      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        <li className="flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-500" aria-hidden="true" />
          {host.rating}/5 rating
        </li>
        <li className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-slate-400" aria-hidden="true" />
          ${host.price}/month
        </li>
        <li className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-slate-400" aria-hidden="true" />
          {host.performance}
        </li>
        <li className="flex items-center gap-2">
          <LifeBuoy className="h-4 w-4 text-slate-400" aria-hidden="true" />
          {host.support}
        </li>
      </ul>

      <a
        href={host.affiliateLink}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="btn-primary mt-5 w-full"
      >
        Visit {host.name}
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </motion.article>
  );
}
