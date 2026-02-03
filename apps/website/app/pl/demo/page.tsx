import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import DemoPage from "@/components/marketing/pages/DemoPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Demo — NexOperandi",
  description: "Zobacz prawdziwe workflow automatyzacji AI w akcji. Sprawdź jak nasz AI Sales Autopilot zamienia leady w podpisane umowy — automatycznie.",
  path: "/pl/demo",
  lang: "pl",
  keywords: ["demo AI", "automatyzacja sprzedaży", "głosowe AI", "od leada do umowy", "automatyzacja pipeline"],
});

export default function PLDemoRoute() {
  return <DemoPage lang="pl" />;
}
