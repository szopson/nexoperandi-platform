"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [year, setYear] = useState(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-gray-500">
          © {year} NexOperandi.ai — Ideas into profits. Faster.
        </p>
        <div className="mt-4 space-x-4">
          <Link href="#" className="text-sm text-gray-500 hover:text-black transition">
            LinkedIn
          </Link>
          <Link
            href="mailto:hello@NexOperandi.ai"
            className="text-sm text-gray-500 hover:text-black transition"
          >
            hello@NexOperandi.ai
          </Link>
        </div>
      </div>
    </footer>
  );
}
