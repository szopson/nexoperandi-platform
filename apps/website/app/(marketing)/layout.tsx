import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import { ModalProvider } from "@/context/ModalContext";
import QuizModal from "@/components/quiz/QuizModal";
import ExitIntentPopup from "@/components/popup/ExitIntentPopup";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <Navbar lang="en" />
      <main>{children}</main>
      <Footer lang="en" />
      <QuizModal lang="en" />
      <ExitIntentPopup lang="en" />
    </ModalProvider>
  );
}
