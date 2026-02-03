"use client";

import { useState } from "react";
import { pagesTranslations } from "@/lib/pages-translations";
import type { Lang } from "@/lib/translations";

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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {t.tiers.map((tier, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  tier.highlighted
                    ? "border-blue-500/50 bg-blue-950/20 shadow-xl shadow-blue-500/10"
                    : "border-white/10 bg-gray-900/50"
                }`}
              >
                {/* Badge */}
                {"badge" in tier && tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-slate-400 text-sm">{tier.description}</p>
                </div>

                {/* Pricing */}
                {/* REVIEW: pricing values are placeholders */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-white">
                      {tier.setupPrice}
                    </span>
                    <span className="text-slate-500 text-sm">
                      {lang === "pl" ? "setup" : "setup"}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-semibold text-blue-400">
                      {tier.monthlyPrice}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex-1 space-y-3 mb-8">
                  {tier.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      {feature.included ? (
                        <svg
                          className="text-green-500 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg
                          className="text-slate-600 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" x2="6" y1="6" y2="18" />
                          <line x1="6" x2="18" y1="6" y2="18" />
                        </svg>
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
                  className={`block text-center px-6 py-3 rounded-xl font-semibold transition-colors ${
                    tier.highlighted
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            {t.addons.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {t.addons.items.map((addon, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-900/50 border border-white/10 rounded-xl px-6 py-4"
              >
                <span className="text-slate-300">{addon.name}</span>
                {/* REVIEW: pricing values are placeholders */}
                <span className="text-blue-400 font-semibold whitespace-nowrap ml-4">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
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
                  <span className="font-semibold text-white pr-4">
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            {t.cta.subtitle}
          </p>
          <a
            href={lang === "pl" ? "/pl/audyt-automatyzacji" : "/pipeline-audit"}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
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
