import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import VisitorTracking from "@/components/VisitorTracking";
import ChatBotToggle from "@/components/chatbot/ChatBotToggle";
import UnicornBackground from "@/components/UnicornBackground";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Contentsquare from "@/components/Contentsquare";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nexoperandi.cloud'),
  title: {
    default: "NexOperandi — AI Automation: n8n, Voice AI & Workflow",
    template: "%s | NexOperandi",
  },
  description: "We build AI automation systems that qualify leads, book appointments, and close deals — while your team focuses on what matters. Deployed in 3–7 days. GDPR compliant.",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://nexoperandi.cloud',
    languages: {
      'en': 'https://nexoperandi.cloud',
      'pl': 'https://nexoperandi.cloud/pl',
      'x-default': 'https://nexoperandi.cloud',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const csId = process.env.NEXT_PUBLIC_CONTENTSQUARE_ID;

  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://nexoperandi.cloud/#jakub-baranowski",
    name: "Jakub Baranowski",
    givenName: "Jakub",
    familyName: "Baranowski",
    jobTitle: "Founder",
    description:
      "Co-founder and public face of NexOperandi, a husband-and-wife engineering team based in Poland. The team brings combined experience across banking, fintech, cryptocurrency infrastructure, large-scale IT integration, and software for autonomous driving — applied today to AI automation for serious businesses.",
    worksFor: { "@id": "https://nexoperandi.cloud/#organization" },
    url: "https://nexoperandi.cloud",
    sameAs: [
      "https://www.linkedin.com/in/jakub-baranowski-42a01261/",
      "https://x.com/NexOperandi",
    ],
    knowsAbout: [
      "AI automation",
      "n8n",
      "Voice AI",
      "Sales pipeline automation",
      "Next.js",
      "Banking systems",
      "Fintech",
      "System integration",
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://nexoperandi.cloud/#organization",
    name: "NexOperandi",
    alternateName: "NexOperandi AI Automation Agency",
    url: "https://nexoperandi.cloud",
    logo: "https://nexoperandi.cloud/logo.webp",
    image: "https://nexoperandi.cloud/og-image.png",
    description:
      "AI automation agency that builds n8n workflows, voice AI agents, chatbots, and high-converting websites for serious businesses. Deployments in 3–7 days.",
    slogan: "Ideas into profits. Faster.",
    foundingDate: "2024",
    founder: { "@id": "https://nexoperandi.cloud/#jakub-baranowski" },
    areaServed: ["EU", "PL", "UK", "US"],
    knowsAbout: [
      "AI automation",
      "n8n workflow automation",
      "Voice AI agents",
      "Chatbots",
      "Sales pipeline automation",
      "Web design",
      "E-commerce development",
      "WooCommerce",
      "Next.js",
      "GDPR compliance",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: "https://nexoperandi.cloud/contact",
        availableLanguage: ["English", "Polish"],
        areaServed: ["EU", "PL", "UK", "US"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@nexoperandi.cloud",
        availableLanguage: ["English", "Polish"],
        areaServed: ["EU", "PL", "UK", "US"],
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/nexoperandi",
      "https://www.youtube.com/@nexoperandi",
      "https://x.com/NexOperandi",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://nexoperandi.cloud/#website",
    name: "NexOperandi",
    url: "https://nexoperandi.cloud",
    publisher: { "@id": "https://nexoperandi.cloud/#organization" },
    inLanguage: ["en", "pl"],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />

        <JsonLd id="org-jsonld" data={organizationSchema} />
        <JsonLd id="founder-jsonld" data={founderSchema} />
        <JsonLd id="website-jsonld" data={websiteSchema} />

        {/* Calendly CSS - loaded via lazyOnload script to not block render */}
        <noscript>
          <link
            href="https://assets.calendly.com/assets/external/widget.css"
            rel="stylesheet"
          />
        </noscript>
      </head>
      <body className={`${inter.className} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-black text-slate-300 overflow-x-hidden selection:bg-blue-500/30`} suppressHydrationWarning>
        {/* UnicornBackground disabled temporarily - may revisit later */}
        {/* <UnicornBackground /> */}
        <VisitorTracking />
        {children}
        <ChatBotToggle />

        {/* Calendly CSS - inject after page load to not block render */}
        <Script
          id="calendly-css"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'https://assets.calendly.com/assets/external/widget.css';
              document.head.appendChild(link);
            `,
          }}
        />

        {/* Calendly Widget Script - Load after page is interactive */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />

        {gaId && <GoogleAnalytics gaId={gaId} />}
        {csId && <Contentsquare csId={csId} />}
      </body>
    </html>
  );
}
