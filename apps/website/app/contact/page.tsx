import ContactSection from "@/components/marketing/ContactSection";

export const metadata = {
  title: 'Contact | NexOperandi',
  description: 'Get in touch with NexOperandi for AI automation solutions, audits, and custom implementations.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <ContactSection />
    </div>
  );
}
