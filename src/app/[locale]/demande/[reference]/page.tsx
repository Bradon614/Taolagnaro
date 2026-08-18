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
  formatDate,
  isValidReference,
  type ReservationRequest,
} from "@/lib/requests";
import { SITE } from "@/lib/site";
import { getDictionary, fill } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";
import { listingPlace } from "@/lib/listing-i18n";

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

type Params = { params: Promise<{ reference: string; locale: Locale }> };

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
  const { reference, locale } = await params;
  if (!isValidReference(reference)) notFound();

  const t = getDictionary(locale);
  const href = (path: string) => localeHref(locale, path);

  const summary = await readSummary(reference);
  const listing = summary ? listingBySlug(summary.listingSlug) : null;
  const detail = listing ? detailFor(listing.slug) : {};
  const nearby = listing ? nearbyListings(listing, 3) : [];

  const whatsappText = encodeURIComponent(
    `${locale === "en" ? "Hello, I am writing about my request" : "Bonjour, je vous contacte au sujet de ma demande"} ${reference}${
      summary ? ` (${summary.listingName})` : ""
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
          {t.confirmation.title}
        </h1>

        <p className="mx-auto mt-3 max-w-[52ch] text-ink-muted">
          {summary ? (
            <>
              {fill(t.confirmation.body, { name: summary.listingName })}
              {detail.responseTime
                ? ` ${fill(t.confirmation.respondsIn, { time: detail.responseTime })}`
                : ""}
            </>
          ) : (
            <>
              {t.confirmation.bodyGeneric}
            </>
          )}
        </p>

        <dl className="mt-7 overflow-hidden rounded-panel border border-line bg-surface text-left">
          <div className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-3.5">
            <dt className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
              {t.confirmation.reference}
            </dt>
            <dd className="tabular font-mono text-base">{reference}</dd>
          </div>

          {summary ? (
            <div className="grid gap-px bg-line sm:grid-cols-2">
              <Cell label={t.confirmation.service} value={summary.listingName} />
              <Cell
                label={t.confirmation.dateAndPeople}
                value={`${formatDate(summary.date, locale)} · ${summary.people} pers.`}
                numeric
              />
              <Cell
                label={t.confirmation.contactedAt}
                value={summary.phone}
                numeric
              />
              <Cell label={t.confirmation.copyTo} value={summary.email} />
            </div>
          ) : (
            <p className="px-4 py-3.5 text-small text-ink-muted">
              {t.confirmation.lost}
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
            {t.confirmation.chaseWhatsapp}
          </Button>
          <Button href={href("/explorer")} variant="secondary">
            {t.confirmation.keepExploring}
          </Button>
        </div>

        <p className="mx-auto mt-5 max-w-[52ch] text-small text-ink-subtle">
          {t.confirmation.noReply}{" "}
          <Link href={href("/contact")} className="text-brand hover:underline">
            {t.confirmation.writeUs}
          </Link>{" "}
          {fill(t.confirmation.withReference, { reference })}
        </p>
      </div>

      {nearby.length ? (
        <ListingRow
          kicker={t.confirmation.meanwhileKicker}
          title={fill(t.confirmation.meanwhileTitle, {
            place: listing ? listingPlace(listing, locale) : "",
          })}
          listings={nearby}
          locale={locale}
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
