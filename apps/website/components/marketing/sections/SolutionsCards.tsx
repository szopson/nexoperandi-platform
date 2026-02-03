import Link from "next/link";
import { homepageTranslations } from "@/lib/homepage-translations";
import type { Lang } from "@/lib/translations";

interface SolutionsCardsProps {
  lang?: Lang;
}

export default function SolutionsCards({ lang = "en" }: SolutionsCardsProps) {
  const t = homepageTranslations[lang].solutionsCards;
  const solutionsHref = lang === "pl" ? "/pl/rozwiazania" : "/solutions";

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t.headline}
          </h2>
          <p className="text-slate-400 text-lg">
            {t.subheadline}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.cards.map((card, index) => (
            <div
              key={index}
              className={`relative bg-white/[0.03] border rounded-2xl p-6 transition-all hover:-translate-y-1 ${
                card.badge
                  ? "border-blue-500/30 hover:border-blue-500/50"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {/* Badge */}
              {card.badge && (
                <div className="absolute -top-3 left-6">
                  <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {card.badge}
                  </span>
                </div>
              )}

              {/* Subtitle */}
              <p className="text-xs font-medium text-blue-400 uppercase tracking-wider mb-2">
                {card.subtitle}
              </p>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                {card.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {card.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={solutionsHref}
                className={`block w-full text-center text-sm font-semibold py-3 rounded-lg transition-colors ${
                  card.badge
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                {card.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
