import type { Metadata } from "next";
import Script from "next/script";
import { generatePageMetadata } from "@/lib/metadata";
import { buildServiceSchema } from "@/lib/jsonld";
import PipelineAuditPage from "@/components/marketing/pages/PipelineAuditPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Bezpłatny audyt pipeline",
  description: "Zamów bezpłatną analizę Twojego lejka sprzedażowego. Zidentyfikujemy punkty wycieku, ocenimy potencjał automatyzacji i przygotujemy plan działania.",
  path: "/pl/audyt-automatyzacji",
  lang: "pl",
  keywords: ["audyt pipeline", "audyt sprzedaży", "ocena automatyzacji", "bezpłatny audyt", "analiza lejka sprzedażowego"],
});

const serviceSchema = buildServiceSchema({
  name: "Bezpłatny audyt pipeline",
  description: "Bezpłatna analiza lejka sprzedażowego: punkty wycieku, potencjał automatyzacji i plan działania.",
  path: "/pl/audyt-automatyzacji",
  serviceType: "Sales Pipeline Audit",
});

export default function PLPipelineAuditRoute() {
  return (
    <>
      <Script id="pl-pipeline-audit-jsonld" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(serviceSchema)}
      </Script>
      <PipelineAuditPage lang="pl" />
    </>
  );
}
