"use client";

import Image from "next/image";
import { getTranslations, type Lang } from "@/lib/translations";

interface FoundersProps {
  lang?: Lang;
}

export default function Founders({ lang = 'en' }: FoundersProps) {
  const t = getTranslations(lang);
  const f = t.founders;

  return (
    <section className="pt-32 pb-24 bg-[#020617] border-t border-slate-900/50 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Image - slight negative margin on desktop for optical alignment */}
          <div className="mx-auto w-full max-w-md md:max-w-none md:-mt-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/founders.webp"
                alt={f?.imageAlt || "Founders of NexOperandi"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 420px"
                loading="lazy"
              />
              {/* Filter layer - subtle color correction */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ filter: "saturate(0.9) contrast(1.05) brightness(0.95)" }}
              />
              {/* Gradient overlay - darker at bottom, transparent at top */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-4">
              {f?.label || 'About Us'}
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight">
              {f?.headline || 'Built by engineers. Driven by real-world experience.'}
            </h2>

            <div className="mt-6 space-y-4 text-slate-400 text-base leading-relaxed">
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

            {/* CTA */}
            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-700 hover:border-slate-600"
              >
                {f?.cta || "Let's talk about your system"}
              </a>
              <p className="mt-3 text-xs text-slate-500">
                {f?.ctaSubtext || 'A short, no-obligation conversation.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
