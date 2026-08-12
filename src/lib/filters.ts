/**
 * Filtering, faceting and sorting for the catalog.
 *
 * State lives entirely in the query string. That is deliberate: a visitor can
 * send "the four-star places near Libanona" to a travel companion as a link,
 * the back button behaves, and the whole page renders on the server without
 * waiting for JavaScript.
 */

import { LISTINGS, type Listing } from "@/lib/listings";
import type { CategorySlug } from "@/lib/site";

export const PAGE_SIZE = 9;

/* ------------------------------------------------------------------ zones */

export type ZoneSlug =
  | "centre"
  | "vinanibe"
  | "sainte-luce"
  | "lokaro"
  | "arriere-pays";

export const ZONES: { slug: ZoneSlug; label: string }[] = [
  { slug: "centre", label: "Libanona & centre-ville" },
  { slug: "vinanibe", label: "Vinanibe & Ambinanibe" },
  { slug: "sainte-luce", label: "Sainte-Luce" },
  { slug: "lokaro", label: "Lokaro & Évatraha" },
  { slug: "arriere-pays", label: "Arrière-pays" },
];

const PLACE_TO_ZONE: Record<string, ZoneSlug> = {
  "Presqu’île": "centre",
  "Centre-ville": "centre",
  Libanona: "centre",
  Marché: "centre",
  "Vieille ville": "centre",
  Port: "centre",
  Vinanibe: "vinanibe",
  Ambinanibe: "vinanibe",
  "Sainte-Luce": "sainte-luce",
  Lokaro: "lokaro",
  Nahampoana: "arriere-pays",
  "Vallée du Mandrare": "arriere-pays",
  "Village d’Ankaramena": "arriere-pays",
};

export function zoneOf(listing: Listing): ZoneSlug {
  return PLACE_TO_ZONE[listing.place] ?? "arriere-pays";
}

/* ------------------------------------------------------------------- tags */

export const TAG_LABELS: Record<string, string> = {
  "vue-mer": "Vue sur mer",
  plage: "Accès plage",
  wifi: "Wi-Fi",
  restaurant: "Restaurant sur place",
  transfert: "Transfert aéroport",
  generateur: "Groupe électrogène",
  parking: "Parking",
  terrasse: "Terrasse",
  "petit-dejeuner": "Petit-déjeuner inclus",
  "guide-fr": "Guide francophone",
  famille: "En famille",
  communautaire: "Géré par la communauté",
};

/* ------------------------------------------------------------------ price */

/** A single comparable number per listing, for range filtering and sorting. */
export function priceValue(listing: Listing): number {
  switch (listing.price.kind) {
    case "from":
      return listing.price.amount;
    case "range":
      return listing.price.min;
    default:
      return 0;
  }
}

/* ------------------------------------------------------------------ state */

export type SortKey =
  | "recommandes"
  | "note"
  | "prix-croissant"
  | "prix-decroissant"
  | "distance";

export const SORTS: { key: SortKey; label: string }[] = [
  { key: "recommandes", label: "Recommandés" },
  { key: "note", label: "Mieux notés" },
  { key: "prix-croissant", label: "Prix croissant" },
  { key: "prix-decroissant", label: "Prix décroissant" },
  { key: "distance", label: "Distance du centre" },
];

export type Filters = {
  categories: CategorySlug[];
  zones: ZoneSlug[];
  tags: string[];
  /** Minimum average rating, e.g. 4. */
  minRating?: number;
  maxPrice?: number;
  query: string;
  sort: SortKey;
  limit: number;
};

export type SearchParams = Record<string, string | string[] | undefined>;

function list(value: string | string[] | undefined): string[] {
  if (!value) return [];
  const raw = Array.isArray(value) ? value : [value];
  return raw.flatMap((entry) => entry.split(",")).filter(Boolean);
}

export function parseFilters(
  params: SearchParams,
  forcedCategory?: CategorySlug,
): Filters {
  const sortParam = String(params.tri ?? "");
  const sort = SORTS.some((entry) => entry.key === sortParam)
    ? (sortParam as SortKey)
    : "recommandes";

  const rating = Number(params.note);
  const maxPrice = Number(params.budget);
  const limit = Number(params.afficher);

  return {
    categories: forcedCategory
      ? [forcedCategory]
      : (list(params.categorie) as CategorySlug[]),
    zones: list(params.lieu) as ZoneSlug[],
    tags: list(params.tag),
    minRating: Number.isFinite(rating) && rating > 0 ? rating : undefined,
    maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : undefined,
    query: String(params.q ?? "").trim(),
    sort,
    limit: Number.isFinite(limit) && limit > 0 ? limit : PAGE_SIZE,
  };
}

/** Filters the visitor can clear, ignoring a category fixed by the route. */
export function activeFilterCount(
  filters: Filters,
  categoryFromRoute: boolean,
): number {
  return (
    (categoryFromRoute ? 0 : filters.categories.length) +
    filters.zones.length +
    filters.tags.length +
    (filters.minRating ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) +
    (filters.query ? 1 : 0)
  );
}

/* ----------------------------------------------------------------- apply */

