# Next research report — Taolagnaro research dataset

**Date:** 2026-11-14
**Branch:** `data/tourism-research`
**Scope:** resolved the remaining evidence gaps named in the brief. **No application code, no production data and no Git state was touched. No record was deleted and no `verification_status` was changed.**

**One security finding must be read first — §5.** Two third-party Google API keys were pulled into the research tree by pages fetched during this task. They have been redacted; read §5 before committing.

| Deliverable | Status |
| --- | --- |
| Priority 1 — `foret-de-mandena` investigation | **Resolved.** Reliable specific sources found; record enriched; status deliberately unchanged. §1 |
| Priority 2 — `research/phone-verification-list.csv` | **Created.** 64 callable records, flagged by risk. §2 |
| Priority 3 — publication readiness | **Prepared.** 44 / 55 / 84 tiers. §3 |

---

## 1. Priority 1 — Forêt de Mandena

### 1.1 Verdict

**The location is real, correctly identified, and now well sourced.** It is not a vague tourism-office name: it is the **Mandena protected area**, a littoral forest roughly 10 km north of Tolagnaro, designated as a "Paysage Harmonieux Protégé" (IUCN category V) under Madagascar's Nouvelles Aires Protégées framework.

Three findings go beyond what the brief anticipated:

1. **The ORTA mention is weaker than recorded.** The tourism office's only reference to "Forêt de Mandena" is a **footer/navigation link** on its homepage and blog, with no descriptive content anywhere on the site. The original record was right to be cautious about it.
2. **Public visits are probably possible, but on a single commercial source.** One licensed inbound tour operator describes a visitor centre, a botanical circuit and a boat trip. **No official source confirms any of it.**
3. **There is an unresolved area discrepancy** — 430 ha versus 230 ha — which is a genuine disagreement between sources, not a transcription error.

### 1.2 What is now established

| Question in the brief | Finding | Source |
| --- | --- | --- |
| Is the location correctly identified? | **Yes.** "Mandena" is polysemous — a village, a forest, a protected area and an ilmenite mine all share the name. The record matches the **protected area / littoral forest**, not the mine and not the homonymous "Mandena Beach" that appears in some listings. | Official portal + Rio Tinto + OSM, cross-checked |
| Exact location | ~10 km north of Tolagnaro, between the coast and the first inland forest; south-east Madagascar | Official portal ("une dizaine de km"), Wikipedia, Moriatlas |
| Coordinates | **No official coordinate exists.** Wikipedia has none; the Wikidata item (`Q120107982`) has no `P625`. The record now carries the centroid of the OSM wood polygon `relation/5190110` at **−24.9493077, 46.9982394** — 8.9 km north of the town centre, consistent with "about ten kilometres". **This is the forest's centroid, not an entrance.** | OpenStreetMap |
| Is it a protected area? | **Yes.** ~430 ha. Derives partly from the *Réserve forestière de Mandena* created in **1943**; part gained **"Paysage Harmonieux Protégé" (IUCN cat. V) in 2015**. | madagascar-destination.mg (official NAP page) |
| Public visits possible? | **Probably, but unconfirmed.** One tour operator describes a 2–4 hour visit. No official confirmation. | ndaoitravel.com only |
| Guided visits offered? | **Apparently.** "COGEMA (Mandena Management Committee)" is said to administer the site as an association managed by the local population, with Antanosy involvement. **COGEMA could not be independently verified** — searching the name returns only an unrelated Canadian rail-ferry company. | ndaoitravel.com only |
| Currently accessible? | **Unknown.** No hours, no fee, no phone, no email, no manager contact was found from any source. | — |

### 1.3 What the sources say

