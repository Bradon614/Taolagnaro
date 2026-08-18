import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RequestForm } from "@/components/request/RequestForm";
import { Plate } from "@/components/media/Plate";
import { Rating } from "@/components/ui/Rating";
import { formatPrice, priceUnit } from "@/lib/money";
import { detailFor } from "@/lib/listing-details";
import { LISTINGS, listingBySlug, type Listing } from "@/lib/listings";
import { getDictionary, fill } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";
import { categoryLabel, listingPlace } from "@/lib/listing-i18n";

type Params = {
  params: Promise<{ categorie: string; slug: string; locale: Locale }>;
  searchParams: Promise<{ date?: string; personnes?: string }>;
};

export function generateStaticParams() {
  return LISTINGS.filter((listing) => listing.acceptsRequests).map(
    (listing) => ({ categorie: listing.category, slug: listing.slug }),
  );
}

function resolve(categorie: string, slug: string): Listing | null {
  const listing = listingBySlug(slug);
  if (!listing || listing.category !== categorie) return null;
  // A public site has nobody to receive a request, so this route does not
  // exist for one.
  if (!listing.acceptsRequests) return null;
  return listing;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categorie, slug } = await params;
  const listing = resolve(categorie, slug);
  return {
    title: listing ? `Demander — ${listing.name}` : "Demande introuvable",
    robots: { index: false },
  };
}


export default async function RequestPage({ params, searchParams }: Params) {
  const { categorie, slug, locale } = await params;
  const listing = resolve(categorie, slug);
  if (!listing) notFound();

  const { date, personnes } = await searchParams;
  const t = getDictionary(locale);
  const detail = detailFor(listing.slug);
  const category = categoryLabel(listing.category, locale);
  const steps = [t.request.step1, t.request.step2, t.request.step3];

  return (
    <div className="mx-auto grid max-w-[1120px] grid-cols-[minmax(0,1fr)] gap-10 px-4 pb-20 pt-8 md:px-6 md:pb-16 lg:grid-cols-[minmax(0,1fr)_20.5rem] lg:gap-12">
      <div>
        <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
          {t.request.kicker}
        </p>
        <h1 className="mt-2.5 text-page">{t.request.title}</h1>
        <p className="mt-2.5 max-w-[54ch] text-ink-muted">
          {t.request.lead}
        </p>

        <div className="mt-7">
          <RequestForm
            listing={listing}
            defaultDate={date}
            defaultPeople={personnes}
          />
        </div>
      </div>

      <aside className="flex flex-col gap-3.5 lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-panel border border-line">
          <Plate variant={listing.plate} className="h-28" />
          <div className="p-4">
            <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
              {category.label} · {listingPlace(listing, locale)}
            </p>
            <p className="mt-1 font-display text-lg leading-tight">
              {listing.name}
            </p>
            {listing.rating ? (
              <div className="mt-1.5">
                <Rating
                  score={listing.rating.score}
                  count={listing.rating.count}
                  locale={locale}
                  showCount
                />
              </div>
            ) : null}
            <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-line pt-3 text-small">
              <span className="text-ink-muted">{t.request.indicativeRate}</span>
              <span className="tabular font-mono text-ink">
                {formatPrice(listing.price, locale)}
                {priceUnit(listing.price, locale) ? (
                  <span className="ml-1 font-sans text-label text-ink-subtle">
                    {priceUnit(listing.price, locale)}
                  </span>
                ) : null}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-panel bg-surface p-4.5">
          <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
            {t.request.whatNext}
          </p>
          <ol className="mt-3 flex flex-col gap-3.5 text-small text-ink-muted">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="tabular font-mono text-accent"
                >
                  {index + 1}
                </span>
                <span>
                  {step}
                  {index === 1 && detail.responseTime ? (
                    <> {fill(t.request.step2Time, { time: detail.responseTime })}</>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <p className="text-label text-ink-subtle">
          <Link href={localeHref(locale, "/contact")} className="text-brand hover:underline">
            {t.request.problem}
          </Link>
        </p>
      </aside>
    </div>
  );
}
