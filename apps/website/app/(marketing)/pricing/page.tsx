import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { generatePageMetadata } from "@/lib/metadata";
import { buildOfferCatalogSchema } from "@/lib/jsonld";
import PricingPage from "@/components/marketing/pages/PricingPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Pricing",
  description: "Transparent pricing for AI pipeline automation. Setup + monthly. No hidden fees. Cancel anytime.",
  path: "/pricing",
  lang: "en",
  keywords: ["AI pricing", "automation pricing", "sales automation cost", "pipeline automation pricing"],
});

const offerCatalog = buildOfferCatalogSchema("/pricing", [
  { name: "Starter — AI Automation", price: "375", priceCurrency: "EUR", description: "Setup. AI chatbot 24/7, CRM connection, basic dashboard. From €150/mo." },
  { name: "Pro — AI Sales System", price: "750", priceCurrency: "EUR", description: "Setup. Voice AI, automatic proposals, weekly reports, priority support. From €250/mo." },
  { name: "Enterprise — Custom AI Build", price: "0", priceCurrency: "EUR", description: "Custom solutions for complex needs. Contact for quote." },
]);

export default function PricingRoute() {
  return (
    <>
      <JsonLd id="pricing-jsonld" data={offerCatalog} />
      <PricingPage lang="en" />
    </>
  );
}
