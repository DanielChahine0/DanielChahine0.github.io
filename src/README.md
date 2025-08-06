# Source (src)

Main source directory for Daniel Chahine's portfolio React application.

**⬆️ [Back to Main README](../README.md)**

## Directory Structure

- [`components/`](./components/README.md) - Reusable UI components
- [`pages/`](./pages/README.md) - Page components and routes
- [`hooks/`](./hooks/README.md) - Custom React hooks
- [`lib/`](./lib/README.md) - Utility functions
- `assets/` - Static assets (SVGs, images)

## Core Files

- `App.jsx` - Root component with routing
- `main.jsx` - Application entry point
- `index.css` - Global styles and Tailwind imports

## Architecture

React 19 application using modern hooks, component-driven development, and performance-first design patterns.
- CSS custom properties for theming
- Global font declarations
- Base element styling
- Animation keyframes
- Responsive design foundations

```css
/* Key features */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Theme variables */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... other CSS variables */
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark theme variables */
  }
}
```

---

## Directory Relationships

### Component Hierarchy
```
App.jsx
├── BrowserRouter
│   ├── Routes
│   │   ├── Route: / → Home
│   │   ├── Route: /timeline → Timeline
│   │   ├── Route: /playground → Playground
│   │   └── Route: /playground/* → Tools
│   └── Toaster (Global Toast Container)
```

### Import Patterns
```jsx
// Absolute imports with @ alias
import { Component } from '@/components/Component';
import { useHook } from '@/hooks/use-hook';
import { utility } from '@/lib/utils';

// Relative imports for co-located files
import './styles.css';
import icon from '../assets/icon.svg';
```

### Data Flow
```
User Interaction
    ↓
Page Components (Event Handlers)
    ↓
Custom Hooks (State Management)
    ↓
Utility Functions (Data Processing)
    ↓
UI Components (Display)
```

---

## Styling Architecture

### Tailwind CSS Configuration
- **Custom Design System** - Consistent spacing, colors, typography
- **Dark/Light Themes** - CSS variable-based theme switching
- **Responsive Design** - Mobile-first breakpoint system
- **Component Classes** - Reusable component styling patterns

### CSS Organization
```css
/* Layer-based organization */
@layer base {
  /* HTML element defaults */
}

@layer components {
  /* Reusable component styles */
}

@layer utilities {
  /* Custom utility classes */
}
```

### Animation System
- **Framer Motion** - Page transitions and interactive animations
- **CSS Animations** - Performance-optimized effects
- **Reduced Motion** - Accessibility-compliant motion preferences

---

## Performance Features

### Code Splitting
```jsx
// Route-based code splitting
const LazyPage = lazy(() => import('./pages/LazyPage'));

// Component-based splitting for heavy features
const HeavyComponent = lazy(() => import('./components/HeavyComponent'));
```

### Bundle Optimization
- **Tree Shaking** - Unused code elimination
- **Dynamic Imports** - On-demand resource loading
- **Asset Optimization** - Compressed images and optimized SVGs
- **Caching Strategy** - Browser caching for static assets

### Runtime Performance
- **Memoization** - React.memo, useMemo, useCallback
- **Efficient Re-renders** - Optimized component updates
- **Virtual DOM** - React's reconciliation optimizations
- **Event Handling** - Passive listeners and debouncing

---

## Development Workflow

### File Naming Conventions
```
Components: PascalCase.jsx          # HeroSection.jsx
Hooks: camelCase with 'use' prefix  # use-glow-effect.js
Utils: camelCase.js                 # utils.js
Pages: PascalCase.jsx               # Home.jsx
Assets: kebab-case                  # hero-photo.png
```

### Import/Export Patterns
```jsx
// Named exports for utilities and hooks
export const utility = () => { /* ... */ };
export const useCustomHook = () => { /* ... */ };

// Default exports for components and pages
export default function Component() { /* ... */ }

// Re-exports for clean API
export { ComponentA, ComponentB } from './components';
```

### Error Boundaries
```jsx
// Error handling for production resilience
<ErrorBoundary fallback={<ErrorFallback />}>
  <Suspense fallback={<LoadingSpinner />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

---

## Security Considerations

### XSS Prevention
- **DOMPurify** - HTML sanitization for user content
- **Content Security Policy** - Restricting resource loading
- **Input Validation** - Client and server-side validation

### Data Handling
- **Local Storage** - Secure data persistence
- **Environment Variables** - Sensitive configuration management
- **API Security** - Secure communication patterns

---

## Testing Strategy

### Testing Structure
```
src/
├── __tests__/              # Test files
│   ├── components/         # Component tests
│   ├── hooks/              # Hook tests
│   ├── lib/                # Utility tests
│   └── pages/              # Page tests
```

### Testing Patterns
```jsx
// Component testing
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

// Hook testing
import { renderHook } from '@testing-library/react';
import { useCustomHook } from './use-custom-hook';

describe('useCustomHook', () => {
  it('returns expected values', () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current.value).toBe(expectedValue);
  });
});
```

---

## Future Development

### Planned Improvements
- **TypeScript Migration** - Full type safety implementation
- **Testing Coverage** - Comprehensive test suite
- **Performance Monitoring** - Real-user metrics and optimization
- **Accessibility Auditing** - Automated a11y testing
- **Internationalization** - Multi-language support

### Architecture Evolution
- **State Management** - Context API or external state manager
- **Micro-Frontend** - Modular application architecture
- **Progressive Web App** - Offline capabilities and installability
- **Server-Side Rendering** - SEO and performance optimization

### Developer Experience
- **Storybook Integration** - Component documentation and testing
- **Hot Module Replacement** - Enhanced development workflow
- **Code Generation** - Automated component scaffolding
- **Performance Profiling** - Development-time optimization tools

---

## Documentation

Each subdirectory contains its own README with detailed information:
- **[Components](./components/README.md)** - UI component documentation
- **[Hooks](./hooks/README.md)** - Custom hook documentation
- **[Lib](./lib/README.md)** - Utility function documentation
- **[Pages](./pages/README.md)** - Page component documentation
- **[UI](./components/ui/README.md)** - Primitive component documentation

---

## Contributing

### Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Follow the established patterns and conventions

### Code Quality
- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality gates
- **Conventional Commits** - Standardized commit messages