- **madagascar-destination.mg** (official tourism/culture portal, NAP series): ~430 ha, littoral forest on coastal sands, transition climate, 1943 forest-reserve origin, 2015 IUCN category V, mining context with restoration and ecological-offset programmes, fauna incl. *Galidia elegans*, *Furcifer verrucosus*, *Guibemantis tornieri*, *Phelsuma lineata*. **Gives no visitor information at all** — it is an ecological/heritage page, not a visitor guide.
- **therealmadagascar.com**: 430 ha, 414 plant species, 44 bird species, 6 lemur species, 6 micromammal species; "nouvelle aire protégée"; describes nurseries and a research centre; recommends the **June–November dry season**.
- **ndaoitravel.com** (inbound operator, member of TOP Madagascar): "20-minute drive northeast"; "established by QMM to protect 230 ha"; "now mainly community-managed"; visitor centre and tree nursery; botanical circuit of 3–4 h plus a boat trip down a pandanus channel; total visit 2–4 h; red-collared brown lemur (*Eulemur collaris*) and southern bamboo lemur (*Hapalemur meridionalis*) by day, plus dwarf lemurs at night; a troop of *Eulemur collaris* was relocated there in 2001.
- **Rio Tinto / QMM**: QMM protects 10 % of primary forest within its mining lease and **manages three protected areas covering more than 2 800 ha**. No visitor information for Mandena; the "Visitor experience" link in their navigation belongs to other operations.
- **Wikipedia / Moriatlas**: 230 ha (82 ha swamp + 148 ha littoral forest), 10 km north, ~2 800 mm rainfall, 9.5–35 °C.

### 1.4 Unresolved discrepancy — area

| Figure | Sources |
| --- | --- |
| **~430 ha** | madagascar-destination.mg (official), therealmadagascar.com |
| **~230 ha** | Wikipedia, Moriatlas, ndaoitravel.com (82 ha swamp + 148 ha littoral forest) |

**Not resolved, and not guessed.** The most plausible explanation — explicitly *unconfirmed* — is that 230 ha is the original QMM conservation perimeter and 430 ha is the area designated in 2015. Both figures are recorded in the record's notes.

### 1.5 What was changed in the record

`foret-de-mandena` (`attractions.json`) was enriched with sourced facts only:

| Field | Before | After |
| --- | --- | --- |
| `description_fr` | one sentence derived from an ORTA list entry | 430 ha, ~10 km north, 1943 origin, 2015 IUCN cat. V, endemic fauna, nurseries/research centre, mining context |
| `latitude` / `longitude` | `null` / `null` | −24.9493077 / 46.9982394 |
| `coordinates_source` | `null` | `https://www.openstreetmap.org/relation/5190110` |
| `distance_from_centre_km` | `null` | `10` |
| `season` | `null` | "Saison sèche de juin à novembre selon therealmadagascar.com" |
| `services` | `[]` | 6 entries |
| `source_urls` | 1 (the ORTA homepage) | **8** |
| `verification_notes` | "single source, nothing established" | full account of evidence, the area discrepancy, the coordinate caveat, the single-source visit claim, and the open questions |
| `verification_status` | `needs_verification` | **`needs_verification` — unchanged** |

### 1.6 Recommendation

**Do not exclude it. Keep it as `needs_verification` for now, and promote it once the visit question is settled.**

The identity and location gaps the audit identified are now closed. What remains is exactly one question — *can a visitor actually turn up?* — and that cannot be answered from a desk. The brief said not to change the status automatically, so it has not been changed; the audit script now independently flags it as *"status=needs_verification despite 8 sources — status may be understated"*, which supports a later move to `partially_verified`.

**Action for the owner:** ask ORTA (or Air Fort Services, which manages Nahampoana and is an ORTA member) whether Mandena receives visitors, who manages it, whether COGEMA exists as a body, and what it costs. If the answer is "no public access", the record should be moved to the exclusion list rather than published.

---

## 2. Priority 2 — Phone verification worklist

### 2.1 The file

[`phone-verification-list.csv`](phone-verification-list.csv) — **64 rows**, one per record with a phone number. 119 of the 183 records have no phone and are therefore not listed.

The twelve required columns are present and in the requested order. Four further columns were appended to carry the flags the brief asked for, since a plain CSV cell cannot be highlighted:

| Extra column | Purpose |
| --- | --- |
| `flag` | `ok`, `shared_same_operator`, `shared_conflict`, `shared_corroborated`, `malformed` |
| `flag_reason` | plain-language explanation naming the other records involved |
| `call_priority` | `high` / `normal` / `low` — the order to work through |
| `evidence_basis` | what currently supports the record, so the caller knows what a call would settle |

