## Quick instructions for AI coding agents (React + Vite portfolio)

This repository is a client-side React portfolio built with Vite and deployed to GitHub Pages. The goal of this file is to help an AI agent be immediately productive with repository-specific patterns and commands.

Key facts
- App entry: `src/main.jsx` -> renders `src/App.jsx` (Animated routes live in `src/App.jsx`).
- Routing: uses `HashRouter` + `framer-motion` (`AnimatePresence`) for animated page transitions — HashRouter is intentional for gh-pages.
- Blog content: structured data in `src/data/blogs.js` (helpers: `getLatestBlogs`, `getBlogById`) and markdown sources in `public/blogs/*.md`.
- Imports: vite alias `@` -> `src` (configured in `vite.config.js`). Use `@/components/...` for imports.

Developer workflows (package.json)
```sh
npm run dev    # dev server (Vite)
npm run build  # production build -> dist
npm run preview# preview built site
npm run lint   # ESLint
npm run deploy # predeploy/build then gh-pages -d dist
```

Project conventions & patterns (examples)
- Add a page: create `src/pages/MyPage.jsx` and register a route in the AnimatedRoutes block inside `src/App.jsx`:
  <Route path="/my-page" element={<MyPage/>} />
- Blog publishing: add `public/blogs/blog-name.md` and add/modify an entry in `src/data/blogs.js` with { id, title, date, summary, filename: 'blog-name.md' } — the site resolves `filename` -> `public/blogs/`.
- Component layout: top-level pages live in `src/pages/`, UI components in `src/components/` and primitives under `src/components/ui/`.
- Naming/imports: prefer alias imports, e.g. `import Hero from '@/components/HeroSection'`.
- Styles: Tailwind is used; global CSS is `src/index.css`. Blog-specific CSS is `src/assets/blog-styles.css`.

Where to look first
- `src/pages/` for page-level logic (CalorieTracker, CodePlayground, ColorPicker, etc.).
- `src/components/` for reusable UI pieces and feature subfolders (each mini-app lives in its own subfolder).
- `src/data/blogs.js` + `public/blogs/` for blog flow and markdown rendering.
- `vite.config.js` for the `@` alias and dev-time logging (useful for Windows path issues).

Integration & gotchas
- HashRouter is required for GitHub Pages routing — do not switch to BrowserRouter without changing host.
- Blog content is static markdown under `public/` — no backend. Keep filenames and `src/data/blogs.js` entries in sync.
- No unit tests are present; linting (`npm run lint`) is the main automated check.

Small examples to copy/paste
- Import using alias:
  import { HeroSection } from '@/components/HeroSection'
- Add blog entry (snippet for `src/data/blogs.js`):
  { id: 'blog-4', title: 'New Post', date: '2025-10-08', summary: 'Short', filename: 'blog-4.md' }

Quality gates & quick checklist for edits
- Run `npm run dev` and confirm the app mounts at localhost.
- Run `npm run lint` and fix linter errors before creating a PR.
- For route/page changes, update `src/App.jsx` AnimatedRoutes and verify navigation works in dev and after `npm run build` + `npm run preview`.

If anything in this file is ambiguous or you want me to expand a section (example patches, tests, or CI), tell me which area and I will iterate.
