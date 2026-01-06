import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'NEXT_LOCALE';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignoruj API routes, assets, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/assets') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Jeśli już jest na /pl, nie rób nic
  if (pathname.startsWith('/pl')) {
    return NextResponse.next();
  }

  // Tylko dla root path - wykrywanie języka
  if (pathname === '/') {
    // 1. Sprawdź cookie z zapisaną preferencją
    const savedLang = request.cookies.get(COOKIE_NAME)?.value;
    if (savedLang === 'pl') {
      return NextResponse.redirect(new URL('/pl', request.url));
    }
    // Jeśli cookie = 'en', zostań na / (nie przekierowuj)
    if (savedLang === 'en') {
      return NextResponse.next();
    }

    // 2. Sprawdź Accept-Language header (tylko jeśli brak cookie)
    const acceptLanguage = request.headers.get('accept-language') || '';
    const isPolish = acceptLanguage.toLowerCase().startsWith('pl') ||
                     acceptLanguage.toLowerCase().includes(',pl') ||
                     acceptLanguage.toLowerCase().includes(', pl');

    if (isPolish) {
      const response = NextResponse.redirect(new URL('/pl', request.url));
      response.cookies.set(COOKIE_NAME, 'pl', {
        maxAge: 60 * 60 * 24 * 365, // 1 rok
        path: '/',
      });
      return response;
    }

    // 3. Default: zostań na / (EN) i zapisz cookie
    const response = NextResponse.next();
    response.cookies.set(COOKIE_NAME, 'en', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - assets folder
     */
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
