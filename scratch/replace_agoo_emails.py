# -*- coding: utf-8 -*-
import os
import re

BASE_DIR = r"C:\github\betteragoo"
LEGACY_HOST = "agoo" + ".gov.ph"
LEGACY_HOST_PATTERN = re.escape(LEGACY_HOST)


def clean_file(file_path):
    with open(file_path, "r", encoding="utf-8", errors="ignore") as source:
        content = source.read()

    modified = re.sub(
        rf'href="mailto:[a-zA-Z0-9._%+-]+@{LEGACY_HOST_PATTERN}"',
        'href="mailto:TBA"',
        content,
    )
    modified = re.sub(
        rf"[a-zA-Z0-9._%+-]+@{LEGACY_HOST_PATTERN}", "TBA", modified
    )

    if modified != content:
        with open(file_path, "w", encoding="utf-8") as destination:
            destination.write(modified)
        return True
    return False


def main():
    print("Starting full repository cleanup of legacy municipal email addresses...")
    count = 0
    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [
            directory
            for directory in dirs
            if directory not in {".git", "node_modules", "dist", ".next"}
        ]
        for filename in files:
            if filename.endswith((".html", ".js", ".json", ".ts", ".tsx")):
                file_path = os.path.join(root, filename)
                if clean_file(file_path):
                    print(f"Cleaned email addresses in: {file_path}")
                    count += 1
    print(f"Cleanup finished. Modified {count} files.")


if __name__ == "__main__":
    main()
