# Research dataset schema — Taolagnaro tourism

All five listing files (`restaurants.json`, `accommodations.json`, `attractions.json`,
`activities.json`, `providers.json`) share one record shape so that integration into
`src/lib/listings.ts` is a mechanical mapping rather than a rewrite.

Each file is a JSON array of records. Every record has **every** key below; a value
that could not be established from a source is `null` (or `[]` for arrays). Nothing is
estimated, and nothing is filled in from memory.

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
| `licence_url` | string \| null | Deed URL. |
| `attribution` | string \| null | Exact credit line to display. |
| `reusable` | boolean | True only when the licence explicitly allows reuse. |

## Verification rules

- `verified` — identity, locality and at least one contact channel confirmed, and the
  establishment is operating. Two independent sources, or one authoritative
  first-party source, must support it.
- `partially_verified` — identity and locality confirmed, but contact details or
  operating status rest on a single directory entry.
- `needs_verification` — a name and a location exist, but nothing confirms it trades.
- `closed` — `closed_evidence` cites the source that says it stopped trading.

A directory entry is evidence that something is *listed*, never proof that it is open.