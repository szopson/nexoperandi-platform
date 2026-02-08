"use client";

import { useState } from "react";
import { pagesTranslations } from "@/lib/pages-translations";
import type { Lang } from "@/lib/translations";
import { Check, X } from "lucide-react";

interface PricingPageProps {
  lang?: Lang;
}

export default function PricingPage({ lang = "en" }: PricingPageProps) {
  const t = pagesTranslations[lang].pricing;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-50 mb-4">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
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
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {t.tiers.map((tier, i) => {
              const isHighlighted = tier.highlighted;
              const hasPromo = "originalSetupPrice" in tier && tier.originalSetupPrice;

              return (
                <div
                  key={i}
                  className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
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

                  {/* Header */}
                  <div className="mb-6 mt-2">
                    <h3 className="text-2xl font-bold text-slate-50 mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-slate-400 text-sm">{tier.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="mb-8 pb-6 border-b border-white/10">
                    {/* Monthly Price */}
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-4xl font-bold text-slate-50">
                        {tier.monthlyPrice}
                      </span>
                    </div>

                    {/* Setup Fee with Savings */}
                    <div className="space-y-1">
                      {hasPromo ? (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-sm">{lang === 'pl' ? 'Wdrożenie:' : 'Setup:'}</span>
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
                  <div className="flex-1 space-y-3 mb-8">
                    {tier.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                              isHighlighted ? "text-indigo-400" : "text-slate-500"
                            }`}
                            strokeWidth={2.5}
                          />
                        ) : (
                          <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-600" strokeWidth={2} />
                        )}
                        <span
                          className={
                            feature.included
                              ? "text-slate-300 text-sm"
                              : "text-slate-600 text-sm"
                          }
                        >
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={tier.ctaHref}
                    className={`block text-center px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                      isHighlighted
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                        : "bg-transparent border border-slate-50/20 text-slate-50 hover:bg-white/5 hover:border-slate-50/40"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-50 text-center mb-10">
            {t.faq.title}
          </h2>
          <div className="space-y-4">
            {t.faq.items.map((item, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-slate-50 pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`flex-shrink-0 text-slate-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-slate-400">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
            {t.cta.title}
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            {t.cta.subtitle}
          </p>
          <a
            href={lang === "pl" ? "/pl/audyt-automatyzacji" : "/pipeline-audit"}
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            {t.cta.button}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
