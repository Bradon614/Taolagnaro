/**
 * Single source of truth for the platform's taxonomy and navigation.
 *
 * The approved architecture is one catalog seen through six category lenses,
 * so the category list below drives the header mega-panel, the footer, the
 * category routes and (later) the filter bar. Adding a seventh category is a
 * change to this file, not a new section of the site.
 */

import type { PlateVariant } from "@/components/media/Plate";
import { CATEGORY_COUNTS, TOTAL_LISTINGS } from "@/lib/catalog-stats";

export { TOTAL_LISTINGS };

export const SITE = {
  name: "Taolagnaro",
  region: "Région Anosy, Madagascar",
  coordinates: "25°02′S 46°59′E",
} as const;

/** Empty string and whitespace are treated as "not configured". */
function optionalEnv(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/**
 * Contact details for the platform itself — not for the establishments, which
 * carry their own sourced contact block on their detail page.
 *
 * Every value comes from the environment and defaults to null. The site used to
 * ship placeholders here (+261 34 00 000 00, wa.me/261340000000,
 * bonjour@taolagnaro.mg, facebook.com, instagram.com). They were linked from the
 * footer, the contact page, the reservation panels and the request confirmation,
 * which sent visitors to a phone number and a WhatsApp account that do not
 * exist. Those are gone.
 *
 * A value that is not configured is null, and every link that depends on it is
 * not rendered. Set the real details in `.env.local` — see `.env.example`:
 *
 *   NEXT_PUBLIC_SITE_PHONE="+261 34 12 345 67"
 *   NEXT_PUBLIC_SITE_WHATSAPP="261341234567"        (digits only)
 *   NEXT_PUBLIC_SITE_EMAIL="bonjour@taolagnaro.mg"
 *   NEXT_PUBLIC_SITE_FACEBOOK="https://www.facebook.com/..."
 *   NEXT_PUBLIC_SITE_INSTAGRAM="https://www.instagram.com/..."
 */
export const SITE_CONTACT = {
  phone: optionalEnv(process.env.NEXT_PUBLIC_SITE_PHONE),
  whatsapp: optionalEnv(process.env.NEXT_PUBLIC_SITE_WHATSAPP),
  email: optionalEnv(process.env.NEXT_PUBLIC_SITE_EMAIL),
  facebook: optionalEnv(process.env.NEXT_PUBLIC_SITE_FACEBOOK),
  instagram: optionalEnv(process.env.NEXT_PUBLIC_SITE_INSTAGRAM),
} as const;

/**
 * A wa.me link, or null when no number is configured. Callers must not render
 * the button when this returns null — that is the whole point of returning null
 * rather than a broken link.
 */
export function whatsappHref(prefilledMessage?: string): string | null {
  const digits = SITE_CONTACT.whatsapp?.replace(/\D/g, "");
  if (!digits) return null;
  const suffix = prefilledMessage ? `?text=${encodeURIComponent(prefilledMessage)}` : "";
  return `https://wa.me/${digits}${suffix}`;
}

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
  /** Derived from the catalog — see catalog-stats.ts. Never hard-code this. */
  count: number;
};

export const CATEGORIES: Category[] = [
  {
    slug: "sites",
    label: "Sites touristiques",
    tagline: "Plages, pics, réserves",
    plate: "sand",
    count: CATEGORY_COUNTS.sites,
  },
  {
    slug: "hotels",
    label: "Hôtels",
    tagline: "Lodges, chambres d’hôtes",
    plate: "reef",
    count: CATEGORY_COUNTS.hotels,
  },
  {
    slug: "restaurants",
    label: "Restaurants",
    tagline: "Cuisine antanosy, poisson",
    plate: "sunset",
    count: CATEGORY_COUNTS.restaurants,
  },
  {
    slug: "activites",
    label: "Activités",
    tagline: "Surf, pirogue, plongée",
    plate: "ocean",
    count: CATEGORY_COUNTS.activites,
  },
  {
    slug: "excursions",
    label: "Excursions",
    tagline: "Berenty, Sainte-Luce",
    plate: "forest",
    count: CATEGORY_COUNTS.excursions,
  },
  {
    slug: "experiences",
    label: "Expériences",
    tagline: "Cuisine, artisanat, musique",
    plate: "town",
    count: CATEGORY_COUNTS.experiences,
  },
];

export function categoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

/** Primary destinations. Four is the ceiling — Explore absorbs the six categories. */
export const PRIMARY_NAV = [
  { href: "/explorer", key: "explore", hasMenu: true },
  { href: "/carte", key: "map", hasMenu: false },
  { href: "/decouvrir", key: "discover", hasMenu: false },
  { href: "/contact", key: "contact", hasMenu: false },
] as const satisfies readonly {
  href: string;
  key: "explore" | "map" | "discover" | "contact";
  hasMenu: boolean;
}[];

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
 */
export const OVERLAY_HEADER_ROUTES = ["/", "/decouvrir"];

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

/**
 * True for a listing detail route (/<category>/<slug>). Those pages dock their
 * own price-and-request bar on mobile, so the global tab bar stands down —
 * two stacked fixed bars would eat a fifth of a phone viewport.
 */
export function isListingDetailRoute(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  return (
    segments.length === 2 &&
    CATEGORIES.some((category) => category.slug === segments[0])
  );
}

export const LANGUAGES = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "en", label: "EN", name: "English" },
  { code: "mg", label: "MG", name: "Malagasy" },
] as const;
