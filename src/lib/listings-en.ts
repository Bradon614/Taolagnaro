/**
 * English overlay for catalog content.
 *
 * Kept separate from the French source so the two stay diffable and a
 * translator can see exactly what is covered. Proper nouns — establishment
 * names, village names — are not translated; only the prose is.
 *
 * Anything absent here falls back to the French text.
 */

export const SUMMARIES_EN: Record<string, string> = {
  "plage-de-libanona":
    "White sand, a reef, and the town's surf break — ten minutes from the centre.",
  "reserve-de-nahampoana":
    "Seven lemur species living semi-wild, a botanical garden and a waterfall.",
  "fort-flacourt":
    "The walls of the 1643 fort now hold the Musée de l'Anosy and its Antanosy collection.",
  "baie-de-sainte-luce":
    "Littoral forest, a lagoon and a fishing village. One of the last fragments of coastal forest.",
  "presquile-de-lokaro":
    "Lagoon, dunes and empty coves. Reached by pirogue from Évatraha.",
  "pic-saint-louis":
    "The viewpoint over all three bays. Steep climb, 3 h return, a guide is advised.",
  "plage-dambinanibe":
    "A long dune beach south of town, with the wind coming straight off the sea.",
  "villa-libanona":
    "Six rooms above the beach, breakfast on the terrace, a view over the reef.",
  "lodge-ravinala":
    "Twelve bungalows facing the bay, a ravinala garden, airport transfer included.",
  "chez-voahangy":
    "Three rooms in a family home, shared meals, run by the village.",
  "camp-de-lokaro":
    "Tents on stilts between the lagoon and the ocean. Reached by pirogue.",
  "hotel-de-lanosy":
    "Twenty rooms near the market, generator, enclosed parking, restaurant downstairs.",
  "residence-des-galions":
    "Four studios with kitchens and a shared terrace facing the Baie des Galions.",
  "les-filaos-dambinanibe":
    "Eight bungalows in the casuarinas, beach a hundred metres away, dinner on request.",
  "chez-perline":
    "A family house with five rooms and Malagasy cooking in the evening on request.",
  "la-table-de-libanona":
    "Grilled catch of the day, red rice, achards. Terrace above the beach.",
  "chez-zafy":
    "Everyday Antanosy cooking: ravitoto, romazava, brèdes. Very good value.",
  "le-filao":
    "Lobster, prawns and vanilla from the region. Book ahead in the evening.",
  "grillades-du-port":
    "Fish grilled over wood, feet in the sand, no ceremony about it.",
  "initiation-au-surf":
    "A small-group lesson with a local instructor. Board and rash vest provided.",
  "pic-saint-louis-lever-du-jour":
    "A 4 a.m. start with an Antanosy guide to watch the sun come up over the three bays.",
  "kitesurf-a-vinanibe":
    "The Anosy wind blows from May to October. Kit and instruction on site.",
  "reserve-de-berenty":
    "A full day among ring-tailed lemurs and sifakas, transport and lunch included.",
  "sainte-luce-deux-jours":
    "Littoral forest, a pirogue through the lagoon and a night in the village.",
  "cuisine-antanosy-chez-lhabitant":
    "Market in the morning, cooking together, then the meal shared with the family.",
  "vannerie-de-mahampy":
    "The marsh sedge woven by the women of the village — and a go at it yourself.",
};

export const PLACES_EN: Record<string, string> = {
  "Presqu’île": "The headland",
  "Centre-ville": "Town centre",
  "Vieille ville": "Old town",
  Marché: "Market",
  Port: "Port",
  "Vallée du Mandrare": "Mandrare valley",
  "Village d’Ankaramena": "Ankaramena village",
};

export const ACCESS_EN: Record<string, string> = {
  "Accès libre": "Open access",
  "Ouvert 08:00–16:00": "Open 08:00–16:00",
  "Piste, 4×4 conseillé": "Track, 4×4 advised",
  "Pirogue · journée": "Pirogue · full day",
};

export const DURATION_EN: Record<string, string> = {
  Journée: "Full day",
  "2 jours": "2 days",
};

export const CUISINE_EN: Record<string, string> = {
  Poisson: "Fish",
  Antanosy: "Antanosy",
  Fusion: "Fusion",
};
