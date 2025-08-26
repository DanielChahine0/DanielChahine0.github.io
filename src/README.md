# Source Code Overview

Last Updated: August 26, 2025

## Overview
Core source code for the portfolio application, built with modern React and a comprehensive toolset for optimal performance and developer experience.

**Tech Stack:**
- React 19 with Suspense and Hooks
- Vite 5 for fast builds
- TailwindCSS 4 for styling
- Framer Motion for animations
- React Router v6 for routing

## Directory Structure

### Core Files
- **`App.jsx`** - Root component with routing and providers
- **`main.jsx`** - Application entry with necessary polyfills
- **`index.css`** - Global styles and Tailwind directives

### Feature Directories
- **`/components`** - [UI Components](./components/README.md)
  - Reusable components for consistent UI
  - Feature-specific modules
  - UI primitives and atoms
  - Interactive tools and widgets

- **`/pages`** - [Route Pages](./pages/README.md)
  - Main portfolio sections
  - Interactive development tools
  - Error handling pages
  - Dynamic routing

- **`/hooks`** - [Custom Hooks](./hooks/README.md)
  - State management patterns
  - Shared business logic
  - Animation and effect hooks
  - Performance optimizations

- **`/lib`** - Utilities
  - Helper functions and utilities
  - Constants and configuration
  - Type definitions
  - Shared utilities

## Architecture

### Development
- Component-driven design
- Custom hook patterns
- Strict TypeScript
- CSS Modules + Tailwind

### Performance
- Route-based code splitting
- Image optimization
- Bundle analysis
- Lazy loading

### Quality
- ESLint configuration
- Prettier formatting
- Jest unit tests
- E2E with Cypress

### Build
- Vite production build
- GitHub Pages deployment
- Environment configs
- Package scripts
