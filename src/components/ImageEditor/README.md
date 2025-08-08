# ImageEditor Components

This directory contains all the components and hooks for the Image Editor feature.

## Components

- **Toolbar**: Main toolbar with upload, transformation, history, and export controls
- **ControlPanel**: Side panel with filter presets and adjustment sliders
- **EditorCanvas**: Canvas component for displaying and editing images
- **HelpSection**: Help documentation component

## Hooks

- **useImageTransforms**: Custom hook for image rotation and flipping operations
- **useImageActions**: Custom hook for file upload, download, and filter management

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

The components are designed to work together as a cohesive image editing interface, following the same patterns as other editor components in the project.
