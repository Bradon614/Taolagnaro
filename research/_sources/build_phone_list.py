#!/usr/bin/env python3
"""Build research/phone-verification-list.csv — a manual call sheet.

One row per record that has a phone number. Nothing is dialled or messaged; this
file only prepares the list for the project owner. Columns after the twelve
required ones exist solely to flag numbers that need care before dialling.

Read-only with respect to the JSON files.
"""
import csv
import json
import os
import re
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
RESEARCH = os.path.dirname(HERE)
FILES = ["restaurants.json", "accommodations.json", "attractions.json",
         "activities.json", "providers.json"]

REQUIRED = ["slug", "business_name", "category", "phone", "location", "source_url",
            "verification_status", "verification_notes", "call_result",
            "confirmed_phone", "confirmed_operating_status", "last_contact_date"]
EXTRA = ["flag", "flag_reason", "call_priority", "evidence_basis"]

# Shared-number groups that cannot be one operator (see quality-audit.md §2.2 H2).
CONFLICT_GROUPS = [
    {"grill-de-lac", "espace-sophie-amboasary"},
    {"takasira", "safari-laka"},
    {"shtm", "reserve-de-nahampoana"},
]


UNCORROBORATED_HOSTS = re.compile(r"(fortdauphin\.com|openstreetmap\.org|nominatim)", re.I)


def corroborated(rec):
    """True when the phone is evidenced by something other than the tourism-office
    directory or a map object — i.e. a first-party site or an independent guide."""
    src = rec.get("phone_source") or ""
    return bool(src) and not UNCORROBORATED_HOSTS.search(src)


def digits(p):
    return re.sub(r"\D", "", p or "")


def evidence_basis(rec):
    """Classify how the record is currently supported."""
    generic = {"https://fortdauphin.com/annuaire-tourisme-anosy/",
               "https://www.linkees.com/explore/madagascar/anosy/tolagnaro",
               "https://fortdauphin.com/"}
    non_generic = [u for u in rec["source_urls"] if u not in generic]
    osm_only = all(re.search(r"(openstreetmap\.org|nominatim)", u) for u in non_generic) if non_generic else True
    if not non_generic:
        return "generic index only"
    if osm_only:
        return "OpenStreetMap only"
    member = [u for u in rec["source_urls"] if "/annuaire-tourisme-anosy/" in u and not u.endswith("annuaire-tourisme-anosy/")]
    first_party = [u for u in non_generic
                   if not re.search(r"(openstreetmap|nominatim|fortdauphin\.com|linkees)", u)]
    if first_party:
        return "first-party or guide source"
    if member:
        return "tourism-office member page"
    return "other"


def main():
    recs = []
    for fname in FILES:
        with open(os.path.join(RESEARCH, fname), encoding="utf-8") as fh:
            for r in json.load(fh):
                if r.get("phone"):
                    r["_file"] = fname
                    recs.append(r)

    # group by the last 9 digits so +261/0 formats collide correctly
    byphone = defaultdict(list)
    for r in recs:
        d = digits(r["phone"])
        if len(d) >= 9:
            byphone[d[-9:]].append(r)

    rows = []
    for r in recs:
        d = digits(r["phone"])
        key = d[-9:]
        peers = [x for x in byphone.get(key, []) if x is not r]

        flag, reason, priority = "ok", "", "normal"

        # 1. malformed / ambiguous numbers
        if ";" in r["phone"] or "," in r["phone"]:
            flag, priority = "malformed", "high"
            reason = "Field holds more than one number; only the first would dial."
        elif d.startswith("261") and len(d) != 12:
            flag, priority = "malformed", "high"
            reason = f"{len(d) - 3} digits after +261 (a Madagascar number has 9)."
        elif d.startswith("0") and len(d) != 10:
            flag, priority = "malformed", "high"
            reason = f"{len(d)} digits for a local 0-prefixed number (expected 10)."
        elif d and not d.startswith("261") and not d.startswith("0"):
            flag, priority = "invalid_country_code", "high"
            reason = f"Number starts {d[:3]!r}, neither +261 (Madagascar) nor 0."

        # 2. shared numbers
        if peers and flag == "ok":
            slugs = {r["slug"]} | {p["slug"] for p in peers}
            if any(slugs & g for g in CONFLICT_GROUPS) and corroborated(r):
                # This record's number is backed by its own source, so the collision
                # is the *other* record's problem. Do not waste a call on this one.
                flag = "shared_corroborated"
                reason = ("Number also used by " + ", ".join(sorted({p["slug"] for p in peers})) +
                          ", but this record's number is corroborated by its own source — "
                          "the collision most likely belongs to the other record.")
                priority = "low"
            elif any(slugs & g for g in CONFLICT_GROUPS):
                flag, priority = "shared_conflict", "high"
                reason = ("Same number as " + ", ".join(sorted({p["slug"] for p in peers})) +
                          " — different business types or towns, so this is a directory error, not one operator.")
            else:
                flag = "shared_same_operator"
                reason = ("Same number as " + ", ".join(sorted({p["slug"] for p in peers})) +
                          " — plausibly the same operator (hotel and its restaurant, or a place and its activity).")

        # 3. raise priority where a call would resolve real uncertainty
        basis = evidence_basis(r)
        if priority != "high":
            if basis in ("tourism-office member page", "generic index only") and \
               r["verification_status"] == "needs_verification":
                priority = "high"
            elif basis == "OpenStreetMap only":
                priority = "high"
            elif r["verification_status"] == "verified":
                priority = "low"

        rows.append({
            "slug": r["slug"],
            "business_name": r["name"],
            "category": r["_file"].replace(".json", ""),
            "phone": r["phone"],
            "location": f"{r['locality'] or ''} [{r['scope']}]".strip(),
            "source_url": r.get("phone_source") or r["source_urls"][0],
            "verification_status": r["verification_status"],
            "verification_notes": r["verification_notes"],
            "call_result": "",
            "confirmed_phone": "",
            "confirmed_operating_status": "",
            "last_contact_date": "",
            "flag": flag,
            "flag_reason": reason,
            "call_priority": priority,
            "evidence_basis": basis,
        })

    # high priority first, then by category, then name — the order to work through
    order = {"high": 0, "normal": 1, "low": 2}
    rows.sort(key=lambda x: (order[x["call_priority"]], x["category"], x["business_name"]))

    out = os.path.join(RESEARCH, "phone-verification-list.csv")
    with open(out, "w", encoding="utf-8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=REQUIRED + EXTRA)
        w.writeheader()
        w.writerows(rows)

    print(f"phone-verification-list.csv: {len(rows)} rows")
    from collections import Counter
    print("  by flag  :", dict(Counter(r["flag"] for r in rows)))
    print("  by priority:", dict(Counter(r["call_priority"] for r in rows)))
    print("  by evidence:", dict(Counter(r["evidence_basis"] for r in rows)))
    no_phone = 183 - len(rows)
    print(f"  records without a phone (not listed): {no_phone}")


if __name__ == "__main__":
    main()