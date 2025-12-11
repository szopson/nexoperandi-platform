'use client';

import { useState, useEffect } from 'react';
import CalendlyButton from '@/components/CalendlyButton';
import { getTranslations, type Lang } from '@/lib/translations';

// Card styling per engagement type - dark theme
const cardStyles = {
  customerSuccess: {
    border: 'border-blue-500/30',
    hoverBorder: 'hover:border-blue-500/50',
    bg: 'bg-slate-900/40',
    tagBg: 'bg-blue-500/10',
    tagBorder: 'border-blue-500/20',
    tagText: 'text-blue-300',
    dot: 'bg-blue-400',
    accentBorder: 'border-l-blue-500',
    hoverShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.1)]',
    timeText: 'text-blue-400',
  },
  revenue: {
    border: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-500/50',
    bg: 'bg-slate-900/40',
    tagBg: 'bg-amber-500/10',
    tagBorder: 'border-amber-500/20',
    tagText: 'text-amber-300',
    dot: 'bg-amber-400',
    accentBorder: 'border-l-amber-500',
    hoverShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.1)]',
    timeText: 'text-amber-400',
  },
  content: {
    border: 'border-fuchsia-500/30',
    hoverBorder: 'hover:border-fuchsia-500/50',
    bg: 'bg-slate-900/40',
    tagBg: 'bg-fuchsia-500/10',
    tagBorder: 'border-fuchsia-500/20',
    tagText: 'text-fuchsia-300',
    dot: 'bg-fuchsia-400',
    accentBorder: 'border-l-fuchsia-500',
    hoverShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(217,70,239,0.1)]',
    timeText: 'text-fuchsia-400',
  },
};

interface ResultsProps {
  lang?: Lang;
}

