# Source Code Overview

Last Updated: August 23, 2025

## Overview
Core source code for the portfolio application, built with modern React and supporting tools.

**Tech Stack:**
- React 19
- Vite 5
- TailwindCSS 4
- Framer Motion
- React Router v6

## Directory Structure

### Core Files
- **`App.jsx`** - Root component and routing
- **`main.jsx`** - Application entry
- **`index.css`** - Global styles

### Feature Directories
- **`/components`** - [UI Components](./components/README.md)
  - Reusable components
  - Feature modules
  - UI primitives

- **`/pages`** - [Route Pages](./pages/README.md)
  - Portfolio pages
  - Interactive tools
  - Error pages

- **`/hooks`** - [Custom Hooks](./hooks/README.md)
  - State management
  - Shared logic
  - Effects

- **`/lib`** - Utilities
  - Helper functions
  - Constants
  - Types

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
