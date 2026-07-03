import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import DemoPage from "@/components/marketing/pages/DemoPage";

export const metadata: Metadata = generatePageMetadata({
  title: "AI Automation Demo — Sales Autopilot in Action",
  description: "Watch real AI automation workflows in action. See how our AI Sales Autopilot turns leads into signed contracts — automatically.",
  path: "/demo",
  lang: "en",
  keywords: ["AI demo", "sales automation demo", "voice AI", "lead-to-contract", "pipeline automation"],
});

export default function DemoRoute() {
  return <DemoPage lang="en" />;
}
