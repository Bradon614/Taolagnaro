import Link from "next/link";

/**
 * Temporary stand-in for a route that has not been built yet. It exists so the
 * navigation can be exercised end to end; each one is replaced by the real
 * page in its own step.
 */
export function PagePlaceholder({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-6 md:py-20">
      <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
        {kicker}
      </p>
      <h1 className="mt-3 text-page">{title}</h1>
      <p className="mt-3 max-w-[58ch] text-ink-muted">{description}</p>
      <p className="mt-8 inline-block rounded-plate border border-dashed border-line-strong px-4 py-3 text-small text-ink-subtle">
        Page en construction — la maquette validée est en cours d’intégration.
      </p>
      <p className="mt-6">
        <Link href="/" className="text-small text-brand hover:underline">
          ← Retour à l’accueil
        </Link>
      </p>
    </div>
  );
}
