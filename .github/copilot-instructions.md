## Quick, focused instructions for AI contributors

This file gives the exact, discoverable patterns and commands an AI coding agent needs to be immediately productive in this repository (React + Vite personal portfolio).

Core facts (read these files for details):
- App entry: `src/main.jsx` -> renders `src/App.jsx`.
- Routing + transitions: `src/App.jsx` uses `HashRouter` + `framer-motion`'s `AnimatePresence` for animated routes. (Hash routing is intentional for GitHub Pages.)
- Blog data: `src/data/blogs.js` contains the array of posts and helpers (`getLatestBlogs`, `getBlogById`); markdown sources live in `public/blogs/*.md`.
- Vite config: `vite.config.js` defines alias `@ -> src` and logs resolved paths during dev.

Developer workflows (commands from `package.json`):
- `npm run dev` — start Vite dev server (fast refresh + console logs from `vite.config.js`).
- `npm run build` — produce production files in `dist`.
- `npm run preview` — preview the production build locally.
- `npm run lint` — run ESLint across the repo.
- `npm run deploy` — runs `gh-pages -d dist` (after `predeploy` which runs `build`) to publish to GitHub Pages.

Concrete, repo-specific patterns and examples
- Routing: to add a page, create `src/pages/MyPage.jsx` and add a `<Route path="/my-page" element={<MyPage/>} />` in `AnimatedRoutes` within `src/App.jsx`.
- Blog authoring: add `public/blogs/blog-new.md` and then add/modify an entry in `src/data/blogs.js` with fields { id, title, date, summary, filename: 'blog-new.md' }. The `Blogs` page resolves `filename` -> `public/blogs/`.
- Component conventions: components live in `src/components/` (and subfolders per tool). Reusable UI primitives are under `src/components/ui/`. Use the alias `@` when importing (e.g. `import { HeroSection } from '@/components/HeroSection'`).
- Styling: Tailwind is used; global styles in `src/index.css`. Utility helpers like `clsx` and `tailwind-merge` are common for conditional class names.

Integration notes and gotchas
- HashRouter is used intentionally so client-side routing works on GitHub Pages; avoid switching to BrowserRouter unless you adjust hosting configuration.
- `vite.config.js` prints resolved __dirname/alias at startup — useful when debugging path/alias problems on Windows.
- No unit tests detected. Linting is available (`npm run lint`); run it before PRs.

Where to look first for common changes
- `src/pages/` — top-level pages and interactive tools (CalorieTracker, CodePlayground, ColorPicker, etc.).
- `src/components/` and `src/components/ui/` — shared components and primitives.
- `src/lib/utils.js` and `src/hooks/` — shared logic and hooks to reuse.

If anything above is unclear or you want extra detail (examples for a particular change, tests, or CI), tell me which area to expand and I will iterate.

Suggested improvements for the website
- Accessibility
    - [x] Add keyboard focus styles, meaningful ARIA roles, and ensure all interactive elements are reachable by keyboard.
    - Run axe/Lighthouse to fix color contrast, missing alt text, and semantic markup issues.
- Performance & loading
    - Lazy-load below-the-fold images and components (React.lazy + Suspense).
    - Use next-gen image formats (WebP/AVIF) and responsive srcset for blog images.
    - Defer non-critical JS, remove unused deps, and run bundle analysis (e.g., rollup-plugin-visualizer).
    - Preconnect/prefetch to key origins (fonts, analytics).
- SEO & social
    - Add meta tags, Open Graph, Twitter Cards and canonical links per page.
    - Generate sitemap.xml and robots.txt during build.
    - Add JSON-LD structured data for the author and blog posts.
- Blog features & editor experience
    - Add tags, categories, and a client-side tag filter.
    - Show reading time and estimated word count for posts.
    - Enable search over blog posts (Fuse.js) and/or implement server-side search index.
    - Add syntax highlighting (Shiki or Prism) and code copy buttons.
- UX & content
    - Improve mobile navigation (accessible menu) and tune animations for reduced-motion users.
    - Add a dark-mode toggle with persisted preference (prefers-color-scheme fallback).
    - Add project case studies with screenshots, tech stack, and links to source/live demos.
- Forms & contact
    - Add a simple contact form integrated with Formspree/Netlify/Serverless endpoint and spam protection.
- Analytics & feedback
    - Add privacy-friendly analytics (Plausible / Matomo) and optional consent banner.
    - Add an unobtrusive feedback or “report typo” link on blog posts.
- Reliability & infra
    - Add GitHub Actions CI: lint, build, and run a preview deployment before gh-pages deploy.
    - Add basic unit / integration tests for core components (React Testing Library + Vitest).
- Progressive Web App (optional)
    - Add manifest.json and service worker to enable installable PWA with offline caching for static pages.
- Developer DX
    - Consider migrating critical files to TypeScript incrementally.
    - Document local dev checks (Lighthouse score targets, lint rules, build size budget) in README.
- Security & privacy
    - Add Content Security Policy headers for deployed site and avoid embedding third-party scripts without review.

If you want, I can insert this section into the file now or trim/add items tailored to priorities (performance, SEO, or blog features).
