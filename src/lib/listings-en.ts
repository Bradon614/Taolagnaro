/**
 * English overlay for catalog content.
 *
 * Kept separate from the French source so the two stay diffable and a
 * translator can see exactly what is covered. Proper nouns — establishment
 * names, village names — are not translated; only the prose is.
 *
 * Anything absent here falls back to the French text.
 *
 * SUMMARIES_EN IS EMPTY SINCE 2026-11-14. It held English translations of the
 * sample catalogue's invented summaries. Those slugs now belong to real
 * establishments, so the translations would have restated invented facts
 * ("ten minutes from the centre") about real businesses. Real records show
 * their French summary in every locale until someone translates them.
 *
 * The vocabulary tables below are fine: they translate generic labels such as
 * "Centre-ville", not claims about a particular establishment.
 */

export const SUMMARIES_EN: Record<string, string> = {};

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
