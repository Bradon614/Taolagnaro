# Correction report — Taolagnaro research dataset

**Date:** 2026-11-14
**Branch:** `data/tourism-research`
**Scope:** applied the approved corrections from [`quality-audit.md`](quality-audit.md).
**No application code, no production data and no Git state was touched.**

Record count, record identities and every `verification_status` are **unchanged**: 183
records, 23 `verified` / 47 `partially_verified` / 111 `needs_verification` / 2 `closed`
before and after. Nothing was added, deleted or re-statused. What changed is one image
association, one phone field, 15 `source_urls` arrays, the structural shape of the five
files, and the documentation.

---

## 1. Changes made

### 1.1 Museum image correction — critical

**Record:** `musee-fort-flacourt` (`attractions.json`)

Two images attached to this record depicted the **Fort Dauphin Museum in Manitoba, Canada**
— a place-name collision with Fort-Dauphin, Madagascar. They were removed. The record now
carries only the photograph that was verified as the Malagasy fort.

| | Before | After |
| --- | --- | --- |
| `image` (role lead) | `Fort Dauphin Museum.1.JPG` — CC BY-SA 4.0 — *"Fort Dauphin Museum, Manitoba, Canada"* | `Fort-Dauphin. Fort Flacourt.jpg` — **Public domain** — *"Entrance to Fort Flacourt at Fort-Dauphin circa 1900"* |
| gallery images | `Fort Dauphin Museum.2.JPG`, `Fort-Dauphin. Fort Flacourt.jpg` | none |

Retained image, verified:

```
url          https://upload.wikimedia.org/wikipedia/commons/f/fa/Fort-Dauphin._Fort_Flacourt.jpg
source       https://commons.wikimedia.org/wiki/File:Fort-Dauphin._Fort_Flacourt.jpg
author       Editeur Couadou, France. before 1904
licence      Public domain
licence_url  null  (public domain has no deed URL)
attribution  Fort-Dauphin. Fort Flacourt.jpg — Editeur Couadou, France. before 1904 · Public domain
```

`verification_notes` on the record gained a dated `[CORRECTION 2026-11-14]` paragraph
explaining the removal. The evidence for the original wrong association is preserved in
`_sources/audit-commons-verify.json`, `_sources/commons-canonical-urls.json`,
`_sources/commons-imageinfo.json`, `_sources/u.json` and `_sources/commons-Tolagnaro.json`,
and in Git history. **No raw research material was deleted.**

`image-attribution.csv` lost the two Canadian rows (29 → 27) and
`Fort-Dauphin. Fort Flacourt.jpg` was promoted from `gallery` to `lead` for that record.

### 1.2 Invalid phone number

**Record:** `karibu` (`restaurants.json`)

| Field | Before | After |
| --- | --- | --- |
| `phone` | `+264346907770` | `null` |
| `phone_source` | `https://www.openstreetmap.org/way/231466742` | `null` |

`+264` is the **Namibia** country code, not Madagascar (`+261`). The value was faithfully
copied from the OSM tag during research, so the record was accurate about its source but
unusable as a contact. **No replacement number was invented**, and none was available: the
record stays `needs_verification`. The original value remains recoverable from
`_sources/osm-restaurants.json` (way 231466742) and from Git history, and is quoted
verbatim in the record's `verification_notes`, which also gained a dated correction
paragraph.

### 1.3 Publication exclusions

The 13 slugs classified `do_not_publish` are documented in three places and now
**mechanically enforced**:

- [`quality-audit.md`](quality-audit.md) §0 and §2 — findings and reasons;
- [`INTEGRATION.md`](INTEGRATION.md) — the integration instruction a future developer
  reads, with the exclusion list, a JS `Set` to copy, the duplicate-pair rules, and the
  field mapping;
- [`README.md`](README.md) — a "Publication exclusion" section pointing at both;
- [`_sources/validate_dataset.py`](_sources/validate_dataset.py) — **fails if any of the 13
  disappears from the dataset**, so the list cannot be silently pruned.

