# LGU Synchronization Protocol

**LGU Name:** Municipality of Agoo, La Union
**Last Sync Date:** 2026-08-04

## Roles & Responsibilities

### 1. Developer Team (Code Maintainers)

- **Lead Maintainer:** Glenn Mark P. Garcia (ramonloganjr) - Responsible for merge requests and deployment.
- **Frontend Dev:** [Name] - Responsible for UI/UX and Accessibility updates.

### 2. Data Custodians (Source of Truth)

- **Designation:** Municipal Planning & Development Coordinator (MPDC)
- **Responsibility:** Provides the raw CSV/Excel files for the Citizen's Charter and Annual Budget.
- **Contact Protocol:** Email submission by the 5th of every month.

### 3. Content Approvers (Gatekeepers)

- **Designation:** Information Officer / Mayor's Chief of Staff
- **Responsibility:** Verifies that the data on the staging site matches the official hard copies before production deployment.

---

## Emergency Information Verification

The following hotlines must be verified monthly against official LGU records:

The complete public directory is centralized at `/contact/#emergency-hotlines`. Every standard source header links to that section using the localized, right-aligned **Emergency Hotlines** label; phone numbers must not be duplicated in the header bar.

| Service                      | Primary number | Secondary number                               | Source                                     |
| ---------------------------- | -------------- | ---------------------------------------------- | ------------------------------------------ |
| MDRRMO – Agoo                | 0929 558 7444  | 0995 054 5741                                  | Supplied Agoo Emergency Hotlines reference |
| Agoo RHU–MHO                 | (072) 607-4187 | 0905 235 8713                                  | Supplied Agoo Emergency Hotlines reference |
| BFP – Agoo Station           | 0949 641 0979  | 0917 183 9711                                  | Supplied Agoo Emergency Hotlines reference |
| PNP – Agoo Station           | 0998 598 5153  | 0915 857 4117                                  | Supplied Agoo Emergency Hotlines reference |
| Coast Guard – Agoo           | 0981 746 6184  | 0945 781 6630                                  | Supplied Agoo Emergency Hotlines reference |
| LUMC                         | (072) 607-5541 | (072) 607-5545 / 0928 998 2588 / 0915 187 9557 | Supplied Agoo Emergency Hotlines reference |
| LUELCO                       | 0917 130 4907  | 0917 130 7491                                  | Supplied Agoo Emergency Hotlines reference |
| La Union PDRRMO / Rescue 911 | 0998 561 1519  | 911                                            | Provincial Government of La Union          |

**Last Verified:** July 29, 2026

---

## Shared Footer Synchronization

- **Static source of truth:** The complete site-footer block in `index.html`.
- **Static scope:** 51 footer-bearing HTML files. `offline.html` and `admin/news-editor.html` intentionally do not use the standard footer.
- **React counterpart:** `react-app/src/components/layout/Footer.tsx`, which must remain aligned for React development and exported routes. The current production merge replaces only `services/health.html`; the static `index.html` remains the production homepage source.
- **Current attribution:** One WKNDPRJKT terminal wordmark linked to `https://wkndprjkt.com`; former partner-logo links are no longer part of the footer.
- **Link convention:** Internal footer links and the footer logo use site-root paths so the canonical block can be copied unchanged to nested pages.
- **Last parity check:** August 4, 2026 — 51/51 source footers exact; the 1.8.8 production build contains the canonical links, `betteragoo@gmail.com`, and WKNDPRJKT attribution across all footer-bearing routes.

## Shared Header Synchronization

- **Static source of truth:** The `.logo-container` in root `index.html`.
- **Static scope:** All 51 standard source HTML headers use the same root-relative PNG logo, BetterAgoo.org wordmark, and unofficial community-portal tagline.
- **React counterpart:** `react-app/src/components/layout/Header.tsx` mirrors the canonical logo block for React development and exported routes.
- **Responsive contract:** Hamburger navigation and `.hide-on-mobile` apply through `1399px`; horizontal desktop navigation and hover dropdowns begin at `1400px`. The separate tablet content layout remains at `1024px`.

---

## Data Sync Schedule

### Officials Directory

- **Source:** LGU Agoo Human Resources / Election results
- **Frequency:** After every election cycle, or when appointments change
- **File to update:** `data/officials.json`
- **Approver:** Information Officer