`call_result`, `confirmed_phone`, `confirmed_operating_status` and `last_contact_date` are **intentionally empty**: nobody was called and no message was sent.

### 2.2 Composition

| Flag | Rows | Meaning |
| --- | ---: | --- |
| `ok` | 37 | No collision, no malformation |
| `shared_same_operator` | 18 | Shares a number with a plausibly related record (a hotel and its public restaurant, or a place and its own activity) |
| `shared_conflict` | 5 | **Shares a number that cannot belong to both** — a directory error |
| `shared_corroborated` | 2 | Shares a number, but its own number is independently confirmed, so the problem belongs to the other record |
| `malformed` | 2 | The field cannot be dialled as stored |

| Priority | Rows |
| --- | ---: |
| `high` | 32 |
| `normal` | 21 |
| `low` | 11 |

| Evidence currently supporting the record | Rows |
| --- | ---: |
| First-party or guide source | 24 |
| Tourism-office member page | 32 |
| OpenStreetMap only | 8 |

### 2.3 The five genuine conflicts

| Number | Records | Why it cannot be one operator |
| --- | --- | --- |
| `034 97 674 92` | `grill-de-lac`, `espace-sophie-amboasary` | A restaurant at Lac Lanirano and a hotel in Amboasary — different towns |
| `034 37 974 67` | `takasira`, `safari-laka` | An appart-hôtel and a tour operator |
| `034 46 122 80` | `shtm` (vs `reserve-de-nahampoana`) | A tour operator using the number that the park's **own website** publishes for the reserve |

The Nahampoana case is the clearest: the reserve's official site gives `+261 34 46 122 80`, so the reserve keeps it and **`shtm` is the likely error**. Both Nahampoana records are flagged `shared_corroborated` so no call is wasted on them.

### 2.4 Malformed numbers

| Slug | Stored value | Problem |
| --- | --- | --- |
| `vahiny-lodge` | two numbers in one field | Only the first would dial |
| `domaine-de-la-cascade-bungalows` | `+261 34 20 973 2` | 8 digits after +261, not 9 |

### 2.5 Invalid country codes — none remain

The brief asked for numbers with invalid country codes to be highlighted. **There are none left to flag.** The one such record, `karibu`, carried `+264…` (Namibia); its phone was nulled in the previous correction round and it therefore does not appear in this list. The builder script still detects the condition, so a future invalid number would be caught.

### 2.6 Suggested call script

For each high-priority row: confirm the number is theirs, confirm they are open, ask for the best contact for reservations, and ask the opening hours and price band — the three things no website publishes. Record the outcome in `call_result`, put the verified number in `confirmed_phone`, and set `last_contact_date`. **Do not overwrite `verification_status` from the CSV**; use the outcome to decide status changes deliberately.

---

## 3. Priority 3 — Publication readiness

No status was changed and nothing was deleted. The tiers below answer a different question from `verification_status`: *once a human confirms it, could this be shown to a visitor?*

A "confirmation" is a phone call or a site check — not more desk research.

| Tier | Records | Meaning |
| --- | ---: | --- |
| **1 — Presentable after a confirmation** | **44** | Complete enough to show once a human verifies it |
| **2 — One gap to close first** | **55** | Needs one specific fix before it could be presented |
| **3 — Not yet presentable** | **84** | Multiple gaps, or excluded |

The tiering accounts for the fact that a **beach, lake or viewpoint needs no phone number**. Requiring a contact channel for a public site produced false gaps in an earlier pass; the rule now only demands one where a business actually answers it.

### 3.1 Tier 1 — presentable after a confirmation (44)

**Restaurants (4):** `chez-anita`, `joo-restaurant-joo-bar-talinjoo`, `larrivage`, `saint-pas`

**Accommodations (7):** `kaleta-hotel`, `lavasoa-hotel`, `le-dauphin`, `le-nepenthes-village`, `manafiafy-forest-lodge`, `talinjoo-boutique-hotel`, `villa-oceania`

