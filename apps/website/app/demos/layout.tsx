import Link from "next/link";

export default function DemosLayout({
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
            <Link href="/" className="text-xl font-bold">
              NexOperandi
            </Link>
            <div className="flex gap-4">
              <Link
                href="/demos"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                All Demos
              </Link>
              <Link
                href="/#contact"
                className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Get Started
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
            <p>These are interactive demos powered by real AI agents.</p>
            <p className="mt-2">
              <Link href="/#contact" className="text-blue-600 hover:text-blue-800">
                Contact us
              </Link>{" "}
              to deploy these agents for your business.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
