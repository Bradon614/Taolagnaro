"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/LocaleProvider";
import { LOCALE_META, LOCALES, localeHref, splitLocale } from "@/i18n/config";

/**
 * Language is a first-class control, not a footer link — a francophone or
 * anglophone visitor looks for it immediately.
 *
 * Each option is a real link to the same page in that language, so switching
 * is bookmarkable and the back button behaves.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const { locale: current, t } = useLocale();

  // usePathname includes the rewritten /fr prefix, so strip it before
  // re-prefixing for the target locale.
  const { path } = splitLocale(pathname);

  return (
    <p
      className={`flex items-center gap-1.5 font-mono text-label tracking-[0.1em] ${className ?? ""}`}
    >
      <span className="sr-only">{t.common.languageLabel}</span>
      {LOCALES.map((locale) => {
        const meta = LOCALE_META[locale];
        const active = locale === current;

        return (
          <Link
            key={locale}
            href={localeHref(locale, path)}
            hrefLang={meta.htmlLang}
            aria-current={active ? "true" : undefined}
            title={
              meta.complete
                ? meta.name
                : `${meta.name} — ${t.common.translationPending}`
            }
            className={
              active
                ? "font-semibold"
                : meta.complete
                  ? "opacity-55 hover:opacity-100"
                  : "opacity-40 hover:opacity-70"
            }
          >
            {meta.label}
            {meta.complete ? null : (
              <span aria-hidden="true" className="ml-0.5 align-super text-[0.7em]">
                *
              </span>
            )}
          </Link>
        );
      })}
    </p>
  );
}
