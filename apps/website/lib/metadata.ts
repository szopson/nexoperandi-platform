import type { Metadata } from "next";
import { routeMap } from "./routes";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexoperandi.ai';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  lang: 'en' | 'pl';
  keywords?: string[];
  ogImage?: string;
}

export function generatePageMetadata({
  title,
  description,
  path,
  lang,
  keywords,
  ogImage = '/og-default.png',
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const locale = lang === 'pl' ? 'pl_PL' : 'en_US';

  // Find alternate language URL
  const normalizedPath = path.replace(/^\/pl/, '') || '/';
  let enUrl = `${SITE_URL}${path}`;
  let plUrl = `${SITE_URL}/pl${normalizedPath === '/' ? '' : normalizedPath}`;

  for (const [, langPaths] of Object.entries(routeMap)) {
    if (langPaths[lang] === path) {
      enUrl = `${SITE_URL}${langPaths.en}`;
      plUrl = `${SITE_URL}${langPaths.pl}`;
      break;
    }
  }

  return {
    title,
    description,
    ...(keywords && { keywords }),
    openGraph: {
      type: 'website',
      locale,
      url,
      title,
      description,
      siteName: 'NexOperandi',
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: {
        en: enUrl,
        pl: plUrl,
      },
    },
  };
}
