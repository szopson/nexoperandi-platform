'use client';

import { useState, useEffect, useRef } from 'react';
import CalendlyButton from '@/components/CalendlyButton';
import { getTranslations, type Lang } from '@/lib/translations';

// Card styling per engagement type
const cardStyles = {
  customerSuccess: {
    border: 'border-blue-200',
    bg: 'bg-blue-50/30',
    tagBg: 'bg-blue-100/60',
    dot: 'bg-blue-400',
  },
  revenue: {
    border: 'border-amber-200',
    bg: 'bg-amber-50/30',
    tagBg: 'bg-amber-100/60',
    dot: 'bg-amber-400',
  },
  content: {
    border: 'border-purple-200',
    bg: 'bg-purple-50/30',
    tagBg: 'bg-purple-100/60',
    dot: 'bg-purple-400',
  },
};

interface ResultsProps {
  lang?: Lang;
}

export default function Results({ lang = 'en' }: ResultsProps) {
  const t = getTranslations(lang);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Get engagements based on language
  const engagements = [
    {
      id: 'customerSuccess',
      pill: t.results.engagements.customerSuccess.pill,
      headline: t.results.engagements.customerSuccess.headline,
      mechanism: t.results.engagements.customerSuccess.mechanism,
      scope: t.results.engagements.customerSuccess.scope,
      stack: t.results.engagements.customerSuccess.stack,
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
      mechanism: t.results.engagements.revenue.mechanism,
      scope: t.results.engagements.revenue.scope,
      stack: t.results.engagements.revenue.stack,
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
      mechanism: t.results.engagements.content.mechanism,
      scope: t.results.engagements.content.scope,
      stack: t.results.engagements.content.stack,
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

  // Parse headline into metric-main and metric-sub
  function parseHeadline(headline: string): { main: string; sub: string } {
    // Split on first comma or "faster"/"więcej" to separate metric from description
    const commaIndex = headline.indexOf(',');
    if (commaIndex !== -1) {
      return {
        main: headline.substring(0, commaIndex).trim(),
        sub: headline.substring(commaIndex + 1).trim(),
      };
    }
    return { main: headline, sub: '' };
  }

  return (
    <>
      <section
        id="results"
        ref={sectionRef}
        className="py-12 md:py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-4 mb-6 md:mb-10">
            <div>
              <h2 className="text-center md:text-left text-2xl md:text-4xl font-semibold text-gray-900 leading-snug">
                {t.results.title}
              </h2>
              <p className="mt-2 text-sm md:text-base text-gray-500">
                {t.results.subtitle}
              </p>
            </div>
            <a
              href="#guarantee"
              className="hidden md:inline-flex text-blue-700 text-sm font-medium hover:underline"
            >
              {t.results.guaranteeLink}
            </a>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {engagements.map((engagement) => {
              const styles = cardStyles[engagement.id as keyof typeof cardStyles];
              const { main, sub } = parseHeadline(engagement.headline);

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
                    flex flex-col
                    p-5 md:p-6
                    rounded-2xl border ${styles.border} ${styles.bg}
                    shadow-sm hover:shadow-md
                    transition-all duration-200 ease-out
                    hover:-translate-y-0.5
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
                    cursor-pointer
                  `}
                >
                  {/* Tag/Pill */}
                  <span className={`
                    inline-flex items-center gap-1.5 self-start
                    px-2.5 py-1 rounded-full
                    text-[11px] uppercase tracking-wider
                    ${styles.tagBg} text-gray-600
                    mb-4
                  `}>
                    <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                    {engagement.pill}
                  </span>

                  {/* Metric */}
                  <div className="mb-4">
                    <div className="text-xl md:text-[22px] font-bold text-gray-900 leading-tight">
                      {main}
                    </div>
                    {sub && (
                      <div className="text-[15px] text-gray-600 mt-1">
                        {sub}
                      </div>
                    )}
                  </div>

                  {/* Lead/Mechanism */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    {engagement.mechanism}
                  </p>

                  {/* Details blocks - vertical stack */}
                  <dl className="space-y-3 mb-5">
                    <div>
                      <dt className="text-[11px] uppercase tracking-wider text-gray-500 mb-0.5">
                        {t.results.scope}
                      </dt>
                      <dd className="text-sm text-gray-900 leading-snug">
                        {engagement.scope}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-[11px] uppercase tracking-wider text-gray-500 mb-0.5">
                        {t.results.stack}
                      </dt>
                      <dd className="text-sm text-gray-900 leading-snug">
                        {engagement.stack}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-[11px] uppercase tracking-wider text-gray-500 mb-0.5">
                        {t.results.timeToValue}
                      </dt>
                      <dd className="text-sm font-semibold text-blue-700">
                        {engagement.timeToValue}
                      </dd>
                    </div>
                  </dl>

                  {/* CTA - pushed to bottom */}
                  <div className="mt-auto pt-4 border-t border-gray-200/60">
                    <span className="inline-flex items-center text-blue-700 text-sm font-medium hover:underline">
                      {t.results.viewSample}
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Methodology disclaimer */}
          <p className="mt-8 text-center text-xs md:text-sm text-gray-400 leading-relaxed max-w-3xl mx-auto">
            {t.results.disclaimer}
          </p>

          {/* 90-day ROI guarantee */}
          <div
            id="guarantee"
            className="mt-8 md:mt-10 rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 via-blue-50/50 to-transparent p-5 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              {/* Left: Key points */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                  {t.results.guarantee.title}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-sm md:text-[15px] text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t.results.guarantee.item1}
                  </li>
                  <li className="flex items-start text-sm md:text-[15px] text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t.results.guarantee.item2}
                  </li>
                  <li className="flex items-start text-sm md:text-[15px] text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t.results.guarantee.item3}
                  </li>
                </ul>
              </div>

              {/* Right: Description + CTA */}
              <div className="flex flex-col justify-between">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-5">
                  {t.results.guarantee.description}
                </p>
                <a
                  href="#contact"
                  className="w-full md:w-auto inline-flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  {t.results.guarantee.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              const { main, sub } = parseHeadline(engagement.headline);

              return (
                <>
                  <div className="inline-block px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600 uppercase tracking-wide mb-4">
                    {t.results.modal.illustrative}
                  </div>

                  <span className={`
                    inline-flex items-center gap-1.5
                    px-2.5 py-1 rounded-full
                    text-[11px] uppercase tracking-wider
                    ${styles.tagBg} text-gray-600
                    mb-3
                  `}>
                    <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                    {engagement.pill}
                  </span>

                  <h3 id="modal-title" className="text-xl md:text-2xl font-bold text-gray-900 mb-1 leading-tight">
                    {main}
                  </h3>
                  {sub && (
                    <p className="text-base text-gray-600 mb-6">{sub}</p>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">
                        {t.results.modal.problem}
                      </h4>
                      <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                        {engagement.modal.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-gray-500 mb-3">
                        {t.results.modal.solution}
                      </h4>
                      <ul className="space-y-2.5">
                        {engagement.modal.solution.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm md:text-base text-gray-800 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">
                        {t.results.modal.resultTarget}
                      </h4>
                      <p className="text-base md:text-lg text-gray-900 font-semibold">
                        {engagement.modal.resultTarget}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-1">
                          {t.results.stack}
                        </div>
                        <div className="text-sm text-gray-800">
                          {engagement.modal.stack}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-1">
                          {t.results.timeToValue}
                        </div>
                        <div className="text-sm font-semibold text-blue-700">
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
