# Taolagnaro tourism dataset — independent quality audit

**Audited:** `research/{restaurants,accommodations,attractions,activities,providers}.json`, plus `sources.csv` and `image-attribution.csv`
**Commit:** `c4426ca` on `data/tourism-research`
**Audit date:** 2026-11-14
**Scope:** audit only. **No dataset file, application file or record was modified, and no Git command was run.**

The audit was performed with three purpose-built read-only scripts, added to `research/_sources/`:

| Script | Purpose |
| --- | --- |
| [`audit_dataset.py`](_sources/audit_dataset.py) | Structural, semantic and cross-record checks (findings in [`audit-findings.json`](_sources/audit-findings.json)) |
| [`audit_classify.py`](_sources/audit_classify.py) | Publication-readiness classification (findings in [`audit-classification.json`](_sources/audit-classification.json)) |
| [`scan_secrets.py`](_sources/scan_secrets.py) | Re-run of the credential scan |

Image claims were verified independently against the Wikimedia Commons API rather than trusted from the dataset.

---

## 0. Corrections applied after this audit (2026-11-14)

The approved corrections were applied on 2026-11-14. Full before/after detail is in
[`correction-report.md`](correction-report.md); this section records what changed to the
findings below so the two documents do not contradict each other.

| Audit item | Status now |
| --- | --- |
| **C1** Canadian museum images on `musee-fort-flacourt` | **Fixed.** Both `Fort Dauphin Museum.1/2.JPG` images removed; `Fort-Dauphin. Fort Flacourt.jpg` (public domain) is now the lead image and was verified as the Malagasy fort. |
| **H1** `karibu` phone `+264…` | **Fixed.** `phone` and `phone_source` set to `null`. No substitute number invented. The original OSM value remains in `_sources/osm-restaurants.json` and in Git history. |
| **H3** inconsistent record shape | **Fixed.** All five files now carry the same 33-key canonical schema in a fixed order. `licence_number` removed (was `null` in 19/19). The four activity fields were promoted to the shared schema as nullable. `README.md` documents the correction. |
| **H4** 15 accommodations citing only the directory index | **Fixed.** Each was matched to its individual ORTA member page by phone (or, where no phone exists, by the name the record itself quotes) and that URL added to `source_urls`. No URL was guessed; all 15 pages are on disk under `_sources/orta/`. |
| **H5** 13 records unsafe to publish | **Documented and enforced.** Listed in §2.2 and §4, in [`INTEGRATION.md`](INTEGRATION.md), and asserted by `validate_dataset.py`. **None was deleted** and no `verification_status` was altered. |
| **M8** share-alike not represented | **Fixed.** `image-attribution.csv` gained `commercial_reuse`, `share_alike` and `adaptation_note` columns, and `README.md` now explains share-alike, cropping, resizing and WebP conversion, and the difference between commercial reuse and unrestricted reuse. |
| **H2, M1–M7, M9–M10, L1–L3** | **Not addressed.** Outside the approved correction set. Still open; see §2–§3 and §9. |

Consequently, the counts in §1 and §8 below describe the dataset **as audited**, not as it
stands after correction. The record count (183), the status counts and the classifications
are unchanged: no record was added, removed, or re-statused. What changed is the image on
one record, one phone field, 15 `source_urls` arrays, and the structural shape.

---

## 1. Overall assessment

**The dataset is structurally sound and honest, but not publication-ready.** There are no structural failures: every file is valid JSON, all 183 slugs are unique, every record carries every expected field, every controlled vocabulary is respected, no coordinate is invalid, and every record has at least one source. The research pass was conservative where conservatism was right — 97% of prices and 91% of opening hours are `null` rather than invented.

Three things stop it from being publishable:

