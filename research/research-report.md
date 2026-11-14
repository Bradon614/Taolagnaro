# Taolagnaro tourism research — final report

**Destination:** Taolagnaro / Tolagnaro / Fort-Dauphin, Anosy region, south-east Madagascar, and its surrounding area (Libanona, Ankoba, Ambinanibe, Vinanibe, Amparihy, Nahampoana, Andohahela, Sainte-Luce, Manafiafy, Lokaro / Évatraha, Berenty, Mandrare valley, Amboasary, Ifotaka).

**Branch:** `data/tourism-research` · **Research pass:** 2026-11-14 · **Deliverables:** `research/`

**Status: research artefacts only.** Nothing in this folder is wired into the application. No file outside `research/` was created, modified or deleted, and no existing listing, slug, schema or component was touched.

---

## 1. Headline numbers

| File | Records | Verified | Partially verified | Needs verification | Closed |
| --- | ---: | ---: | ---: | ---: | ---: |
| `restaurants.json` | 54 | 1 | 12 | 41 | 0 |
| `accommodations.json` | 54 | 4 | 9 | 39 | 2 |
| `attractions.json` | 32 | 7 | 12 | 13 | 0 |
| `activities.json` | 24 | 8 | 12 | 4 | 0 |
| `providers.json` | 19 | 3 | 2 | 14 | 0 |
| **Total** | **183** | **23 (13 %)** | **47 (26 %)** | **111 (61 %)** | **2 (1 %)** |

**This dataset is not exhaustive, and it would be wrong to present it as such.** Taolagnaro has no complete public register of tourism businesses. The most authoritative single source — the regional tourism office's own member directory — lists 56 members for the whole Anosy region; the volunteer-maintained map data has 111 named features in the same area; the largest travel directory claims 228 places in the town alone but could not be read. The true number of trading establishments is unknown to this research pass. Section 7 sets out exactly what is and is not covered.

By geography: 133 records are Taolagnaro city, 28 are in the immediately surrounding area, 22 are regional (Berenty, Mandrare, Amboasary, Andohahela, Lac Anony, Faux-Cap, Tsitongambarika).

---

## 2. Methodology

### 2.1 Approach

The research was done by **direct retrieval of specific URLs plus geographic data queries**, not by search-engine crawling. This was forced by circumstance: the agent's web-search tool was unavailable for the entire session (see §6.1), so the only route to evidence was to fetch named URLs and to interrogate the OpenStreetMap APIs directly.

The working method was:

1. **Fetch and archive the primary sources as files** under `research/_sources/`, so that every claim in the dataset can be re-checked against the exact bytes that were read, and so that a later pass does not have to re-fetch anything.
2. **Harvest the regional tourism office's structured directory.** The ORTA Anôsy site runs WordPress with the Business Directory plugin, whose REST endpoint (`/wp-json/wp/v2/wpbdp_listing`) returns every member as structured data. That yielded all 56 members with their official category and, after fetching each member page, their telephone number.
3. **Extract points of interest from OpenStreetMap** by bounding-box queries against the Overpass API, plus Nominatim for place-name resolution, for coordinates, names and tags.
4. **Cross-check** each candidate record against a second, independent source wherever one existed, and record in `verification_notes` precisely what was confirmed by which source.
5. **Record conflicts rather than resolving them.** Where two sources disagreed — a phone number differing by one digit, a driving time of three hours versus four, a park stated as 50 ha or 67 ha — both values were kept and flagged.
6. **Never estimate.** Where a value could not be found in a fetched source, the field is `null`. This is why 97 % of `price_range` values, 91 % of `opening_hours` values and 32 % of coordinates are null.

### 2.2 Rules that were enforced

- No name, phone number, email, address, price, coordinate, opening hours or rating was invented, inferred or carried over from memory.
- A coordinate is only recorded when it came from a geographic source, and its source URL is stored alongside it in `coordinates_source`.
- A directory entry is treated as evidence that something is *listed*, never as proof that it is trading. Every record built only on the tourism-office directory carries `needs_verification` and says so in its notes.
- Business closures were only recorded with explicit evidence (`closed_evidence`), and only twice.
- Blocked and protected sources were recorded as blocked rather than circumvented. No CAPTCHA, paywall, bot wall or `robots.txt` restriction was bypassed at any point.

