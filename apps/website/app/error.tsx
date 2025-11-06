'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service (e.g., Sentry)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600 mb-4">500</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Something Went Wrong</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          We're sorry, but something unexpected happened. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-blue-600 text-white font-semibold py-4 px-8 rounded-md hover:bg-blue-700 hover:scale-105 transition-transform"
          >
            Try Again
          </button>
          <a
            href="/"
            className="bg-gray-600 text-white font-semibold py-4 px-8 rounded-md hover:bg-gray-700 hover:scale-105 transition-transform"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
