/**
 * A plain GET form. Submitting navigates to the same page with `?q=`, so the
 * query behaves exactly like every other filter: server-rendered, shareable,
 * and working before hydration.
 *
 * Deliberately not the overlay — on Explore the visitor is already in the
 * results and wants to adjust the query in place, not be taken to a
 * full-screen search.
 */
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

export function ExploreSearchField({
  basePath,
  query,
  locale,
}: {
  basePath: string;
  query: string;
  locale: Locale;
}) {
  const t = getDictionary(locale);

  return (
    <form
      action={basePath}
      method="get"
      role="search"
      className="flex items-center gap-2 rounded-full border border-line-strong bg-surface-raised px-3.5 py-1.5"
    >
      <span aria-hidden="true" className="text-ink-subtle">
        ⌕
      </span>
      <label htmlFor="explore-q" className="sr-only">
        {t.search.inResults}
      </label>
      <input
        id="explore-q"
        name="q"
        type="search"
        defaultValue={query}
        placeholder={t.nav.searchPlaceholder}
        className="min-w-0 flex-1 bg-transparent py-1.5 text-small text-ink outline-none placeholder:text-ink-subtle"
      />
      <button
        type="submit"
        className="shrink-0 text-small font-semibold text-brand hover:underline"
      >
        OK
      </button>
    </form>
  );
}
