import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import VisitorTracking from "@/components/VisitorTracking";
import ChatBotToggle from "@/components/chatbot/ChatBotToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexOperandi.ai — AI Automation Agency",
  description: "AI automation for serious businesses. Build. Scale. Dominate.",
  keywords: ["AI automation", "business automation", "MVP", "content generation", "optimization"],
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
