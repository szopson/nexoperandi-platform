"use client";

import { useState } from "react";
import { pagesTranslations } from "@/lib/pages-translations";
import type { Lang } from "@/lib/translations";

interface SolutionsPageProps {
  lang?: Lang;
}

export default function SolutionsPage({ lang = "en" }: SolutionsPageProps) {
  const t = pagesTranslations[lang].solutions;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Solution Cards */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {t.cards.map((card, i) => (
            <div
              key={i}
              className="bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-8 md:p-10 border-b border-white/5">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {card.title}
                  </h2>
                  {card.badge && (
                    <span className="inline-flex px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full w-fit">
                      {card.badge}
                    </span>
                  )}
                </div>
                <p className="text-blue-400 font-medium mb-3">
                  {card.subtitle}
                </p>
                <p className="text-slate-400 max-w-2xl text-lg">
                  {card.description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="p-8 md:p-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {card.features.map((feature, j) => (
                    <div key={j} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg
                          className="text-blue-500 flex-shrink-0"
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
                        <h3 className="text-white font-semibold text-sm">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-slate-400 text-sm pl-6">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Use Cases + CTA */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-white/5">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                      {lang === "pl" ? "Idealne dla" : "Ideal for"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {card.useCases.map((useCase, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 bg-white/5 text-slate-300 text-xs rounded-full"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={card.ctaHref}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 whitespace-nowrap"
                  >
                    {card.cta}
                    <svg
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
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
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
