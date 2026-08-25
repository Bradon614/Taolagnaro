import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/urls";

/**
 * Crawlers are welcome everywhere except the pages that only mean something
 * to the visitor who created them — a saved list, a booking request, a
 * confirmation carrying someone's phone number.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/envies", "/*/envies", "/demande/", "/*/demande/", "/*/demande"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
