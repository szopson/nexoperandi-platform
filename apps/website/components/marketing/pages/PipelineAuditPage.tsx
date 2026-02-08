"use client";

import { useState, useRef, type FormEvent } from "react";
import { pagesTranslations } from "@/lib/pages-translations";
import CalendlyButton from "@/components/CalendlyButton";
import type { Lang } from "@/lib/translations";

interface PipelineAuditPageProps {
  lang?: Lang;
}

export default function PipelineAuditPage({
  lang = "en",
}: PipelineAuditPageProps) {
  const t = pagesTranslations[lang].pipelineAudit;
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
        company: formData.get("company"),
        industry: formData.get("industry"),
        leadVolume: formData.get("leadVolume"),
        challenge: formData.get("challenge"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        lang,
      };

      const response = await fetch("/api/pipeline-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Form submission failed");
      }

      setShowSuccess(true);
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Pipeline audit form error:", error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            {t.benefits.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.benefits.items.map((item, i) => (
              <div
                key={i}
                className="bg-gray-900/50 border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-400 font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            {t.form.title}
          </h2>

          <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-8 md:p-10">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Company + Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-slate-200"
                  >
                    {t.form.fields.company.label}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full border rounded-lg px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-slate-950 border-slate-800 text-slate-200"
                    placeholder={t.form.fields.company.placeholder}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="industry"
                    className="block text-sm font-medium text-slate-200"
                  >
                    {t.form.fields.industry.label}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    required
                    className="w-full border rounded-lg px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-slate-950 border-slate-800 text-slate-200"
                    placeholder={t.form.fields.industry.placeholder}
                  />
                </div>
              </div>

              {/* Lead Volume */}
              <div className="space-y-2">
                <label
                  htmlFor="leadVolume"
                  className="block text-sm font-medium text-slate-200"
                >
                  {t.form.fields.leadVolume.label}
                </label>
                <input
                  type="text"
                  id="leadVolume"
                  name="leadVolume"
                  className="w-full border rounded-lg px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-slate-950 border-slate-800 text-slate-200"
                  placeholder={t.form.fields.leadVolume.placeholder}
                />
              </div>

              {/* Challenge */}
              <div className="space-y-2">
                <label
                  htmlFor="challenge"
                  className="block text-sm font-medium text-slate-200"
                >
                  {t.form.fields.challenge.label}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="challenge"
                  name="challenge"
                  required
                  rows={3}
                  className="w-full border rounded-lg px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-slate-950 border-slate-800 text-slate-200 resize-none"
                  placeholder={t.form.fields.challenge.placeholder}
                />
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-200"
                  >
                    {t.form.fields.name.label}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full border rounded-lg px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-slate-950 border-slate-800 text-slate-200"
                    placeholder={t.form.fields.name.placeholder}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-200"
                  >
                    {t.form.fields.email.label}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full border rounded-lg px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-slate-950 border-slate-800 text-slate-200"
                    placeholder={t.form.fields.email.placeholder}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-200"
                >
                  {t.form.fields.phone.label}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full border rounded-lg px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-slate-950 border-slate-800 text-slate-200"
                  placeholder={t.form.fields.phone.placeholder}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t.form.submitting : t.form.submit}
              </button>

              {showSuccess && (
                <div className="text-center text-emerald-400">
                  <p className="font-medium">{t.form.success}</p>
                </div>
              )}

              {showError && (
                <div className="text-center text-red-400">
                  <p className="font-medium">{t.form.error}</p>
                </div>
              )}

              {/* Alternative CTA */}
              <div className="pt-2 text-center">
                <p className="text-sm text-slate-400">{t.social.title}</p>
                <CalendlyButton
                  buttonText={t.social.calendly}
                  variant="link"
                  utmSource="pipeline_audit"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors mt-1"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
