"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import { useExitIntent } from "@/hooks/useExitIntent";
import { getTranslations, type Lang } from "@/lib/translations";

interface ExitIntentPopupProps {
  lang?: Lang;
}

export default function ExitIntentPopup({ lang = "en" }: ExitIntentPopupProps) {
  const { activeModal, openExitIntent, closeExitIntent } = useModal();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const t = getTranslations(lang);
  const isOpen = activeModal === "exitIntent";

  // Use the exit intent hook
  useExitIntent(openExitIntent, {
    delay: 5000, // Wait 5 seconds before enabling
    cooldownHours: 24, // Don't show again for 24 hours
    enabled: activeModal === null, // Only enable when no modal is open
  });

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeExitIntent();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeExitIntent]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "exit-intent",
          leadMagnet: "automation-checklist",
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 modal-backdrop animate-backdrop-fade-in"
        onClick={closeExitIntent}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md modal-container rounded-2xl animate-modal-scale-in overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeExitIntent}
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

        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

        {/* Content */}
        <div className="p-6 md:p-8">
          {!submitted ? (
            <>
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </div>

              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {t.exitIntent.title}
                </h2>
                <p className="text-lg text-cyan-400 font-medium mb-1">
                  {t.exitIntent.subtitle}
                </p>
                <p className="text-sm text-slate-400">
                  {t.exitIntent.description}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.exitIntent.emailPlaceholder}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                />

                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "..." : t.exitIntent.cta}
                </button>
              </form>

              {/* Dismiss */}
              <button
                onClick={closeExitIntent}
                className="w-full mt-4 py-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                {t.exitIntent.dismiss}
              </button>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t.exitIntent.success}
              </h3>
              <p className="text-slate-400 mb-6">
                Your AI Automation Checklist is on its way.
              </p>
              <button
                onClick={closeExitIntent}
                className="px-6 py-2 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-colors"
              >
                {t.quiz.ctas.close}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
