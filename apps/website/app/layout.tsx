import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import VisitorTracking from "@/components/VisitorTracking";
import ChatBotToggle from "@/components/chatbot/ChatBotToggle";

const inter = Inter({ subsets: ["latin"] });

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <VisitorTracking />
        {children}
        <ChatBotToggle />
      </body>
    </html>
  );
}
