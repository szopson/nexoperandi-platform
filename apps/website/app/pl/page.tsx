import dynamic from "next/dynamic";
import HeroNew from "@/components/marketing/sections/HeroNew";

// Lazy load below-fold sections for performance
const Problem = dynamic(() => import("@/components/marketing/sections/Problem"), { ssr: true });
const Solution = dynamic(() => import("@/components/marketing/sections/Solution"), { ssr: true });
const DemoEmbed = dynamic(() => import("@/components/marketing/sections/DemoEmbed"), { ssr: true });
const SolutionsCards = dynamic(() => import("@/components/marketing/sections/SolutionsCards"), { ssr: true });
const HowItWorks = dynamic(() => import("@/components/marketing/sections/HowItWorks"), { ssr: true });
const WhyUs = dynamic(() => import("@/components/marketing/sections/WhyUs"), { ssr: true });
const Founders = dynamic(() => import("@/components/marketing/Founders"), { ssr: true });
const Security = dynamic(() => import("@/components/marketing/sections/Security"), { ssr: true });
const PricingOverview = dynamic(() => import("@/components/marketing/sections/PricingOverview"), { ssr: true });
const FAQ = dynamic(() => import("@/components/marketing/sections/FAQ"), { ssr: true });
const FinalCTA = dynamic(() => import("@/components/marketing/sections/FinalCTA"), { ssr: true });
const ContactSection = dynamic(() => import("@/components/marketing/ContactSection"), { ssr: true });

export default function PLHomePage() {
  return (
    <>
      <HeroNew lang="pl" />
      <Problem lang="pl" />
      <Solution lang="pl" />
      <DemoEmbed lang="pl" />
      <SolutionsCards lang="pl" />
      <HowItWorks lang="pl" />
      <WhyUs lang="pl" />
      <Founders lang="pl" />
      <Security lang="pl" />
      <PricingOverview lang="pl" />
      <FAQ lang="pl" />
      <FinalCTA lang="pl" />
      <ContactSection lang="pl" />
    </>
  );
}
