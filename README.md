# Area 51 Cup Static Sites

This repo now keeps both versions of the event site side by side.

## Project Structure

- `sites/classic`
  The original dark neon tournament site.
- `sites/holiday-2026`
  The refreshed light sports-style school holiday site.
- `tests`
  Smoke checks to make sure both site variants exist.

## Local Check

Run the content smoke test:

```bash
npm test
```

## Deploy To Vercel

Each site folder is a plain static site. No build command is required.

### Vercel settings

- Framework preset: `Other`
- Build command: leave empty
- Output directory: leave empty
- Install command: leave empty

### Deploy flow

1. Push the repo to GitHub.
2. In Vercel, click `Add New...` -> `Project`.
3. Import the GitHub repository.
4. Set the `Root Directory` to either:
   - `sites/classic`
   - `sites/holiday-2026`
5. Confirm the settings above and click `Deploy`.
6. Repeat with the other folder if you want both live as separate Vercel projects.

## Key Files

- `sites/classic/index.html`
- `sites/classic/styles.css`
- `sites/classic/script.js`
- `sites/holiday-2026/index.html`
- `sites/holiday-2026/styles.css`
- `sites/holiday-2026/script.js`
