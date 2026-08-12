"use client";

import { ListingCard } from "@/components/listing/ListingCard";
import { Button } from "@/components/ui/Button";
import { LISTINGS } from "@/lib/listings";
import { useWishlist } from "@/lib/wishlist";

/**
 * The shortlist. Rendered client-side because the list only exists on the
 * device — there is nothing for the server to know about it.
 */
export function WishlistView() {
  const { slugs, count, clear } = useWishlist();

  // Preserve the order they were saved in, newest first.
  const saved = slugs
    .map((slug) => LISTINGS.find((listing) => listing.slug === slug))
    .filter((listing): listing is (typeof LISTINGS)[number] => Boolean(listing));

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-8 md:px-6">
      <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
        Accueil / Envies
      </p>

      <div className="mt-2.5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-page">Vos envies</h1>
          <p className="mt-2 max-w-[56ch] text-ink-muted">
            {count > 0
              ? "Votre sélection, gardée sur cet appareil. Envoyez une demande quand vous êtes prêt."
              : "Enregistrez les lieux qui vous intéressent pour les retrouver ici."}
          </p>
        </div>

        {count > 0 ? (
          <button
            type="button"
            onClick={clear}
            className="text-small text-brand hover:underline"
          >
            Tout retirer ({count})
          </button>
        ) : null}
      </div>

      {saved.length === 0 ? (
        <div className="mt-8 rounded-plate border border-dashed border-line-strong px-5 py-14 text-center">
          <p aria-hidden="true" className="text-2xl text-ink-subtle">
            ♡
          </p>
          <p className="mt-2 font-semibold">Votre liste est vide</p>
          <p className="mx-auto mt-1.5 max-w-[42ch] text-small text-ink-muted">
            Touchez le cœur sur une fiche pour l’ajouter ici. Vous pourrez
            comparer vos favoris avant d’envoyer une demande.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button href="/explorer" variant="primary">
              Explorer les lieux
            </Button>
            <Button href="/carte" variant="secondary">
              Ouvrir la carte
            </Button>
          </div>
        </div>
      ) : (
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {saved.map((listing) => (
            <li key={listing.slug} className="flex">
              <ListingCard listing={listing} />
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 max-w-[56ch] text-small text-ink-subtle">
        Cette liste est enregistrée uniquement sur cet appareil et sur ce
        navigateur. Elle ne nous est pas transmise et ne vous suivra pas sur un
        autre téléphone.
      </p>
    </div>
  );
}
