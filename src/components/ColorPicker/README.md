# Color Picker Components

Last Updated: August 24, 2025

## Overview
A professional color selection and harmony tool for designers and developers.

## Structure

### Components
- **`ColorStudio.jsx`** - Main color picker interface
- **`ColorSwatch.jsx`** - Individual color display
- **`ColorHarmony.jsx`** - Color scheme generator
- **`PopularPalettes.jsx`** - Preset color combinations
- **`SavedPalette.jsx`** - User-saved color collections
- **`IconButton.jsx`** - Reusable color action button

### Utils
- **`colorUtils.js`** - Color conversion and manipulation
- **`colorPalettes.js`** - Predefined color schemes

## Key Features
- RGB/HSL/HEX support
- Color harmonies
- Palette generation
- Accessibility checking
- Color conversion
- Save/export palettes
- Popular presets
- Contrast analysis

## Usage Example
```jsx
import { 
  ColorStudio, 
  ColorHarmony, 
  SavedPalette 
} from '@/components/ColorPicker';

function ColorDesigner() {
  const [selectedColor, setSelectedColor] = useState('#000000');
  
  return (
    <div className="color-designer">
      <ColorStudio 
        color={selectedColor} 
        onChange={setSelectedColor} 
      />
      <ColorHarmony baseColor={selectedColor} />
      <SavedPalette />
    </div>
  );
}
```

## Technical Details
- Color space conversions
- WCAG contrast calculations
- Local storage for palettes
- Copy to clipboard
- Export formats (CSS, SCSS)
- Real-time preview
