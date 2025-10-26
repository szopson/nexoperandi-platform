'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Visitor Intelligence Tracking Component
 *
 * Tracks visitor behavior and sends to n8n workflow via API
 * - Time on page
 * - Pages viewed in session
 * - Scroll depth
 * - Device detection
 * - UTM parameters
 */

interface VisitorData {
  url: string;
  pageTitle: string;
  timeOnPage: number;
  pagesViewed: number;
  scrollDepth: number;
  device: string;
  browser: string;
  os: string;
  referrer: string;
  visitorId: string;
  sessionId: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

export default function VisitorTracking() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);
  const sessionPagesRef = useRef<number>(0);
  const hasTrackedRef = useRef<boolean>(false);

  useEffect(() => {
    // Get or create visitor ID (persistent across sessions)
    const getVisitorId = (): string => {
      let visitorId = localStorage.getItem('visitor_id');
      if (!visitorId) {
        visitorId = `visitor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('visitor_id', visitorId);
      }
      return visitorId;
    };

    // Get or create session ID (expires after 30 minutes of inactivity)
    const getSessionId = (): string => {
      const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
      const now = Date.now();

      let sessionData = sessionStorage.getItem('session_data');

      if (sessionData) {
        const { sessionId, lastActivity } = JSON.parse(sessionData);
        if (now - lastActivity < SESSION_TIMEOUT) {
          // Update last activity
          sessionStorage.setItem('session_data', JSON.stringify({
            sessionId,
            lastActivity: now
          }));
          return sessionId;
        }
      }

      // Create new session
      const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('session_data', JSON.stringify({
        sessionId: newSessionId,
        lastActivity: now
      }));

      return newSessionId;
    };

    // Detect device type
    const getDeviceType = (): string => {
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
      }
      if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
      }
      return 'desktop';
    };

    // Detect browser
    const getBrowser = (): string => {
      const ua = navigator.userAgent;
      if (ua.includes('Firefox')) return 'Firefox';
      if (ua.includes('SamsungBrowser')) return 'Samsung Browser';
      if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
      if (ua.includes('Trident')) return 'Internet Explorer';
      if (ua.includes('Edge')) return 'Edge';
      if (ua.includes('Chrome')) return 'Chrome';
      if (ua.includes('Safari')) return 'Safari';
      return 'Unknown';
    };

    // Detect OS
    const getOS = (): string => {
      const ua = navigator.userAgent;
      if (ua.includes('Win')) return 'Windows';
      if (ua.includes('Mac')) return 'macOS';
      if (ua.includes('Linux')) return 'Linux';
      if (ua.includes('Android')) return 'Android';
      if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
      return 'Unknown';
    };

    // Extract UTM parameters from URL
    const getUTMParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return {
        utmSource: urlParams.get('utm_source') || undefined,
        utmMedium: urlParams.get('utm_medium') || undefined,
        utmCampaign: urlParams.get('utm_campaign') || undefined,
        utmContent: urlParams.get('utm_content') || undefined,
        utmTerm: urlParams.get('utm_term') || undefined,
      };
    };

    // Track scroll depth
    const updateScrollDepth = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

      if (scrollPercentage > maxScrollRef.current) {
        maxScrollRef.current = Math.min(scrollPercentage, 100);
      }
    };

    // Track pages viewed in session
    const updatePagesViewed = () => {
      const pagesKey = 'session_pages_viewed';
      const currentPages = parseInt(sessionStorage.getItem(pagesKey) || '0');
      const newPages = currentPages + 1;
      sessionStorage.setItem(pagesKey, newPages.toString());
      sessionPagesRef.current = newPages;
    };

    // Send visitor data to API
    const sendVisitorData = async () => {
      if (hasTrackedRef.current) return; // Prevent duplicate sends
      hasTrackedRef.current = true;

      const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000); // seconds

      const visitorData: VisitorData = {
        url: window.location.href,
        pageTitle: document.title,
        timeOnPage,
        pagesViewed: sessionPagesRef.current,
        scrollDepth: maxScrollRef.current,
        device: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
        referrer: document.referrer || 'direct',
        visitorId: getVisitorId(),
        sessionId: getSessionId(),
        ...getUTMParams(),
      };

      try {
        const response = await fetch('/api/visitor-intel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(visitorData),
        });

        if (!response.ok) {
          console.warn('Visitor tracking failed:', response.status);
        }
      } catch (error) {
        console.warn('Visitor tracking error:', error);
        // Silently fail - don't break user experience
      }
    };

    // Initialize tracking
    startTimeRef.current = Date.now();
    maxScrollRef.current = 0;
    hasTrackedRef.current = false;
    updatePagesViewed();

    // Add scroll listener
    window.addEventListener('scroll', updateScrollDepth);

    // Track after minimum engagement time (10 seconds)
    const minEngagementTimer = setTimeout(() => {
      sendVisitorData();
    }, 10000);

    // Track on page unload (user leaving)
    const handleUnload = () => {
      sendVisitorData();
    };
    window.addEventListener('beforeunload', handleUnload);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateScrollDepth);
      window.removeEventListener('beforeunload', handleUnload);
      clearTimeout(minEngagementTimer);
    };
  }, [pathname]);

  // This component doesn't render anything
  return null;
}
