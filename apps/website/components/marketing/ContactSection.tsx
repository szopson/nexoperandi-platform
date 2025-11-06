"use client";

import { useState, useRef, FormEvent } from "react";

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
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Work With Us</h2>
          <p className="text-xl text-gray-600 mb-8">
            Provide your details below and we'll be in touch!
          </p>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Send us a message</h3>
              <p className="text-gray-600">Fill out the form below</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Call us directly</h3>
              <a
                href="tel:+15551234567"
                className="text-blue-600 hover:text-blue-800 transition text-lg font-medium"
              >
                +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="max-w-2xl mx-auto">
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
                Something went wrong. Please try again or call us directly.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
