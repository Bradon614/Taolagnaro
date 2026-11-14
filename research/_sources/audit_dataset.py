#!/usr/bin/env python3
"""Independent structural + data-quality audit of the Taolagnaro research dataset.

Deliberately checks things validate_dataset.py does NOT check: app_category
semantics, slug/name drift, null hygiene, phone/URL/coordinate validity,
evidence-versus-status coherence, and cross-record collisions.

Read-only. Emits findings to stdout and a JSON summary for the report.
"""
import json
import math
import os
import re
import subprocess
import sys
import unicodedata
import urllib.parse
from collections import Counter, defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
RESEARCH = os.path.dirname(HERE)

FILES = {
    "restaurants.json": "restaurant",
    "accommodations.json": "accommodation",
    "attractions.json": "attraction",
    "activities.json": "activity",
    "providers.json": "provider",
}

# What app_category each research category is allowed to map to, per README.
ALLOWED_APP = {
    "restaurant": {"restaurants"},
    "accommodation": {"hotels"},
    "attraction": {"sites"},
    "activity": {"activites", "excursions", "experiences"},
    "provider": {"excursions", "experiences", "activites"},
}

STATUSES = {"verified", "partially_verified", "needs_verification", "closed"}

# Taolagnaro town centre, from src/lib/site.ts / geo.ts
TOWN = (-25.0294, 46.9966)

# Tight box for "in or very near the town". Anything meant to be a town listing
# outside this is suspicious.
TOWN_BOX = (-25.12, 46.75, -24.90, 47.05)   # south, west, north, east
# Wide box for the whole Anosy research area.
AREA_BOX = (-26.0, 45.5, -24.0, 48.5)

findings = defaultdict(list)


def add(sev, code, slug, detail):
    findings[sev].append({"code": code, "slug": slug, "detail": detail})


def norm_name(s):
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[^a-z0-9]+", "", s)
    return s


def haversine(a, b):
    R = 6371000.0
    p1, p2 = math.radians(a[0]), math.radians(b[0])
    dp = p2 - p1
    dl = math.radians(b[1] - a[1])
    x = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * R * math.asin(math.sqrt(x))


def load():
    out = {}
    for fname, cat in FILES.items():
        path = os.path.join(RESEARCH, fname)
        with open(path, encoding="utf-8") as fh:
            out[fname] = json.load(fh)
    return out


