import Link from "next/link";
import { homepageTranslations } from "@/lib/homepage-translations";
import type { Lang } from "@/lib/translations";

interface FinalCTAProps {
  lang?: Lang;
}

export default function FinalCTA({ lang = "en" }: FinalCTAProps) {
  const t = homepageTranslations[lang].finalCta;

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t.headline}
          </h2>
          <p className="text-slate-400 text-lg">
            {t.subheadline}
          </p>
        </div>

        {/* 3 Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.options.map((option, index) => (
            <Link
              key={index}
              href={option.href}
              className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center hover:border-blue-500/30 transition-all hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {option.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                {option.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                {option.cta}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
