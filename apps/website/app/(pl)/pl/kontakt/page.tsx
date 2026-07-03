import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import ContactSection from "@/components/marketing/ContactSection";

export const metadata: Metadata = generatePageMetadata({
  title: "Kontakt",
  description: "Skontaktuj się z NexOperandi w sprawie automatyzacji AI, audytów i wdrożeń na miarę.",
  path: "/pl/kontakt",
  lang: "pl",
});

export default function PLContactPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="pt-32 pb-8 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Skontaktuj się z nami
        </h1>
      </div>
      <ContactSection lang="pl" />
    </div>
  );
}
