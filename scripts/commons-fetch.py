#!/usr/bin/env python3
"""
Downloads the curated Commons selection and records the credit each licence
requires.

Files are pulled through Commons' own thumbnailer at 1600px rather than at
full resolution: it is the width next/image needs to generate every responsive
variant, and it avoids pulling 20 MB originals we would immediately discard.

The manifest this writes (src/lib/photos.ts) is the single source for
attribution — a CC BY-SA image on the page without its credit is a licence
breach, so the data and the obligation travel together.
"""
import json, os, re, subprocess, sys, urllib.parse

API = "https://commons.wikimedia.org/w/api.php"
UA = "TaolagnaroSite/1.0 (tourism directory; contact@taolagnaro.mg)"
OUT = "public/photos"
WIDTH = 1600

sel = json.load(open("scripts/commons-selection.json"))
picks = sel["picks"]


def curl_json(url):
    for _ in range(3):
        p = subprocess.run(["curl", "-s", "--max-time", "30", "-H", f"User-Agent: {UA}", url],
                           capture_output=True, text=True)
        if p.returncode == 0 and p.stdout.strip():
            try:
                return json.loads(p.stdout)
            except json.JSONDecodeError:
                pass
    return {}


def clean(v):
    """Commons metadata is HTML. Keep the text, drop the markup."""
    import html
    txt = re.sub(r"<[^>]+>", "", v or "")
    return html.unescape(txt).replace("\n", " ").strip()


def slugify(name):
    base = os.path.splitext(name)[0].lower()
    base = re.sub(r"[^a-z0-9]+", "-", base).strip("-")
    return base[:60]


os.makedirs(OUT, exist_ok=True)
manifest = []

for pick in picks:
    title = "File:" + pick["file"]
    data = curl_json(
        f"{API}?{urllib.parse.urlencode({'action':'query','format':'json','titles':title,'prop':'imageinfo','iiprop':'url|extmetadata|size','iiurlwidth':WIDTH})}"
    )
    pages = data.get("query", {}).get("pages", {})
    page = next(iter(pages.values()), {})
    info = (page.get("imageinfo") or [{}])[0]
    if not info.get("thumburl"):
        print(f"  ! introuvable: {pick['file']}", file=sys.stderr)
        continue

    meta = info.get("extmetadata", {})
    local = f"{slugify(pick['file'])}.jpg"
    dest = os.path.join(OUT, local)

    dl = subprocess.run(
        ["curl", "-sL", "--max-time", "60", "-H", f"User-Agent: {UA}",
         "-o", dest, info["thumburl"]],
        capture_output=True,
    )
    if dl.returncode != 0 or not os.path.exists(dest) or os.path.getsize(dest) < 5000:
        print(f"  ! échec téléchargement: {pick['file']}", file=sys.stderr)
        continue

    manifest.append({
        "id": slugify(pick["file"]),
        "src": f"/photos/{local}",
        "target": pick["target"],
        "role": pick["role"],
        "caption": pick["caption"],
        "width": info.get("thumbwidth"),
        "height": info.get("thumbheight"),
        "author": clean(meta.get("Artist", {}).get("value")) or "Inconnu",
        "licence": clean(meta.get("LicenseShortName", {}).get("value")) or "?",
        "licenceUrl": clean(meta.get("LicenseUrl", {}).get("value")),
        "source": info.get("descriptionurl"),
        "bytes": os.path.getsize(dest),
    })
    kb = os.path.getsize(dest) // 1024
    print(f"  ✓ {local[:52]:<54} {kb:>5} Ko  {manifest[-1]['licence']}")

json.dump(manifest, open("scripts/photos-manifest.json", "w"), indent=1, ensure_ascii=False)
total = sum(m["bytes"] for m in manifest) / 1024 / 1024
print(f"\n{len(manifest)}/{len(picks)} téléchargées · {total:.1f} Mo", file=sys.stderr)
