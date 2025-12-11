"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import { getTranslations, type Lang } from "@/lib/translations";
import QuizStep from "./QuizStep";
import QuizProgress from "./QuizProgress";
import QuizResults, { type QuizAnswers } from "./QuizResults";

type QuestionKey = "challenge" | "currentSolution" | "businessStage" | "urgency";

const QUESTION_ORDER: QuestionKey[] = [
  "challenge",
  "currentSolution",
  "businessStage",
  "urgency",
];

interface QuizModalProps {
  lang?: Lang;
}

export default function QuizModal({ lang = "en" }: QuizModalProps) {
  const { activeModal, closeQuiz } = useModal();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [showResults, setShowResults] = useState(false);

  const t = getTranslations(lang);
  const isOpen = activeModal === "quiz";

  // Reset quiz when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setAnswers({});
      setShowResults(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeQuiz();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeQuiz]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQuestionKey = QUESTION_ORDER[currentStep];
  const currentQuestion = t.quiz.questions[currentQuestionKey];
  const totalSteps = QUESTION_ORDER.length;

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionKey]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = answers[currentQuestionKey] !== undefined;

  // Convert options object to array format for QuizStep
  const optionsArray = Object.entries(currentQuestion.options).map(
    ([key, label]) => ({
      key,
      label,
    })
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 modal-backdrop animate-backdrop-fade-in"
        onClick={closeQuiz}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg modal-container rounded-2xl animate-modal-scale-in">
        {/* Close Button */}
        <button
          onClick={closeQuiz}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          {!showResults ? (
            <>
              {/* Header */}
              <div className="mb-6 pr-8">
                <h2 className="text-lg font-semibold text-cyan-400 mb-1">
                  {t.quiz.title}
                </h2>
                <p className="text-sm text-slate-400">{t.quiz.subtitle}</p>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <QuizProgress
                  currentStep={currentStep + 1}
                  totalSteps={totalSteps}
                  progressText={t.quiz.progress}
                />
              </div>

              {/* Question */}
              <div className="mb-8">
                <QuizStep
                  question={currentQuestion.title}
                  options={optionsArray}
                  selectedValue={answers[currentQuestionKey] ?? null}
                  onSelect={handleSelect}
                />
              </div>

              {/* Navigation */}
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-colors"
                  >
                    {t.quiz.ctas.back}
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`
                    flex-1 px-6 py-3 rounded-lg font-semibold transition-all
                    ${
                      canProceed
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
                        : "bg-white/10 text-slate-500 cursor-not-allowed"
                    }
                  `}
                >
                  {currentStep === totalSteps - 1
                    ? t.quiz.ctas.seeResults
                    : t.quiz.ctas.next}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Results View */}
              <div className="pr-8">
                <QuizResults
                  answers={answers as QuizAnswers}
                  translations={{
                    results: t.quiz.results,
                    emailCapture: t.quiz.emailCapture,
                    ctas: t.quiz.ctas,
                  }}
                  onClose={closeQuiz}
                />
              </div>

              {/* Back to quiz */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={handleBack}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {t.quiz.ctas.back} to questions
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
