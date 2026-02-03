import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import PricingPage from "@/components/marketing/pages/PricingPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Cennik — NexOperandi",
  description: "Przejrzyste ceny automatyzacji AI. Setup + abonament. Bez ukrytych opłat. Rezygnacja w każdej chwili.",
  path: "/pl/cennik",
  lang: "pl",
  keywords: ["cennik AI", "koszt automatyzacji", "automatyzacja sprzedaży cennik", "pipeline automatyzacja ceny"],
});

export default function PLPricingRoute() {
  return <PricingPage lang="pl" />;
}