### 2.3 Record schema

The five JSON files share one record shape — 29 keys, identical order everywhere — so that mapping into `src/lib/listings.ts` later is mechanical rather than a rewrite. The shape is documented in [`research/README.md`](README.md). It extends the application's own vocabulary rather than replacing it: every record carries an `app_category` drawn from the app's six existing catalogue slugs (`sites`, `hotels`, `restaurants`, `activites`, `excursions`, `experiences`), so the researcher's five files map onto the product's six categories without renaming anything.

Descriptions are in French, matching the existing in-app copy; field names and this report are in English.

### 2.4 Validation

Two scripts are included, both read-only against the dataset:

- [`research/_sources/validate_dataset.py`](_sources/validate_dataset.py) — checks JSON syntax, record counts, per-file key consistency, controlled vocabularies for `subcategory` / `scope` / `verification_status` / `app_category`, dataset-wide slug uniqueness, coordinate plausibility inside the Anosy bounding box, the requirement that non-ASCII slugs are rejected, that `source_urls` is never empty, that `closed` records carry `closed_evidence`, and that latitude and longitude are set together or not at all. **Current result: 183 records, 183 unique slugs, 0 errors.**
- [`research/_sources/attach_images.py`](_sources/attach_images.py) — attaches Commons imagery and regenerates `image-attribution.csv`.
- [`research/_sources/build_sources.py`](_sources/build_sources.py) — regenerates `sources.csv`.

---

## 3. Sources consulted

41 sources are itemised in [`research/sources.csv`](sources.csv) with their access status. Summary:

**Fully usable (28).** The regional tourism office `fortdauphin.com` including its member directory, its REST endpoint and all 56 member pages; its dedicated pages on sites, beaches and surf; `tourismer.mg`; `cara.mg`; `madavoyage.com`; `lepetitvoyageur.mg`; French and English Wikipedia (Tôlanaro, Andohahela, Berenty); the official sites of the Fort-Flacourt museum, Nahampoana reserve, Domaine de la Cascade, Berenty reserve, Mandrare River Camp / Madagascar Classic Collection, Kaleta Hotel, Talinjoo, Air Fort Services and Dadamanga; the Anosy regional council business register; the OpenStreetMap, Overpass, Nominatim and Wikimedia Commons APIs.

**Partly usable (4).** `linkees.com` — the index page renders server-side and lists 228 places by category, but every individual place page returns a JavaScript browser-verification interstitial; only the index was used. `lepetitvoyageur.mg` — only the recommendation blocks render on the server. The Overpass API — heavily rate-limited, returning 429 and 502 under load, with several category queries abandoned. Facebook — direct requests return 400; page titles were readable through the fetch tool for two pages only.

**Blocked (4), not bypassed.** `petitfute.com` (HTTP 403), `tripadvisor.com` (HTTP 403), `booking.com` (HTTP 202 anti-bot challenge, empty body), individual `linkees.com` place pages (JavaScript challenge).

**Unreachable (2).** `parcs-madagascar.com` and `madagascar-national-parks.com` did not resolve, and `seedmadagascar.org` did not respond. This directly explains the gaps for Andohahela National Park (no entry fee, hours or contact) and for the Sainte-Luce reserve (public access unconfirmed).

**Unavailable (1).** The built-in web-search tool failed with HTTP 402 for the whole session.

**Excluded (1).** `manafiafy.com` now serves an unrelated Vietnamese gambling site; it is recorded as excluded so that nobody later scrapes it as the lodge's website. The genuine content is at `madaclassic.com/manafiafy-forest-lodge/`.

**Two traps worth flagging for future passes.** Wikimedia Commons contains `Briançon - Fort Dauphin -673.jpg` and `Fort-Dauphin (France).jpg`, which depict the French town of that name, not Madagascar — they were excluded from the image set. And two OSM objects in the town are tagged `tourism=hotel` on premises whose real business is a restaurant (`Le Petit Bonheur`, `La Reine du Sud`); they are carried in `accommodations.json` only as flagged transparency records.

