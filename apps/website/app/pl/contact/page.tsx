import ContactSection from "@/components/marketing/ContactSection";

export const metadata = {
  title: 'Kontakt | NexOperandi',
  description: 'Skontaktuj się z NexOperandi w sprawie automatyzacji AI, audytów i wdrożeń na miarę.',
};

export default function PLContactPage() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <ContactSection lang="pl" />
    </div>
  );
}
