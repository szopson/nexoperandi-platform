"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseExitIntentOptions {
  threshold?: number; // Distance from top of viewport (px) to trigger
  delay?: number; // Delay before enabling detection (ms)
  storageKey?: string; // localStorage key to prevent repeated triggers
  cooldownHours?: number; // Hours before showing again
  enabled?: boolean; // Whether the hook is active
}

export function useExitIntent(
  callback: () => void,
  options: UseExitIntentOptions = {}
) {
  const {
    threshold = 10,
    delay = 5000,
    storageKey = "exitIntentShown",
    cooldownHours = 24,
    enabled = true,
  } = options;

  const hasTriggeredRef = useRef(false);
  const isEnabledRef = useRef(false);

  const checkCooldown = useCallback((): boolean => {
    if (typeof window === "undefined") return true;

    const lastShown = localStorage.getItem(storageKey);
    if (!lastShown) return false;

    const lastShownTime = parseInt(lastShown, 10);
    const cooldownMs = cooldownHours * 60 * 60 * 1000;
    const now = Date.now();

    return now - lastShownTime < cooldownMs;
  }, [storageKey, cooldownHours]);

  const markAsShown = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(storageKey, Date.now().toString());
  }, [storageKey]);

  useEffect(() => {
    if (!enabled) return;

    // Check if already in cooldown
    if (checkCooldown()) {
      return;
    }

    // Desktop: Mouse leave detection
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse moves toward top of viewport
      if (
        e.clientY < threshold &&
        isEnabledRef.current &&
        !hasTriggeredRef.current
      ) {
        hasTriggeredRef.current = true;
        markAsShown();
        callback();
      }
    };

    // Mobile: Scroll-based detection (scroll up quickly after being on page)
    let lastScrollY = 0;
    let scrollUpDistance = 0;
    let hasScrolledPast50 = false;

    const handleScroll = () => {
      if (!isEnabledRef.current || hasTriggeredRef.current) return;

      const currentScrollY = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (currentScrollY / pageHeight) * 100;

      // Track if user has scrolled past 50%
      if (scrollPercent > 50) {
        hasScrolledPast50 = true;
      }

      // Detect rapid scroll up (user trying to leave)
      if (currentScrollY < lastScrollY) {
        scrollUpDistance += lastScrollY - currentScrollY;
      } else {
        scrollUpDistance = 0;
      }

      // If user has scrolled past 50% and then scrolls up quickly (> 300px)
      if (hasScrolledPast50 && scrollUpDistance > 300 && currentScrollY < 100) {
        hasTriggeredRef.current = true;
        markAsShown();
        callback();
      }

      lastScrollY = currentScrollY;
    };

    // Enable detection after delay
    const timer = setTimeout(() => {
      isEnabledRef.current = true;
    }, delay);

    // Add event listeners
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback, threshold, delay, enabled, checkCooldown, markAsShown]);

  // Return a function to manually reset the trigger (useful for testing)
  const reset = useCallback(() => {
    hasTriggeredRef.current = false;
    isEnabledRef.current = false;
    if (typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  return { reset };
}
