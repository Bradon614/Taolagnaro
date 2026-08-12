/**
 * Catalog search.
 *
 * Accent-insensitive by design: a visitor typing "reserve nahampoana" on a
 * phone keyboard must find "Réserve de Nahampoana". In French content this is
 * not a nicety — without it most searches fail.
 */

import { LISTINGS, type Listing } from "@/lib/listings";

/** Lowercase, strip diacritics, collapse whitespace. */
export function normalise(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[’']/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function haystack(listing: Listing): string {
  return normalise(
    [
      listing.name,
      listing.place,
      listing.summary,
      listing.cuisine ?? "",
      listing.level ?? "",
      listing.duration ?? "",
    ].join(" "),
  );
}

/** True when every word in the query appears somewhere in the record. */
export function listingMatches(listing: Listing, query: string): boolean {
  const words = normalise(query).split(" ").filter(Boolean);
  if (words.length === 0) return true;
  const target = haystack(listing);
  return words.every((word) => target.includes(word));
}

/**
 * Ranked results for the search overlay. A hit on the name beats a hit on the
 * place, which beats a hit buried in the description — otherwise typing a
 * village name surfaces every listing that merely mentions it.
 */
export function searchListings(query: string, limit = 6): Listing[] {
  const words = normalise(query).split(" ").filter(Boolean);
  if (words.length === 0) return [];

  return LISTINGS.map((listing) => {
    const name = normalise(listing.name);
    const place = normalise(listing.place);
    const all = haystack(listing);

    if (!words.every((word) => all.includes(word))) return null;

    let score = 0;
    for (const word of words) {
      if (name.startsWith(word)) score += 6;
      else if (name.includes(word)) score += 4;
      else if (place.includes(word)) score += 2;
      else score += 1;
    }
    // Nudge places people are likely to mean.
    if (listing.featuredRank) score += 1;

    return { listing, score };
  })
    .filter((entry): entry is { listing: Listing; score: number } => entry !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.listing);
}

/** Suggestions offered before anything has been typed. */
export const SUGGESTED_QUERIES = [
  "Libanona",
  "Sainte-Luce",
  "lémuriens",
  "surf",
  "chez l’habitant",
  "poisson grillé",
];
