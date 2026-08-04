# Migration Guide: Static HTML to React + TypeScript

This document provides guidance for contributors migrating from the static HTML version to the React + TypeScript version of BetterAgoo.org.

## Overview

BetterAgoo.org now has two versions:

| Version            | Branch             | Status             | Technology                       |
| ------------------ | ------------------ | ------------------ | -------------------------------- |
| Static HTML        | `main`             | Stable (Legacy)    | HTML5, CSS3, Vanilla JavaScript  |
| React + TypeScript | `react-typescript` | Active Development | Next.js 15, React 18, TypeScript |

## Version Comparison

### Static HTML Version

**Location:** Root directory (`/`)

**Characteristics:**

- Pure HTML5 with semantic markup
- Vanilla CSS with custom properties
- Vanilla JavaScript (ES6+)
- No build step required for development
- Direct file serving

**Best for:**

- Simple content updates
- Quick fixes
- Contributors unfamiliar with React

### React + TypeScript Version

**Location:** `/react-app/` directory

**Characteristics:**

- Next.js 15 with App Router
- TypeScript for type safety
- React 18 with Server Components
- Component-based architecture
- Built-in routing and SSR

**Best for:**

- New feature development
- Complex UI interactions
- Long-term maintenance
- Scalable architecture

## Getting Started with React Version

### Prerequisites

| Requirement | Version       |
| ----------- | ------------- |
| Node.js     | v18 or higher |
| npm         | v9 or higher  |
| Git         | Latest        |

### Setup

```bash
# Clone the repository
git clone https://github.com/glennmarkgarcia/betteragoo.git
cd betteragoo

# Switch to React branch
git checkout react-typescript

# Navigate to React app
cd react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser.

## Directory Structure Comparison

### Static HTML

```
betteragoo/
├── index.html
├── services/
├── government/
├── budget/
├── assets/
│   ├── css/
│   └── js/
└── data/
```

### React + TypeScript

```
betteragoo/
├── react-app/
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   ├── components/    # Reusable React components
│   │   ├── contexts/      # React Context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript type definitions
│   │   └── data/          # Static data and translations
│   ├── public/
│   │   └── assets/        # Static assets (images, CSS)
│   └── package.json
└── ... (static HTML files)
```

## Component Mapping

The current workspace contains these React routes:

| Static HTML equivalent | React Component | Location                           | Production merge status                                         |
| ---------------------- | --------------- | ---------------------------------- | --------------------------------------------------------------- |
| `index.html`           | `page.tsx`      | `src/app/page.tsx`                 | Development/export reference; static homepage remains canonical |
| `services/health.html` | `page.tsx`      | `src/app/services/health/page.tsx` | React export replaces this route in `build.sh`                  |

Government, budget, statistics, contact, and the remaining service routes currently use their static implementations. Do not document or configure a React route until its `page.tsx` exists and `build.sh` explicitly merges its export.

## Key Differences

### Routing

**Static HTML:** File-based with `.html` extensions

```
/services/business.html
```

**React:** Next.js App Router (folder-based)

```
/services/business (maps to src/app/services/business/page.tsx)
```

### Styling

Both versions share the same CSS files from `public/assets/css/`. The React version imports these stylesheets in the root layout.

### Shared Header and Responsive Navigation

- Root `index.html` is the source of truth for the static `.logo-container`; all 51 standard static pages use the same root-relative logo image, BetterAgoo.org wordmark, and unofficial community-portal tagline.
- `react-app/src/components/layout/Header.tsx` mirrors that branding for React-generated routes.
- Both implementations use collapsed hamburger navigation at viewport widths up to and including `1399px`; desktop navigation and hover dropdown behavior begin at `1400px`.
- The header breakpoint is independent of the `1024px` tablet content breakpoint so grids and page content do not switch layouts prematurely.

### State Management

**Static HTML:** DOM manipulation with vanilla JavaScript

**React:** React Context API for global state (e.g., `LanguageContext` for translations)

### PWA Update Lifecycle

Both implementations must preserve the same service-worker behavior:

- A first-time worker may claim an uncontrolled page without reloading it.
- Updated workers remain waiting until the visitor accepts the update banner.
- Acceptance sends `SKIP_WAITING`; the subsequent controller replacement reloads exactly once.
- Static behavior lives in `assets/js/main.js`; React parity lives in `react-app/src/components/PWAManager.tsx`.
- Run `node scripts/test-popup.mjs` after changing either implementation so first-load popup stability and navigation count remain covered.

### Data Fetching

**Static HTML:** Inline data or fetch from JSON files

**React:** Server Components with direct data access or client-side hooks

## Contributing to React Version

### Code Style

| Guideline  | Description                                        |
| ---------- | -------------------------------------------------- |
| TypeScript | Use strict typing; avoid `any`                     |
| Components | Functional components with hooks                   |
| Naming     | PascalCase for components, camelCase for functions |
| Files      | One component per file; name matches component     |
| Imports    | Use absolute imports with `@/` prefix              |

### Creating a New Page

1. Create a folder in `src/app/` matching the route
2. Add a `page.tsx` file with the page component
3. Export the component as default
4. Add any client interactivity with `'use client'` directive

Example:

```typescript
// src/app/new-page/page.tsx
export default function NewPage() {
  return (
    <main>
      <h1>New Page</h1>
    </main>
  );
}
```

### Creating a Component

1. Add file to `src/components/`
2. Export as default or named export
3. Include TypeScript interface for props

Example:

```typescript
// src/components/ExampleCard.tsx
interface ExampleCardProps {
  title: string;
  description: string;
}

export default function ExampleCard({ title, description }: ExampleCardProps) {
  return (
    <div className="example-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

## Transition Timeline

| Phase   | Timeframe | Action                                         |
| ------- | --------- | ---------------------------------------------- |
| Phase 1 | Current   | Both versions maintained in parallel           |
| Phase 2 | 3 months  | React version becomes primary for new features |
| Phase 3 | 6 months  | Evaluate community adoption                    |
| Phase 4 | TBD       | Static HTML moved to `legacy` branch           |

## Questions and Support

- Open an issue on GitHub with the `react` label
- Join our Discord community for real-time discussion
- Email: betteragoo@gmail.com

---

Last updated: August 2026
