/**
 * Long-form content for detail pages, keyed by slug and kept out of the
 * catalog so that file stays scannable.
 *
 * Nothing here is required: the detail page degrades to the catalog summary
 * when a listing has no entry yet, which is the normal state for a listing
 * that has just been added.
 *
 * SAMPLE CONTENT — see the note at the top of listings.ts.
 */

import type { PlateVariant } from "@/components/media/Plate";

export type Review = {
  author: string;
  from: string;
  /** Month and year, already localised — reviews are not sorted on this. */
  date: string;
  score: number;
  body: string;
};

export type ListingDetail = {
  /** Body paragraphs. Falls back to the catalog summary when absent. */
  description?: string[];
  features?: string[];
  practical?: { label: string; value: string }[];
  contact?: { phone?: string; email?: string; address: string };
  /** Shown on the reservation panel — the most reassuring thing on the page. */
  responseTime?: string;
  memberSince?: number;
  /** Extra plates for the gallery mosaic, beyond the listing's own. */
  gallery?: PlateVariant[];
  /** Real photo count once imagery exists; drives the "+N photos" overlay. */
  photoCount?: number;
  reviews?: Review[];
  /** Sites only: replaces the reservation panel. */
  gettingThere?: string[];
  /** Seasonal caveat shown as an alert. */
  seasonNote?: string;
};

