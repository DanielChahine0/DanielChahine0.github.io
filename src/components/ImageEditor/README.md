# Image Editor Components

Last Updated: August 23, 2025

## Overview
This directory contains a full-featured image editing interface with real-time previews, filters, and transformations.

## Components
- **`Toolbar.jsx`** - Upload, transform, history, and export controls
- **`ControlPanel.jsx`** - Filter presets and adjustment sliders
- **`EditorCanvas.jsx`** - Interactive canvas for image manipulation
- **`HelpSection.jsx`** - Contextual help and keyboard shortcuts

## Custom Hooks
- **`useImageTransforms.js`** - Image rotation, flipping, and scaling
- **`useImageActions.js`** - File operations and filter management

## Features
- Image upload/download
- Filters and adjustments
- Transformation controls
- History/undo support
- Keyboard shortcuts
- Touch gestures support

## Usage
```jsx
import { 
  Toolbar, 
  ControlPanel, 
  EditorCanvas, 
  HelpSection,
  useImageTransforms,
  useImageActions 
} from '@/components/ImageEditor';
```

## Architecture
The components follow a modular design pattern for easy maintenance and testing, integrating with the project's shared UI components and hooks.
