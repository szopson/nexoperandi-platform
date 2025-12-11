"use client";

import { useState } from "react";
import CalendlyButton from "@/components/CalendlyButton";

export type RecommendationPackage =
  | "conversionCore"
  | "visibilityEngine"
  | "growthEcosystem"
  | "custom";

export interface QuizAnswers {
  challenge: string;
  currentSolution: string;
  businessStage: string;
  urgency: string;
}

interface ResultTranslations {
  title: string;
  subtitle: string;
  conversionCore: { title: string; description: string };
  visibilityEngine: { title: string; description: string };
  growthEcosystem: { title: string; description: string };
  custom: { title: string; description: string };
}

interface EmailCaptureTranslations {
  title: string;
  subtitle: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  submit: string;
  skip: string;
}

interface CTATranslations {
  bookCall: string;
}

interface QuizResultsProps {
  answers: QuizAnswers;
  translations: {
    results: ResultTranslations;
    emailCapture: EmailCaptureTranslations;
    ctas: CTATranslations;
  };
  onClose: () => void;
}

export function getRecommendation(answers: QuizAnswers): RecommendationPackage {
  const { challenge, businessStage, urgency } = answers;

  // Support/Operations challenges → Conversion Core
  if (challenge === "support" || challenge === "leads") {
    // But if scaling or enterprise, upgrade recommendation
    if (businessStage === "scaling" || businessStage === "enterprise") {
      return businessStage === "enterprise" ? "custom" : "growthEcosystem";
    }
    return "conversionCore";
  }

  // Content challenges → Visibility Engine
  if (challenge === "content") {
    if (businessStage === "enterprise") {
      return "custom";
    }
    if (businessStage === "scaling" || urgency === "asap") {
      return "growthEcosystem";
    }
    return "visibilityEngine";
  }

  // Workflow challenges → Growth Ecosystem or Custom
  if (challenge === "workflows") {
    if (businessStage === "enterprise") {
      return "custom";
    }
    return "growthEcosystem";
  }

  // Enterprise always gets custom recommendation
  if (businessStage === "enterprise") {
    return "custom";
  }

  // Scaling or high urgency → Growth Ecosystem
  if (businessStage === "scaling" || urgency === "asap") {
    return "growthEcosystem";
  }

  return "conversionCore"; // Default fallback
}

const packageIcons: Record<RecommendationPackage, React.ReactNode> = {
  conversionCore: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  visibilityEngine: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  growthEcosystem: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  ),
  custom: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
};

export default function QuizResults({
  answers,
  translations,
  onClose,
}: QuizResultsProps) {
  const [showEmailCapture, setShowEmailCapture] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const recommendation = getRecommendation(answers);
  const packageData = translations.results[recommendation];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          source: "quiz",
          quizAnswers: answers,
          recommendation,
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
      setShowEmailCapture(false);
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    setShowEmailCapture(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Result Header */}
      <div className="text-center space-y-2">
        <p className="text-cyan-400 text-sm font-medium uppercase tracking-wider">
          {translations.results.subtitle}
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          {translations.results.title}
        </h3>
      </div>

      {/* Recommendation Card */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white shrink-0">
            {packageIcons[recommendation]}
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">{packageData.title}</h4>
            <p className="text-slate-300 text-sm mt-1">{packageData.description}</p>
          </div>
        </div>
      </div>

      {/* Email Capture Form */}
      {showEmailCapture && !submitted && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center space-y-1">
            <h4 className="text-lg font-semibold text-white">
              {translations.emailCapture.title}
            </h4>
            <p className="text-sm text-slate-400">
              {translations.emailCapture.subtitle}
            </p>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={translations.emailCapture.namePlaceholder}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={translations.emailCapture.emailPlaceholder}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "..." : translations.emailCapture.submit}
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="py-3 px-6 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors"
            >
              {translations.emailCapture.skip}
            </button>
          </div>
        </form>
      )}

      {/* Success message or CTA */}
      {(submitted || !showEmailCapture) && (
        <div className="space-y-4">
          {submitted && (
            <div className="text-center py-3 px-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
              Check your inbox for your personalized roadmap!
            </div>
          )}

          <div className="text-center">
            <p className="text-slate-400 text-sm mb-4">
              Ready to discuss your automation strategy?
            </p>
            <CalendlyButton
              buttonText={translations.ctas.bookCall}
              variant="primary"
              utmSource={`quiz_${recommendation}`}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
