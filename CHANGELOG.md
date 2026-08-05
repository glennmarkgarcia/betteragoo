# Changelog — BetterAgoo.org

All notable changes to the **BetterAgoo.org** civic-tech portal project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.9.1] - 2026-08-05

### Added
- **Consolidated 4-Parent Mega Menu Architecture (BA-F-0012)**: Rebuilt main header navigation into 4 intent-driven parent categories: *Services*, *Governance & Transparency*, *About Agoo & Data*, and *Contact*.
- **Glassmorphic Mega Menu Overlays**: Added CSS Grid multi-column mega menu panels with glassmorphism backdrop blur (`backdrop-filter: blur(12px)`), sub-link descriptions, and SVG vector icons.
- **Featured Hub Overview Cards**: Injected prominent 1-tap Hub Overview Cards (`Services Overview & Search`, `Government & LGU Overview`, `Statistics & Data Hub`) at the top of Column 1 inside each Mega Menu for instant navigation to parent hub pages.
- **Touch-Screen Laptop & Desktop Support**: Enhanced click and touch event handlers in `assets/js/main.js` and React `Header.tsx` so tapping a parent link on touch displays ($\ge 1400\text{px}$) toggles the Mega Menu overlay instead of navigating away.
- **Bootstrap Icons v1.13.1 Upgrade**: Upgraded icon font library across all 51 static HTML pages, `.htaccess` CSP headers, and React `layout.tsx` from `v1.11.1` to `v1.13.1`.
- **Invisible Hover Bridge**: Added `.mega-menu::before` invisible hover bridge and set `gap: 0` on desktop `.main-nav ul` to eliminate hover flickering between parent links and mega menu overlays.

### Changed
- **eLGU BPLS Migration**: Replaced all legacy Filipizen references across 75 files with official Agoo **eLGU BPLS** online portal links (`https://agoolaunion.gov.ph/`).
- **Redundant Home Link Removal**: Removed the redundant "Home" text link from header navigation across all 51 static pages and React `Header.tsx`, relying on the clickable logo image & site title.

### Removed
- **Abakada Education CTA Cleanup**: Removed `section.abakada-cta-section` from `services/education.html` and cleaned up CSS rules in `style.css`.

---

## [1.9.0] - 2026-08-05

### Added
- Initial 4-Parent Mega Menu specification and icon mapping.

---

## [1.8.8] - 2026-08-05

### Changed
- **Responsive Header Breakpoint**: Extended hamburger navigation and `.hide-on-mobile` through `1399px`, beginning desktop navigation and hover dropdowns at `1400px`.
- **Logo Synchronization**: Synchronized canonical logo block across 51 static HTML pages and React portal.

---

## [1.8.0] - 2026-08-05

### Added
- **Official Citizen's Charter March 2023 Ingestion (BA-F-0011)**: Ingested official 3,569-line Agoo Citizen's Charter Markdown dataset (`out/md-files/lgu-documents/LGU-Agoo-La-Union-Citizen_s-Charter-as-of-March-2023-1.md`).
- **Services Database Expansion**: Expanded `data/services.json` from 63 to 88 entries (+25 new services) with official fees, processing times, requirements, and office classifications.
- **Charter-Backed FAQs**: Added Charter-verified FAQ accordions across `faq/index.html` and service detail subpages (`birth-certificate.html`, `death-certificate.html`, `marriage-certificate.html`, `business-permits-licensing.html`, `tricycle-franchising.html`, `municipal-assessor.html`, `municipal-engineering.html`).
- **FY 2025 BLGF Fiscal Statements (BA-F-0007)**: Ingested official BLGF fiscal statements (₱141.59M Income, ₱332.91M Ending Balance).
- **Infrastructure Investments Data (BA-F-0007)**: Published 14 local municipal projects (₱628M) and 201 national DPWH projects (₱3.52B).

### Removed
- **Personnel Card Site-Wide Cleanup**: Removed legacy Office Personnel grid cards, sidebar cards, and specific staff names across all 22 subpages under `/service-details/*`.
- **DOM Overwrite Cleanup**: Removed `initServiceAccuracyNotice()` DOM innerHTML override in `assets/js/main.js` and updated notice banner to *"Citizen's Charter Verified"*.
