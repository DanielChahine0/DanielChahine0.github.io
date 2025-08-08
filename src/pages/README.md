# Pages

Page components representing different routes in the portfolio application.

**Built with:** React Router, Framer Motion, various specialized libraries

## Documentation Navigation
- [⬆️ Main README](../../README.md) - Project overview and features
- [⬆️ Source Overview](../README.md) - Source code structure

## Core Pages

• `Home.jsx` - Main portfolio landing page (`/`)
• `Timeline.jsx` - Professional timeline (`/timeline`) 
• `Tools.jsx` - Interactive tools showcase (`/tools`)
• `NotFound.jsx` - 404 error page (`*`)

## Interactive Tools

**Development:**
• `CodePlayground.jsx` - Online code editor with live preview
• `MarkdownEditor.jsx` - Real-time markdown editing
• `TextAnalyzer.jsx` - Text analysis and statistics

**Utilities:**
• `CalorieTracker.jsx` - Nutrition tracking
• `ColorPicker.jsx` - Color selection utility
• `ClockTimer.jsx` - Clock, timer, and stopwatch

**Creative:**
• `ImageEditor.jsx` - Basic image manipulation
• `ResumeBuilder.jsx` - Interactive resume creation
• `PortfolioGenerator.jsx` - Template-based portfolio builder
• `LifeInWeeks.jsx` - Life timeline visualization

## Tool Details

#### `CodePlayground.jsx`
Online code editor with live preview (`/tools/code-playground`)
- HTML, CSS, JavaScript editing with real-time preview
- Multiple viewport modes and template library
- Project save/load and export functionality

#### `ColorPicker.jsx`
Color selection and palette tool (`/tools/color-picker`)
- HSL/RGB/HEX color selection with palette generation
- Accessibility contrast checking and export formats

#### `ImageEditor.jsx`
Basic image manipulation tool (`/tools/image-editor`)
- Image upload, filters, and transform operations
- Real-time canvas rendering with undo/redo functionality

#### `PortfolioGenerator.jsx`
Template-based portfolio builder (`/tools/portfolio-generator`)
- Multiple design templates with customizable themes
- Export to complete HTML website

#### `ResumeBuilder.jsx`
Interactive resume creation tool (`/tools/resume-builder`)
- Professional sections with real-time preview
- Export functionality with print-ready design

---

## Key Technologies

**Core:**
- React 19, React Router, Framer Motion
- Route-based code splitting with React.lazy
- Local storage for data persistence

**Specialized:**
- Canvas API for image processing
- File API for uploads/exports
- Crypto API for secure generation
- `date-fns` for date manipulation
- `highlight.js` for syntax highlighting

---

## Common Features

- Consistent navigation and theme support
- Dark/light mode compatibility
- Responsive design patterns
- Accessibility compliance
- Performance optimization with lazy loading

---

## Future Enhancements

**Additional Tools:**
- QR Code Generator
- URL Shortener
- JSON Formatter
- Base64 Encoder/Decoder
- Hash Generator

**Improvements:**
- Enhanced analytics and offline support
- TypeScript migration
- Comprehensive testing coverage
