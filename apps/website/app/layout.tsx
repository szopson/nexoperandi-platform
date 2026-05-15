import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import VisitorTracking from "@/components/VisitorTracking";
import ChatBotToggle from "@/components/chatbot/ChatBotToggle";
import UnicornBackground from "@/components/UnicornBackground";

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
    default: "NexOperandi — AI Automation Agency | n8n, Voice AI, Workflow Automation",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "NexOperandi — AI Automation Agency",
    description: "AI automation systems that qualify leads, book appointments, and close deals. Deployed in 3–7 days.",
    creator: "@nexoperandi",
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
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />

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
      </body>
    </html>
  );
}
