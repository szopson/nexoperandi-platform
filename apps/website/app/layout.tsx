import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexOperandi.ai — AI Automation Agency",
  description: "AI automation for serious businesses. Build. Scale. Dominate.",
  keywords: ["AI automation", "business automation", "MVP", "content generation", "optimization"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