export const LISTING_DETAILS: Record<string, ListingDetail> = {
  "lodge-ravinala": {
    description: [
      "Douze bungalows en bois posés sur la dune, face à la baie de Vinanibe. Le vent y souffle presque toute l’année — c’est ce qui rend l’endroit frais en saison chaude et ce qui attire les kitesurfeurs entre mai et octobre.",
      "Le lodge est tenu par une famille de Taolagnaro depuis 2011. Le personnel est local, le poisson vient du village voisin, et le jardin de ravinala qui donne son nom à la maison sert d’ombrage entre les bungalows.",
    ],
    features: [
      "Wi-Fi dans le restaurant",
      "Groupe électrogène",
      "Restaurant sur place",
      "Transfert aéroport inclus",
      "Eau chaude",
      "Parking clos",
      "Location de kitesurf",
      "Guides et excursions",
      "Paiement en espèces (Ar)",
    ],
    practical: [
      { label: "Réception", value: "07:00 – 21:00, tous les jours" },
      { label: "Saison", value: "Ouvert toute l’année · affluence de juillet à octobre" },
      { label: "Accès", value: "Piste praticable en voiture · 20 min depuis l’aéroport" },
      { label: "Langues", value: "Malgache, français, anglais" },
    ],
    contact: {
      phone: "+261 34 12 345 67",
      email: "contact@lodgeravinala.mg",
      address: "Vinanibe, Taolagnaro, Anosy",
    },
    responseTime: "1 jour",
    memberSince: 2025,
    gallery: ["ocean", "sand", "forest", "sunset"],
    photoCount: 14,
    reviews: [
      {
        author: "Miora R.",
        from: "Antananarivo",
        date: "janvier 2026",
        score: 4,
        body: "Chambre simple et très propre, vue sur la baie. Le vent claque toute la nuit — c’est Fort-Dauphin.",
      },
      {
        author: "Julien P.",
        from: "Lyon",
        date: "décembre 2025",
        score: 5,
        body: "Transfert à l’heure, accueil en malgache et en français, et le meilleur poisson grillé du séjour.",
      },
    ],
  },

  "villa-libanona": {
    description: [
      "Six chambres dans une maison posée juste au-dessus de la plage de Libanona, à dix minutes à pied du centre. Depuis la terrasse on voit la barre se former sur le récif.",
      "Le petit-déjeuner est servi dehors : pain, miel de l’arrière-pays, fruits du marché et café de Madagascar.",
    ],
    features: [
      "Vue sur mer",
      "Petit-déjeuner inclus",
      "Wi-Fi",
      "Eau chaude",
      "Planches de surf en prêt",
      "Blanchisserie",
    ],
    practical: [
      { label: "Réception", value: "06:30 – 22:00" },
      { label: "Saison", value: "Ouvert toute l’année" },
      { label: "Accès", value: "10 min à pied du centre-ville" },
      { label: "Langues", value: "Malgache, français, anglais" },
    ],
    contact: {
      phone: "+261 34 22 456 78",
      email: "reservation@villalibanona.mg",
      address: "Libanona, Taolagnaro, Anosy",
    },
    responseTime: "quelques heures",
    memberSince: 2025,
    gallery: ["reef", "sand", "sunset", "town"],
    photoCount: 21,
    reviews: [
      {
        author: "Camille D.",
        from: "Nantes",
        date: "mars 2026",
        score: 5,
        body: "La meilleure vue de la ville, et on entend la mer de la chambre. Le petit-déjeuner vaut le détour à lui seul.",
      },
    ],
  },

  "plage-de-libanona": {
    description: [
      "La plage de Libanona ferme la ville au sud-est : un croissant de sable blanc protégé par un récif, coincé entre deux pointes rocheuses. C’est la plage de baignade des habitants de Taolagnaro et le spot de surf le plus accessible de la région.",
      "La barre casse à droite sur le récif et reste praticable pour les débutants côté plage. Le vent se lève en général en milieu de matinée — les surfeurs viennent tôt, les kitesurfeurs plus tard.",
    ],
    practical: [
      { label: "Accès", value: "Libre, à pied depuis le centre-ville" },
      { label: "Baignade", value: "Surveillée nulle part — courant fort près des pointes" },
      { label: "Meilleur moment", value: "Tôt le matin, avant que le vent se lève" },
      { label: "Sur place", value: "Vendeurs de fruits, location de planches le week-end" },
    ],
    gettingThere: [
      "À pied : 10 à 15 minutes depuis le marché, par la route de la corniche.",
      "En taxi-ville : environ 5 000 Ar depuis le centre.",
      "Aucun droit d’entrée. La plage est publique et le restera.",
    ],
    gallery: ["ocean", "reef", "sunset"],
    photoCount: 9,
  },

  "initiation-au-surf": {
    description: [
      "Deux heures sur la plage de Libanona avec un moniteur de Taolagnaro : sécurité, lecture de la vague, position sur la planche, puis mise à l’eau côté sable où la houle est déjà cassée.",
      "Groupes de quatre personnes maximum. Planche en mousse et lycra fournis ; prévoyez de la crème solaire et de l’eau.",
    ],
    features: [
      "Moniteur local diplômé",
      "Planche et lycra fournis",
      "4 personnes maximum",
      "À partir de 12 ans",
      "Aucune expérience requise",
    ],
    practical: [
      { label: "Départ", value: "07:00 ou 15:00, selon la marée" },
      { label: "Durée", value: "2 h, dont 1 h 30 à l’eau" },
      { label: "Point de rendez-vous", value: "Plage de Libanona, côté nord" },
      { label: "Annulation", value: "Reportée sans frais si la mer est trop forte" },
    ],
    contact: {
      phone: "+261 32 55 678 90",
      address: "Plage de Libanona, Taolagnaro",
    },
    responseTime: "1 jour",
    memberSince: 2026,
    gallery: ["reef", "sand"],
    photoCount: 7,
    reviews: [
      {
        author: "Léa M.",
        from: "Toulouse",
        date: "février 2026",
        score: 5,
        body: "Debout sur la planche au bout de quarante minutes. Le moniteur est patient et très drôle.",
      },
    ],
  },

  "reserve-de-berenty": {
    description: [
      "Journée complète dans la réserve privée de Berenty, dans la vallée du Mandrare, à environ trois heures de route à l’ouest de Taolagnaro. La forêt-galerie de tamariniers abrite makis catta, sifakas de Verreaux et une colonie de roussettes.",
      "Le départ est matinal parce que la route est longue et que les lémuriens sont actifs tôt. Transport, droits d’entrée, guide et déjeuner sont compris.",
    ],
    features: [
      "Transport aller-retour inclus",
      "Guide naturaliste francophone",
      "Droits d’entrée compris",
      "Déjeuner sur place",
      "Départ garanti à partir de 2 personnes",
    ],
    practical: [
      { label: "Départ", value: "05:00 depuis votre hébergement" },
      { label: "Retour", value: "Vers 19:00" },
      { label: "Route", value: "≈ 3 h par la RN13, piste sur les derniers kilomètres" },
      { label: "À prévoir", value: "Chapeau, eau, chaussures fermées" },
    ],
    contact: {
      phone: "+261 34 77 890 12",
      email: "excursions@anosy-guides.mg",
      address: "Agence au centre-ville, Taolagnaro",
    },
    responseTime: "1 jour",
    memberSince: 2025,
    gallery: ["sand", "town", "sunset"],
    photoCount: 18,
    reviews: [
      {
        author: "Anja R.",
        from: "Antananarivo",
        date: "novembre 2025",
        score: 5,
        body: "Les makis viennent à un mètre. Longue journée de route, mais on ne regrette pas une minute.",
      },
    ],
  },

  "la-table-de-libanona": {
    description: [
      "Une terrasse au-dessus de la plage, une ardoise qui change avec la pêche du jour, et du riz rouge de l’Anosy servi avec des achards de légumes.",
      "Le soir, mieux vaut prévenir : la salle est petite et se remplit vite en haute saison.",
    ],
    features: [
      "Terrasse vue mer",
      "Poisson du jour",
      "Options végétariennes",
      "Réservation conseillée le soir",
      "Paiement en espèces",
    ],
    practical: [
      { label: "Horaires", value: "11:30 – 14:30 et 18:30 – 21:30" },
      { label: "Fermeture", value: "Dimanche soir" },
      { label: "Réservation", value: "Conseillée à partir de 4 personnes" },
      { label: "Langues", value: "Malgache, français" },
    ],
    contact: {
      phone: "+261 34 33 567 89",
      address: "Route de la corniche, Libanona, Taolagnaro",
    },
    responseTime: "quelques heures",
    memberSince: 2025,
    gallery: ["ocean", "town", "reef"],
    photoCount: 11,
    reviews: [
      {
        author: "Hery A.",
        from: "Taolagnaro",
        date: "avril 2026",
        score: 5,
        body: "On y va depuis des années. Le poisson est toujours du jour et l’addition reste raisonnable.",
      },
    ],
  },

  "kitesurf-a-vinanibe": {
    seasonNote:
      "Le vent d’Anosy souffle de mai à octobre. Hors saison, la sortie n’est pas proposée.",
  },
};

export function detailFor(slug: string): ListingDetail {
  return LISTING_DETAILS[slug] ?? {};
}
