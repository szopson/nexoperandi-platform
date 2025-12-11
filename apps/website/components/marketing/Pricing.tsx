"use client";

import { getTranslations, type Lang } from "@/lib/translations";
// CalendlyButton removed - now using contact form pre-fill

type PlanKey = 'conversionCore' | 'visibilityEngine' | 'growthEcosystem' | 'custom';

function scrollToContactWithPlan(plan: PlanKey) {
  // Set URL param for contact form to read
  const url = new URL(window.location.href);
  url.searchParams.set('plan', plan);
  url.hash = 'contact';
  window.history.pushState({}, '', url);

  // Scroll to contact
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  // Dispatch event to notify ContactSection
  window.dispatchEvent(new CustomEvent('planSelected', { detail: { plan } }));
}

interface PricingProps {
  lang?: Lang;
}

export default function Pricing({ lang = 'en' }: PricingProps) {
  const t = getTranslations(lang);

  return (
    <section id="pricing" className="bg-[#020617] border-slate-900/50 border-t pt-32 pb-32 relative overflow-hidden">
      <div className="max-w-7xl z-10 mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white">
            {t.pricing?.title || 'Choose your'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {t.pricing?.titleAccent || 'Scale'}
            </span>
          </h2>
          <p className="text-xl font-light text-slate-400 max-w-2xl mx-auto">
            {t.pricing?.subtitle || 'Flexible structures designed to grow with your ambition.'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Card 1: Conversion Core */}
          <div className="group relative flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm p-6 md:p-8 hover:scale-105 transition-transform duration-300 hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.1)] hover:border-blue-500/30">
            <div className="mb-6 space-y-2">
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                {t.pricing?.packages?.conversionCore?.name || 'The Conversion Core'}
              </h3>
              <p className="text-sm font-medium text-blue-400 uppercase tracking-wider">
                {t.pricing?.packages?.conversionCore?.category || 'For Operations & Support'}
              </p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              {t.pricing?.packages?.conversionCore?.description || 'Turn your traffic into revenue. We automate the boring stuff so you never miss a lead again.'}
            </p>

            {/* Pricing Block */}
            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white tracking-tight">$147</span>
                <span className="text-base font-medium text-slate-500">/ mo</span>
              </div>
              <p className="text-xs font-medium text-slate-500 mt-2">
                {t.pricing?.packages?.conversionCore?.setupNote || '+ One-time Setup Fee'}
              </p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t.pricing?.packages?.conversionCore?.features?.[0] || '24/7 AI Receptionist'}
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t.pricing?.packages?.conversionCore?.features?.[1] || 'Instant Lead Qualification'}
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t.pricing?.packages?.conversionCore?.features?.[2] || 'CRM Sync'}
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t.pricing?.packages?.conversionCore?.features?.[3] || 'Review Automation'}
              </li>
            </ul>

            <button
              onClick={() => scrollToContactWithPlan('conversionCore')}
              className="w-full py-3 rounded-lg border border-slate-700 text-slate-300 font-semibold text-sm hover:bg-slate-800 transition-colors text-center block"
            >
              {t.pricing?.packages?.conversionCore?.cta || 'Automate Operations'}
            </button>
          </div>

          {/* Card 2: Visibility Engine */}
          <div className="group relative flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm p-6 md:p-8 hover:scale-105 transition-transform duration-300 hover:shadow-[0_20px_40px_-10px_rgba(217,70,239,0.1)] hover:border-fuchsia-500/30">
            <div className="mb-6 space-y-2">
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                {t.pricing?.packages?.visibilityEngine?.name || 'The Visibility Engine'}
              </h3>
              <p className="text-sm font-medium text-fuchsia-400 uppercase tracking-wider">
                {t.pricing?.packages?.visibilityEngine?.category || 'For Content & Outreach'}
              </p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              {t.pricing?.packages?.visibilityEngine?.description || 'Be everywhere, all at once. An automated content machine that keeps your brand top-of-mind.'}
            </p>

            {/* Pricing Block */}
            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white tracking-tight">$497</span>
                <span className="text-base font-medium text-slate-500">/ mo</span>
              </div>
              <p className="text-xs font-medium text-slate-500 mt-2">
                {t.pricing?.packages?.visibilityEngine?.setupNote || 'No Setup Fee • Cancel anytime'}
              </p>
            </div>

            <ul className="flex-1 mb-8 space-y-4">
              <li className="flex text-sm text-slate-300 gap-3 items-center">
                <svg className="flex-shrink-0 w-5 h-5 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t.pricing?.packages?.visibilityEngine?.features?.[0] || 'SEO Blog Autopilot'}
              </li>
              <li className="flex gap-3 text-sm text-slate-300 items-center">
                <svg className="w-5 h-5 text-fuchsia-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t.pricing?.packages?.visibilityEngine?.features?.[1] || 'Newsletter System'}
              </li>
              <li className="flex gap-3 text-sm text-slate-300 items-center">
                <svg className="w-5 h-5 text-fuchsia-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t.pricing?.packages?.visibilityEngine?.features?.[2] || 'Video-to-Text Workflow'}
              </li>
              <li className="flex gap-3 text-sm text-slate-300 items-center">
                <svg className="w-5 h-5 text-fuchsia-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t.pricing?.packages?.visibilityEngine?.features?.[3] || 'Multiplatform content generation'}
              </li>
            </ul>

            <button
              onClick={() => scrollToContactWithPlan('visibilityEngine')}
              className="w-full py-3 rounded-lg border border-slate-700 text-slate-300 font-semibold text-sm hover:bg-slate-800 transition-colors text-center block"
            >
              {t.pricing?.packages?.visibilityEngine?.cta || 'Automate Marketing'}
            </button>
          </div>

          {/* Card 3: Growth Ecosystem (Highlighted) */}
          <div className="group relative flex flex-col h-full rounded-2xl border border-cyan-500/40 bg-slate-900/60 backdrop-blur-sm p-6 md:p-8 hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/20">

            {/* Best Value Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              {t.pricing?.packages?.growthEcosystem?.badge || 'Best Value'}
            </div>

            <div className="mb-6 space-y-2">
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                {t.pricing?.packages?.growthEcosystem?.name || 'The Growth Ecosystem'}
              </h3>
              <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 uppercase tracking-wider">
                {t.pricing?.packages?.growthEcosystem?.category || 'Operations + Marketing'}
              </p>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              {t.pricing?.packages?.growthEcosystem?.description || 'The complete Business-in-a-Box solution. Scale your traffic and handle the influx of leads.'}
            </p>

            {/* Pricing Block */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white tracking-tight">$697</span>
                  <span className="text-base font-medium text-blue-200/60">/ mo</span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wide uppercase">
                  {t.pricing?.packages?.growthEcosystem?.savings || 'Save $800 on Setup'}
                </span>
              </div>
              <p className="text-xs font-medium text-blue-200/80">
                {t.pricing?.packages?.growthEcosystem?.setupNote || 'All-inclusive Pilot Rate'}
              </p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-white text-sm">
                <div className="bg-cyan-500/20 p-0.5 rounded-full">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {t.pricing?.packages?.growthEcosystem?.features?.[0] || 'Everything in Conversion Core'}
              </li>
              <li className="flex items-center gap-3 text-white text-sm">
                <div className="bg-cyan-500/20 p-0.5 rounded-full">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {t.pricing?.packages?.growthEcosystem?.features?.[1] || 'Everything in Visibility Engine'}
              </li>
              <li className="flex items-center gap-3 text-white text-sm">
                <div className="bg-cyan-500/20 p-0.5 rounded-full">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {t.pricing?.packages?.growthEcosystem?.features?.[2] || 'Priority Support'}
              </li>
              <li className="flex items-center gap-3 text-white text-sm">
                <div className="bg-cyan-500/20 p-0.5 rounded-full">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {t.pricing?.packages?.growthEcosystem?.features?.[3] || 'Unified Dashboard'}
              </li>
            </ul>

            <button
              onClick={() => scrollToContactWithPlan('growthEcosystem')}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 text-center block"
            >
              {t.pricing?.packages?.growthEcosystem?.cta || 'Get The Full System'}
            </button>
          </div>
        </div>

        {/* Tailored Section */}
        <div className="mt-20 rounded-2xl bg-gradient-to-r from-[#0B1120] to-[#0f172a] border border-slate-800 p-6 md:p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          {/* Decorative glow - hidden on mobile to prevent overflow */}
          <div className="hidden sm:block absolute -right-20 -top-20 w-64 h-64 bg-slate-700/20 rounded-full blur-3xl group-hover:bg-slate-600/20 transition-colors" />

          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
              {t.pricing?.customSection?.title || "Needs are more complex? Let's build Custom."}
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              {t.pricing?.customSection?.description || 'We build custom AI architectures for enterprise workflows, internal training bots, and proprietary data security.'}
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <button
              onClick={() => scrollToContactWithPlan('custom')}
              className="px-8 py-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition-all hover:border-slate-500 inline-block"
            >
              {t.pricing?.customSection?.cta || 'Book Architecture Audit'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
