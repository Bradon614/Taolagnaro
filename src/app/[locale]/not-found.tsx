import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plate } from "@/components/media/Plate";
import { getDictionary, fill } from "@/i18n";
import { DEFAULT_LOCALE, localeHref } from "@/i18n/config";
import { photoById } from "@/lib/photos";
import { CATEGORIES, TOTAL_LISTINGS } from "@/lib/site";

/**
 * A 404 that offers a way forward rather than an apology.
 *
 * Next renders not-found outside the locale segment, so this page gets
 * neither the site header nor the visitor's locale: it falls back to French,
 * the default. Fixing that would mean moving <html> above the locale segment
 * and giving up the per-language `lang` attribute on all 188 real pages —
 * a bad trade for a page almost nobody sees.
 *
 * The server HTML is therefore a bare document; React hydrates the header and
 * footer in, so a real visitor does get the full chrome. What is served to a
 * crawler still has to stand on its own, which is why this page carries its
 * own ways out rather than relying on navigation being there.
 */
export default function NotFound() {
  const locale = DEFAULT_LOCALE;
  const t = getDictionary(locale);
  const href = (path: string) => localeHref(locale, path);

  return (
    <div className="mx-auto max-w-[52rem] px-4 pb-16 pt-14 md:px-6">
      <p className="tabular font-mono text-label uppercase tracking-[0.2em] text-accent">
        {t.notFound.code}
      </p>
      <h1 className="mt-3 text-page md:text-[2.4rem] md:leading-[1.08]">
        {t.notFound.title}
      </h1>
      <p className="mt-3 max-w-[52ch] text-ink-muted">{t.notFound.body}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={href("/explorer")} variant="primary">
          {fill(t.home.ctaExplore, { count: TOTAL_LISTINGS })}
        </Button>
        <Button href={href("/")} variant="secondary">
          {t.common.backHome}
        </Button>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {CATEGORIES.map((category) => (
          <li key={category.slug}>
            <Link
              href={href(`/explorer/${category.slug}`)}
              className="group block rounded-plate"
            >
              <Plate
                variant={category.plate}
                className="h-20 rounded-plate transition-opacity group-hover:opacity-85"
              />
              <span className="mt-1.5 block text-small font-semibold">
                {t.categories[category.slug].label}
              </span>
              <span className="tabular block font-mono text-label text-ink-subtle">
                {category.count} {t.common.places}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 overflow-hidden rounded-panel">
        <Plate
          variant="sunset"
          photo={photoById("vue-de-fort-dauphin-et-de-l-oc-an-indien")}
          alt=""
          sizes="(max-width: 768px) 100vw, 52rem"
          className="h-40"
        />
      </div>
    </div>
  );
}
