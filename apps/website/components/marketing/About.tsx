"use client";

import { getTranslations, type Lang } from "@/lib/translations";

interface AboutProps {
  lang?: Lang;
}

export default function About({ lang = 'en' }: AboutProps) {
  const t = getTranslations(lang);

  return (
    <section id="about" className="py-32 bg-[#020617] border-t border-slate-900/50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">

          {/* Left Column: Manifesto */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white leading-[1.1]">
              {t.about?.title || 'Engineering Precision.'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-amber-400">
                {t.about?.titleAccent || 'Designer Soul.'}
              </span>
            </h2>

            <p className="text-lg md:text-xl font-light text-slate-400 leading-relaxed max-w-lg">
              {t.about?.description || 'We are a collective of obsessed developers, creative designers, and strategic thinkers. We don\'t just write code—we craft experiences. While our engineers ensure military-grade stability, our designers ensure your automation feels human, intuitive, and flawless. We build systems that work beautifully.'}
            </p>

            <div className="pt-8 border-t border-slate-800/60">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-6">
                {t.about?.workspaceTitle || 'Our Workspace'}
              </h4>
              <div className="flex flex-wrap gap-4">
                {/* Tool 1: Code */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-800 bg-slate-900/50 text-slate-300 text-xs font-mono">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  Code
                </div>
                {/* Tool 2: Design */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-800 bg-slate-900/50 text-slate-300 text-xs font-mono">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-400">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="m2 2 7.586 7.586" />
                    <circle cx="11" cy="11" r="2" />
                  </svg>
                  Design
                </div>
                {/* Tool 3: Planning */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-800 bg-slate-900/50 text-slate-300 text-xs font-mono">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  Planning
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Competence Cards */}
          <div className="space-y-6">
            {/* Card 1: Engineering */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0A0F1E] hover:border-cyan-500/30 transition-colors group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M9 14l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    {t.about?.competencies?.engineering?.title || 'Engineering Core'}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t.about?.competencies?.engineering?.description || 'Military-grade stability. We build self-healing systems prepared for massive scale.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Creative */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0A0F1E] hover:border-fuchsia-500/30 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-fuchsia-950/30 border border-fuchsia-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-400">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="m2 2 7.586 7.586" />
                    <circle cx="11" cy="11" r="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    {t.about?.competencies?.creative?.title || 'Creative Studio'}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t.about?.competencies?.creative?.description || 'Obsessing over every interaction. Automation shouldn\'t feel robotic—it should feel magical.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Strategy */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0A0F1E] hover:border-amber-500/30 transition-colors group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-amber-950/30 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                    <line x1="12" x2="12" y1="20" y2="10" />
                    <line x1="18" x2="18" y1="20" y2="4" />
                    <line x1="6" x2="6" y1="20" y2="16" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    {t.about?.competencies?.strategy?.title || 'Strategy Lab'}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t.about?.competencies?.strategy?.description || 'Aligning tech with revenue. We ensure ROI from Day 1.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
