'use client';

import { useState } from 'react';

const caseStudies = [
  {
    id: 'support-automation',
    segment: 'Mid-market SaaS',
    location: 'EU',
    size: '120 FTE',
    kpiHeadline: '-60% support cost, +40% faster response',
    quote: 'They shipped a production agent in 6 weeks. Tickets are triaged automatically and our team focuses on edge cases.',
    scope: 'L1/L2 triage',
    stack: 'Slack, Jira, Notion',
    timeToValue: '6 weeks',
    attribution: {
      name: 'Sarah Chen',
      title: 'CEO',
    },
    details: {
      problem: 'Support team overwhelmed with repetitive L1 tickets, 48h average response time',
      solution: [
        'AI agent integrated with Slack and Jira for automatic ticket triage',
        'Knowledge base search and automated responses for common issues',
        'Human escalation for complex cases with full context',
      ],
      results: [
        '60% reduction in support costs',
        '40% faster response times (48h → 29h average)',
        'Team satisfaction increased as they focus on meaningful work',
      ],
      methodology: 'Metrics calculated from Jira export; period: Q2 2024 vs Q1 2024',
    },
  },
  {
    id: 'mvp-launch',
    segment: 'Series A • Fintech',
    location: 'US',
    size: '45 FTE',
    kpiHeadline: 'Profitable MVP in 6 weeks',
    quote: 'We validated our core hypothesis and launched to first customers in under 2 months. The agent handles 70% of onboarding flows.',
    scope: 'Customer onboarding automation',
    stack: 'Stripe, Plaid, Internal API',
    timeToValue: '6 weeks',
    attribution: {
      name: 'Marcus Rodriguez',
      title: 'Founder',
    },
    details: {
      problem: 'Needed to validate fintech product idea quickly without building full platform',
      solution: [
        'MVP agent built with core financial integrations (Stripe, Plaid)',
        'Automated onboarding flow with KYC/AML checks',
        'Real-time monitoring dashboard for founder oversight',
      ],
      results: [
        'Launched to 50 beta customers in 6 weeks',
        '70% of onboarding automated end-to-end',
        'Reached profitability within 3 months',
      ],
      methodology: 'Customer metrics from internal analytics; verified by founder',
    },
  },
  {
    id: 'demo-conversion',
    segment: 'B2B Services',
    location: 'Global',
    size: '200+ FTE',
    kpiHeadline: '3x increase in demo requests',
    quote: 'The video assets and ROI calculator are game-changers. Our sales team sends them to every prospect.',
    scope: 'Sales enablement assets',
    stack: 'HubSpot, Custom ROI tool',
    timeToValue: '4 weeks',
    attribution: {
      name: 'Alex Kim',
      title: 'VP Sales',
    },
    details: {
      problem: 'Sales team lacked compelling materials to demonstrate value to technical buyers',
      solution: [
        'Short demo videos showing agents in action (60-90 sec each)',
        'One-pagers for each use case with technical details',
        'Interactive ROI calculator customized to prospect industry',
      ],
      results: [
        '3x increase in demo-to-close conversion rate',
        'Sales cycle shortened by 25%',
        'Higher quality leads from self-qualification',
      ],
      methodology: 'HubSpot pipeline data; period: 6 months post-launch vs prior 6 months',
    },
  },
];

export default function Results() {
  const [activeCase, setActiveCase] = useState<string | null>(null);

  return (
    <>
      <section id="results" className="py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">Proof</h2>
            <p className="text-gray-600 text-sm">
              Across SaaS · Fintech · B2B Services
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition"
              >
                {/* Header */}
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center font-semibold text-gray-700">
                    {study.attribution.name.charAt(0)}
                  </div>
                  <div>
                    {study.segment} • {study.location}
                  </div>
                </div>

                {/* KPI Headline */}
                <h4 className="mt-4 text-xl font-semibold text-gray-900">
                  {study.kpiHeadline}
                </h4>

                {/* Quote */}
                <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                  &ldquo;{study.quote}&rdquo;
                </p>

                {/* Scope */}
                <div className="mt-4 text-xs text-gray-500 space-y-1">
                  <div>
                    <span className="font-medium">Scope:</span> {study.scope}
                  </div>
                  <div>
                    <span className="font-medium">Stack:</span> {study.stack}
                  </div>
                  <div>
                    <span className="font-medium">Time to value:</span>{' '}
                    {study.timeToValue}
                  </div>
                </div>

                {/* Details Button */}
                <button
                  onClick={() => setActiveCase(study.id)}
                  className="mt-4 text-blue-700 text-sm font-medium hover:text-blue-800"
                >
                  View details →
                </button>

                {/* Attribution */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">{study.attribution.name}</span>,{' '}
                  {study.attribution.title}
                </div>
              </div>
            ))}
          </div>

          {/* Trust note */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Full references available under NDA
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeCase && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveCase(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCase(null)}
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
              const study = caseStudies.find((s) => s.id === activeCase);
              if (!study) return null;

              return (
                <>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                    <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center font-semibold text-gray-700 text-lg">
                      {study.attribution.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {study.attribution.name}, {study.attribution.title}
                      </div>
                      <div>
                        {study.segment} • {study.location} • {study.size}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-6">
                    {study.kpiHeadline}
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Problem
                      </h4>
                      <p className="text-gray-700">{study.details.problem}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Solution
                      </h4>
                      <ul className="space-y-2">
                        {study.details.solution.map((item, idx) => (
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
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Results
                      </h4>
                      <ul className="space-y-2">
                        {study.details.results.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700 font-medium">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Methodology:</span>{' '}
                        {study.details.methodology}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <a
                      href="#contact"
                      onClick={() => setActiveCase(null)}
                      className="flex-1 bg-blue-600 text-white text-center font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Get similar results
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
