import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import HeroNew from "@/components/marketing/sections/HeroNew";

const plHomeMetadata = generatePageMetadata({
  title: "NexOperandi — Agencja AI: n8n, Voice AI, Automatyzacje",
  description: "Budujemy systemy automatyzacji AI, które kwalifikują leady, umawiają spotkania i zamykają sprzedaż. Wdrożenie w 3–7 dni. Zgodne z RODO.",
  path: "/pl",
  lang: "pl",
  keywords: ["automatyzacja AI", "agencja AI", "n8n", "voice AI", "chatbot", "automatyzacja sprzedaży"],
});

export const metadata: Metadata = {
  ...plHomeMetadata,
  title: { absolute: "NexOperandi — Agencja AI: n8n, Voice AI, Automatyzacje" },
};

// Lazy load below-fold sections for performance
const Problem = dynamic(() => import("@/components/marketing/sections/Problem"), { ssr: true });
const Solution = dynamic(() => import("@/components/marketing/sections/Solution"), { ssr: true });
const WebSection = dynamic(() => import("@/components/marketing/sections/WebSection"), { ssr: true });
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
      <WebSection lang="pl" />
      <DemoEmbed lang="pl" />
      <DemoEmbed lang="pl" demoKey="demo2" />
      <Founders lang="pl" />
      <PricingOverview lang="pl" />
      <FAQ lang="pl" />
      <ContactSection lang="pl" />
    </>
  );
}