1. **One image is flatly wrong and would appear as a cover image.** The most serious finding in this audit: two photographs attached to the Fort-Flacourt museum depict a museum in **Manitoba, Canada** (§5.1).
2. **61% of records have no independent evidence.** 74 records rest on a single OpenStreetMap object; 17 cite only a directory index page. They may well be real businesses, but nothing here confirms that any of them trades today.
3. **Evidence is cited at index level, not record level, for 17 records** — including 15 accommodations whose own tourism-office page exists on disk but is not linked from `source_urls`, so a reviewer cannot follow the citation to the specific member.

| | Count | Share |
| --- | ---: | ---: |
| Total records | 183 | 100% |
| `ready_for_review` | 19 | 10% |
| `needs_confirmation` | 151 | 83% |
| `do_not_publish` | 13 | 7% |

Field coverage, which frames everything below:

| Field | Populated | Share |
| --- | ---: | ---: |
| coordinates | 124 | 68% |
| phone | 65 | 36% |
| address | 54 | 30% |
| website | 22 | 12% |
| email | 16 | 9% |
| opening hours | 16 | 9% |
| image | 12 | 7% |
| price range | 6 | 3% |

The existing validator (`validate_dataset.py`) passes with **0 errors** on all checks it performs. This audit found no additional errors in the categories it covers; everything below is either outside its scope or a judgement-level issue.

---

## 2. Issues by severity

### 2.1 Critical — 1

**C1. Two images attached to `musee-fort-flacourt` depict a museum in Canada.**
`Fort Dauphin Museum.1.JPG` (role **lead**) and `Fort Dauphin Museum.2.JPG` both carry the Commons description *"Fort Dauphin Museum, Manitoba, Canada"* and sit in category *Canada photographs taken on 2014-09-19*. Fort Dauphin is also a town in Manitoba; the file name was a pure name collision, and the dataset trusted the name.

Because `role` is `lead` on the first, the app would present a Canadian heritage museum as the cover image for the Anosy museum. This is exactly the failure mode the research report warned about for `Briançon - Fort Dauphin` / `Fort-Dauphin (France)` — and the warning was not applied to the museum itself.

Only the third image, `Fort-Dauphin. Fort Flacourt.jpg` (public domain, *"Entrance to Fort Flacourt at Fort-Dauphin circa 1900"*), is correctly associated.

### 2.2 High — 6

**H1. One record's phone is not a Madagascar number.**
`karibu` (`restaurants.json`) carries `+264346907770`. **+264 is Namibia.** The value was faithfully copied from the OSM tag, so the record is honest about its source, but as a contact it is unusable. It is the record's only evidence.

**H2. Three phone numbers are shared by businesses that cannot be the same operator.**

| Number | Records | Why it cannot be one operator |
| --- | --- | --- |
| `034 97 674 92` | `grill-de-lac` (restaurant, Lac Lanirano) / `espace-sophie-amboasary` (lodging, Amboasary) | Different towns, different sectors |
| `034 37 974 67` | `takasira` (appart-hôtel) / `safari-laka` (tour operator) | Different business types |
| `034 46 122 80` | `shtm` (tour operator) / `reserve-de-nahampoana` / `observation-des-lemuriens-nahampoana` | A tour operator, a park and a park activity; also the park's own official site publishes a *different* number |

Four further shared numbers are plausible (hotel and its public restaurant, or a place and its activity) and are not defects: `talinjoo-boutique-hotel`/`joo-restaurant-joo-bar-talinjoo`, `le-dauphin`/`rex-restaurant-pizzeria`, `berenty-lodge`/`reserve-de-berenty`/2 Berenty activities, `mandrare-river-camp`/`mandrare-river-camp-tour-operator`, `musee-fort-flacourt`/`visite-du-musee-fort-flacourt`, `air-fort-services`/`excursion-cap-sainte-marie-et-lavanono`, `stitch-saint-luce`/`decouverte-de-la-vannerie-de-sainte-luce`.

**H3. The five files do not share one record shape, contrary to the schema document.**
`README.md` states every record has the same 29 keys. Actual:

