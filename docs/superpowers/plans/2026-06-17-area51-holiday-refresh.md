# Area 51 Holiday Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the static Area 51 Cup event site with updated school-holiday content, a brighter sports-first UI, a player-list placeholder, and Vercel-ready deployment files.

**Architecture:** Replace the current oversized hand-authored tournament page with a leaner single-page static site. Keep the bilingual toggle and date rendering in vanilla JavaScript, drive presentation through a rewritten stylesheet, and validate key content with a small Node smoke test.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node built-in test runner, Vercel static config

## Global Constraints

- Keep the event identity, venue, and Chinese/English language toggle.
- Update dates to June 27, June 28, July 4 9:00 AM, and July 5 9:00 AM.
- Keep the player section on-page as a coming-soon placeholder instead of final groups.
- Target a static Vercel deployment with no framework build step.

---

### Task 1: Add content smoke test for the refreshed event copy

**Files:**
- Create: `package.json`
- Create: `tests/site-content.test.mjs`

**Interfaces:**
- Consumes: existing static files from the repository root
- Produces: `npm test` command that verifies required event strings exist

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('site includes refreshed school holiday schedule', () => {
  assert.match(html, /School Holiday Tournament/);
  assert.match(html, /2026-06-27/);
  assert.match(html, /2026-06-28/);
  assert.match(html, /2026-07-04/);
  assert.match(html, /2026-07-05/);
  assert.match(html, /Player list to be finalised/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL because the current page does not yet contain the new schedule and placeholder copy

- [ ] **Step 3: Add minimal test runner config**

```json
{
  "name": "tennis43",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test"
  }
}
```

- [ ] **Step 4: Run test to verify the suite is active**

Run: `npm test`
Expected: FAIL with one failing content assertion

- [ ] **Step 5: Commit**

```bash
git add package.json tests/site-content.test.mjs
git commit -m "test: add static site content smoke test"
```

### Task 2: Rebuild the page structure and styling for the lighter sports UI

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`

**Interfaces:**
- Consumes: current static site entrypoints and `hero.jpg`
- Produces: a simplified single-page bilingual event site with sections `#hero`, `#schedule`, `#divisions`, `#players`, `#guide`, and `#venue`

- [ ] **Step 1: Rewrite the HTML structure with the new sections**

```html
<section id="players" class="section">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">Players</p>
      <h2><span data-lang="zh">参赛名单即将公布</span><span data-lang="en">Player List Coming Soon</span></h2>
    </div>
    <div class="coming-soon-card">
      <p><span data-lang="zh">最终名单和分组仍在确认中。</span><span data-lang="en">Final player lists and groupings are still being confirmed.</span></p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Rewrite the stylesheet for the light poster-like visual system**

```css
:root {
  --bg: #f7fbf2;
  --surface: #ffffff;
  --ink: #153029;
  --green: #5fbf4a;
  --yellow: #ffd447;
  --orange: #ff8a3d;
}
```

- [ ] **Step 3: Simplify the JavaScript to language toggle, mobile nav, and weekday rendering**

```js
function updateScheduleDates() {
  document.querySelectorAll('[data-date]').forEach((cell) => {
    // map ISO dates to bilingual weekday labels
  });
}
```

- [ ] **Step 4: Run the smoke test**

Run: `npm test`
Expected: PASS with the refreshed copy present

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css script.js
git commit -m "feat: refresh holiday event landing page"
```

### Task 3: Add Vercel deployment config and final verification

**Files:**
- Create: `vercel.json`

**Interfaces:**
- Consumes: root static files
- Produces: Vercel static routing to `index.html`

- [ ] **Step 1: Add static Vercel config**

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- [ ] **Step 2: Run verification commands**

Run: `npm test`
Expected: PASS

Run: `node --check script.js`
Expected: no output, exit code 0

- [ ] **Step 3: Commit**

```bash
git add vercel.json
git commit -m "chore: add vercel static deployment config"
```
