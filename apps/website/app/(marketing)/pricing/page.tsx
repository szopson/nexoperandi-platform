import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import PricingPage from "@/components/marketing/pages/PricingPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Pricing — NexOperandi",
  description: "Transparent pricing for AI pipeline automation. Setup + monthly. No hidden fees. Cancel anytime.",
  path: "/pricing",
  lang: "en",
  keywords: ["AI pricing", "automation pricing", "sales automation cost", "pipeline automation pricing"],
});

export default function PricingRoute() {
  return <PricingPage lang="en" />;
}
