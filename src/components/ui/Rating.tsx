/**
 * Stars are decorative; the score and count carry the meaning, so the glyphs
 * are hidden from assistive tech and the whole thing reads as one label.
 */
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

export function Rating({
  score,
  count,
  locale = "fr",
  showCount = false,
}: {
  score: number;
  count: number;
  locale?: Locale;
  showCount?: boolean;
}) {
  const t = getDictionary(locale);
  const filled = Math.round(score);
  const formatted =
    locale === "en" ? score.toFixed(1) : score.toFixed(1).replace(".", ",");

  return (
    <span className="inline-flex items-center gap-1.5 text-small text-ink-muted">
      <span aria-hidden="true" className="text-[0.8em] tracking-[0.05em] text-accent">
        {"★".repeat(filled)}
        <span className="opacity-30">{"★".repeat(5 - filled)}</span>
      </span>
      <span className="tabular font-semibold text-ink">{formatted}</span>
      {showCount ? (
        <span className="text-ink-subtle">
          · <span className="tabular">{count}</span> {t.common.reviews}
        </span>
      ) : null}
      <span className="sr-only">
        / 5, {count} {t.common.reviews}
      </span>
    </span>
  );
}
