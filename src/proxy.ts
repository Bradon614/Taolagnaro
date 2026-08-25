import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/i18n/config";

/**
 * French is served without a prefix, so `/explorer` is rewritten internally to
 * `/fr/explorer`. Every URL shared before this change keeps working, and the
 * other locales get real, indexable URLs of their own.
 */
/**
 * File-based metadata routes. Next resolves the locale for these itself, and
 * they must reach it untouched — rewriting or redirecting one sends the
 * request round in a circle.
 */
const METADATA = /^(opengraph-image|twitter-image|icon|apple-icon|sitemap|robots|manifest)([-.].*)?$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  // Guarded here as well as in the matcher: the matcher only sees the start of
  // the path, so it catches /opengraph-image but not /fr/opengraph-image.
  if (segments.length > 0 && METADATA.test(segments[segments.length - 1])) {
    return NextResponse.next();
  }

  const first = segments[0];

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
    // Everything except Next internals, static files, and the file-based
    // metadata routes.
    //
    // opengraph-image and friends have no file extension, so without naming
    // them here they get rewritten to /fr/... — which this same proxy then
    // redirects back to the unprefixed path, and the request loops forever.
    // Metadata routes are locale-resolved by Next itself and must pass
    // through untouched.
    "/((?!_next|favicon.ico|opengraph-image|twitter-image|icon|apple-icon|sitemap|robots|manifest|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};

export const LOCALE_LIST = LOCALES;
