# Research dataset schema — Taolagnaro tourism

All five listing files (`restaurants.json`, `accommodations.json`, `attractions.json`,
`activities.json`, `providers.json`) share **one canonical record shape of 33 keys, in a
fixed order**, so that integration into `src/lib/listings.ts` is a mechanical mapping
rather than a rewrite.

Each file is a JSON array of records. Every record has **every** key below, in the order
given; a value that could not be established from a source is `null` (or `[]` for
arrays). Nothing is estimated, and nothing is filled in from memory.

> **Schema note (2026-11-14).** This document previously described 29 keys, but
> `activities.json` carried 33 and `providers.json` 30, so the five files did not in fact
> share a shape. The four activity fields (`provider_name`, `duration`,
> `difficulty_level`, `season`) are meaningful research data and two of them already have
> counterparts in `src/lib/listings.ts` (`duration`, `level`), so they were **promoted to
> the shared schema** and are now `null` in the categories that do not use them.
> `licence_number` was **removed**: it was `null` in all 19 provider records (no source
> ever stated one) and was absent from the documented schema. Every record in every file
> now carries the 33 keys below, in this order, and
> `_sources/validate_dataset.py` enforces that.

## Record shape

| Field | Type | Notes |
| --- | --- | --- |
| `slug` | string | kebab-case ASCII, unique across the whole dataset. Becomes the listing slug / URL segment. |
| `name` | string | Name as published by the source, French or Malagasy spelling preserved. |
| `category` | enum | Research category: `restaurant`, `accommodation`, `attraction`, `activity`, `provider`. Stable across the five files. |
| `app_category` | enum | Target catalogue category in the application: `sites`, `hotels`, `restaurants`, `activites`, `excursions`, `experiences`. |
| `subcategory` | enum | Finer type, see the vocabulary below. |
| `locality` | string \| null | Village or neighbourhood as a visitor would say it. |
| `scope` | enum | `taolagnaro_city`, `nearby`, `regional` — separates the city from the surrounding area. |
| `description_fr` | string \| null | 1–3 factual French sentences, restricted to what the sources state. |
| `provider_name` | string \| null | Activities only: who actually runs it. `null` means no named provider was identified, which is itself a finding. |
| `address` | string \| null | Street address, only when a source publishes one. |
| `distance_from_centre_km` | number \| null | Only when a source states it. Not computed from coordinates. |
| `latitude` / `longitude` | number \| null | °, WGS84. Only from a geographic source (OSM, official site), never estimated. |
| `coordinates_source` | string \| null | The URL the coordinate came from. |
| `phone` | string \| null | As published, with the source's own formatting. |
| `phone_source` | string \| null | URL or source id proving the phone. |
| `email` | string \| null | |
| `website` | string \| null | Official site only, not a directory profile. |
| `facebook` / `instagram` | string \| null | Public page URL. |
| `opening_hours` | string \| null | Verbatim from the source, not normalised. |
| `price_range` | string \| null | Verbatim from the source, including currency. |
| `duration` | string \| null | Activities only: verbatim from the source, never inferred. |
| `difficulty_level` | string \| null | Activities only: verbatim from the source. |
| `season` | string \| null | Activities only: only when a source states it. |
| `services` | string[] | Facilities or attributes a source actually mentions. |
| `languages` | string[] | Guide/staff languages, only when stated. |
| `image` | object \| null | See below. `null` means no legally usable image was found. |
| `source_urls` | string[] | Every URL fetched that supports the record. Required, non-empty. |
| `verification_status` | enum | `verified`, `partially_verified`, `needs_verification`, `closed`. |
| `last_verification_date` | string | ISO date `YYYY-MM-DD` of the research pass that checked it. |
| `verification_notes` | string | What exactly was checked and by which source. |
| `closed_evidence` | string \| null | Required when `verification_status` is `closed`. |

### `subcategory` vocabulary

- **restaurant** — `malagasy_traditional`, `seafood`, `cafe_bakery`, `fast_food`, `beach_restaurant`, `bar_food`, `pizzeria`, `international`, `other_food`
- **accommodation** — `hotel`, `guesthouse`, `lodge`, `bungalow`, `resort`, `apartment`, `eco_lodge`, `camp`, `homestay`, `other_lodging`
- **attraction** — `beach`, `nature_reserve`, `national_park`, `mountain_viewpoint`, `historical_monument`, `museum`, `cultural_site`, `lake`, `waterfall`, `botanical_garden`, `market`, `other_site`
- **activity** — `surfing`, `kitesurfing`, `windsurfing`, `diving`, `snorkelling`, `hiking`, `boat_trip`, `excursion`, `wildlife_watching`, `cultural_experience`, `guided_tour`, `fishing`, `outdoor`
- **provider** — `tour_operator`, `local_guide`, `travel_agency`, `excursion_provider`, `transport`, `car_rental`, `other_provider`

### `image` object

| Field | Type | Notes |
| --- | --- | --- |
| `url` | string \| null | Direct URL of the image file. |
| `source_url` | string \| null | The page the image was published on. |
| `author` | string \| null | Photographer or author. |
| `licence` | string \| null | e.g. `CC BY-SA 4.0`, `CC0`, `Public domain`. |
| `licence_url` | string \| null | Deed URL. `null` for public domain, which has no deed. |
| `attribution` | string \| null | Exact credit line to display. |
| `reusable` | boolean | True only when the licence explicitly allows reuse. |

`reusable: true` means **"this licence permits commercial reuse"**. It does **not** mean
"no obligations". The per-image obligations are recorded in
[`image-attribution.csv`](image-attribution.csv) columns `commercial_reuse`,
`share_alike` and `adaptation_note`; read them before publishing any image.

