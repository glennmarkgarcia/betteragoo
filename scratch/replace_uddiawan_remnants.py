# -*- coding: utf-8 -*-
import os

BASE_DIR = r"C:\github\betteragoo"

replacements = [
    ("Uddiawan Elementary School", "Ambitacay Elementary School"),
    ("Uddiawan National High School", "Ambitacay National High School"),
    ("Uddiawan Pambansa Mataas School", "Ambitacay Pambansa Mataas School"),
    ("Uddiawan Nailian Nangato School", "Ambitacay Nailian Nangato School"),
    ("Uddiawan BHS", "Ambitacay BHS"),
    ("Brgy. Uddiawan", "Brgy. Ambitacay"),
    ("Uddiawan Nat'l High School", "Ambitacay Nat'l High School"),
    ("Multi-Purpose Building, Uddiawan", "Multi-Purpose Building, Ambitacay"),
    ("Multi-Purpose Bldg. (Health Facility), Uddiawan", "Multi-Purpose Bldg. (Health Facility), Ambitacay"),
    ("Uddiawan Communal Irrigators Association Inc.", "Ambitacay Communal Irrigators Association Inc."),
    ("La Union State University - Bayombong Campus", "Don Mariano Marcos Memorial State University - South La Union Campus"),
    ("'gov-uddiawan': 'Uddiawan',", "'gov-ambitacay': 'Ambitacay',"),
    ("'stats-uddiawan': 'Uddiawan',", "'stats-ambitacay': 'Ambitacay',"),
    ("health-uddiawan-bhs", "health-ambitacay-bhs"),
    ("edu-uddiawan-elementary-school", "edu-ambitacay-elementary-school"),
    ("edu-uddiawan-national-high-school", "edu-ambitacay-national-high-school"),
    ("gov-uddiawan", "gov-ambitacay"),
    ("stats-uddiawan", "stats-ambitacay"),
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
    print("Starting cleanup of Uddiawan school/health center/DPWH remnants...")
    count = 0
    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in {".git", "node_modules", "dist", ".next"}]
        for file in files:
            if file.endswith(('.html', '.js', '.json', '.ts', '.tsx')):
                file_path = os.path.join(root, file)
                if clean_file(file_path):
                    print(f"Cleaned remnants in: {file_path}")
                    count += 1
    print(f"Cleanup finished. Modified {count} files.")

if __name__ == "__main__":
    main()
