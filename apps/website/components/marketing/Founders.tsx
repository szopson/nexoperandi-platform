"use client";

import Image from "next/image";
import { getTranslations, type Lang } from "@/lib/translations";
import { Plug, TrendingUp, ShieldCheck } from "lucide-react";

interface FoundersProps {
  lang?: Lang;
}

const differentiatorIcons = [Plug, TrendingUp, ShieldCheck];

export default function Founders({ lang = 'en' }: FoundersProps) {
  const t = getTranslations(lang);
  const f = t.founders;

  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-indigo-500/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Full-width header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-indigo-400 mb-4">
            {f?.label || 'About Us'}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-50 leading-tight max-w-3xl">
            {f?.headline || 'Built by engineers. Driven by real-world experience.'}
          </h2>
        </div>

        {/* Image + Text grid (40/60) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start mb-16 md:mb-20">
          {/* Image - 2/5 = 40% */}
          <div className="md:col-span-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/founders.webp"
                alt={f?.imageAlt || "Founders of NexOperandi"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                loading="lazy"
              />
              {/* Cool tech overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-indigo-950/20 mix-blend-multiply" />
            </div>
          </div>

          {/* Text - 3/5 = 60% */}
          <div className="md:col-span-3">
            <div className="space-y-6 text-slate-400 text-base md:text-lg leading-[1.8]">
              <p>
                {f?.paragraph1 || 'Founded by a husband-and-wife engineering team, we bring over 15 years of combined experience delivering complex IT systems in demanding, real-world environments.'}
              </p>

              <p>
                {f?.paragraph2 || 'Our work spans banking and financial platforms, cryptocurrency infrastructure, large-scale IT system integration, and software supporting autonomous driving systems — helping companies optimize processes, integrate systems, and improve operational efficiency and profitability.'}
              </p>

              <p>
                {f?.paragraph3 || 'Today, AI is our long-term passion, combined with strong engineering discipline. We build reliable, scalable, and cost-efficient AI automation designed to grow with the business — not break under it.'}
              </p>
            </div>
          </div>
        </div>

        {/* Differentiators - 3 equal columns */}
        {f?.differentiators && f.differentiators.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20">
            {f.differentiators.slice(0, 3).map((item, idx) => {
              const Icon = differentiatorIcons[idx];
              return (
                <div
                  key={idx}
                  className="group relative p-6 md:p-8 rounded-2xl bg-slate-900 border border-white/10 transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-900/80"
                >
                  {/* Icon */}
                  <div className="mb-5 w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-slate-50 mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA - centered with glow */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white text-base font-semibold px-8 py-4 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300"
          >
            {f?.cta || "Let's talk about your system"}
          </a>
          <p className="mt-4 text-sm text-slate-500">
            {f?.ctaSubtext || 'Short call, no obligations.'}
          </p>
        </div>
      </div>
    </section>
  );
}