function matchesQuery(listing: Listing, query: string): boolean {
  if (!query) return true;
  const haystack =
    `${listing.name} ${listing.place} ${listing.summary} ${listing.cuisine ?? ""}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

/**
 * Applies every dimension except one, so facet counts can answer "how many
 * results would I get if I also ticked this?" rather than reporting the
 * current result set back at itself.
 */
function matches(
  listing: Listing,
  filters: Filters,
  skip?: "categories" | "zones" | "tags" | "minRating" | "maxPrice",
): boolean {
  if (
    skip !== "categories" &&
    filters.categories.length > 0 &&
    !filters.categories.includes(listing.category)
  ) {
    return false;
  }
  if (
    skip !== "zones" &&
    filters.zones.length > 0 &&
    !filters.zones.includes(zoneOf(listing))
  ) {
    return false;
  }
  if (
    skip !== "tags" &&
    filters.tags.length > 0 &&
    !filters.tags.every((tag) => listing.tags.includes(tag))
  ) {
    return false;
  }
  if (
    skip !== "minRating" &&
    filters.minRating &&
    (listing.rating?.score ?? 0) < filters.minRating
  ) {
    return false;
  }
  if (
    skip !== "maxPrice" &&
    filters.maxPrice &&
    priceValue(listing) > filters.maxPrice
  ) {
    return false;
  }
  return matchesQuery(listing, filters.query);
}

export function filterListings(filters: Filters): Listing[] {
  return LISTINGS.filter((listing) => matches(listing, filters));
}

export function sortListings(listings: Listing[], sort: SortKey): Listing[] {
  const sorted = [...listings];
  switch (sort) {
    case "note":
      return sorted.sort(
        (a, b) => (b.rating?.score ?? 0) - (a.rating?.score ?? 0),
      );
    case "prix-croissant":
      return sorted.sort((a, b) => priceValue(a) - priceValue(b));
    case "prix-decroissant":
      return sorted.sort((a, b) => priceValue(b) - priceValue(a));
    case "distance":
      return sorted.sort((a, b) => a.distanceKm - b.distanceKm);
    default:
      // Editorial order: featured places first, then the best rated.
      return sorted.sort((a, b) => {
        const rankA = a.featuredRank ?? 99;
        const rankB = b.featuredRank ?? 99;
        if (rankA !== rankB) return rankA - rankB;
        return (b.rating?.score ?? 0) - (a.rating?.score ?? 0);
      });
  }
}

/* ----------------------------------------------------------------- facets */

export type Facet = { value: string; label: string; count: number };

function countWith(
  filters: Filters,
  dimension: "categories" | "zones" | "tags" | "minRating",
  predicate: (listing: Listing) => boolean,
): number {
  return LISTINGS.filter(
    (listing) => matches(listing, filters, dimension) && predicate(listing),
  ).length;
}

export function zoneFacets(filters: Filters): Facet[] {
  return ZONES.map((zone) => ({
    value: zone.slug,
    label: zone.label,
    count: countWith(filters, "zones", (l) => zoneOf(l) === zone.slug),
  }));
}

export function tagFacets(filters: Filters, tags: string[]): Facet[] {
  return tags.map((tag) => ({
    value: tag,
    label: TAG_LABELS[tag] ?? tag,
    count: countWith(filters, "tags", (l) => l.tags.includes(tag)),
  }));
}

export function ratingFacets(filters: Filters): Facet[] {
  return [4, 3].map((threshold) => ({
    value: String(threshold),
    label: `${threshold} étoiles et plus`,
    count: countWith(
      filters,
      "minRating",
      (l) => (l.rating?.score ?? 0) >= threshold,
    ),
  }));
}

/** Tags worth offering, in a stable order, limited to ones that exist. */
export function availableTags(): string[] {
  const present = new Set(LISTINGS.flatMap((listing) => listing.tags));
  return Object.keys(TAG_LABELS).filter((tag) => present.has(tag));
}

/* ------------------------------------------------------------- url making */

/**
 * Builds an href with one parameter changed. Multi-value params toggle;
 * changing any filter resets pagination, because keeping "show 27" while
 * narrowing to 4 results reads as broken.
 */
export function buildHref(
  basePath: string,
  params: SearchParams,
  change: { key: string; value?: string; toggle?: boolean },
): string {
  const next = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    for (const entry of Array.isArray(value) ? value : [value]) {
      if (entry) next.append(key, entry);
    }
  }

  next.delete("afficher");

  if (change.toggle && change.value) {
    const current = next.getAll(change.key).flatMap((v) => v.split(","));
    next.delete(change.key);
    const updated = current.includes(change.value)
      ? current.filter((v) => v !== change.value)
      : [...current, change.value];
    if (updated.length > 0) next.set(change.key, updated.join(","));
  } else if (change.value) {
    next.set(change.key, change.value);
  } else {
    next.delete(change.key);
  }

  const query = next.toString();
  return query ? `${basePath}?${query}` : basePath;
}

/* ---------------------------------------------------------------- budget */

/**
 * Bands rather than a two-handle slider.
 *
 * The approved design drew a slider, but a slider cannot show how many results
 * each position would return, and the catalog's own rule is that every filter
 * option carries a live count. Bands keep that promise, work without
 * JavaScript, and survive being shared as a link.
 */
export const BUDGET_BANDS: { value: number; label: string }[] = [
  { value: 80000, label: "Moins de 80 000 Ar" },
  { value: 150000, label: "Moins de 150 000 Ar" },
  { value: 300000, label: "Moins de 300 000 Ar" },
];

export function budgetFacets(filters: Filters): Facet[] {
  return BUDGET_BANDS.map((band) => ({
    value: String(band.value),
    label: band.label,
    count: LISTINGS.filter(
      (listing) =>
        matches(listing, filters, "maxPrice") && priceValue(listing) <= band.value,
    ).length,
  }));
}
