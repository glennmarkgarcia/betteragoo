# -*- coding: utf-8 -*-
import os

BASE_DIR = r"C:\github\betteragoo"
TRANSLATIONS_JS = os.path.join(BASE_DIR, "assets", "js", "translations.js")

required_entries = [
    "'gov-hon-antonio-p-eslao': 'Hon. Antonio P. Eslao',",
    "'gov-hon-frank-o-sibuma': 'Hon. Frank O. Sibuma',",
    "'home-hon-antonio-p-eslao': 'Hon. Antonio P. Eslao',",
    "'home-hon-frank-o-sibuma': 'Hon. Frank O. Sibuma',",
    "'officials-hon-antonio-p-eslao': 'Hon. Antonio P. Eslao',",
    "'officials-hon-frank-o-sibuma': 'Hon. Frank O. Sibuma',",
]

def main():
    if not os.path.exists(TRANSLATIONS_JS):
        print("Translations file not found.")
        return
        
    with open(TRANSLATIONS_JS, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    missing = [entry for entry in required_entries if content.count(entry) != 3]
    if missing:
        print("Official translation entries are missing or not synchronized.")
        for entry in missing:
            print(entry)
        raise SystemExit(1)

    print("Mayor and Vice Mayor translation entries are synchronized.")

if __name__ == "__main__":
    main()
