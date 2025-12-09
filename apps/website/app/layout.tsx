import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import VisitorTracking from "@/components/VisitorTracking";
import ChatBotToggle from "@/components/chatbot/ChatBotToggle";
import UnicornBackground from "@/components/UnicornBackground";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600"],  // Reduced from 6 to 3 weights for performance
  display: "swap",  // Prevent FOIT (Flash of Invisible Text)
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nexoperandi.ai'),
  title: {
    default: "NexOperandi.ai — AI Automation Agency",
    template: "%s | NexOperandi.ai",
  },
  description: "AI automation for serious businesses. Build. Scale. Dominate. Transform your business with AI-powered automation agents, workflows, and intelligent systems.",
  keywords: ["AI automation", "business automation", "MVP", "content generation", "optimization", "AI agents", "n8n automation", "voice agents", "chatbot"],
  authors: [{ name: "NexOperandi" }],
  creator: "NexOperandi",
  publisher: "NexOperandi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "NexOperandi.ai — AI Automation Agency",
    description: "AI automation for serious businesses. Build. Scale. Dominate.",
    siteName: "NexOperandi.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexOperandi.ai — AI Automation Agency",
    description: "AI automation for serious businesses. Build. Scale. Dominate.",
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
    canonical: 'https://nexoperandi.ai',
    languages: {
      'en': 'https://nexoperandi.ai',
      'pl': 'https://nexoperandi.ai/pl',
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
      <body className={`${plusJakartaSans.className} ${plusJakartaSans.variable} ${geistMono.variable} antialiased bg-[#020617] text-slate-300 overflow-x-hidden selection:bg-cyan-500/30`} suppressHydrationWarning>
        <UnicornBackground />
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
