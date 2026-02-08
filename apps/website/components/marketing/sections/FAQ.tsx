"use client";

import { useState } from "react";
import { homepageTranslations } from "@/lib/homepage-translations";
import type { Lang } from "@/lib/translations";

interface FAQProps {
  lang?: Lang;
}

export default function FAQ({ lang = "en" }: FAQProps) {
  const t = homepageTranslations[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t.headline}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {t.items.map((item, index) => (
            <div
              key={index}
              className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden transition-colors hover:border-white/15"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                aria-expanded={openIndex === index}
              >
                <span className="text-sm font-semibold text-white pr-4">
                  {item.question}
                </span>
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
                  className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
