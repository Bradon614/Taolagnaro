import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PHOTOS, photoCaption } from "@/lib/photos";
import { getDictionary } from "@/i18n";
import { isLocale, localeHref, type Locale } from "@/i18n/config";

/**
 * Photograph credits.
 *
 * Most of these images are CC BY-SA: showing them without naming the author
 * and the licence would breach the terms. This page is the attribution, and
 * every gallery links to it.
 */

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  return {
    title: en ? "Photo credits" : "Crédits photographiques",
    description: en
      ? "Authors and licences for every photograph used on this site."
      : "Auteurs et licences de chaque photographie utilisée sur ce site.",
  };
}

export default async function CreditsPage({ params }: Params) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "fr";
  const t = getDictionary(locale);
  const en = locale === "en";

  return (
    <div className="mx-auto max-w-[64rem] px-4 pb-16 pt-8 md:px-6">
      <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
        <Link href={localeHref(locale, "/")} className="hover:text-ink">
          {t.common.home}
        </Link>{" "}
        / {en ? "Photo credits" : "Crédits"}
      </p>

      <h1 className="mt-2.5 text-page">
        {en ? "Photo credits" : "Crédits photographiques"}
      </h1>
      <p className="mt-2.5 max-w-[58ch] text-ink-muted">
        {en
          ? "Every photograph on this site comes from Wikimedia Commons under a free licence. Each one is listed below with its author, its licence and a link to the original."
          : "Toutes les photographies de ce site proviennent de Wikimedia Commons sous licence libre. Chacune est listée ci-dessous avec son auteur, sa licence et un lien vers l’original."}
      </p>
      <p className="mt-2 max-w-[58ch] text-small text-ink-subtle">
        {en
          ? "Places with no photograph keep a generated plate. Photographs of hotels, restaurants and activities come from the establishments themselves."
          : "Les lieux sans photographie conservent une plaque générée. Les photographies d’hôtels, de restaurants et d’activités proviennent des établissements eux-mêmes."}
      </p>

      <ul className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {PHOTOS.map((photo) => (
          <li
            key={photo.id}
            className="overflow-hidden rounded-plate border border-line bg-surface"
          >
            <div className="relative aspect-[3/2]">
              <Image
                src={photo.src}
                alt={photoCaption(photo, locale)}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-3.5">
              <p className="text-small">{photoCaption(photo, locale)}</p>
              <p className="mt-1.5 font-mono text-label text-ink-subtle">
                {photo.author}
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-label">
                {photo.licenceUrl ? (
                  <a
                    href={photo.licenceUrl}
                    target="_blank"
                    rel="noreferrer noopener license"
                    className="text-brand hover:underline"
                  >
                    {photo.licence}
                  </a>
                ) : (
                  <span className="text-ink-subtle">{photo.licence}</span>
                )}
                <span aria-hidden="true" className="text-ink-subtle">
                  ·
                </span>
                <a
                  href={photo.source}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-ink-subtle hover:text-ink"
                >
                  {en ? "original" : "original"}
                </a>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
