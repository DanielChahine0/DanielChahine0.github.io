# Lib

Utility functions and shared logic for the portfolio application.

**Built with:** clsx, tailwind-merge

## Documentation Navigation
[⬆️ Main README](../../README.md) - Project overview and features
[⬆️ Source Overview](../README.md) - Source code structure

## Files

### `utils.js`
Core utility function for class name management.

**Main export:** `cn` function - merges Tailwind classes with conditional logic and deduplication.

```javascript
import { cn } from '@/lib/utils';

const buttonClass = cn(
  'px-4 py-2 rounded-md',
  {
    'bg-blue-500': variant === 'primary',
    'bg-gray-500': variant === 'secondary',
  },
  disabled && 'opacity-50',
  className
);
```

**Dependencies:**
• `clsx` - Conditional class names
• `tailwind-merge` - Tailwind-specific merging

Handles conflict resolution, conditional logic, and optimizes for minimal runtime overhead.

---

## Utility Functions Architecture

### Function Design Principles
```javascript
// Pure functions - no side effects
export const utilityFunction = (input) => {
  // Pure transformation
  return transformedOutput;
};

// Composable - work well together
export const compose = (...fns) => (value) => 
  fns.reduceRight((acc, fn) => fn(acc), value);

// Reusable - work in different contexts
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};
```

### Type Safety Patterns
```javascript
// Input validation
export const validateEmail = (email) => {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Error handling
export const safeJsonParse = (jsonString, fallback = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Failed to parse JSON:', error);
    return fallback;
  }
};
```

---

## Styling Utilities

### Class Name Management Benefits
1. **Conflict Resolution**: `tailwind-merge` resolves conflicting Tailwind classes
2. **Conditional Logic**: `clsx` handles complex conditional class application
3. **Performance**: Optimized for minimal runtime overhead
4. **Developer Experience**: Clean, readable class name logic

### Advanced Class Name Patterns
```javascript
// Responsive utilities
export const responsiveClasses = cn(
  'text-sm md:text-base lg:text-lg',
  'p-2 md:p-4 lg:p-6',
  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
);

// Theme-aware utilities
export const themeClasses = (isDark) => cn(
  'transition-colors duration-200',
  isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
  isDark ? 'border-gray-700' : 'border-gray-200'
);

// Animation utilities
export const animationClasses = cn(
  'transition-all duration-300 ease-in-out',
  'hover:scale-105 hover:shadow-lg',
  'active:scale-95'
);
```

---

## Dependencies

### Core Dependencies
- **clsx** (^2.1.1) - Conditional class name utility
- **tailwind-merge** (via tailwindcss) - Tailwind class optimization

### Peer Dependencies
- **TailwindCSS** - CSS framework for class utilities
- **React** - For component integration

---

## Testing Utilities

### Unit Testing Examples
```javascript
import { cn } from './utils';

describe('cn utility', () => {
  it('should merge classes correctly', () => {
    const result = cn('bg-red-500', 'bg-blue-500');
    expect(result).toBe('bg-blue-500'); // Last class wins
  });

  it('should handle conditional classes', () => {
    const result = cn('base-class', {
      'conditional-class': true,
      'hidden-class': false,
    });
    expect(result).toBe('base-class conditional-class');
  });

  it('should handle array inputs', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });
});
```

---

## Performance Considerations

### Optimization Strategies
- **Minimal Dependencies**: Only essential utilities included
- **Tree Shaking**: Functions are individually exportable
- **Memoization**: Consider for expensive computations
- **Bundle Size**: Lightweight implementations preferred

### Runtime Performance
```javascript
// Optimized for frequent calls
export const cn = (...inputs) => {
  // Fast path for simple cases
  if (inputs.length === 1 && typeof inputs[0] === 'string') {
    return inputs[0];
  }
  
  // Full processing for complex cases
  return twMerge(clsx(inputs));
};
```

---

## Future Enhancements

### Planned Utilities
- **Date formatting functions** - Consistent date display
- **URL manipulation helpers** - Clean URL handling
- **Local storage utilities** - Type-safe storage operations
- **Validation helpers** - Form and input validation
- **Animation utilities** - Common animation patterns
- **Color manipulation** - Theme and color operations

### Advanced Features
- **TypeScript conversion** - Full type safety
- **Performance monitoring** - Runtime performance tracking
- **Debug utilities** - Development-time helpers
- **Testing utilities** - Component testing helpers
- **Accessibility helpers** - A11y utility functions

### Integration Improvements
- **Custom Tailwind plugins** - Extended utility classes
- **Design token management** - Centralized design values
- **Theme utilities** - Enhanced theming support
- **Responsive helpers** - Breakpoint management
- **Animation presets** - Common motion patterns
