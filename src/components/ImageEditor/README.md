# Image Editor Components

Last Updated: October 10, 2025

## Overview
This directory contains a full-featured image editing interface with real-time previews, filters, transformations, **layer system, text overlays, and drawing tools**.

## Components

### Core Components
- **`Toolbar.jsx`** - Upload, transform, history, and export controls
- **`ControlPanel.jsx`** - Filter presets and adjustment sliders
- **`EditorCanvas.jsx`** - Basic canvas for image manipulation (legacy)
- **`EnhancedEditorCanvas.jsx`** - ⭐ Advanced canvas with multi-layer support, drawing, and text
- **`HelpSection.jsx`** - Contextual help and usage guide

### Layer System
- **`LayerPanel.jsx`** - ⭐ Manage multiple layers (image, text, drawing)
  - Layer visibility toggles
  - Layer reordering (move up/down)
  - Layer opacity control
  - Layer deletion

### Text Tools
- **`TextToolPanel.jsx`** - ⭐ Add and customize text overlays
  - Custom text input
  - Font family selection (8+ fonts)
  - Font size, color, and opacity
  - Text styling (bold, italic)
  - Text alignment (left, center, right)
  - Stroke/outline options
  - Drag-to-reposition text layers

### Drawing Tools
- **`DrawingToolPanel.jsx`** - ⭐ Professional drawing interface
  - **Brush tool** - Freehand drawing
  - **Eraser tool** - Remove drawn elements
  - **Shape tools** - Lines, rectangles, circles, triangles
  - **Customization** - Brush size, color, opacity
  - **Fill option** - Filled or outlined shapes
  - **Preset colors** - Quick color selection

## Custom Hooks
- **`useImageTransforms.js`** - Image rotation, flipping, and scaling
- **`useImageActions.js`** - File operations and filter management

## Features

### Image Editing
- Image upload/download (JPG, PNG, GIF, WebP, HEIC)
- Real-time filter adjustments
- Transformation controls (rotate, flip)
- History/undo support
- Fullscreen mode
- Mobile-optimized filters

### Layer System (NEW)
- Multiple layer support (image, text, drawing)
- Layer visibility management
- Layer opacity control
- Layer reordering
- Isolated editing per layer

### Text Overlays (NEW)
- Add custom text with drag-to-position
- Font customization (family, size, style)
- Color and opacity control
- Text stroke/outline effects
- Real-time preview

### Drawing Tools (NEW)
- Freehand brush drawing
- Shape creation (lines, rectangles, circles, triangles)
- Eraser tool
- Customizable brush settings
- Fill options for shapes
- Color picker with presets

## Usage

### Basic Import
```jsx
import { 
  Toolbar, 
  ControlPanel, 
  EnhancedEditorCanvas,
  LayerPanel,
  TextToolPanel,
  DrawingToolPanel,
  HelpSection,
  useImageTransforms,
  useImageActions 
} from '@/components/ImageEditor';
```

### Panel Modes
The editor supports four main panels:
1. **Filters** - Adjust image filters and presets
2. **Layers** - Manage layer stack and visibility
3. **Text** - Add and customize text overlays
4. **Drawing** - Draw shapes and freehand

### Download Behavior
When downloading, all visible layers are merged:
1. Base image with filters
2. Drawing layers
3. Text overlays

Final output is a flattened PNG with all layers combined.

## Architecture
The components follow a modular design pattern with:
- **Separation of concerns** - Each tool in its own component
- **Layer-based editing** - Non-destructive editing workflow
- **Canvas composition** - Multiple canvases for different purposes
- **Event-driven updates** - Efficient re-rendering

## Performance Considerations
- Canvas operations are optimized for smooth drawing
- Layer rendering is conditional based on visibility
- Text layers use DOM for easier interaction
- Drawing uses temporary overlay canvas for previews

## Mobile Compatibility
- Touch gestures supported for drawing
- Responsive layout adapts to screen size
- Filter fallbacks for limited browser support
- Optimized canvas sizing for mobile devices
