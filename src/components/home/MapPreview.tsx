import { Plate } from "@/components/media/Plate";
import { Button } from "@/components/ui/Button";
import { TOTAL_LISTINGS } from "@/lib/site";
import { getDictionary, fill } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";


/**
 * Deliberately static. No tile library loads on the home page — the map only
 * initialises on /carte. This is the single biggest bandwidth saving on the
 * busiest page, which matters on the connections most visitors are using.
 */
export function MapPreview({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section className="relative border-t border-line">
      <Plate variant="reef" className="min-h-[20rem] md:min-h-[21rem]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 items-center px-4 py-10 md:px-6">
          <div className="max-w-md rounded-panel bg-surface p-6 md:p-7">
            <p className="font-mono text-label uppercase tracking-[0.16em] text-ink-subtle">
              {t.home.mapKicker}
            </p>
            <h2 className="mt-2 text-section">{t.home.mapTitle}</h2>
            <p className="mt-2.5 text-small text-ink-muted">
              {fill(t.home.mapBody, { count: TOTAL_LISTINGS })}
            </p>
            <Button href={localeHref(locale, "/carte")} variant="primary" className="mt-5">
              {t.common.openMap}
            </Button>
          </div>
        </div>
      </Plate>
    </section>
  );
}
