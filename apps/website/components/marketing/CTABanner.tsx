"use client";

import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";
import { getTranslations, type Lang } from "@/lib/translations";

interface CTABannerProps {
  lang?: Lang;
}

export default function CTABanner({ lang = 'en' }: CTABannerProps) {
  const t = getTranslations(lang);

  return (
    <section id="cta" className="bg-black text-white px-4 md:px-6 py-8 md:py-32">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-center text-2xl md:text-5xl font-semibold mb-2 md:mb-6">{t.ctaBanner.title}</h2>
        <p className="text-sm md:text-xl text-slate-200 md:text-gray-300 mb-5 md:mb-10">
          {t.ctaBanner.subtitle}
        </p>
        <Link
          href="#contact"
          className="block w-full text-center bg-white text-black font-semibold py-3 md:py-4 px-6 md:px-8 rounded-md md:rounded-lg hover:bg-gray-100 transition-colors shadow-lg text-sm md:text-lg"
        >
          {t.ctaBanner.cta}
        </Link>
        <p className="mt-3 md:mt-6 text-xs md:text-sm text-slate-300 md:text-gray-400">
          {t.ctaBanner.or}{' '}
          <CalendlyButton
            buttonText={t.ctaBanner.bookCall}
            variant="link"
            utmSource="cta_banner"
            className="text-slate-200 hover:text-white underline"
          />
        </p>
      </div>
    </section>
  );
}
