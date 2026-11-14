#!/usr/bin/env python3
"""Overpass client for the Taolagnaro research dataset (curl transport).

Uses curl rather than urllib: the bundled Python's TLS trust store does not
validate the public Overpass mirrors, while curl's does. Read-only, narrow
queries, exponential backoff between mirrors.
"""
import json
import os
import subprocess
import time

UA = "TaolagnaroTourismResearch/0.1 (tourism dataset; read-only research)"
ENDPOINTS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.private.coffee/api/interpreter",
]
BBOX = "-25.60,46.10,-24.60,47.60"  # south,west,north,east

QUERIES = {
    "restaurants": (
        '(node["amenity"~"^(restaurant|cafe|fast_food|bar|pub|ice_cream)$"]({b});'
        'way["amenity"~"^(restaurant|cafe|fast_food|bar|pub)$"]({b}););out center tags;'
    ),
    "beaches": '(node["natural"="beach"]({b});way["natural"="beach"]({b}););out center tags;',
    "peaks": '(node["natural"="peak"]({b});way["natural"="peak"]({b}););out center tags;',
    "protected": (
        '(relation["boundary"="protected_area"]({b});way["boundary"="protected_area"]({b});'
        'relation["leisure"="nature_reserve"]({b});way["leisure"="nature_reserve"]({b}););out center tags;'
    ),
    "providers": (
        '(node["shop"="travel_agency"]({b});way["shop"="travel_agency"]({b});'
        'node["amenity"="car_rental"]({b});way["amenity"="car_rental"]({b});'
        'node["tourism"="information"]({b});way["tourism"="information"]({b}););out center tags;'
    ),
    "heritage": (
        '(node["historic"~"^(memorial|monument|ruins|fort|castle|archaeological_site)$"]({b});'
        'way["historic"~"^(monument|ruins|fort|castle|archaeological_site)$"]({b});'
        'node["man_made"="lighthouse"]({b});way["man_made"="lighthouse"]({b});'
        'node["waterway"="waterfall"]({b});way["waterway"="waterfall"]({b}););out center tags;'
    ),
    "water": '(node["natural"="water"]({b});way["natural"="water"]({b}););out center tags;',
}


def fetch(query):
    for attempt in range(6):
        endpoint = ENDPOINTS[attempt % len(ENDPOINTS)]
        out = "osm-tmp.json"
        proc = subprocess.run(
            ["curl", "-s", "--max-time", "150", "-A", UA, "-G", endpoint,
             "--data-urlencode", "data=" + query, "-o", out, "-w", "%{http_code}"],
            capture_output=True, text=True,
        )
        code = proc.stdout.strip()
        if code == "200" and os.path.exists(out) and open(out).read(1) == "{":
            with open(out) as fh:
                return json.load(fh)
        print(f"  {endpoint} -> http={code}")
        time.sleep(4 * (attempt + 1))
    return None


def main():
    for name, template in QUERIES.items():
        query = "[out:json][timeout:120];" + template.format(b=BBOX)
        print(f"== {name}", flush=True)
        result = fetch(query)
        if result is None:
            print(f"  GAVE UP on {name}", flush=True)
            continue
        elements = result.get("elements", [])
        named = sum(1 for e in elements if e.get("tags", {}).get("name"))
        print(f"  {len(elements)} elements ({named} named)", flush=True)
        with open(f"osm-{name}.json", "w", encoding="utf-8") as fh:
            json.dump(result, fh)
        time.sleep(2)


if __name__ == "__main__":
    main()