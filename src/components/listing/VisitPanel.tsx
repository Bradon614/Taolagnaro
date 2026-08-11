import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/money";
import type { Listing } from "@/lib/listings";
import type { ListingDetail } from "@/lib/listing-details";

/**
 * What a tourist site gets instead of a reservation panel.
 *
 * A public beach has nobody to receive a request, so the panel answers the
 * question a visitor actually has — how do I get there, and what does it cost
 * — rather than pretending there is someone to book with.
 */
export function VisitPanel({
  listing,
  detail,
}: {
  listing: Listing;
  detail: ListingDetail;
}) {
  return (
    <div className="flex flex-col gap-3.5 rounded-panel border border-line-strong bg-surface p-5">
      <div className="border-b border-line pb-4">
        <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
          Y aller
        </p>
        <p className="tabular mt-1.5 font-mono text-xl leading-tight">
          {formatPrice(listing.price)}
        </p>
        {listing.access ? (
          <p className="text-small text-ink-subtle">{listing.access}</p>
        ) : null}
      </div>

      {detail.gettingThere?.length ? (
        <ul className="flex flex-col gap-2.5 text-small text-ink-muted">
          {detail.gettingThere.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span aria-hidden="true" className="text-ink-subtle">
                ◦
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-small text-ink-muted">
          Site accessible librement. Demandez conseil à votre hébergement pour
          le transport depuis le centre de Taolagnaro.
        </p>
      )}

      <Button href="/carte" variant="secondary" fullWidth>
        Situer sur la carte
      </Button>
      <Button href="/explorer/activites" variant="tertiary" fullWidth>
        Trouver un guide →
      </Button>
    </div>
  );
}
