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
    <footer className="bg-[#020617] pt-8 pb-8 border-t border-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-600">
            © {year} NexOperandi Inc. — {t.footer.tagline}
          </p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-600">
            <Link
              href="https://www.linkedin.com/company/110334923"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-slate-400"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
