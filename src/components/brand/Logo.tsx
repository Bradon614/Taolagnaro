/**
 * The brand mark: three contour arcs rising to a sounding point — the headland
 * between the bays, read as a survey chart. The dot is the only place the
 * accent appears in the mark.
 */

type LogoProps = {
  /** Renders the wordmark next to the glyph. */
  showWordmark?: boolean;
  className?: string;
};

export function Logo({ showWordmark = true, className }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-xl tracking-tight ${className ?? ""}`}
    >
      <LogoGlyph />
      {showWordmark ? <span>Taolagnaro</span> : null}
    </span>
  );
}

export function LogoGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`size-4 shrink-0 ${className ?? ""}`}
    >
      <path
        d="M1 13a7 7 0 0 1 14 0"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M4 13a4 4 0 0 1 8 0"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="8" cy="13" r="1.1" fill="var(--accent)" />
    </svg>
  );
}
