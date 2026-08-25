/**
 * The canonical origin, and the one list of what search engines should see.
 *
 * Kept apart from the route files so the sitemap, robots and metadata cannot
 * disagree about which pages are public.
 */

import { LISTINGS, listingHref } from "@/lib/listings";
import { CATEGORIES } from "@/lib/site";
import { LOCALES, localeHref, type Locale } from "@/i18n/config";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://taolagnaro.mg";

/**
 * Locale-agnostic paths worth indexing.
 *
 * Deliberately excluded: /envies (a device-local list, different for everyone),
 * /demande/* and the request forms (they carry personal data and are already
 * marked noindex). Listing them would invite crawlers into pages that mean
 * nothing without the visitor's own session.
 */
export function indexablePaths(): { path: string; priority: number }[] {
  return [
    { path: "/", priority: 1 },
    { path: "/explorer", priority: 0.9 },
    ...CATEGORIES.map((category) => ({
      path: `/explorer/${category.slug}`,
      priority: 0.8,
    })),
    { path: "/carte", priority: 0.7 },
    { path: "/decouvrir", priority: 0.8 },
    ...LISTINGS.map((listing) => ({
      path: listingHref(listing),
      priority: 0.7,
    })),
    { path: "/contact", priority: 0.4 },
    { path: "/credits", priority: 0.2 },
    { path: "/mentions-legales", priority: 0.1 },
    { path: "/confidentialite", priority: 0.1 },
  ];
}

export function absolute(locale: Locale, path: string): string {
  return `${SITE_URL}${localeHref(locale, path)}`;
}

/** hreflang map for one path, so each language points at its siblings. */
export function alternatesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = absolute(locale, path);
  }
  // Tells a crawler which version to serve when no language matches.
  languages["x-default"] = absolute("fr", path);
  return languages;
}
