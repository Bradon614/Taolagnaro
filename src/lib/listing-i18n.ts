/**
 * Locale-aware accessors for catalog content.
 *
 * Every component reads listing text through these rather than off the record
 * directly, so adding a locale is a matter of adding an overlay file.
 */

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import type { Listing } from "@/lib/listings";
import {
  ACCESS_EN,
  CUISINE_EN,
  DURATION_EN,
  PLACES_EN,
  SUMMARIES_EN,
} from "@/lib/listings-en";

const pick = (locale: Locale, table: Record<string, string>, value: string) =>
  locale === "en" ? (table[value] ?? value) : value;

export function listingSummary(listing: Listing, locale: Locale): string {
  if (locale === "en") return SUMMARIES_EN[listing.slug] ?? listing.summary;
  return listing.summary;
}

export function listingPlace(listing: Listing, locale: Locale): string {
  return pick(locale, PLACES_EN, listing.place);
}

export function listingAccess(listing: Listing, locale: Locale) {
  return listing.access ? pick(locale, ACCESS_EN, listing.access) : undefined;
}

export function listingDuration(listing: Listing, locale: Locale) {
  return listing.duration
    ? pick(locale, DURATION_EN, listing.duration)
    : undefined;
}

export function listingCuisine(listing: Listing, locale: Locale) {
  return listing.cuisine ? pick(locale, CUISINE_EN, listing.cuisine) : undefined;
}

export function listingLevel(listing: Listing, locale: Locale) {
  if (!listing.level) return undefined;
  const levels = getDictionary(locale).levels as Record<string, string>;
  return levels[listing.level] ?? listing.level;
}

export function listingBadge(listing: Listing, locale: Locale) {
  if (!listing.badge) return undefined;
  const badges = getDictionary(locale).badges as Record<string, string>;
  return {
    ...listing.badge,
    label: badges[listing.badge.label] ?? listing.badge.label,
  };
}

export function categoryLabel(slug: Listing["category"], locale: Locale) {
  return getDictionary(locale).categories[slug];
}