### Service Directory (Citizen's Charter)

- **Source:** Citizen's Charter document from each department head
- **Frequency:** Annually, or when fees/requirements change
- **File to update:** `data/services.json`
- **Approver:** MPDC
- **Current status:** The official Agoo Citizen's Charter was not available from a public official source during the 30 July 2026 review. Release `1.7.0` therefore labels walk-in requirements, fees, processing times, routing, and personnel for confirmation.
- **Verified scope:** 11 Agoo Filipizen routes passed live HTTP validation on 30 July 2026.
- **Validation:** Run `npm run services:validate` and `npm run services:validate:online`.

### Legislative Data (Ordinances & Resolutions)

- **Source:** Sangguniang Bayan records
- **Frequency:** After each Sangguniang Bayan session
- **Files to update:** `data/ordinances.json`, `data/resolutions.json`
- **Approver:** SB Secretary

### Competitive Index

- **Source:** CMCI DTI Portal (cmci.dti.gov.ph)
- **Frequency:** Annually (after CMCI release, typically Q2)
- **File to update:** `data/competitive-index.json`
- **Approver:** Lead Maintainer

### DPWH Infrastructure Projects

- **Source:** Official DPWH Transparency API (`api.transparency.dpwh.gov.ph`)
- **Frequency:** Quarterly or after new project listings
- **File to update:** `data/dpwh-projects.json`
- **Approver:** Lead Maintainer
- **Current snapshot:** July 31, 2026 — all 40 pages retrieved, covering 1,996 unique La Union contracts and 201 verified Agoo matches.
- **Refresh command:** `powershell -ExecutionPolicy Bypass -File scripts/sync-dpwh-projects.ps1`

### Budget & Fiscal Transparency

- **Source:** BLGF portal (blgf.gov.ph), LGU Budget Officer
- **Frequency:** Annually (after budget approval) + quarterly updates
- **Files to update:** Budget section pages, `data/fiscal_transparency.json`
- **Approver:** Municipal Accountant / Budget Officer

### Demographics

- **Source:** Philippine Statistics Authority (PSA)
- **Frequency:** After census releases or official population updates
- **File to update:** `data/demographics.json`
- **Approver:** MPDC

---

## Pre-Deployment Sign-Off Checklist

- [ ] All emergency hotline numbers verified against official records
- [ ] Officials directory matches current elected/appointed officials
- [ ] Service fees and processing times verified with department heads
- [ ] Legislative data reflects latest SB sessions
- [ ] Budget/fiscal data matches official documents
- [ ] `node scripts/test-popup.mjs` passes all 33 popup/PWA checks, including exactly one first-load navigation
- [ ] Lighthouse accessibility audit score >= 90
- [ ] Content reviewed by Information Officer
- [ ] Staging site approved by Content Approver

---

## Change Management Log

| Date       | Change                                                                                                               | Verified By          |
| ---------- | -------------------------------------------------------------------------------------------------------------------- | -------------------- |
| 2026-02-03 | Initial TEAM_SYNC.md created                                                                                         | Glenn Mark P. Garcia |
| 2026-07-30 | BA-F-0006 services baseline: 63 registry entries, 11 live Filipizen routes, and official-charter verification status | Glenn Mark P. Garcia |
| 2026-07-31 | BA-F-0007 official DPWH audit: 40 pages, 1,996 source contracts, and 201 verified Agoo matches                       | Glenn Mark P. Garcia |
| 2026-08-01 | Release 1.8.4: first service-worker claim no longer reloads or recreates the volunteer popup                         | Glenn Mark P. Garcia |
| 2026-08-04 | Release 1.8.5: consolidated header emergency numbers into the Contact-page hotline directory                         | Glenn Mark P. Garcia |
| 2026-08-04 | Release 1.8.6: renamed the header link to Emergency Hotlines and aligned it to the right                             | Glenn Mark P. Garcia |
| 2026-08-04 | Release 1.8.7 / BA-F-0008: refreshed project email, volunteer modal, styling, and official Facebook route            | Glenn Mark P. Garcia |
| 2026-08-04 | Release 1.8.8 / BA-F-0009: extended hamburger navigation through 1399px and synchronized shared logo branding        | Glenn Mark P. Garcia |
