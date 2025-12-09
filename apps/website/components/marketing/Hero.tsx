"use client";

import Link from "next/link";
import DigitalBrain from "@/components/marketing/DigitalBrain";
import HeroBackground from "@/components/marketing/HeroBackground";
import { getTranslations, type Lang } from "@/lib/translations";

interface HeroProps {
  lang?: Lang;
}

export default function Hero({ lang = 'en' }: HeroProps) {
  const t = getTranslations(lang);

  return (
    <section className="min-h-screen flex overflow-hidden pt-32 pb-20 relative items-center">
      {/* Animated Background */}
      <HeroBackground />

      <div className="grid lg:grid-cols-2 z-10 w-full max-w-7xl mx-auto px-6 relative gap-16 items-center">

        {/* Text Content */}
        <div className="order-2 lg:order-1 max-w-2xl space-y-8">
          {/* Badge */}
          <div className="inline-flex gap-2 uppercase text-xs font-semibold tracking-wider border-cyan-500/20 border rounded-full py-1 px-3 items-center text-cyan-400 bg-cyan-950/30">
            {t.hero.global}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-cyan-400" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
          </div>

          {/* Headline */}
          <h1 className="leading-[1.1] text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight">
            {t.hero.titleLine1 || 'Build. Scale. Dominate.'}{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              {t.hero.titleAccent || 'AI automation'}
            </span>{' '}
            {t.hero.titleLine2 || 'for ambitious businesses'}
          </h1>

          {/* Subheading */}
          <p className="leading-relaxed text-base md:text-lg font-light text-slate-100 max-w-lg">
            {t.hero.subtitle}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="#contact"
              className="transition-all transform hover:-translate-y-0.5 hover:bg-white text-base font-semibold text-slate-950 tracking-tight bg-slate-50 rounded-full py-4 px-8 shadow-[0_0_20px_rgba(255,255,255,0.3)] text-center"
            >
              {t.hero.ctaPrimary}
            </Link>
          </div>
        </div>

        {/* Visual/Animation Centerpiece */}
        <DigitalBrain lang={lang} />
      </div>
    </section>
  );
}
