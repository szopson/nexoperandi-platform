import Link from "next/link";
import { getTranslations } from "@/lib/translations";

const t = getTranslations('pl');

const agents = [
  {
    id: "customer-service",
    name: t.demos.agents.customerService.name,
    description: t.demos.agents.customerService.description,
    roi: t.demos.agents.customerService.roi,
    features: t.demos.agents.customerService.features,
    status: "coming-soon",
  },
  {
    id: "lead-generation",
    name: t.demos.agents.leadGeneration.name,
    description: t.demos.agents.leadGeneration.description,
    roi: t.demos.agents.leadGeneration.roi,
    features: t.demos.agents.leadGeneration.features,
    status: "coming-soon",
  },
  {
    id: "meeting-scheduler",
    name: t.demos.agents.meetingScheduler.name,
    description: t.demos.agents.meetingScheduler.description,
    roi: t.demos.agents.meetingScheduler.roi,
    features: t.demos.agents.meetingScheduler.features,
    status: "coming-soon",
  },
  {
    id: "document-generator",
    name: t.demos.agents.documentGenerator.name,
    description: t.demos.agents.documentGenerator.description,
    roi: t.demos.agents.documentGenerator.roi,
    features: t.demos.agents.documentGenerator.features,
    status: "coming-soon",
  },
  {
    id: "visitor-intelligence",
    name: t.demos.agents.visitorIntelligence.name,
    description: t.demos.agents.visitorIntelligence.description,
    roi: t.demos.agents.visitorIntelligence.roi,
    features: t.demos.agents.visitorIntelligence.features,
    status: "coming-soon",
  },
];

export default function PLDemosPage() {
  return (
    <div className="py-16">
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">{t.demos.title}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t.demos.subtitle}
        </p>
      </div>

      {/* Agent Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    agent.status === "live"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {agent.status === "live" ? t.demos.liveDemo : t.demos.comingSoon}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-2">{agent.name}</h3>
              <p className="text-gray-600 mb-4">{agent.description}</p>

              <div className="bg-blue-50 rounded-md p-3 mb-4">
                <p className="text-sm font-semibold text-blue-900">{t.demos.roi}: {agent.roi}</p>
              </div>

              <ul className="space-y-2 mb-6">
                {agent.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {agent.status === "live" ? (
                <Link
                  href={`/pl/demos/${agent.id}`}
                  className="block w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
                >
                  {t.demos.tryDemo}
                </Link>
              ) : (
                <button
                  disabled
                  className="block w-full text-center bg-gray-200 text-gray-500 font-semibold py-3 rounded-md cursor-not-allowed"
                >
                  {t.demos.comingSoon}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 mt-16">
        <div className="bg-black text-white rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">{t.demos.ctaTitle}</h2>
          <p className="text-xl mb-8 text-gray-300">
            {t.demos.ctaSubtitle}
          </p>
          <Link
            href="/pl#contact"
            className="inline-block bg-white text-black font-semibold py-4 px-8 rounded-md hover:bg-gray-100 transition"
          >
            {t.demos.ctaButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
