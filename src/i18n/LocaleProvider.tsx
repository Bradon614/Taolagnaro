"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LOCALE, localeHref, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n";

/**
 * Client components read the locale and dictionary from context rather than
 * from the URL, so they never have to re-derive it or wait for a hook.
 */
const LocaleContext = createContext<{ locale: Locale; t: Dictionary }>({
  locale: DEFAULT_LOCALE,
  t: getDictionary(DEFAULT_LOCALE),
});

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, t: getDictionary(locale) }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

/** Builds a locale-aware href from a locale-agnostic path. */
export function useHref() {
  const { locale } = useLocale();
  return (path: string) => localeHref(locale, path);
}