def main():
    data = load()
    allrecs = []
    for fname, recs in data.items():
        for r in recs:
            r["_file"] = fname
            allrecs.append(r)

    # ---------------- structure ----------------
    keysets = {}
    for fname, recs in data.items():
        keys = [tuple(r.keys()) for r in recs]
        if len(set(keys)) != 1:
            add("critical", "inconsistent-key-set", fname,
                f"{len(set(keys))} distinct key orders within the file")
        keysets[fname] = keys[0]
        # compare across files
    base = keysets[list(keysets)[0]]
    for fname, ks in keysets.items():
        if ks != base:
            add("high", "key-set-mismatch", fname,
                f"{len(ks)} keys vs {len(base)} in {list(keysets)[0]}")

    # ---------------- null hygiene / empty strings ----------------
    for r in allrecs:
        for k, v in r.items():
            if k.startswith("_"):
                continue
            if isinstance(v, str) and v.strip() == "":
                add("high", "empty-string-not-null", r["slug"], f"field {k} is an empty string")
            if isinstance(v, str) and v.strip().lower() in {"n/a", "na", "none", "null", "-", "unknown"}:
                add("high", "placeholder-string", r["slug"], f"field {k} = {v!r}")
        if r["latitude"] is None and r["longitude"] is not None:
            add("critical", "lone-longitude", r["slug"], "longitude set without latitude")
        if r["latitude"] is not None and r["longitude"] is None:
            add("critical", "lone-latitude", r["slug"], "latitude set without longitude")

    # ---------------- category / app_category semantics ----------------
    for fname, recs in data.items():
        cat = FILES[fname]
        for r in recs:
            if r["category"] != cat:
                add("critical", "category-file-mismatch", r["slug"],
                    f"category={r['category']!r} in {fname}")
            if r["app_category"] not in ALLOWED_APP[cat]:
                add("high", "app-category-invalid", r["slug"],
                    f"app_category={r['app_category']!r} not allowed for {cat} "
                    f"(allowed: {sorted(ALLOWED_APP[cat])})")

    # ---------------- slug hygiene and drift ----------------
    slug_rx = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
    for r in allrecs:
        if not slug_rx.match(r["slug"]):
            add("high", "slug-format", r["slug"], "slug is not kebab-case ascii")
        n = norm_name(r["name"])
        s = r["slug"].replace("-", "")
        # crude drift test: does the slug share a long common prefix with the name?
        if n and s:
            common = os.path.commonprefix([n, s])
            if len(common) < max(4, min(len(n), len(s)) // 3):
                add("low", "slug-name-drift", r["slug"],
                    f"slug shares only {len(common)} leading chars with normalised name")

    # ---------------- phone validation ----------------
    # Madagascar: +261 then 9 digits (e.g. 34 05 212 35 -> 9 digits after 261)
    for r in allrecs:
        ph = r.get("phone")
        if not ph:
            continue
        digits = re.sub(r"\D", "", ph)
        if ph.strip().lower() in {"", "n/a"}:
            add("high", "phone-placeholder", r["slug"], f"phone={ph!r}")
        if not re.match(r"^[\d\s+().-]+$", ph):
            add("medium", "phone-charset", r["slug"], f"phone contains unexpected characters: {ph!r}")
        if digits.startswith("261"):
            rest = digits[3:]
            if len(rest) != 9:
                add("medium", "phone-length", r["slug"],
                    f"+261 number has {len(rest)} digits after the country code (expected 9)")
            elif not rest.startswith("2") and not rest.startswith("3"):
                add("medium", "phone-prefix", r["slug"],
                    f"+261 number starts {rest[:2]!r}, not a standard Madagascar mobile/landline prefix")
        elif digits.startswith("0"):
            if len(digits) != 10:
                add("medium", "phone-length", r["slug"],
                    f"local number has {len(digits)} digits (expected 10: 0 + 9)")
        else:
            add("medium", "phone-country-code", r["slug"],
                f"number does not start with +261 or 0 (got {len(digits)} digits)")
        # foreign country code detected
        if digits.startswith("26") and not digits.startswith("261"):
            add("high", "phone-foreign-country", r["slug"],
                f"number uses country code +{digits[:3]} which is not Madagascar (+261)")

    # ---------------- URL validation ----------------
    for r in allrecs:
        urls = list(r.get("source_urls") or [])
        for extra in ("website", "facebook", "instagram", "coordinates_source", "phone_source"):
            v = r.get(extra)
            if v:
                urls.append(v)
        img = r.get("image")
        if isinstance(img, dict):
            for k in ("url", "source_url", "licence_url"):
                if img.get(k):
                    urls.append(img[k])
        for u in urls:
            if not isinstance(u, str):
                add("high", "url-not-string", r["slug"], f"non-string URL: {u!r}")
                continue
            if u != u.strip():
                add("medium", "url-whitespace", r["slug"], f"URL has surrounding whitespace: {u!r}")
            p = urllib.parse.urlparse(u)
            if p.scheme not in ("http", "https"):
                add("high", "url-scheme", r["slug"], f"URL scheme={p.scheme!r} in {u[:60]!r}")
            if not p.netloc:
                add("high", "url-no-host", r["slug"], f"URL has no host: {u[:60]!r}")
            elif "." not in p.netloc:
                add("high", "url-bad-host", r["slug"], f"URL host looks invalid: {p.netloc!r}")
    # referenced website/facebook/instagram must also appear in source_urls
    for r in allrecs:
        for k in ("website", "facebook", "instagram", "coordinates_source"):
            v = r.get(k)
            if v and v not in (r.get("source_urls") or []):
                add("low", "provenance-not-in-sources", r["slug"],
                    f"{k} URL is not listed in source_urls")

    # ---------------- coordinate plausibility ----------------
    for r in allrecs:
        lat, lon = r["latitude"], r["longitude"]
        if lat is None:
            continue
        s, w, n, e = AREA_BOX
        if not (s <= lat <= n and w <= lon <= e):
            add("critical", "coord-outside-area", r["slug"], f"{lat},{lon} outside Anosy box")
            continue
        # lat/lon transposed?
        if w <= lat <= e and s <= lon <= n and abs(lat) > 30:
            add("critical", "coord-transposed", r["slug"], f"{lat},{lon} looks like swapped lat/lon")
        # southern hemisphere must be negative latitude; eastern positive longitude
        if lat > 0:
            add("critical", "coord-wrong-hemisphere", r["slug"], f"positive latitude {lat}")
        if lon < 0:
            add("critical", "coord-wrong-hemisphere", r["slug"], f"negative longitude {lon}")
        # (0,0) null island
        if abs(lat) < 1 and abs(lon) < 1:
            add("critical", "coord-null-island", r["slug"], f"{lat},{lon} is Null Island")
        # town listings must be near town
        if r["scope"] == "taolagnaro_city":
            ds, dw, dn, de = TOWN_BOX
            if not (ds <= lat <= dn and dw <= lon <= de):
                add("high", "coord-town-scope-violation", r["slug"],
                    f"scope=taolagnaro_city but {lat},{lon} is "
                    f"{haversine((lat, lon), TOWN)/1000:.1f} km from town centre")
        # highly precise-looking coords from OSM are fine; round numbers may be hand-typed
        if lon is not None and abs(lon) > 180:
            add("critical", "coord-range", r["slug"], f"longitude {lon} out of range")
        if abs(lat) > 90:
            add("critical", "coord-range", r["slug"], f"latitude {lat} out of range")

    # ---------------- distance field coherence ----------------
    for r in allrecs:
        d = r.get("distance_from_centre_km")
        if d is None:
            continue
        if not isinstance(d, (int, float)):
            add("high", "distance-type", r["slug"], f"distance is {type(d).__name__}")
        elif d < 0:
            add("high", "distance-negative", r["slug"], f"distance={d}")
        elif r["latitude"] is not None:
            straight = haversine((r["latitude"], r["longitude"]), TOWN) / 1000.0
            if straight > 0 and d > 0:
                ratio = max(d, straight) / min(d, straight)
                if ratio > 3.0:
                    add("medium", "distance-vs-coord", r["slug"],
                        f"recorded distance {d} km but straight-line from town is "
                        f"{straight:.1f} km (ratio {ratio:.1f}x)")

    # ---------------- evidence vs status coherence ----------------
    for r in allrecs:
        n_src = len(r.get("source_urls") or [])
        st = r["verification_status"]
        if n_src == 0:
            add("critical", "no-sources", r["slug"], "no source_urls")
        if st == "verified" and n_src < 2:
            add("high", "verified-single-source", r["slug"],
                f"status=verified with only {n_src} source URL")
        if st == "verified" and not (r.get("phone") or r.get("website") or r.get("email")):
            add("medium", "verified-no-contact", r["slug"],
                "status=verified but no phone, website or email")
        if st == "closed" and not r.get("closed_evidence"):
            add("critical", "closed-no-evidence", r["slug"], "closed without closed_evidence")
        if st != "closed" and r.get("closed_evidence"):
            add("high", "evidence-on-open-record", r["slug"],
                "closed_evidence present but status is not closed")
        if st == "needs_verification" and n_src >= 4:
            add("low", "rich-but-unverified", r["slug"],
                f"status=needs_verification despite {n_src} sources — status may be understated")
        if not r.get("verification_notes"):
            add("high", "no-verification-notes", r["slug"], "verification_notes is empty")
        # OSM-only records
        non_osm = [u for u in (r.get("source_urls") or [])
                   if "openstreetmap.org" not in u and "nominatim" not in u]
        if not non_osm:
            add("medium", "osm-only-evidence", r["slug"],
                "every cited source is OpenStreetMap/Nominatim — no independent evidence")

    # ---------------- duplicate names ----------------
    byname = defaultdict(list)
    for r in allrecs:
        byname[norm_name(r["name"])].append(r)
    for n, rs in byname.items():
        if len(rs) > 1:
            add("high", "exact-duplicate-name", ", ".join(x["slug"] for x in rs),
                f"identical normalised name {n!r} across {len(rs)} records: "
                f"{[x['name'] for x in rs]}")

    # near-duplicate names via containment
    items = [(norm_name(r["name"]), r) for r in allrecs]
    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            a, ra = items[i]
            b, rb = items[j]
            if not a or not b or a == b:
                continue
            shorter, longer = (a, b) if len(a) <= len(b) else (b, a)
            if len(shorter) >= 6 and shorter in longer:
                add("medium", "near-duplicate-name",
                    f"{ra['slug']} / {rb['slug']}",
                    f"{shorter!r} contained in {longer!r}")

    # ---------------- phone collisions ----------------
    byphone = defaultdict(list)
    for r in allrecs:
        d = re.sub(r"\D", "", r.get("phone") or "")
        if len(d) >= 9:
            byphone[d[-9:]].append(r)
    for d, rs in byphone.items():
        if len(rs) > 1:
            slugs = [x["slug"] for x in rs]
            cross = len({x["_file"] for x in rs}) > 1
            add("high" if cross else "medium",
                "shared-phone" + ("-cross-category" if cross else ""),
                ", ".join(slugs),
                f"{len(rs)} records share phone ending {d}: " +
                "; ".join(f"{x['slug']} ({x['name']}) in {x['_file']}" for x in rs))

    # ---------------- geo collisions ----------------
    geo = [r for r in allrecs if r["latitude"] is not None]
    for i in range(len(geo)):
        for j in range(i + 1, len(geo)):
            a, b = geo[i], geo[j]
            dist = haversine((a["latitude"], a["longitude"]), (b["latitude"], b["longitude"]))
            if dist < 25:
                add("medium", "co-located",
                    f"{a['slug']} / {b['slug']}",
                    f"{dist:.1f} m apart ({a['name']!r} vs {b['name']!r})")

    # ---------------- email validation ----------------
    for r in allrecs:
        for field in ("email",):
            v = r.get(field)
            if not v:
                continue
            if ";" in v:
                add("medium", "email-multi", r["slug"], f"{field} contains multiple addresses: {v!r}")
                continue
            if not re.match(r"^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$", v):
                add("high", "email-format", r["slug"], f"{field}={v!r}")
            if re.search(r"(mysite\.com|example\.|test@|@test)", v, re.I):
                add("high", "email-placeholder", r["slug"], f"{field}={v!r} looks like a template value")

    # ---------------- opening hours sanity ----------------
    for r in allrecs:
        oh = r.get("opening_hours")
        if not oh:
            continue
        if re.search(r"\b(24/7|24h)\b", oh, re.I):
            continue
        if re.match(r"^\d{1,2}\s*(AM|PM)\s*to\s*\d{1,2}\s*(AM|PM)$", oh, re.I):
            add("low", "opening-hours-unnormalised", r["slug"],
                f"opening_hours is free prose, not OSM syntax: {oh!r}")
        if re.search(r"(selon OSM|selon ORTA|selon)", oh, re.I):
            add("low", "opening-hours-hedged", r["slug"],
                f"opening_hours embeds a provenance caveat: {oh!r}")

    # ---------------- images ----------------
    for r in allrecs:
        img = r.get("image")
        if not img:
            continue
        if not img.get("url") or not img.get("source_url"):
            add("high", "image-incomplete", r["slug"], "image missing url or source_url")
        if not img.get("licence"):
            add("high", "image-no-licence", r["slug"], "image has no licence recorded")
        if not img.get("attribution"):
            add("medium", "image-no-attribution", r["slug"], "image has no attribution line")
        if img.get("reusable") is not True:
            add("high", "image-not-reusable", r["slug"], "image marked not reusable but attached")

    # ---------------- emit ----------------
    print("=" * 78)
    print("INDEPENDENT STRUCTURAL AUDIT")
    print("=" * 78)
    order = ["critical", "high", "medium", "low"]
    for sev in order:
        items = findings.get(sev, [])
        print(f"\n### {sev.upper()}  ({len(items)})")
        groups = defaultdict(list)
        for f in items:
            groups[f["code"]].append(f)
        for code in sorted(groups):
            g = groups[code]
            print(f"\n  [{code}] x{len(g)}")
            for f in g[:40]:
                print(f"    - {f['slug']}: {f['detail']}")
            if len(g) > 40:
                print(f"    … and {len(g)-40} more")

    summary = {sev: len(findings.get(sev, [])) for sev in order}
    summary["total"] = sum(summary.values())
    print(f"\nTOTALS: {summary}")
    with open(os.path.join(HERE, "audit-findings.json"), "w", encoding="utf-8") as fh:
        json.dump({sev: findings.get(sev, []) for sev in order}, fh, ensure_ascii=False, indent=1)
    print("written: _sources/audit-findings.json")
    return 0


if __name__ == "__main__":
    sys.exit(main())