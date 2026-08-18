"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatAriary, formatEuro, priceUnit } from "@/lib/money";
import { SITE } from "@/lib/site";
import { listingHref, type Listing } from "@/lib/listings";
import type { ListingDetail } from "@/lib/listing-details";
import { getDictionary } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";

/**
 * The only place the gold button appears on a detail page.
 *
 * Date and party size are collected here and carried into the request form as
 * query parameters, so a visitor never types the same thing twice. Neither is
 * validated against availability — there is none — which is why the panel says
 * "tarif indicatif" out loud rather than implying a quote.
 */
export function ReservationPanel({
  listing,
  detail,
  locale,
}: {
  listing: Listing;
  detail: ListingDetail;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(2);

  const params = new URLSearchParams();
  if (date) params.set("date", date);
  params.set("personnes", String(people));
  const requestHref = localeHref(
    locale,
    `${listingHref(listing)}/demande?${params.toString()}`,
  );

  const headline =
    listing.price.kind === "from"
      ? formatAriary(listing.price.amount)
      : listing.price.kind === "range"
        ? `${formatAriary(listing.price.min)} – ${formatAriary(listing.price.max)}`
        : listing.price.kind === "free"
          ? t.common.free
          : t.common.onRequest;

  const approx =
    listing.price.kind === "from"
      ? formatEuro(listing.price.amount)
      : listing.price.kind === "range"
        ? formatEuro(listing.price.min)
        : null;

  const whatsappText = encodeURIComponent(
    `Bonjour, je vous contacte depuis Taolagnaro.mg au sujet de ${listing.name}.`,
  );

  return (
    <div className="flex flex-col gap-3.5 rounded-panel border border-line-strong bg-surface p-5">
      <div className="border-b border-line pb-4">
        <p className="tabular font-mono text-xl leading-tight">{headline}</p>
        <p className="text-small text-ink-subtle">
          {approx ? `${approx} · ` : ""}
          {priceUnit(listing.price, locale)?.replace("/ ", "") ?? ""}
        </p>
        <p className="mt-1 text-label text-ink-subtle">
          {t.detail.indicativePrice}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-label uppercase tracking-[0.13em] text-ink-subtle">
            {t.detail.desiredDate}
          </span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-plate border border-line-strong bg-surface-raised px-3 py-2.5 text-small text-ink"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-label uppercase tracking-[0.13em] text-ink-subtle">
            {t.detail.people}
          </span>
          <input
            type="number"
            min={1}
            max={30}
            value={people}
            onChange={(event) =>
              setPeople(Math.max(1, Number(event.target.value) || 1))
            }
            className="tabular w-full rounded-plate border border-line-strong bg-surface-raised px-3 py-2.5 text-small text-ink"
          />
        </label>
      </div>

      <Button href={requestHref} variant="primary" fullWidth>
        {t.common.requestFull}
      </Button>

      <p className="text-center text-label leading-relaxed text-ink-subtle">
        {t.detail.noPayment}
      </p>

      <Button
        href={`https://wa.me/${SITE.whatsapp}?text=${whatsappText}`}
        variant="whatsapp"
        fullWidth
        target="_blank"
        rel="noreferrer noopener"
      >
        {t.detail.whatsapp}
      </Button>

      {detail.responseTime ? (
        <p className="border-t border-line pt-3 text-small text-ink-subtle">
          {t.detail.respondsIn}{" "}
          <strong className="font-semibold text-ink">
            {detail.responseTime}
          </strong>
          {detail.memberSince ? (
            <> · {t.detail.memberSince} {detail.memberSince}</>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
