export type AlertTone = "success" | "season" | "error";

const TONES: Record<AlertTone, { box: string; icon: string; glyph: string }> = {
  success: {
    box: "border-whatsapp/50 bg-whatsapp/8",
    icon: "text-whatsapp",
    glyph: "✓",
  },
  season: { box: "border-accent bg-accent/8", icon: "text-accent", glyph: "◈" },
  error: { box: "border-warn bg-warn/8", icon: "text-warn", glyph: "!" },
};

export function Alert({
  tone = "season",
  title,
  children,
}: {
  tone?: AlertTone;
  title?: string;
  children: React.ReactNode;
}) {
  const style = TONES[tone];

  return (
    <div
      role={tone === "error" ? "alert" : undefined}
      className={`flex gap-3 rounded-plate border p-3.5 text-small text-ink-muted ${style.box}`}
    >
      <span aria-hidden="true" className={`leading-snug ${style.icon}`}>
        {style.glyph}
      </span>
      <div>
        {title ? (
          <strong className="block font-semibold text-ink">{title}</strong>
        ) : null}
        {children}
      </div>
    </div>
  );
}
