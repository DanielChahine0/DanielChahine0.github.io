# Hooks

Custom React hooks for reusable stateful logic.

**Built with:** React 19, Radix UI

## Documentation Navigation
- [⬆️ Main README](../../README.md) - Project overview and features
- [⬆️ Source Overview](../README.md) - Source code structure

## Available Hooks

### `use-glow-effect.js`
Mouse tracking and glow effect for interactive elements.

**Returns:** `mousePosition`, `isHovered`, event handlers, `glowStyle`

```jsx
const { handleMouseMove, handleMouseEnter, handleMouseLeave, glowStyle } = useGlowEffect();

return (
  <div onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <div className="glow-effect" style={glowStyle} />
    Content
  </div>
);
```

### `use-toast.js`
Toast notification state management.

**Returns:** `toasts`, `toast`, `dismiss`

```jsx
const { toast } = useToast();

toast({
  title: "Success!",
  description: "Action completed",
  duration: 3000
});
```

**Features:** Auto-dismiss, multiple variants, accessible notifications via Radix UI.


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
