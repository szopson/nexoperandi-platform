'use client';

import { useState } from 'react';

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

export default function Results() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <>
      <section id="proof" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">
                Results we target (and how we prove them)
              </h2>
              <p className="mt-2 text-gray-500">
                Across SaaS · Fintech · B2B services
              </p>
            </div>
            <a
              href="#guarantee"
              className="hidden md:inline-flex text-blue-700 text-sm font-medium hover:text-blue-800"
            >
              90-day ROI guarantee →
            </a>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {engagements.map((engagement) => (
              <div
                key={engagement.id}
                className="rounded-2xl border border-gray-200 p-6 hover:shadow-md transition"
              >
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  {engagement.pill}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {engagement.headline}
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {engagement.mechanism}
                </p>
                <dl className="mt-4 text-sm text-gray-500 space-y-1.5">
                  <div className="flex justify-between">
                    <dt className="font-medium">Scope</dt>
                    <dd className="text-right">{engagement.scope}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Stack</dt>
                    <dd className="text-right">{engagement.stack}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Time to value</dt>
                    <dd className="text-right">{engagement.timeToValue}</dd>
                  </div>
                </dl>
                <button
                  onClick={() => setActiveModal(engagement.id)}
                  className="mt-4 text-blue-700 text-sm font-medium hover:text-blue-800"
                >
                  View sample engagement →
                </button>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-gray-500 leading-relaxed">
            Ranges based on internal benchmarks and pilot results. Actual impact
            depends on data quality, process fit, and adoption. We define metrics
            together and share dashboards during the pilot.
          </p>

          {/* Guarantee */}
          <div
            id="guarantee"
            className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              90-day ROI guarantee
            </h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              If we don't hit the KPI we agree for your pilot (e.g., -25% support
              cost or +15% qualified leads), you don't pay the pilot fee.
            </p>
            <ul className="mt-4 text-sm text-gray-600 list-disc pl-5 space-y-1.5">
              <li>Transparent scope and data access</li>
              <li>Guardrails and rollback plan</li>
              <li>Weekly progress reports</li>
            </ul>
            <a
              href="#contact"
              className="mt-4 inline-block text-blue-700 text-sm font-medium hover:text-blue-800"
            >
              See guarantee terms →
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
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
                  <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 uppercase tracking-wide mb-4">
                    Illustrative example (not client data)
                  </div>

                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    {engagement.pill}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {engagement.headline}
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Problem
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {engagement.modal.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Solution
                      </h4>
                      <ul className="space-y-2">
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
                            <span className="text-gray-700 leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Result target
                      </h4>
                      <p className="text-gray-900 font-medium">
                        {engagement.modal.resultTarget}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm">
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
                        <div className="text-gray-700">
                          {engagement.modal.timeToValue}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href="#contact"
                      onClick={() => setActiveModal(null)}
                      className="block w-full bg-blue-600 text-white text-center font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
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
    </>
  );
}