---

## 4. Verification and data quality

### 4.1 What the statuses mean here

- **`verified` (23)** — identity, locality and at least one contact channel confirmed, and operating status supported by a first-party or two independent sources. Example: `kaleta-hotel` is verified on its own website (services, phone, email) cross-checked against the tourism-office directory and an OSM object.
- **`partially_verified` (47)** — identity and locality confirmed, but contact details or operating status rest on a single directory entry, or the sources conflict on a material detail.
- **`needs_verification` (111)** — a name and a location exist, but nothing confirms the business trades today. **This is the single most important caveat in this dataset:** 61 % of records are in this state, and the great majority of them are ORTA directory members or OSM objects.
- **`closed` (2)** — `ancien-hotel-miramar` and `formerly-sahil-hotel`, both named as former hotels in OpenStreetMap and absent from every other source; each carries its `closed_evidence`.

### 4.2 Completeness of individual fields

Across all 183 records:

| Field | Populated | Null | Note |
| --- | ---: | ---: | --- |
| Coordinates | 124 (68 %) | 59 (32 %) | Only from OSM/Nominatim or a stated coordinate |
| Phone | 65 (36 %) | 118 (64 %) | Mostly from the tourism-office directory or a first-party site |
| Website | 22 (12 %) | 161 (88 %) | Only first-party sites, never a directory profile |
| Opening hours | 16 (9 %) | 167 (91 %) | Verbatim where found, including two OSM strings left unnormalised in English |
| Price range | 6 (3 %) | 177 (97 %) | No accommodation or restaurant could be priced at all |
| Image | 12 (7 %) | 171 (93 %) | Reusable imagery only |
| `services` | 102 populated | 81 empty | Only facilities a source actually mentions |

No price could be established for any hotel, guesthouse, restaurant or excursion. This is a genuine finding, not an omission: the only source that publishes room prices (Booking.com) is behind an anti-bot wall, and Kaleta's own site renders the amount dynamically without a server-side value.

### 4.3 Duplicates detected

A scripted sweep compared every record against every other for near-identical names, shared phone numbers and co-location within 60 m. Results, with the action taken:

**Genuine same-establishment pairs — kept as separate records on purpose, because the app models them as different categories:**
- `joo-restaurant-joo-bar-talinjoo` (restaurant) and `talinjoo-boutique-hotel` (hotel) — 3 m apart, same phone. The hotel's own site confirms the bar-restaurant is open to non-residents, so both records are legitimate.
- `house rules` for hotels whose restaurant is genuinely public versus hotels whose restaurant is guests-only — the restaurants file deliberately does **not** contain a record for Mandrare River Camp, Berenty Lodge, Lokaro Lodge, Vah'inn St Luce, Azura, Le Dauphin, Kaleta, Croix du Sud, Le Népenthès and others, because no source establishes public access. Only Talinjoo, L'Arrivage, Chez Anita, Le Tournesol and Mahavoky Annexe survived that filter.

**Records that are the same OSM object tagged twice, kept as flagged transparency entries:**
- `chez-anita` (restaurant) / `chez-anita-hotel-tag-flagged`
- `hotel-mahavoky-annexe` (restaurant) / `hotel-mahavoky-annexe-tag-flagged`
- `le-petit-bonheur` (restaurant) / `le-petit-bonheur-hotel-tag-flagged`

Each pair shares one slug root and carries a note pointing at its counterpart; slugs were made unique with a `-tag-flagged` suffix so that no two records in the dataset share a slug. **These six records should not be published as six businesses.**

**Consolidated within a file:** OSM holds two objects for Hôtel Azura (`way/230365602`, `way/389698126`, 5 m apart) and three for La Croix du Sud (`relation/3089134`, `node/10657181205`, plus the ORTA entry) — each was merged into one record. Two ORTA entries for Motel M1 were merged into one.

