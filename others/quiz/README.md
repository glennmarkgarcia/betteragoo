# Agoo Civic Quiz & Leaderboard Application (`quiz.betteragoo.org`)

This repository folder (`others/quiz/`) contains the interactive cartoon civic quiz application for `quiz.betteragoo.org`.

---

## 🚀 How to Run Locally

### Option 1: Quick Local Web Server (Instant UI & Quiz Preview)

To instantly preview and play the interactive quiz UI in your browser:

```bash
cd others/quiz
npm run dev
```

Then open your browser to **`http://localhost:8080`**.

> **Note**: In standard local static preview mode, the app uses built-in fallback questions and sample Top 100 leaderboard entries so you can test the onboarding modal, 10-item quiz, timer, educational explanations, and results screen right away!

---

### Option 2: Cloudflare Wrangler Local Emulator (Full Cloudflare D1 + Functions API)

To run the full Cloudflare Pages Functions API and local D1 SQLite database emulator:

1. **Initialize & Seed Local D1 Database**:
   ```bash
   cd others/quiz
   npx wrangler d1 execute DB --local --file=data/schema.sql
   npx wrangler d1 execute DB --local --file=data/questions.sql
   ```

2. **Build Static Bundle**:
   ```bash
   npm run build
   ```

3. **Start Local Wrangler Pages Server**:
   ```bash
   npx wrangler pages dev dist
   ```

4. Open your browser to **`http://localhost:8788`** (or the URL displayed in your terminal).

---

## 📂 Directory Structure

- `src/`: Source code (`index.html`, `privacy.html`, `style.css`, `app.js`)
- `public/assets/`: Cartoon Eagle Mascot image and SVG division badges
- `data/`: `schema.sql` (D1 table schema) and `questions.sql` (100 verified questions seed file)
- `functions/api/`: Cloudflare Pages Functions API handlers (`random.js`, `submit.js`, `leaderboard.js`)
- `dist/`: Build output directory for Cloudflare Pages deployment
