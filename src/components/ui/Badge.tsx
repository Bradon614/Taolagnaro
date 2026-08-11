export type BadgeTone = "neutral" | "accent" | "outline" | "warm" | "floating";

const TONES: Record<BadgeTone, string> = {
  neutral: "border-line bg-surface-raised text-ink-muted",
  accent: "border-accent bg-accent text-accent-contrast",
  outline: "border-line-strong bg-transparent text-ink-muted",
  warm: "border-warn bg-transparent text-warn",
  // Sits over an image plate, so it carries its own contrast.
  floating: "border-transparent bg-abyss/70 text-white backdrop-blur-sm",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-label uppercase tracking-[0.12em] ${TONES[tone]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
