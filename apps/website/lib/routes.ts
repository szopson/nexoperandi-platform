export const routeMap: Record<string, Record<'en' | 'pl', string>> = {
  '/': { en: '/', pl: '/pl' },
  '/solutions': { en: '/solutions', pl: '/pl/rozwiazania' },
  '/pricing': { en: '/pricing', pl: '/pl/cennik' },
  '/demo': { en: '/demo', pl: '/pl/demo' },
  '/pipeline-audit': { en: '/pipeline-audit', pl: '/pl/audyt-automatyzacji' },
  '/contact': { en: '/contact', pl: '/pl/contact' },
};

/**
 * Given a pathname, find its equivalent in the target language.
 * Falls back to the target language homepage if no match found.
 */
export function getLocalizedPath(pathname: string, targetLang: 'en' | 'pl'): string {
  // Normalize: strip /pl prefix to get the canonical route key
  const normalizedPath = pathname.replace(/^\/pl/, '') || '/';

  // Also check if the PL path itself is a known route value
  for (const [, langPaths] of Object.entries(routeMap)) {
    if (langPaths.en === normalizedPath || langPaths.pl === pathname) {
      return langPaths[targetLang];
    }
  }

  // Fallback: simple prefix swap
  if (targetLang === 'pl') {
    return `/pl${normalizedPath === '/' ? '' : normalizedPath}`;
  }
  return normalizedPath;
}
