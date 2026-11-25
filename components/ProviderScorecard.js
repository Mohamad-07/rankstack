import { ArrowRight, Star } from "lucide-react";
import AffiliateLink from "./AffiliateLink";

/**
 * ProviderScorecard — compact verdict card used at the end of each provider
 * section in comparison round-ups: our "best for" call, star ratings for the
 * metrics we researched, and a visit button that resolves through the central
 * affiliate registry (lib/affiliates.js).
 *
 * @param {object}   props
 * @param {string}   props.name      - Display name, e.g. "SiteGround".
 * @param {string}   [props.brand]   - Affiliate registry brand key.
 * @param {string}   [props.href]    - Fallback destination (unmapped brands).
 * @param {string}   [props.cta]     - Button label override.
 * @param {string}   props.bestFor   - One-line "best for" verdict.
 * @param {number}   props.overall   - Overall score, 0–5 (halves allowed).
 * @param {Array}    props.scores    - [{ label, value }] metrics, 0–5.
 * @param {string}   [props.checked] - Verification note shown in the header.
 */
const Stars = ({ value }) => (
  <span
    role="img"
    aria-label={`${value} out of 5 stars`}
    className="inline-flex items-center gap-0.5"
  >
    {[1, 2, 3, 4, 5].map((i) => {
      const fill = Math.max(0, Math.min(1, value - (i - 1)));
      return (
        <span key={i} className="relative inline-flex h-4 w-4 shrink-0">
          <Star className="absolute inset-0 h-4 w-4 text-slate-300" strokeWidth={1.5} />
          <span
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${fill * 100}%` }}
            aria-hidden="true"
          >
            <Star
              className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400"
              strokeWidth={1.5}
            />
          </span>
        </span>
      );
    })}
  </span>
);

const ProviderScorecard = ({
  name,
  brand,
  href,
  cta,
  bestFor,
  overall,
  scores = [],
  checked = "24 November 2026",
}) => (
  <div
    className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft"
    aria-label={`${name} summary and rating`}
  >
    {/* Header: identity + overall score */}
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-sm">
          {name.charAt(0)}
        </span>
        <div>
          <p className="text-sm font-bold leading-tight text-slate-950">
            {name} — our verdict
          </p>
          <p className="text-xs text-slate-500">
            Based on published plan details, checked {checked}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Stars value={overall} />
        <span className="text-sm font-bold text-slate-900">
          {overall.toFixed(1)}
          <span className="font-medium text-slate-400">/5</span>
        </span>
      </div>
    </div>

    {/* Body: best-for verdict + metric scores */}
    <div className="px-5 py-5 sm:px-6">
      <p className="text-sm leading-relaxed text-slate-600">
        <span className="font-semibold text-slate-900">Best for:</span> {bestFor}
      </p>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {scores.map((score) => (
          <div
            key={score.label}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
          >
            <dt className="text-sm font-medium text-slate-600">{score.label}</dt>
            <dd className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">
                {score.value.toFixed(1)}
              </span>
              <Stars value={score.value} />
            </dd>
          </div>
        ))}
      </dl>
    </div>

    {/* Footer: affiliate visit button */}
    <div className="border-t border-slate-100 bg-white px-5 py-4 sm:px-6">
      <AffiliateLink
        brand={brand}
        href={href}
        className="btn btn-primary w-full justify-center sm:w-auto"
      >
        {cta || `Visit ${name}`}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </AffiliateLink>
    </div>
  </div>
);

export default ProviderScorecard;
