#!/usr/bin/env python3
"""
Searches Wikimedia Commons for photographs of the real places in the catalog
and reports licence + author for each candidate.

Read-only: this only lists what exists and under what terms. Downloading is a
separate, deliberate step (commons-fetch.py) so nothing lands in the repo
without its licence having been checked first.
"""
import json, subprocess, sys, urllib.parse

API = "https://commons.wikimedia.org/w/api.php"
UA = "TaolagnaroSite/1.0 (tourism directory; contact@taolagnaro.mg)"

# Licences we can actually use, with the obligation each one carries.
FREE = {
    "cc0": "CC0 — no attribution required (we credit anyway)",
    "cc-by": "CC BY — credit the author",
    "cc-by-sa": "CC BY-SA — credit + share-alike",
    "public domain": "Public domain",
    "pd": "Public domain",
    "attribution": "Attribution required",
}

QUERIES = {
    "plage-de-libanona": ["Libanona beach Fort Dauphin", "Beach Fort Dauphin"],
    "pic-saint-louis": ["Pic Saint Louis Fort Dauphin", "Pic Saint-Louis Madagascar"],
    "fort-flacourt": ["Fort Dauphin fort ruin", "Fort Flacourt Madagascar"],
    "reserve-de-nahampoana": ["Nahampoana reserve", "Nahampoana Madagascar"],
    "baie-de-sainte-luce": ["Sainte Luce Madagascar forest", "Manafiafy Madagascar"],
    "presquile-de-lokaro": ["Lokaro Madagascar", "Evatraha Madagascar"],
    "plage-dambinanibe": ["Ambinanibe Madagascar", "Fort Dauphin dune beach"],
    "reserve-de-berenty": ["Berenty Reserve lemur", "Berenty Madagascar"],
    "_anosy-region": ["Anosy Madagascar landscape", "Tolagnaro"],
    "_spiny-forest": ["Spiny forest Madagascar Androy", "Didiereaceae Madagascar"],
    "_mahampy": ["Mahampy weaving Madagascar", "Madagascar basket weaving Anosy"],
}


def api(params):
    # Shelled out to curl: this machine's Python has no CA bundle, and the
    # system curl does.
    params.update({"action": "query", "format": "json"})
    url = f"{API}?{urllib.parse.urlencode(params)}"
    for attempt in range(3):
        proc = subprocess.run(
            ["curl", "-s", "--max-time", "30", "--retry", "1",
             "-H", f"User-Agent: {UA}", url],
            capture_output=True, text=True,
        )
        if proc.returncode == 0 and proc.stdout.strip():
            try:
                return json.loads(proc.stdout)
            except json.JSONDecodeError:
                pass
    # A search that will not answer is not worth failing the whole run over.
    print(f"  ! échec: {params.get('srsearch') or 'imageinfo'}", file=sys.stderr)
    return {}


def licence_of(meta):
    short = (meta.get("LicenseShortName", {}).get("value") or "").strip()
    name = (meta.get("License", {}).get("value") or "").lower()
    for key, note in FREE.items():
        if key in name or key in short.lower():
            return short or name, note
    return short or name or "unknown", None


def search(term, limit=8):
    data = api({"list": "search", "srsearch": term, "srnamespace": 6, "srlimit": limit})
    return [r["title"] for r in data.get("query", {}).get("search", [])]


def details(titles):
    if not titles:
        return {}
    data = api({
        "titles": "|".join(titles),
        "prop": "imageinfo",
        "iiprop": "url|extmetadata|size|mime",
        "iiurlwidth": 1600,
    })
    out = {}
    for page in data.get("query", {}).get("pages", {}).values():
        info = (page.get("imageinfo") or [{}])[0]
        if not info:
            continue
        meta = info.get("extmetadata", {})
        lic, note = licence_of(meta)
        out[page["title"]] = {
            "url": info.get("url"),
            "thumb": info.get("thumburl"),
            "width": info.get("width"),
            "height": info.get("height"),
            "mime": info.get("mime"),
            "size": info.get("size"),
            "licence": lic,
            "usable": note,
            "author": (meta.get("Artist", {}).get("value") or "").replace("\n", " ")[:160],
            "credit": (meta.get("Credit", {}).get("value") or "")[:120],
            "desc": (meta.get("ImageDescription", {}).get("value") or "")[:200],
        }
    return out


results = {}
for slug, terms in QUERIES.items():
    titles = []
    for term in terms:
        for title in search(term):
            if title not in titles:
                titles.append(title)
    info = details(titles[:16])
    usable = {k: v for k, v in info.items()
              if v["usable"] and (v.get("mime") or "").startswith("image/")
              and (v.get("width") or 0) >= 900}
    results[slug] = usable
    print(f"{slug:<26} {len(usable):>2} utilisables / {len(info)} trouvées", file=sys.stderr)

json.dump(results, open("scripts/commons-candidates.json", "w"), indent=1, ensure_ascii=False)
print("\n→ scripts/commons-candidates.json", file=sys.stderr)
