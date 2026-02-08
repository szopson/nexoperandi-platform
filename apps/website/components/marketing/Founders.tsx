"use client";

import Image from "next/image";
import { getTranslations, type Lang } from "@/lib/translations";
import { Plug, BarChart2, Infinity } from "lucide-react";

interface FoundersProps {
  lang?: Lang;
}

const differentiatorIcons = [Plug, BarChart2, Infinity];

export default function Founders({ lang = 'en' }: FoundersProps) {
  const t = getTranslations(lang);
  const f = t.founders;

  return (
    <section className="pt-32 pb-24 bg-black border-t border-slate-900/50 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Full-width header */}
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-4">
            {f?.label || 'About Us'}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight max-w-2xl">
            {f?.headline || 'Built by engineers. Driven by real-world experience.'}
          </h2>
        </div>

        {/* Image + Text grid (40/60) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-start">
          {/* Image - 2/5 = 40% */}
          <div className="md:col-span-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/founders.webp"
                alt={f?.imageAlt || "Founders of NexOperandi"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 400px"
                loading="lazy"
              />
              {/* Filter layer - cooler tech look */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-color"
                style={{ backgroundColor: "rgba(30, 41, 59, 0.15)" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ filter: "saturate(0.85) contrast(1.05) brightness(0.9)" }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            </div>
          </div>

          {/* Text - 3/5 = 60% */}
          <div className="md:col-span-3">
            <div className="space-y-5 text-slate-400 text-base leading-[1.7]">
              <p>
                {f?.paragraph1 || 'Founded by a husband-and-wife engineering team, we bring over 15 years of combined experience delivering complex IT systems in demanding, real-world environments.'}
              </p>

              <p>
                {f?.paragraph2 || 'Our work spans banking and financial platforms, cryptocurrency infrastructure, large-scale IT system integration, and software supporting autonomous driving systems — helping companies optimize processes, integrate systems, and improve operational efficiency and profitability.'}
              </p>

              <p>
                {f?.paragraph3 || 'Today, AI is our long-term passion, combined with strong engineering discipline. We build reliable, scalable, and cost-efficient AI automation designed to grow with the business — not break under it.'}
              </p>

              <p>
                {f?.paragraph4 || 'We work as a founder-led team, supported by a trusted network of experienced engineers and specialists, allowing us to scale expertise when projects demand it.'}
              </p>
            </div>
          </div>
        </div>

        {/* Differentiators - 3 equal columns below */}
        {f?.differentiators && f.differentiators.length >= 3 && (
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {f.differentiators.slice(0, 3).map((item, idx) => {
              const Icon = differentiatorIcons[idx];
              return (
                <div
                  key={idx}
                  className="group relative p-6 text-center rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  {/* Icon */}
                  <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA - centered */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-slate-700 hover:border-slate-600"
          >
            {f?.cta || "Let's talk about your system"}
          </a>
          <p className="mt-3 text-xs text-slate-500">
            {f?.ctaSubtext || 'A short, no-obligation conversation.'}
          </p>
        </div>
      </div>
    </section>
  );
}
