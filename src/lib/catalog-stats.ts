/**
 * Catalogue counts, derived from the catalog itself.
 *
 * These used to be hard-coded in site.ts and drifted from reality: the header
 * advertised 92 places while 26 records existed, then the catalogue was
 * replaced entirely. Deriving them means the navigation can never lie about how
 * many listings there are.
 *
 * Kept in its own module because `listings.ts` imports a type from `site.ts`;
 * putting the derivation here keeps that edge type-only and the runtime graph
 * acyclic.
 */

import { LISTINGS } from "@/lib/listings";
import type { CategorySlug } from "@/lib/site";

const CATEGORY_SLUGS: CategorySlug[] = [
  "sites",
  "hotels",
  "restaurants",
  "activites",
  "excursions",
  "experiences",
];

export const CATEGORY_COUNTS: Record<CategorySlug, number> = CATEGORY_SLUGS.reduce(
  (counts, slug) => {
    counts[slug] = LISTINGS.filter((listing) => listing.category === slug).length;
    return counts;
  },
  {} as Record<CategorySlug, number>,
);

export const TOTAL_LISTINGS = LISTINGS.length;