#!/usr/bin/env python3
"""Validate the Taolagnaro research dataset.

Checks JSON syntax, record counts, key sets, controlled vocabularies, slug
uniqueness across the whole dataset, coordinate plausibility for the Anosy
region, provenance requirements and verification-status coherence.

Read-only: never writes to the dataset files.

Usage:
    python3 research/_sources/validate_dataset.py
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
RESEARCH = os.path.dirname(HERE)

FILES = {
    "restaurants.json": "restaurant",
    "accommodations.json": "accommodation",
    "attractions.json": "attraction",
    "activities.json": "activity",
    "providers.json": "provider",
}

SUBCATEGORIES = {
    "restaurant": {"malagasy_traditional", "seafood", "cafe_bakery", "fast_food",
                   "beach_restaurant", "bar_food", "pizzeria", "international", "other_food"},
    "accommodation": {"hotel", "guesthouse", "lodge", "bungalow", "resort", "apartment",
                      "eco_lodge", "camp", "homestay", "other_lodging"},
    "attraction": {"beach", "nature_reserve", "national_park", "mountain_viewpoint",
                   "historical_monument", "museum", "cultural_site", "lake", "waterfall",
                   "botanical_garden", "market", "other_site"},
    "activity": {"surfing", "kitesurfing", "windsurfing", "diving", "snorkelling", "hiking",
                 "boat_trip", "excursion", "wildlife_watching", "cultural_experience",
                 "guided_tour", "fishing", "outdoor"},
    "provider": {"tour_operator", "local_guide", "travel_agency", "excursion_provider",
                 "transport", "car_rental", "other_provider"},
}

APP_CATEGORIES = {"sites", "hotels", "restaurants", "activites", "excursions", "experiences"}
SCOPES = {"taolagnaro_city", "nearby", "regional"}
STATUSES = {"verified", "partially_verified", "needs_verification", "closed"}

# Wider Anosy / south-east bounding box. A coordinate outside this is not a
# Taolagnaro-area place and is almost certainly a transcription error.
LAT_RANGE = (-26.0, -24.0)
LON_RANGE = (45.5, 48.5)


def check(records, expected_category, path, errors, warnings):
    seen_keys = None
    for index, record in enumerate(records, 1):
        where = f"{os.path.basename(path)} #{index} ({record.get('slug', 'no-slug')})"
        keys = list(record.keys())
        if seen_keys is None:
            seen_keys = keys
        elif keys != seen_keys:
            errors.append(f"{where}: key set differs from record 1")

        if record.get("category") != expected_category:
            errors.append(f"{where}: category is {record.get('category')!r}")
        if record.get("app_category") not in APP_CATEGORIES:
            errors.append(f"{where}: bad app_category {record.get('app_category')!r}")
        if record.get("subcategory") not in SUBCATEGORIES[expected_category]:
            errors.append(f"{where}: bad subcategory {record.get('subcategory')!r}")
        if record.get("scope") not in SCOPES:
            errors.append(f"{where}: bad scope {record.get('scope')!r}")
        if record.get("verification_status") not in STATUSES:
            errors.append(f"{where}: bad verification_status {record.get('verification_status')!r}")
        if not record.get("source_urls"):
            errors.append(f"{where}: empty source_urls")
        if record.get("verification_status") == "closed" and not record.get("closed_evidence"):
            errors.append(f"{where}: closed without closed_evidence")
        if record.get("verification_status") != "closed" and record.get("closed_evidence"):
            warnings.append(f"{where}: closed_evidence set but status is not closed")
        if record.get("last_verification_date") in (None, ""):
            errors.append(f"{where}: missing last_verification_date")
        if not record.get("verification_notes"):
            warnings.append(f"{where}: empty verification_notes")

        lat, lon = record.get("latitude"), record.get("longitude")
        if (lat is None) != (lon is None):
            errors.append(f"{where}: only one of latitude/longitude is set")
        if lat is not None:
            if not (LAT_RANGE[0] <= lat <= LAT_RANGE[1] and LON_RANGE[0] <= lon <= LON_RANGE[1]):
                errors.append(f"{where}: coordinate {lat},{lon} outside the Anosy region")
            if not record.get("coordinates_source"):
                warnings.append(f"{where}: coordinate without coordinates_source")
        if record.get("phone") and not record.get("phone_source"):
            warnings.append(f"{where}: phone without phone_source")
        if not str(record.get("slug", "")).isascii():
            errors.append(f"{where}: slug is not ASCII")


def main():
    errors, warnings = [], []
    slugs = {}
    totals = {}
    statuses = {}
    scopes = {}
    apps = {}

    for filename, category in FILES.items():
        path = os.path.join(RESEARCH, filename)
        if not os.path.exists(path):
            errors.append(f"{filename}: MISSING")
            continue
        try:
            with open(path, encoding="utf-8") as fh:
                records = json.load(fh)
        except json.JSONDecodeError as exc:
            errors.append(f"{filename}: invalid JSON — {exc}")
            continue
        if not isinstance(records, list):
            errors.append(f"{filename}: top level is not a JSON array")
            continue

        totals[filename] = len(records)
        check(records, category, path, errors, warnings)

        for record in records:
            slug = record.get("slug")
            if slug in slugs:
                errors.append(f"duplicate slug {slug!r} in {filename} and {slugs[slug]}")
            else:
                slugs[slug] = filename
            statuses[record.get("verification_status")] = statuses.get(record.get("verification_status"), 0) + 1
            scopes[record.get("scope")] = scopes.get(record.get("scope"), 0) + 1
            apps[record.get("app_category")] = apps.get(record.get("app_category"), 0) + 1

    print("=== record counts ===")
    for filename in FILES:
        print(f"  {filename:24} {totals.get(filename, 'MISSING')}")
    print(f"  {'TOTAL':24} {sum(v for v in totals.values() if isinstance(v, int))}")

    print("\n=== verification status ===")
    for status in sorted(statuses):
        print(f"  {status:22} {statuses[status]}")

    print("\n=== scope ===")
    for scope in sorted(scopes):
        print(f"  {scope:22} {scopes[scope]}")

    print("\n=== app_category ===")
    for app in sorted(apps):
        print(f"  {app:22} {apps[app]}")

    print(f"\nunique slugs: {len(slugs)}")

    if warnings:
        print(f"\n=== {len(warnings)} warning(s) ===")
        for warning in warnings:
            print(f"  ! {warning}")

    if errors:
        print(f"\n=== {len(errors)} ERROR(S) ===")
        for error in errors:
            print(f"  x {error}")
        return 1

    print("\nOK — no errors.")
    return 0


if __name__ == "__main__":
    sys.exit(main())