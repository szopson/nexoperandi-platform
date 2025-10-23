import Link from "next/link";

const agents = [
  {
    id: "customer-service",
    name: "AI Customer Service Agent",
    description: "24/7 autonomous support with 70-90% inquiry resolution",
    roi: "$3.50 return per $1 invested",
    features: [
      "Multi-language support (50+ languages)",
      "Sentiment analysis & escalation",
      "Omnichannel deployment",
      "Smart handoff to humans",
    ],
    status: "coming-soon", // Will be "live" once workflow is integrated
  },
  {
    id: "lead-generation",
    name: "B2B Lead Generation Agent",
    description: "7x improvement in conversion rates with hyper-personalization",
    roi: "40-60% lead quality improvement",
    features: [
      "175M+ B2B contacts database",
      "3,000+ buying signals tracked",
      "Predictive lead scoring",
      "Multi-channel outreach",
    ],
    status: "coming-soon",
  },
  {
    id: "meeting-scheduler",
    name: "Meeting Scheduler Agent",
    description: "Saves 11+ hours per week per sales rep",
    roi: "30-40% rep productivity increase",
    features: [
      "Intelligent scheduling",
      "Automated follow-ups",
      "Meeting preparation",
      "Post-meeting summaries",
    ],
    status: "coming-soon",
  },
  {
    id: "document-generator",
    name: "Document Generator Agent",
    description: "80% reduction in proposal creation time",
    roi: "15-25% win rate improvement",
    features: [
      "Template intelligence",
      "Dynamic pricing automation",
      "Compliance checking",
      "Multi-format export",
    ],
    status: "coming-soon",
  },
  {
    id: "visitor-intelligence",
    name: "Visitor Intelligence Agent",
    description: "3-5x more visitors to qualified leads",
    roi: "40-60% engagement rate increase",
    features: [
      "Visitor identification",
      "Behavioral analytics",
      "Triggered engagement",
      "Intent prediction",
    ],
    status: "coming-soon",
  },
];

export default function DemosPage() {
  return (
    <div className="py-16">
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Live AI Agent Demos</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience our AI automation agents in action. Each demo uses real workflows
          powered by n8n and advanced AI models.
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
                  {agent.status === "live" ? "Live Demo" : "Coming Soon"}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-2">{agent.name}</h3>
              <p className="text-gray-600 mb-4">{agent.description}</p>

              <div className="bg-blue-50 rounded-md p-3 mb-4">
                <p className="text-sm font-semibold text-blue-900">ROI: {agent.roi}</p>
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
                  href={`/demos/${agent.id}`}
                  className="block w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
                >
                  Try Demo
                </Link>
              ) : (
                <button
                  disabled
                  className="block w-full text-center bg-gray-200 text-gray-500 font-semibold py-3 rounded-md cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 mt-16">
        <div className="bg-black text-white rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Deploy These Agents?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Get started with a free consultation and ROI analysis.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-white text-black font-semibold py-4 px-8 rounded-md hover:bg-gray-100 transition"
          >
            Schedule Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
