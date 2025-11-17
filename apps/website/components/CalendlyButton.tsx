"use client";

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
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: `https://calendly.com/nexoperandi/nexoperandi-demo-automation?utm_source=${utmSource}`,
      });
    }
  };

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
      className={`${variantStyles[variant]} ${className}`}
      type="button"
    >
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
    </button>
  );
}
