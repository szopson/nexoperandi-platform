import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import ContactSection from "@/components/marketing/ContactSection";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact",
  description: "Get in touch with NexOperandi for AI automation solutions, audits, and custom implementations.",
  path: "/contact",
  lang: "en",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="pt-32 pb-8 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Get in touch
        </h1>
      </div>
      <ContactSection />
    </div>
  );
}
