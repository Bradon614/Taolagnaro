import Link from "next/link";
import type { Facet, SearchParams } from "@/lib/filters";
import { buildHref } from "@/lib/filters";
import { localeHref, type Locale } from "@/i18n/config";

/**
 * A filter group renders as links, not inputs.
 *
 * Every option carries a live count, and an option that would return nothing
 * is greyed rather than hidden — checkboxes that vanish as you tick things
 * make a catalog feel broken.
 */
export function FilterGroup({
  title,
  facets,
  paramKey,
  selected,
  basePath,
  params,
  locale,
  toggle = true,
}: {
  title: string;
  facets: Facet[];
  paramKey: string;
  selected: string[];
  basePath: string;
  params: SearchParams;
  locale: Locale;
  /** Multi-select (checkbox behaviour) vs single-select (radio behaviour). */
  toggle?: boolean;
}) {
  return (
    <div className="border-b border-line py-4 first:pt-0 last:border-0 last:pb-0">
      <h3 className="mb-2.5 text-small font-semibold">{title}</h3>
      <ul className="flex flex-col gap-1.5">
        {facets.map((facet) => {
          const isSelected = selected.includes(facet.value);
          const empty = facet.count === 0 && !isSelected;

          const href = localeHref(
            locale,
            buildHref(basePath, params, {
              key: paramKey,
              value: isSelected && !toggle ? undefined : facet.value,
              toggle,
            }),
          );

          return (
            <li key={facet.value}>
              <Link
                href={href}
                scroll={false}
                aria-disabled={empty || undefined}
                className={`flex items-baseline gap-2 text-small ${
                  empty
                    ? "pointer-events-none opacity-40"
                    : isSelected
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={isSelected ? "text-accent" : "text-ink-subtle"}
                >
                  {isSelected ? "▣" : "□"}
                </span>
                <span className="flex-1">{facet.label}</span>
                <span className="tabular font-mono text-label text-ink-subtle">
                  {facet.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
