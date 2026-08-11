import { Button } from "@/components/ui/Button";
import { formatAriary, formatEuro, formatPrice, priceUnit } from "@/lib/money";
import { SITE } from "@/lib/site";
import { listingHref, type Listing } from "@/lib/listings";

/**
 * Docked bar so the request action never scrolls out of reach on a phone.
 * It replaces the global tab bar on detail routes — two stacked fixed bars
 * would eat a fifth of the viewport.
 */
export function MobileActionBar({ listing }: { listing: Listing }) {
  const headline =
    listing.price.kind === "from"
      ? formatAriary(listing.price.amount)
      : formatPrice(listing.price);

  const approx =
    listing.price.kind === "from" ? formatEuro(listing.price.amount) : null;

  const whatsappText = encodeURIComponent(
    `Bonjour, je vous contacte depuis Taolagnaro.mg au sujet de ${listing.name}.`,
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-line bg-surface px-4 pb-[calc(env(safe-area-inset-bottom)+0.9rem)] pt-3 shadow-[0_-3px_14px_rgb(0_0_0_/_0.08)] lg:hidden">
      <p className="min-w-0">
        <span className="tabular block font-mono text-base leading-tight">
          {headline}
        </span>
        <span className="block text-label text-ink-subtle">
          {approx ? `${approx} ` : ""}
          {priceUnit(listing.price) ?? ""}
        </span>
      </p>

      <div className="ml-auto flex items-center gap-2">
        {listing.acceptsRequests ? (
          <>
            <Button
              href={`https://wa.me/${SITE.whatsapp}?text=${whatsappText}`}
              variant="whatsapp"
              size="sm"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Écrire sur WhatsApp"
            >
              WhatsApp
            </Button>
            <Button
              href={`${listingHref(listing)}/demande`}
              variant="primary"
            >
              Demander
            </Button>
          </>
        ) : (
          <Button href="/carte" variant="primary">
            Situer sur la carte
          </Button>
        )}
      </div>
    </div>
  );
}
