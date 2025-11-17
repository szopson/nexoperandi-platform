"use client";

import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";

export default function CTABanner() {
  return (
    <section id="cta" className="bg-black text-white text-center py-24 md:py-32">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready?</h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          We'll build your first AI workflow in 48 hours.
        </p>
        <Link
          href="#contact"
          className="inline-block bg-white text-black font-semibold py-4 px-8 rounded-md hover:bg-gray-100 hover:scale-105 transition-transform shadow-lg"
        >
          Get Started
        </Link>
        <p className="mt-6 text-sm text-gray-400">
          Or{' '}
          <CalendlyButton
            buttonText="book a 20-min diagnostic call"
            variant="link"
            utmSource="cta_banner"
            className="text-gray-300 hover:text-white"
          />
        </p>
      </div>
    </section>
  );
}
