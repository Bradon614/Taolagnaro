/**
 * Single source of truth for the platform's taxonomy and navigation.
 *
 * The approved architecture is one catalog seen through six category lenses,
 * so the category list below drives the header mega-panel, the footer, the
 * category routes and (later) the filter bar. Adding a seventh category is a
 * change to this file, not a new section of the site.
 */

import type { PlateVariant } from "@/components/media/Plate";

export const SITE = {
  name: "Taolagnaro",
  region: "Région Anosy, Madagascar",
  coordinates: "25°02′S 46°59′E",
  email: "bonjour@taolagnaro.mg",
  phone: "+261 34 00 000 00",
  /** Digits only, for wa.me links. */
  whatsapp: "261340000000",
} as const;

export type CategorySlug =
  | "sites"
  | "hotels"
  | "restaurants"
  | "activites"
  | "excursions"
  | "experiences";

export type Category = {
  slug: CategorySlug;
  /** Plural label used in navigation and page titles. */
  label: string;
  tagline: string;
  plate: PlateVariant;
  /**
   * Placeholder count from the approved design. Replaced by a derived count
   * once the listing data layer lands.
   */
  count: number;
};

export const CATEGORIES: Category[] = [
  {
    slug: "sites",
    label: "Sites touristiques",
    tagline: "Plages, pics, réserves",
    plate: "sand",
    count: 24,
  },
  {
    slug: "hotels",
    label: "Hôtels",
    tagline: "Lodges, chambres d’hôtes",
    plate: "reef",
    count: 18,
  },
  {
    slug: "restaurants",
    label: "Restaurants",
    tagline: "Cuisine antanosy, poisson",
    plate: "sunset",
    count: 15,
  },
  {
    slug: "activites",
    label: "Activités",
    tagline: "Surf, pirogue, plongée",
    plate: "ocean",
    count: 19,
  },
  {
    slug: "excursions",
    label: "Excursions",
    tagline: "Berenty, Sainte-Luce",
    plate: "forest",
    count: 7,
  },
  {
    slug: "experiences",
    label: "Expériences",
    tagline: "Cuisine, artisanat, musique",
    plate: "town",
    count: 9,
  },
];

export const TOTAL_LISTINGS = CATEGORIES.reduce(
  (sum, category) => sum + category.count,
  0,
);

export function categoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

/** Primary destinations. Four is the ceiling — Explore absorbs the six categories. */
export const PRIMARY_NAV = [
  { href: "/explorer", label: "Explorer", hasMenu: true },
  { href: "/carte", label: "Carte", hasMenu: false },
  { href: "/decouvrir", label: "Découvrir Taolagnaro", hasMenu: false },
  { href: "/contact", label: "Contact", hasMenu: false },
] as const;

/** Shortcuts shown alongside the categories in the Explore mega-panel. */
export const EXPLORE_SHORTCUTS = [
  { href: "/explorer", label: `Tout explorer (${TOTAL_LISTINGS} lieux)` },
  { href: "/carte", label: "Ouvrir la carte" },
  { href: "/explorer?lieu=sainte-luce", label: "Baie de Sainte-Luce" },
  { href: "/decouvrir", label: "Idées pour 3 jours" },
];

/**
 * Routes whose hero sits under a transparent header. A route only belongs here
 * once it actually has a full-bleed hero — white-on-white otherwise.
 * `/decouvrir` joins this list when its editorial hero is built.
 */
export const OVERLAY_HEADER_ROUTES = ["/"];

export const FOOTER_COLUMNS = [
  {
    heading: "Explorer",
    links: CATEGORIES.map((category) => ({
      href: `/explorer/${category.slug}`,
      label: category.label,
    })),
  },
  {
    heading: "La région",
    links: [
      { href: "/decouvrir", label: "Découvrir Taolagnaro" },
      { href: "/decouvrir#histoire", label: "Histoire" },
      { href: "/decouvrir#nature", label: "Nature & plages" },
      { href: "/decouvrir#culture", label: "Culture antanosy" },
      { href: "/decouvrir#pratique", label: "Infos pratiques" },
      { href: "/carte", label: "Carte" },
    ],
  },
  {
    heading: "Prestataires",
    links: [
      { href: "/contact", label: "Référencer mon établissement" },
      { href: "/contact", label: "Comment ça marche" },
      { href: "/contact", label: "Contact" },
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/confidentialite", label: "Confidentialité" },
    ],
  },
] as const;

export const LANGUAGES = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "en", label: "EN", name: "English" },
  { code: "mg", label: "MG", name: "Malagasy" },
] as const;