| Slug | File | Reason |
| --- | --- | --- |
| `club-sandwich` | restaurants | Two contradictory OSM objects, one named "temporarily closed"; phone shared with an unrelated restaurant |
| `karibu` | restaurants | Invalid +264 phone (now nulled); single OSM object |
| `chez-anita-hotel-tag-flagged` | accommodations | Duplicate OSM tag of the restaurant `chez-anita` |
| `hotel-mahavoky-annexe-tag-flagged` | accommodations | Duplicate OSM tag of `hotel-mahavoky-annexe` |
| `hotel-marina-doublon` | accommodations | Duplicate of `la-marina-hotel`; record says "do not publish" |
| `acp-camp-seed-madagascar` | accommodations | Private research camp, not bookable |
| `maison-agent-sarisambo` | accommodations | Staff housing, not commercial lodging |
| `ancien-hotel-miramar` | accommodations | Confirmed closed |
| `formerly-sahil-hotel` | accommodations | Confirmed closed |
| `le-local-ex-chez-george` | accommodations | OSM name begins "Formerly"; status unknown |
| `le-petit-bonheur-hotel-tag-flagged` | accommodations | Duplicate OSM tag of the restaurant `le-petit-bonheur` |
| `faux-cap-beach` | attractions | Only evidence is an anti-bot-blocked directory index |
| `aiko-aventure` | providers | Only evidence is an anti-bot-blocked directory index |

**None was deleted, and no `verification_status` was altered** — changing a status without
evidence would be a worse fault than leaving it. All 13 remain in the research files and
the validator asserts it.

### 1.4 ORTA source traceability

15 accommodation records cited only `https://fortdauphin.com/annuaire-tourisme-anosy/` —
the 56-member index — so a reviewer could not follow the citation to the specific business.

Each was matched to its individual member page and that URL was appended to `source_urls`
directly after the index entry. **No URL was guessed.** Matching used the phone number
where the record had one (unique within the directory), and otherwise the exact member name
the record itself already quotes:

| Record | Matched by | Member page added |
| --- | --- | --- |
| `takasira` | exact name | `…/takasira/` |
| `ami-appart-hotel` | phone `034 93 842 21` | `…/ami-appart-hotel-2/` |
| `vonimboly-hotel` | phone `034 43 228 68` | `…/vonimboly-hotel/` |
| `auberginn` | exact name | `…/auberginn/` |
| `anja-guest-house` | exact name | `…/anja-guest-house/` |
| `hotel-marina-doublon` | name containment | `…/hotel-marina/` |
| `tournesol` | exact name | `…/tournesol/` |
| `tsarafandray` | exact name | `…/tsarafandray/` |
| `vintana` | exact name | `…/vintana/` |
| `vahinn-sainte-luce` | name (source spells it "Vah'inn st luce") | `…/vahinn-st-luce/` |
| `le-jardin-exotique` | phone `034 68 726 69` | `…/le-jardin-exotique/` |
| `libanona-woods` | phone `034 02 918 26` | `…/libanona-woods/` |
| `hotel-le-mandrare-amboasary` | phone `034 80 693 37` | `…/hotel-le-mandrare-amboasary/` |
| `espace-sophie-amboasary` | phone `034 97 674 92` (source spells "Ambosary") | `…/espace-sophie-ambosary/` |
| `motel-m1-manantenina` | phone `038 50 773 41` | `…/motel-m1/` |

Two matches deserve a note. `motel-m1-manantenina` resolved to `motel-m1`, **not**
`motel-m1-manantenina`: the directory holds two entries for this business, and the record's
phone comes from the "Hébergements" entry (`motel-m1`); the "Hôtel Restaurant" entry has no
phone. `espace-sophie-amboasary` and `vahinn-sainte-luce` differ in spelling from the
source (`Ambosary`/`Amboasary`, `st luce`/`Sainte-Luce`) — the source's spelling is what
the URL uses. All 15 pages exist on disk under `_sources/orta/`.