| File | Keys |
| --- | ---: |
| `restaurants.json` | 29 |
| `accommodations.json` | 29 |
| `attractions.json` | 29 |
| `providers.json` | **30** (+`licence_number`) |
| `activities.json` | **33** (+`provider_name`, `duration`, `difficulty_level`, `season`) |

`licence_number` is `null` in **all 19** provider records — a field that carries no information at all. The four activity fields are defensible attributes but break the "one shape" contract that makes a mechanical mapping into `src/lib/listings.ts` safe.

**H4. 15 accommodation records cite only the directory index, not their own member page.**
These records' `source_urls` contain exactly `https://fortdauphin.com/annuaire-tourisme-anosy/` — the list of 56 members — so a reviewer cannot follow the citation to the specific business, and the phone number in the record cannot be re-verified from the cited URL. The member pages exist on disk under `research/_sources/orta/` and the specific URLs are recoverable:

`takasira`, `ami-appart-hotel`, `vonimboly-hotel`, `auberginn`, `anja-guest-house`, `hotel-marina-doublon`, `tournesol`, `tsarafandray`, `vintana`, `vahinn-sainte-luce`, `le-jardin-exotique`, `libanona-woods`, `hotel-le-mandrare-amboasary`, `espace-sophie-amboasary`, `motel-m1-manantenina`.

Two more records cite only a directory index whose detail page is blocked: `aiko-aventure` and `faux-cap-beach`. One cites only a home page: `foret-de-mandena` (`https://fortdauphin.com/`), which is the weakest evidence in the dataset for any named place.

**H5. 13 records should not be published in their current form.**
Detailed in §4.

**H6. 74 records have a single source, and it is OpenStreetMap.**
All are correctly marked `needs_verification`, so the dataset is not overclaiming — but it means a large share of the catalogue is, evidentially, a map pin with a name. Publishing these as bookable listings would be asserting that a business exists and trades on the strength of a volunteer map edit.

### 2.3 Medium — 10

**M1. `vahiny-lodge` holds two phone numbers in one field.** `+261 32 02 468 22; +261 32 43 964 93`. Faithful to the OSM tag, but the field cannot hold two values; only the first would dial.

**M2. `domaine-de-la-cascade-bungalows` phone has 8 digits after the country code** (`+261 34 20 973 2`). The record's own notes already flag this as ambiguously encoded and say not to rely on it — the value should be `null` rather than a malformed number.

**M3. Two `email` fields hold two addresses each**, joined by `; `: `kaleta-hotel` (`contact@` + `reservation@`) and `mandrare-river-camp` (`tours@` + `gm@`). A single-value field; a consumer would treat the whole string as one address.

**M4. `app_category` is assigned inconsistently inside `activities.json`.** Four subcategories split across two app categories:

| Subcategory | Mapped to |
| --- | --- |
| `hiking` | `activites` (`randonnee-pic-saint-louis`, `randonnee-domaine-de-la-cascade`) **and** `excursions` (`randonnee-andohahela-tsimelahy`) |
| `wildlife_watching` | `activites` (`observation-des-lemuriens-nahampoana`, `observation-des-baleines-a-bosse`, `observation-des-oiseaux-berenty`) **and** `excursions` (`observation-des-lemuriens-berenty`) |
| `boat_trip` | `activites` (`balade-en-bateau-lac-lanirano`) **and** `excursions` (`excursion-lokaro-en-pirogue`) |
| `excursion` | `activites` (`excursion-4x4-vers-evatraha`) **and** `excursions` (`excursion-baie-sainte-luce-manafiafy`, `excursion-cap-sainte-marie-et-lavanono`) |

The clearest contradiction: **`observation-des-lemuriens-berenty` is `excursions` but `observation-des-oiseaux-berenty` is `activites`** — two wildlife-viewing activities at the same reserve, same provider, same phone. An implicit scope-based rule (town/nearby → `activites`, regional → `excursions`) appears to be in force but is documented nowhere and is broken by the birds record.

