'use client';

import { useState, useEffect, useRef } from 'react';
import CalendlyButton from '@/components/CalendlyButton';

interface ModalContent {
  title: string;
  bullets: string[];
  cta: string;
}

const cards = [
  {
    step: '1/3',
    title: 'Launch in Weeks',
    kpi: '≤6',
    kpiUnit: 'weeks',
    kpiLabel: 'to first deployment',
    description: 'Prototype → integrate → pilot with KPIs.',
    ctaText: 'See a 60-sec MVP demo',
    modal: {
      title: 'Launch in Weeks',
      bullets: [
        'Align on KPI and guardrails in Week 1',
        'Prototype agents with your tools in Week 2–3',
        'Pilot in Week 4–6, measured by business outcomes',
      ],
      cta: 'See a 60-sec MVP demo',
    },
  },
  {
    step: '2/3',
    title: 'Assets That Convert',
    kpi: '2–4x',
    kpiUnit: 'lift',
    kpiLabel: 'in demo requests',
    description: 'Short videos, one-pagers, ROI calculators.',
    ctaText: 'View sample assets',
    modal: {
      title: 'Assets That Convert',
      bullets: [
        'Short videos that show agents working',
        'One-pagers your sales team can send',
        'Clear ROI calculators for your buyers',
      ],
      cta: 'View sample assets',
    },
  },
  {
    step: '3/3',
    title: 'Scale With Less',
    kpi: '-40–60%',
    kpiUnit: 'cost',
    kpiLabel: 'support cost reduction',
    description: 'Agents triage, resolve, escalate with context.',
    ctaText: 'See support automation',
    modal: {
      title: 'Scale With Less',
      bullets: [
        'Agents triage, resolve, and escalate with context',
        'Human-in-the-loop by default',
        'Monitored, red-teamed, continuously improved',
      ],
      cta: 'See support automation',
    },
  },
];

export default function Journey() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [countersVisible, setCountersVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="journey"
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
              <button
                key={idx}
                onClick={() => setActiveModal(idx)}
                className="group block p-6 rounded-2xl border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-left w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {card.title}
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Step {card.step}
                  </span>
                </div>

                <div className="mt-2">
                  <p className="text-3xl font-bold text-gray-900">
                    {countersVisible && (
                      <span className="inline-block">
                        {card.kpi}
                      </span>
                    )}{' '}
                    <span className="text-xl text-gray-600">{card.kpiUnit}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{card.kpiLabel}</p>
                </div>

                <p className="mt-4 text-gray-600 leading-relaxed">
                  {card.description}
                </p>

                <div className="mt-4 text-blue-700 inline-flex items-center font-medium">
                  {card.ctaText}
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Trusted by:{' '}
              <span className="font-semibold text-gray-700">
                SaaS · Fintech · B2B Services
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeModal !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-8 relative"
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

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {cards[activeModal].modal.title}
            </h3>

            <ul className="space-y-3 mb-8">
              {cards[activeModal].modal.bullets.map((bullet, idx) => (
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
                  <span className="text-gray-700">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Smart routing: demo/See → Calendly, others → form */}
            {cards[activeModal].modal.cta.toLowerCase().includes('demo') ||
             cards[activeModal].modal.cta.toLowerCase().includes('see') ? (
              <div onClick={() => setActiveModal(null)}>
                <CalendlyButton
                  buttonText={cards[activeModal].modal.cta}
                  variant="primary"
                  utmSource={`journey_${cards[activeModal].title.toLowerCase().replace(/\s+/g, '_')}`}
                  className="w-full"
                />
              </div>
            ) : (
              <a
                href="#contact"
                onClick={() => setActiveModal(null)}
                className="block w-full bg-blue-600 text-white text-center font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {cards[activeModal].modal.cta}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
