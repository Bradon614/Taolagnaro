/**
 * Prices are quoted in Ariary because that is what a provider will actually
 * ask for. The euro figure is a courtesy for visitors doing mental arithmetic
 * and is always marked approximate — never presented as a quote.
 */

/**
 * Indicative MGA → EUR rate. Deliberately a single constant: this belongs in
 * configuration once someone is maintaining it, and it must never be treated
 * as a live exchange rate.
 */
export const ARIARY_PER_EUR = 5000;

export type PricePer = "nuit" | "personne" | "repas";

export type Price =
  | { kind: "free" }
  | { kind: "on-request" }
  | { kind: "from"; amount: number; per: PricePer }
  | { kind: "range"; min: number; max: number; per: PricePer };

const ariary = new Intl.NumberFormat("fr-MG", { maximumFractionDigits: 0 });
const euro = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

export function formatAriary(amount: number): string {
  // fr-MG groups with a narrow no-break space; normalise it so it does not
  // render as a missing glyph in the monospace face.
  return `${ariary.format(amount).replace(/ | /g, " ")} Ar`;
}

export function formatEuro(amount: number): string {
  return `≈ ${euro.format(Math.round(amount / ARIARY_PER_EUR))} €`;
}

const PER_LABEL: Record<PricePer, string> = {
  nuit: "/ nuit",
  personne: "/ pers.",
  repas: "/ repas",
};

/** The headline figure shown on a card. */
export function formatPrice(price: Price): string {
  switch (price.kind) {
    case "free":
      return "Gratuit";
    case "on-request":
      return "Sur demande";
    case "from":
      return formatAriary(price.amount);
    case "range":
      return `${ariary.format(price.min).replace(/ | /g, " ")}–${formatAriary(price.max)}`;
  }
}

/** The small qualifier beside it, e.g. "/ nuit". */
export function priceUnit(price: Price): string | null {
  if (price.kind === "from" || price.kind === "range") {
    return PER_LABEL[price.per];
  }
  return null;
}
