/**
 * Stars are decorative; the score and count carry the meaning, so the glyphs
 * are hidden from assistive tech and the whole thing reads as one label.
 */
export function Rating({
  score,
  count,
  showCount = false,
}: {
  score: number;
  count: number;
  showCount?: boolean;
}) {
  const filled = Math.round(score);
  const formatted = score.toFixed(1).replace(".", ",");

  return (
    <span className="inline-flex items-center gap-1.5 text-small text-ink-muted">
      <span aria-hidden="true" className="text-[0.8em] tracking-[0.05em] text-accent">
        {"★".repeat(filled)}
        <span className="opacity-30">{"★".repeat(5 - filled)}</span>
      </span>
      <span className="tabular font-semibold text-ink">{formatted}</span>
      {showCount ? (
        <span className="text-ink-subtle">
          · <span className="tabular">{count}</span> avis
        </span>
      ) : null}
      <span className="sr-only">
        sur 5, {count} avis
      </span>
    </span>
  );
}
