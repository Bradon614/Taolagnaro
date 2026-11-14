#!/usr/bin/env python3
"""One broad OpenStreetMap pass for the Taolagnaro research dataset.

Writes research/_sources/osm-extra.json: every named POI in the wider Anosy
bounding box for the categories the five research files need. Read-only against
public Overpass mirrors, with backoff. curl is used as the transport because the
bundled Python's TLS trust store cannot validate the mirrors.
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
BBOX = "-25.60,46.10,-24.60,47.60"

QUERIES = {
    # accommodation
    "lodging": '(node["tourism"~"^(hotel|guest_house|hostel|motel|resort|chalet|apartment|camp_site|caravan_site)$"]({b});way["tourism"~"^(hotel|guest_house|hostel|motel|resort|chalet|apartment|camp_site|caravan_site)$"]({b}););out center tags;',
    # attractions: natural
    "natural": '(node["natural"~"^(beach|peak|water|bay|cape)$"]({b});way["natural"~"^(beach|peak|water|bay|cape)$"]({b});node["waterway"="waterfall"]({b});way["waterway"="waterfall"]({b}););out center tags;',
    "parks": '(relation["boundary"="protected_area"]({b});way["boundary"="protected_area"]({b});relation["leisure"~"^(nature_reserve|park|garden)$"]({b});way["leisure"~"^(nature_reserve|park|garden)$"]({b});relation["tourism"="attraction"]({b});way["tourism"="attraction"]({b});relation["tourism"="viewpoint"]({b}););out center tags;',
    "heritage": '(node["historic"]({b});way["historic"]({b});node["tourism"="museum"]({b});way["tourism"="museum"]({b});node["man_made"="lighthouse"]({b});way["man_made"="lighthouse"]({b});node["amenity"="place_of_worship"]({b});way["amenity"="place_of_worship"]({b}););out center tags;',
    "markets": '(node["amenity"="marketplace"]({b});way["amenity"="marketplace"]({b});node["shop"="mall"]({b}););out center tags;',
    # activities + providers
    "sport": '(node["leisure"~"^(sports_centre|swimming_pool|water_park|stadium|golf_course|horse_riding)$"]({b});way["leisure"~"^(sports_centre|swimming_pool|water_park|stadium|golf_course|horse_riding)$"]({b});node["sport"~"^(surfing|kitesurfing|diving|swimming|canoe|rowing|fishing|climbing|cycling|equestrian|tennis)$"]({b});way["sport"~"^(surfing|kitesurfing|diving|fishing|climbing)$"]({b});node["leisure"="dive_centre"]({b}););out center tags;',
    "services": '(node["shop"~"^(travel_agency|car|car_repair|bicycle|motorcycle)$"]({b});way["shop"~"^(travel_agency|car|car_repair|bicycle|motorcycle)$"]({b});node["amenity"~"^(car_rental|travel_agency|fuel|bus_station|taxi|ferry_terminal|boat_rental)$"]({b});way["amenity"~"^(car_rental|travel_agency|fuel|bus_station|ferry_terminal|boat_rental)$"]({b});node["office"="guide"]({b}););out center tags;',
    "aeroway": '(node["aeroway"~"^(aerodrome|terminal)$"]({b});way["aeroway"="aerodrome"]({b}););out center tags;',
}


def fetch(query):
    for attempt in range(8):
        endpoint = ENDPOINTS[attempt % len(ENDPOINTS)]
        out = "osm-extra-tmp.json"
        proc = subprocess.run(
            ["curl", "-s", "--max-time", "150", "-A", UA, "-G", endpoint,
             "--data-urlencode", "data=" + query, "-o", out, "-w", "%{http_code}"],
            capture_output=True, text=True,
        )
        code = proc.stdout.strip()
        if code == "200" and os.path.exists(out) and open(out).read(1) == "{":
            with open(out) as fh:
                return json.load(fh)
        print(f"  {endpoint} -> http={code}", flush=True)
        time.sleep(5 * (attempt + 1))
    return None


def flatten(element):
    tags = element.get("tags", {})
    centre = element.get("center") or {}
    return {
        "osm_type": element["type"],
        "osm_id": element["id"],
        "lat": element.get("lat") or centre.get("lat"),
        "lon": element.get("lon") or centre.get("lon"),
        "tags": tags,
        "osm_url": f"https://www.openstreetmap.org/{element['type']}/{element['id']}",
    }


def main():
    everything = {}
    for name, template in QUERIES.items():
        query = "[out:json][timeout:120];" + template.format(b=BBOX)
        print(f"== {name}", flush=True)
        result = fetch(query)
        if result is None:
            print(f"  GAVE UP on {name}", flush=True)
            everything[name] = []
            continue
        features = [flatten(e) for e in result.get("elements", [])]
        named = [f for f in features if f["tags"].get("name")]
        print(f"  {len(features)} features, {len(named)} named", flush=True)
        everything[name] = features
        time.sleep(2)

    with open("osm-extra.json", "w", encoding="utf-8") as fh:
        json.dump({"bbox": BBOX, "retrieved": time.strftime("%Y-%m-%d"), "groups": everything}, fh,
                  ensure_ascii=False, indent=1)
    total_named = sum(1 for g in everything.values() for f in g if f["tags"].get("name"))
    print(f"TOTAL named features: {total_named}", flush=True)


if __name__ == "__main__":
    main()