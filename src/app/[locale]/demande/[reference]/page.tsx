import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ListingRow } from "@/components/listing/ListingRow";
import { Button } from "@/components/ui/Button";
import { detailFor } from "@/lib/listing-details";
import { listingBySlug, nearbyListings } from "@/lib/listings";
import {
  CONFIRMATION_COOKIE,
  formatDateFr,
  isValidReference,
  type ReservationRequest,
} from "@/lib/requests";
import { SITE } from "@/lib/site";

/**
 * Confirmation has to do real work: prove the request exists, say who has it,
 * give a way back if nothing happens, and offer the next thing to look at.
 *
 * The summary arrives in a short-lived httpOnly cookie set by the server
 * action — personal details never travel in the URL. If the cookie is gone
 * (bookmark, later visit, different device) the page still stands on the
 * reference alone rather than erroring.
 */

export const metadata: Metadata = {
  title: "Demande envoyée",
  robots: { index: false },
};

type Params = { params: Promise<{ reference: string }> };

async function readSummary(
  reference: string,
): Promise<ReservationRequest | null> {
  const raw = (await cookies()).get(CONFIRMATION_COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ReservationRequest;
    return parsed.reference === reference ? parsed : null;
  } catch {
    return null;
  }
}

export default async function ConfirmationPage({ params }: Params) {
  const { reference } = await params;
  if (!isValidReference(reference)) notFound();

  const summary = await readSummary(reference);
  const listing = summary ? listingBySlug(summary.listingSlug) : null;
  const detail = listing ? detailFor(listing.slug) : {};
  const nearby = listing ? nearbyListings(listing, 3) : [];

  const whatsappText = encodeURIComponent(
    `Bonjour, je vous contacte au sujet de ma demande ${reference}${
      summary ? ` pour ${summary.listingName}` : ""
    }.`,
  );

  return (
    <>
      <div className="mx-auto max-w-[46rem] px-4 pb-10 pt-14 text-center md:px-6">
        <p
          aria-hidden="true"
          className="mx-auto flex size-13 items-center justify-center rounded-full border border-whatsapp text-2xl text-whatsapp"
        >
          ✓
        </p>

        <h1 className="mt-5 text-page md:text-[2.2rem] md:leading-[1.1]">
          Votre demande de réservation a bien été envoyée.
        </h1>

        <p className="mx-auto mt-3 max-w-[52ch] text-ink-muted">
          {summary ? (
            <>
              {summary.listingName} a reçu votre demande et vous contactera pour
              confirmer la disponibilité et le tarif.
              {detail.responseTime
                ? ` L’établissement répond en général sous ${detail.responseTime}.`
                : ""}
            </>
          ) : (
            <>
              Le prestataire a reçu votre demande et vous contactera pour
              confirmer la disponibilité et le tarif.
            </>
          )}
        </p>

        <dl className="mt-7 overflow-hidden rounded-panel border border-line bg-surface text-left">
          <div className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-3.5">
            <dt className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
              Référence
            </dt>
            <dd className="tabular font-mono text-base">{reference}</dd>
          </div>

          {summary ? (
            <div className="grid gap-px bg-line sm:grid-cols-2">
              <Cell label="Prestation" value={summary.listingName} />
              <Cell
                label="Date & personnes"
                value={`${formatDateFr(summary.date)} · ${summary.people} pers.`}
                numeric
              />
              <Cell
                label="Vous serez contacté au"
                value={summary.phone}
                numeric
              />
              <Cell label="Copie envoyée à" value={summary.email} />
            </div>
          ) : (
            <p className="px-4 py-3.5 text-small text-ink-muted">
              Le détail de cette demande n’est plus affiché ici. Gardez la
              référence : elle suffit pour la retrouver.
            </p>
          )}
        </dl>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            href={`https://wa.me/${SITE.whatsapp}?text=${whatsappText}`}
            variant="whatsapp"
            target="_blank"
            rel="noreferrer noopener"
          >
            Relancer sur WhatsApp
          </Button>
          <Button href="/explorer" variant="secondary">
            Continuer à explorer
          </Button>
        </div>

        <p className="mx-auto mt-5 max-w-[52ch] text-small text-ink-subtle">
          Sans réponse sous 48 h,{" "}
          <Link href="/contact" className="text-brand hover:underline">
            écrivez-nous
          </Link>{" "}
          avec la référence <span className="tabular font-mono">{reference}</span>{" "}
          et nous relancerons l’établissement.
        </p>
      </div>

      {nearby.length ? (
        <ListingRow
          kicker="Pendant que vous y êtes"
          title={`À faire autour de ${listing?.place}`}
          listings={nearby}
          columns={3}
          aspect="16/9"
          className="border-t border-line"
        />
      ) : null}
    </>
  );
}

function Cell({
  label,
  value,
  numeric,
}: {
  label: string;
  value: string;
  numeric?: boolean;
}) {
  return (
    <div className="bg-surface px-4 py-3.5">
      <dt className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
        {label}
      </dt>
      <dd className={`mt-1 text-small ${numeric ? "tabular font-mono" : ""}`}>
        {value}
      </dd>
    </div>
  );
}
