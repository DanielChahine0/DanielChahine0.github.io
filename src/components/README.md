# Components

Reusable React components for the portfolio website.

**⬆️ [Back to Source](../README.md) | [Main README](../../README.md)**

## Directory Structure

- [`ui/`](./ui/README.md) - Base UI primitives (toast, etc.)
- Component files - Feature-specific components

## Key Components

### Layout & Navigation
- `NavBar.jsx` - Main navigation with responsive menu
- `Footer.jsx` - Site footer with social links
- `PageTransition.jsx` - Framer Motion page transitions

### Content Sections  
- `HeroSection.jsx` - Landing section with intro
- `AboutSection.jsx` - Personal background
- `SkillsSections.jsx` - Technology skills showcase
- `ProjectsSection.jsx` - Project portfolio

### Interactive Elements
- `ThemeToggle.jsx` - Dark/light mode switcher
- `ScrollToTop.jsx` - Smooth scroll utility

### Visual Effects
- `StarBackground.jsx` - Animated canvas stars
- `CloudBackground.jsx` - CSS cloud animations

## Design Patterns

Modern React with hooks, Tailwind CSS styling, responsive design, and accessibility features.

### Standard Props
```jsx
// Most components accept these common props
{
  className?: string,          // Additional CSS classes
  children?: ReactNode,        // Child components
  ...props                     // Spread props for flexibility
}
```

### Animation Props (Framer Motion components)
```jsx
{
  initial?: MotionProps,       // Initial animation state
  animate?: MotionProps,       // Animation target
  transition?: MotionProps,    // Animation configuration
  whileHover?: MotionProps,    // Hover animations
  whileInView?: MotionProps    // Scroll-triggered animations
}
```

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
