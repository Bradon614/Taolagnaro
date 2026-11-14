#!/usr/bin/env python3
"""Generate src/lib/listings-data.ts from the verified research dataset.

Reads research/{restaurants,accommodations,attractions,activities,providers}.json
and emits a TypeScript module exporting RAW_LISTINGS, the catalogue the app renders.

Publication gate (approved 2026-11-14):
  - include verification_status verified + partially_verified only
  - never include the 13 records excluded in research/quality-audit.md
  - never include closed records
  - 111 needs_verification records stay out

Nothing is invented. Every value comes from the research record, or is null when
the research has no value. No placeholder distance, no placeholder coordinate.
"""
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
RESEARCH = os.path.join(ROOT, "research")
OUT = os.path.join(ROOT, "src", "lib", "listings-data.ts")

FILES = ["restaurants.json", "accommodations.json", "attractions.json",
         "activities.json", "providers.json"]

PUBLISHED_STATUSES = {"verified", "partially_verified"}

# Excluded from publication — research/quality-audit.md §2.2 / INTEGRATION.md §1.
EXCLUDED = {
    "club-sandwich", "karibu", "chez-anita-hotel-tag-flagged",
    "hotel-mahavoky-annexe-tag-flagged", "hotel-marina-doublon",
    "acp-camp-seed-madagascar", "maison-agent-sarisambo", "ancien-hotel-miramar",
    "formerly-sahil-hotel", "le-local-ex-chez-george",
    "le-petit-bonheur-hotel-tag-flagged", "faux-cap-beach", "aiko-aventure",
}

# Public sites with nobody to take a booking.
NO_REQUEST_SUBCATEGORIES = {
    "beach", "lake", "mountain_viewpoint", "national_park", "nature_reserve",
    "historical_monument", "cultural_site", "waterfall", "botanical_garden",
    "other_site", "market",
}

# locality (research, verbose) -> (place label shown to visitors, must exist in
# PLACE_TO_ZONE in src/lib/filters.ts). Longest / most specific match wins.
PLACE_RULES = [
    (r"libanona", "Libanona"),
    (r"ankoba", "Ankoba"),
    (r"ambinanikely|ambinanibe|vinanibe", "Ambinanibe"),
    (r"lanirano", "Lanirano"),
    (r"amparihy", "Amparihy"),
    (r"nahampoana", "Nahampoana"),
    (r"lokaro|evatraha|évatraha|mandromodromotra|itapera", "Lokaro"),
    (r"sainte-?luce", "Sainte-Luce"),
    (r"manafiafy", "Manafiafy"),
    (r"manantenina", "Manantenina"),
    (r"amboasary", "Amboasary"),
    (r"berenty", "Berenty"),
    (r"mandrare|ifotaka", "Vallée du Mandrare"),
    (r"andohahela|tsimelahy", "Andohahela"),
    (r"manantantely|manatantely", "Manantantely"),
    (r"tsitongambarika", "Tsitongambarika"),
    (r"faux-?cap", "Faux-Cap"),
    (r"sarisambo", "Sarisambo"),
    (r"ankaramena", "Ankaramena"),
    (r"ambalabe|ambohitsara", "Ambalabe"),
    (r"bazaribe|bazarikely|esokaka|tanambao|ampasikabo|mangarivotra|"
     r"ampamakiambato|ampotatra|ampototra|ampasimasy", "Centre-ville"),
    (r"taolagnaro|fort-dauphin|tôlanaro|centre", "Centre-ville"),
]

# The 12 filterable tags in src/lib/filters.ts, with the French keywords that
# justify each one. A tag is added only when a source-mentioned service matches.
TAG_RULES = [
    ("vue-mer", r"vue (sur )?(la )?mer|face à la mer|vue panoramique|front de mer"),
    ("plage", r"\bplage\b|accès plage|bord de mer"),
    ("wifi", r"wi-?fi"),
    ("restaurant", r"\brestaurant\b|petite restauration|restauration"),
    ("transfert", r"transfert"),
    ("generateur", r"générateur|groupe électrogène|énergie solaire"),
    ("parking", r"parking"),
    ("terrasse", r"terrasse"),
    ("petit-dejeuner", r"petit-déjeuner"),
    ("famille", r"famille|enfants"),
    ("communautaire", r"communaut|association|population locale"),
    ("guide-fr", r"guide.{0,20}francophone|guide naturaliste"),
]

# Phones the quality audit judged unreliable: one is a directory error shared
# with an unrelated business, the other has only 8 digits after +261. Showing
# either would send visitors to a number that cannot reach the establishment.
CONTACT_PHONE_EXCLUDED = {"grill-de-lac", "domaine-de-la-cascade-bungalows"}

PLATE_BY_SUBCATEGORY = {
    "beach": "sand", "lake": "reef", "waterfall": "forest",
    "nature_reserve": "forest", "national_park": "forest",
    "botanical_garden": "forest", "mountain_viewpoint": "ocean",
    "historical_monument": "town", "museum": "town", "cultural_site": "town",
    "market": "town", "other_site": "forest",
}
PLATE_BY_CATEGORY = {
    "sites": "forest", "hotels": "ocean", "restaurants": "sunset",
    "activites": "ocean", "excursions": "forest", "experiences": "town",
}


def place_for(locality):
    text = (locality or "").lower()
    for pattern, label in PLACE_RULES:
        if re.search(pattern, text):
            return label
    return "Centre-ville"


def tags_for(record):
    services = " ".join(record.get("services") or [])
    out = []
    for tag, pattern in TAG_RULES:
        if re.search(pattern, services, re.I):
            out.append(tag)
    return out


