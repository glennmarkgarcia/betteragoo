# Release Notes: React + TypeScript Version

> **Maintenance note (August 1, 2026):** The active workspace now uses Next.js 15.5.19, React 18.3.1, and release `1.8.4`. Its PWA manager ignores the first service-worker controller claim, waits for visitor approval before activating updates, and reloads once after an accepted controller replacement. The original `1.0.0-react` notes below remain a historical release record.

**Version:** 1.0.0-react  
**Branch:** react-typescript  
**Date:** January 2026

## Overview

This release introduces a React + TypeScript version of BetterAgoo.org, providing modern tooling and component-based architecture for contributors who prefer this development approach.

## Technology Stack

| Component  | Technology                       |
| ---------- | -------------------------------- |
| Framework  | Next.js 14 (App Router)          |
| Language   | TypeScript                       |
| UI Library | React 18                         |
| Styling    | CSS (shared with static version) |
| Icons      | Bootstrap Icons                  |
| Charts     | Chart.js with react-chartjs-2    |
| State      | React Context API                |

## Features

All features from the static HTML version are available:

- Municipal Services Directory with search functionality
- Government Officials directory
- Budget and Financial Transparency reports
- Legislative documents (Ordinances and Resolutions)
- Municipal Statistics and demographic data
- Real-time weather and currency information
- Multi-language support (English, Filipino, Ilocano)
- WCAG 2.1 accessibility compliance

## New Capabilities

| Feature                | Description                                 |
| ---------------------- | ------------------------------------------- |
| Type Safety            | TypeScript catches errors at compile time   |
| Component Architecture | Reusable components reduce code duplication |
| Server-Side Rendering  | Improved SEO and initial page load          |
| Hot Module Replacement | Faster development iteration                |
| Modern Routing         | File-based routing with Next.js App Router  |

## Installation

```bash
git checkout react-typescript
cd react-app
npm install
npm run dev
```

## Documentation

- [MIGRATION.md](../../MIGRATION.md) - Migration guide for contributors
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Contribution guidelines

## Compatibility

The React version produces the same visual output as the static HTML version. CSS stylesheets are shared between both versions to ensure design consistency.

## Known Differences

| Aspect             | Static HTML | React Version      |
| ------------------ | ----------- | ------------------ |
| URL Extensions     | `.html`     | No extension       |
| Build Required     | No          | Yes                |
| Development Server | Python HTTP | Next.js dev server |
| Default Port       | 8000        | 3000               |

## Feedback

Report issues or provide feedback:

- GitHub Issues with `react` label
- Discord community
- Email: volunteer@betteragoo.org

## Contributors

Thank you to all contributors who helped develop this version.

---

Glenn Mark P. Garcia
BetterAgoo.org
