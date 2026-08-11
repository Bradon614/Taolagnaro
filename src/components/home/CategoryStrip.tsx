import Link from "next/link";
import { Plate } from "@/components/media/Plate";
import { CATEGORIES } from "@/lib/site";

/**
 * Counts, not adjectives. A real number tells a visitor whether the platform
 * is worth their time, and it is the honest way to show a young catalog.
 */
export function CategoryStrip() {
  return (
    <section
      aria-label="Explorer par catégorie"
      className="border-y border-line bg-surface px-4 py-8 md:px-6"
    >
      <ul className="mx-auto grid max-w-[1440px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {CATEGORIES.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/explorer/${category.slug}`}
              className="group block rounded-plate"
            >
              <Plate
                variant={category.plate}
                className="h-20 rounded-plate transition-opacity group-hover:opacity-85 lg:h-24"
              >
                <span className="mt-auto p-3 text-small font-semibold text-white">
                  {category.label}
                </span>
              </Plate>
              <span className="tabular mt-2 block font-mono text-label uppercase tracking-[0.1em] text-ink-subtle">
                {category.count} lieux
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
