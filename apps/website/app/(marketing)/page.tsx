import dynamic from "next/dynamic";
import Hero from "@/components/marketing/Hero";

// Lazy load below-fold sections to improve LCP
// These components are loaded only when needed, reducing initial bundle size
const Founders = dynamic(() => import("@/components/marketing/Founders"), {
  ssr: true,
});
const Pricing = dynamic(() => import("@/components/marketing/Pricing"), {
  ssr: true,
});
const Architecture = dynamic(() => import("@/components/marketing/Architecture"), {
  ssr: true,
});
const Results = dynamic(() => import("@/components/marketing/Results"), {
  ssr: true,
});
const CTABanner = dynamic(() => import("@/components/marketing/CTABanner"), {
  ssr: true,
});
const ContactSection = dynamic(() => import("@/components/marketing/ContactSection"), {
  ssr: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Results />        {/* Proof */}
      <Pricing />        {/* Services */}
      <Architecture />   {/* Process */}
      <Founders />       {/* About Us */}
      <CTABanner />      {/* CTA */}
      <ContactSection /> {/* Contact */}
    </>
  );
}
