"use client";

import { useState, useRef, FormEvent } from "react";
import CalendlyButton from "@/components/CalendlyButton";

export default function ContactSection() {
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
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Work With Us</h2>
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT: Why contact us */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Have Questions?
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Not ready for a call yet? Send us a message and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>contact@nexoperandi.cloud</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Response time: &lt; 24 hours</span>
              </div>
            </div>

            {/* Prefer to talk? box */}
            <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-100">
              <p className="font-semibold text-gray-900 mb-3">Prefer to talk?</p>
              <CalendlyButton
                buttonText="Book a 20-min diagnostic call →"
                variant="link"
                utmSource="contact_section"
                className="text-blue-700 hover:text-blue-800 text-base font-semibold"
              />
              <p className="text-sm text-gray-600 mt-3">
                Free consultation • No commitment • See exactly how we can help
              </p>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                What is your name? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="What is your name?"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                What is your email? <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="What is your email?"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              What is your company website?
            </label>
            <input
              type="url"
              id="website"
              name="What is your company website?"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="e.g. https://nexoperandi.com"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              What can we help you with? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="What can we help you with?"
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-vertical"
              placeholder="Tell us about your project, goals, or how we can help you..."
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white font-semibold py-4 px-8 rounded-md hover:bg-blue-700 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>

          {showSuccess && (
            <div className="mt-4 text-center text-green-600">
              <p className="font-medium">Thank you! We'll be in touch soon.</p>
            </div>
          )}

          {showError && (
            <div className="mt-4 text-center text-red-600">
              <p className="font-medium">
                Something went wrong. Please try again.
              </p>
            </div>
          )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