All 54 accommodation records now carry at least one **non-generic** source — counting an
OpenStreetMap object URL as record-specific, 30 point at their own ORTA member page and 24
at a specific OSM object. **None cites only the directory index any more.** (Across the
whole dataset, 180 of 183 records have a non-generic source; the three exceptions are
`faux-cap-beach`, `foret-de-mandena` and `aiko-aventure` — see §4.)

### 1.5 Schema standardisation

**Decision, stated before the change:** the five files did not share a shape. Three had the
documented 29 keys, `providers.json` had 30 and `activities.json` had 33. Two options
existed: strip the extras to reach 29, or promote the meaningful extras into a shared
schema. Stripping would have destroyed real research data — how long an activity lasts,
what skill level it needs, whether it is seasonal, and who runs it — which the brief
forbids. **The four activity fields were therefore promoted to the canonical schema as
nullable, and `licence_number` was dropped.**

| | Before | After |
| --- | --- | --- |
| `restaurants.json` | 29 keys | **33** |
| `accommodations.json` | 29 keys | **33** |
| `attractions.json` | 29 keys | **33** |
| `activities.json` | 33 keys | **33** (unchanged) |
| `providers.json` | 30 keys | **33** |

**Field removed — `licence_number`.** It was `null` in **19 of 19** provider records: no
source ever stated one. It is absent from the documented schema and has no counterpart in
`src/lib/listings.ts`. Removing it discarded no information. **If a future pass establishes
real licence numbers, the field should be reinstated as part of the canonical schema** —
not appended to one file.

**Fields added as `null`:** `provider_name`, `duration`, `difficulty_level`, `season` —
54+54+32+19 records per field. These are genuinely activity-specific, but the schema
requires every record to carry every key so that an import is a mechanical mapping. Two
have direct counterparts in the application (`duration`, `difficulty_level` → `level`).

**Key order.** Every record in every file now uses the same fixed order, enforced by the
validator. `activities.json` required no reordering and came out **byte-identical** — a
useful check that the rewrite was a no-op where the file was already canonical.

`README.md` now documents the 33-key canonical shape and carries a dated schema note
explaining the discrepancy, the promotion and the removal.

### 1.6 Image licensing documentation

`image-attribution.csv` gained three columns, applied to all 27 remaining rows:

- **`commercial_reuse`** — whether the licence permits commercial use (27 yes, 0 no);
- **`share_alike`** — whether derivatives must carry the same licence (19 yes, 8 no);
- **`adaptation_note`** — the concrete obligation for cropping, resizing and WebP conversion.

`README.md` gained an "Image licensing — what each licence actually requires" section
covering:

- the licence-family table (19 CC BY-SA / 4 CC BY / 4 public domain);
- **share-alike as the easy-to-miss obligation**, including that resizing and WebP
  conversion *are* adaptations, so the 19 CC BY-SA derivatives must themselves be CC BY-SA
  and keep their credit when redistributed;
- that **commercial reuse permission is not unrestricted reuse** — every CC-licensed image
  carries at least an attribution duty;
- that a filename is not evidence of what an image shows, citing the Canadian museum case.

The file **does not claim every image is free of obligations.** Public domain is the only
category described as obligation-free, and it is 4 of 27.

---

## 2. Records affected

| Change | Records | Files |
| --- | ---: | --- |
| Image corrected | 1 (`musee-fort-flacourt`) | attractions |
| Phone nulled | 1 (`karibu`) | restaurants |
| `source_urls` extended | 15 | accommodations |
| Schema normalised | 183 (all) | all five |
| Documented as excluded | 13 | all five |

Net effect on the audited dataset: 183 records, 183 unique slugs, 170 of them eligible for
consideration by a future import (183 − 13 exclusions), of which only 19 were classified
`ready_for_review`.

---

## 3. Validation results

### 3.1 The project validator