**Still ambiguous, flagged in their notes:**
- `mahamanina` (ORTA, Bazarikely) versus `snack-bar-mahamanina` (OSM, in town) versus a third "Mahamanina" 15 km west that was excluded — three different things sharing a name, and the ORTA record's identity is not settled.
- `mami-jos` and `mami-jos-tanambao` — two OSM features 500 m apart, possibly one brand.
- `le-nepenthes` (in town) and `le-nepenthes-village` (near Évatraha) — probably the same operator on two sites, not confirmed.
- `vahinn-st-luce` (ORTA) versus `vahiny-lodge` (OSM) — similar names, but the contact details do not align; kept separate.
- `hotel-marina-doublon` — an ORTA entry almost certainly identical to `la-marina-hotel`, kept only as a "do not publish" flag.
- `plage-damparihy` and `farihy-amparihy` — flagged by the name sweep but genuinely different (a beach and a lake).

**A name-matching false positive worth recording:** the heuristic flagged `spot` and `stand-a-huitres-oysters-spot` as near-duplicates; they are unrelated. Names alone are not sufficient evidence of duplication, which is why every match above was checked by hand.

**Phone-number collisions — three are unresolved directory errors, not shared operators:**
- `034 97 674 92` on both `grill-de-lac` and `espace-sophie-amboasary` (two different towns).
- `034 37 974 67` on both `takasira` (lodging) and `safari-laka` (tour operator).
- `034 46 122 80` on both `shtm` (tour operator) and Nahampoana reserve / Air Fort Services.
Each collision is stated in both affected records rather than resolved by guesswork.

---

## 5. Images and licensing

12 listings carry at least one image; 171 do not. Every image is from **Wikimedia Commons**, and every one has an author, a licence, a licence URL and a ready-made attribution line recorded in [`research/image-attribution.csv`](image-attribution.csv) (29 rows, including regional editorial imagery not tied to a listing).

| Listing | Images | Licences |
| --- | ---: | --- |
| `reserve-de-berenty` | 4 | CC BY-SA 3.0, CC BY 3.0, CC BY 2.0 |
| `reserve-de-nahampoana` | 4 | CC BY-SA 4.0, CC BY-SA 3.0 |
| `musee-fort-flacourt` | 3 | CC BY-SA 4.0, Public domain |
| `parc-national-dandohahela` | 2 | CC BY 3.0, CC BY-SA 3.0 |
| `pic-saint-louis` | 2 | CC BY-SA 3.0, Public domain |
| `plage-de-libanona` | 2 | CC BY-SA 4.0, CC BY-SA 3.0 |
| `bastion-de-maudave`, `excursion-lokaro-en-pirogue`, `plage-de-lokaro`, `sainte-luce-reserve`, `surf-port-ehoala`, `tsitongambarika` | 1 each | CC BY-SA 3.0–4.0, Public domain |

**How images were assigned.** An image was attached to a listing only when its Commons file name or description identifies that same place — `Turtles in the reserve of Nahampoana.jpg` to Nahampoana, `Fort-Dauphin. Ruins of a bastion.jpg` to the bastion, `0G4A6459 Anosy Tsitongambarika Field Station.jpg` to Tsitongambarika. Nothing was assigned on a guess. Generic shoreline photographs (`Fort Dauphin rocks 04`) are recorded as regional editorial imagery rather than being pinned to a specific beach they may not show.

**Limitations, stated plainly:**

