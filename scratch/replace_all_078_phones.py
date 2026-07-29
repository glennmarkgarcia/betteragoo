# -*- coding: utf-8 -*-
import os
import re

BASE_DIR = r"C:\github\betteragoo"

# We want to match:
# 1. (078) 326-XXXX or (078) 805-XXXX or (078) XXX-XXXX
# 2. tel:078326XXXX or tel:078805XXXX or tel:078XXXXXXX
# 3. "078326XXXX" or "078805XXXX"
# We will replace them with "TBA" or "tel:TBA" depending on context.

def clean_file(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    modified = content
    
    # Replace tel links first
    modified = re.sub(r'href="tel:078\d+"', 'href="tel:TBA"', modified)
    modified = re.sub(r'href="tel:\(078\)\s*\d+-\d+"', 'href="tel:TBA"', modified)
    
    # Replace (078) formats
    modified = re.sub(r'\(078\)\s*\d+-\d+', 'TBA', modified)
    modified = re.sub(r'\(078\)\s*\d+', 'TBA', modified)
    
    # Replace raw telephone keys in JSON or JS
    modified = re.sub(r'"telephone":\s*"078\d+"', '"telephone": "TBA"', modified)
    modified = re.sub(r'"telephone":\s*"\(078\)\s*\d+-\d+"', '"telephone": "TBA"', modified)
    
    if modified != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(modified)
        return True
    return False

def main():
    print("Starting full repository cleanup of (078) area code phone numbers...")
    count = 0
    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in {".git", "node_modules", "dist", ".next"}]
        for file in files:
            if file.endswith(('.html', '.js', '.json', '.ts', '.tsx')):
                file_path = os.path.join(root, file)
                if clean_file(file_path):
                    print(f"Cleaned phone numbers in: {file_path}")
                    count += 1
    print(f"Cleanup finished. Modified {count} files.")

if __name__ == "__main__":
    main()
