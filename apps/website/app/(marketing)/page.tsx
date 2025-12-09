import dynamic from "next/dynamic";
import Hero from "@/components/marketing/Hero";

// Lazy load below-fold sections to improve LCP
// These components are loaded only when needed, reducing initial bundle size
const Architecture = dynamic(() => import("@/components/marketing/Architecture"), {
  ssr: true,
});
const Results = dynamic(() => import("@/components/marketing/Results"), {
  ssr: true,
});
const About = dynamic(() => import("@/components/marketing/About"), {
  ssr: true,
});
const Pricing = dynamic(() => import("@/components/marketing/Pricing"), {
  ssr: true,
});
const ContactSection = dynamic(() => import("@/components/marketing/ContactSection"), {
  ssr: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Architecture />
      <Results />
      <About />
      <Pricing />
      <ContactSection />
    </>
  );
}
