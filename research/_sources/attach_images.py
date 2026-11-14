#!/usr/bin/env python3
"""Attach Wikimedia Commons imagery to the research records and emit
image-attribution.csv.

Only images whose Commons file page states a reusable licence are attached.
An image is assigned to a listing only when its file name or its Commons
description identifies that same place — no image is attached on a guess, and
listings with no such image keep `image: null`.

Reads:  research/{attractions,activities,accommodations,restaurants,providers}.json
Writes: research/{...}.json (image field only), research/image-attribution.csv
"""
import csv
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
RESEARCH = os.path.dirname(HERE)

# key -> slug, role, file name, direct URL, Commons page, author, licence, licence url
IMAGES = [
    # --- Libanona beach (the file names and Commons descriptions name Libanona) ---
    ("plage-de-libanona", "lead", "LIBANONA BEACH.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/6/6b/LIBANONA_BEACH.jpg",
     "https://commons.wikimedia.org/wiki/File:LIBANONA_BEACH.jpg",
     "Zoubl", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0"),
    ("plage-de-libanona", "gallery", "Beach Fort Dauphin I.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/8/8d/Beach_Fort_Dauphin_I.jpg",
     "https://commons.wikimedia.org/wiki/File:Beach_Fort_Dauphin_I.jpg",
     "Smiley.toerist", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0"),
    # --- Pic Saint-Louis / town panorama ---
    ("pic-saint-louis", "lead", "Vue de Fort-Dauphin et de l'océan indien.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/9/9d/Vue_de_Fort-Dauphin_et_de_l%27oc%C3%A9an_indien.jpg",
     "https://commons.wikimedia.org/wiki/File:Vue_de_Fort-Dauphin_et_de_l%27oc%C3%A9an_indien.jpg",
     "PFFD", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0"),
    ("pic-saint-louis", "gallery", "Admiralty Chart No 690 Fort Dauphin Bay, with Views, Published 1784.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/7/79/Admiralty_Chart_No_690_Fort_Dauphin_Bay%2C_with_Views%2C_Published_1784.jpg",
     "https://commons.wikimedia.org/wiki/File:Admiralty_Chart_No_690_Fort_Dauphin_Bay,_with_Views,_Published_1784.jpg",
     "United Kingdom Hydrographic Office", "Public domain", ""),
    # --- Fort-Flacourt museum (Commons has a dedicated Museum series) ---
    ("musee-fort-flacourt", "lead", "Fort Dauphin Museum.1.JPG",
     "https://upload.wikimedia.org/wikipedia/commons/b/bd/Fort_Dauphin_Museum.1.JPG",
     "https://commons.wikimedia.org/wiki/File:Fort_Dauphin_Museum.1.JPG",
     "Milorad Dimic MD, Serbia", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0"),
    ("musee-fort-flacourt", "gallery", "Fort Dauphin Museum.2.JPG",
     "https://upload.wikimedia.org/wikipedia/commons/c/c0/Fort_Dauphin_Museum.2.JPG",
     "https://commons.wikimedia.org/wiki/File:Fort_Dauphin_Museum.2.JPG",
     "Intermedichbo", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0"),
    ("musee-fort-flacourt", "gallery", "Fort-Dauphin. Fort Flacourt.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/f/fa/Fort-Dauphin._Fort_Flacourt.jpg",
     "https://commons.wikimedia.org/wiki/File:Fort-Dauphin._Fort_Flacourt.jpg",
     "Editeur Couadou, France. before 1904", "Public domain", ""),
    # --- Bastion de Maudave ---
    ("bastion-de-maudave", "lead", "Fort-Dauphin. Ruins of a bastion.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/9/9c/Fort-Dauphin._Ruins_of_a_bastion.jpg",
     "https://commons.wikimedia.org/wiki/File:Fort-Dauphin._Ruins_of_a_bastion.jpg",
     "Unknown, circa 1900-05", "Public domain", ""),
    # --- Nahampoana ---
    ("reserve-de-nahampoana", "lead", "Nahampoana reserve 2013 7.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/2/2f/Nahampoana_reserve_2013_7.jpg",
     "https://commons.wikimedia.org/wiki/File:Nahampoana_reserve_2013_7.jpg",
     "Smiley.toerist", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0"),
    ("reserve-de-nahampoana", "gallery", "Nahampoana reserve water I.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/5/5b/Nahampoana_reserve_water_I.jpg",
     "https://commons.wikimedia.org/wiki/File:Nahampoana_reserve_water_I.jpg",
     "Smiley.toerist", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0"),
    ("reserve-de-nahampoana", "gallery", "Turtles in the reserve of Nahampoana.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/9/97/Turtles_in_the_reserve_of_Nahampoana.jpg",
     "https://commons.wikimedia.org/wiki/File:Turtles_in_the_reserve_of_Nahampoana.jpg",
     "Smiley.toerist", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0"),
    ("reserve-de-nahampoana", "gallery", "Propithecus verreauxi in reserve de Nahampoana.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/3/36/Propithecus_verreauxi_in_reserve_de_Nahampoana.jpg",
     "https://commons.wikimedia.org/wiki/File:Propithecus_verreauxi_in_reserve_de_Nahampoana.jpg",
     "Smiley.toerist", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0"),
    # --- Berenty ---
    ("reserve-de-berenty", "lead", "Lemur Katta in Berenty.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/4/4a/Lemur_Katta_in_Berenty.jpg",
     "https://commons.wikimedia.org/wiki/File:Lemur_Katta_in_Berenty.jpg",
     "Hans Bernhard (Schnobby)", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0"),
    ("reserve-de-berenty", "gallery", "Jumping Verreaux's Sifaka Berenty Madagascar - panoramio.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/6/6c/Jumping_Verreaux%27s_Sifaka_Berenty_Madagascar_-_panoramio.jpg",
     "https://commons.wikimedia.org/wiki/File:Jumping_Verreaux%27s_Sifaka_Berenty_Madagascar_-_panoramio.jpg",
     "Hiroki Ogawa", "CC BY 3.0", "https://creativecommons.org/licenses/by/3.0"),
    ("reserve-de-berenty", "gallery", "Berenty reserve.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/2/2e/Berenty_reserve.jpg",
     "https://commons.wikimedia.org/wiki/File:Berenty_reserve.jpg",
     "gailhampshire", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0"),
    ("reserve-de-berenty", "gallery", "Berenty Museum (4353620666).jpg",
     "https://upload.wikimedia.org/wikipedia/commons/4/4b/Berenty_Museum_%284353620666%29.jpg",
     "https://commons.wikimedia.org/wiki/File:Berenty_Museum_(4353620666).jpg",
     "gailhampshire from Cradley, Malvern, U.K", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0"),
    # --- Andohahela ---
    ("parc-national-dandohahela", "lead", "Triangle palm Andohahela Madagascar - panoramio.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/c/c6/Triangle_palm_Andohahela_Madagascar_-_panoramio.jpg",
     "https://commons.wikimedia.org/wiki/File:Triangle_palm_Andohahela_Madagascar_-_panoramio.jpg",
     "Hiroki Ogawa", "CC BY 3.0", "https://creativecommons.org/licenses/by/3.0"),
    ("parc-national-dandohahela", "gallery", "Andohahela NP.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/0/00/Andohahela_NP.jpg",
     "https://commons.wikimedia.org/wiki/File:Andohahela_NP.jpg",
     "Masindrano~commonswiki", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0"),
    # --- Tsitongambarika: the only Commons image that names the massif ---
    ("tsitongambarika", "lead", "0G4A6459 Anosy Tsitongambarika Field Station.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/4/42/0G4A6459_Anosy_Tsitongambarika_Field_Station.jpg",
     "https://commons.wikimedia.org/wiki/File:0G4A6459_Anosy_Tsitongambarika_Field_Station.jpg",
     "TheentomologistSYW", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0"),
    # --- Sainte-Luce ---
    ("sainte-luce-reserve", "lead", "Madagascar74.094.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/2/27/Madagascar74.094.jpg",
     "https://commons.wikimedia.org/wiki/File:Madagascar74.094.jpg",
     "Madagascar74", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0"),
    # --- Lokaro / Evatra, also used by the pirogue excursion ---
    ("plage-de-lokaro", "lead", "Evatra walk I.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/d/d7/Evatra_walk_I.jpg",
     "https://commons.wikimedia.org/wiki/File:Evatra_walk_I.jpg",
     "Smiley.toerist", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0"),
    ("excursion-lokaro-en-pirogue", "lead", "Canoes Fort Dauphin II.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/1/13/Canoes_Fort_Dauphin_II.jpg",
     "https://commons.wikimedia.org/wiki/File:Canoes_Fort_Dauphin_II.jpg",
     "Smiley.toerist", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0"),
    # --- Ehoala port, used by the Port Ehoala surf spot ---
    ("surf-port-ehoala", "lead", "Port d'Ehoala in Fort Dauphin, Madagascar.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/6/62/Port_d%27Ehoala_in_Fort_Dauphin%2C_Madagascar.jpg",
     "https://commons.wikimedia.org/wiki/File:Port_d%27Ehoala_in_Fort_Dauphin,_Madagascar.jpg",
     "Crossgates", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0"),
]

# Editorial imagery that belongs to the region rather than one listing. Recorded
# in the CSV so the licence obligation is tracked, but attached to no listing.
EDITORIAL = [
    ("_region", "Port d'Ehoala in Fort Dauphin, Madagascar.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/6/62/Port_d%27Ehoala_in_Fort_Dauphin%2C_Madagascar.jpg",
     "https://commons.wikimedia.org/wiki/File:Port_d%27Ehoala_in_Fort_Dauphin,_Madagascar.jpg",
     "Crossgates", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0"),
    ("_region", "Fort dauphin, Madagascar (25785148900).jpg",
     "https://upload.wikimedia.org/wikipedia/commons/8/89/Fort_dauphin%2C_Madagascar_%2825785148900%29.jpg",
     "https://commons.wikimedia.org/wiki/File:Fort_dauphin,_Madagascar_(25785148900).jpg",
     "krishna naudin", "CC BY-SA 2.0", "https://creativecommons.org/licenses/by-sa/2.0"),
    ("_region", "Tolagnaro 01 - Madagascar.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/7/7f/Tolagnaro_01_-_Madagascar.jpg",
     "https://commons.wikimedia.org/wiki/File:Tolagnaro_01_-_Madagascar.jpg",
     "Thelezifor", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0"),
    ("_region", "The Port of Wrecks 01- Tolagnaro (cropped).jpg",
     "https://upload.wikimedia.org/wikipedia/commons/b/b5/The_Port_of_Wrecks_01-_Tolagnaro_%28cropped%29.jpg",
     "https://commons.wikimedia.org/wiki/File:The_Port_of_Wrecks_01-_Tolagnaro_(cropped).jpg",
     "Thelezifor", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0"),
    ("_region", "Fort Dauphin La Residence.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/1/15/Fort_Dauphin_La_Residence.jpg",
     "https://commons.wikimedia.org/wiki/File:Fort_Dauphin_La_Residence.jpg",
     "Unknown author", "Public domain", ""),
    ("_region", "Fort Dauphin rocks 04.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/2/2b/Fort_Dauphin_rocks_04.jpg",
     "https://commons.wikimedia.org/wiki/File:Fort_Dauphin_rocks_04.jpg",
     "Smiley.toerist", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0"),
]

FILES = ["attractions.json", "activities.json", "accommodations.json",
         "restaurants.json", "providers.json"]


def attribution_line(author, licence, title, licence_url):
    """The credit line the licence requires us to display."""
    parts = [f"{title} — {author}" if author else title, licence]
    if licence_url:
        parts.append(licence_url)
    return " · ".join(p for p in parts if p)


def canonical(title, fallback):
    """Prefer the URL Commons itself returned for this file.

    The direct upload URL is not derivable from the file name (the two path
    characters are a hash of the name), so a hard-coded URL is only a fallback.
    """
    path = os.path.join(HERE, "commons-canonical-urls.json")
    if os.path.exists(path):
        with open(path, encoding="utf-8") as fh:
            resolved = json.load(fh)
        entry = resolved.get("File:" + title)
        if entry and entry.get("url"):
            return entry["url"].split("?")[0]
    return fallback


def main():
    # index existing records so we only attach images to slugs that exist
    records = {}
    for filename in FILES:
        path = os.path.join(RESEARCH, filename)
        with open(path, encoding="utf-8") as fh:
            records[filename] = json.load(fh)

    by_slug = {}
    for filename, items in records.items():
        for record in items:
            by_slug.setdefault(record["slug"], []).append((filename, record))

    attached = {}
    unattached = []
    for slug, role, title, url, page, author, licence, licence_url in IMAGES:
        entry = {
            "url": canonical(title, url),
            "source_url": page,
            "author": author,
            "licence": licence,
            "licence_url": licence_url or None,
            "attribution": attribution_line(author, licence, title, licence_url),
            "reusable": True,
        }
        if slug not in by_slug:
            unattached.append((slug, title))
            continue
        for filename, record in by_slug[slug]:
            if record["image"] is None or role == "lead":
                record["image"] = entry
        attached.setdefault(slug, []).append((role, title))

    # write the records back
    for filename, items in records.items():
        with open(os.path.join(RESEARCH, filename), "w", encoding="utf-8") as fh:
            json.dump(items, fh, ensure_ascii=False, indent=1)
            fh.write("\n")

    # image-attribution.csv
    rows = []
    for slug, role, title, url, page, author, licence, licence_url in IMAGES:
        rows.append({
            "target_slug": slug,
            "role": role,
            "image_title": title,
            "image_url": canonical(title, url),
            "source_url": page,
            "author": author,
            "licence": licence,
            "licence_url": licence_url,
            "attribution_required": "yes" if licence.lower() != "public domain" else "no",
            "attribution_line": attribution_line(author, licence, title, licence_url),
            "reusable": "yes",
            "attached": "yes" if slug in attached else "no - listing slug not found",
            "notes": "",
        })
    for slug, title, url, page, author, licence, licence_url in EDITORIAL:
        rows.append({
            "target_slug": slug,
            "role": "editorial",
            "image_title": title,
            "image_url": canonical(title, url),
            "source_url": page,
            "author": author,
            "licence": licence,
            "licence_url": licence_url,
            "attribution_required": "yes" if licence.lower() != "public domain" else "no",
            "attribution_line": attribution_line(author, licence, title, licence_url),
            "reusable": "yes",
            "attached": "no - editorial image for the region",
            "notes": "Regional editorial imagery; not tied to a single listing.",
        })

    columns = ["target_slug", "role", "image_title", "image_url", "source_url",
               "author", "licence", "licence_url", "attribution_required",
               "attribution_line", "reusable", "attached", "notes"]
    out = os.path.join(RESEARCH, "image-attribution.csv")
    with open(out, "w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=columns)
        writer.writeheader()
        writer.writerows(rows)

    print(f"image-attribution.csv: {len(rows)} rows")
    print(f"listings with an image attached: {len(attached)}")
    for slug in sorted(attached):
        print(f"  {slug}: {len(attached[slug])} image(s)")
    if unattached:
        print("NOT ATTACHED (slug missing):")
        for slug, title in unattached:
            print(f"  {slug} <- {title}")


if __name__ == "__main__":
    main()