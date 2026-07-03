import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { generatePageMetadata } from "@/lib/metadata";
import { buildServiceSchema } from "@/lib/jsonld";
import SolutionsPage from "@/components/marketing/pages/SolutionsPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Rozwiązania automatyzacji AI",
  description: "Systemy AI zaprojektowane pod Twoje procesy: Sales Autopilot, Voice Concierge i Content Engine. Integracja z Twoimi narzędziami.",
  path: "/pl/rozwiazania",
  lang: "pl",
  keywords: ["rozwiązania AI", "automatyzacja sprzedaży", "głosowe AI", "automatyzacja treści", "automatyzacja pipeline"],
});

const serviceSchema = buildServiceSchema({
  name: "Rozwiązania automatyzacji AI",
  description: "Systemy AI: Sales Autopilot, Voice Concierge, Content Engine. Integracja z Twoimi narzędziami.",
  path: "/pl/rozwiazania",
  serviceType: "AI Automation",
});

export default function PLSolutionsRoute() {
  return (
    <>
      <JsonLd id="pl-solutions-jsonld" data={serviceSchema} />
      <SolutionsPage lang="pl" />
    </>
  );
}
