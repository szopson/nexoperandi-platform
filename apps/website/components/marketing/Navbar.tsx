"use client";

import { useState } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getTranslations, type Lang } from "@/lib/translations";

interface NavbarProps {
  lang?: Lang;
}

const navLinks = {
  en: [
    { href: '/solutions', label: 'Solutions' },
    { href: '/demo', label: 'Demo' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/pipeline-audit', label: 'Pipeline Audit' },
    { href: '#contact', label: 'Contact' },
  ],
  pl: [
    { href: '/pl/rozwiazania', label: 'Rozwiązania' },
    { href: '/pl/demo', label: 'Demo' },
    { href: '/pl/cennik', label: 'Cennik' },
    { href: '/pl/audyt-automatyzacji', label: 'Audyt Pipeline' },
    { href: '/pl#contact', label: 'Kontakt' },
  ],
};

export default function Navbar({ lang = 'en' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = getTranslations(lang);
  const basePath = lang === 'pl' ? '/pl' : '';
  const links = navLinks[lang];
  const auditHref = lang === 'pl' ? '/pl/audyt-automatyzacji' : '/pipeline-audit';
  const auditLabel = lang === 'pl' ? 'Umów audyt' : 'Book Free Audit';

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
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
          <span className="text-lg font-semibold tracking-widest uppercase group-hover:text-blue-400 transition-colors text-white">
            NexOperandi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-6">
          {/* Language Switcher - Desktop */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* CTA Button - Desktop */}
          <Link
            href={auditHref}
            className="hidden md:flex gap-2 transition-all hover:shadow-lg hover:shadow-blue-500/20 group text-xs font-semibold tracking-wide rounded-full py-2.5 px-5 items-center bg-blue-600 hover:bg-blue-500 text-white"
          >
            {auditLabel}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M4 12h16M14 6l6 6-6 6" />
            </svg>
          </Link>

          {/* Mobile: Language switcher + hamburger */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher isMobile />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" x2="6" y1="6" y2="18" />
                    <line x1="6" x2="18" y1="6" y2="18" />
                  </>
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/5">
          <ul className="flex flex-col space-y-1 px-6 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href={auditHref}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-3 rounded-full transition-colors"
              >
                {auditLabel}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
