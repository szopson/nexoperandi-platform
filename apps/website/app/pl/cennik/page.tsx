import type { Metadata } from "next";
import Script from "next/script";
import { generatePageMetadata } from "@/lib/metadata";
import { buildOfferCatalogSchema } from "@/lib/jsonld";
import PricingPage from "@/components/marketing/pages/PricingPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Cennik",
  description: "Przejrzyste ceny automatyzacji AI. Setup + abonament. Bez ukrytych opłat. Rezygnacja w każdej chwili.",
  path: "/pl/cennik",
  lang: "pl",
  keywords: ["cennik AI", "koszt automatyzacji", "automatyzacja sprzedaży cennik", "pipeline automatyzacja ceny"],
});

const offerCatalog = buildOfferCatalogSchema("/pl/cennik", [
  { name: "Starter — Automatyzacja AI", price: "1500", priceCurrency: "PLN", description: "Wdrożenie. Chatbot AI 24/7, połączenie z CRM, podstawowy panel. Od 600 zł/mies." },
  { name: "Pro — System sprzedaży AI", price: "3000", priceCurrency: "PLN", description: "Wdrożenie. Voice AI, automatyczne oferty, raporty tygodniowe, wsparcie priorytetowe. Od 1000 zł/mies." },
  { name: "Enterprise — Rozwiązanie dedykowane", price: "0", priceCurrency: "PLN", description: "Rozwiązania indywidualne dla dużych potrzeb. Kontakt po wycenę." },
]);

export default function PLPricingRoute() {
  return (
    <>
      <Script id="pl-pricing-jsonld" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(offerCatalog)}
      </Script>
      <PricingPage lang="pl" />
    </>
  );
}
