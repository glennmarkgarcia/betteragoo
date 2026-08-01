# -*- coding: utf-8 -*-
import os

BASE_DIR = r"C:\github\betteragoo"
TRANSLATIONS_JS = os.path.join(BASE_DIR, "assets", "js", "translations.js")
LEGACY_HOST = "agoo" + ".gov.ph"

replacements = [
    (f"'gov-mayoragoogovph': 'mayor@{LEGACY_HOST}',", "'gov-lgu-agoo-email': 'lgu_agoo@yahoo.com',"),
    (f"'gov-vicemayoragoogovph': 'vicemayor@{LEGACY_HOST}',", "'gov-sb-agoo-email': 'sanggunianagoo@yahoo.com',"),
    (f"'gov-mpdoagoogovph': 'mpdo@{LEGACY_HOST}',", "'gov-mpdo-agoo-email': 'mpdo_agoo@yahoo.com',"),
]


def main():
    if not os.path.exists(TRANSLATIONS_JS):
        print("Translations file not found.")
        return

    with open(TRANSLATIONS_JS, "r", encoding="utf-8", errors="ignore") as source:
        content = source.read()

    modified = content
    for old, new in replacements:
        modified = modified.replace(old, new)

    if modified != content:
        with open(TRANSLATIONS_JS, "w", encoding="utf-8") as destination:
            destination.write(modified)
        print("Successfully updated legacy email keys in translations.js.")
    else:
        print("No replacements matched in translations.js.")


if __name__ == "__main__":
    main()
