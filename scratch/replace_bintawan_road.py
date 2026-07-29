# -*- coding: utf-8 -*-
import os

BASE_DIR = r"C:\github\betteragoo"

replacements = [
    ("Bintawan Road, Brgy. Quezon", "Consolacion Road, Brgy. Consolacion"),
    ("health-bintawan-road-brgy-quezon", "health-consolacion-road-brgy-consolacion"),
]

def clean_file(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    modified = content
    replaced = False
    for old, new in replacements:
        if old in modified:
            modified = modified.replace(old, new)
            replaced = True
            
    if replaced:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(modified)
        return True
    return False

def main():
    print("Cleaning up Bintawan Road health center address remnants...")
    count = 0
    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in {".git", "node_modules", "dist", ".next"}]
        for file in files:
            if file.endswith(('.html', '.js', '.json', '.ts', '.tsx')):
                file_path = os.path.join(root, file)
                if clean_file(file_path):
                    print(f"Cleaned address in: {file_path}")
                    count += 1
    print(f"Cleanup finished. Modified {count} files.")

if __name__ == "__main__":
    main()
