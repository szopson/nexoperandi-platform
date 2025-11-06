import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexoperandi.ai';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/demos/'], // Prevent crawling API routes and demo pages
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
