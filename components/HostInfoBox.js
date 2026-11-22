"use client";
import Link from "next/link";
import { getAffiliateUrl, getAffiliateVariantUrl } from "@/lib/affiliates";

export default function HostInfoBox({ bestFor, rating, link, brand, variant }) {
  // `brand` resolves through the central affiliate registry (affiliatelinks.txt);
  // `variant` optionally selects a supplied deep link for that brand.
  // `link` remains the fallback for unmapped/pending brands and legacy usage.
  const registryUrl = brand
    ? variant
      ? getAffiliateVariantUrl(brand, variant)
      : getAffiliateUrl(brand)
    : undefined;
  const href = registryUrl || link;
  return (
    <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="space-y-3 text-gray-800">
        {/* Best For */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-3">
          <span className="sm:w-24 font-semibold">Best for:</span>
          <span>{bestFor}</span>
        </div>

        {/* Rating */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-3">
          <span className="sm:w-24 font-semibold">Rating:</span>
          <span>{rating}</span>
        </div>

        {/* Visit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
          <span className="sm:w-24 font-semibold">Visit:</span>
          <Link
            href={href}
            target="_blank"
            rel="sponsored noopener nofollow"
            className="inline-block mt-2 sm:mt-0 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
          >
            Visit Site
          </Link>
        </div>
      </div>
    </div>
  );
}
