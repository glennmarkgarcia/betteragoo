# BetterAgoo.org

A civic-tech initiative providing transparent access to municipal services, programs, and public funds of LGU Agoo, La Union, Philippines.

![Version](https://img.shields.io/badge/version-1.8.4-green)
![License](https://img.shields.io/badge/license-MIT%20%7C%20CC%20BY%204.0-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

## Version Notice

A **React + TypeScript** version of BetterAgoo.org is now available for contributors who prefer modern tooling and component-based architecture.

| Version            | Branch             | Status             | Documentation                |
| ------------------ | ------------------ | ------------------ | ---------------------------- |
| Static HTML        | `main`             | Stable             | This README                  |
| React + TypeScript | `react-typescript` | Active Development | [MIGRATION.md](MIGRATION.md) |

Both versions are actively maintained. New contributors may choose either version based on their preference. For migration guidance, see [MIGRATION.md](MIGRATION.md).

## Open Source for LGUs

This repository is open source under the **MIT License** and **CC BY 4.0** and is freely available for use, modification, redistribution, and publication by any individual or organization that wishes to implement it in their respective local government unit (LGU) across the Philippines.

We encourage adoption by other municipalities in support of:

- **Transparency** - Making government information accessible to citizens
- **Accessibility** - Ensuring services are available to all, including persons with disabilities
- **Modernization** - Bringing local government services to digital platforms
- **Public Service** - Improving the delivery of government services to the community

To adapt this project for your LGU, fork the repository and customize the content, styling, and data sources to match your municipality's requirements.

## About

BetterAgoo.org is a volunteer-driven, open-source project that empowers the people of Agoo with easy access to local government information. The platform aggregates public data from official government portals and presents it in a user-friendly, accessible format.

**Cost to the People of Agoo = ₱0**

## Live Demo

Visit the live website: [https://betteragoo.org](https://betteragoo.org)

## Technology Stack

| Category            | Technologies                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Frontend**        | HTML5, CSS3, JavaScript (ES6+)                                                                                |
| **Styling**         | Custom CSS, CSS Variables, Flexbox, CSS Grid, Responsive Design                                               |
| **Icons**           | Bootstrap Icons (CDN)                                                                                         |
| **Fonts**           | Google Fonts (Inter)                                                                                          |
| **Maps**            | Leaflet.js, OpenStreetMap                                                                                     |
| **Charts**          | Chart.js (Canvas-based)                                                                                       |
| **Animations**      | Lottie (dotlottie-player web component)                                                                       |
| **Data Format**     | JSON                                                                                                          |
| **APIs**            | Open-Meteo (Weather), ExchangeRate API (Currency)                                                             |
| **Build Tools**     | Node.js, npm, Bash, Babel (@babel/preset-env)                                                                 |
| **Minification**    | html-minifier-terser, clean-css-cli, terser                                                                   |
| **Code Formatting** | Prettier (explicit local and CI formatting checks)                                                            |
| **Version Control** | Git, GitHub                                                                                                   |
| **Server**          | Apache (.htaccess), mod_rewrite, mod_deflate                                                                  |
| **Hosting**         | cPanel (Production), Python HTTP Server (Development)                                                         |
| **PWA**             | Service Worker (versioned caching, install prompt, user-approved updates), Web App Manifest, offline fallback |
| **SEO**             | Open Graph, Twitter Cards, XML Sitemap, robots.txt                                                            |
| **Security**        | HTTPS, CSP Headers, HSTS, X-Frame-Options                                                                     |
| **Analytics**       | Google Analytics (gtag.js)                                                                                    |
| **Accessibility**   | WCAG 2.1, ARIA, Semantic HTML                                                                                 |
| **Performance**     | GZIP Compression, Browser Caching, Asset Minification                                                         |

## Key Features

| Feature                          | Description                                                                                                                                                                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Municipal Services Directory** | Comprehensive guide to all LGU services with requirements, fees, and processing times                                                                                                                                        |
| **Government Officials**         | Directory of elected officials and department heads with contact information                                                                                                                                                 |
| **Budget Transparency**          | Financial reports, income/expenditure breakdowns, and infrastructure projects                                                                                                                                                |
| **Legislative Documents**        | Searchable database of ordinances and resolutions from Sangguniang Bayan                                                                                                                                                     |
| **Municipal Statistics**         | Demographics, economic data, and competitive index rankings                                                                                                                                                                  |
| **Appointment Services**         | Online appointment scheduling integration with the Mayor's Office (OASYS), featuring branded Lottie animation                                                                                                                |
| **Agoo Quiz**                    | Interactive quiz about Agoo history and culture, linked from homepage CTA and footer across all pages                                                                                                                        |
| **Real-time Information**        | Live weather updates, currency exchange rates, and Philippine time                                                                                                                                                           |
| **Emergency Hotline Marquee**    | Clickable scrolling marquee for emergency contacts on tablet and mobile viewports, with pause-on-hover/focus accessibility                                                                                                   |
| **Progressive Web App**          | Installable PWA with an install prompt, versioned static/runtime caching, offline emergency fallback, and user-approved worker updates that reload once after controller replacement without reloading on first installation |
| **Release Version Management**   | Semantic release version sourced from `version.json`, explicitly bumped for releases, and synchronized across all HTML files, package metadata, and the React app                                                            |
| **Multi-language Support**       | Full i18n coverage in English, Filipino, and Ilocano (5,545 keys per language with perfect parity)                                                                                                                           |
| **Clean URLs**                   | SEO-friendly URLs without `.html` extensions, powered by Apache mod_rewrite                                                                                                                                                  |
| **Brief History of Agoo**        | Interactive timeline from the pre-colonial era to the present, with fully translated cards in English, Filipino, and Ilocano                                                                                                 |
| **Mobile Navigation**            | Responsive menu with GPU-accelerated open/close transitions, body scroll lock, animation guard against rapid toggles, debounced resize handling, touch-safe hover scoping, click-outside-to-close, and focus trap            |
| **Accessibility**                | WCAG 2.1 compliant with skip links, ARIA labels, keyboard navigation, and semantic HTML                                                                                                                                      |
| **SEO Optimized**                | Meta tags, Open Graph, Twitter Cards, structured data, and XML sitemap                                                                                                                                                       |
| **Performance**                  | 90%+ size reduction through minification, GZIP compression, Babel transpilation, and browser caching                                                                                                                         |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/BetterAgoo/betteragoo.git

# Navigate to project directory
cd betteragoo

# Install dependencies
npm install

# Start development server (with clean URL support)
py serve.py --port 8000 --directory .

# Open in browser
# http://localhost:8000
```

## Installation

### Prerequisites

| Requirement | Version | Purpose                            |
| ----------- | ------- | ---------------------------------- |
| Node.js     | v16+    | Build tools and package management |
| npm         | v8+     | Dependency management              |
| Python 3    | v3.x    | Local development server           |
| Git         | Latest  | Version control                    |

### Setup Steps

1. **Clone the repository**

```bash
git clone https://github.com/BetterAgoo/betteragoo.git
cd betteragoo
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open in browser**
   - Development: http://localhost:8000
   - Production preview: http://localhost:8080 (after build)

## Usage

### Development Commands

| Command                  | Description                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| `npm run dev`            | Start local development server (port 8000)                        |
| `npm run build`          | Build minified production files to `dist/` at the current version |
| `npm run build -- patch` | Explicitly bump the patch version, then build                     |
| `npm run build:minor`    | Explicitly bump the minor version, then build                     |
| `npm run build:major`    | Explicitly bump the major version, then build                     |
| `npm run serve:dist`     | Serve production build (port 8080)                                |
| `npm run version:check`  | Display current version                                           |
| `npm run version:patch`  | Bump patch version only                                           |
| `npm run version:minor`  | Bump minor version only                                           |
| `npm run version:major`  | Bump major version only                                           |
| `npm run format`         | Format all files with Prettier                                    |
| `npm run format:check`   | Check formatting without writing changes                          |

### Production Deployment

1. **Build production files**

```bash
npm run build
```

2. **Output location**
   - Minified files are generated in the `dist/` folder
   - Original size: ~17MB → Minified: ~3.9MB

3. **Deploy to server**
   - Upload contents of `dist/` to your web server's `public_html` directory
   - Ensure `.htaccess` is included for clean URLs, CSP headers, and security

### File Permissions (cPanel)

| Type        | Permission | Numeric |
| ----------- | ---------- | ------- |
| Files       | rw-r--r--  | 644     |
| Directories | rwxr-xr-x  | 755     |

## Multi-language Support (i18n)

The site supports three languages with full translation coverage:

| Language | Code  | Status                |
| -------- | ----- | --------------------- |
| English  | `en`  | Complete (5,545 keys) |
| Filipino | `fil` | Complete (5,545 keys) |
| Ilocano  | `ilo` | Complete (5,545 keys) |

The static site uses a `TranslationEngine` in `assets/js/translations.js` with `data-i18n` attributes on HTML elements. The React version uses a `LanguageContext` provider with a `t()` function. Both systems support fallback to English for any missing keys.

## Three-Version Architecture

The project maintains three synchronized versions:

| Version                | Location        | Purpose                                                  |
| ---------------------- | --------------- | -------------------------------------------------------- |
| **Static Legacy**      | Root HTML files | Canonical source for static routes                       |
| **React + TypeScript** | `react-app/`    | Component-based reference plus production health route   |
| **Production Dist**    | `dist/`         | Minified static site with the React health export merged |

Shared CSS, images, animations, and translations are kept aligned between the static and React workspaces. The build script (`build.sh`) generates `dist/` from the static source and then replaces only `services/health.html` with the React export; the static homepage remains canonical in production.

## Project Structure

```
betteragoo/
├── assets/
│   ├── css/              # Stylesheets (9 files)
│   ├── js/               # JavaScript modules (18 files)
│   ├── images/           # Images, icons, banners, and site graphics
│   └── animation/        # Lottie JSON animation files
├── data/                 # JSON data files
│   ├── officials.json    # Government officials data
│   ├── services.json     # Municipal services data
│   ├── news.json         # News and announcements
│   ├── ordinances.json   # Legislative ordinances
│   └── resolutions.json  # Legislative resolutions
├── react-app/            # React + TypeScript version
│   ├── src/
│   │   ├── app/          # Next.js app router (layout, page)
│   │   ├── components/   # React components (Header, Footer, HotlineBar, InfoBar, SearchAutocomplete, PWAManager)
│   │   └── contexts/     # LanguageContext (i18n provider)
│   └── public/           # Static assets, manifest, version.json (synced with root)
├── services/             # Service category pages (11 pages)
├── service-details/      # Individual service pages (22 pages)
├── government/           # Government directory pages
├── legislative/          # Legislative framework pages
├── budget/               # Budget transparency page
├── statistics/           # Municipal statistics page
├── news/                 # News and announcements page
├── contact/              # Contact information page
├── faq/                  # Frequently asked questions
├── sitemap/              # HTML sitemap page
├── scripts/              # Build, version, and translation scripts
│   └── bump-version.js   # Cross-platform Node.js version bump script
├── dist/                 # Production build output (gitignored)
├── index.html            # Homepage
├── sw.js                 # Service worker (versioned caching, offline support)
├── manifest.webmanifest  # PWA web app manifest
├── offline.html          # Offline fallback page with emergency hotlines
├── serve.py              # Local dev server with clean URL rewriting
├── .htaccess             # Apache configuration (CSP, rewrites, caching)
├── .prettierrc           # Prettier code formatting configuration
├── .prettierignore       # Prettier ignore patterns
├── version.json          # Source of truth for explicit semantic releases
├── build.sh              # Build automation script
├── babel.config.json     # Babel transpilation configuration
├── package.json          # Node.js configuration
└── README.md             # Project documentation
```

## Recent Changes

### v1.8.4: First-Load Popup Stability

- Prevented first-time service-worker activation from reloading the homepage and recreating the volunteer popup
- Changed service-worker updates to remain waiting until the visitor accepts the update banner
- Applied the same controller-change guard to the static and React PWA implementations
- Extended popup regression tests to detect unexpected full-page navigation on desktop, tablet, and mobile

### v1.8.3: BA-F-0007 Official DPWH Completion

- Retrieved all 40 pages and all 1,996 unique La Union contracts directly from the official DPWH Transparency API
- Published 201 verified whole-word Agoo matches covering 2016–2026, including nine contracts absent from the previous public-mirror snapshot
- Refreshed twelve existing contracts from current official fields and recorded 176 completed, 7 ongoing, 17 for-procurement, and 1 not-yet-started project
- Added a reproducible paginated DPWH synchronization script and marked BA-F-0007 completed

### v1.8.2: Official LGU Website Correction

- Replaced the invalid legacy LGU website host across source pages, documentation, metadata, and downloadable-form links with `agoolaunion.gov.ph`
- Updated legislative links to use the official LGU department-and-offices directory
- Corrected the sitemap so the official LGU homepage and Sangguniang Bayan resource resolve to their appropriate official pages

### v1.8.1: BA-F-0001/0002 Corrective Audit

- Corrected the remaining Better Solano configuration references and the homepage map bounding box
- Removed the contaminated resolution register and added a visible official-source verification notice
- Removed obsolete Magat River, Bagahabag, Bangar, Dadap, and other inherited directory translations
- Removed the unverified Solano-era school directory and school counts pending an official Agoo DepEd/LGU source
- Added structured Agoo coordinates and calculated population density to the demographic dataset
- Removed the inherited Solano CMCI score series from the data, statistics page, and chart JavaScript
- Published only verified 2024 Agoo regional CMCI standings: 1st overall, 1st in Infrastructure, and 3rd in Economic Dynamism among Region I's 1st–2nd class municipalities
- Corrected BA-F-0002's 2015–2020 annual population growth rate requirement to the reconciled 0.76%

### v1.8.0: Phase 6 Fiscal Transparency & Infrastructure Baseline

- Replaced the sample Q1/Q2 comparison with Agoo's BLGF first reporting period for FY 2025 and clearly identified it as Q1 without presenting unsupported Q2 data
- Published the full income, expenditure, social-services, and fund-movement breakdown in `data/fiscal_transparency.json`
- Replaced all three sample infrastructure cards with 14 supplied Agoo flood-control, shore-protection, and slope-protection records from Sumbong sa Pangulo
- Added exact project and contract IDs, coordinates, approved budgets, contract costs, dates, and contractors to `data/infrastructure-investments.json`
- Replaced the stale 63-row national-project dataset with 192 unique Agoo contracts from a January 22, 2026 public snapshot of the DPWH Transparency API
- Added visible source, snapshot, retrieval, rounding, and API-availability notes to the budget page
- At the `1.8.0` baseline, the official DPWH API was blocked by a Cloudflare challenge, so the direct audit was deferred and later completed in `1.8.3`

### v1.7.0: Phase 5 Public Services Baseline

- Versioned the municipal services registry and expanded it from 57 to 63 searchable entries
- Verified 11 live Agoo Filipizen routes for business, taxation, payment orders, market rental, water, construction requirements, and terminal passes
- Added the verified online routes to the business, taxation, and infrastructure service pages
- Replaced Solano-specific SEEDO public-market and slaughterhouse branding and routes with Agoo service-administration labels
- Removed the incorrect Solano barangay-health-station list and unverified health-facility counts from the static and React health pages
- Added verified Agoo RHU–MHO contact routing to the health directory
- Added visible service-accuracy notices and changed unverified local fee/time values to “Confirm with office”
- Added automated schema, link, legacy-term, search-query, and live Filipizen route validation
- Corrected all stale `bettersolano.org` URLs in `sitemap.xml` and refreshed its modification dates
- Recorded BA-F-0006 as partially completed: an official Agoo Citizen's Charter is still required to certify all walk-in requirements, fees, processing times, and personnel

### v1.6.0: Phase 4 Content Migration: Emergency & Contacts

- Added a canonical Agoo emergency-hotline dataset covering MDRRMO, RHU–MHO, BFP, PNP, Coast Guard, LUMC, LUELCO, and La Union Rescue 911
- Synchronized eight primary contacts across all 51 static hotline bars and the React header
- Rebuilt the contact and public-safety directories so every supplied number is independently callable
- Expanded the offline fallback to retain the complete emergency directory without network access
- Corrected the municipal contact email and added the Agoo Municipal Hall address on Cases Boulevard
- Reworked the tablet/mobile marquee into two equal groups for seamless looping without clipping
- Added matching English, Filipino, and Ilocano emergency-directory translations
- Established the root `index.html` footer as the canonical static footer and synchronized it exactly across all 51 footer-bearing HTML pages
- Replaced the former partner-logo group with the WKNDPRJKT terminal wordmark linked to `https://wkndprjkt.com`
- Normalized internal footer links to site-root paths so the same footer works from nested routes
- Synchronized the React `Footer.tsx` links and wordmark with the canonical footer to prevent the production build from reintroducing divergent content

### v1.5.0: Phase 3 Content Migration: History & Timeline

- Rebuilt the homepage timeline with verified milestones from Agoo's pre-colonial trading era through the present
- Added the 1578 founding by Franciscan friars and the 1582 Augustinian administration
- Added Agoo's incorporation into the newly created province of La Union in 1850
- Corrected the Basilica Minore elevation date to 15 July 1982
- Added synchronized English, Filipino, and Ilocano history translations to the static and React implementations
- Added responsive timeline navigation with a sticky-header-aware `#brief-history` anchor
- Removed duplicated markup, obsolete Solano timeline entries, and unused historical translation keys
- Completed the barangay portion of BA-F-0003 by correcting all 49 names and replacing fabricated population values with the supplied 2020/2015 census dataset (66,028 total population in 2020); elected-official profiles remain pending
- Verified the production build across desktop, tablet, and mobile viewports

### v1.1.15: Header, PWA, Version Automation & Code Quality

#### PWA Install Prompt & Update Lifecycle

- Added "Install App" prompt banner using the `beforeinstallprompt` API with Install/Dismiss buttons, respecting standalone mode and session dismissal
- Added a waiting-worker update flow: the visitor accepts the update banner, the client sends `SKIP_WAITING`, and `controllerchange` reloads the page once
- First-time service-worker control is explicitly excluded from auto-reload as of `1.8.4`, preventing initial UI such as the volunteer popup from being recreated
- Install banner goes full-width (no border-radius, no margins) on mobile viewports (<=575px) with slide-up animation
- Created `PWAManager.tsx` React component handling both install prompt and SW update lifecycle
- Added `.pwa-install-banner` CSS styles to both static and React versions

#### Footer Mobile Alignment

- Added `text-align: center` for `.footer-tagline` in the <=575px mobile breakpoint, overriding the tablet `text-align: left` rule
- Synced footer CSS fix to React version

#### CI/CD Cleanup

- Removed CodeQL Advanced workflow (`.github/workflows/codeql.yml`) as it is no longer required

#### Responsive Header & Hotline Marquee

- Standardized header vertical spacing (padding, min-height, logo size) across desktop (12px/48px), tablet (10px/40px), mobile (8px/36px), and small mobile (6px/32px) breakpoints
- Raised tablet breakpoint from 991px to 1024px to properly capture iPad Pro portrait (1024px) and iPad Air landscape
- Converted emergency hotline bar into a clickable scrolling marquee on all tablet and mobile viewports (≤1024px) with pause-on-hover/focus for accessibility
- Centered hamburger menu icon between logo and language toggle on tablet viewports using flexbox ordering (logo → hamburger → lang toggle)
- Tablet footer: left-aligned BetterAgoo logo, tagline, and social icons to match the visual hierarchy of the brand column

#### Progressive Web App (PWA)

- Rewrote `sw.js` with dual-cache architecture: `STATIC_CACHE` (precached app shell) and `RUNTIME_CACHE` (dynamic content, 80-item FIFO, 7-day TTL)
- Navigation uses network-first with offline fallback; static assets use stale-while-revalidate; data/API uses network-first with cache fallback
- Added push notification and background sync foundations
- Enhanced SW registration with 30-minute update polling and a non-intrusive approval banner for waiting versions
- Upgraded `manifest.webmanifest` with maskable icons, app shortcuts (Services, Contact, Government, Transparency), and `orientation: any`
- Added iOS PWA meta tags (`apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`)
- Fixed theme-color from old green (#1a5f2a) to brand blue (#0032a0) across all files
- Updated offline fallback page colors to match brand

#### Version Management Foundation

- Created cross-platform `scripts/bump-version.js` (Node.js) replacing the bash-only `version.sh` for Windows compatibility
- Version bump updates `version.json`, `package.json`, all 51+ HTML files, and syncs to `react-app/public/version.json`
- Version bumps are explicit release actions; ordinary builds preserve the current version
- Footer version displayed dynamically at runtime via `version.js` fetching from `version.json`

#### React App Sync

- Created `HotlineBar.tsx` component with tablet/mobile marquee matching static site behavior
- Created `InfoBar.tsx` component with live exchange rates, weather, and Philippine time
- Created `SearchAutocomplete.tsx` component with service search dropdown
- Created `PWAManager.tsx` component handling the install prompt and user-approved SW updates
- Updated `Footer.tsx` to dynamically fetch version from `/version.json` instead of hardcoded value
- Updated `Header.tsx` breakpoint from 991px to 1024px, fixed ARIA attribute string values
- Updated `layout.tsx` with corrected theme-color, manifest link, Apple PWA meta tags, and PWAManager integration
- Synced `manifest.webmanifest`, `version.json`, `sw.js`, and all CSS to react-app

#### Code Quality & Tooling

- Installed Prettier as dev dependency with project-wide configuration (`.prettierrc`, `.prettierignore`)
- Formatted entire codebase (120+ files) for consistent code style
- Added project-wide Prettier commands for consistent local and CI formatting
- Fixed `privacy/index.html` malformed HTML (duplicate `</body></html>` closing tags)
- Resolved all npm vulnerabilities: upgraded `@lhci/cli` to ^0.15.1, added `tmp` override to 0.2.5 (0 vulnerabilities)
- Added `npm run format` and `npm run format:check` scripts

### Previous Changes

### Content & Features

- Added Agoo Quiz CTA section on homepage with branded Lottie animation (brand blue `#0032A0`)
- Added Agoo Quiz link to footer Quick Links across all 51 HTML pages and React Footer
- Added Brief History of Agoo interactive timeline section on the homepage, covering the pre-colonial era through the present
- Added quiz entry to HTML sitemap page
- Added Abakada education tools CTA on services/education page with local SVG logo

### Internationalization (i18n)

- Upgraded translation engine; the current dictionaries contain 5,545 keys per language with perfect en/fil/ilo parity
- Fixed Brief History timeline cards: full paragraph translations now applied via `data-i18n` on `<p>` elements (previously only proper nouns inside `<strong>` tags were translated, leaving surrounding English text intact)
- Corrected Filipino translations: proper religious title "Padre" (not "Ama"), fully translated historical paragraphs (no half-English)
- Corrected Ilocano translations: proper Ilocano vocabulary ("Ababa a Pakasaritaan" not Filipino "Maikling Kasaysayan", "Dimteng" not "Dumating", "Ili" not "Lungsod"), fully translated paragraphs
- Added 54 translation keys for Agoo Quiz footer link across all page contexts

### Footer & Copyright

- Standardized copyright across all 51 HTML files and React Footer: three styled spans (`footer-copyright-text`, `footer-copyright-license`, `footer-copyright-disclaimer`)
- Updated copyright year to 2026, name to "BetterAgoo.org"
- Footer copyright uses `flex-wrap: wrap; gap: 6px` layout with version badge right-aligned via `margin-left: auto`
- Removed trailing period after "BetterAgoo.org" from all pages and all 3 translation languages

### Clean URLs

- Removed `.html` extensions from 621 navigation links across 48 HTML files
- Apache `.htaccess` rewrite rules handle clean URL resolution on cPanel

### Build & Deployment

- Updated `build.sh` rsync excludes to filter out dev artifacts (`.backup`, `.md`, `package*.json`, `scripts/`, `docs/`, etc.)
- Production dist: 52 HTML pages, 106 total files, 3.9MB, zero dev artifacts
- Updated CSP headers: added `worker-src 'self' blob:`, `blob:` to `connect-src`, CDN domains to `connect-src` for dotlottie-player and Bootstrap Icons compatibility

### Cross-Version Sync

- All CSS files synced between legacy and React: `footer.css`, `style.css`, `responsive.css`, `accessibility.css`
- All image and animation assets synced between legacy and React
- React LanguageContext updated with matching translation keys for homepage sections

## Contributing

We welcome contributions from everyone! Whether you're a developer, designer, data researcher, content writer, translator, or a concerned citizen of Agoo, your participation helps shape this project for all.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make** your changes
4. **Test** thoroughly on multiple browsers
5. **Commit** with a descriptive message
   ```bash
   git commit -m "Add: description of your changes"
   ```
6. **Push** to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open** a Pull Request with detailed description

### Contribution Areas

| Area                   | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| **Bug Fixes**          | Report issues or submit fixes for existing bugs               |
| **Features**           | Propose or implement new functionality                        |
| **Content**            | Update service information, add missing municipal data        |
| **Translations**       | Help translate content to Filipino or Ilocano                 |
| **Design**             | Improve UI/UX, accessibility, and visual consistency          |
| **Data**               | Verify and update municipal statistics and records            |
| **Documentation**      | Enhance README, code comments, and guides                     |
| **API Integration**    | Propose or implement API connections for real-time data feeds |
| **Data Visualization** | Enhance charts, graphs, and interactive presentations         |

### Code Style Guidelines

| Guideline         | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| **Formatting**    | Prettier auto-formats on commit; run `npm run format` to format manually |
| **HTML**          | Use semantic HTML5 elements; validate before committing                  |
| **CSS**           | Follow BEM naming conventions; use CSS custom properties                 |
| **JavaScript**    | Keep vanilla JS unless proposing framework for data visualization        |
| **Naming**        | Use meaningful, descriptive variable and function names                  |
| **Comments**      | Add comments for complex logic and non-obvious implementations           |
| **Accessibility** | Ensure WCAG 2.1 compliance (alt text, ARIA, keyboard navigation)         |
| **Performance**   | Optimize images; minimize DOM manipulation                               |
| **Testing**       | Test on Chrome, Firefox, Safari, Edge; test mobile responsiveness        |
| **Validation**    | Validate HTML/CSS before pull requests                                   |

## Data Sources

All public information is sourced from official government portals:

| Source                             | URL                                                                       | Data Type                   |
| ---------------------------------- | ------------------------------------------------------------------------- | --------------------------- |
| LGU Agoo Official Website          | [agoolaunion.gov.ph](https://agoolaunion.gov.ph/)                         | Services, Officials         |
| Sangguniang Bayan ng Agoo          | [Departments and Offices](https://agoolaunion.gov.ph/department-offices/) | Official office information |
| Bureau of Local Government Finance | [blgf.gov.ph](https://blgf.gov.ph/)                                       | Budget, Financial Reports   |
| Philippine Statistics Authority    | [psa.gov.ph](https://psa.gov.ph/)                                         | Demographics, Census        |
| DTI CMCI Portal                    | [cmci.dti.gov.ph](https://cmci.dti.gov.ph/)                               | Competitive Index           |

## License

This project is dual-licensed:

| License     | Applies To  | Details                                |
| ----------- | ----------- | -------------------------------------- |
| MIT License | Source Code | Free to use, modify, and distribute    |
| CC BY 4.0   | Content     | Attribution required for content reuse |

See [LICENSE](LICENSE) for full details.

## Contact

| Channel  | Link                                                              |
| -------- | ----------------------------------------------------------------- |
| Website  | [betteragoo.org](https://betteragoo.org)                          |
| Email    | volunteer@betteragoo.org                                          |
| Facebook | [@betteragoo.org](https://www.facebook.com/betteragoo.org)        |
| LinkedIn | [BetterAgoo](https://www.linkedin.com/company/betteragoo/)        |
| Discord  | [Join Community](https://discord.com/invite/qeSu7RJkjQ)           |
| GitHub   | [BetterAgoo/betteragoo](https://github.com/BetterAgoo/betteragoo) |

## Pages NOT YET finalized
/services/certificates
/services/business
/services/tax-payments
/services/social-services
/services/health - hospitals to be checked
/services/agriculture
/services/infrastructure
/services/education
/services/environment
/government/


## Acknowledgments

- [BetterGov.ph](https://bettergov.ph) for the civic-tech initiative in the Philippines
- LGU Agoo for public data availability and transparency
- All volunteers and contributors who dedicate their time
- Open-source community for the tools and libraries used
- Citizens of Agoo for their feedback and support

---

Made for the people of Agoo, La Union

## Developer

Hi, I’m [Glenn Mark P. Garcia](https://wkndprjkt.com), the Tech Lead and Co-Founder of WKNDPRJKT. I lead the technical direction of our projects and help turn business ideas into scalable, reliable digital products. My focus is on building effective solutions, guiding development teams, and ensuring that technology supports real business goals.
