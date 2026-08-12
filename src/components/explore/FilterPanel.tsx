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
}: {
  filters: Filters;
  basePath: string;
  params: SearchParams;
  categoryFromRoute: boolean;
  activeCount: number;
}) {
  const tags = availableTags();

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 pb-3">
        <h2 className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
          Filtres
        </h2>
        {activeCount > 0 ? (
          <Link
            href={basePath}
            scroll={false}
            className="text-small text-brand hover:underline"
          >
            Effacer ({activeCount})
          </Link>
        ) : null}
      </div>

      {categoryFromRoute ? null : (
        <FilterGroup
          title="Catégorie"
          paramKey="categorie"
          selected={filters.categories}
          basePath={basePath}
          params={params}
          facets={CATEGORIES.map((category) => ({
            value: category.slug,
            label: category.label,
            count: category.count,
          }))}
        />
      )}

      <FilterGroup
        title="Lieu"
        paramKey="lieu"
        selected={filters.zones}
        basePath={basePath}
        params={params}
        facets={zoneFacets(filters)}
      />

      <FilterGroup
        title="Budget"
        paramKey="budget"
        toggle={false}
        selected={filters.maxPrice ? [String(filters.maxPrice)] : []}
        basePath={basePath}
        params={params}
        facets={budgetFacets(filters)}
      />

      <FilterGroup
        title="Note"
        paramKey="note"
        toggle={false}
        selected={filters.minRating ? [String(filters.minRating)] : []}
        basePath={basePath}
        params={params}
        facets={ratingFacets(filters)}
      />

      <FilterGroup
        title="Équipements & services"
        paramKey="tag"
        selected={filters.tags}
        basePath={basePath}
        params={params}
        facets={tagFacets(filters, tags)}
      />
    </div>
  );
}
