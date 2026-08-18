import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/i18n/config";

/**
 * French is served without a prefix, so `/explorer` is rewritten internally to
 * `/fr/explorer`. Every URL shared before this change keeps working, and the
 * other locales get real, indexable URLs of their own.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/").filter(Boolean)[0];

  if (first && isLocale(first)) {
    // /fr/... is a duplicate of the unprefixed canonical URL; redirect.
    if (first === DEFAULT_LOCALE) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(/^\/fr/, "") || "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Everything except Next internals, the API surface and static files.
    "/((?!_next|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};

export const LOCALE_LIST = LOCALES;
