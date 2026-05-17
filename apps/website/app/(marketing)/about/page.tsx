import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import AboutPage from "@/components/marketing/pages/AboutPage";

export const metadata: Metadata = generatePageMetadata({
  title: "About NexOperandi — AI Automation Agency",
  description:
    "NexOperandi is an AI automation agency based in Poland, serving EU, UK, and US clients. Founded in 2024 by an engineering team with 15+ years across banking, fintech, crypto, and autonomous driving. We build n8n workflows, voice AI, and high-converting websites — deployed in 3–7 days.",
  path: "/about",
  lang: "en",
  keywords: [
    "About NexOperandi",
    "AI automation agency",
    "n8n agency Poland",
    "founder-led AI agency",
    "Jakub Baranowski",
  ],
});

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://nexoperandi.cloud/about#aboutpage",
  url: "https://nexoperandi.cloud/about",
  name: "About NexOperandi",
  description:
    "NexOperandi is an AI automation agency based in Poland, serving EU, UK, and US clients. Founded in 2024 by an engineering team with 15+ years across banking, fintech, crypto infrastructure, and autonomous driving systems.",
  inLanguage: "en",
  mainEntity: { "@id": "https://nexoperandi.cloud/#organization" },
  about: { "@id": "https://nexoperandi.cloud/#organization" },
  isPartOf: { "@id": "https://nexoperandi.cloud/#website" },
  breadcrumb: { "@id": "https://nexoperandi.cloud/about#breadcrumb" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://nexoperandi.cloud/about#breadcrumb",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://nexoperandi.cloud",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://nexoperandi.cloud/about",
    },
  ],
};

export default function AboutRoute() {
  return (
    <>
      <JsonLd id="about-jsonld" data={aboutPageSchema} />
      <JsonLd id="about-breadcrumb-jsonld" data={breadcrumbSchema} />
      <AboutPage lang="en" />
    </>
  );
}