**Attractions (15):** `domaine-de-la-cascade`, `farihy-anony`, `farihy-lanirano`, `foret-de-mandena`*, `jardin-botanique-de-saiadi`, `parc-national-dandohahela`, `pic-saint-louis`, `plage-ankoba`, `plage-de-libanona`, `plage-de-lokaro`, `plage-monseigneur`, `reserve-de-berenty`, `reserve-de-nahampoana`, `sainte-luce-reserve`, `tranovato`

**Activities (16):** `baignade-et-detente-plage-de-libanona`, `balade-en-bateau-lac-lanirano`, `excursion-baie-sainte-luce-manafiafy`, `excursion-lokaro-en-pirogue`, `kitesurf-et-planche-a-voile-ankoba`, `marche-central-et-artisanat-de-taolagnaro`, `observation-des-lemuriens-berenty`, `observation-des-lemuriens-nahampoana`, `observation-des-oiseaux-berenty`, `plongee-masque-et-tuba-libanona`, `randonnee-andohahela-tsimelahy`, `randonnee-domaine-de-la-cascade`, `randonnee-pic-saint-louis`, `surf-baie-de-monseigneur`, `surf-plage-ankoba`, `surf-plage-de-libanona`

**Providers (2):** `air-fort-services`, `mandrare-river-camp-tour-operator`

\* `foret-de-mandena` is in Tier 1 on data completeness only. Its **access question is unresolved** (§1) — treat it as Tier 2 in practice until someone confirms visitors are admitted.

### 3.2 Tier 2 — one gap to close (55)

| Gap | Count | What it means |
| --- | ---: | --- |
| No coordinate | 50 | Would fall back to the town-centre pin, stacking on one point |
| No contact channel | 4 | `le-tournesol`, `hotel-mahavoky-annexe`, `sainte-luce-reserve-camp`, `marche-artisanal-fort-dauphin` |
| OpenStreetMap-only evidence | 1 | `office-regional-du-tourisme-danosy` (an artefact: its first-party site *is* `fortdauphin.com`, which the rule treats as a directory) |

The 50 missing coordinates break down as 14 accommodations, 14 providers, 7
attractions, 8 activities and 7 restaurants, and they fall into two kinds of work:

- **Accommodations (14)** — `takasira`, `ami-appart-hotel`, `vonimboly-hotel`, `chez-stephan`,
  `auberginn`, `berenty-lodge`, `mandrare-river-camp`, `lokaro-lodge`,
  `domaine-de-la-cascade-bungalows`, `le-jardin-exotique`, `libanona-woods`,
  `hotel-le-mandrare-amboasary`, `espace-sophie-amboasary`, `motel-m1-manantenina`.
  Each has an ORTA member page and a phone, so **a call can produce a street address and
  therefore a coordinate.**
- **Providers (14)** — `dadamanga`, `shtm`, `safari-laka`, `mtc-tours`, `miliba-tour`,
  `miremby-tours`, `ato-sarl`, `lakananosy`, `air-madagascar`, `stitch-saint-luce`,
  `lovasoa-mahavonjy`, `association-mifankatia`, `foi-artisanat-anosy`, `fimmasm`. Several
  are artisans or a national airline that may legitimately have **no visitor-facing address**.
  For these the honest fix may be an "unknown location" state rather than a coordinate.
- **Attractions (7)** — `musee-fort-flacourt`, `plage-dambinanibe`, `plage-damparihy`,
  `plage-de-la-baie-des-galions`, `lac-vinanibe`, `grotte-dagnalapatsy`, `tsitongambarika`.
- **Activities (8)** — `surf-plage-dambinanibe`, `surf-port-ehoala`,
  `observation-des-baleines-a-bosse`, `visite-du-musee-fort-flacourt`,
  `excursion-4x4-vers-evatraha`, `excursion-cap-sainte-marie-et-lavanono`,
  `decouverte-de-la-vannerie-de-sainte-luce`, `location-de-planches-de-surf`.
- **Restaurants (7)** — `grill-de-lac`, `spot`, `sucre-sale`, `chez-mirana-et-bernard`,
  `mahamanina`, `la-reine-du-sud-chez-georges`, `rex-restaurant-pizzeria`.

