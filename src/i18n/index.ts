import { fr, type Dictionary } from "@/i18n/dictionaries/fr";
import { en } from "@/i18n/dictionaries/en";
import { mg } from "@/i18n/dictionaries/mg";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import type { DeepPartial } from "@/i18n/types";

export type { Dictionary };

/**
 * Merges a partial locale over French so a half-finished translation renders
 * the strings it has and falls back for the rest, rather than showing blanks.
 */
function merge<T>(base: T, override: DeepPartial<T>): T {
  const result = { ...base } as T;
  for (const key of Object.keys(override) as (keyof T)[]) {
    const value = override[key];
    if (value === undefined) continue;
    result[key] =
      typeof value === "object" && value !== null && !Array.isArray(value)
        ? merge(base[key], value as DeepPartial<T[keyof T]>)
        : (value as T[keyof T]);
  }
  return result;
}

const DICTIONARIES: Record<Locale, Dictionary> = {
  fr,
  en,
  mg: merge(fr, mg),
};

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

/**
 * Substitutes {placeholders}. Deliberately tiny: the alternative is a full
 * ICU runtime for a handful of interpolations and no plural rules beyond
 * one/other, which the dictionaries handle with separate keys.
 */
export function fill(
  template: string,
  values: Record<string, string | number> = {},
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
