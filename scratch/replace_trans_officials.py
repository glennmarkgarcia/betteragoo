# -*- coding: utf-8 -*-
import os

BASE_DIR = r"C:\github\betteragoo"
TRANSLATIONS_JS = os.path.join(BASE_DIR, "assets", "js", "translations.js")

replacements = [
    ("'gov-hon-eduardo-d-tiongson': 'Hon. Eduardo D. Tiongson',", "'gov-hon-antonio-p-eslao': 'Hon. Antonio P. Eslao',"),
    ("'gov-hon-philip-a-dacayo': 'Hon. Philip A. Dacayo',", "'gov-hon-frank-o-sibuma': 'Hon. Frank O. Sibuma',"),
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
        print("Successfully updated Mayor and Vice Mayor keys in translations.js.")
    else:
        print("No replacements matched in translations.js.")

if __name__ == "__main__":
    main()
