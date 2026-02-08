import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import SolutionsPage from "@/components/marketing/pages/SolutionsPage";

export const metadata: Metadata = generatePageMetadata({
  title: "AI Automation Solutions — NexOperandi",
  description: "Purpose-built AI automation systems: Sales Autopilot, Voice Concierge, and Content Engine. Integrate with your existing tools and processes.",
  path: "/solutions",
  lang: "en",
  keywords: ["AI solutions", "sales automation", "voice AI", "content automation", "pipeline automation"],
});

export default function SolutionsRoute() {
  return <SolutionsPage lang="en" />;
}
