# -*- coding: utf-8 -*-
import os
import re

BASE_DIR = r"C:\github\betteragoo"
TRANSLATIONS_JS = os.path.join(BASE_DIR, "assets", "js", "translations.js")

SOLANO_BARANGAYS = [
    "aggub", "bagahabag", "bangaan", "bangar", "bascaran", "curifang", "dadap",
    "lactawan", "osmena", "poblacion-north", "poblacion-south", "quezon", "quirino",
    "roxas", "runruno", "san-fernando", "san-juan", "sinafal", "tucal", "uddiawan", "wacal"
]

def main():
    if not os.path.exists(TRANSLATIONS_JS):
        print("Translations file not found.")
        return
        
    with open(TRANSLATIONS_JS, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    lines = content.split('\n')
    new_lines = []
    removed_count = 0
    
    # We want to match lines like:
    # 'gov-name': 'Name',
    # 'stats-name': 'Name',
    # where name is in SOLANO_BARANGAYS
    
    solano_set = set(SOLANO_BARANGAYS)
    
    for line in lines:
        matched = False
        # Match standard JS object properties
        # e.g., 'gov-aggub': 'Aggub',
        m = re.search(r"'(gov|stats)-([a-z-]+)'\s*:", line)
        if m:
            prefix = m.group(1)
            name = m.group(2)
            if name in solano_set:
                matched = True
                
        if matched:
            removed_count += 1
        else:
            new_lines.append(line)
            
    if removed_count > 0:
        with open(TRANSLATIONS_JS, 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines))
        print(f"Successfully deleted {removed_count} legacy Solano barangay keys from translations.js.")
    else:
        print("No legacy Solano barangay keys found in translations.js.")

if __name__ == "__main__":
    main()