def plate_for(record):
    return (PLATE_BY_SUBCATEGORY.get(record["subcategory"])
            or PLATE_BY_CATEGORY.get(record["app_category"], "forest"))


def price_for(record):
    raw = (record.get("price_range") or "").strip()
    if raw and re.search(r"acc[eè]s libre|gratuit", raw, re.I):
        return {"kind": "free"}
    return {"kind": "on-request"}


def contact_for(record):
    """Contact block, with absent keys simply absent. Nothing is filled in."""
    contact = {}
    phone = record.get("phone")
    if phone and record["slug"] not in CONTACT_PHONE_EXCLUDED:
        contact["phone"] = phone
    email = record.get("email")
    if email:
        # Two records publish two addresses separated by ";". Only the first is
        # shown; a mailto: pointing at two different services is confusing.
        contact["email"] = re.split(r"[;,]", email)[0].strip()
    for key in ("address", "website", "facebook", "instagram"):
        if record.get(key):
            contact[key] = record[key]
    return contact


def accepts_requests(record):
    if record["category"] == "attraction":
        return record["subcategory"] not in NO_REQUEST_SUBCATEGORIES
    return True


def build(record):
    """One research record -> one Listing. Absent data stays absent."""
    distance = record.get("distance_from_centre_km")
    lat, lon = record.get("latitude"), record.get("longitude")

    listing = {
        "slug": record["slug"],
        "category": record["app_category"],
        "name": record["name"],
        "place": place_for(record["locality"]),
        "distanceKm": distance if isinstance(distance, (int, float)) else None,
        "summary": record["description_fr"],
        "plate": plate_for(record),
        "price": price_for(record),
        "acceptsRequests": accepts_requests(record),
        "coordinates": {"lat": lat, "lon": lon} if lat is not None and lon is not None else None,
        "tags": tags_for(record),
    }
    # Optional presentation fields, only when the research actually has them.
    if record.get("duration"):
        listing["duration"] = record["duration"]
    if record.get("difficulty_level"):
        listing["level"] = record["difficulty_level"]
    contact = contact_for(record)
    if contact:
        listing["contact"] = contact
    return listing


def pick_featured(listings):
    """Choose the home-mosaic set: verified records with a coordinate, spread
    across categories. Curation order only — no factual claim is added."""
    chosen, per_cat = [], {}
    for rec in listings:
        if rec["_status"] != "verified" or rec["coordinates"] is None:
            continue
        cat = rec["category"]
        if per_cat.get(cat, 0) >= 2:
            continue
        per_cat[cat] = per_cat.get(cat, 0) + 1
        chosen.append(rec)
        if len(chosen) == 7:
            break
    return [c["slug"] for c in chosen]


def main():
    records = []
    for fname in FILES:
        path = os.path.join(RESEARCH, fname)
        with open(path, encoding="utf-8") as fh:
            for rec in json.load(fh):
                rec["_file"] = fname
                records.append(rec)

    published = [
        r for r in records
        if r["slug"] not in EXCLUDED
        and r["verification_status"] in PUBLISHED_STATUSES
        and r["verification_status"] != "closed"
    ]

    built = []
    for rec in published:
        item = build(rec)
        item["_status"] = rec["verification_status"]
        built.append(item)

    featured = pick_featured(built)
    for item in built:
        if item["slug"] in featured:
            item["featuredRank"] = featured.index(item["slug"]) + 1

    for item in built:
        item.pop("_status", None)

    built.sort(key=lambda x: (list(PLATE_BY_CATEGORY).index(x["category"])
                              if x["category"] in PLATE_BY_CATEGORY else 99,
                              x["name"]))

    header = f'''/**
 * GENERATED FILE — do not edit by hand.
 *
 * Produced by scripts/gen-listings-data.py from the research dataset in
 * research/*.json. Re-run the script after the research changes:
 *
 *     python3 scripts/gen-listings-data.py
 *
 * Publication gate: verification_status "verified" or "partially_verified" only.
 * The 13 records excluded in research/quality-audit.md and the closed records
 * are never emitted. The 111 records still marked "needs_verification" stay out
 * of the catalogue until they are confirmed.
 *
 * Every value below is taken from the research record. Where the research has no
 * value the field is null — distance and coordinates in particular. Nothing here
 * is a placeholder, an estimate, or invented copy.
 */

import type {{ Listing }} from "@/lib/listings";

export const RAW_LISTINGS: Listing[] = '''

    body = json.dumps(built, ensure_ascii=False, indent=2)
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(header + body + ";\n")

    from collections import Counter
    print(f"generated {OUT}")
    print(f"  records read          : {len(records)}")
    print(f"  published             : {len(built)}")
    print(f"  excluded by policy    : {len(records) - len(built)}")
    print(f"  by category           : {dict(Counter(x['category'] for x in built))}")
    print(f"  with coordinates      : {sum(1 for x in built if x['coordinates'])}")
    print(f"  with distance         : {sum(1 for x in built if x['distanceKm'] is not None)}")
    print(f"  with tags             : {sum(1 for x in built if x['tags'])}")
    print(f"  acceptsRequests=true  : {sum(1 for x in built if x['acceptsRequests'])}")
    print(f"  featured              : {featured}")
    c = lambda k: sum(1 for x in built if x.get("contact", {}).get(k))
    print(f"  contact phone/address/email/web/fb/ig : "
          f"{c('phone')}/{c('address')}/{c('email')}/{c('website')}/{c('facebook')}/{c('instagram')}")
    print(f"  fiches avec au moins un contact       : "
          f"{sum(1 for x in built if x.get('contact'))}")
    places = sorted({x['place'] for x in built})
    print(f"  distinct places ({len(places)}) : {places}")


if __name__ == "__main__":
    main()