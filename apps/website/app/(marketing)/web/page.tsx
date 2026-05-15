import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "@/lib/translations";

export const metadata: Metadata = {
  title: "Web Design & E-commerce Development",
  description:
    "High-converting websites and online stores built for serious businesses. From clinic websites to WooCommerce stores — mobile-first, SEO-ready, measurable. From €2,500.",
  alternates: {
    canonical: "https://nexoperandi.cloud/web",
    languages: {
      en: "https://nexoperandi.cloud/web",
      pl: "https://nexoperandi.cloud/pl/strony",
    },
  },
};

export default function WebPage() {
  const t = getTranslations("en").webPage;
  const buildCards = [
    t.whatWeBuild.ecommerce,
    t.whatWeBuild.website,
    t.whatWeBuild.landing,
  ];
  const demos = [
    { ...t.liveDemos.ecommerce, key: "ecommerce", image: "/demos/demo-shop-preview.png" },
    { ...t.liveDemos.dental, key: "dental", image: "/demos/demo-dental-preview.png" },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 text-slate-300">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 text-center mb-24">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-500/15 text-blue-300 border border-blue-500/30">
            {t.hero.label}
          </span>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-slate-300 border border-white/10">
            {t.hero.badge}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-tight">
          {t.hero.headline}
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed">
          {t.hero.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/demos"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-full transition-all hover:shadow-lg hover:shadow-blue-500/20"
          >
            {t.hero.ctaPrimary}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-full border border-white/15 transition-all"
          >
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </section>

      {/* What we build */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
          {t.whatWeBuild.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buildCards.map((card) => (
            <div
              key={card.title}
              className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live demos */}
      <section id="live-demos" className="max-w-7xl mx-auto px-6 mb-24 scroll-mt-24">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t.liveDemos.title}
          </h2>
          <p className="text-slate-400">{t.liveDemos.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {demos.map((demo) => (
            <div
              key={demo.key}
              className="bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all flex flex-col"
            >
              <img
                src={demo.image}
                alt={demo.title}
                className="w-full aspect-video object-cover object-top"
                loading="lazy"
              />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                    Live Demo
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-6 flex-1">{demo.description}</p>
                <a
                  href={demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transition"
                >
                  {t.liveDemos.viewLive}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
          {t.howWeWork.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.howWeWork.steps.map((step) => (
            <div
              key={step.step}
              className="bg-gray-900/50 border border-white/10 rounded-2xl p-6"
            >
              <div className="text-blue-400 text-3xl font-bold mb-3">{step.step}</div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 rounded-2xl p-10 md:p-14 text-center backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">{t.cta.subtitle}</p>
          <Link
            href={t.cta.buttonHref}
            className="inline-block bg-white text-gray-900 font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition"
          >
            {t.cta.button}
          </Link>
        </div>
      </section>
    </div>
  );
}
