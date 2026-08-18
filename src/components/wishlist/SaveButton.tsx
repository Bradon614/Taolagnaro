"use client";

import { useWishlist } from "@/lib/wishlist";
import { useLocale } from "@/i18n/LocaleProvider";
import { fill } from "@/i18n";

/**
 * Two shapes: a heart floating over a card image, and a labelled button in the
 * detail panel. Both drive the same store, so saving in one place updates
 * every other instance and the tab-bar count immediately.
 */
export function SaveButton({
  slug,
  name,
  variant = "icon",
  className,
}: {
  slug: string;
  name: string;
  variant?: "icon" | "labelled";
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const { t } = useLocale();
  const saved = has(slug);

  const label = fill(saved ? t.wishlist.remove : t.wishlist.add, { name });

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={saved}
        aria-label={label}
        title={label}
        className={`grid size-8 place-items-center rounded-full border border-transparent bg-abyss/60 text-base leading-none text-white backdrop-blur-sm transition-colors hover:bg-abyss/80 ${
          saved ? "text-accent" : ""
        } ${className ?? ""}`}
      >
        <span aria-hidden="true">{saved ? "♥" : "♡"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={saved}
      className={`inline-flex items-center justify-center gap-2 rounded-plate border px-4 py-2.5 text-small font-semibold transition-colors ${
        saved
          ? "border-accent text-ink"
          : "border-line-strong text-ink hover:border-ink-subtle"
      } ${className ?? ""}`}
    >
      <span aria-hidden="true" className={saved ? "text-accent" : ""}>
        {saved ? "♥" : "♡"}
      </span>
      {saved ? t.common.saved : t.common.save}
    </button>
  );
}
