"use client";

import Link from "next/link";
import { homepageTranslations } from "@/lib/homepage-translations";
import { useModal } from "@/context/ModalContext";
import DigitalBrain from "@/components/marketing/DigitalBrain";
import HeroBackground from "@/components/marketing/HeroBackground";
import type { Lang } from "@/lib/translations";

interface HeroNewProps {
  lang?: Lang;
}

export default function HeroNew({ lang = "en" }: HeroNewProps) {
  const { openDemoVideo } = useModal();
  const t = homepageTranslations[lang].hero;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20">
      {/* Animated Background */}
      <HeroBackground />

      <div className="grid lg:grid-cols-2 z-10 w-full max-w-7xl mx-auto px-6 relative gap-16 items-center">
        {/* Text Content */}
        <div className="order-2 lg:order-1 max-w-2xl space-y-8 text-center lg:text-left">
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            {t.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            {t.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
            <button
              onClick={openDemoVideo}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full text-sm transition-all hover:shadow-lg hover:shadow-blue-600/25"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              {t.ctaDemo}
            </button>
            <Link
              href={lang === "pl" ? "/pl/audyt-automatyzacji" : "/pipeline-audit"}
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-full text-sm transition-all hover:bg-white/5"
            >
              {t.ctaAudit}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 justify-center lg:justify-start">
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {t.badges.deployment}
            </span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {t.badges.roi}
            </span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {t.badges.gdpr}
            </span>
          </div>
        </div>

        {/* Visual: Digital Brain */}
        <DigitalBrain lang={lang} />
      </div>
    </section>
  );
}