### 3.3 Tier 3 — not yet presentable (84)

41 restaurants, 32 accommodations, 9 attractions, 2 providers. This set includes:

- **The 13 excluded records** (`club-sandwich`, `karibu`, `chez-anita-hotel-tag-flagged`, `hotel-mahavoky-annexe-tag-flagged`, `hotel-marina-doublon`, `acp-camp-seed-madagascar`, `maison-agent-sarisambo`, `ancien-hotel-miramar`, `formerly-sahil-hotel`, `le-local-ex-chez-george`, `le-petit-bonheur-hotel-tag-flagged`, `faux-cap-beach`, `aiko-aventure`);
- **The 2 closed records** (`ancien-hotel-miramar`, `formerly-sahil-hotel`);
- **~69 records supported only by a single OpenStreetMap object** — a name and a map point with nothing that confirms a business exists behind it.

That last group is the dataset's real ceiling. **Desk research cannot lift it**; only local contact can.

### 3.4 What "presenting" must mean

Even for Tier 1, presenting these records requires decisions the application does not yet support:

1. **No price state.** 177 of 183 records have no price. A zero would sort first in "cheapest"; "price on request" needs to exist.
2. **No unknown-location state.** 59 records have no coordinate and would stack on `TOWN_CENTRE`.
3. **No closed state.** Two records are closed; the app has nowhere to put them.
4. **Attribution.** 12 listings carry CC BY-SA or CC BY images whose credit must render wherever the image appears.
5. **Fabricated reviews.** `src/lib/listing-details.ts` still contains invented reviews attributed to named people. **Attaching real businesses to fabricated reviews is the single most damaging thing that could be done with this dataset.** That file must be addressed before any real listing goes live.

---

## 4. Validation

```
$ python3 research/_sources/validate_dataset.py
  restaurants.json         54
  accommodations.json      54
  attractions.json         32
  activities.json          24
  providers.json           19
  TOTAL                    183
unique slugs: 183
canonical schema: 33 keys, enforced in every record
excluded from publication: 13 records present (as required)
OK — no errors.
```

```
$ python3 research/_sources/audit_dataset.py
CRITICAL 0 | HIGH 13 | MEDIUM 119 | LOW 52   (was 51; +1 is the new
"foret-de-mandena: status may be understated" note, which is expected)
```

```
$ python3 research/_sources/scan_secrets.py
files scanned: 177
no credential-shaped strings found
```

Also verified: all five files still use the identical 33-key canonical order; 183 unique slugs; the 13 exclusions still present; `sources.csv` grew from 41 to 46 rows so every newly cited host is registered.

---

## 5. Security finding — third-party API keys, redacted

**Two Google Maps API keys were pulled into `research/_sources/` by pages fetched during this task**, in the same way the Mapbox token was pulled in previously:

| File | Where | What |
| --- | --- | --- |
| `_sources/mandena-ndao.html` | a Google Maps embed iframe (`maps/embed/v1/place`) | a 39-character `AIza…` key |
| `_sources/mandena-real.html` | a Google Maps JS script tag (`maps/api/js`) | a 39-character `AIza…` key |

Both belong to the respective third-party websites, not to this project. Both were **redacted byte-exactly** (each file shrank by exactly 8 bytes; every byte outside the key is provably unchanged), and the scan now returns clean.

These files were **untracked and uncommitted**, so no key ever entered Git history — unlike the Mapbox case, which required a history rewrite.

**Why this keeps happening, and what to do about it:** any page that embeds a map, analytics or payment widget will carry that vendor's key in its HTML. Saving raw third-party HTML into a repository will therefore keep importing other people's credentials. Two options:

1. Run `scan_secrets.py` **before** every commit (it already catches `AIza`, Mapbox `pk./sk.`, AWS, GitHub, Stripe, Slack, SendGrid, OpenAI/Anthropic, PEM and `user:pass@` patterns); or
2. Add `research/_sources/*.html` to `.gitignore` and commit only the extracted `.txt`/`.json` evidence, which is what the JSON records actually cite.

Option 2 removes the class of problem rather than catching it each time. It was recommended in the previous correction round and is worth acting on now.

