"use client";

import React, { useState } from "react";
import PortfolioGrid from "./PortfolioGrid";

const categories = ["all", "wordpress", "shopify", "development"];

const PortfolioFilter = () => {
  const [showCard, setShowCard] = useState("all");

  return (
    <>
      <div className="mb-10 flex justify-center">
        <div
          className="flex flex-wrap justify-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1.5"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={showCard === category}
              onClick={() => setShowCard(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                showCard === category
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white hover:text-slate-950"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <PortfolioGrid showCard={showCard} />
    </>
  );
};

export default PortfolioFilter;
