import { notFound } from "next/navigation";

/**
 * Catches anything under a locale that no other route matched, so the 404 is
 * rendered by `[locale]/not-found.tsx` — inside the locale layout, with the
 * header, the footer and the right `lang` attribute.
 *
 * Without this, an unknown path falls through to Next's built-in 404, which
 * sits outside the design entirely. The alternative — a root layout above the
 * locale segment — would cost the per-language `lang`, which a screen reader
 * relies on to pronounce the page.
 *
 * Route precedence means concrete and single-dynamic routes are matched first,
 * so this only ever sees paths nothing else claimed.
 */
export default function NotFoundCatchAll(): never {
  notFound();
}