1. **No business has a usable photograph.** Not one restaurant, hotel, guesthouse, agency or guide has a licenced image of its premises. For 171 records the `image` field is `null`. The photography that exists on the open web for these businesses is on their own websites and Facebook pages, where the terms of use do not permit reuse on a third-party booking platform. **This is a real design constraint, not a gap to be papered over:** the app already has a considered answer — the generated bathymetric "plate" — and `src/lib/photos.ts` states that a plate is not a placeholder but part of the visual identity.
2. **Attribution is mandatory.** Every CC BY and CC BY-SA image requires the credit line to be displayed. `research/image-attribution.csv` provides a `attribution_line` per image, ready to render. The existing `photos-manifest.json` and the credits page show the app already handles this correctly; the research images must not be added without it.
3. **Author fields are sometimes institutional or uncertain.** "Unknown, circa 1900-05" and "Editeur Couadou, France. before 1904" are historical scans in the public domain; "Unknown author" appears for one. These are recorded as Commons states them.
4. **No Google Images, no social-media scraping.** No image was taken from a map listing, a booking site or a Facebook page. URLs that could not be licenced were not recorded at all, per the brief.
5. **Every direct image URL was resolved from the Commons API, not assembled by hand.** The two path characters in an `upload.wikimedia.org` URL are a hash of the file name and cannot be derived, so all 29 URLs were read back from the `imageinfo` API and canonicalised by [`attach_images.py`](_sources/attach_images.py). An earlier draft of three URLs guessed the hash character and was wrong; those were corrected.
6. **Live reachability of the image files could not be spot-checked from this environment.** By the end of the pass, `upload.wikimedia.org` was returning HTTP 429 to this IP after repeated requests. The files' existence is nonetheless confirmed twice over: the MediaWiki API returned each file's metadata and canonical URL with its pixel dimensions, and `Special:FilePath` redirects to exactly the URLs recorded here. A reviewer on a normal connection should still open a sample of the URLs in `image-attribution.csv` before publishing.

---

## 6. Research limitations

### 6.1 Search engines were unavailable — the dominant limitation

The agent's web-search tool returned HTTP 402 (insufficient balance) for the entire session, and executable search endpoints were also unreachable. **All research therefore came from fetching specific known URLs and querying geographic APIs directly.** The practical consequences:

- Coverage is biased toward sources whose URLs were supplied in the brief or discovered as links from them. An establishment whose only web presence is a Facebook page or a local directory not linked from those pages is **invisible to this pass**.
- The 61 % `needs_verification` rate is a direct consequence: without a search engine, most establishments could only be found in one place, and one place is not verification.
- Named local guides, small guesthouses and casual restaurants are systematically under-represented, because those are exactly the businesses whose only footprint is social media.

### 6.2 Directories are not proof of trading

The ORTA member directory is the single richest source and was used heavily, but **56 of the records rest on it alone.** Membership shows that a business joined a tourism office at some point; it does not show that it is trading today, that it accepts visitors, or that its published phone still works. Every such record is marked `needs_verification`. The one entry with a placeholder description ("description") on every page suggests the directory was bulk-populated and is not actively curated.

### 6.3 No prices, no hours, almost no email

See §4.2. Commercial terms are essentially absent. The dataset can support discovery and classification; it cannot yet support booking, budget filtering or "open now" display.

### 6.4 Geographic and temporal uncertainty

- 32 % of records have no coordinate. For those, the app's `TOWN_CENTRE` fallback in `src/lib/listings.ts` would place every one of them on the same pin — a visible artefact if they were published as-is.
- Some coordinates are deliberate approximations and are labelled as such: `plage-de-lokaro` uses the Lokaro *hamlet* coordinate, not the beach; `parc-national-dandohahela` uses the park centroid, not a gate; `farihy-lanirano` uses the lake polygon, not an embarkation point.
- Distances are almost entirely absent (97 % null) because almost no source states them; they were never computed from coordinates, since as-the-crow-flies distance is not the road distance a visitor experiences. The few present (Nahampoana 7.5 km, Domaine de la Cascade 8 km, Jardin Saïadi 6 km) come from a source that states them.
- Nothing here is dated beyond one research pass. Phone numbers and opening hours decay. A `last_verification_date` of `2026-11-14` on every record means "checked once, on that date", nothing more.

### 6.5 Disagreements left open

Recorded rather than resolved, because resolving them needs a phone call or a visit:

