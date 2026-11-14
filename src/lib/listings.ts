/**
 * The catalog.
 *
 * One record shape for every category — a beach, a lodge, a grilled-fish place
 * and a pirogue crossing all share the same core fields, and categories only
 * add to them. That is what lets search, filters, the map and "nearby" be
 * written once.
 *
 * REAL CONTENT since 2026-11-14. The records come from the research dataset in
 * `research/*.json`, through `scripts/gen-listings-data.py`, and are published
 * only for establishments whose identity and locality are confirmed:
 * `verified` and `partially_verified` records. The 13 records excluded in
 * `research/quality-audit.md` and the closed records never reach this file, and
 * the 111 records still awaiting verification stay out until they are confirmed.
 *
 * Two fields can now be null, and that is deliberate:
 *   - `distanceKm` — 63 of the 69 records have no sourced distance. A fabricated
 *     0 would sort them to the top of "nearest first".
 *   - `coordinates` — 22 records have no surveyed position. They stay in the
 *     catalogue and off the map; the town centre is not used as a stand-in.
 */

import type { CategorySlug } from "@/lib/site";
import type { Price } from "@/lib/money";
import type { PlateVariant } from "@/components/media/Plate";
import { distanceKm as greatCircleKm, type Coordinates } from "@/lib/geo";
import { RAW_LISTINGS } from "@/lib/listings-data";

export type ListingContact = {
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
};

export type Listing = {
  slug: string;
  category: CategorySlug;
  name: string;
  /** Neighbourhood or village, as a visitor would say it. */
  place: string;
  /**
   * Kilometres from the centre of Taolagnaro, when a source states it. `null`
   * means unknown — never 0, which would corrupt distance sorting.
   */
  distanceKm: number | null;
  summary: string;
  plate: PlateVariant;
  price: Price;
  rating?: { score: number; count: number };
  /**
   * False for public places with nobody to receive a request — a beach has no
   * owner, and a gold "Demander" button on one would read as fake.
   */
  acceptsRequests: boolean;
  /** Activities, excursions, experiences. */
  duration?: string;
  /** Restaurants. */
  cuisine?: string;
  /** Activities: Débutant / Sportif / En famille. */
  level?: string;
  /** Sites: how you get in. */
  access?: string;
  /** Sites: notable elevation. */
  elevation?: string;
  badge?: { label: string; tone: "accent" | "outline" | "warm" };
  /** Position in the home mosaic; absent means not featured. */
  featuredRank?: number;
  /** `null` when no surveyed position is known: the record is listed, not mapped. */
  coordinates: Coordinates | null;
  /**
   * Contact details as published by the source. Absent when the research found
   * none. Individual keys are absent, never empty or placeholder, and a phone
   * judged unreliable by the quality audit is left out rather than shown.
   */
  contact?: ListingContact;
  /** Filterable attributes. See TAG_LABELS in filters.ts. */
  tags: string[];
};

export const LISTINGS: Listing[] = RAW_LISTINGS;

/** Closest listings by straight-line distance, excluding the subject itself. */
export function nearbyListings(listing: Listing, limit = 4): Listing[] {
  const origin = listing.coordinates;
  // Without a position there is no "nearby": say nothing rather than guess.
  if (!origin) return [];

  return LISTINGS.filter(
    (other) => other.slug !== listing.slug && other.coordinates !== null,
  )
    .map((other) => ({
      other,
      km: greatCircleKm(origin, other.coordinates as Coordinates),
    }))
    .sort((a, b) => a.km - b.km)
    .slice(0, limit)
    .map((entry) => entry.other);
}

/** Straight-line distance between two listings, or null if either is unmapped. */
export function kmBetween(a: Listing, b: Listing): number | null {
  if (!a.coordinates || !b.coordinates) return null;
  return greatCircleKm(a.coordinates, b.coordinates);
}

export function listingsByCategory(category: CategorySlug): Listing[] {
  return LISTINGS.filter((listing) => listing.category === category);
}

export function featuredListings(): Listing[] {
  return LISTINGS.filter((listing) => listing.featuredRank !== undefined).sort(
    (a, b) => a.featuredRank! - b.featuredRank!,
  );
}

export function listingBySlug(slug: string): Listing | undefined {
  return LISTINGS.find((listing) => listing.slug === slug);
}

/** Detail route for a listing, e.g. /hotels/kaleta-hotel. */
export function listingHref(listing: Listing): string {
  return `/${listing.category}/${listing.slug}`;
}