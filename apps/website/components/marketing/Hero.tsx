"use client";

import Link from "next/link";
import NetworkDiagram from "@/components/NetworkDiagram";
import CalendlyButton from "@/components/CalendlyButton";
import { getTranslations, type Lang } from "@/lib/translations";

interface HeroProps {
  lang?: Lang;
}

export default function Hero({ lang = 'en' }: HeroProps) {
  const t = getTranslations(lang);
  return (
    <header className="relative bg-white text-black pt-6 pb-4 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center relative z-10">
        <div className="text-left md:w-1/2">
          <h1 className="text-center md:text-left text-3xl sm:text-4xl md:text-7xl font-bold mb-3 md:mb-6 leading-tight">
            {t.hero.title1}
            <br />
            {t.hero.title2}
          </h1>
          <p className="text-base md:text-2xl font-light mb-3 md:mb-8 text-gray-700 text-center md:text-left">
            {t.hero.subtitle}
          </p>
          {/* Badge: Działamy globalnie */}
          <p className="mb-5 md:mb-8">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 md:text-base md:px-4 md:py-1.5">
              {t.hero.global}
            </span>
          </p>
          {/* Dual CTA: Primary (Form) + Secondary (Call) */}
          <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-row sm:gap-5 sm:items-center md:items-start">
            <Link
              href="#contact"
              className="block sm:inline-block text-center bg-blue-600 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-md hover:bg-blue-700 hover:scale-105 transition-transform text-base md:text-lg shadow-md"
            >
              {t.hero.ctaPrimary}
            </Link>
            <CalendlyButton
              buttonText={t.hero.ctaSecondary}
              variant="outline"
              utmSource="hero"
              className="text-sm md:text-base w-full sm:w-auto"
            />
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center relative">
          <NetworkDiagram />
        </div>
      </div>

      {/* Trust strip - desktop version */}
      <div className="container mx-auto px-6 mt-12 hidden md:block">
        <div className="grid grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
          <div className="border-l-2 border-blue-600 pl-4 text-left">
            <div className="text-2xl font-bold text-gray-900">{t.hero.trust.roi}</div>
            <div className="text-gray-600">{t.hero.trust.roiLabel}</div>
          </div>
          <div className="border-l-2 border-blue-600 pl-4 text-left">
            <div className="text-2xl font-bold text-gray-900">{t.hero.trust.deployments}</div>
            <div className="text-gray-600">{t.hero.trust.deploymentsLabel}</div>
          </div>
          <div className="border-l-2 border-blue-600 pl-4 text-left">
            <div className="text-2xl font-bold text-gray-900">{t.hero.trust.implementation}</div>
            <div className="text-gray-600">{t.hero.trust.implementationLabel}</div>
          </div>
        </div>
      </div>

      {/* Trust strip - mobile version */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-100 md:hidden">
        <div className="flex justify-between text-center text-xs text-slate-700">
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{t.hero.trust.roi}</div>
            <div className="text-[11px] text-slate-500">{t.hero.trust.roiLabel}</div>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{t.hero.trust.deployments}</div>
            <div className="text-[11px] text-slate-500">{t.hero.trust.deploymentsLabel}</div>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{t.hero.trust.implementation}</div>
            <div className="text-[11px] text-slate-500">{t.hero.trust.implementationLabel}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
