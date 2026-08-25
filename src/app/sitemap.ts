import type { MetadataRoute } from "next";
import { alternatesFor, absolute, indexablePaths } from "@/lib/urls";
import { LOCALES } from "@/i18n/config";

/**
 * One entry per page per language, each declaring its siblings via hreflang.
 *
 * A trilingual tourism site indexed as if it were monolingual loses most of
 * its reach: without these alternates a search engine treats /en/explorer as
 * a near-duplicate of /explorer rather than as the English edition.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return indexablePaths().flatMap(({ path, priority }) =>
    LOCALES.map((locale) => ({
      url: absolute(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: alternatesFor(path) },
    })),
  );
}
