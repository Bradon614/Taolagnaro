# Catalogue integration instructions — Taolagnaro research dataset

**Read this before writing any import script that maps `research/*.json` into `src/lib/listings.ts`.**

This file exists because part of the dataset must **not** be published. The research files
are deliberately complete: they contain records that were assessed and found unsuitable.
Keeping them is the evidence that the assessment happened. Importing all of them would
publish businesses that are closed, duplicated, mis-tagged, private, or supported by
nothing but an anti-bot-blocked index page.

**Nothing in `research/` is integrated today.** The application still runs on the sample
catalogue in `src/lib/listings.ts`, whose records are explicitly marked as invented
placeholders.

---

## 1. Hard exclusion list — 13 slugs

These record slugs must be filtered out of any import. The reason is recorded for each;
`_sources/validate_dataset.py` asserts they are still present in the research files.

| Slug | File | Why it must not be published |
| --- | --- | --- |
| `club-sandwich` | restaurants | Two contradictory OSM objects, one literally named "temporarily closed"; its phone is also used by an unrelated restaurant |
| `karibu` | restaurants | Its only recorded phone carried the +264 (Namibia) country code and has been nulled; no contact and only one OSM object |
| `chez-anita-hotel-tag-flagged` | accommodations | Transparency record — same OSM object as the restaurant `chez-anita` |
| `hotel-mahavoky-annexe-tag-flagged` | accommodations | Transparency record — same OSM object as the restaurant `hotel-mahavoky-annexe` |
| `hotel-marina-doublon` | accommodations | Duplicate of `la-marina-hotel`; the record's own notes say "do not publish" |
| `acp-camp-seed-madagascar` | accommodations | Private research camp (`access=private`), not a bookable tourism business |
| `maison-agent-sarisambo` | accommodations | Name indicates staff housing, not commercial lodging; no contact |
| `ancien-hotel-miramar` | accommodations | **Confirmed closed** |
| `formerly-sahil-hotel` | accommodations | **Confirmed closed** |
| `le-local-ex-chez-george` | accommodations | OSM name begins "Formerly"; operating status unknown and it overlaps a separate restaurant record |
| `le-petit-bonheur-hotel-tag-flagged` | accommodations | Transparency record — same OSM object as the restaurant `le-petit-bonheur`; the hotel tag is probably wrong |
| `faux-cap-beach` | attractions | Sole evidence is a directory index whose detail page is behind an anti-bot wall; no coordinates, no description |
| `aiko-aventure` | providers | Sole evidence is a directory index whose detail page is behind an anti-bot wall; no contact |

```js
const EXCLUDED_FROM_PUBLICATION = new Set([
  "club-sandwich", "karibu", "chez-anita-hotel-tag-flagged",
  "hotel-mahavoky-annexe-tag-flagged", "hotel-marina-doublon",
  "acp-camp-seed-madagascar", "maison-agent-sarisambo", "ancien-hotel-miramar",
  "formerly-sahil-hotel", "le-local-ex-chez-george",
  "le-petit-bonheur-hotel-tag-flagged", "faux-cap-beach", "aiko-aventure",
]);
```

Note that `club-sandwich` and `karibu` are the only two exclusions outside
`accommodations.json`.

---

## 2. Duplicate pairs that are individually valid but must not both ship

Two slugs are deliberately present twice under different names to record a single OSM
object tagged both as a restaurant and as a hotel. At most **one** of each pair may be
published; the `-tag-flagged` member is always the one to drop (it is already in §1).

| Keep at most one of | Published candidate |
| --- | --- |
| `chez-anita` / `chez-anita-hotel-tag-flagged` | `chez-anita` (restaurant) |
| `hotel-mahavoky-annexe` / `hotel-mahavoky-annexe-tag-flagged` | `hotel-mahavoky-annexe` (restaurant) |
| `le-petit-bonheur` / `le-petit-bonheur-hotel-tag-flagged` | `le-petit-bonheur` (restaurant) |

