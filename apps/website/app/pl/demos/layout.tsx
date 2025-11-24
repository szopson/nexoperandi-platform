import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo agentów AI na żywo | NexOperandi.ai",
  description: "Doświadcz naszych agentów automatyzacji AI w akcji. Każde demo wykorzystuje prawdziwe workflow zasilane przez n8n i zaawansowane modele AI.",
  alternates: {
    canonical: "https://nexoperandi.ai/pl/demos",
    languages: {
      'en': 'https://nexoperandi.ai/demos',
      'pl': 'https://nexoperandi.ai/pl/demos',
    },
  },
};

export default function PLDemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/pl" className="text-xl font-bold">
              NexOperandi
            </Link>
            <div className="flex gap-4">
              <Link
                href="/pl/demos"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                Wszystkie demo
              </Link>
              <Link
                href="/pl#contact"
                className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Rozpocznij
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Content */}
      <main>{children}</main>

      {/* Demo Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>To są interaktywne dema zasilane przez prawdziwych agentów AI.</p>
            <p className="mt-2">
              <Link href="/pl#contact" className="text-blue-600 hover:text-blue-800">
                Skontaktuj się z nami
              </Link>{" "}
              aby wdrożyć tych agentów w Twojej firmie.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