**M5. `mandrare-river-camp` (accommodation) has no coordinates, but its own provider twin does.** `mandrare-river-camp` has `latitude: null`; `mandrare-river-camp-tour-operator` carries `-24.8231207, 46.1763489` from the same OSM object. One of the two is wrong by omission.

**M6. 59 records (32%) have no coordinate.** These include three `verified` records: `mandrare-river-camp`, `musee-fort-flacourt`, `visite-du-musee-fort-flacourt`. In the app, `src/lib/listings.ts` falls back to `TOWN_CENTRE`, so all 59 would appear stacked on one pin — a visible defect if published unchanged.

**M7. Four image associations are weak, though not wrong** (see §5.2).

**M8. The share-alike obligation of CC BY-SA is not represented in the data.** 20 of 29 images are CC BY-SA (copyleft). `image.reusable: true` records *"commercially usable"* but says nothing about *"any adaptation must also be CC BY-SA"*. If the platform crops or resizes these (as `public/photos/` already does for its curated set), the derivative inherits the licence. This is a legal position, not a data error, but the flag is too coarse to be relied on.

**M9. `Andohahela NP.jpg` has weak licence provenance on Commons.** Its categories include *"Assumed own work"*, *"Files with no machine-readable source"* and *"GFDL"*, and its author field is *"No machine-readable author provided. Masindrano~commonswiki"*. It is not a clean CC BY-SA upload; attribution is to a username that may not be a real identity.

**M10. 30 field values point at URLs not echoed in `source_urls`.** E.g. `kaleta-hotel` and `berenty-lodge` carry `facebook` URLs that are not in `source_urls`, so the audit trail for those specific claims is incomplete.

### 2.4 Low — 3

- **L1.** Two `opening_hours` values embed a provenance caveat inside the data value — `vaosolos-bungalow` (`Mo-Su 09:00-18:00 (selon OSM)`) and `office-regional-du-tourisme-danosy` (`... (selon OpenStreetMap)`). Provenance belongs in `verification_notes`. One value is free prose rather than OSM syntax: `cafe-bar-colorado` (`11 AM to 10 PM`).
- **L2.** Eight `verified` records have no phone, website or email. All eight are public places (beaches, a viewpoint, surf spots) where having a contact is not meaningful — a false positive of the check, listed only for completeness: `plage-de-libanona`, `plage-ankoba`, `plage-monseigneur`, `pic-saint-louis`, `surf-plage-ankoba`, `surf-baie-de-monseigneur`, `randonnee-pic-saint-louis`, `baignade-et-detente-plage-de-libanona`.
- **L3.** 18 slugs share little text with their display name (e.g. `farihy-lanirano` for "Lac Lanirano (Farihy Lanirano)"). Almost all are legitimate — the slug uses the Malagasy name — and this is a limitation of the heuristic, not a defect.

---

## 3. Issues by category

**Restaurants (54).** 41 of 54 are `do_not_publish`-grade evidence failures if judged strictly (single OSM object, no contact); under the calibrated classification they are `needs_confirmation` because they need confirmation, not because they are unsafe. Only 4 are `ready_for_review`. One invalid phone (`karibu`), one contradictory pair (`club-sandwich`).

**Accommodations (54).** Strongest evidence in the dataset for the top cluster (Kaleta, Talinjoo, Manafiafy, Mandrare). Weakest for the 15 ORTA-index-only records (H4). 9 `do_not_publish` records — the highest of any file — because this is where duplicate tags, closures and non-commercial premises concentrate.

**Attractions (32).** Best overall: 23 of 32 have coordinates, 10 carry correctly-licensed images, 7 are fully verified. Weak points are three name-only entries from official lists (`plage-damparihy`, `grotte-dagnalapatsy`, `tsitongambarika`) and one homepage-only entry (`foret-de-mandena`).

**Activities (24).** Highest verification rate (8 verified) but the app-category inconsistency (M4) lands entirely here.

