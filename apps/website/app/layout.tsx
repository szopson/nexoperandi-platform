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
  weight: ["300", "400", "500", "600", "700", "800"],
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
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${plusJakartaSans.className} ${plusJakartaSans.variable} ${geistMono.variable} antialiased bg-[#020617] text-slate-300 overflow-x-hidden selection:bg-cyan-500/30`} suppressHydrationWarning>
        <UnicornBackground />
        <VisitorTracking />
        {children}
        <ChatBotToggle />

        {/* Calendly Widget Script - Loaded once globally */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
