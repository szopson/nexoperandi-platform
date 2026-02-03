"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Lang } from "@/lib/translations";

interface FooterProps {
  lang?: Lang;
}

const footerContent = {
  en: {
    tagline: 'AI automation for serious businesses.',
    product: {
      title: 'Product',
      links: [
        { label: 'Solutions', href: '/solutions' },
        { label: 'Demo', href: '/demo' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Pipeline Audit', href: '/pipeline-audit' },
      ],
    },
    company: {
      title: 'Company',
      links: [
        { label: 'Contact', href: '#contact' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/company/110334923', external: true },
      ],
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ],
    },
  },
  pl: {
    tagline: 'Automatyzacja AI dla poważnych firm.',
    product: {
      title: 'Produkt',
      links: [
        { label: 'Rozwiązania', href: '/pl/rozwiazania' },
        { label: 'Demo', href: '/pl/demo' },
        { label: 'Cennik', href: '/pl/cennik' },
        { label: 'Audyt Pipeline', href: '/pl/audyt-automatyzacji' },
      ],
    },
    company: {
      title: 'Firma',
      links: [
        { label: 'Kontakt', href: '/pl#contact' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/company/110334923', external: true },
      ],
    },
    legal: {
      title: 'Prawo',
      links: [
        { label: 'Polityka prywatności', href: '#' },
        { label: 'Regulamin', href: '#' },
      ],
    },
  },
};

export default function Footer({ lang = 'en' }: FooterProps) {
  const [year, setYear] = useState(2025);
  const content = footerContent[lang];

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const columns = [content.product, content.company, content.legal];

  return (
    <footer className="bg-black pt-16 pb-8 border-t border-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top: Logo + Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={lang === 'pl' ? '/pl' : '/'} className="flex items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="h-8 w-8 shrink-0"
              >
                <defs>
                  <linearGradient id="footer-logo-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#4338ca" />
                  </linearGradient>
                </defs>
                <circle cx="16" cy="16" r="12" fill="url(#footer-logo-grad)" />
                <path
                  d="M9 22 L14 10 L23 22"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-semibold tracking-widest uppercase text-white">
                NexOperandi
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-[200px]">
              {content.tagline}
            </p>
          </div>

          {/* Link Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-900/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {year} NexOperandi Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/company/110334923"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-400 transition-colors"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
