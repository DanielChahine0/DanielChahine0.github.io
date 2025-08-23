# Components

Last Updated: August 23, 2025

## Overview
Core React components powering the portfolio website and its interactive tools.

**Tech Stack:**
- React 19
- Framer Motion
- Tailwind CSS
- Radix UI
- Lucide React

## Component Categories

### Core UI
- **`NavBar.jsx`** - Responsive navigation with theme toggle
- **`Footer.jsx`** - Site footer with dynamic content
- **`PageTransition.jsx`** - Smooth page transitions
- **`ui/`** - Foundational UI components

### Portfolio Sections
- **`HeroSection.jsx`** - Animated landing section
- **`AboutSection.jsx`** - Personal introduction
- **`ProjectsSection.jsx`** - Project showcase grid
- **`SkillsSection.jsx`** - Interactive skills display

### Interactive Tools
- **`CalorieCalculator/`** - Nutrition tracking tool
- **`ClockTimer/`** - Time management suite
- **`CodePlayground/`** - Web code editor
- **`ColorPicker/`** - Color manipulation tools
- **`ImageEditor/`** - Image processing suite
- **`LifeInWeeks/`** - Life visualization tool
- **`MarkdownEditor/`** - Markdown authoring environment
- **`ResumeBuilder/`** - CV generation tool
- **`TextAnalyzer/`** - Text analysis utilities

### Visual Effects
- **`StarBackground.jsx`** - Canvas star animation
- **`CloudBackground.jsx`** - Parallax cloud effects

## Features
- SSR-compatible components
- Mobile-first responsive design
- ARIA-compliant accessibility
- Motion optimization
- Theme support
- Error boundaries
- Performance monitoring

---

## Dependencies

### Core Dependencies
- **React 19** - Modern React features
- **Framer Motion** - Animation library
- **Lucide React** - Icon system
- **React Icons** - Additional icon sets

### Utility Dependencies
- **clsx** - Conditional class names
- **tailwind-merge** - Tailwind class merging
- **@radix-ui/react-toast** - Accessible toast components

---

## Usage Examples

### Basic Component Usage
```jsx
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';

function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
    </main>
  );
}
```

### Component with Custom Props
```jsx
import { ThemeToggle } from '@/components/ThemeToggle';

function Header() {
  return (
    <header>
      <ThemeToggle className="ml-auto" />
    </header>
  );
}
```

### Background Components
```jsx
import { StarBackground } from '@/components/StarBackground';
import { CloudBackground } from '@/components/CloudBackground';

function Layout({ children }) {
  return (
    <div className="relative">
      <StarBackground />
      <CloudBackground />
      {children}
    </div>
  );
}
```

---

## Performance Considerations

- **Code splitting** ready (React.lazy compatible)
- **Memoization** where appropriate
- **Optimized animations** for 60fps performance
- **Responsive images** with proper loading strategies
- **Minimal re-renders** through proper dependency management

---

## Future Enhancements

- Component storybook documentation
- Unit test coverage
- Additional animation presets
- More customizable themes
- Enhanced accessibility features
- Performance monitoring integration
