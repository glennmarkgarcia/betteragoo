# -*- coding: utf-8 -*-
import os

BASE_DIR = r"C:\github\betteragoo"
TRANSLATIONS_JS = os.path.join(BASE_DIR, "assets", "js", "translations.js")

replacements = [
    ("'gov-mayoragoogovph': 'mayor@agoo.gov.ph',", "'gov-lgu-agoo-email': 'lgu_agoo@yahoo.com',"),
    ("'gov-vicemayoragoogovph': 'vicemayor@agoo.gov.ph',", "'gov-sb-agoo-email': 'sanggunianagoo@yahoo.com',"),
    ("'gov-mpdoagoogovph': 'mpdo@agoo.gov.ph',", "'gov-mpdo-agoo-email': 'mpdo_agoo@yahoo.com',"),
]

def main():
    if not os.path.exists(TRANSLATIONS_JS):
        print("Translations file not found.")
        return
        
    with open(TRANSLATIONS_JS, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    modified = content
    replaced = False
    for old, new in replacements:
        if old in modified:
            modified = modified.replace(old, new)
            replaced = True
            
    if replaced:
        with open(TRANSLATIONS_JS, 'w', encoding='utf-8') as f:
            f.write(modified)
        print("Successfully updated email keys in translations.js.")
    else:
        print("No replacements matched in translations.js.")

if __name__ == "__main__":
    main()
