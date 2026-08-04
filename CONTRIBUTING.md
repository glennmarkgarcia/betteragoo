# Contributing to BetterAgoo.org

Thank you for your interest in contributing to BetterAgoo.org! This civic-tech project thrives on community participation. Whether you're a developer, designer, translator, or a concerned citizen of Agoo, your contributions are welcome.

## Choosing a Version

BetterAgoo.org has two versions. Choose based on your preference:

| Version            | Branch             | Best For                                                          |
| ------------------ | ------------------ | ----------------------------------------------------------------- |
| Static HTML        | `main`             | Quick fixes, content updates, contributors new to web development |
| React + TypeScript | `react-typescript` | New features, complex UI, contributors familiar with React        |

Both versions are actively maintained and contributions to either are welcome.

For detailed differences and migration guidance, see [MIGRATION.md](MIGRATION.md).

## Getting Started

### Static HTML Version

#### Prerequisites

- Node.js v16 or higher
- npm v8 or higher
- Python 3 (for local development server)
- Git

#### Setup

```bash
git clone https://github.com/BetterAgoo/betteragoo.git
cd betteragoo
npm install
npm run dev
```

Open http://localhost:8000 in your browser.

### React + TypeScript Version

#### Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- Git

#### Setup

```bash
git clone https://github.com/BetterAgoo/betteragoo.git
cd betteragoo
git checkout react-typescript
cd react-app
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## How to Contribute

### Reporting Bugs

1. Check existing [issues](https://github.com/BetterAgoo/betteragoo/issues) to avoid duplicates
2. Create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and device information
   - Screenshots if applicable

### Suggesting Features

1. Open an issue with the `enhancement` label
2. Describe the feature and its benefit to users
3. Include mockups or examples if possible

### Submitting Code

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make** your changes
4. **Test** on multiple browsers (Chrome, Firefox, Safari, Edge)
5. **Commit** with a descriptive message
   ```bash
   git commit -m "Add: brief description of changes"
   ```
6. **Push** to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open** a Pull Request

### Commit Message Format

```
Type: Brief description

Types:
- Add: New feature or content
- Fix: Bug fix
- Update: Changes to existing feature
- Remove: Removed feature or content
- Docs: Documentation changes
- Style: CSS/formatting changes (no logic change)
- Refactor: Code restructuring
```

## Contribution Areas

| Area               | Description                          |
| ------------------ | ------------------------------------ |
| Bug Fixes          | Fix reported issues                  |
| Features           | Implement new functionality          |
| Content            | Update municipal service information |
| Translations       | Translate to Filipino or Ilocano     |
| Design             | Improve UI/UX and accessibility      |
| Data               | Verify and update statistics         |
| Documentation      | Improve guides and comments          |
| API Integration    | Connect real-time data sources       |
| Data Visualization | Enhance charts and graphs            |

## Code Guidelines

### HTML

- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Validate HTML before submitting

### CSS

- Follow existing naming conventions
- Use CSS custom properties (variables)
- Ensure responsive design
- Test on mobile devices
- Keep the shared header breakpoint aligned across `assets/css/responsive.css`, `assets/css/style.css`, `assets/js/main.js`, and `react-app/src/components/layout/Header.tsx`: collapsed navigation applies through `1399px`, and desktop navigation starts at `1400px`.

### Shared Header

- Treat the `.logo-container` in root `index.html` as the canonical static logo block.
- When its image, wordmark, or tagline changes, synchronize all 51 standard static headers and the React `Header.tsx` counterpart.
- Use site-root asset paths in the canonical block so it works unchanged on nested pages.

### JavaScript

- Keep vanilla JS (no frameworks unless approved)
- Use meaningful variable and function names
- Add comments for complex logic
- Avoid global variables

### Accessibility

- Maintain WCAG 2.1 compliance
- Include alt text for images
- Ensure keyboard navigation works
- Test with screen readers if possible

### Data Accuracy

- Only use data from official government sources
- Include source attribution
- Verify information before submitting
- Do not include unverified or speculative data

### Testing PWA and Popup Changes

Changes to `sw.js`, `assets/js/main.js`, `react-app/src/components/PWAManager.tsx`, the homepage popup, or related styles must run:

```bash
node scripts/test-popup.mjs
```

The regression suite verifies desktop, tablet, and mobile behavior, including a single popup reveal, exactly one initial top-level navigation, focus-safe dismissal, persistent show-once state, and no reappearance after refresh. First-time service-worker control must never reload the open page. A genuine accepted worker replacement must still reload once.

## Pull Request Process

1. Ensure your code follows the style guidelines
2. Update documentation if needed
3. Test thoroughly before submitting
4. Fill out the PR template completely
5. Link related issues
6. Wait for review and address feedback

## Review Criteria

Pull requests are reviewed for:

- Code quality and style consistency
- Functionality and bug-free operation
- Accessibility compliance
- Mobile responsiveness
- Data accuracy (for content changes)
- Security considerations

## Community

- **Discord:** [Join our community](https://discord.com/invite/qeSu7RJkjQ)
- **Facebook:** [@betteragoo.org](https://www.facebook.com/betteragoo.org)
- **LinkedIn:** [Connect with us](https://www.linkedin.com/company/betteragoo)
- **Email:** betteragoo@gmail.com

## Recognition

All contributors are recognized in our repository. Significant contributions may be highlighted on the website.

## Questions?

Feel free to open an issue or reach out on Discord. We're happy to help!

---

Thank you for helping make government information accessible to the people of Agoo.
