# Components

This directory contains all the reusable React components that make up the portfolio website. These components are organized by functionality and follow modern React patterns with hooks, proper prop handling, and responsive design principles.

---

## Structure

```
components/
├── ui/                         # Primitive UI components
│   ├── toast.jsx              # Toast notifications
│   ├── toaster.jsx            # Toast container
│   └── README.md              # UI components documentation
├── AboutSection.jsx           # About/bio section
├── CloudBackground.jsx        # Animated cloud background
├── Footer.jsx                 # Site footer with links
├── HeroSection.jsx            # Landing/hero section
├── NavBar.jsx                 # Navigation bar
├── PageTransition.jsx         # Page transition wrapper
├── ProjectsSection.jsx        # Projects showcase
├── ScrollToTop.jsx            # Scroll to top button
├── SkillsSections.jsx         # Skills display
├── StarBackground.jsx         # Animated star background
├── ThemeToggle.jsx            # Dark/light mode toggle
└── README.md                  # This documentation
```

---

## Components Overview

### Layout & Navigation
| Component | Purpose | Key Features |
|-----------|---------|--------------|
| `NavBar.jsx` | Main navigation | Responsive menu, active states, smooth scrolling |
| `Footer.jsx` | Site footer | Social links, copyright, contact info |
| `PageTransition.jsx` | Page transitions | Framer Motion animations, route transitions |

### Content Sections
| Component | Purpose | Key Features |
|-----------|---------|--------------|
| `HeroSection.jsx` | Landing section | Profile photo, intro text, social links, CTA buttons |
| `AboutSection.jsx` | About/bio section | Personal information, background, story |
| `SkillsSections.jsx` | Skills showcase | Categorized skills, technology icons, proficiency levels |
| `ProjectsSection.jsx` | Project portfolio | Project cards, tech stack, live/repo links |

### Interactive Elements
| Component | Purpose | Key Features |
|-----------|---------|--------------|
| `ThemeToggle.jsx` | Theme switcher | Dark/light mode, persistent preferences, smooth transitions |
| `ScrollToTop.jsx` | Scroll utility | Auto-show/hide, smooth scrolling, accessibility |

### Visual Effects
| Component | Purpose | Key Features |
|-----------|---------|--------------|
| `StarBackground.jsx` | Animated stars | Canvas-based animation, responsive, performance optimized |
| `CloudBackground.jsx` | Cloud effects | CSS animations, layered effects, theme-aware |

---

## Design Patterns

### Component Structure
```jsx
// Standard component pattern used throughout
export const ComponentName = ({ prop1, prop2, ...props }) => {
  // Hooks
  const [state, setState] = useState(defaultValue);
  
  // Event handlers
  const handleEvent = useCallback(() => {
    // Handler logic
  }, [dependencies]);
  
  // JSX with proper accessibility
  return (
    <section className="responsive-classes" {...props}>
      {/* Component content */}
    </section>
  );
};
```

### Styling Approach
- **Tailwind CSS** utility-first styling
- **Responsive design** with mobile-first approach
- **Dark/light theme** support via CSS variables
- **Framer Motion** for animations and transitions

### Accessibility Features
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

---

## Common Props & Patterns

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
