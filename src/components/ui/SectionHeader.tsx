import Link from "next/link";

export function SectionHeader({
  kicker,
  title,
  action,
}: {
  kicker: string;
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="font-mono text-label uppercase tracking-[0.15em] text-ink-subtle">
          {kicker}
        </p>
        <h2 className="mt-1.5 text-section">{title}</h2>
      </div>
      {action ? (
        <Link
          href={action.href}
          className="text-small whitespace-nowrap text-brand hover:underline"
        >
          {action.label} →
        </Link>
      ) : null}
    </div>
  );
}
