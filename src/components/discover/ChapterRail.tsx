"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Chapter } from "@/lib/discover";
import { TOTAL_LISTINGS } from "@/lib/site";

/**
 * Chapter index. A sticky rail in the margin on desktop, a sticky scrolling
 * strip under the header on mobile.
 *
 * The active chapter is tracked with an IntersectionObserver — the state is
 * set from the observer callback, which is a subscription, not a render
 * side-effect.
 */
export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Focus on a band near the top of the viewport so the highlight tracks
      // what is being read, not whatever happens to be largest on screen.
      { rootMargin: "-12% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <>
      {/* Mobile: a strip that scrolls with the chapters */}
      <nav
        aria-label="Chapitres"
        className="sticky top-0 z-20 -mx-4 border-b border-line bg-ground/95 px-4 py-2.5 backdrop-blur lg:hidden"
      >
        <ul className="flex gap-2 overflow-x-auto">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={active === chapter.id ? "true" : undefined}
                className={`inline-block whitespace-nowrap rounded-plate border px-3 py-1.5 text-small ${
                  active === chapter.id
                    ? "border-accent bg-accent font-semibold text-accent-contrast"
                    : "border-line-strong text-ink-muted"
                }`}
              >
                {chapter.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop: margin rail */}
      <nav
        aria-label="Chapitres"
        className="hidden lg:sticky lg:top-24 lg:block lg:self-start lg:pr-7"
      >
        <p className="mb-3 font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
          Chapitres
        </p>
        <ul className="flex flex-col gap-2">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={active === chapter.id ? "true" : undefined}
                className={`-ml-3 block border-l-2 pl-2.5 text-small ${
                  active === chapter.id
                    ? "border-accent font-semibold text-ink"
                    : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {chapter.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-line pt-4">
          <Button href="/explorer" variant="secondary" size="sm" fullWidth>
            Explorer les {TOTAL_LISTINGS} lieux
          </Button>
        </div>
      </nav>
    </>
  );
}
