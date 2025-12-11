"use client";

import { useState } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getTranslations, type Lang } from "@/lib/translations";
import { useModal } from "@/context/ModalContext";

interface NavbarProps {
  lang?: Lang;
}

export default function Navbar({ lang = 'en' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = getTranslations(lang);
  const basePath = lang === 'pl' ? '/pl' : '';
  const { openQuiz } = useModal();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
      <div className="flex h-20 max-w-7xl mx-auto px-6 items-center justify-between">
        {/* Logo */}
        <Link href={basePath || '/'} className="flex items-center gap-3 group cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="h-10 w-10 shrink-0"
          >
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#4338ca" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="12" fill="url(#logo-grad)" />
            <path
              d="M9 22 L14 10 L23 22"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-lg font-semibold tracking-widest uppercase group-hover:text-cyan-400 transition-colors text-white">
            NexOperandi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400 items-center">
          <Link href="#results" className="transition-colors hover:text-white">
            {t.nav.results}
          </Link>
          <Link href="#how-it-works" className="transition-colors hover:text-white">
            {t.nav.howItWorks || 'How it works'}
          </Link>
          <Link href="#about" className="transition-colors hover:text-white">
            {t.nav.about || 'About Us'}
          </Link>
          <Link href="#pricing" className="transition-colors hover:text-white">
            {t.nav.pricing || 'Pricing'}
          </Link>
          <Link href="#contact" className="transition-colors hover:text-white">
            {t.nav.contact || 'Contact'}
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-6">
          {/* Language Switcher - Desktop */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* CTA Button - Desktop */}
          <button
            onClick={openQuiz}
            className="hidden md:flex gap-2 transition-all hover:border-cyan-500/50 group text-xs font-semibold tracking-wide border rounded-full py-2.5 px-5 items-center hover:bg-white/10 text-white bg-white/5 border-white/10"
          >
            {t.quiz.cta}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M4 12h16M14 6l6 6-6 6" />
            </svg>
          </button>

          {/* Mobile: Language switcher + hamburger */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher isMobile />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#020617]/95 backdrop-blur-md border-t border-white/5">
          <ul className="flex flex-col space-y-1 px-6 py-4">
            <li>
              <Link
                href="#results"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-sm text-slate-300 hover:text-white transition-colors"
              >
                {t.nav.results}
              </Link>
            </li>
            <li>
              <Link
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-sm text-slate-300 hover:text-white transition-colors"
              >
                {t.nav.howItWorks || 'How it works'}
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-sm text-slate-300 hover:text-white transition-colors"
              >
                {t.nav.about || 'About Us'}
              </Link>
            </li>
            <li>
              <Link
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-sm text-slate-300 hover:text-white transition-colors"
              >
                {t.nav.pricing || 'Pricing'}
              </Link>
            </li>
            <li className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openQuiz();
                }}
                className="block w-full text-center border border-white/10 bg-white/5 text-white text-sm font-semibold py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                {t.quiz.cta}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
