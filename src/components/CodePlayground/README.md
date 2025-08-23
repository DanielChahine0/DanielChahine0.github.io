# Code Playground Components

Last Updated: August 23, 2025

## Overview
A feature-rich code editor and live preview environment for HTML, CSS, and JavaScript development.

## Structure

### Components
- **`Toolbar.jsx`** - Project actions and view controls
- **`EditorPanel.jsx`** - Monaco-based code editor with syntax highlighting
- **`PreviewPanel.jsx`** - Responsive live preview with device frames
- **`SavedProjectsPanel.jsx`** - Project management interface

### Logic
- **`useCodePlaygroundActions.jsx`** - Playground state and actions hook
- **`codeTemplates.js`** - Starter templates and examples

## Key Features
- Real-time preview
- Multi-language support
- Device preview modes
- Project persistence
- Code templates
- Error handling
- Export/sharing
- Auto-execution
- Console output

## Usage Example
```jsx
import { 
  Toolbar, 
  EditorPanel, 
  PreviewPanel, 
  SavedProjectsPanel,
  useCodePlaygroundActions 
} from '@/components/CodePlayground';

function CodePlayground() {
  const { code, setCode, runCode, saveProject } = useCodePlaygroundActions();
  
  return (
    <div className="code-playground">
      <Toolbar onRun={runCode} onSave={saveProject} />
      <div className="editor-preview-layout">
        <EditorPanel code={code} onChange={setCode} />
        <PreviewPanel />
      </div>
    </div>
  );
}
```

## Technical Details
- Monaco Editor integration
- Sandboxed preview iframe
- Local storage persistence
- Debounced auto-run
- Error boundary protection
