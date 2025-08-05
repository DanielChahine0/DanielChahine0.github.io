# Hooks

This directory contains custom React hooks that encapsulate reusable stateful logic and side effects. These hooks follow React's hooks conventions and provide clean abstractions for common functionality used throughout the portfolio.

---

## Structure

```
hooks/
├── use-glow-effect.js         # Mouse glow effect hook
├── use-toast.js               # Toast notification management
└── README.md                  # This documentation
```

---

## Hooks Overview

### `use-glow-effect.js`
**Purpose:** Provides mouse tracking and glow effect functionality for interactive elements  
**Returns:** Object with mouse position, hover state, event handlers, and glow styles  

**Features:**
- Real-time mouse position tracking
- Hover state management
- Optimized event handlers
- Pre-calculated glow positioning
- Performance-conscious implementation

**API:**
```javascript
const {
  mousePosition,     // { x: number, y: number }
  isHovered,         // boolean
  handleMouseMove,   // (event) => void
  handleMouseEnter,  // () => void
  handleMouseLeave,  // () => void
  glowStyle,         // { left: number, top: number }
} = useGlowEffect();
```

**Usage Example:**
```jsx
import { useGlowEffect } from '@/hooks/use-glow-effect';

function GlowCard() {
  const {
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    glowStyle,
  } = useGlowEffect();

  return (
    <div
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <div
          className="absolute w-20 h-20 bg-blue-500/20 rounded-full blur-xl pointer-events-none"
          style={glowStyle}
        />
      )}
      <div className="relative z-10">Card content</div>
    </div>
  );
}
```

### `use-toast.js`
**Purpose:** Manages toast notification state and provides toast manipulation functions  
**Returns:** Object with toast state and control functions  

**Features:**
- Toast queue management
- Auto-dismiss functionality
- Multiple toast support
- Action button handling
- Accessibility compliance
- Memory leak prevention

**API:**
```javascript
const {
  toasts,           // Array of toast objects
  toast,            // (props) => string (returns toast ID)
  dismiss,          // (toastId?: string) => void
} = useToast();
```

**Toast Object Structure:**
```javascript
{
  id: string,
  title?: string,
  description?: string,
  action?: ReactElement,
  variant?: 'default' | 'destructive',
  duration?: number,
}
```

**Usage Examples:**
```jsx
import { useToast } from '@/hooks/use-toast';

function ContactForm() {
  const { toast } = useToast();

  const handleSubmit = async (data) => {
    try {
      await submitForm(data);
      toast({
        title: "Success!",
        description: "Your message has been sent.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
    </form>
  );
}
```

---

## Implementation Patterns

### Hook Structure
```javascript
// Standard hook pattern used throughout
export const useCustomHook = (initialValue, options = {}) => {
  // State management
  const [state, setState] = useState(initialValue);
  
  // Side effects
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, [dependencies]);
  
  // Memoized values and callbacks
  const memoizedValue = useMemo(() => {
    return computeValue(state);
  }, [state]);
  
  const memoizedCallback = useCallback((params) => {
    // Callback logic
  }, [dependencies]);
  
  // Return object with consistent naming
  return {
    state,
    memoizedValue,
    memoizedCallback,
  };
};
```

### Performance Optimizations
- **useCallback** for event handlers to prevent unnecessary re-renders
- **useMemo** for expensive calculations
- **Cleanup functions** to prevent memory leaks
- **Debouncing** for high-frequency events (where applicable)

---

## Design Principles

### Reusability
- Hooks are designed to work in multiple contexts
- Configurable through parameters
- No hard-coded values or assumptions

### Performance
- Minimal re-renders through proper dependency management
- Cleanup of event listeners and timeouts
- Optimized for 60fps interactions

### Accessibility
- Keyboard navigation support where applicable
- Screen reader compatibility
- Focus management

### Type Safety
- Proper TypeScript definitions (when applicable)
- Runtime validation for critical parameters
- Descriptive error messages

---

## Dependencies

### Core Dependencies
- **React** - Hooks API (useState, useEffect, useCallback, useMemo)

### Toast Hook Dependencies
- **@radix-ui/react-toast** - Toast primitive components
- **React Context** - Global toast state management

---

## Testing Patterns

### Hook Testing Setup
```javascript
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from './use-custom-hook';

describe('useCustomHook', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current.state).toBe(defaultValue);
  });

  it('should handle interactions correctly', () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.handleInteraction();
    });
    
    expect(result.current.state).toBe(expectedValue);
  });
});
```

---

## Future Enhancements

### Planned Hooks
- `use-theme` - Enhanced theme management
- `use-scroll-position` - Scroll position tracking
- `use-intersection-observer` - Element visibility detection
- `use-local-storage` - Persistent state management
- `use-media-query` - Responsive breakpoint detection

### Hook Improvements
- TypeScript conversion for better type safety
- Enhanced error handling and validation
- Performance monitoring and optimization
- Comprehensive test coverage
- Documentation with more usage examples

### Advanced Features
- Hook composition patterns
- Custom hook debugging tools
- Performance profiling integration
- Accessibility testing utilities
