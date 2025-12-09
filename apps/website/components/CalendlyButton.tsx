"use client";

import { useState, useCallback, useRef, useEffect } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

interface CalendlyButtonProps {
  buttonText?: string;
  variant?: "primary" | "outline" | "link";
  className?: string;
  utmSource?: string;
}

export default function CalendlyButton({
  buttonText = "Book a Call",
  variant = "primary",
  className = "",
  utmSource = "website",
}: CalendlyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const openCalendly = useCallback(() => {
    const calendlyUrl = `https://calendly.com/nexoperandi/nexoperandi-demo-automation?utm_source=${utmSource}`;

    if (window.Calendly) {
      // Script is ready - open immediately
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      // Script not ready - show loading and poll for it
      setIsLoading(true);

      intervalRef.current = setInterval(() => {
        if (window.Calendly) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setIsLoading(false);
          window.Calendly.initPopupWidget({ url: calendlyUrl });
        }
      }, 100);

      // Timeout after 5s - stop loading and show error state
      timeoutRef.current = setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsLoading(false);
        // Fallback: open Calendly in new tab if script fails
        window.open(calendlyUrl, '_blank');
      }, 5000);
    }
  }, [utmSource]);

  const variantStyles = {
    primary:
      "inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg",
    outline:
      "inline-block border-2 border-blue-600 text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 hover:border-blue-700 transition-all duration-200",
    link: "inline-flex items-center text-blue-700 font-medium hover:text-blue-800 transition-colors underline-offset-4 hover:underline",
  };

  return (
    <button
      onClick={openCalendly}
      disabled={isLoading}
      className={`${variantStyles[variant]} ${className} ${isLoading ? 'opacity-75 cursor-wait' : ''}`}
      type="button"
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        <>
          {buttonText}
          {variant === "link" && (
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </>
      )}
    </button>
  );
}
