# -*- coding: utf-8 -*-
import os
import re

BASE_DIR = r"C:\github\betteragoo"
GOV_INDEX_HTML = os.path.join(BASE_DIR, "government", "index.html")

def main():
    if not os.path.exists(GOV_INDEX_HTML):
        print("Government file not found.")
        return
        
    with open(GOV_INDEX_HTML, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    # Replace any string like "(078) 326-XXXX" with "TBA"
    pattern = re.compile(r'\(078\)\s*326-\d{4}')
    modified, count = pattern.subn("TBA", content)
    
    if count > 0:
        with open(GOV_INDEX_HTML, 'w', encoding='utf-8') as f:
            f.write(modified)
        print(f"Successfully replaced {count} Solano (078) phone numbers with TBA in government/index.html.")
    else:
        print("No (078) phone numbers matched in government/index.html.")

if __name__ == "__main__":
    main()
