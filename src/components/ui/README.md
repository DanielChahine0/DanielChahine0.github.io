# UI Components

Fundamental UI primitive components for consistent interface elements.

**⬆️ [Back to Components](../README.md) | [Source](../../README.md) | [Main README](../../../README.md)**

## Components

### `toast.jsx`
Customizable toast notification component with multiple variants.

**Features:**
- Accessible notifications via Radix UI
- Default and destructive variants
- Auto-dismiss functionality
- Close button with icon

**Usage:**
```jsx
<Toast>
  <ToastTitle>Success!</ToastTitle>
  <ToastDescription>Action completed.</ToastDescription>
</Toast>
```

### `toaster.jsx`
Toast container and management system for centralized notifications.

**Features:**
- Multiple toast handling
- Automatic positioning
- Integration with `use-toast` hook

**Usage:**
```jsx
function App() {
  return (
    <div>
      {/* App content */}
      <Toaster />
    </div>
  );
}
```

## Dependencies

- `@radix-ui/react-toast` - Accessible primitives
- `class-variance-authority` - Variant management
- `lucide-react` - Icon system

- Additional toast variants (info, warning)
- Custom toast positioning options
- Enhanced animation presets
- Toast grouping and stacking
- Progress indicators for longer actions
