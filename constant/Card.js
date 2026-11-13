"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Card = ({ link, children }) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="block rounded-xl focus-visible:ring-offset-4"
    >
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white p-4"
      >
        {children}
      </motion.div>
    </Link>
  );
};

export default Card;
