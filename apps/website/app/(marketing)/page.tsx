import Hero from "@/components/marketing/Hero";
import BoldStatement from "@/components/marketing/BoldStatement";
import Journey from "@/components/marketing/Journey";
import Results from "@/components/marketing/Results";
import CTABanner from "@/components/marketing/CTABanner";
import ContactSection from "@/components/marketing/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BoldStatement />
      <Journey />
      <Results />
      <CTABanner />
      <ContactSection />
    </>
  );
}
