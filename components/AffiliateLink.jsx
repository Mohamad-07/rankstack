import { getAffiliateUrl, getAffiliateVariantUrl } from "@/lib/affiliates";

/**
 * AffiliateLink — resolves a brand to its affiliate tracking URL from the
 * central registry (`lib/affiliates.js` ← `affiliatelinks.txt`).
 *
 * Precedence:
 *   1. Registry URL for `brand` (when the brand is mapped and enabled).
 *   2. Explicit `href` (preserves an existing valid destination when the
 *      brand is unresolved — another provider's URL is NEVER substituted).
 *
 * Renders a plain outbound anchor (no prefetch, no JS, no redirects):
 * the browser navigates directly through the affiliate tracking URL.
 * Defaults to `rel="sponsored noopener"` and `target="_blank"` for
 * external destinations; both are overridable via props.
 *
 * Existing className / children / aria props pass through unchanged so
 * button and card styling stays identical.
 */
export default function AffiliateLink({
  brand,
  variant,
  href,
  children,
  className,
  target,
  rel,
  ...rest
}) {
  // `variant` selects a supplied deep link (e.g. a specific campaign path)
  // from the same registry entry instead of the brand's primary URL.
  const registryUrl = brand
    ? variant
      ? getAffiliateVariantUrl(brand, variant)
      : getAffiliateUrl(brand)
    : undefined;
  const url = registryUrl || href;

  if (!url) {
    // Brand unresolved and no explicit destination: render children without a
    // dead/misleading anchor rather than substituting another brand's URL.
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[AffiliateLink] unresolved affiliate brand "${brand}" and no href provided.`
      );
    }
    return (
      <span className={className} {...rest}>
        {children}
      </span>
    );
  }

  const isExternal = /^https?:\/\//i.test(url);
  const finalRel = rel !== undefined ? rel : isExternal ? "sponsored noopener" : undefined;
  const finalTarget = target !== undefined ? target : isExternal ? "_blank" : undefined;

  return (
    <a
      href={url}
      className={className}
      rel={finalRel}
      target={finalTarget}
      {...rest}
    >
      {children}
    </a>
  );
}
