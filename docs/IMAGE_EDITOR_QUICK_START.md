# Quick Start Guide - Enhanced Image Editor

## Getting Started

### 1. Upload an Image
- Click the **"Upload Image"** button
- Select any image file (JPG, PNG, GIF, WebP, HEIC)
- The image will automatically be added as the base layer

## Using the New Features

### Layer Management

#### View Layers
1. Click the **"Layers"** tab at the top
2. See all layers in your project
3. The base image layer is always present

#### Control Layer Visibility
- Click the **eye icon** (👁️) to show/hide a layer
- Hidden layers won't appear in the final image

#### Adjust Layer Opacity
1. Select a layer by clicking on it
2. Use the **opacity slider** that appears
3. 0% = invisible, 100% = fully opaque

#### Reorder Layers
- Click **up arrow** (↑) to move layer up in stack
- Click **down arrow** (↓) to move layer down in stack
- Top layers appear above bottom layers

#### Delete Layers
- Click the **trash icon** (🗑️) on any layer except the base image
- Confirm to remove the layer permanently

### Adding Text

#### Create Text Layer
1. Click the **"Text"** tab
2. Type your text in the input field
3. Press **Enter** or click the **"+"** button

#### Customize Text
Once a text layer is selected:

**Font & Size:**
- Choose from 8 different fonts
- Adjust size from 12px to 120px

**Styling:**
- Click **B** for bold
- Click **I** for italic
- Choose text alignment (left/center/right)

**Colors:**
- Pick text color using color picker
- Add stroke/outline:
  - Check "Add Stroke/Outline"
  - Choose stroke color
  - Adjust stroke width (1-10px)

#### Move Text
1. Select a text layer
2. Click and drag the text on the canvas
3. Position it wherever you want

### Drawing Tools

#### Access Drawing Tools
1. Click the **"Drawing"** tab
2. Optionally, add a new drawing layer from the Layers tab

#### Brush Tool (Freehand)
1. Select the **Brush** tool
2. Choose brush size (1-50px)
3. Pick a color
4. Adjust opacity if needed
5. Click and drag on the canvas to draw

#### Eraser Tool
1. Select the **Eraser** tool
2. Choose eraser size
3. Click and drag to erase drawn elements

#### Shape Tools

**Line:**
1. Select **Line** tool
2. Click starting point
3. Drag to end point
4. Release to create line

**Rectangle:**
1. Select **Rectangle** tool
2. Click and drag to define rectangle
3. Check "Fill Shape" for solid rectangle

**Circle:**
1. Select **Circle** tool
2. Click center point
3. Drag to define radius
4. Check "Fill Shape" for solid circle

**Triangle:**
1. Select **Triangle** tool
2. Click and drag to define size
3. Check "Fill Shape" for solid triangle

#### Drawing Settings
- **Brush Size:** How thick your lines are
- **Color:** Pick from color picker or presets
- **Opacity:** How transparent your drawing is
- **Fill:** Makes shapes solid vs outlined

#### Clear Drawing
- Click **"Clear All Drawing"** to remove everything on the drawing layer
- This only affects the active drawing layer

### Filters (Classic Features)

#### Apply Presets
1. Click the **"Filters"** tab
2. Choose a preset:
   - Vintage
   - Black & White
   - Vivid
   - Soft
   - Dramatic

#### Manual Adjustments
Use the sliders to fine-tune:
- **Brightness** - Make lighter or darker
- **Contrast** - Adjust light/dark difference
- **Saturation** - Color intensity
- **Hue** - Shift colors
- **Blur** - Soften image
- **Sepia** - Old photo effect
- **Grayscale** - Remove colors

### Saving Your Work

#### Download Image
1. Click the **"Download"** button in the toolbar
2. All visible layers will be merged
3. Image saves as PNG to your downloads folder

#### Layers in Final Image
- Only **visible layers** (👁️ icon showing) are included
- Layers are merged in order (bottom to top)
- Layer opacity is preserved

### Pro Tips

#### Workflow Best Practices
1. **Organize Layers** - Name them clearly, keep related items grouped
2. **Use Opacity** - Blend layers for cool effects
3. **Non-Destructive** - Keep original image, work in layers
4. **Save Often** - Download periodically to save progress

#### Drawing Tips
- **Smooth Lines** - Use slower strokes for smooth curves
- **Undo Available** - Use undo (toolbar) if you make a mistake
- **Preview Shapes** - See shape preview before releasing mouse
- **Color Presets** - Quick color changes with preset buttons

#### Text Tips
- **Readable Text** - Add stroke for text on busy backgrounds
- **Font Size** - Bigger is more readable on detailed images
- **Positioning** - Drag text to reposition any time
- **Contrast** - Use light text on dark images, dark text on light images

### Keyboard Shortcuts

- **Ctrl/Cmd + Z** - Undo (via toolbar)
- **Drag** - Move text layers
- **Mouse/Touch** - Draw on canvas

### Troubleshooting

#### Text Won't Move
- Make sure the text layer is **selected** (blue border)
- Click directly on the text to drag it

#### Drawing Not Showing
- Check that the drawing layer is **visible** (eye icon)
- Make sure **opacity** is above 0%
- Verify you're using the **Drawing** tab

#### Download Missing Layers
- Confirm all wanted layers have **eye icon** showing
- Hidden layers don't appear in downloads

#### Performance Issues
- **Reduce Canvas Size** - Work with smaller images
- **Fewer Layers** - Delete unused layers
- **Clear Unused** - Remove old drawing attempts

### Mobile Usage

The editor works on mobile devices with touch support:
- **Pinch to zoom** - Browser native zooming
- **Touch and drag** - Draw with finger
- **Tap to select** - Select layers and text
- **Note:** Some filters (hue, blur) have limited mobile support

### Getting Help

Look at the **"How to Use"** section at the bottom of the page for more guidance, or refer to the component README for technical details.

## Quick Reference

### Layer Order (Stack)
```
┌─────────────────┐
│   Top Layer     │ ← Appears on top
├─────────────────┤
│  Middle Layers  │
├─────────────────┤
│   Base Image    │ ← Background
└─────────────────┘
```

### Common Workflows

**Adding Logo/Watermark:**
1. Upload base image
2. Go to Text tab → Add text
3. Position text in corner
4. Adjust opacity to 50-70%
5. Download

**Drawing Annotations:**
1. Upload image
2. Layers tab → Add drawing layer
3. Drawing tab → Select brush/shapes
4. Draw annotations
5. Download

**Stylized Portrait:**
1. Upload photo
2. Filters tab → Apply "Soft" or "Vintage"
3. Text tab → Add name overlay
4. Adjust text stroke for contrast
5. Download

---

**Enjoy creating with the enhanced Image Editor!** 🎨✨
