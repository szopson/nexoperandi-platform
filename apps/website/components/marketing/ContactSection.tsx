"use client";

import { useState, useRef, FormEvent } from "react";
import CalendlyButton from "@/components/CalendlyButton";
import { getTranslations, type Lang } from "@/lib/translations";

interface ContactSectionProps {
  lang?: Lang;
}

export default function ContactSection({ lang = 'en' }: ContactSectionProps) {
  const t = getTranslations(lang);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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
    <section id="contact" className="pt-8 pb-10 md:py-32 bg-slate-50 md:bg-white">
      <div className="mx-auto px-4 md:px-6 max-w-[1140px]">
        {/* Header - centered on desktop, left on mobile */}
        <div className="mb-6 md:mb-16">
          <h2 className="text-center text-xl md:text-5xl font-bold text-gray-900">{t.contact.title}</h2>
        </div>

        {/* 2-column layout - aligned to top */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-16 items-start">
          {/* LEFT: Info column - hidden on mobile, shown below form */}
          <div className="hidden lg:block lg:pt-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t.contact.haveQuestions}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              {t.contact.notReady}
            </p>

            {/* Contact info - aligned icons */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="ml-4 text-gray-700">{t.contact.email}</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-4 text-gray-700">{t.contact.responseTime}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="bg-white md:bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm md:shadow-none border border-slate-200 md:border-0">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t.contact.form.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="What is your name?"
                    required
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder={t.contact.form.namePlaceholder}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t.contact.form.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="What is your email?"
                    required
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder={t.contact.form.emailPlaceholder}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t.contact.form.website}
                </label>
                <input
                  type="url"
                  id="website"
                  name="What is your company website?"
                  className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder={t.contact.form.websitePlaceholder}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t.contact.form.message} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="What can we help you with?"
                  required
                  rows={4}
                  className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-vertical"
                  placeholder={t.contact.form.messagePlaceholder}
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  {isSubmitting ? t.contact.form.submitting : t.contact.form.submit}
                </button>
              </div>

              {showSuccess && (
                <div className="text-center text-green-600">
                  <p className="font-medium">{t.contact.form.success}</p>
                </div>
              )}

              {showError && (
                <div className="text-center text-red-600">
                  <p className="font-medium">{t.contact.form.error}</p>
                </div>
              )}

              {/* Alternative CTA */}
              <div className="pt-3 md:pt-4 border-t border-gray-200 text-center">
                <p className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">{t.contact.preferToTalk}</p>
                <CalendlyButton
                  buttonText={t.contact.bookCall}
                  variant="link"
                  utmSource="contact_section"
                  className="text-blue-600 hover:text-blue-700 text-xs md:text-sm font-medium underline"
                />
              </div>
            </form>
          </div>

          {/* Mobile: Info section below form */}
          <div className="lg:hidden mt-6 text-center">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              {t.contact.haveQuestions}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {t.contact.email}
            </p>
            <p className="text-xs text-slate-500">
              {t.contact.responseTime}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
