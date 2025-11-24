'use client';

import { usePathname, useRouter } from 'next/navigation';

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export function LanguageSwitcher({ isMobile = false }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isPolish = pathname.startsWith('/pl');

  const switchLanguage = (lang: 'en' | 'pl') => {
    // Zapisz cookie
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;

    // Przełącz URL
    if (lang === 'pl' && !isPolish) {
      router.push(`/pl${pathname}`);
    } else if (lang === 'en' && isPolish) {
      const newPath = pathname.replace(/^\/pl/, '') || '/';
      router.push(newPath);
    }
  };

  // Mobile: chips style
  if (isMobile) {
    return (
      <div className="flex items-center gap-3 text-xs">
        <button
          onClick={() => switchLanguage('en')}
          className={`transition-colors ${
            !isPolish
              ? 'font-semibold text-blue-600'
              : 'font-medium text-slate-500'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <span className="h-3 w-px bg-slate-200"></span>
        <button
          onClick={() => switchLanguage('pl')}
          className={`transition-colors ${
            isPolish
              ? 'font-semibold text-blue-600'
              : 'font-medium text-slate-500'
          }`}
          aria-label="Przełącz na polski"
        >
          PL
        </button>
      </div>
    );
  }

  // Desktop: original style
  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-2 py-1 rounded transition-colors ${
          !isPolish
            ? 'font-semibold text-blue-600'
            : 'text-gray-500 hover:text-gray-900'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => switchLanguage('pl')}
        className={`px-2 py-1 rounded transition-colors ${
          isPolish
            ? 'font-semibold text-blue-600'
            : 'text-gray-500 hover:text-gray-900'
        }`}
        aria-label="Przełącz na polski"
      >
        PL
      </button>
    </div>
  );
}
