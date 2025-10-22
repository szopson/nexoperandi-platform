"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
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

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="block md:hidden text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <ul className="hidden md:flex space-x-8 items-center">
          <li>
            <Link href="#journey" className="text-sm hover:text-blue-600 transition">
              Journey
            </Link>
          </li>
          <li>
            <Link href="#results" className="text-sm hover:text-blue-600 transition">
              Results
            </Link>
          </li>
          <li>
            <Link href="#testimonials" className="text-sm hover:text-blue-600 transition">
              Proof
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="border border-black text-black text-sm py-2 px-5 rounded-md hover:bg-black hover:text-white transition"
            >
              Start Today
            </Link>
          </li>
        </ul>
      </div>

      {mobileMenuOpen && (
        <ul className="flex flex-col space-y-4 px-6 pb-4 md:hidden">
          <li>
            <Link href="#journey" className="block text-sm hover:text-blue-600">
              Journey
            </Link>
          </li>
          <li>
            <Link href="#results" className="block text-sm hover:text-blue-600">
              Results
            </Link>
          </li>
          <li>
            <Link href="#testimonials" className="block text-sm hover:text-blue-600">
              Proof
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="block border border-black text-center text-black text-sm py-2 px-5 rounded-md hover:bg-black hover:text-white transition"
            >
              Start Today
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