**Providers (19).** Weakest traceability after restaurants: 14 `needs_verification`, most resting on a single ORTA directory entry with a placeholder description. `aiko-aventure` should not be published at all.

---

## 4. Duplicate records

No two records are the same trading business *by accident* — the duplicates that exist were created deliberately as transparency flags, and all are documented in their own notes. They must still be excluded from publication.

| Pair / group | Slugs | Nature |
| --- | --- | --- |
| OSM double-tag | `chez-anita` (restaurant) / `chez-anita-hotel-tag-flagged` | One OSM object tagged `amenity=restaurant` **and** `tourism=hotel` |
| OSM double-tag | `hotel-mahavoky-annexe` (restaurant) / `hotel-mahavoky-annexe-tag-flagged` | Same, 0.0 m apart |
| OSM double-tag | `le-petit-bonheur` (restaurant) / `le-petit-bonheur-hotel-tag-flagged` | Same; hotel tag is probably wrong |
| Explicit duplicate flag | `la-marina-hotel` / `hotel-marina-doublon` | The flagged record says "do not publish" |
| Same premises, two categories | `domaine-de-la-cascade` (attraction) / `domaine-de-la-cascade-bungalows` (accommodation) | Deliberate: the site and its lodging |
| Same premises, two categories | `sainte-luce-reserve` (attraction) / `sainte-luce-reserve-camp` (accommodation) | Deliberate |
| Same operator, two roles | `mandrare-river-camp` / `mandrare-river-camp-tour-operator` | Deliberate: lodging and operator |
| Unresolved same-name | `mahamanina` / `snack-bar-mahamanina` | Different phone numbers; identity not settled |
| Unresolved same-name | `mami-jos` / `mami-jos-tanambao` | 500 m apart; possibly one brand |
| Unresolved same-name | `le-nepenthes` / `le-nepenthes-village` | Possibly one operator, two sites |
| Unresolved same-name | `vahinn-sainte-luce` / `vahiny-lodge` | Similar names, non-aligned contacts |

**Duplicate-listing *risk* not yet resolved** — a dense restaurant cluster where eight records sit within 35 m of each other: `bon-appetite`, `madam-abels`, `mami-jos`, `mendrika-sophie`, `escale` (all 8–51 m apart, in the market area). This is plausible for a cluster of small eateries, but it is also the signature of one premises entered several times under different names. Nobody has confirmed which.