## Image licensing — what each licence actually requires

29 images were recorded; 27 remain after the 2026-11-14 correction — 21 attached to 12
listings and 6 held as regional editorial imagery. **None of them is NC (NonCommercial) or
ND (NoDerivatives)**, so all 27 may lawfully appear on a commercial platform. That is not
the same as being free of obligations.

| Licence family | Images | Commercial reuse | Share-alike? | What you must do |
| --- | ---: | --- | --- | --- |
| CC BY-SA (2.0 / 3.0 / 4.0) | 19 | Yes | **Yes** | Display the credit line; any **adaptation** must be released under the same CC BY-SA licence |
| CC BY (2.0 / 3.0) | 4 | Yes | No | Display the credit line; modifications allowed with attribution preserved |
| Public domain | 4 | Yes | No | No legal obligation (credit is courteous) |

### Share-alike: the obligation that is easy to miss

The platform does not display images byte-for-byte. `src/lib/photos.ts` serves them at
1600 px wide and `public/photos/` holds resized copies. **Resizing, cropping and WebP/JPEG
re-encoding are adaptations.** For the 19 CC BY-SA images that means:

- the derivative must be licensed **CC BY-SA** (the same licence, not a more restrictive one);
- the author and licence must still be credited on or beside the derivative;
- if a derivative is distributed (e.g. in an email, an app bundle, a press kit), the
  CC BY-SA terms travel with it.

Displaying an unmodified image with attribution is straightforward. Creating and shipping
a derivative — which is what a photo pipeline does — places the derivative under CC BY-SA.
For a commercial product this is usually acceptable, but it is a **deliberate licensing
position that must be taken knowingly**, not a default. If that is not acceptable for a
commercial asset, the CC BY-SA images must be replaced with commissioned or public-domain
photography.

**Commercial reuse permission ≠ unrestricted reuse.** "May be used commercially" (all 27
images) and "may be used however you like" (only the 4 public-domain images) are different
questions. Every CC-licensed image on this list carries at least an attribution duty, and
19 of them carry share-alike as well.

### Attribution

Every attached image has a ready-to-display `attribution` string in the JSON and an
`attribution_line` column in the CSV. Omitting the credit on a CC BY or CC BY-SA image is
a **licence breach**, not a formatting omission — the same rule the application already
applies to the curated photographs in `src/lib/photos.ts` and the credits page.

### Verification requirement

An image is attached only when its Wikimedia Commons description or category identifies
the same place. **A filename alone is not evidence.** The 2026-11-14 correction removed two
images titled `Fort Dauphin Museum.*.JPG` that in fact depicted a museum in **Manitoba,
Canada** — a place-name collision with Fort-Dauphin, Madagascar. Any new image should be
verified against its Commons description before attachment.

## Verification rules

- `verified` — identity, locality and at least one contact channel confirmed, and the
  establishment is operating. Two independent sources, or one authoritative
  first-party source, must support it.
- `partially_verified` — identity and locality confirmed, but contact details or
  operating status rest on a single directory entry.
- `needs_verification` — a name and a location exist, but nothing confirms it trades.
- `closed` — `closed_evidence` cites the source that says it stopped trading.

A directory entry is evidence that something is *listed*, never proof that it is open.

## Repository policy for `_sources/`

`research/_sources/` holds the working material behind the dataset. **Raw HTML scrapes are
not committed**; the extracted evidence and the scripts are.

| Kept in Git | Not kept in Git |
| --- | --- |
| `*.txt` — text extracted from the fetched pages | `*.html` — verbatim scrapes of third-party sites |
| `*.json` — parsed API responses, OSM and ORTA extracts, audit output | |
| `*.py` — the fetch, validation and audit scripts | |

**Why.** A saved page carries whatever its owner embedded: map keys, analytics IDs, tracking
pixels. Committing raw HTML imports other people's credentials into this repository. That is
not hypothetical — a Mapbox token and two Google Maps API keys have already been pulled in
this way and had to be redacted.

**Consequence for a fresh clone.** The raw pages will be absent, so a claim cannot be
re-checked against the original bytes without re-fetching it. The citations still resolve:
every `source_url` in the JSON files is the live URL, and the extracted content of the key
sources is committed as `.txt` / `.json`. To re-fetch, re-run the script that produced the
file (e.g. `_sources/osm_extra.py`, `_sources/attach_images.py`).

**Before committing anything under `_sources/`, run:**

```bash
python3 research/_sources/scan_secrets.py
```

It reports the file, line and masked length of any credential-shaped string — never the
value. It covers Mapbox, Google, AWS, GitHub, Stripe, Slack, SendGrid, OpenAI/Anthropic,
PEM private keys and `user:pass@` URLs.

## Publication exclusion

**13 records must never be imported into the application catalogue.** They are kept in the
research files on purpose — deleting them would destroy the evidence that they were
assessed — but they are excluded from publication for the reasons recorded in
[`quality-audit.md`](quality-audit.md) and listed in full in
[`INTEGRATION.md`](INTEGRATION.md):

`club-sandwich`, `karibu`, `chez-anita-hotel-tag-flagged`, `hotel-mahavoky-annexe-tag-flagged`,
`hotel-marina-doublon`, `acp-camp-seed-madagascar`, `maison-agent-sarisambo`,
`ancien-hotel-miramar`, `formerly-sahil-hotel`, `le-local-ex-chez-george`,
`le-petit-bonheur-hotel-tag-flagged`, `faux-cap-beach`, `aiko-aventure`.

`_sources/validate_dataset.py` fails if any of these disappears from the dataset, so the
list cannot be silently pruned. **Read [`INTEGRATION.md`](INTEGRATION.md) before writing any
import script.**