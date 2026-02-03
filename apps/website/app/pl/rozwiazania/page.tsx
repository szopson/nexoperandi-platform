import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import SolutionsPage from "@/components/marketing/pages/SolutionsPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Rozwiązania automatyzacji AI — NexOperandi",
  description: "Systemy AI zaprojektowane pod Twoje procesy: Sales Autopilot, Voice Concierge i Content Engine. Integracja z Twoimi narzędziami.",
  path: "/pl/rozwiazania",
  lang: "pl",
  keywords: ["rozwiązania AI", "automatyzacja sprzedaży", "głosowe AI", "automatyzacja treści", "automatyzacja pipeline"],
});

export default function PLSolutionsRoute() {
  return <SolutionsPage lang="pl" />;
}
