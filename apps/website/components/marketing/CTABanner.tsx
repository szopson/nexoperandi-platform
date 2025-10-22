import Link from "next/link";

export default function CTABanner() {
  return (
    <section id="cta" className="bg-black text-white text-center py-24 md:py-32">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready?</h2>
        <Link
          href="#contact"
          className="inline-block bg-white text-black font-semibold py-4 px-8 rounded-md hover:bg-gray-100 hover:scale-105 transition-transform"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
