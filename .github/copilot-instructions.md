<!-- .github/copilot-instructions.md
     Purpose: Short, repo-specific instructions for AI coding agents (Copilot-like)
-->

# Copilot / AI Agent Instructions — DanielChahine0.github.io

This document captures the essential, discoverable facts an automated coding agent needs to be productive in this repository.

Keep edits small, run quick local checks (lint/build/dev) and prefer editing files referenced below.

1. Project summary
 - Vite + React (React 19) single-page portfolio with interactive tools and animations.
 - Entry points: `src/main.jsx` (boot) and `src/App.jsx` (routing + global providers).
 - Routing uses HashRouter (see `src/App.jsx`) — important for GitHub Pages deployment.

2. Where code lives / important folders
 - `src/` — all app source. Key subfolders:
   - `src/components/` — reusable UI + feature components (many features in subfolders).
   - `src/components/ui/` — UI primitives (toaster, small atoms). Example: `@/components/ui/toaster.jsx`.
   - `src/pages/` — route pages mapped in `src/App.jsx` (e.g. `Home.jsx`, `Blogs.jsx`, `Tools.jsx`).
   - `src/hooks/` — custom hooks (`use-glow-effect.js`, `use-toast.js`).
   - `src/lib/` — utilities (shared helper functions).
   - `public/blogs/` — markdown posts used by the blogs UI (blog1.md, blog2.md, ...).

3. Build / run / CI commands (exact, from package.json)
 - Run dev server: `npm run dev` (Vite)
 - Build production: `npm run build` (Vite build -> output `dist`)
 - Preview production build locally: `npm run preview`
 - Lint: `npm run lint` (ESLint)
 - Deploy to GitHub Pages: `npm run deploy` (calls `predeploy` then `gh-pages -d dist`)

Examples (run in repo root):
```powershell
npm run dev
npm run lint
npm run build; npm run preview
```

4. Important config and conventions
 - Vite alias: `@` → `src` (see `vite.config.js`). Prefer `import X from '@/path'` for intra-repo imports.
 - Styling: Tailwind CSS is used (`index.css`) and `tailwind-merge` is used for class merging. Expect many utility-class patterns.
 - Animation and routing: Framer Motion + `AnimatePresence` is used for page transitions (see `src/App.jsx` and `src/components/PageTransition.jsx`).
 - Markdown rendering: `react-markdown` + rehype/remark plugins and `highlight.js` styles are imported in `src/main.jsx`; blog content lives in `public/blogs/` and pages render those markdown files.
 - DOM sanitization: `dompurify` is included in dependencies — look for it if you modify markdown/HTML rendering.

5. Data & integration points
 - Static blogs: `public/blogs/*.md` — Blogs page reads these (see `src/pages/Blogs.jsx` and `src/data/blogs.js`).
 - Global UI providers: App mounts global providers/components at the root (example: `<Toaster />` is included in `src/App.jsx`). When adding global components, prefer editing `src/App.jsx`.
 - Deploy target: GitHub Pages — repository uses `gh-pages` to publish `dist`. Because routing uses HashRouter, client-side routing works without special server configuration.

6. Project-specific patterns agents should follow
 - Use `@` imports instead of relative deep paths (keeps diffs small and consistent).
 - When adding UI state shared across pages, prefer adding a small provider at `src/App.jsx` rather than scattering global singletons.
 - Prefer composing Tailwind classes with `clsx` / `tailwind-merge` rather than large inline style objects. Search `tailwind-merge` or `clsx` usage to mirror style.
 - For animations use Framer Motion components already present (e.g. `PageTransition.jsx`) to keep transitions consistent.

7. Quick file pointers (examples you will reference)
 - App + routing: `src/App.jsx`
 - App entry: `src/main.jsx`
 - Vite config / alias: `vite.config.js`
 - Scripts & deps: `package.json`
 - UI primitives: `src/components/ui/` (toaster, toast)
 - Page components: `src/pages/` (each page exported as default or named export)
 - Blogs (content): `public/blogs/*.md` and `src/data/blogs.js`

8. Tests & quality
 - There are no `test` scripts in `package.json` and no obvious test runner configuration. If you add tests, include a script and CI step.
 - Run `npm run lint` before opening PRs; expect ESLint to be configured (see `eslint.config.js`).

9. Safety & verification checklist for changes
 - Run `npm run dev` and open the app locally. For production-target changes, run `npm run build` and `npm run preview` to smoke test.
 - Run `npm run lint` and fix warnings/errors reported by ESLint.
 - If modifying markdown rendering or HTML injection paths, validate sanitization (dompurify) is used.
 - Use HashRouter awareness: modifying routing should account for hash-based paths used by GitHub Pages.

10. If you need more info
 - Many directories include `README.md` files (e.g. `src/README.md`, `src/components/README.md`) — consult these for component-level details.
 - If behaviour is unclear, run the app locally and inspect the page that uses the file you changed (fast feedback loop).

---

If anything above looks incorrect or you'd like me to expand a section (e.g., sample PR checklist, common refactor patterns, or examples of how blogs are parsed in code), tell me which area to expand and I'll iterate.
