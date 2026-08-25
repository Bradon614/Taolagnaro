"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useHref, useLocale } from "@/i18n/LocaleProvider";

/**
 * The error boundary for everything under a locale.
 *
 * Deliberately plain: whatever broke may well be the thing that renders
 * cards, plates or the dictionary, so this leans on as little of the app as
 * possible while still looking like the site.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLocale();
  const href = useHref();

  useEffect(() => {
    // Next reports this server-side; the digest is what ties a visitor's
    // report to the server log.
    console.error("[app] rendering error", error.digest ?? error.message);
  }, [error]);

  return (
    <div className="mx-auto max-w-[46rem] px-4 pb-16 pt-16 text-center md:px-6">
      <p aria-hidden="true" className="text-2xl text-warn">
        ⚠
      </p>
      <h1 className="mt-3 text-page">{t.errorPage.title}</h1>
      <p className="mx-auto mt-3 max-w-[48ch] text-ink-muted">
        {t.errorPage.body}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-plate border border-accent bg-accent px-5 py-3 font-semibold text-accent-contrast"
        >
          {t.errorPage.retry}
        </button>
        <Button href={href("/contact")} variant="secondary">
          {t.common.contact}
        </Button>
      </div>

      {error.digest ? (
        <p className="tabular mt-6 font-mono text-label text-ink-subtle">
          {error.digest}
        </p>
      ) : null}
    </div>
  );
}
