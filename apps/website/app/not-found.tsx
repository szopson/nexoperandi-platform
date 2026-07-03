import Link from 'next/link';

// Global fallback for unmatched routes. With multiple root layouts there is no
// shared root layout, so this file must render its own <html>/<body>.
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-white px-6">
          <div className="text-center">
            <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white font-semibold py-4 px-8 rounded-md hover:bg-blue-700 hover:scale-105 transition-transform"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
