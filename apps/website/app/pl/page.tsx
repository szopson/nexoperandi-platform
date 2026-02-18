import dynamic from "next/dynamic";
import HeroNew from "@/components/marketing/sections/HeroNew";

// Lazy load below-fold sections for performance
const Problem = dynamic(() => import("@/components/marketing/sections/Problem"), { ssr: true });
const Solution = dynamic(() => import("@/components/marketing/sections/Solution"), { ssr: true });
const DemoEmbed = dynamic(() => import("@/components/marketing/sections/DemoEmbed"), { ssr: true });
const Founders = dynamic(() => import("@/components/marketing/Founders"), { ssr: true });
const PricingOverview = dynamic(() => import("@/components/marketing/sections/PricingOverview"), { ssr: true });
const FAQ = dynamic(() => import("@/components/marketing/sections/FAQ"), { ssr: true });
const ContactSection = dynamic(() => import("@/components/marketing/ContactSection"), { ssr: true });

export default function PLHomePage() {
  return (
    <>
      <HeroNew lang="pl" />
      <Problem lang="pl" />
      <Solution lang="pl" />
      <DemoEmbed lang="pl" />
      <DemoEmbed lang="pl" demoKey="demo2" />
      <Founders lang="pl" />
      <PricingOverview lang="pl" />
      <FAQ lang="pl" />
      <ContactSection lang="pl" />
    </>
  );
}