**Closure and inactivity signals** (the task's "may be closed or inactive" category):

| Slug | Status | Signal |
| --- | --- | --- |
| `ancien-hotel-miramar` | `closed` | OSM name is literally "Ancien Hôtel Miramar (Fermé)" |
| `formerly-sahil-hotel` | `closed` | OSM name "Formerly Sahil Hotel", no `tourism` tag |
| `le-local-ex-chez-george` | `needs_verification` | OSM name "Formerly Chez George" |
| `club-sandwich` | `needs_verification` | Second OSM node named "Club sandwich (temporarily closed)" |
| `le-petit-bonheur` / `…-hotel-tag-flagged` | `needs_verification` | Hotel tag probably erroneous or obsolete |
| `pirate-camp` | `needs_verification` | OSM `fixme` disputes its own position |
| `galion-hotel` | `needs_verification` | `source=Bing` only — imagery-derived, never field-checked |
| `acp-camp-seed-magascar` | `needs_verification` | `access=private`; not a public business |
| `maison-agent-sarisambo` | `needs_verification` | Name suggests staff housing rather than commercial lodging |

---

## 5. Suspicious phone numbers

| Slug | Value | Problem |
| --- | --- | --- |
| `karibu` | `+264346907770` | **+264 = Namibia.** Not a Madagascar number. |
| `vahiny-lodge` | `+261 32 02 468 22; +261 32 43 964 93` | Two numbers in a single-value field |
| `domaine-de-la-cascade-bungalows` | `+261 34 20 973 2` | 8 digits after the country code (expected 9); record's own notes say not to rely on it |
| `grill-de-lac` = `espace-sophie-amboasary` | `034 97 674 92` | Same number, two towns |
| `takasira` = `safari-laka` | `034 37 974 67` | Same number, lodging and tour operator |
| `shtm` = `reserve-de-nahampoana` | `034 46 122 80` | Same number, three unrelated entities; the park's official site publishes a different number |

Legitimate sharing (hotel and its own restaurant; a place and its activity) is **not** listed above and was checked individually.

---

## 6. GPS anomalies

**No critical coordinate defect was found.** Every coordinate is inside the Anosy bounding box, none is in the wrong hemisphere, none is Null Island, none is transposed, and no `taolagnaro_city` listing is more than 6 km from the town centre. That is a genuinely clean result.

Points that still need a human decision:

| Issue | Detail |
| --- | --- |
| Approximation presented as a precise point | `plage-de-lokaro` uses the **hamlet** centroid, not the beach; `parc-national-dandohahela` uses the **park centroid**, not a gate; `farihy-lanirano` uses the **lake polygon**, not an embarkation point. All three say so in their notes, but the app cannot express "approximate" |
| Missing where known elsewhere | `mandrare-river-camp` has no coordinate while its provider twin has the correct one (M5) |
| 59 records with no coordinate | Including 3 `verified` records; all would collapse onto `TOWN_CENTRE` |
| Position disputed by its own source | `pirate-camp` carries an OSM `fixme` questioning the location |
| Dense co-location | Eight restaurant records within 35 m (§4); a cluster of separate eateries is plausible but unverified |

---

## 7. Image licensing concerns

Licensing is better than the task's warning implies, but not clean.

**What is correct:** all 29 rows in `image-attribution.csv` carry an author, a licence, a licence URL, a ready-to-display attribution line, and a correct `attribution_required` flag. **No NC (NonCommercial) or ND (NoDerivatives) licence is present**, so nothing outright forbids commercial reuse. 4 images are public domain.

**Concerns, in order of importance:**

1. **Wrong place (critical)** — §2.1. Two Canadian photographs attached to a Malagasy museum. This is a licensing-adjacent but primarily a *mis-association* failure, and it is the one thing here that must be fixed before any publishing.
2. **Share-alike is unrepresented.** 20 of 29 images are CC BY-SA. The boolean `reusable: true` collapses "usable commercially" and "free of obligations" into one flag; the copyleft obligation on derivatives (crops, resizes, WebP conversion — all of which `public/photos/` already performs) is not captured anywhere in the record.
3. **Weak provenance on one file** — `Andohahela NP.jpg` ("Assumed own work", no machine-readable source, author is a Commons username only). M9.
4. **Weak or adjacent place association on four records** (§7.1), none wrong, all worth a reviewer's eye.
5. **Coverage.** 171 of 183 listings have no image at all. No business — not one restaurant, hotel or agency — has a reusable photograph of its premises. The generated plates in `src/lib/photos.ts` remain the correct answer for those.

### 7.1 Weak (not wrong) image associations

| Slug | Image | Concern |
| --- | --- | --- |
| `plage-de-lokaro` | `Evatra walk I.jpg` | Commons description is *"ocean coast near Evatra"* — the village en route, not the beach |
| `sainte-luce-reserve` | `Madagascar74.094.jpg` | *"Taken in Madagascar in the mid-1970's. Manafiafy."* — adjacent locality, and a 1970s photograph |
| `plage-de-libanona` | `Beach Fort Dauphin I.jpg` | Captioned only *"beach at Fort Dauphin"*; not confirmed to be Libanona |
| `surf-port-ehoala` | `Port d'Ehoala…jpg` | Shows the industrial port, not a surf spot |

**Verified as correct** (checked against Commons descriptions): `LIBANONA BEACH.jpg` (Wiki Loves Earth 2024, Fort Dauphin), `Vue de Fort-Dauphin et de l'océan indien.jpg` (*"depuis le Pic Saint-Louis"*), `Fort-Dauphin. Fort Flacourt.jpg`, `Fort-Dauphin. Ruins of a bastion.jpg`, all four Nahampoana images, all four Berenty images, `Triangle palm Andohahela`, `0G4A6459 Tsitongambarika`, `Canoes Fort Dauphin II`, the 1784 Admiralty chart, and the five regional editorial images.

---

## 8. Listings suitable for human review

The 19 records classified `ready_for_review` — establishment-specific evidence, at least one contact channel, and coordinates:

| File | Slugs |
| --- | --- |
| `restaurants.json` | `joo-restaurant-joo-bar-talinjoo`, `larrivage`, `saint-pas`, `chez-anita` |
| `accommodations.json` | `kaleta-hotel`, `talinjoo-boutique-hotel`, `le-dauphin`, `lavasoa-hotel`, `villa-oceania`, `manafiafy-forest-lodge` |
| `attractions.json` | `reserve-de-nahampoana`, `reserve-de-berenty`, `domaine-de-la-cascade` |
| `activities.json` | `observation-des-lemuriens-nahampoana`, `observation-des-lemuriens-berenty`, `randonnee-domaine-de-la-cascade`, `observation-des-oiseaux-berenty` |
| `providers.json` | `air-fort-services`, `mandrare-river-camp-tour-operator` |

Caveats that a reviewer must carry into that review:

- `musee-fort-flacourt` and `visite-du-musee-fort-flacourt` are `verified` and well-sourced, but are **not** on this list only because they have no coordinate — and their image is the critical defect (C1). The *records* are good; the *image* is not.
- `larrivage` and `saint-pas` are `partially_verified` with conflicting phone numbers between sources; the published number is one of two or three.
- `reserve-de-berenty` and `le-dauphin` carry the phone-sharing and driving-time conflicts noted above.

The remaining 151 are `needs_confirmation`; the 13 in §2 (H5) are `do_not_publish`:

`club-sandwich`, `karibu`, `chez-anita-hotel-tag-flagged`, `hotel-mahavoky-annexe-tag-flagged`, `hotel-marina-doublon`, `acp-camp-seed-magascar`, `maison-agent-sarisambo`, `ancien-hotel-miramar`, `formerly-sahil-hotel`, `le-local-ex-chez-george`, `le-petit-bonheur-hotel-tag-flagged`, `faux-cap-beach`, `aiko-aventure`.

---

## 9. Recommended corrections

Ordered by risk. **None has been applied.**

**Before anything is published**

1. **Remove `Fort Dauphin Museum.1.JPG` and `Fort Dauphin Museum.2.JPG`** from `musee-fort-flacourt` and from `image-attribution.csv`. Promote `Fort-Dauphin. Fort Flacourt.jpg` (public domain, correct) to `lead`. (C1)
2. **Exclude the 13 `do_not_publish` slugs** from any catalogue mapping. (H5)
3. **Set `karibu.phone` to `null`**, or to nothing, until a real number is confirmed. (H1)

**Cheap, mechanical, high value**

4. **Add the specific ORTA member page URL** to `source_urls` for the 15 index-only accommodations. The URLs are recoverable from `research/_sources/orta/`; all 15 map cleanly. (H4)
5. **Split `vahiny-lodge.phone`** into one number plus a note, or null it. (M1)
6. **Null the malformed `domaine-de-la-cascade-bungalows.phone`** — the record already says not to rely on it. (M2)
7. **Split the two multi-address `email` fields** into `email` + a note, or keep the primary only. (M3)
8. **Copy `mandrare-river-camp-tour-operator`'s coordinate** onto `mandrare-river-camp`. (M5)

**Schema and semantics — decide, then apply consistently**

9. **Resolve the record-shape question.** Either (a) add the four activity fields and `licence_number` to all five files as nullable, restoring a true 29-and-shared shape; or (b) drop `licence_number` (null in 19/19) and document the activity extension in `README.md`. Option (b) is smaller; option (a) is what the README already claims. (H3)
10. **Write down the `app_category` rule for activities** and apply it: `activites` for town/nearby, `excursions` for regional trips, `experiences` for cultural participation. Under that rule `observation-des-oiseaux-berenty` becomes `excursions`, matching its sibling. (M4)
11. **Move provenance out of `opening_hours`** into `verification_notes` for the three flagged records. (L1)
12. **Add the missing `facebook`/`website`/`coordinates_source` URLs to `source_urls`** for the 30 flagged field values. (M10)

**When real photography is sought**

13. **Split `image.reusable` into two facts**: `commercially_usable` (boolean) and `obligations` (e.g. `"attribution,share-alike"`), so CC BY-SA is not silently treated as obligation-free. (M8)
14. **Replace or drop `Andohahela NP.jpg`**, or re-verify its provenance directly with the uploader. (M9)

---

## 10. Recommended next steps

1. **Fix C1 immediately** — it is the only finding that would put a visibly wrong image in front of a user, and it takes one edit.
2. **Run the phone-verification campaign before any integration.** 65 records already have a number. One day of calls would resolve H2's three directory errors, settle the eight-restaurant cluster in §4, and convert a large share of the 151 `needs_confirmation` records into real statuses. Nothing in web research can substitute for this.
3. **Decide the publication policy for `needs_confirmation`.** 151 of 183 records cannot be published as bookable listings today. The honest options are: publish only the 19 `ready_for_review` records now; or publish a larger set clearly labelled as a directory with unverified status shown. Silently importing them would assert facts the evidence does not support.
4. **Give the schema a way to say "unknown"** where the app currently cannot: no coordinate ("approximate location"), no price ("price on request"), closed ("no longer operating"). Without those states, importing this dataset necessarily degrades it.
5. **Re-run all three audit scripts after any correction** — `audit_dataset.py`, `audit_classify.py`, `scan_secrets.py` — and confirm the finding counts move as intended rather than trusting the edit.
6. **Add Commons description verification to the image pipeline.** C1 arose because a file name was trusted. A check that the Commons description or category mentions the expected locality would have caught it. The existing `scripts/commons-search.py` is the natural place.

---

## 11. Method note and audit limitations

- **Scripts found what they were written to find.** The checks are structural and rule-based; they cannot tell whether `Bon Appetite` is really a restaurant. Every judgement about a specific business in this report was made by reading the record and its cited source, not inferred from a rule firing.
- **The name-matching and slug-drift heuristics produce false positives**, and they are reported here rather than silently filtered — `farihy-lanirano` and `plage-damparihy` are not duplicates, and `spot` / `stand-a-huitres-oysters-spot` are unrelated.
- **Image verification was done through the Commons API**, which returns description and category metadata for each file. It confirms what Commons *claims* the image shows; it cannot confirm the uploader was right. C1 was caught because Commons states the location explicitly.
- **The classification in §8 is an audit artefact, not a field.** The `verification_status` values in the JSON files were not touched, and the two scales deliberately differ: a `partially_verified` record can be `needs_confirmation` for publication (missing coordinates), and a `verified` record can be too (an image defect).
- **`sources.csv` was audited for coverage, not for truth.** Every host cited by a record is represented in `sources.csv`, and no record cites a host documented as blocked — with one exception, noted below. What the audit cannot do is confirm that each source actually says what the record claims; that would require re-reading all 24 hosts.
- **One exception to "no blocked sources cited":** `mandrare-river-camp` lists `https://www.facebook.com/MandrareRiverCamp/` in `source_urls`, and Facebook returns HTTP 400 to this client. The record's notes disclose that only the page title was readable, which is honest, but a blocked platform should not appear in `source_urls` as supporting evidence.

**Stopping here for approval.** No correction has been applied; no dataset, application or Git state was modified.