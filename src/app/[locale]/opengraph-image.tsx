import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n";
import { isLocale, type Locale } from "@/i18n/config";
import { SITE, TOTAL_LISTINGS } from "@/lib/site";

/**
 * The preview card a shared link shows in WhatsApp, Facebook or a message.
 *
 * Drawn rather than photographed: it has to hold at thumbnail size, and it
 * must not depend on a listing having a licensed photograph. The bathymetric
 * bands and the coordinates are the same identity the site uses.
 *
 * Rendered by Satori, which supports only a subset of CSS — flex, gradients
 * and absolute positioning, no custom properties.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Taolagnaro — Anosy, Madagascar";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? (locale as Locale) : "fr");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "linear-gradient(158deg, #062a31, #0e5a62 52%, #3e9e9b)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Bathymetric bands — the identity, reduced to what Satori can draw. */}
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: -420 + index * 34,
              bottom: -560 + index * 26,
              width: 1500 - index * 40,
              height: 1200 - index * 40,
              borderRadius: 9999,
              border: "2px solid rgba(255,255,255,0.075)",
            }}
          />
        ))}

        {/* Legibility wash */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(4,20,22,0.86), rgba(4,20,22,0.15) 62%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              display: "flex",
              fontSize: 21,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            {SITE.region} · {SITE.coordinates}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -1.5,
            }}
          >
            Taolagnaro
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 31,
              color: "rgba(255,255,255,0.9)",
              maxWidth: 880,
            }}
          >
            {t.home.heroLead.split("—")[0].trim()}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 34,
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                background: "#c98a16",
                color: "#1c1200",
                fontSize: 23,
                fontWeight: 700,
                padding: "12px 24px",
                borderRadius: 4,
              }}
            >
              {TOTAL_LISTINGS} {t.common.places}
            </div>
            <div style={{ display: "flex", fontSize: 23, color: "rgba(255,255,255,0.72)" }}>
              taolagnaro.mg
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
