'use client';

import { useState, useEffect, useRef } from 'react';

// Intent tint colors for each engagement type
const intentColors = {
  support: {
    border: 'border-blue-100',
    topRule: 'bg-blue-100',
    dot: 'bg-blue-100',
    hoverBorder: 'hover:border-blue-200',
  },
  onboarding: {
    border: 'border-emerald-100',
    topRule: 'bg-emerald-100',
    dot: 'bg-emerald-100',
    hoverBorder: 'hover:border-emerald-200',
  },
  revenue: {
    border: 'border-amber-100',
    topRule: 'bg-amber-100',
    dot: 'bg-amber-100',
    hoverBorder: 'hover:border-amber-200',
  },
};

const engagements = [
  {
    id: 'support',
    pill: 'Support • Global',
    headline: '-30–60% support cost, 20–40% faster response',
    mechanism: 'L1 triage, auto-resolution, smarter escalations.',
    scope: 'L1/L2 triage',
    stack: 'Slack, Jira, KB',
    timeToValue: '4–6 weeks',
    modal: {
      problem: 'Support team overwhelmed with repetitive L1 tickets, slow response times, high operational costs',
      solution: [
        'Agent monitors Slack/Jira, automatically triages and tags tickets by urgency and category',
        'Auto-resolves common issues using KB; escalates complex cases with full context',
        'Human-in-the-loop checkpoints for quality assurance and continuous learning',
      ],
      resultTarget: '-30–60% support cost, 20–40% faster response',
      stack: 'Slack, Jira, Notion/Confluence KB',
      timeToValue: '4–6 weeks',
    },
  },
  {
    id: 'onboarding',
    pill: 'Onboarding • US/EU',
    headline: 'Profitable MVP in 4–6 weeks',
    mechanism: 'Agent handles 60–80% of onboarding interactions.',
    scope: 'Onboarding assistant',
    stack: 'Stripe, Plaid, Internal API',
    timeToValue: '4–6 weeks',
    modal: {
      problem: 'Manual onboarding process bottleneck preventing scale, inconsistent user experience, high support burden',
      solution: [
        'Agent guides users through KYC/AML, payment setup, and initial configuration',
        'Integrates with Stripe for billing, Plaid for bank verification, internal APIs for provisioning',
        'Human review for edge cases and compliance checks',
      ],
      resultTarget: '60–80% of onboarding fully automated, 4–6 week time to profitable MVP',
      stack: 'Stripe, Plaid, Internal APIs, Email/SMS',
      timeToValue: '4–6 weeks',
    },
  },
  {
    id: 'revenue',
    pill: 'Revenue • Global',
    headline: '+15–30% qualified pipeline',
    mechanism: 'Enrichment, routing, and follow-up automation.',
    scope: 'Lead qualification',
    stack: 'HubSpot/SFDC, Clearbit, Email',
    timeToValue: '3–5 weeks',
    modal: {
      problem: 'Sales team wasting time on unqualified leads, inconsistent follow-up, manual data enrichment',
      solution: [
        'Agent enriches incoming leads with firmographic data (size, industry, tech stack)',
        'Scores and routes qualified leads to appropriate sales rep based on territory and expertise',
        'Automated follow-up sequences with personalization; human takeover at engagement threshold',
      ],
      resultTarget: '+15–30% increase in qualified pipeline, 25%+ reduction in lead response time',
      stack: 'HubSpot/Salesforce, Clearbit/ZoomInfo, Email automation',
      timeToValue: '3–5 weeks',
    },
  },
];

// Extract numbers from headline for count-up animation
function extractNumbers(headline: string): Array<{ original: string; value: number; suffix: string }> {
  const matches = Array.from(headline.matchAll(/([+-]?\d+)([–-]\d+)?(%|x)?/g));
  const results: Array<{ original: string; value: number; suffix: string }> = [];

  for (const match of matches) {
    const value = parseInt(match[1]);
    const suffix = match[3] || '';
    results.push({ original: match[0], value, suffix });
  }

  return results;
}

// Bold numeric ranges in headline
function BoldedHeadline({ text }: { text: string }) {
  // Split by numeric patterns including negative/positive signs and ranges
  const parts = text.split(/([+-]?\d+[–-]\d+%?|[+-]?\d+%?)/);

  return (
    <>
      {parts.map((part, idx) => {
        const isNumeric = /^[+-]?\d/.test(part);
        return isNumeric ? (
          <span key={idx} className="font-bold">{part}</span>
        ) : (
          <span key={idx}>{part}</span>
        );
      })}
    </>
  );
}

