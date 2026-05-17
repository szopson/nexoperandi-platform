import type { Metadata } from "next";
import Script from "next/script";
import { generatePageMetadata } from "@/lib/metadata";
import { buildServiceSchema } from "@/lib/jsonld";
import SolutionsPage from "@/components/marketing/pages/SolutionsPage";

export const metadata: Metadata = generatePageMetadata({
  title: "AI Automation Solutions",
  description: "Purpose-built AI automation systems: Sales Autopilot, Voice Concierge, and Content Engine. Integrate with your existing tools and processes.",
  path: "/solutions",
  lang: "en",
  keywords: ["AI solutions", "sales automation", "voice AI", "content automation", "pipeline automation"],
});

const serviceSchema = buildServiceSchema({
  name: "AI Automation Solutions",
  description: "Purpose-built AI automation systems: Sales Autopilot, Voice Concierge, and Content Engine.",
  path: "/solutions",
  serviceType: "AI Automation",
});

export default function SolutionsRoute() {
  return (
    <>
      <Script id="solutions-jsonld" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(serviceSchema)}
      </Script>
      <SolutionsPage lang="en" />
    </>
  );
}
