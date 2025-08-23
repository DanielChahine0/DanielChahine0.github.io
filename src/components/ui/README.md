# UI Components

Last Updated: August 23, 2025

## Overview
Core UI primitives built on Radix UI for consistent, accessible interface elements.

**Tech Stack:**
- Radix UI
- class-variance-authority
- Lucide React
- TailwindCSS

## Components

### Toast System
```jsx
// toast.jsx - Notification component
<Toast variant="default" duration={3000}>
  <ToastTitle>Success!</ToastTitle>
  <ToastDescription>Action completed.</ToastDescription>
  <ToastClose />
</Toast>

// toaster.jsx - Toast container
function App() {
  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  );
}
```

**Features:**
- ARIA compliance
- Multiple variants
- Auto-dismiss
- Position control
- Animation
- Sound effects

## Usage Guide

### Installation
```bash
npm install @radix-ui/react-toast class-variance-authority
```

### Implementation
```jsx
import { useToast } from '@/hooks/use-toast';
import { Toast } from '@/components/ui/toast';

function MyComponent() {
  const { toast } = useToast();
  
  const notify = () => {
    toast({
      title: "Success!",
      description: "Operation completed",
      variant: "default" | "success" | "error",
      duration: 3000
    });
  };
  
  return <button onClick={notify}>Trigger Toast</button>;
}
```

## Best Practices
- Use semantic HTML
- Include ARIA labels
- Support keyboard nav
- Test with screen readers
- Follow design tokens

- Additional toast variants (info, warning)
- Custom toast positioning options
- Enhanced animation presets
- Toast grouping and stacking
- Progress indicators for longer actions