- Pic Saint-Louis surf access: ORTA says all levels, Wikipedia says intermediate-to-advanced only.
- Nahampoana visit duration: "a morning" (madavoyage) versus "allow a full day" (tourismer); area 50 ha versus 67 ha.
- Berenty drive from Taolagnaro: "three hours" (madavoyage) versus "4–5 hours, about 85 km" (official site).
- Berenty and Mandrare phone numbers each differ by one digit between the official site and the ORTA directory; the official-site number is published and the discrepancy noted.
- Whale-watching season: June–July and September–November (cara.mg, for Taolagnaro) versus June–October (Manafiafy lodge, for Sainte-Luce).
- Hotel locations where a directory says "view of Libanona beach" and the map disagrees (Chez Anita).
- `Le Népenthès` spelled "Mahavokey"/"Mahavoky", "Ravanala"/"Ravinala", "Villa Oceania"/"Villa Océane", "Fandriantsara"/"Fandriatsara", "Chez Mirana et Bernanrd"/"Bernard" — the source spelling is preserved and the alternative noted; none was "corrected".

### 6.6 What could not be reached at all

Andohahela National Park's official managing body, the SEED Madagascar NGO, and any booking or pricing platform. Together these account for most of the missing practical detail on the region's two most significant protected areas.

---

## 7. Coverage — what is in and what is not

**Strong:** the town centre and Libanona (restaurants, hotels, guesthouses, markets, lakes, the museum and fort), Nahampoana, Berenty/Mandrare, Manafiafy/Sainte-Luce, and the surf spots.

**Thin or absent:**
- **Vinanibe, Ambinanibe, Ankaramena** — almost nothing beyond mapped beaches and lakes. Ankaramena returned nothing in any source.
- **Named local guides.** The tourism-office directory contains exactly **one** guide. That is certainly an undercount of reality and must not be read as the total.
- **Tourist transport** — no taxi-brousse operator, 4×4 hire company or pirogue operator is identified by name and contact.
- **Diving and snorkelling** — the activity is described as possible at Libanona, but no dive centre or equipment-rental business was identified anywhere.
- **Surf schools and equipment rental** — repeatedly referred to by guides ("instructors are easily available", "boards can be rented on the beach") but not once named. The `location-de-planches-de-surf` record exists specifically to record that this gap is real.
- **Restaurants outside the town** — no confirmed named restaurant in Vinanibe, Ambinanibe, Évatraha, Lokaro or the Mandrare valley.
- **Artisans** — five artisans are carried with a name and a phone and nothing else; their work, opening and willingness to receive visitors are unknown.

---

## 8. Relationship to the existing application

The audit found:

- **Framework:** Next.js 16.3 (App Router) with React 19, Tailwind 4, TypeScript, trilingual FR/EN/MG via `src/i18n`.
- **Data architecture:** a single in-memory catalogue in `src/lib/listings.ts` — one `Listing` type for every category, with category-specific optional fields, a `COORDINATES` map and a `TAGS` map, all keyed by slug. No database, no schema, no ORM.
- **Content status:** the catalogue is explicitly marked `SAMPLE CONTENT`. Business names in it are invented placeholders ("Business names are invented placeholders and do not refer to actual establishments"), with a note that they are "replaced by the real partner list". Reviews, prices, ratings and contact details in `src/lib/listing-details.ts` are likewise invented.
- **Category taxonomy:** six slugs in `src/lib/site.ts` — `sites`, `hotels`, `restaurants`, `activites`, `excursions`, `experiences` — with hard-coded display counts.
- **Image conventions:** a generated manifest `src/lib/photos.ts` (built by `scripts/gen-photos-ts.py` from `scripts/commons-selection.json` via `scripts/commons-fetch.py`), with files under `public/photos/`, and mandatory author/licence/source on every entry. Wikimedia Commons is the established source. Listings without a photo deliberately keep generated plates.
- **Tag vocabulary:** twelve filterable tags in `src/lib/filters.ts`, plus five geographic zones.

The research dataset was shaped to fit this without altering it: same slug-as-identifier convention, an `app_category` on every record matching the six existing category slugs, French descriptions, kebab-case ASCII slugs, and image objects carrying exactly the author/licence/licenceUrl/source fields `src/lib/photos.ts` already expects.

