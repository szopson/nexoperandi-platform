import Hero from "@/components/marketing/Hero";
import Architecture from "@/components/marketing/Architecture";
import Results from "@/components/marketing/Results";
import About from "@/components/marketing/About";
import Pricing from "@/components/marketing/Pricing";
import ContactSection from "@/components/marketing/ContactSection";

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
