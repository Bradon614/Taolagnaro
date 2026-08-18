/**
 * Locale configuration.
 *
 * French is the default and is served without a URL prefix, so every link
 * already shared keeps working; English and Malagasy live under /en and /mg.
 * The locale is in the URL rather than a cookie because a tourism site needs
 * each language to be separately linkable and indexable.
 */

export const LOCALES = ["fr", "en", "mg"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

export const LOCALE_META: Record<
  Locale,
  { label: string; name: string; htmlLang: string; complete: boolean }
> = {
  fr: { label: "FR", name: "Français", htmlLang: "fr", complete: true },
  en: { label: "EN", name: "English", htmlLang: "en", complete: true },
  // Scaffolded, not yet written: see the note in dictionaries/mg.ts.
  mg: { label: "MG", name: "Malagasy", htmlLang: "mg", complete: false },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Prefixes a path for a locale. French is unprefixed. */
export function localeHref(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** Splits a pathname into its locale and the path without the prefix. */
export function splitLocale(pathname: string): {
  locale: Locale;
  path: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    return {
      locale: segments[0],
      path: `/${segments.slice(1).join("/")}`.replace(/\/$/, "") || "/",
    };
  }
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}
