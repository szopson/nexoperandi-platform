import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import PipelineAuditPage from "@/components/marketing/pages/PipelineAuditPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Bezpłatny audyt pipeline — NexOperandi",
  description: "Zamów bezpłatną analizę Twojego lejka sprzedażowego. Zidentyfikujemy punkty wycieku, ocenimy potencjał automatyzacji i przygotujemy plan działania.",
  path: "/pl/audyt-automatyzacji",
  lang: "pl",
  keywords: ["audyt pipeline", "audyt sprzedaży", "ocena automatyzacji", "bezpłatny audyt", "analiza lejka sprzedażowego"],
});

export default function PLPipelineAuditRoute() {
  return <PipelineAuditPage lang="pl" />;
}
