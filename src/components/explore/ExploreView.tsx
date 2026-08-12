import Link from "next/link";
import { FilterPanel } from "@/components/explore/FilterPanel";
import { MobileFilterSheet } from "@/components/explore/MobileFilterSheet";
import { SortControl } from "@/components/explore/SortControl";
import { ListingCard } from "@/components/listing/ListingCard";
import { Button } from "@/components/ui/Button";
import {
  activeFilterCount,
  buildHref,
  filterListings,
  parseFilters,
  sortListings,
  TAG_LABELS,
  ZONES,
  PAGE_SIZE,
  BUDGET_BANDS,
  type SearchParams,
} from "@/lib/filters";
import { CATEGORIES, categoryBySlug, TOTAL_LISTINGS } from "@/lib/site";
import type { CategorySlug } from "@/lib/site";

/**
 * One catalog page. `/explorer` shows everything; `/explorer/hotels` is the
 * same page with the category fixed by the route rather than by a filter.
 */
export function ExploreView({
  params,
  basePath,
  forcedCategory,
  title,
  intro,
}: {
  params: SearchParams;
  basePath: string;
  forcedCategory?: CategorySlug;
  title: string;
  intro: string;
}) {
  const filters = parseFilters(params, forcedCategory);
  const categoryFromRoute = forcedCategory !== undefined;
  const activeCount = activeFilterCount(filters, categoryFromRoute);

  const matched = sortListings(filterListings(filters), filters.sort);
  const visible = matched.slice(0, filters.limit);
  const hasMore = matched.length > visible.length;

  const chips = [
    ...(categoryFromRoute
      ? []
      : filters.categories.map((slug) => ({
          key: "categorie",
          value: slug,
          label: categoryBySlug(slug)?.label ?? slug,
        }))),
    ...filters.zones.map((slug) => ({
      key: "lieu",
      value: slug,
      label: ZONES.find((zone) => zone.slug === slug)?.label ?? slug,
    })),
    ...filters.tags.map((tag) => ({
      key: "tag",
      value: tag,
      label: TAG_LABELS[tag] ?? tag,
    })),
    ...(filters.minRating
      ? [
          {
            key: "note",
            value: String(filters.minRating),
            label: `${filters.minRating} étoiles et plus`,
          },
        ]
      : []),
    ...(filters.maxPrice
      ? [
          {
            key: "budget",
            value: String(filters.maxPrice),
            label:
              BUDGET_BANDS.find((band) => band.value === filters.maxPrice)
                ?.label ?? `≤ ${filters.maxPrice} Ar`,
          },
        ]
      : []),
  ];

  return (
    <>
      <header className="border-b border-line bg-surface px-4 pb-5 pt-7 md:px-6">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
            <Link href="/" className="hover:text-ink">
              Accueil
            </Link>
            {" / "}
            {categoryFromRoute ? (
              <>
                <Link href="/explorer" className="hover:text-ink">
                  Explorer
                </Link>
                {" / "}
                <span className="text-ink">{title}</span>
              </>
            ) : (
              <span className="text-ink">Explorer</span>
            )}
          </p>

          <h1 className="mt-2.5 text-page">{title}</h1>
          <p className="mt-2 max-w-[60ch] text-ink-muted">{intro}</p>

          {/* Category switcher. On /explorer these set a filter; on a category
              route they navigate, because the category is the route. */}
          <ul className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
            <li>
              <Link
                href="/explorer"
                scroll={false}
                className={`inline-block whitespace-nowrap rounded-plate border px-3.5 py-2 text-small ${
                  !categoryFromRoute && filters.categories.length === 0
                    ? "border-accent bg-accent font-semibold text-accent-contrast"
                    : "border-line-strong text-ink-muted hover:text-ink"
                }`}
              >
                Tout · <span className="tabular">{TOTAL_LISTINGS}</span>
              </Link>
            </li>
            {CATEGORIES.map((category) => {
              const selected = filters.categories.includes(category.slug);
              return (
                <li key={category.slug}>
                  <Link
                    href={`/explorer/${category.slug}`}
                    className={`inline-block whitespace-nowrap rounded-plate border px-3.5 py-2 text-small ${
                      selected
                        ? "border-accent bg-accent font-semibold text-accent-contrast"
                        : "border-line-strong text-ink-muted hover:text-ink"
                    }`}
                  >
                    {category.label} ·{" "}
                    <span className="tabular">{category.count}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] items-start gap-0 px-4 pb-16 md:px-6 lg:grid-cols-[15.5rem_1fr]">
        <aside className="hidden py-6 pr-6 lg:sticky lg:top-20 lg:block">
          <FilterPanel
            filters={filters}
            basePath={basePath}
            params={params}
            categoryFromRoute={categoryFromRoute}
            activeCount={activeCount}
          />
        </aside>

        <section className="py-6 lg:border-l lg:border-line lg:pl-6">
          <div className="mb-4 flex flex-wrap items-center gap-2.5">
            {chips.map((chip) => (
              <Link
                key={`${chip.key}-${chip.value}`}
                href={buildHref(basePath, params, {
                  key: chip.key,
                  value: chip.key === "note" || chip.key === "budget" ? undefined : chip.value,
                  toggle: chip.key !== "note" && chip.key !== "budget",
                })}
                scroll={false}
                className="inline-flex items-center gap-1.5 rounded-plate border border-line-strong px-2.5 py-1.5 text-small text-ink-muted hover:text-ink"
              >
                {chip.label}
                <span aria-hidden="true">✕</span>
                <span className="sr-only">Retirer ce filtre</span>
              </Link>
            ))}

            <p
              aria-live="polite"
              className="ml-auto text-small text-ink-subtle"
            >
              <strong className="tabular font-semibold text-ink">
                {matched.length}
              </strong>{" "}
              {matched.length === 1 ? "résultat" : "résultats"}
            </p>

            <SortControl
              sort={filters.sort}
              basePath={basePath}
              params={params}
            />
          </div>

          <div className="mb-4 lg:hidden">
            <MobileFilterSheet
              activeCount={activeCount}
              resultCount={matched.length}
            >
              <FilterPanel
                filters={filters}
                basePath={basePath}
                params={params}
                categoryFromRoute={categoryFromRoute}
                activeCount={activeCount}
              />
            </MobileFilterSheet>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-plate border border-dashed border-line-strong px-5 py-12 text-center">
              <p aria-hidden="true" className="text-2xl text-ink-subtle">
                ◎
              </p>
              <p className="mt-2 font-semibold">
                Aucun lieu ne correspond à ces filtres
              </p>
              <p className="mx-auto mt-1.5 max-w-[38ch] text-small text-ink-muted">
                Élargissez la zone ou retirez le filtre budget pour voir les{" "}
                <span className="tabular">{TOTAL_LISTINGS}</span> lieux de
                l’Anosy.
              </p>
              <div className="mt-4">
                <Button href={basePath} variant="secondary" size="sm">
                  Retirer les filtres
                </Button>
              </div>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((listing) => (
                <li key={listing.slug} className="flex">
                  <ListingCard
                    listing={listing}
                    showCategory={!categoryFromRoute}
                  />
                </li>
              ))}
            </ul>
          )}

          {hasMore ? (
            <div className="mt-7 text-center">
              {/* scroll={false} keeps the visitor where they were — the whole
                  point of "show more" over numbered pages. */}
              <Button
                href={buildHref(basePath, params, {
                  key: "afficher",
                  value: String(filters.limit + PAGE_SIZE),
                })}
                variant="secondary"
                scroll={false}
              >
                Afficher plus de résultats
              </Button>
              <p className="tabular mt-2.5 font-mono text-label text-ink-subtle">
                {visible.length} sur {matched.length}
              </p>
            </div>
          ) : null}
        </section>
      </div>
    </>
  );
}
