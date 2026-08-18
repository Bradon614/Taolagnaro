"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Plate } from "@/components/media/Plate";
import { formatPrice } from "@/lib/money";
import { listingHref } from "@/lib/listings";
import { searchListings, SUGGESTED_QUERIES } from "@/lib/search";
import { CATEGORIES, categoryBySlug } from "@/lib/site";
import { useHref, useLocale } from "@/i18n/LocaleProvider";
import { fill } from "@/i18n";

/**
 * Search opens as a full-screen overlay rather than an inline dropdown.
 *
 * On a phone a dropdown under a header field leaves about four visible rows
 * above the keyboard; the overlay gets the whole screen and can show recent
 * searches and category shortcuts alongside results.
 *
 * Recent searches are kept in localStorage — device-local, never sent
 * anywhere, and cleared by the visitor from inside the overlay.
 */

const RECENTS_KEY = "tao_recent_searches";
const MAX_RECENTS = 5;

type SearchContextValue = { open: () => void };

const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearch(): SearchContextValue {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used inside SearchProvider");
  }
  return context;
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { t } = useLocale();
  const href = useHref();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recents, setRecents] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    previouslyFocused.current = document.activeElement as HTMLElement;
    // Read recents here rather than in an effect: this is an event handler,
    // and doing it on open also picks up searches made in another tab.
    try {
      const stored = localStorage.getItem(RECENTS_KEY);
      setRecents(stored ? (JSON.parse(stored) as string[]) : []);
    } catch {
      setRecents([]);
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    previouslyFocused.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);

    // The page behind must not scroll while the overlay owns the screen.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  function remember(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;
    const next = [trimmed, ...recents.filter((r) => r !== trimmed)].slice(
      0,
      MAX_RECENTS,
    );
    setRecents(next);
    try {
      localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
    } catch {
      // Private browsing or a full quota — searching still works.
    }
  }

  function submit(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;
    remember(trimmed);
    setIsOpen(false);
    setQuery("");
    router.push(href(`/explorer?q=${encodeURIComponent(trimmed)}`));
  }

  function clearRecents() {
    setRecents([]);
    try {
      localStorage.removeItem(RECENTS_KEY);
    } catch {
      // Nothing to do.
    }
  }

  const results = useMemo(() => searchListings(query, 6), [query]);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <SearchContext.Provider value={value}>
      {children}

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.search.dialogLabel}
          className="fixed inset-0 z-[60] flex flex-col bg-ground"
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submit(query);
            }}
            className="flex items-center gap-3 border-b border-line px-4 py-3 md:px-6"
          >
            <span aria-hidden="true" className="text-ink-subtle">
              ⌕
            </span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.nav.searchPlaceholder}
              aria-label={t.search.inputLabel}
              className="min-w-0 flex-1 bg-transparent py-1.5 text-lg text-ink outline-none placeholder:text-ink-subtle"
            />
            <button
              type="button"
              onClick={close}
              className="shrink-0 rounded-plate border border-line-strong px-3 py-1.5 text-small text-ink-muted hover:text-ink"
            >
              {t.common.close}
            </button>
          </form>

          <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6">
            <div className="mx-auto max-w-[46rem]">
              {query.trim().length > 0 ? (
                results.length > 0 ? (
                  <>
                    <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
                      {t.search.results}
                    </p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {results.map((listing) => (
                        <li key={listing.slug}>
                          <Link
                            href={href(listingHref(listing))}
                            onClick={() => {
                              remember(query);
                              setIsOpen(false);
                              setQuery("");
                            }}
                            className="flex items-center gap-3 rounded-plate border border-line bg-surface p-2.5 hover:border-line-strong"
                          >
                            <Plate
                              variant={listing.plate}
                              className="size-12 shrink-0 rounded-sm"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block font-display text-[1.02rem] leading-tight">
                                {listing.name}
                              </span>
                              <span className="block text-label text-ink-subtle">
                                {categoryBySlug(listing.category)?.label} ·{" "}
                                {listing.place}
                              </span>
                            </span>
                            <span className="tabular shrink-0 font-mono text-small text-ink-muted">
                              {formatPrice(listing.price)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => submit(query)}
                        className="text-small text-brand hover:underline"
                      >
                        {fill(t.search.seeAllFor, { query: query.trim() })}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="rounded-plate border border-dashed border-line-strong px-5 py-10 text-center">
                    <p className="font-semibold">
                      {fill(t.search.noMatch, { query: query.trim() })}
                    </p>
                    <p className="mx-auto mt-1.5 max-w-[40ch] text-small text-ink-muted">
{t.search.noMatchHelp}
                    </p>
                  </div>
                )
              ) : (
                <>
                  {recents.length > 0 ? (
                    <section className="mb-6">
                      <div className="flex items-baseline justify-between gap-3">
                        <h2 className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
                          {t.search.recent}
                        </h2>
                        <button
                          type="button"
                          onClick={clearRecents}
                          className="text-small text-brand hover:underline"
                        >
                          {t.common.clear}
                        </button>
                      </div>
                      <ul className="mt-2.5 flex flex-wrap gap-2">
                        {recents.map((term) => (
                          <li key={term}>
                            <button
                              type="button"
                              onClick={() => submit(term)}
                              className="rounded-plate border border-line-strong px-3 py-1.5 text-small text-ink-muted hover:text-ink"
                            >
                              {term}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  <section className="mb-6">
                    <h2 className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
                      {t.search.suggestions}
                    </h2>
                    <ul className="mt-2.5 flex flex-wrap gap-2">
                      {SUGGESTED_QUERIES.map((term) => (
                        <li key={term}>
                          <button
                            type="button"
                            onClick={() => submit(term)}
                            className="rounded-plate border border-line-strong px-3 py-1.5 text-small text-ink-muted hover:text-ink"
                          >
                            {term}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h2 className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
                      {t.search.browseByCategory}
                    </h2>
                    <ul className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {CATEGORIES.map((category) => (
                        <li key={category.slug}>
                          <Link
                            href={href(`/explorer/${category.slug}`)}
                            onClick={() => setIsOpen(false)}
                            className="block rounded-plate"
                          >
                            <Plate
                              variant={category.plate}
                              className="h-16 rounded-plate"
                            />
                            <span className="mt-1.5 block text-small font-semibold">
                              {category.label}
                            </span>
                            <span className="tabular block font-mono text-label text-ink-subtle">
                              {category.count} {t.common.places}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </SearchContext.Provider>
  );
}
