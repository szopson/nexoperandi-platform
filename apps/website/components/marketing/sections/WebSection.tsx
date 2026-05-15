"use client";

import Link from "next/link";
import { homepageTranslations } from "@/lib/homepage-translations";
import type { Lang } from "@/lib/translations";

interface WebSectionProps {
  lang?: Lang;
}

export default function WebSection({ lang = "en" }: WebSectionProps) {
  const t = homepageTranslations[lang].webSection;

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/10 via-gray-900/40 to-purple-600/10 p-10 md:p-14 backdrop-blur-sm overflow-hidden">
          {/* subtle decorative orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-500/15 text-blue-300 border border-blue-500/30">
                {t.label}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-slate-300 border border-white/10">
                {t.badge}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-3xl leading-tight">
              {t.headline}
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
              {t.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={t.ctaPrimaryHref}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-full transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                {t.ctaPrimary}
              </Link>
              <Link
                href={t.ctaSecondaryHref}
                className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-full border border-white/15 transition-all"
              >
                {t.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
