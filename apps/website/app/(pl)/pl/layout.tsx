import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import { ModalProvider } from "@/context/ModalContext";
import QuizModal from "@/components/quiz/QuizModal";
import ExitIntentPopup from "@/components/popup/ExitIntentPopup";
import VideoModal from "@/components/marketing/VideoModal";

export const metadata: Metadata = {
  title: {
    default: "NexOperandi — Agencja Automatyzacji AI | n8n, Voice AI, Automatyzacje",
    template: "%s | NexOperandi",
  },
  description: "Budujemy systemy AI, które kwalifikują leady, umawiają spotkania i zamykają sprzedaż. Wdrożenie w 3–7 dni. GDPR compliant.",
  keywords: ["automatyzacja AI", "automatyzacja biznesu", "MVP", "generowanie treści", "optymalizacja", "agenci AI", "automatyzacja n8n", "voice agents", "chatbot", "strony internetowe", "sklepy internetowe"],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "/pl",
    title: "NexOperandi — Agencja Automatyzacji AI",
    description: "Systemy AI, które kwalifikują leady, umawiają spotkania i zamykają sprzedaż. Wdrożenie w 3–7 dni. GDPR compliant.",
    siteName: "NexOperandi",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexOperandi — Agencja Automatyzacji AI",
    description: "Systemy AI, które kwalifikują leady, umawiają spotkania i zamykają sprzedaż.",
    creator: "@nexoperandi",
  },
  alternates: {
    canonical: "https://nexoperandi.cloud/pl",
    languages: {
      'en': 'https://nexoperandi.cloud',
      'pl': 'https://nexoperandi.cloud/pl',
      'x-default': 'https://nexoperandi.cloud',
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
      <VideoModal />
    </ModalProvider>
  );
}
