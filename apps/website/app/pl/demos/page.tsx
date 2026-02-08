import Link from "next/link";
import { getTranslations } from "@/lib/translations";

const videoDeoms = [
  {
    id: "lead-to-proposal",
    youtubeId: "vHOyG3RncXk",
    translationKey: "leadToProposal" as const,
  },
];

const agents = [
  {
    id: "customer-service",
    translationKey: "customerService" as const,
    status: "coming-soon",
  },
  {
    id: "lead-generation",
    translationKey: "leadGeneration" as const,
    status: "coming-soon",
  },
  {
    id: "meeting-scheduler",
    translationKey: "meetingScheduler" as const,
    status: "coming-soon",
  },
  {
    id: "document-generator",
    translationKey: "documentGenerator" as const,
    status: "coming-soon",
  },
  {
    id: "visitor-intelligence",
    translationKey: "visitorIntelligence" as const,
    status: "coming-soon",
  },
];

export default function PLDemosPage() {
  const t = getTranslations("pl");

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {t.demos.title}
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto">
          {t.demos.subtitle}
        </p>
      </div>

      {/* Video Demos Section */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t.demos.videoDemos.title}
          </h2>
          <p className="text-slate-400">
            {t.demos.videoDemos.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videoDeoms.map((video) => {
            const videoT = t.demos.videos[video.translationKey];
            return (
              <div
                key={video.id}
                className="bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all"
              >
                {/* YouTube Embed */}
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={videoT.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                      {t.demos.liveDemo}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {videoT.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {videoT.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="border-t border-white/10" />
      </div>

      {/* Agent Demos Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Interaktywne demo agentów
          </h2>
          <p className="text-slate-400">
            Wypróbuj naszych agentów AI bezpośrednio w przeglądarce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => {
            const agentT = t.demos.agents[agent.translationKey];
            return (
              <div
                key={agent.id}
                className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all"
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      agent.status === "live"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {agent.status === "live" ? t.demos.liveDemo : t.demos.comingSoon}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{agentT.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{agentT.description}</p>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-blue-400">
                    {t.demos.roi}: {agentT.roi}
                  </p>
                </div>

                <ul className="space-y-2 mb-6">
                  {agentT.features.map((feature, index) => (
                    <li key={index} className="text-sm text-slate-300 flex items-start">
                      <span className="text-blue-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {agent.status === "live" ? (
                  <Link
                    href={`/pl/demos/${agent.id}`}
                    className="block w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transition"
                  >
                    {t.demos.tryDemo}
                  </Link>
                ) : (
                  <button
                    disabled
                    className="block w-full text-center bg-white/5 text-slate-500 font-semibold py-3 rounded-lg border border-white/10 cursor-not-allowed"
                  >
                    {t.demos.comingSoon}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 rounded-2xl p-12 text-center backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.demos.ctaTitle}
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            {t.demos.ctaSubtitle}
          </p>
          <Link
            href="/pl#contact"
            className="inline-block bg-white text-gray-900 font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition"
          >
            {t.demos.ctaButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