```
$ python3 research/_sources/validate_dataset.py
=== record counts ===
  restaurants.json         54
  accommodations.json      54
  attractions.json         32
  activities.json          24
  providers.json           19
  TOTAL                    183
=== verification status ===
  closed                 2
  needs_verification     111
  partially_verified     47
  verified               23
unique slugs: 183
canonical schema: 33 keys, enforced in every record
excluded from publication: 13 records present (as required)
OK — no errors.
```

The validator was **strengthened** as part of this work. It now additionally enforces the
canonical 33-key order in every record of every file, and fails if any of the 13 excluded
slugs is missing from the dataset.

### 3.2 Specific checks requested

| Check | Result |
| --- | --- |
| Valid JSON, all five files | 5/5 parse |
| 33-key shape identical across files | Yes — one order, all 183 records |
| Unique slugs | 183/183 unique |
| All source references well-formed | No scheme/host defects introduced; `source_urls` non-empty everywhere |
| Image references and attribution | 12 listings with an image; JSON `image` matches the CSV `lead` row on URL, licence and attribution line for all 12 — **0 inconsistencies** |
| No Canadian museum image attached to `musee-fort-flacourt` | **Confirmed.** No `Fort_Dauphin_Museum` reference in any of the five datasets or either CSV. Remaining references exist only in `_sources/` raw research material, where they are the evidence for the correction |
| The 13 excluded records still present | **13/13 present**, none deleted, statuses unchanged |

### 3.3 Audit re-run, before vs after

| Severity | Before | After | Change |
| --- | ---: | ---: | --- |
| Critical | 0 | 0 | — |
| High | 16 | **13** | −3: two `key-set-mismatch`, one `phone-foreign-country` resolved |
| Medium | 120 | **119** | −1: `karibu` `phone-country-code` resolved |
| Low | 51 | 51 | — |

### 3.4 File hashes

| File | Before | After |
| --- | --- | --- |
| `restaurants.json` | `e9945860…14c78` | `8ba86bea…02895` |
| `accommodations.json` | `2541aa34…9c55` | `59464465…49b` |
| `attractions.json` | `b2a0f541…116c` | `a2438f60…1e28` |
| `activities.json` | `91e15197…2b7bb` | `91e15197…2b7bb` — **unchanged** |
| `providers.json` | `3768e31d…6c363` | `dfc3165a…6474` |
| `image-attribution.csv` | `6b11df43…f9a` | `c96fde7e…81f` |
| `sources.csv` | `eb5267f8…760` | `eb5267f8…760` — **unchanged** |

`activities.json` and `sources.csv` are byte-identical to their pre-correction state,
confirming that only the intended files changed.

---

## 4. Remaining limitations

These are **not** fixed by this correction set, and the dataset is not publication-ready.

1. **111 records still have no independent evidence.** 74 rest on a single OpenStreetMap
   object, and `observation`-style records may be map artifacts rather than trading
   businesses. Correcting the schema did not make them more likely to exist.
2. **No prices, almost no opening hours.** 177 of 183 records have no `price_range` and 167
   have no `opening_hours`. Nothing here can support a booking, budget filter or "open now".
3. **59 records have no coordinate.** In the app they would collapse onto `TOWN_CENTRE`.
   The dataset still cannot express "location unknown".
4. **Conflicting phone numbers remain.** Three numbers are still shared by businesses that
   cannot be the same operator: `grill-de-lac`/`espace-sophie-amboasary`,
   `takasira`/`safari-laka`, `shtm`/`reserve-de-nahampoana`. Resolving them needs a phone
   call, not an edit.
5. **`vahiny-lodge` still holds two phone numbers** in one field, and
   `domaine-de-la-cascade-bungalows` still carries an 8-digit malformed number. Both were
   medium-severity audit findings outside the approved set.
6. **Two `email` fields still hold two addresses each** (`kaleta-hotel`,
   `mandrare-river-camp`).
