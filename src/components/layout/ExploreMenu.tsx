"use client";

import Link from "next/link";
import { CATEGORIES, EXPLORE_SHORTCUTS } from "@/lib/site";
import { Plate } from "@/components/media/Plate";

type ExploreMenuProps = {
  id: string;
  onNavigate: () => void;
};

/**
 * The Explore mega-panel — the only nesting anywhere in the product.
 * Opening is handled by the header; this renders the panel body.
 */
export function ExploreMenu({ id, onNavigate }: ExploreMenuProps) {
  return (
    <div
      id={id}
      className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-[0_12px_28px_-18px_rgb(0_0_0_/_0.45)]"
    >
      <div className="mx-auto grid max-w-[1220px] gap-5 px-6 pb-8 pt-6 lg:grid-cols-[repeat(6,1fr)_1.3fr]">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/explorer/${category.slug}`}
            onClick={onNavigate}
            className="group rounded-plate outline-offset-4"
          >
            <Plate
              variant={category.plate}
              className="h-16 rounded-plate transition-opacity group-hover:opacity-85"
            />
            <span className="mt-2 block text-small font-semibold text-ink">
              {category.label}
            </span>
            <span className="block text-small text-ink-subtle">
              {category.tagline}
            </span>
          </Link>
        ))}

        <div className="border-line lg:border-l lg:pl-5">
          <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
            Raccourcis
          </p>
          <ul className="mt-2.5 flex flex-col gap-2">
            {EXPLORE_SHORTCUTS.map((shortcut) => (
              <li key={shortcut.label}>
                <Link
                  href={shortcut.href}
                  onClick={onNavigate}
                  className="text-small text-brand hover:underline"
                >
                  {shortcut.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
