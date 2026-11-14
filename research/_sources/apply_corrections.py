#!/usr/bin/env python3
"""Apply the approved corrections from research/quality-audit.md.

Changes applied (each is asserted):
  1. musee-fort-flacourt: drop the two Manitoba/Canada museum images, keep the
     verified public-domain Fort Flacourt photograph.
  2. karibu: null the non-Madagascar (+264) phone, no invented replacement.
  3. 15 accommodation records: add their individual ORTA member page URL.
  4. Schema normalisation: drop licence_number (null in 19/19, absent from the
     documented schema); add the four activity fields as null to every file;
     reorder every record to the canonical key order.

Writes a machine-readable change log to _sources/correction-log.json.
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
RESEARCH = os.path.dirname(HERE)

FILES = ["restaurants.json", "accommodations.json", "attractions.json",
         "activities.json", "providers.json"]

CANONICAL = [
    "slug", "name", "category", "app_category", "subcategory", "locality", "scope",
    "description_fr", "provider_name", "address", "distance_from_centre_km",
    "latitude", "longitude", "coordinates_source", "phone", "phone_source",
    "email", "website", "facebook", "instagram", "opening_hours", "price_range",
    "duration", "difficulty_level", "season", "services", "languages", "image",
    "source_urls", "verification_status", "last_verification_date",
    "verification_notes", "closed_evidence",
]
# Added as null where a file does not carry them.
ADDED_AS_NULL = ["provider_name", "duration", "difficulty_level", "season"]
REMOVED = ["licence_number"]

# The verified, correctly-associated Fort Flacourt photograph (public domain).
FLACOURT_IMAGE = {
    "url": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Fort-Dauphin._Fort_Flacourt.jpg",
    "source_url": "https://commons.wikimedia.org/wiki/File:Fort-Dauphin._Fort_Flacourt.jpg",
    "author": "Editeur Couadou, France. before 1904",
    "licence": "Public domain",
    "licence_url": None,
    "attribution": "Fort-Dauphin. Fort Flacourt.jpg — Editeur Couadou, France. before 1904 · Public domain",
    "reusable": True,
}
CANADIAN_IMAGES = [
    "https://upload.wikimedia.org/wikipedia/commons/b/bd/Fort_Dauphin_Museum.1.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/c/c0/Fort_Dauphin_Museum.2.JPG",
]

# record slug -> individual ORTA member page, matched by phone where available
# and by name otherwise (both spellings present in the source).
ORTA_PAGES = {
    "takasira": "https://fortdauphin.com/annuaire-tourisme-anosy/takasira/",
    "ami-appart-hotel": "https://fortdauphin.com/annuaire-tourisme-anosy/ami-appart-hotel-2/",
    "vonimboly-hotel": "https://fortdauphin.com/annuaire-tourisme-anosy/vonimboly-hotel/",
    "auberginn": "https://fortdauphin.com/annuaire-tourisme-anosy/auberginn/",
    "anja-guest-house": "https://fortdauphin.com/annuaire-tourisme-anosy/anja-guest-house/",
    "hotel-marina-doublon": "https://fortdauphin.com/annuaire-tourisme-anosy/hotel-marina/",
    "tournesol": "https://fortdauphin.com/annuaire-tourisme-anosy/tournesol/",
    "tsarafandray": "https://fortdauphin.com/annuaire-tourisme-anosy/tsarafandray/",
    "vintana": "https://fortdauphin.com/annuaire-tourisme-anosy/vintana/",
    "vahinn-sainte-luce": "https://fortdauphin.com/annuaire-tourisme-anosy/vahinn-st-luce/",
    "le-jardin-exotique": "https://fortdauphin.com/annuaire-tourisme-anosy/le-jardin-exotique/",
    "libanona-woods": "https://fortdauphin.com/annuaire-tourisme-anosy/libanona-woods/",
    "hotel-le-mandrare-amboasary": "https://fortdauphin.com/annuaire-tourisme-anosy/hotel-le-mandrare-amboasary/",
    "espace-sophie-amboasary": "https://fortdauphin.com/annuaire-tourisme-anosy/espace-sophie-ambosary/",
    "motel-m1-manantenina": "https://fortdauphin.com/annuaire-tourisme-anosy/motel-m1/",
}

KARIBU_NOTE = (
    " [CORRECTION 2026-11-14] Le numéro +264346907770, enregistré dans OSM avec "
    "l'indicatif +264 (Namibie) et non +261 (Madagascar), a été retiré du champ phone "
    "et n'a PAS été remplacé : aucun autre numéro n'a pu être établi, et en inventer "
    "un serait pire que l'absence. La valeur d'origine reste consultable dans "
    "research/_sources/osm-restaurants.json (way 231466742) et dans l'historique Git. "
    "Sans contact, l'établissement reste en needs_verification."
)

MUSEE_NOTE = (
    " [CORRECTION 2026-11-14] Deux images précédemment rattachées à cette fiche "
    "représentaient le Fort Dauphin Museum de MANITOBA (Canada) — homonymie de nom, "
    "vérifiée via la description et les catégories Wikimedia Commons. Elles ont été "
    "retirées. Seule l'image « Fort-Dauphin. Fort Flacourt.jpg » (domaine public, "
    "entrée du fort vers 1900) est conservée, désormais en image principale. "
    "Les métadonnées des images écartées restent tracées dans l'historique Git."
)


def load(fname):
    with open(os.path.join(RESEARCH, fname), encoding="utf-8") as fh:
        return json.load(fh)


def save(fname, records):
    path = os.path.join(RESEARCH, fname)
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(records, fh, ensure_ascii=False, indent=1)
        fh.write("\n")


def main():
    log = {"image_correction": None, "phone_correction": None,
           "orta_traceability": [], "schema": {}}

    # ---------------- 1. museum image ----------------
    attractions = load("attractions.json")
    musee = next(r for r in attractions if r["slug"] == "musee-fort-flacourt")
    before_img = musee["image"]["url"]
    assert before_img in CANADIAN_IMAGES, f"unexpected current lead image: {before_img}"
    musee["image"] = dict(FLACOURT_IMAGE)
    musee["verification_notes"] = (musee["verification_notes"] or "") + MUSEE_NOTE
    log["image_correction"] = {
        "slug": "musee-fort-flacourt",
        "removed_images": CANADIAN_IMAGES,
        "removed_reason": "Depict Fort Dauphin Museum, Manitoba, Canada (name collision).",
        "kept_image": FLACOURT_IMAGE["source_url"],
        "kept_image_licence": FLACOURT_IMAGE["licence"],
        "kept_image_attribution": FLACOURT_IMAGE["attribution"],
    }

    # ---------------- 2. karibu phone ----------------
    restaurants = load("restaurants.json")
    karibu = next(r for r in restaurants if r["slug"] == "karibu")
    assert karibu["phone"] == "+264346907770", f"unexpected phone: {karibu['phone']}"
    log["phone_correction"] = {
        "slug": "karibu",
        "field": "phone",
        "before": karibu["phone"],
        "after": None,
        "also_cleared": "phone_source",
        "reason": "+264 is the Namibia country code, not Madagascar (+261).",
        "original_source_preserved": "research/_sources/osm-restaurants.json (way 231466742)",
    }
    karibu["phone"] = None
    karibu["phone_source"] = None
    karibu["verification_notes"] = (karibu["verification_notes"] or "") + KARIBU_NOTE

    # ---------------- 3. ORTA traceability ----------------
    accommodations = load("accommodations.json")
    index_url = "https://fortdauphin.com/annuaire-tourisme-anosy/"
    by_slug = {r["slug"]: r for r in accommodations}
    for slug, page in ORTA_PAGES.items():
        rec = by_slug[slug]
        assert rec["source_urls"] == [index_url], \
            f"{slug}: expected only the index, found {rec['source_urls']}"
        assert page not in rec["source_urls"]
        # insert the member page right after the directory index it was found in
        rec["source_urls"] = [index_url, page]
        log["orta_traceability"].append(
            {"slug": slug, "added": page, "before": [index_url], "after": rec["source_urls"]}
        )

    # ---------------- 4. schema normalisation ----------------
    files = {"restaurants.json": restaurants, "accommodations.json": accommodations,
             "attractions.json": attractions,
             "activities.json": load("activities.json"),
             "providers.json": load("providers.json")}

    removed_counts = {}
    added_counts = {}
    for fname, records in files.items():
        n_removed = 0
        n_added = {}
        for rec in records:
            for key in REMOVED:
                if key in rec:
                    rec.pop(key)
                    n_removed += 1
            for key in ADDED_AS_NULL:
                if key not in rec:
                    rec[key] = None
                    n_added[key] = n_added.get(key, 0) + 1
            # reorder to canonical
            assert set(rec.keys()) == set(CANONICAL), \
                f"{fname}/{rec['slug']}: key set mismatch {set(rec.keys()) ^ set(CANONICAL)}"
            reordered = {k: rec[k] for k in CANONICAL}
            rec.clear()
            rec.update(reordered)
        removed_counts[fname] = n_removed
        added_counts[fname] = n_added

    log["schema"] = {
        "canonical_key_count": len(CANONICAL),
        "canonical_order": CANONICAL,
        "removed_fields": {k: v for k, v in removed_counts.items() if v},
        "added_null_fields": {k: v for k, v in added_counts.items() if v},
        "note": ("licence_number was null in 19/19 provider records and absent from the "
                 "documented schema, so it was removed. The four activity fields are "
                 "meaningful research data already implicit in src/lib/listings.ts "
                 "(duration, level) and were promoted to the shared schema as nullable."),
    }

    # ---------------- write ----------------
    for fname, records in files.items():
        save(fname, records)

    with open(os.path.join(HERE, "correction-log.json"), "w", encoding="utf-8") as fh:
        json.dump(log, fh, ensure_ascii=False, indent=1)

    print("corrections applied")
    print(f"  musee-fort-flacourt: lead image -> {FLACOURT_IMAGE['licence']}")
    print(f"  karibu: phone -> null")
    print(f"  ORTA pages added: {len(log['orta_traceability'])}")
    print(f"  licence_number removed from: {[k for k,v in removed_counts.items() if v]}")
    print(f"  canonical key count: {len(CANONICAL)}")
    for fname, added in added_counts.items():
        if added:
            print(f"  {fname}: nulls added {added}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())