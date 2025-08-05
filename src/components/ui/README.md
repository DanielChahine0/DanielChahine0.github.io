# UI Components

This directory contains fundamental UI primitive components that serve as the building blocks for the portfolio interface. These components follow design system principles and provide consistent, reusable interface elements.

---

## Structure

```
ui/
├── toast.jsx          # Toast notification component
├── toaster.jsx        # Toast container and management
└── README.md          # This documentation
```

---

## Components Overview

### `toast.jsx`
**Purpose:** Customizable toast notification component  
**Dependencies:** `@radix-ui/react-toast`, `lucide-react`, `class-variance-authority`  
**Features:**
- Multiple toast variants (default, destructive)
- Accessible toast notifications
- Customizable styling with Tailwind classes
- Close button with X icon
- Auto-dismiss functionality

**Usage:**
```jsx
import { Toast, ToastAction } from './ui/toast';

<Toast>
  <ToastTitle>Success!</ToastTitle>
  <ToastDescription>Your action was completed.</ToastDescription>
  <ToastAction altText="Close">Close</ToastAction>
</Toast>
```

### `toaster.jsx`
**Purpose:** Toast container and notification management system  
**Dependencies:** `use-toast` hook  
**Features:**
- Centralized toast rendering
- Multiple toast handling
- Automatic positioning
- Integration with toast state management

**Usage:**
```jsx
import { Toaster } from './ui/toaster';

function App() {
  return (
    <div>
      {/* Your app content */}
      <Toaster />
    </div>
  );
}
```

---

## Design System

### Toast Variants
- **Default**: Standard notification styling
- **Destructive**: Error/warning notifications with red accent

### Styling Approach
- Built with **Tailwind CSS** utility classes
- Uses **class-variance-authority** for variant management
- Follows **Radix UI** accessibility patterns
- Consistent with overall portfolio design language

---

## Integration

These UI components are designed to work seamlessly with:
- **Custom hooks** (`use-toast`)
- **Global styling** (Tailwind configuration)
- **Accessibility standards** (WCAG guidelines)
- **Animation system** (Framer Motion compatible)

---

## Dependencies

- `@radix-ui/react-toast` - Accessible toast primitive
- `class-variance-authority` - Component variant management
- `lucide-react` - Icon system
- `clsx` & `tailwind-merge` - Class name utilities

---

## Future Enhancements

- Additional toast variants (info, warning)
- Custom toast positioning options
- Enhanced animation presets
- Toast grouping and stacking
- Progress indicators for longer actions