Three other same-premises pairs are **not** duplicates and may both ship, because they
describe different things: `domaine-de-la-cascade` (the site) with
`domaine-de-la-cascade-bungalows` (its lodging); `sainte-luce-reserve` (the reserve) with
`sainte-luce-reserve-camp` (its camping); `mandrare-river-camp` (lodging) with
`mandrare-river-camp-tour-operator` (the operator).

---

## 3. What the import must handle

Filtering the 13 exclusions leaves **170 records**, and that is still not "publish as-is".
The audit classified only **19** as `ready_for_review`. The rest need confirmation. An
import should therefore:

1. **Filter §1 before anything else.** Fail loudly if an excluded slug reaches the
   catalogue.
2. **Decide and declare a publication policy** for the 151 `needs_confirmation` records.
   Publishing them as bookable listings asserts facts the evidence does not support. The
   defensible options are: import only `ready_for_review`; or import the rest as a
   clearly-labelled directory with verification status shown.
3. **Handle `latitude: null` explicitly.** 59 records have no coordinate. `listings.ts`
   falls back to `TOWN_CENTRE`, which would stack them all on one pin. The app needs a way
   to express "location unknown" or those records must be withheld from the map.
4. **Handle `price_range: null` explicitly.** 177 records have no price. A `Price` of zero
   would sort to the top of "cheapest". "Price on request" needs to be a first-class state.
5. **Handle `closed` explicitly.** The two closed records are excluded in §1, but the app
   has no closed state; if a future record closes, there is nowhere to put it.
6. **Carry attribution for images.** 12 listings have images, 19 of which are CC BY-SA.
   The `attribution` string in each record must be rendered wherever the image appears, and
   any resized or re-encoded derivative inherits CC BY-SA. See `README.md`.

---

## 4. Field mapping sketch

The canonical 33-key research shape is intentionally close to the `Listing` type:

| Research field | `src/lib/listings.ts` |
| --- | --- |
| `slug` | `slug` |
| `name` | `name` |
| `app_category` | `category` (already one of the six catalogue slugs) |
| `description_fr` | `summary` (or `description` in `listing-details.ts`) |
| `locality` | `place` |
| `latitude` / `longitude` | `coordinates` |
| `phone` / `email` / `website` | contact fields in `listing-details.ts` |
| `duration` | `duration` |
| `difficulty_level` | `level` |
| `services` | `features` |
| `price_range` | `price` — **needs a "no price" state** |
| `image` | `photos.ts` manifest entry — **needs the attribution string** |
| `distance_from_centre_km` | `distanceKm` — mostly `null`, needs a fallback decision |

`subcategory`, `scope`, `provider_name`, `season`, `languages`, `phone_source`,
`coordinates_source`, `source_urls`, `verification_status`, `last_verification_date`,
`verification_notes` and `closed_evidence` have no current home in the application and are
research-side metadata; do not discard them from the JSON, but do not invent a UI for them
either.

---

## 5. Out of scope

- Do **not** modify the database schema. There is none — the catalogue is in-memory.
- Do **not** replace the existing sample content without also addressing
  `src/lib/listing-details.ts`, whose reviews, prices and ratings are **fabricated**.
  Attaching real businesses to invented reviews would attribute fabricated quotes to real
  establishments.
- Do **not** treat this dataset as exhaustive. It is not, and the research report explains
  why.

---

## 6. Reference

- [`quality-audit.md`](quality-audit.md) — findings, severity, per-record classification
- [`correction-report.md`](correction-report.md) — what was changed on 2026-11-14 and why
- [`README.md`](README.md) — canonical schema and image licensing obligations
- [`research-report.md`](research-report.md) — methodology, sources and limitations
- [`_sources/validate_dataset.py`](_sources/validate_dataset.py) — run this first:
  `python3 research/_sources/validate_dataset.py`