**No key was printed in this report, in the audit, or in any log.**

---

## 5b. Documentation defect found and fixed

While verifying this report I found that `quality-audit.md` listed the ACP camp exclusion as
`acp-camp-seed-magascar`, while the record's actual slug is **`acp-camp-seed-madagascar`**.
The same typo was reproduced in an earlier draft of this report.

That matters more than a typo usually would: **an exclusion list with a wrong slug silently
fails to exclude anything.** A developer copying slugs out of the audit would have got a
non-existent slug and the real record would have passed the filter.

- The authoritative machine-readable list was never wrong — `INTEGRATION.md`,
  `README.md`, `correction-report.md` and `validate_dataset.py` all carried the correct
  slug, and the validator confirms 13/13 present.
- Both documents have been corrected. All five documentation files now contain **13 of 13**
  correct slugs and zero occurrences of the mistyped string.

This is also a lesson for the integration step: **derive the exclusion set from the
validator or from `INTEGRATION.md`, never retype it by hand.**

## 6. Remaining limitations

1. **Mandena's access is still unproven.** One commercial source; no official confirmation; COGEMA unverifiable; no fee, hours or contact found.
2. **The 430 vs 230 ha discrepancy is unresolved.** Both values are recorded.
3. **Mandena's coordinate is a forest centroid**, not an entrance.
4. **119 records have no phone**, so the campaign cannot reach them at all.
5. **Search-engine access remains unavailable** (HTTP 402 on the search tool throughout). This task succeeded only because the DuckDuckGo HTML endpoint responded once; the same query pattern returned zero results on re-use. Findings here depend on that one successful query and on direct fetches.
6. **Nothing was verified by phone or on site.** Every improvement in this task is documentary.
7. All limitations from `correction-report.md` §4 still stand: 111 unverified records, no prices, 59 records without coordinates, the three shared-phone conflicts, the activity `app_category` inconsistency, and the four weak image associations.

---

## 7. Recommended next steps

1. **Run the phone campaign** using §2. Start with the 32 high-priority rows and the 5 conflicts. This is the only step that lifts records out of `needs_verification`.
2. **Ask ORTA about Mandena** (and about COGEMA) — one call settles Priority 1.
3. **Act on §5.** Either pre-commit `scan_secrets.py` or gitignore the raw HTML. Do it before the next research pass, not after.
4. **Close the 50 missing coordinates** using the member pages and phone calls, or introduce an "unknown location" state in the application instead of a false pin.
5. **Do not import anything yet.** Tier 1 is 44 records of 183 — and even those need the five application changes in §3.4, above all the removal of the fabricated reviews in `listing-details.ts`.

---

## 8. Files created and modified

**Created**

- `research/next-research-report.md` (this file)
- `research/phone-verification-list.csv` — 64 rows, 16 columns
- `research/_sources/build_phone_list.py` — regenerates the worklist from the dataset
- `research/_sources/` research artefacts for Mandena: `mandena-official.html`, `mandena-ndao.html`, `mandena-real.html`, `mandena-mori.html`, `man-wiki-en.html`, `man-riotinto.html`, `man-qmmcomm.html`, `man-blog.html`, `man-ddg.html`, `mandena-overpass.json`, `mandena-prot.json`, plus `man-mobot*.html`, `man-orta.html`, `man-wikidata.html`

**Modified**

- `research/attractions.json` — `foret-de-mandena` enriched (§1.5); status unchanged
- `research/sources.csv` — 41 → 46 rows (5 new Mandena sources)
- `research/_sources/audit-findings.json` — regenerated by re-running the audit

**Redacted**

- `research/_sources/mandena-ndao.html`, `research/_sources/mandena-real.html` — third-party Google API keys replaced (§5)

**Not changed**

- `research/restaurants.json`, `accommodations.json`, `activities.json`, `providers.json`
- `research/image-attribution.csv`
- `research/README.md`, `INTEGRATION.md`, `quality-audit.md`, `correction-report.md`, `research-report.md`
- All 13 excluded records; all `verification_status` values; every application file

---

**Stopping for approval.** No listing was published, no status changed, no import script written, and no Git command run.