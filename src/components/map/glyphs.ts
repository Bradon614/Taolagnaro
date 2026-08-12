import type { CategorySlug } from "@/lib/site";

/**
 * Category is carried by the glyph, not by colour.
 *
 * Six coloured pin families would produce a rainbow and still fail for
 * colour-blind visitors. Hue and size are reserved for state instead: every
 * pin is bay teal, and only the selected one is gold and larger.
 */
export const CATEGORY_GLYPH: Record<CategorySlug, string> = {
  sites: "🏝",
  hotels: "🏨",
  restaurants: "🍽",
  activites: "🌿",
  excursions: "🧭",
  experiences: "🪘",
};
