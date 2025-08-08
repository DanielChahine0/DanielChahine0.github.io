# Code Playground Components

This directory contains the CodePlayground component architecture following the same pattern as the MarkdownEditor.

## Structure

### Components
- **`Toolbar.jsx`** - Main toolbar with actions, templates, and view controls
- **`EditorPanel.jsx`** - Code editor with syntax highlighting for HTML/CSS/JS
- **`PreviewPanel.jsx`** - Live preview iframe with responsive viewport controls
- **`SavedProjectsPanel.jsx`** - Panel for managing saved projects

### Hooks
- **`useCodePlaygroundActions.jsx`** - Custom hook for all playground actions (run, save, share, etc.)

### Data
- **`codeTemplates.js`** - Pre-built code templates for quick start

### Main Features
- **Live Preview** - Real-time code execution
- **Multiple Languages** - HTML, CSS, JavaScript support
- **Responsive Views** - Desktop, tablet, mobile preview modes
- **Project Management** - Save, load, delete projects
- **Templates** - Pre-built examples and starting points
- **Export/Share** - Download as HTML file or share via URL
- **Auto-run** - Optional automatic code execution
- **Error Handling** - JavaScript error display in preview

## Usage

```jsx
import { CodePlayground } from '../pages/CodePlayground';
// or
import { 
  Toolbar, 
  EditorPanel, 
  PreviewPanel, 
  SavedProjectsPanel,
  useCodePlaygroundActions,
  codeTemplates 
} from '../components/CodePlayground';
```

## Architecture Benefits

- **Modular Design** - Each component has a single responsibility
- **Reusable Components** - Components can be used independently
- **Custom Hooks** - Logic separation for better testing and reuse
- **Consistent Patterns** - Follows established MarkdownEditor structure
- **Easy Maintenance** - Clear file organization and separation of concerns
