import Link from "next/link";
import { homepageTranslations } from "@/lib/homepage-translations";
import type { Lang } from "@/lib/translations";

interface PricingOverviewProps {
  lang?: Lang;
}

export default function PricingOverview({ lang = "en" }: PricingOverviewProps) {
  const t = homepageTranslations[lang].pricingOverview;
  const pricingHref = lang === "pl" ? "/pl/cennik" : "/pricing";
  const auditHref = lang === "pl" ? "/pl/audyt-automatyzacji" : "/pipeline-audit";

  return (
    <section className="py-24 px-6" id="pricing">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t.headline}
          </h2>
          <p className="text-slate-400 text-lg">
            {t.subheadline}
          </p>
          {"promoMessage" in t && t.promoMessage && (
            <div className="mt-6 inline-block bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg px-6 py-2">
              <span className="text-sm font-medium text-blue-400">{t.promoMessage}</span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        {/* REVIEW: All pricing below is placeholder — update before launch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {t.tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white/[0.03] border rounded-2xl p-6 transition-all ${
                tier.highlighted
                  ? "border-blue-500/40 ring-1 ring-blue-500/20"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {/* Badge */}
              {"badge" in tier && tier.badge && (
                <div className="absolute -top-3 left-6">
                  <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {tier.badge}
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
              <p className="text-sm text-slate-400 mb-6">{tier.description}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{tier.monthlyPrice}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {"originalSetupPrice" in tier && tier.originalSetupPrice && (
                    <span className="line-through text-slate-600 mr-2">{tier.originalSetupPrice}</span>
                  )}
                  + {tier.setupPrice} setup
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tier.highlighted ? "#2563eb" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={tier.highlighted ? auditHref : pricingHref}
                className={`block w-full text-center text-sm font-semibold py-3 rounded-lg transition-colors ${
                  tier.highlighted
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* View Full Pricing */}
        <div className="text-center">
          <Link
            href={pricingHref}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
          >
            {t.viewFull}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