7. **`app_category` remains inconsistent inside activities.** `observation-des-lemuriens-berenty`
   is `excursions` while `observation-des-oiseaux-berenty` is `activites` — same reserve, same
   provider, same phone. The implicit scope-based rule is still undocumented and still broken
   by that record.
8. **`mandrare-river-camp` still lacks the coordinate** its own provider twin carries.
9. **Three records still have only a generic source** — `faux-cap-beach` and
   `aiko-aventure` (already excluded from publication) and **`foret-de-mandena`, which is
   not excluded** and whose sole citation is the tourism-office home page. It was not
   corrected because no member page or other source for it exists; it needs either a real
   source or an exclusion decision.
10. **Four weak image associations remain** (`plage-de-lokaro`, `sainte-luce-reserve`,
   `plage-de-libanona`, `surf-port-ehoala`). They are not wrong, but each depicts an adjacent
   locality or a different subject; see `quality-audit.md` §7.1.
11. **`Andohahela NP.jpg` still has weak licence provenance** on Commons ("Assumed own work",
    no machine-readable source, author is a username only). It was not removed because it is
    the only available image of the park and the licence does permit reuse — but the credit
    rests on a Commons username.
12. **171 of 183 listings have no image at all**, and no business has a reusable photograph
    of its premises. The generated plates remain the correct answer for those.
13. **19 of 27 images carry share-alike.** This is now documented, but it is a licensing
    position the project must consciously accept before shipping resized derivatives.
14. **Nothing has been verified by telephone.** Every `last_verification_date` is
    2026-11-14, meaning "checked once by desk research on that date" and nothing more.
15. **`sources.csv` was not re-audited for truth**, only for coverage. It is unchanged.

**The single highest-value next step remains the phone-verification campaign** described in
`quality-audit.md` §10 — 65 records already have a number, and one day of calls would
resolve most of items 4–8 above and move a large share of the 111 unverified records to a
real status.

---

## 5. Files changed, created and unchanged

**Modified**

- `research/restaurants.json` — `karibu` phone; schema
- `research/accommodations.json` — 15 ORTA member URLs; schema
- `research/attractions.json` — `musee-fort-flacourt` image; schema
- `research/providers.json` — `licence_number` removed; schema
- `research/image-attribution.csv` — 2 rows removed, role promoted, 3 obligation columns added
- `research/README.md` — canonical 33-key schema, licensing obligations, publication exclusion
- `research/quality-audit.md` — §0 corrections applied
- `research/_sources/validate_dataset.py` — canonical-schema and exclusion enforcement

**Unchanged (verified by hash)**

- `research/activities.json`
- `research/sources.csv`
- every file outside `research/`

**Created**

- `research/correction-report.md` (this file)
- `research/INTEGRATION.md` — exclusion list and import rules
- `research/_sources/apply_corrections.py` — the script that applied §1.1–1.5
- `research/_sources/correction-log.json` — machine-readable before/after change log

**Preserved**

- All raw research evidence under `research/_sources/`, including the Commons API responses
  that document the Canadian origin of the removed images.

---

## 6. Git — for you to run

No Git command was executed. Nothing is staged or committed. When you are satisfied:

```bash
git status
git diff --stat
git add research/
git commit -m "fix(research): correct museum image, invalid phone and record schema

Remove two images depicting Fort Dauphin Museum (Manitoba, Canada) from
musee-fort-flacourt; keep the verified public-domain Fort Flacourt photo.
Null the non-Madagascar (+264) phone on karibu rather than substitute one.
Add individual ORTA member page URLs to 15 accommodation records that cited
only the directory index. Normalise all five files to one 33-key canonical
schema; promote the four activity fields and drop licence_number (null in
19/19). Document share-alike obligations for the 19 CC BY-SA images and
record the 13 records excluded from publication."
```

Wait for approval before composing the catalogue import — `INTEGRATION.md` sets out why the
13 exclusions and the 151 `needs_confirmation` records need a decision first.