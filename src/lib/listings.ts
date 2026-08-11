/**
 * The catalog.
 *
 * One record shape for every category — a beach, a lodge, a grilled-fish place
 * and a pirogue crossing all share the same core fields, and categories only
 * add to them. That is what lets search, filters, the map and "nearby" be
 * written once.
 *
 * SAMPLE CONTENT. Geographic names, distances, elevations and seasons are
 * real. Business names are invented placeholders and do not refer to actual
 * establishments — they are replaced by the real partner list.
 */

import type { CategorySlug } from "@/lib/site";
import type { Price } from "@/lib/money";
import type { PlateVariant } from "@/components/media/Plate";

export type Listing = {
  slug: string;
  category: CategorySlug;
  name: string;
  /** Neighbourhood or village, as a visitor would say it. */
  place: string;
  /** Kilometres from the centre of Taolagnaro. */
  distanceKm: number;
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
};

export const LISTINGS: Listing[] = [
  // ---------------------------------------------------------------- sites
  {
    slug: "plage-de-libanona",
    category: "sites",
    name: "Plage de Libanona",
    place: "Presqu’île",
    distanceKm: 1,
    summary:
      "Sable blanc, récif, le spot de surf de la ville — à 10 min du centre.",
    plate: "sand",
    price: { kind: "free" },
    acceptsRequests: false,
    access: "Accès libre",
    featuredRank: 1,
  },
  {
    slug: "reserve-de-nahampoana",
    category: "sites",
    name: "Réserve de Nahampoana",
    place: "Nahampoana",
    distanceKm: 7,
    summary:
      "Sept espèces de lémuriens en semi-liberté, jardin botanique et cascade.",
    plate: "forest",
    price: { kind: "from", amount: 45000, per: "personne" },
    rating: { score: 4.6, count: 41 },
    acceptsRequests: true,
    duration: "2 h",
    featuredRank: 2,
  },
  {
    slug: "fort-flacourt",
    category: "sites",
    name: "Fort Flacourt",
    place: "Vieille ville",
    distanceKm: 0.6,
    summary:
      "Les murs du fort de 1643 abritent le Musée de l’Anosy et sa collection antanosy.",
    plate: "town",
    price: { kind: "from", amount: 10000, per: "personne" },
    acceptsRequests: false,
    access: "Ouvert 08:00–16:00",
    featuredRank: 3,
  },
  {
    slug: "baie-de-sainte-luce",
    category: "sites",
    name: "Baie de Sainte-Luce",
    place: "Sainte-Luce",
    distanceKm: 50,
    summary:
      "Forêt littorale, lagune et village de pêcheurs. L’un des derniers fragments de forêt côtière.",
    plate: "reef",
    price: { kind: "free" },
    acceptsRequests: false,
    access: "Piste, 4×4 conseillé",
    featuredRank: 4,
  },
  {
    slug: "presquile-de-lokaro",
    category: "sites",
    name: "Presqu’île de Lokaro",
    place: "Lokaro",
    distanceKm: 25,
    summary:
      "Lagune, dunes et criques désertes. On y accède en pirogue depuis Évatraha.",
    plate: "sunset",
    price: { kind: "free" },
    acceptsRequests: false,
    access: "Pirogue · journée",
    featuredRank: 5,
  },
  {
    slug: "pic-saint-louis",
    category: "sites",
    name: "Pic Saint-Louis",
    place: "Presqu’île",
    distanceKm: 4,
    summary:
      "Le point de vue sur les trois baies. Montée raide, 3 h aller-retour, guide conseillé.",
    plate: "sand",
    price: { kind: "free" },
    acceptsRequests: false,
    access: "Accès libre",
    elevation: "529 m",
  },
  {
    slug: "plage-dambinanibe",
    category: "sites",
    name: "Plage d’Ambinanibe",
    place: "Ambinanibe",
    distanceKm: 6,
    summary: "Longue plage de dunes battue par le vent, au sud de la ville.",
    plate: "sand",
    price: { kind: "free" },
    acceptsRequests: false,
    access: "Accès libre",
  },

  // --------------------------------------------------------------- hotels
  {
    slug: "villa-libanona",
    category: "hotels",
    name: "Villa Libanona",
    place: "Libanona",
    distanceKm: 1,
    summary:
      "Six chambres au-dessus de la plage, petit-déjeuner sur la terrasse, vue sur le récif.",
    plate: "ocean",
    price: { kind: "from", amount: 320000, per: "nuit" },
    rating: { score: 4.8, count: 34 },
    acceptsRequests: true,
    badge: { label: "Coup de cœur", tone: "accent" },
  },
  {
    slug: "lodge-ravinala",
    category: "hotels",
    name: "Lodge Ravinala",
    place: "Vinanibe",
    distanceKm: 7,
    summary:
      "Douze bungalows face à la baie, jardin de ravinala, transfert aéroport inclus.",
    plate: "reef",
    price: { kind: "from", amount: 180000, per: "nuit" },
    rating: { score: 4.4, count: 27 },
    acceptsRequests: true,
  },
  {
    slug: "chez-voahangy",
    category: "hotels",
    name: "Chez Voahangy",
    place: "Sainte-Luce",
    distanceKm: 50,
    summary:
      "Trois chambres chez l’habitant, repas partagés, gérée par le village.",
    plate: "forest",
    price: { kind: "from", amount: 70000, per: "nuit" },
    rating: { score: 4.6, count: 12 },
    acceptsRequests: true,
    badge: { label: "Géré par la communauté", tone: "outline" },
  },
  {
    slug: "camp-de-lokaro",
    category: "hotels",
    name: "Camp de Lokaro",
    place: "Lokaro",
    distanceKm: 25,
    summary:
      "Tentes sur pilotis entre lagune et océan. Accès en pirogue.",
    plate: "sunset",
    price: { kind: "from", amount: 110000, per: "nuit" },
    rating: { score: 4.2, count: 19 },
    acceptsRequests: true,
  },
  {
    slug: "hotel-de-lanosy",
    category: "hotels",
    name: "Hôtel de l’Anosy",
    place: "Centre-ville",
    distanceKm: 0.4,
    summary:
      "Vingt chambres près du marché, générateur, parking clos, restaurant au rez-de-chaussée.",
    plate: "town",
    price: { kind: "from", amount: 140000, per: "nuit" },
    rating: { score: 4.2, count: 56 },
    acceptsRequests: true,
  },
  {
    slug: "residence-des-galions",
    category: "hotels",
    name: "Résidence des Galions",
    place: "Libanona",
    distanceKm: 1.2,
    summary:
      "Quatre studios avec cuisine, terrasse commune orientée vers la baie des Galions.",
    plate: "sunset",
    price: { kind: "from", amount: 95000, per: "nuit" },
    rating: { score: 4.6, count: 23 },
    acceptsRequests: true,
  },
  {
    slug: "les-filaos-dambinanibe",
    category: "hotels",
    name: "Les Filaos d’Ambinanibe",
    place: "Ambinanibe",
    distanceKm: 9,
    summary:
      "Huit bungalows dans les filaos, plage à cent mètres, dîner sur réservation.",
    plate: "sand",
    price: { kind: "from", amount: 160000, per: "nuit" },
    rating: { score: 4.5, count: 18 },
    acceptsRequests: true,
    badge: { label: "2 chambres restantes", tone: "warm" },
  },
  {
    slug: "chez-perline",
    category: "hotels",
    name: "Chez Perline",
    place: "Centre-ville",
    distanceKm: 0.9,
    summary:
      "Maison familiale, cinq chambres, cuisine malgache le soir sur demande.",
    plate: "forest",
    price: { kind: "from", amount: 75000, per: "nuit" },
    rating: { score: 4.4, count: 31 },
    acceptsRequests: true,
  },

  // ---------------------------------------------------------- restaurants
  {
    slug: "la-table-de-libanona",
    category: "restaurants",
    name: "La Table de Libanona",
    place: "Centre-ville",
    distanceKm: 1,
    summary:
      "Poisson du jour grillé, riz rouge, achards. Terrasse au-dessus de la plage.",
    plate: "sunset",
    price: { kind: "range", min: 25000, max: 60000, per: "personne" },
    rating: { score: 4.7, count: 62 },
    acceptsRequests: true,
    cuisine: "Poisson",
  },
  {
    slug: "chez-zafy",
    category: "restaurants",
    name: "Chez Zafy",
    place: "Marché",
    distanceKm: 0.5,
    summary:
      "Cuisine antanosy du quotidien : ravitoto, romazava, brèdes. Petits prix.",
    plate: "town",
    price: { kind: "range", min: 8000, max: 20000, per: "personne" },
    rating: { score: 4.3, count: 88 },
    acceptsRequests: true,
    cuisine: "Antanosy",
  },
  {
    slug: "le-filao",
    category: "restaurants",
    name: "Le Filao",
    place: "Port",
    distanceKm: 2,
    summary:
      "Langouste, crevettes et vanille de la région. Réservation conseillée le soir.",
    plate: "reef",
    price: { kind: "range", min: 40000, max: 95000, per: "personne" },
    rating: { score: 4.5, count: 44 },
    acceptsRequests: true,
    cuisine: "Fusion",
  },
  {
    slug: "grillades-du-port",
    category: "restaurants",
    name: "Grillades du Port",
    place: "Port",
    distanceKm: 7,
    summary: "Poisson grillé au feu de bois, pieds dans le sable, sans façon.",
    plate: "sunset",
    price: { kind: "range", min: 20000, max: 45000, per: "personne" },
    rating: { score: 4.4, count: 37 },
    acceptsRequests: true,
    cuisine: "Poisson",
  },

  // ----------------------------------------------------------- activities
  {
    slug: "initiation-au-surf",
    category: "activites",
    name: "Initiation au surf",
    place: "Libanona",
    distanceKm: 1,
    summary:
      "Cours en petit groupe avec moniteur local. Planche et lycra fournis.",
    plate: "ocean",
    price: { kind: "from", amount: 90000, per: "personne" },
    rating: { score: 4.5, count: 29 },
    acceptsRequests: true,
    duration: "2 h",
    level: "Débutant",
  },
  {
    slug: "pic-saint-louis-lever-du-jour",
    category: "activites",
    name: "Pic Saint-Louis au lever du jour",
    place: "Presqu’île",
    distanceKm: 4,
    summary:
      "Départ à 4 h avec un guide antanosy pour voir le soleil se lever sur les trois baies.",
    plate: "sand",
    price: { kind: "from", amount: 120000, per: "personne" },
    rating: { score: 4.9, count: 21 },
    acceptsRequests: true,
    duration: "3 h 30",
    level: "Sportif",
  },
  {
    slug: "kitesurf-a-vinanibe",
    category: "activites",
    name: "Kitesurf à Vinanibe",
    place: "Vinanibe",
    distanceKm: 7,
    summary:
      "Le vent d’Anosy souffle de mai à octobre. Matériel et encadrement sur place.",
    plate: "ocean",
    price: { kind: "from", amount: 150000, per: "personne" },
    rating: { score: 4.6, count: 16 },
    acceptsRequests: true,
    duration: "3 h",
    level: "Intermédiaire",
  },

  // ----------------------------------------------------------- excursions
  {
    slug: "reserve-de-berenty",
    category: "excursions",
    name: "Réserve de Berenty",
    place: "Vallée du Mandrare",
    distanceKm: 80,
    summary:
      "Journée complète chez les makis catta et les sifakas, transport et déjeuner inclus.",
    plate: "forest",
    price: { kind: "from", amount: 450000, per: "personne" },
    rating: { score: 4.8, count: 47 },
    acceptsRequests: true,
    duration: "Journée",
    badge: { label: "Coup de cœur", tone: "accent" },
  },
  {
    slug: "sainte-luce-deux-jours",
    category: "excursions",
    name: "Sainte-Luce en deux jours",
    place: "Sainte-Luce",
    distanceKm: 50,
    summary:
      "Forêt littorale, pirogue dans la lagune et nuit chez l’habitant au village.",
    plate: "reef",
    price: { kind: "from", amount: 620000, per: "personne" },
    rating: { score: 4.7, count: 14 },
    acceptsRequests: true,
    duration: "2 jours",
  },

  // ---------------------------------------------------------- experiences
  {
    slug: "cuisine-antanosy-chez-lhabitant",
    category: "experiences",
    name: "Cuisine antanosy chez l’habitant",
    place: "Village d’Ankaramena",
    distanceKm: 12,
    summary:
      "Marché le matin, cuisine à quatre mains, repas partagé avec la famille.",
    plate: "town",
    price: { kind: "from", amount: 65000, per: "personne" },
    rating: { score: 4.9, count: 23 },
    acceptsRequests: true,
    duration: "4 h",
    level: "En famille",
  },
  {
    slug: "vannerie-de-mahampy",
    category: "experiences",
    name: "Vannerie de mahampy",
    place: "Sainte-Luce",
    distanceKm: 50,
    summary:
      "Le jonc des marais tressé par les femmes du village, à essayer soi-même.",
    plate: "forest",
    price: { kind: "from", amount: 40000, per: "personne" },
    rating: { score: 4.7, count: 9 },
    acceptsRequests: true,
    duration: "2 h",
    badge: { label: "Géré par la communauté", tone: "outline" },
  },
];

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

/** Detail route for a listing, e.g. /hotels/lodge-ravinala. */
export function listingHref(listing: Listing): string {
  return `/${listing.category}/${listing.slug}`;
}
