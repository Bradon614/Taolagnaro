import Link from "next/link";
import { buildHref, SORTS, type SearchParams, type SortKey } from "@/lib/filters";

/**
 * A <details> disclosure rather than a JS dropdown: it opens, closes and
 * closes-on-Escape natively, and the options are ordinary links, so sorting
 * works before hydration and can be shared as a URL.
 */
export function SortControl({
  sort,
  basePath,
  params,
}: {
  sort: SortKey;
  basePath: string;
  params: SearchParams;
}) {
  const current = SORTS.find((entry) => entry.key === sort) ?? SORTS[0];

  return (
    <details className="relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-plate border border-line-strong px-3.5 py-2 text-small [&::-webkit-details-marker]:hidden">
        <span className="text-ink-subtle">Trier&nbsp;:</span>
        {current.label}
        <span aria-hidden="true" className="text-[0.7em]">
          ▼
        </span>
      </summary>
      <ul className="absolute right-0 top-full z-20 mt-1 w-56 overflow-hidden rounded-plate border border-line bg-surface-raised py-1 shadow-[0_10px_28px_-18px_rgb(0_0_0_/_0.6)]">
        {SORTS.map((entry) => (
          <li key={entry.key}>
            <Link
              href={buildHref(basePath, params, {
                key: "tri",
                value: entry.key === "recommandes" ? undefined : entry.key,
              })}
              scroll={false}
              aria-current={entry.key === sort ? "true" : undefined}
              className={`block px-3.5 py-2 text-small hover:bg-surface ${
                entry.key === sort ? "font-semibold text-ink" : "text-ink-muted"
              }`}
            >
              {entry.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
