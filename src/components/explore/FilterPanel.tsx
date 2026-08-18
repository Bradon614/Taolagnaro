import Link from "next/link";
import { FilterGroup } from "@/components/explore/FilterGroup";
import {
  availableTags,
  budgetFacets,
  ratingFacets,
  tagFacets,
  zoneFacets,
  type Filters,
  type SearchParams,
} from "@/lib/filters";
import { CATEGORIES } from "@/lib/site";
import { getDictionary, fill } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";
import { formatAriary } from "@/lib/money";

/**
 * The whole filter set, rendered once and reused by the desktop sidebar and
 * the mobile bottom sheet — there is no second copy to drift out of sync.
 */
export function FilterPanel({
  filters,
  basePath,
  params,
  categoryFromRoute,
  activeCount,
  locale,
}: {
  filters: Filters;
  basePath: string;
  params: SearchParams;
  categoryFromRoute: boolean;
  activeCount: number;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const tags = availableTags();

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 pb-3">
        <h2 className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
          {t.explore.filters}
        </h2>
        {activeCount > 0 ? (
          <Link
            href={localeHref(locale, basePath)}
            scroll={false}
            className="text-small text-brand hover:underline"
          >
            {fill(t.explore.clearCount, { count: activeCount })}
          </Link>
        ) : null}
      </div>

      {categoryFromRoute ? null : (
        <FilterGroup
          title={t.explore.category}
          paramKey="categorie"
          selected={filters.categories}
          basePath={basePath}
          params={params}
          locale={locale}
          facets={CATEGORIES.map((category) => ({
            value: category.slug,
            label: t.categories[category.slug].label,
            count: category.count,
          }))}
        />
      )}

      <FilterGroup
        title={t.explore.place}
        paramKey="lieu"
        selected={filters.zones}
        basePath={basePath}
        params={params}
        locale={locale}
        facets={zoneFacets(filters).map((f) => ({ ...f, label: t.zones[f.value as keyof typeof t.zones] ?? f.label }))}
      />

      <FilterGroup
        title={t.explore.budget}
        paramKey="budget"
        toggle={false}
        selected={filters.maxPrice ? [String(filters.maxPrice)] : []}
        basePath={basePath}
        params={params}
        locale={locale}
        facets={budgetFacets(filters).map((f) => ({ ...f, label: fill(t.explore.underPrice, { price: formatAriary(Number(f.value)) }) }))}
      />

      <FilterGroup
        title={t.explore.rating}
        paramKey="note"
        toggle={false}
        selected={filters.minRating ? [String(filters.minRating)] : []}
        basePath={basePath}
        params={params}
        locale={locale}
        facets={ratingFacets(filters).map((f) => ({ ...f, label: fill(t.explore.starsAndUp, { count: f.value }) }))}
      />

      <FilterGroup
        title={t.explore.amenities}
        paramKey="tag"
        selected={filters.tags}
        basePath={basePath}
        params={params}
        locale={locale}
        facets={tagFacets(filters, tags).map((f) => ({ ...f, label: t.tags[f.value as keyof typeof t.tags] ?? f.label }))}
      />
    </div>
  );
}
