import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { SITE_METADATA_BASE, SHARED_ROBOTS } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: SITE_METADATA_BASE,
  title: {
    default: "NexOperandi — AI Automation: n8n, Voice AI & Workflow",
    template: "%s | NexOperandi",
  },
  description: "We build AI automation that qualifies leads, books appointments, and closes deals — deployed in 3–7 days, GDPR compliant.",
  keywords: ["AI automation", "business automation", "MVP", "content generation", "optimization", "AI agents", "n8n automation", "voice agents", "chatbot", "web design", "e-commerce development"],
  authors: [{ name: "NexOperandi" }],
  creator: "NexOperandi",
  publisher: "NexOperandi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "NexOperandi — AI Automation Agency",
    description: "AI automation systems that qualify leads, book appointments, and close deals. Deployed in 3–7 days. GDPR compliant.",
    siteName: "NexOperandi",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NexOperandi — AI Automation Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexOperandi — AI Automation Agency",
    description: "AI automation systems that qualify leads, book appointments, and close deals. Deployed in 3–7 days.",
    creator: "@nexoperandi",
    images: ["/og-image.png"],
  },
  robots: SHARED_ROBOTS,
  alternates: {
    canonical: 'https://nexoperandi.cloud',
    languages: {
      'en': 'https://nexoperandi.cloud',
      'pl': 'https://nexoperandi.cloud/pl',
      'x-default': 'https://nexoperandi.cloud',
    },
  },
};

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootShell lang="en">{children}</RootShell>;
}