export default function Results({ lang = 'en' }: ResultsProps) {
  const t = getTranslations(lang);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Get engagements based on language
  const engagements = [
    {
      id: 'customerSuccess',
      pill: t.results.engagements.customerSuccess.pill,
      headline: t.results.engagements.customerSuccess.headline,
      subheadline: t.results.engagements.customerSuccess.subheadline || 'Faster onboarding & shorter response times',
      mechanism: t.results.engagements.customerSuccess.mechanism,
      timeToValue: t.results.engagements.customerSuccess.timeToValue,
      modal: {
        problem: t.results.engagements.customerSuccess.problem,
        solution: t.results.engagements.customerSuccess.solution,
        resultTarget: t.results.engagements.customerSuccess.resultTarget,
        stack: t.results.engagements.customerSuccess.modalStack,
        timeToValue: t.results.engagements.customerSuccess.timeToValue,
      },
    },
    {
      id: 'revenue',
      pill: t.results.engagements.revenue.pill,
      headline: t.results.engagements.revenue.headline,
      subheadline: t.results.engagements.revenue.subheadline || 'Higher conversion rates & 24/7 lead engagement',
      mechanism: t.results.engagements.revenue.mechanism,
      timeToValue: t.results.engagements.revenue.timeToValue,
      modal: {
        problem: t.results.engagements.revenue.problem,
        solution: t.results.engagements.revenue.solution,
        resultTarget: t.results.engagements.revenue.resultTarget,
        stack: t.results.engagements.revenue.modalStack,
        timeToValue: t.results.engagements.revenue.timeToValue,
      },
    },
    {
      id: 'content',
      pill: t.results.engagements.content.pill,
      headline: t.results.engagements.content.headline,
      subheadline: t.results.engagements.content.subheadline || 'Consistent brand voice & automated distribution',
      mechanism: t.results.engagements.content.mechanism,
      timeToValue: t.results.engagements.content.timeToValue,
      modal: {
        problem: t.results.engagements.content.problem,
        solution: t.results.engagements.content.solution,
        resultTarget: t.results.engagements.content.resultTarget,
        stack: t.results.engagements.content.modalStack,
        timeToValue: t.results.engagements.content.timeToValue,
      },
    },
  ];

  // Body scroll lock when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  // ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal) {
        setActiveModal(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activeModal]);

  return (
    <>
      <section id="results" className="overflow-hidden bg-[#020617] pt-32 pb-32 relative">
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent to-transparent opacity-50 via-slate-800" />
        {/* Decorative orbs - smaller on mobile for performance, hidden overflow by parent */}
        <div className="absolute top-[20%] right-[-5%] sm:right-[-10%] w-[200px] sm:w-[400px] md:w-[500px] h-[200px] sm:h-[400px] md:h-[500px] bg-cyan-500/5 rounded-full blur-[60px] sm:blur-[100px] md:blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-5%] sm:left-[-10%] w-[200px] sm:w-[400px] md:w-[500px] h-[200px] sm:h-[400px] md:h-[500px] rounded-full blur-[60px] sm:blur-[100px] md:blur-[120px] pointer-events-none bg-blue-600/5" />

        <div className="max-w-7xl z-10 mx-auto px-6 relative">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white">
              {t.results.titleNew || 'Real Impact.'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-500 from-cyan-400">
                {t.results.titleAccent || 'Measurable Scale.'}
              </span>
            </h2>
            <p className="text-xl font-light text-slate-400">
              {t.results.subtitleNew || "We don't just optimize. We transform operations."}
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {engagements.map((engagement) => {
              const styles = cardStyles[engagement.id as keyof typeof cardStyles];

              return (
                <article
                  key={engagement.id}
                  onClick={() => setActiveModal(engagement.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModal(engagement.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${engagement.pill} details`}
                  className={`
                    group relative flex flex-col h-full rounded-3xl border backdrop-blur-[40px]
                    shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]
                    transition-all duration-500
                    ${styles.border} ${styles.hoverBorder} ${styles.bg}
                    hover:-translate-y-2 ${styles.hoverShadow}
                    overflow-hidden cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900
                  `}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${engagement.id === 'customerSuccess' ? 'blue' : engagement.id === 'revenue' ? 'amber' : 'fuchsia'}-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  <div className="flex flex-col z-10 h-full p-8 relative">
                    {/* Badge */}
                    <div className="mb-6">
                      <div className={`inline-flex items-center gap-1.5 rounded-full border ${styles.tagBorder} ${styles.tagBg} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${styles.tagText}`}>
                        <span className="relative flex h-1.5 w-1.5 mr-1">
                          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${styles.dot}`} />
                          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                        </span>
                        {engagement.pill}
                      </div>
                    </div>

                    {/* Metric */}
                    <div className="mb-6">
                      <h3 className="group-hover:text-white transition-colors text-xl md:text-2xl font-semibold tracking-tight mb-2 text-white">
                        {engagement.headline}
                      </h3>
                      <p className={`text-sm font-medium ${styles.tagText}/80`}>
                        {engagement.subheadline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className={`text-sm font-light leading-relaxed mb-8 border-l-2 ${styles.accentBorder}/20 pl-4 group-hover:${styles.accentBorder}/40 transition-colors text-slate-400`}>
                      {engagement.mechanism}
                    </p>

                    {/* Time to Results */}
                    <div className="mt-auto space-y-6 pt-6 border-t border-white/5">
                      <div>
                        <h4 className={`text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1 group-hover:${styles.timeText}/80 transition-colors`}>
                          {t.results.timeToValue}
                        </h4>
                        <p className={`text-sm font-bold ${styles.timeText}`}>
                          {engagement.timeToValue}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-4 sm:p-6 md:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {(() => {
              const engagement = engagements.find((e) => e.id === activeModal);
              if (!engagement) return null;
              const styles = cardStyles[engagement.id as keyof typeof cardStyles];

              return (
                <>
                  <div className="inline-block px-3 py-1.5 bg-slate-800 rounded-full text-xs text-slate-400 uppercase tracking-wide mb-4">
                    {t.results.modal.illustrative}
                  </div>

                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider ${styles.tagBg} border ${styles.tagBorder} ${styles.tagText} mb-3`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                    {engagement.pill}
                  </span>

                  <h3 id="modal-title" className="text-xl md:text-2xl font-bold text-white mb-1 leading-tight">
                    {engagement.headline}
                  </h3>
                  <p className="text-base text-slate-400 mb-6">{engagement.subheadline}</p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                        {t.results.modal.problem}
                      </h4>
                      <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                        {engagement.modal.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-slate-500 mb-3">
                        {t.results.modal.solution}
                      </h4>
                      <ul className="space-y-2.5">
                        {engagement.modal.solution.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm md:text-base text-slate-300 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                        {t.results.modal.resultTarget}
                      </h4>
                      <p className="text-base md:text-lg text-white font-semibold">
                        {engagement.modal.resultTarget}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                          {t.results.stack}
                        </div>
                        <div className="text-sm text-slate-300">
                          {engagement.modal.stack}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                          {t.results.timeToValue}
                        </div>
                        <div className={`text-sm font-semibold ${styles.timeText}`}>
                          {engagement.modal.timeToValue}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div onClick={() => setActiveModal(null)}>
                      <CalendlyButton
                        buttonText={t.results.modal.bookDiagnostic}
                        variant="primary"
                        utmSource={`results_${engagement.id}`}
                        className="w-full"
                      />
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}
