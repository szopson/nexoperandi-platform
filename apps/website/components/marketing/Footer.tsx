"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTranslations, type Lang } from "@/lib/translations";

interface FooterProps {
  lang?: Lang;
}

export default function Footer({ lang = 'en' }: FooterProps) {
  const [year, setYear] = useState(2025);
  const t = getTranslations(lang);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-gray-500">
          © {year} NexOperandi.ai — {t.footer.tagline}
        </p>
        <div className="mt-4 space-x-4">
          <Link href="#" className="text-sm text-gray-500 hover:text-black transition">
            {t.footer.linkedin}
          </Link>
          <Link
            href="mailto:contact@nexoperandi.cloud"
            className="text-sm text-gray-500 hover:text-black transition"
          >
            contact@nexoperandi.cloud
          </Link>
        </div>
      </div>
    </footer>
  );
}
