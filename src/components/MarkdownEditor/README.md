# MarkdownEditor Components

This directory contains the modular components for the Enhanced Markdown Editor application.

## Component Structure

### Main Components

- **`Toolbar.jsx`** - The main toolbar with formatting buttons, view controls, file operations, and export functionality
- **`EditorPanel.jsx`** - The markdown text editor panel with syntax highlighting support
- **`PreviewPanel.jsx`** - The markdown preview panel with live rendering
- **`MarkdownComponents.jsx`** - Custom React components for rendering markdown elements with enhanced styling

### Custom Hooks

- **`useMarkdownFormatting.jsx`** - Hook that provides text formatting functions (bold, italic, code, headers, etc.)
- **`useMarkdownActions.jsx`** - Hook that handles file operations (upload, download, PDF export, copy, reset, help)

### Exports

- **`index.js`** - Barrel export file for clean imports

## Usage

The main MarkdownEditor page imports and uses these components like this:

```jsx
import Toolbar from "../components/MarkdownEditor/Toolbar";
import { markdownComponents } from "../components/MarkdownEditor/MarkdownComponents";
import EditorPanel from "../components/MarkdownEditor/EditorPanel";
import PreviewPanel from "../components/MarkdownEditor/PreviewPanel";
import { useMarkdownFormatting } from "../components/MarkdownEditor/useMarkdownFormatting";
import { useMarkdownActions } from "../components/MarkdownEditor/useMarkdownActions";
```

## Features Preserved

All original functionality has been maintained:

- ✅ Real-time markdown preview
- ✅ Text formatting toolbar (bold, italic, code, headers, lists, etc.)
- ✅ File upload/download functionality
- ✅ PDF export capability
- ✅ Copy to clipboard
- ✅ Fullscreen mode
- ✅ Keyboard shortcuts
- ✅ Responsive design
- ✅ Theme support
- ✅ Enhanced markdown components with custom styling
- ✅ Code syntax highlighting
- ✅ GitHub Flavored Markdown support

## Component Benefits

This modular structure provides:

1. **Better Maintainability** - Each component has a single responsibility
2. **Reusability** - Components can be reused in other parts of the application
3. **Testability** - Individual components can be tested in isolation
4. **Performance** - Better code splitting and optimization opportunities
5. **Developer Experience** - Easier to find and modify specific functionality

## File Organization

```
src/components/MarkdownEditor/
├── index.js                    # Barrel exports
├── Toolbar.jsx                 # Main toolbar component
├── EditorPanel.jsx             # Text editor panel
├── PreviewPanel.jsx            # Preview panel
├── MarkdownComponents.jsx      # Custom markdown renderers
├── useMarkdownFormatting.jsx   # Text formatting hook
├── useMarkdownActions.jsx      # File operations hook
└── README.md                   # This documentation
```
