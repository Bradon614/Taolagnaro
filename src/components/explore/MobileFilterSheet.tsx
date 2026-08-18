"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { fill } from "@/i18n";

/**
 * The filter panel as a bottom sheet on mobile. It wraps the same
 * server-rendered panel the desktop sidebar uses, so there is one filter UI,
 * not two.
 */
export function MobileFilterSheet({
  activeCount,
  resultCount,
  children,
}: {
  activeCount: number;
  resultCount: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Applying a filter changes the URL; the sheet stays open so several can be
  // set in one go, but a route change to a different page closes it.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        className="flex w-full items-center justify-center gap-2 rounded-plate border border-line-strong px-4 py-2.5 text-small font-semibold"
      >
        <span aria-hidden="true">⚟</span>
        {t.explore.filter}
        {activeCount > 0 ? (
          <span className="tabular rounded-full bg-accent px-1.5 text-label text-accent-contrast">
            {activeCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label={t.common.close}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-abyss/55"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.explore.filters}
            tabIndex={-1}
            className="absolute inset-x-0 bottom-0 top-24 flex flex-col rounded-t-2xl border-t border-line bg-surface outline-none"
          >
            <span
              aria-hidden="true"
              className="mx-auto mb-2 mt-3 block h-1 w-9 shrink-0 rounded-full bg-line-strong"
            />
            <div
              key={search}
              className="flex-1 overflow-y-auto px-5 pb-4"
            >
              {children}
            </div>
            <div className="shrink-0 border-t border-line px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="tabular w-full rounded-plate border border-accent bg-accent px-4 py-3 font-semibold text-accent-contrast"
              >
                {fill(t.explore.seeResults, { count: resultCount })}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
