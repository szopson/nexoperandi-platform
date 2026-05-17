import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexoperandi.cloud';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      { userAgent: 'GPTBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/api/'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Claude-Web', allow: '/', disallow: ['/api/'] },
      { userAgent: 'anthropic-ai', allow: '/', disallow: ['/api/'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Perplexity-User', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/api/'] },
      { userAgent: 'CCBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Bytespider', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Claude-SearchBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Meta-ExternalAgent', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Meta-ExternalFetcher', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Amazonbot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'cohere-ai', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Cohere-AI', allow: '/', disallow: ['/api/'] },
      { userAgent: 'DuckAssistBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'MistralAI-User', allow: '/', disallow: ['/api/'] },
      { userAgent: 'YouBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'PetalBot', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
