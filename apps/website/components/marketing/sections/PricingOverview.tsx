import Link from "next/link";
import { homepageTranslations } from "@/lib/homepage-translations";
import type { Lang } from "@/lib/translations";
import { Check } from "lucide-react";

interface PricingOverviewProps {
  lang?: Lang;
}

export default function PricingOverview({ lang = "en" }: PricingOverviewProps) {
  const t = homepageTranslations[lang].pricingOverview;
  const pricingHref = lang === "pl" ? "/pl/cennik" : "/pricing";
  const auditHref = lang === "pl" ? "/pl/audyt-automatyzacji" : "/pipeline-audit";

  return (
    <section className="py-24 md:py-32 px-6 bg-black" id="pricing">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-50 mb-4">
            {t.headline}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t.subheadline}
          </p>
          {/* Promo Banner */}
          {"promoMessage" in t && t.promoMessage && (
            <div className="mt-8 inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-5 py-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-sm font-semibold text-indigo-300">{t.promoMessage}</span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {t.tiers.map((tier, index) => {
            const isHighlighted = tier.highlighted;
            const hasPromo = "originalSetupPrice" in tier && tier.originalSetupPrice;

            return (
              <div
                key={index}
                className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 ${
                  isHighlighted
                    ? "bg-gradient-to-b from-indigo-950/50 to-slate-900 border-2 border-indigo-500/50 shadow-lg shadow-indigo-500/10"
                    : "bg-slate-900 border border-white/10 hover:border-white/20"
                }`}
              >
                {/* Badge */}
                {"badge" in tier && tier.badge && (
                  <div className="absolute -top-3.5 left-6">
                    <span className={`inline-block text-xs font-bold px-4 py-1.5 rounded-full ${
                      isHighlighted
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                        : "bg-emerald-500 text-white"
                    }`}>
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Plan Name & Description */}
                <h3 className="text-xl font-bold text-slate-50 mb-2 mt-2">{tier.name}</h3>
                <p className="text-sm text-slate-400 mb-6">{tier.description}</p>

                {/* Price Block */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  {/* Monthly Price */}
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-slate-50">{tier.monthlyPrice}</span>
                  </div>

                  {/* Setup Fee with Savings */}
                  <div className="space-y-1">
                    {hasPromo ? (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-sm">Wdrożenie:</span>
                          <span className="text-base font-semibold text-slate-50">{tier.setupPrice}</span>
                          <span className="text-sm text-slate-500 line-through decoration-slate-500">{tier.originalSetupPrice}</span>
                        </div>
                        {"savings" in tier && tier.savings && (
                          <p className="text-xs font-medium text-emerald-400">
                            {tier.savings}
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">{lang === 'pl' ? 'Wdrożenie:' : 'Setup:'}</span>
                        <span className="text-base font-semibold text-slate-50">{tier.setupPrice}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          isHighlighted ? "text-indigo-400" : "text-slate-500"
                        }`}
                        strokeWidth={2.5}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={isHighlighted ? auditHref : pricingHref}
                  className={`block w-full text-center font-semibold py-3.5 rounded-xl transition-all duration-300 ${
                    isHighlighted
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                      : "bg-transparent border border-slate-50/20 text-slate-50 hover:bg-white/5 hover:border-slate-50/40"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* View Full Pricing */}
        <div className="text-center">
          <Link
            href={pricingHref}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-2"
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
