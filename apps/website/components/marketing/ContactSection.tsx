"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import CalendlyButton from "@/components/CalendlyButton";
import { getTranslations, type Lang } from "@/lib/translations";

type PlanKey = 'conversionCore' | 'visibilityEngine' | 'growthEcosystem' | 'custom';
type ServiceKey = 'ai-audit' | 'free-architecture-call' | '';

const packageNames: Record<PlanKey, { en: string; pl: string }> = {
  conversionCore: {
    en: 'The Conversion Core ($197/mo)',
    pl: 'Conversion Core (790 zł/mies.)',
  },
  visibilityEngine: {
    en: 'The Visibility Engine ($597/mo)',
    pl: 'Visibility Engine (2390 zł/mies.)',
  },
  growthEcosystem: {
    en: 'The Growth Ecosystem ($747/mo)',
    pl: 'Growth Ecosystem (2990 zł/mies.)',
  },
  custom: {
    en: 'Custom Solution',
    pl: 'Rozwiązanie Dedykowane',
  },
};

const serviceMessages: Record<ServiceKey, { en: string; pl: string }> = {
  'ai-audit': {
    en: "I'm interested in the AI Automation Audit ($1000).\n\nPlease reach out to schedule the kickoff.",
    pl: "Interesuje mnie Audyt Automatyzacji AI (3690 zł).\n\nProszę o kontakt w celu umówienia spotkania.",
  },
  'free-architecture-call': {
    en: "I'd like to book a free 30-minute architecture call.\n\nHere's what I'd like to discuss:",
    pl: "Chciałbym umówić bezpłatną 30-minutową rozmowę o architekturze.\n\nOto co chciałbym omówić:",
  },
  '': {
    en: '',
    pl: '',
  },
};

interface ContactSectionProps {
  lang?: Lang;
}

export default function ContactSection({ lang = 'en' }: ContactSectionProps) {
  const t = getTranslations(lang);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [prefillMessage, setPrefillMessage] = useState('');
  const [currentService, setCurrentService] = useState<ServiceKey>('');
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Get dynamic title based on service
  const serviceHeadings = t.contact?.serviceHeadings as Record<string, string> | undefined;
  const serviceSubheadings = t.contact?.serviceSubheadings as Record<string, string> | undefined;

  const contactTitle = currentService && serviceHeadings?.[currentService]
    ? serviceHeadings[currentService]
    : t.contact.title;

  const contactSubheading = currentService && serviceSubheadings?.[currentService]
    ? serviceSubheadings[currentService]
    : serviceSubheadings?.default || '';

  // Pre-fill message when plan is selected from pricing or service param is present
  useEffect(() => {
    const handlePlanSelected = (e: CustomEvent<{ plan: PlanKey }>) => {
      const plan = e.detail.plan;
      if (plan && packageNames[plan]) {
        const packageName = packageNames[plan][lang];
        const prefix = lang === 'pl'
          ? `Interesuje mnie pakiet ${packageName}.\n\n`
          : `I'm interested in the ${packageName} package.\n\n`;
        setPrefillMessage(prefix);
        setCurrentService('');

        // Focus on message field after a short delay
        setTimeout(() => {
          messageRef.current?.focus();
        }, 100);
      }
    };

    // Check URL params on mount
    const params = new URLSearchParams(window.location.search);

    // Check for service param first (audit or free call)
    const service = params.get('service') as ServiceKey | null;
    if (service && serviceMessages[service]) {
      const message = serviceMessages[service][lang];
      setPrefillMessage(message);
      setCurrentService(service);

      // Clear the param after reading
      const url = new URL(window.location.href);
      url.searchParams.delete('service');
      window.history.replaceState({}, '', url);

      // Focus on message field after a short delay
      setTimeout(() => {
        messageRef.current?.focus();
      }, 100);
    } else {
      // Check for plan param (from pricing cards)
      const plan = params.get('plan') as PlanKey | null;
      if (plan && packageNames[plan]) {
        const packageName = packageNames[plan][lang];
        const prefix = lang === 'pl'
          ? `Interesuje mnie pakiet ${packageName}.\n\n`
          : `I'm interested in the ${packageName} package.\n\n`;
        setPrefillMessage(prefix);

        // Clear the param after reading
        const url = new URL(window.location.href);
        url.searchParams.delete('plan');
        window.history.replaceState({}, '', url);
      }
    }

    // Listen for plan selection events
    window.addEventListener('planSelected', handlePlanSelected as EventListener);
    return () => {
      window.removeEventListener('planSelected', handlePlanSelected as EventListener);
    };
  }, [lang]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("What is your name?"),
        email: formData.get("What is your email?"),
        website: formData.get("What is your company website?"),
        message: formData.get("What can we help you with?"),
      };

      // Call our API route instead of directly calling the webhook
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Form submission failed");
      }

      setShowSuccess(true);

      // Reset form using ref
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-[#020617] border-t pt-24 pb-24 relative border-slate-900">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="p-6 md:p-8 lg:p-12 bg-gradient-to-b max-w-6xl border rounded-2xl mx-auto from-slate-900 to-slate-950 border-slate-800">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              {contactTitle}
            </h2>
            {contactSubheading && (
              <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                {contactSubheading}
              </p>
            )}
          </div>

          {/* 2-column layout */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-20 items-start text-left">
            {/* LEFT: Info column */}
            <div className="space-y-6 md:space-y-10 lg:pt-4">
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  {t.contact.haveQuestions}
                </h3>
                <p className="leading-relaxed max-w-md text-slate-400 text-base md:text-lg font-light">
                  {t.contact.notReady}
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded bg-blue-500/10 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <span className="text-base text-slate-300">{t.contact.email}</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded bg-blue-500/10 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <span className="text-base text-slate-300">{t.contact.responseTime}</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="border rounded-2xl p-6 md:p-10 backdrop-blur-sm shadow-xl bg-slate-900/40 border-slate-800 shadow-black/20">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-200">
                      {t.contact.form.name} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="What is your name?"
                      required
                      className="w-full border rounded-lg px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-slate-950 border-slate-800 text-slate-200"
                      placeholder={t.contact.form.namePlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                      {t.contact.form.email} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="What is your email?"
                      required
                      className="w-full border rounded-lg px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-slate-950 border-slate-800 text-slate-200"
                      placeholder={t.contact.form.emailPlaceholder}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="website" className="block text-sm font-medium text-slate-200">
                    {t.contact.form.website}
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="What is your company website?"
                    className="w-full border rounded-lg px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-slate-950 border-slate-800 text-slate-200"
                    placeholder={t.contact.form.websitePlaceholder}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-200">
                    {t.contact.form.message} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    ref={messageRef}
                    id="message"
                    name="What can we help you with?"
                    required
                    rows={4}
                    defaultValue={prefillMessage}
                    key={prefillMessage}
                    className="w-full border rounded-lg px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-slate-950 border-slate-800 text-slate-200 resize-none"
                    placeholder={t.contact.form.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t.contact.form.submitting : t.contact.form.submit}
                </button>

                {showSuccess && (
                  <div className="text-center text-emerald-400">
                    <p className="font-medium">{t.contact.form.success}</p>
                  </div>
                )}

                {showError && (
                  <div className="text-center text-red-400">
                    <p className="font-medium">{t.contact.form.error}</p>
                  </div>
                )}

                {/* Alternative CTA */}
                <div className="pt-2 text-center">
                  <p className="text-sm text-slate-400">{t.contact.preferToTalk}</p>
                  <CalendlyButton
                    buttonText={t.contact.bookCall}
                    variant="link"
                    utmSource="contact_section"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors mt-1"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
