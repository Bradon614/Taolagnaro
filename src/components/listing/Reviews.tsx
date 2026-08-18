import { Rating } from "@/components/ui/Rating";
import type { Review } from "@/lib/listing-details";
import { getDictionary, fill } from "@/i18n";
import type { Locale } from "@/i18n/config";

/**
 * Reviews are only accepted from visitors whose request a provider confirmed.
 * A tourism platform's reviews are worthless the moment they can be invented,
 * so each one carries a name, an origin and a date.
 */
export function Reviews({
  reviews,
  total,
  locale = "fr",
}: {
  reviews: Review[];
  total?: number;
  locale?: Locale;
}) {
  const t = getDictionary(locale);
  if (reviews.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-[1.3rem]">
        {t.detail.reviewsTitle}{" "}
        {total ? (
          <span className="tabular font-mono text-small text-ink-subtle">
            {total}
          </span>
        ) : null}
      </h2>

      <ul className="mt-3 grid gap-3.5 sm:grid-cols-2">
        {reviews.map((review) => (
          <li
            key={`${review.author}-${review.date}`}
            className="rounded-plate border border-line bg-surface p-4"
          >
            <Rating score={review.score} count={1} locale={locale} />
            <blockquote className="mt-2.5 font-display text-[1.02rem] leading-snug">
              «&nbsp;{review.body}&nbsp;»
            </blockquote>
            <p className="mt-2.5 text-label text-ink-subtle">
              {review.author} · {review.from} ·{" "}
              <span className="tabular">{review.date}</span>
            </p>
          </li>
        ))}
      </ul>

      {total && total > reviews.length ? (
        <p className="mt-3">
          <span className="text-small text-ink-subtle">
            {fill(t.detail.reviewsShown, { shown: reviews.length, total: total ?? 0 })}
          </span>
        </p>
      ) : null}
    </section>
  );
}