Note that **the placeholder-data problem the brief describes is broader than the listings.** `SITE.phone`, `SITE.email` and `SITE.whatsapp` in `src/lib/site.ts` are placeholders (`+261 34 00 000 00`), the category counts are hard-coded, and the reviews in `listing-details.ts` are fabricated. Real business data should not be swapped into the catalogue while the surrounding page still shows invented ratings and reviews attributed to named people — that would present fabricated reviews about real businesses.

---

## 9. Recommendations for the next phase

**Do not integrate yet.** On the evidence above, integrating now would publish 111 unverified businesses, show zero prices, and place a third of the catalogue on a single fallback map pin.

1. **Run a telephone verification campaign first.** 65 records have a phone number. A single day of calls against the ORTA member list would move most of the 111 `needs_verification` records to a real status, confirm whether the three duplicated phone numbers are directory errors, and capture opening hours and price bands that no website publishes. This is the highest-value next step by a wide margin and it cannot be replaced by more web research.
2. **Get a search capability before more desk research.** Most of the remaining gap is businesses whose only footprint is a Facebook page. Without search, another web pass would largely re-find the same sources.
3. **Ask ORTA to curate the directory.** The placeholder descriptions suggest the member list is bulk-populated. The tourism office is the natural partner both to fix that and to provide the guide register that this pass could not find.
4. **Decide the duplicate policy before mapping, not during.** Six records are transparency flags for the same premises; `hotel-marina-doublon` must never be published. The mapping layer needs an explicit exclusion list.
5. **Plan for missing prices.** Either keep price filtering off for real listings, or make "price on request" a first-class state in `Price` rather than a zero that would sort to the top of "cheapest".
6. **Plan for missing coordinates.** Extend `Listing` so that "location approximate" or "location unknown" is expressible, instead of falling back silently to `TOWN_CENTRE`.
7. **Handle imagery honestly.** For 171 listings there is no reusable photo. The generated plates are the correct answer and should stay; if real photography is wanted, it has to be commissioned or obtained with written permission from each business.
8. **Get explicit approval before touching `src/lib/listings.ts`,** and treat it as a separate, reviewed change: replacing the catalogue also requires dealing with `LISTING_DETAILS` (invented reviews), the hard-coded counts in `site.ts`, and the placeholder site contact details.
9. **Re-verify before launch.** Every record carries `last_verification_date: 2026-11-14`. Phone numbers and opening hours should be re-checked within weeks of any public launch.

---

## 10. Files in this folder

| Path | Contents |
| --- | --- |
| [`restaurants.json`](restaurants.json) | 54 restaurant and food-service records |
| [`accommodations.json`](accommodations.json) | 54 accommodation records, including 2 closed and 3 transparency flags |
| [`attractions.json`](attractions.json) | 32 beaches, reserves, parks, monuments, lakes, markets |
| [`activities.json`](activities.json) | 24 activities and experiences |
| [`providers.json`](providers.json) | 19 tour operators, guides, agencies and other tourism businesses |
| [`sources.csv`](sources.csv) | 41 sources with access status, HTTP result and what each was used for |
| [`image-attribution.csv`](image-attribution.csv) | 29 images with author, licence, licence URL, required credit line and attachment state |
| [`README.md`](README.md) | The record schema and the verification rules |
| `_sources/` | Every fetched document, the extracted text, the OpenStreetMap extracts, and the three generator/validator scripts. Kept so that any claim can be re-checked without re-fetching, and so a later pass can reuse the work. |

**Validate the dataset yourself:**

```bash
python3 research/_sources/validate_dataset.py
```

**Confirm the JSON parses and count the records:**

```bash
for f in research/*.json; do
  python3 -c "import json,sys; d=json.load(open(sys.argv[1])); print(f'{sys.argv[1]}: {len(d)} records')" "$f"
done
```

**Check dataset-wide slug uniqueness:**

```bash
python3 -c "
import json,glob,collections
s=[r['slug'] for f in glob.glob('research/*.json') for r in json.load(open(f))]
d=[k for k,v in collections.Counter(s).items() if v>1]
print('duplicate slugs:', d or 'none')
"
```