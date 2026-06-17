# ECommerce Project — Frontend

This repository contains the Next.js frontend for the ECommerce Project.

## Overview

- Framework: Next.js (app router)
- React: 19
- TypeScript: used across the codebase
- Styling: Tailwind CSS (configured with PostCSS)

Project structure (important folders):

- `app/` — Next.js app router pages and layouts
- `src/components/` — UI components
- `src/context/` — React context providers
- `src/services/` — API clients and helpers
- `public/` — static assets (images, icons)

## Getting started (local)

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

3. Open the app in your browser

Open http://localhost:3000

## Useful npm scripts

- `npm run dev` — start Next.js dev server
- `npm run build` — build for production
- `npm run start` — run the production build
- `npm run lint` — run ESLint

## Tailwind & PostCSS

Configuration files:

- `postcss.config.mjs` — PostCSS plugins
- `tailwind.config.cjs` — Tailwind content paths and plugins (e.g. `tailwind-scrollbar-hide`)

If you add new file locations that use Tailwind classes, add them to `content` in `tailwind.config.cjs`.

## Branching and merging (do not touch `dev`)

- Always branch from `dev` (the active development branch).
- Use descriptive branch names: `feature/`, `fix/`, `chore/`.

Example commands:

```bash
git fetch origin
git checkout dev
git pull origin dev
git checkout -b feature/short-description
# make changes
git add -A
git commit -m "feat: short description"
git push -u origin feature/short-description
```

Open a Merge Request (MR/PR) targeting `dev` via your Git hosting UI (GitHub/GitLab). Include testing notes and screenshots if relevant.

## Common troubleshooting

- Hydration mismatch errors: ensure client-only code (Date.now, Math.random, browser-only APIs) runs inside `useEffect` or in components marked with `"use client"` and that initial server render does not depend on changing values.
- If you add client-only components, mark them with `"use client"` at the top of the file.

## Contributing

1. Create a branch from `dev`.
2. Keep PRs small and focused.
3. Add a clear title and description for reviewers.

