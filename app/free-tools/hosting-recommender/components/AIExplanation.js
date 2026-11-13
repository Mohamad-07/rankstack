"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AIExplanation({ analysis }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6"
    >
      <div className="flex items-center gap-2 text-indigo-700">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        <h3 className="text-sm font-semibold">How these matches were chosen</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{analysis}</p>
    </motion.div>
  );
}
