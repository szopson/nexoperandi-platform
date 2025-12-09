"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}

export default function UnicornBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check for low-end device or reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

    // Skip heavy WebGL on low-end devices or when reduced motion is preferred
    if (prefersReducedMotion || isLowEndDevice) {
      return;
    }

    // Defer loading until browser is idle to not block LCP
    const loadScript = () => {
      if (!window.UnicornStudio) {
        window.UnicornStudio = { isInitialized: false, init: () => {} };
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
        script.onload = () => {
          if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
            window.UnicornStudio.init();
            window.UnicornStudio.isInitialized = true;
            setIsLoaded(true);
          }
        };
        (document.head || document.body).appendChild(script);
      }
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(loadScript, { timeout: 3000 });
    } else {
      // Fallback: delay loading by 2 seconds to let critical content render first
      setTimeout(loadScript, 2000);
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      {/* Unicorn Studio Canvas */}
      <div
        id="unicorn-canvas"
        data-us-project="yWZ2Tbe094Fsjgy9NRnD"
        className="absolute w-full h-full left-0 top-0"
      />

      {/* Fallback Gradient/Grid if WebGL fails or loads slowly */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 -z-20" />
    </div>
  );
}
