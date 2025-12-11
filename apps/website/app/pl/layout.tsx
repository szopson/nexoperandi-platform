import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import { ModalProvider } from "@/context/ModalContext";
import QuizModal from "@/components/quiz/QuizModal";
import ExitIntentPopup from "@/components/popup/ExitIntentPopup";

export const metadata: Metadata = {
  title: {
    default: "NexOperandi.ai — Agencja Automatyzacji AI",
    template: "%s | NexOperandi.ai",
  },
  description: "Automatyzacja AI dla poważnych firm. Buduj. Skaluj. Dominuj. Przekształć swój biznes z agentami AI, workflow i inteligentnymi systemami.",
  keywords: ["automatyzacja AI", "automatyzacja biznesu", "MVP", "generowanie treści", "optymalizacja", "agenci AI", "automatyzacja n8n", "voice agents", "chatbot"],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "/pl",
    title: "NexOperandi.ai — Agencja Automatyzacji AI",
    description: "Automatyzacja AI dla poważnych firm. Buduj. Skaluj. Dominuj.",
    siteName: "NexOperandi.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexOperandi.ai — Agencja Automatyzacji AI",
    description: "Automatyzacja AI dla poważnych firm. Buduj. Skaluj. Dominuj.",
    creator: "@nexoperandi",
  },
  alternates: {
    canonical: "https://nexoperandi.ai/pl",
    languages: {
      'en': 'https://nexoperandi.ai',
      'pl': 'https://nexoperandi.ai/pl',
    },
  },
};

export default function PLMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <Navbar lang="pl" />
      <main lang="pl">{children}</main>
      <Footer lang="pl" />
      <QuizModal lang="pl" />
      <ExitIntentPopup lang="pl" />
    </ModalProvider>
  );
}
