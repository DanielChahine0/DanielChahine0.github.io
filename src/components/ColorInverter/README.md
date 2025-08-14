# Color Inverter Component

A comprehensive React component for inverting colors in images while preserving transparency and providing a user-friendly interface.

## Features

### ✨ Core Functionality
- **Color Inversion**: Automatically inverts RGB colors (black ↔ white)
- **Transparency Preservation**: Maintains alpha channel for PNG files
- **Batch Processing**: Upload and process multiple images simultaneously
- **Format Support**: PNG and JPEG files (up to 10MB each)

### 🚀 Performance
- **Web Workers**: Uses Web Workers for non-blocking image processing
- **Canvas Fallback**: Automatic fallback for older browsers
- **Optimized Processing**: Efficient pixel manipulation algorithms

### 🎨 User Experience
- **Drag & Drop**: Intuitive drag-and-drop file upload
- **Live Preview**: Side-by-side before/after comparison
- **Zoom Controls**: Zoom in/out for detailed inspection
- **Batch Download**: Download individual files or all as ZIP

### 📱 Responsive Design
- **Mobile Friendly**: Optimized for mobile devices
- **Touch Support**: Touch-friendly controls and interactions
- **Accessibility**: WCAG compliant with proper ARIA labels

## Component Structure

```
ColorInverter/
├── index.js                 # Main exports
├── ImageUploader.jsx        # File upload interface
├── ImagePreview.jsx         # Before/after preview
├── ProcessedImageGrid.jsx   # Results grid display
└── useImageProcessor.jsx    # Core processing logic
```

## Usage

```jsx
import ColorInverter from './pages/ColorInverter';

// The component is self-contained and handles all state internally
<ColorInverter />
```

## Technical Implementation

### Image Processing Algorithm
```javascript
// For each pixel (R, G, B, A):
newR = 255 - originalR
newG = 255 - originalG  
newB = 255 - originalB
newA = originalA // Alpha preserved
```

### Web Worker Processing
- Uses `OffscreenCanvas` for background processing
- Fallback to main thread canvas for compatibility
- Processes multiple images in sequence to avoid memory issues

### File Handling
- Validates file types and sizes before processing
- Creates object URLs for preview
- Proper cleanup of object URLs to prevent memory leaks

## Browser Compatibility

- **Modern Browsers**: Full Web Worker support with OffscreenCanvas
- **Legacy Browsers**: Canvas fallback with main thread processing
- **Mobile**: Optimized touch interactions and responsive design

## Error Handling

- File validation (type, size)
- Processing error recovery
- User-friendly error messages
- Graceful degradation for unsupported features

## Accessibility Features

- Keyboard navigation support
- Screen reader friendly
- High contrast mode compatibility
- Focus management for modal interactions

## Future Enhancements

- [ ] Additional color manipulation options (brightness, contrast)
- [ ] Custom color mapping
- [ ] Batch resize functionality
- [ ] Cloud storage integration
- [ ] Image format conversion

## Dependencies

- React 18+
- Framer Motion (animations)
- Lucide React (icons)
- Canvas API (image processing)
- Web Workers (performance)
