# -*- coding: utf-8 -*-
import os
import re

BASE_DIR = r"C:\github\betteragoo"

# Regex patterns:
# 1. Match href="mailto:xxxx@agoo.gov.ph"
# 2. Match raw emails like xxxx@agoo.gov.ph

def clean_file(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    modified = content
    
    # 1. Replace href="mailto:xxxx@agoo.gov.ph" with href="mailto:TBA"
    modified = re.sub(r'href="mailto:[a-zA-Z0-9._%+-]+@agoo\.gov\.ph"', 'href="mailto:TBA"', modified)
    
    # 2. Replace raw xxxx@agoo.gov.ph with TBA (excluding when part of other strings)
    # Let's match any email pattern that ends with @agoo.gov.ph
    modified = re.sub(r'[a-zA-Z0-9._%+-]+@agoo\.gov\.ph', 'TBA', modified)
    
    if modified != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(modified)
        return True
    return False

def main():
    print("Starting full repository cleanup of @agoo.gov.ph email addresses...")
    count = 0
    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in {".git", "node_modules", "dist", ".next"}]
        for file in files:
            if file.endswith(('.html', '.js', '.json', '.ts', '.tsx')):
                file_path = os.path.join(root, file)
                if clean_file(file_path):
                    print(f"Cleaned email addresses in: {file_path}")
                    count += 1
    print(f"Cleanup finished. Modified {count} files.")

if __name__ == "__main__":
    main()
