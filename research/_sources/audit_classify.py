#!/usr/bin/env python3
"""Classify every listing for publication readiness (audit only).

Rules are explicit and ordered: the first matching do_not_publish rule wins, then
needs_confirmation, otherwise ready_for_review. Nothing is written to the JSON
files; this only produces a classification for the audit report.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
RESEARCH = os.path.dirname(HERE)

FILES = ["restaurants.json", "accommodations.json", "attractions.json",
         "activities.json", "providers.json"]

INDEX_ONLY = {
    "https://fortdauphin.com/annuaire-tourisme-anosy/",
    "https://www.linkees.com/explore/madagascar/anosy/tolagnaro",
    "https://fortdauphin.com/",
}
OSM_ONLY = re.compile(r"(openstreetmap\.org|nominatim)")

# Explicit do-not-publish set, with the reason recorded.
DO_NOT_PUBLISH = {
    "le-petit-bonheur-hotel-tag-flagged":
        "Transparency record: same OSM object as restaurant 'le-petit-bonheur'; hotel tag is probably wrong.",
    "chez-anita-hotel-tag-flagged":
        "Transparency record: same OSM object as restaurant 'chez-anita'.",
    "hotel-mahavoky-annexe-tag-flagged":
        "Transparency record: same OSM object as restaurant 'hotel-mahavoky-annexe'.",
    "hotel-marina-doublon":
        "Duplicate flag only — record states 'do not publish' in its own notes.",
    "aiko-aventure":
        "Sole evidence is a directory index whose detail page is behind an anti-bot wall; no contact, no locality confirmed.",
    "faux-cap-beach":
        "Sole evidence is a directory index whose detail page is behind an anti-bot wall; no coordinates, no description.",
    "karibu":
        "Phone carries the +264 (Namibia) country code — unusable contact — and the only evidence is a single OSM object.",
    "club-sandwich":
        "Two contradictory OSM objects, one literally named 'temporarily closed'; phone is shared with an unrelated restaurant.",
    "le-local-ex-chez-george":
        "OSM name begins 'Formerly'; operating status unknown and the identity overlaps a separate restaurant record.",
    "acp-camp-seed-madagascar":
        "Private research camp (OSM access=private); not a bookable tourism business.",
    "maison-agent-sarisambo":
        "Name suggests staff housing rather than commercial lodging; no contact, single OSM object.",
    "ancien-hotel-miramar":
        "Confirmed closed (see closed_evidence). The app has no closed state and would render it as bookable.",
    "formerly-sahil-hotel":
        "Confirmed closed (see closed_evidence). The app has no closed state and would render it as bookable.",
}

# Records whose attached image does not depict that place (see audit).
BAD_IMAGE = {
    "musee-fort-flacourt":
        "Two of three attached images are of the Fort Dauphin Museum in Manitoba, Canada — not Madagascar.",
}
WEAK_IMAGE = {
    "plage-de-lokaro":
        "Attached image is captioned 'ocean coast near Evatra' — the village en route, not the beach itself.",
    "sainte-luce-reserve":
        "Attached image is captioned 'Manafiafy' and is a mid-1970s photograph — adjacent locality, not the reserve.",
    "plage-de-libanona":
        "Gallery image is captioned only 'beach at Fort Dauphin'; not confirmed to be Libanona.",
    "parc-national-dandohahela":
        "Gallery image 'Andohahela NP.jpg' has weak licence provenance on Commons ('Assumed own work', no machine-readable source).",
    "surf-port-ehoala":
        "Attached image shows the port, not a surf spot.",
}


def classify(rec):
    """Return (label, reasons[])."""
    slug = rec["slug"]
    reasons = []
    srcs = rec.get("source_urls") or []
    non_osm = [u for u in srcs if not OSM_ONLY.search(u)]
    specific = [u for u in non_osm if u not in INDEX_ONLY]
    has_contact = bool(rec.get("phone") or rec.get("website") or rec.get("email"))

    # ---- do_not_publish ----
    if slug in DO_NOT_PUBLISH:
        return "do_not_publish", [DO_NOT_PUBLISH[slug]]
    if rec["verification_status"] == "closed":
        return "do_not_publish", ["verification_status is 'closed'."]
    # ---- needs_confirmation ----
    # OSM-only evidence is "important information still requires confirmation",
    # not "affirmatively unsafe": the record is a candidate, not a hazard.
    if not non_osm:
        reasons.append(
            "Every cited source is OpenStreetMap/Nominatim; nothing independent confirms it trades."
        )
    if rec["verification_status"] == "needs_verification":
        reasons.append("verification_status is 'needs_verification'.")
    if not specific:
        reasons.append("No establishment-specific source; only a directory index or home page.")
    if not has_contact:
        reasons.append("No phone, website or email recorded.")
    if rec["latitude"] is None:
        reasons.append("No coordinates; the app would fall back to the town centre.")
    phone = rec.get("phone") or ""
    if ";" in phone or "," in phone:
        reasons.append("Phone field holds more than one number.")
    if slug in WEAK_IMAGE:
        reasons.append("Image association is weak: " + WEAK_IMAGE[slug])
    if slug in BAD_IMAGE:
        reasons.append(BAD_IMAGE[slug])

    if reasons:
        return "needs_confirmation", reasons
    return "ready_for_review", ["Establishment-specific evidence, contact and coordinates present."]


def main():
    out = {"ready_for_review": [], "needs_confirmation": [], "do_not_publish": []}
    for fname in FILES:
        with open(os.path.join(RESEARCH, fname), encoding="utf-8") as fh:
            for rec in json.load(fh):
                label, reasons = classify(rec)
                out[label].append({
                    "file": fname,
                    "slug": rec["slug"],
                    "name": rec["name"],
                    "verification_status": rec["verification_status"],
                    "reasons": reasons,
                })

    total = sum(len(v) for v in out.values())
    print(f"classified {total} records")
    for label in ["ready_for_review", "needs_confirmation", "do_not_publish"]:
        items = out[label]
        print(f"\n### {label}  ({len(items)})")
        for it in items:
            print(f"  {it['file']:22} {it['slug']:38} [{it['verification_status']}]")
            for r in it["reasons"]:
                print(f"       - {r}")

    with open(os.path.join(HERE, "audit-classification.json"), "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)
    print("\nwritten: _sources/audit-classification.json")
    return 0


if __name__ == "__main__":
    sys.exit(main())