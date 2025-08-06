# UI Components

Fundamental UI primitive components for consistent interface elements.

**Built with:** Radix UI, class-variance-authority, Lucide React

## Documentation Navigation
[⬆️ Main README](../../../README.md) - Project overview and features
[⬆️ Source Overview](../../README.md) - Source code structure
[⬆️ Components](../README.md) - Parent components directory

## Components

### `toast.jsx`
Customizable toast notification component.

**Features:**
• Accessible notifications via Radix UI
• Default and destructive variants
• Auto-dismiss functionality
• Close button with icon

```jsx
<Toast>
  <ToastTitle>Success!</ToastTitle>
  <ToastDescription>Action completed.</ToastDescription>
</Toast>
```

### `toaster.jsx`
Toast container and management system.

**Features:**
• Multiple toast handling
• Automatic positioning
• Integration with `use-toast` hook

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

**Dependencies:** @radix-ui/react-toast, class-variance-authority, lucide-react

- Additional toast variants (info, warning)
- Custom toast positioning options
- Enhanced animation presets
- Toast grouping and stacking
- Progress indicators for longer actions
