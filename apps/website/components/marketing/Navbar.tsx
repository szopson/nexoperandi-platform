"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getTranslations, type Lang } from "@/lib/translations";

interface NavbarProps {
  lang?: Lang;
}

export default function Navbar({ lang = 'en' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = getTranslations(lang);
  const basePath = lang === 'pl' ? '/pl' : '';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <Link href={basePath || '/'} className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="h-12 w-12 shrink-0"
          >
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#4338ca" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="12" fill="url(#grad)" />
            <path
              d="M9 22 L14 10 L23 22"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-lg md:text-xl font-semibold tracking-widest uppercase">
            NexOperandi
          </span>
        </Link>

        {/* Mobile: Language switcher + hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher isMobile />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        <ul className="hidden md:flex space-x-8 items-center">
          <li>
            <Link href="#journey" className="text-sm hover:text-blue-600 transition">
              {t.nav.journey}
            </Link>
          </li>
          <li>
            <Link href="#results" className="text-sm hover:text-blue-600 transition">
              {t.nav.results}
            </Link>
          </li>
          <li>
            <Link href="#testimonials" className="text-sm hover:text-blue-600 transition">
              {t.nav.proof}
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="border border-black text-black text-sm py-2 px-5 rounded-md hover:bg-black hover:text-white transition"
            >
              {t.nav.startToday}
            </Link>
          </li>
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>

      {mobileMenuOpen && (
        <ul className="flex flex-col space-y-1 px-4 pb-4 md:hidden">
          <li>
            <Link href="#journey" className="block py-2.5 text-sm text-slate-900 hover:text-blue-600">
              {t.nav.journey}
            </Link>
          </li>
          <li>
            <Link href="#results" className="block py-2.5 text-sm text-slate-900 hover:text-blue-600">
              {t.nav.results}
            </Link>
          </li>
          <li>
            <Link href="#testimonials" className="block py-2.5 text-sm text-slate-900 hover:text-blue-600">
              {t.nav.proof}
            </Link>
          </li>
          <li className="pt-2">
            <Link
              href="#contact"
              className="block w-full border border-slate-300 text-center text-slate-900 text-sm font-semibold py-2.5 rounded-md hover:bg-slate-50 transition"
            >
              {t.nav.startToday}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