export default function Results() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [stackExpanded, setStackExpanded] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection observer for optional animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

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
      <section
        id="proof"
        ref={sectionRef}
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">
                Results we target (and how we prove them)
              </h2>
              <p className="mt-2 text-[15px] md:text-base text-gray-500">
                Across SaaS · Fintech · B2B services
              </p>
            </div>
            <a
              href="#guarantee"
              className="hidden md:inline-flex text-blue-700 text-sm font-medium underline-animate"
            >
              90-day ROI guarantee →
            </a>
          </div>

          {/* Outcome tiles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engagements.map((engagement) => {
              const colors = intentColors[engagement.id as keyof typeof intentColors];

              return (
                <div
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
                  aria-label={`View ${engagement.pill} sample engagement`}
                  className={`
                    relative rounded-2xl border-2 ${colors.border} ${colors.hoverBorder}
                    p-4 md:p-6
                    transition-all duration-200 ease-out
                    hover:-translate-y-0.5 hover:shadow-md
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
                    cursor-pointer
                    motion-reduce:transition-none motion-reduce:hover:transform-none
                  `}
                >
                  {/* Top rule accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${colors.topRule} rounded-t-2xl`} />

                  {/* Pill with dot */}
                  <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-gray-500 uppercase tracking-wider mb-3">
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    {engagement.pill}
                  </div>

                  {/* Headline with bolded numbers */}
                  <h3 className="text-[18px] md:text-[22px] font-semibold text-gray-900 leading-tight mb-3">
                    <BoldedHeadline text={engagement.headline} />
                  </h3>

                  {/* Mechanism */}
                  <p className="text-[15px] md:text-base text-gray-600 leading-relaxed mb-4">
                    {engagement.mechanism}
                  </p>

                  {/* Meta rows */}
                  <dl className="space-y-2 text-sm text-gray-500 border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center">
                      <dt className="font-medium">Scope</dt>
                      <dd className="text-right text-gray-700">{engagement.scope}</dd>
                    </div>

                    {/* Stack - collapsible on mobile */}
                    <div className="md:flex md:justify-between md:items-center">
                      <dt className="font-medium mb-1 md:mb-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setStackExpanded(stackExpanded === engagement.id ? null : engagement.id);
                          }}
                          className="md:cursor-default flex items-center gap-1 md:gap-0"
                          aria-expanded={stackExpanded === engagement.id}
                        >
                          Stack
                          <svg
                            className={`w-4 h-4 md:hidden transition-transform ${
                              stackExpanded === engagement.id ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </dt>
                      <dd className={`
                        text-gray-700 text-right
                        ${stackExpanded === engagement.id ? 'block' : 'hidden md:block'}
                        mt-1 md:mt-0
                      `}>
                        {engagement.stack}
                      </dd>
                    </div>

                    <div className="flex justify-between items-center">
                      <dt className="font-medium">Time to value</dt>
                      <dd className="text-right font-medium text-blue-700">{engagement.timeToValue}</dd>
                    </div>
                  </dl>

                  {/* CTA */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center text-blue-700 text-sm font-medium group-hover:gap-1.5 transition-all underline-animate">
                      View sample engagement
                      <svg
                        className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Methodology disclaimer */}
          <p className="mt-6 text-sm md:text-[15px] text-gray-500 leading-relaxed max-w-4xl">
            Ranges based on internal benchmarks and pilot results. Actual impact
            depends on data quality, process fit, and adoption. We define metrics
            together and share dashboards during the pilot.
          </p>

          {/* 90-day ROI guarantee */}
          <div
            id="guarantee"
            className="mt-8 rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 via-blue-50/50 to-transparent p-6 md:p-8"
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
              90-day ROI guarantee
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              If we don't hit the KPI we agree for your pilot (e.g., -25% support
              cost or +15% qualified leads), you don't pay the pilot fee.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start text-sm md:text-[15px] text-gray-600">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Transparent scope and data access
              </li>
              <li className="flex items-start text-sm md:text-[15px] text-gray-600">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Guardrails and rollback plan
              </li>
              <li className="flex items-start text-sm md:text-[15px] text-gray-600">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Weekly progress reports
              </li>
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center text-blue-700 text-sm font-medium underline-animate"
            >
              See guarantee terms
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
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
            className="bg-white rounded-2xl max-w-2xl w-[90vw] md:w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {(() => {
              const engagement = engagements.find((e) => e.id === activeModal);
              if (!engagement) return null;

              return (
                <>
                  <div className="inline-block px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600 uppercase tracking-wide mb-4">
                    Illustrative example (not client data)
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 uppercase tracking-wider mb-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${intentColors[engagement.id as keyof typeof intentColors].dot}`} />
                    {engagement.pill}
                  </div>

                  <h3 id="modal-title" className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight">
                    <BoldedHeadline text={engagement.headline} />
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Problem
                      </h4>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                        {engagement.modal.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Solution
                      </h4>
                      <ul className="space-y-2.5">
                        {engagement.modal.solution.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm md:text-base text-gray-700 leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Result target
                      </h4>
                      <p className="text-base md:text-lg text-gray-900 font-semibold">
                        {engagement.modal.resultTarget}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500 font-medium mb-1">
                          Stack
                        </div>
                        <div className="text-gray-700">
                          {engagement.modal.stack}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 font-medium mb-1">
                          Time to value
                        </div>
                        <div className="text-blue-700 font-semibold">
                          {engagement.modal.timeToValue}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href="#contact"
                      onClick={() => setActiveModal(null)}
                      className="block w-full bg-blue-600 text-white text-center font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    >
                      Book 20-min Diagnostic
                    </a>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      <style jsx>{`
        .underline-animate {
          position: relative;
          text-decoration: none;
        }

        .underline-animate::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: currentColor;
          transform-origin: right;
          transform: scaleX(1);
          transition: transform 0.2s ease-out;
        }

        .underline-animate:hover::after {
          transform-origin: left;
          transform: scaleX(1.05);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}
