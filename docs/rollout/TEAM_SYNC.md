# LGU Synchronization Protocol

**LGU Name:** Municipality of Agoo, La Union
**Last Sync Date:** 2026-07-29

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
- **React counterpart:** `react-app/src/components/layout/Footer.tsx`, which must remain aligned because the Next.js export supplies production HTML for the homepage and health route.
- **Current attribution:** One WKNDPRJKT terminal wordmark linked to `https://wkndprjkt.com`; former partner-logo links are no longer part of the footer.
- **Link convention:** Internal footer links and the footer logo use site-root paths so the canonical block can be copied unchanged to nested pages.
- **Last parity check:** July 29, 2026 — 51/51 source footers exact; 51/51 generated footers contained the canonical links.

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

- **Source:** DPWH Regional Office / data.gov.ph
- **Frequency:** Quarterly or after new project listings
- **File to update:** `data/dpwh-projects.json`
- **Approver:** Lead Maintainer

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
- [ ] Lighthouse accessibility audit score >= 90
- [ ] Content reviewed by Information Officer
- [ ] Staging site approved by Content Approver

---

## Change Management Log

| Date       | Change                       | Verified By          |
| ---------- | ---------------------------- | -------------------- |
| 2026-02-03 | Initial TEAM_SYNC.md created | Glenn Mark P. Garcia |
