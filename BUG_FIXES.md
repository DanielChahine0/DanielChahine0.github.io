# Bug Fixes - Image Editor Enhancement

## Date: October 10, 2025

## Summary
Fixed multiple critical bugs in the Image Editor layer system, drawing functionality, and state management.

---

## Bugs Fixed

### 1. ❌ **Stale Closure Bug in Image Upload**
**Problem:**
```javascript
const handleImageUpload = useCallback(async (event) => {
  await originalHandleImageUpload(event);
  setTimeout(() => {
    if (image) {  // ❌ Stale closure - always uses old image value
      addImageLayer(image);
    }
  }, 100);
}, [originalHandleImageUpload, image, addImageLayer]);
```

**Impact:** 
- Layer wouldn't be created on first image upload
- Would create layer for previous image when uploading new one

**Fix:**
Simplified to use the original handler and moved layer creation to a separate effect:
```javascript
const handleImageUpload = useCallback((event) => {
  originalHandleImageUpload(event);
}, [originalHandleImageUpload]);

// Separate effect for layer initialization
useEffect(() => {
  if (image && layers.length === 0) {
    addImageLayer(image);
  }
}, [image, layers.length, addImageLayer]);
```

---

### 2. ❌ **Infinite Loop in useEffect**
**Problem:**
```javascript
useEffect(() => {
  if (image) {
    drawImageToCanvas(image);
    if (layers.length === 0) {
      addImageLayer(image);  // ❌ Causes effect to re-run
    }
  }
}, [filters, image, drawImageToCanvas, supportsCanvasFilters, toast, layers.length, addImageLayer]);
```

**Impact:**
- Potential infinite loop when adding layers
- Effect dependencies included `addImageLayer` which could trigger re-renders

**Fix:**
Split into two separate effects with correct dependencies:
```javascript
// Effect 1: Initialize layer when image loads
useEffect(() => {
  if (image && layers.length === 0) {
    addImageLayer(image);
  }
}, [image, layers.length, addImageLayer]);

// Effect 2: Redraw canvas on filter/image changes
useEffect(() => {
  if (image) {
    drawImageToCanvas(image);
    // Mobile notice logic...
  }
}, [filters, image, drawImageToCanvas, supportsCanvasFilters, toast]);
```

---

### 3. ❌ **Stale State in deleteLayer**
**Problem:**
```javascript
const deleteLayer = useCallback((layerId) => {
  setLayers(prev => prev.filter(layer => layer.id !== layerId));
  if (activeLayerId === layerId) {
    setActiveLayerId(layers.find(l => l.id !== layerId)?.id || null);  // ❌ Uses stale layers
  }
}, [activeLayerId, layers]);  // ❌ layers in dependencies
```

**Impact:**
- Could set wrong active layer after deletion
- Used stale `layers` state instead of filtered result

**Fix:**
Use functional state update pattern:
```javascript
const deleteLayer = useCallback((layerId) => {
  setLayers(prev => {
    const filtered = prev.filter(layer => layer.id !== layerId);
    // Update active layer if deleted
    if (activeLayerId === layerId) {
      const newActiveLayer = filtered.find(l => l.type === 'image') || filtered[0];
      setActiveLayerId(newActiveLayer?.id || null);
    }
    return filtered;
  });
}, [activeLayerId]);  // ✅ Removed layers dependency
```

---

### 4. ❌ **Stale State in updateDrawingLayer**
**Problem:**
```javascript
const updateDrawingLayer = useCallback((dataUrl) => {
  const drawingLayer = layers.find(l => l.type === 'drawing' && l.id === activeLayerId);  // ❌ Stale layers
  if (drawingLayer) {
    setLayers(prev => prev.map(layer => 
      layer.id === activeLayerId ? { ...layer, dataUrl } : layer
    ));
  }
}, [activeLayerId, layers]);  // ❌ layers in dependencies
```

**Impact:**
- Drawing updates might fail with stale layer check
- Unnecessary re-renders from layers dependency

**Fix:**
Simplified to use only the state updater:
```javascript
const updateDrawingLayer = useCallback((dataUrl) => {
  if (!activeLayerId) return;
  setLayers(prev => prev.map(layer => 
    layer.id === activeLayerId && layer.type === 'drawing' 
      ? { ...layer, dataUrl } 
      : layer
  ));
}, [activeLayerId]);  // ✅ Removed layers dependency
```

---

### 5. ❌ **Stale State in clearDrawing**
**Problem:**
```javascript
const clearDrawing = useCallback(() => {
  const drawingLayer = layers.find(l => l.type === 'drawing' && l.id === activeLayerId);  // ❌ Stale layers
  if (drawingLayer) {
    setLayers(prev => prev.map(layer => 
      layer.id === activeLayerId ? { ...layer, dataUrl: null } : layer
    ));
  }
}, [activeLayerId, layers]);  // ❌ layers in dependencies
```

**Impact:**
- Clear drawing might fail with stale layer check
- Unnecessary re-renders

**Fix:**
Same pattern as updateDrawingLayer:
```javascript
const clearDrawing = useCallback(() => {
  if (!activeLayerId) return;
  setLayers(prev => prev.map(layer => 
    layer.id === activeLayerId && layer.type === 'drawing' 
      ? { ...layer, dataUrl: null } 
      : layer
  ));
}, [activeLayerId]);  // ✅ Removed layers dependency
```

---

### 6. ❌ **Drawing Without Active Drawing Layer**
**Problem:**
```javascript
const startDrawing = useCallback((e) => {
  if (!drawingCanvasRef.current) return;
  // ❌ No check if active layer is a drawing layer
  const coords = getCanvasCoordinates(e, drawingCanvasRef.current);
  setIsDrawing(true);
  // ... drawing logic
}, [activeTool, drawingSettings, getCanvasCoordinates]);
```

**Impact:**
- Could draw even when text or image layer is active
- Drawings wouldn't be associated with any layer

**Fix:**
Added layer type validation:
```javascript
const startDrawing = useCallback((e) => {
  if (!drawingCanvasRef.current || !activeLayerId) return;
  
  // Check if active layer is a drawing layer
  const activeLayer = layers.find(l => l.id === activeLayerId);
  if (!activeLayer || activeLayer.type !== 'drawing') return;
  
  // ... rest of drawing logic
}, [activeTool, drawingSettings, getCanvasCoordinates, activeLayerId, layers]);
```

---

### 7. ❌ **Drawing Canvas Not Showing Existing Drawings**
**Problem:**
- When switching between drawing layers, the canvas wouldn't show existing drawings
- Drawing canvas was not synced with layer data

**Impact:**
- User couldn't see what they previously drew on a layer
- Editing existing drawings was impossible

**Fix:**
Added effect to load drawing layer data:
```javascript
// Load existing drawing when active layer changes
useEffect(() => {
  if (!drawingCanvasRef.current || !activeLayerId) return;
  
  const activeLayer = layers.find(l => l.id === activeLayerId);
  if (!activeLayer || activeLayer.type !== 'drawing') return;
  
  const ctx = drawingCanvasRef.current.getContext('2d');
  ctx.clearRect(0, 0, drawingCanvasRef.current.width, drawingCanvasRef.current.height);
  
  if (activeLayer.dataUrl) {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
    img.src = activeLayer.dataUrl;
  }
}, [activeLayerId, layers]);
```

---

### 8. ❌ **Text Dragging Limited by Tool Selection**
**Problem:**
```javascript
const handleTextMouseDown = useCallback((e, textLayer) => {
  if (activeTool !== 'select' && activeTool !== 'brush') return;  // ❌ Restrictive
  // ... drag logic
}, [activeTool, getCanvasCoordinates, mainCanvasRef]);
```

**Impact:**
- Text could only be dragged when specific tools were active
- Poor UX - users expect to always drag text

**Fix:**
Removed tool restriction and added event propagation control:
```javascript
const handleTextMouseDown = useCallback((e, textLayer) => {
  e.stopPropagation();  // Prevent canvas drawing
  e.preventDefault();
  
  // ... drag logic works with any tool
}, [getCanvasCoordinates, mainCanvasRef]);
```

---

## Testing Checklist

After fixes, verify:
- [x] ✅ Image uploads and creates base layer
- [x] ✅ Multiple images can be uploaded sequentially
- [x] ✅ Layers can be deleted without errors
- [x] ✅ Drawing only works on drawing layers
- [x] ✅ Existing drawings load when layer is selected
- [x] ✅ Clear drawing works correctly
- [x] ✅ Text can be dragged regardless of active tool
- [x] ✅ No console errors during normal operation
- [x] ✅ No infinite loops or performance issues
- [x] ✅ ESLint passes (0 errors)

---

## Code Quality Improvements

### Before Fixes:
- Multiple stale closure bugs
- Incorrect dependency arrays
- Potential infinite loops
- Inconsistent state management

### After Fixes:
- ✅ All callbacks use correct dependencies
- ✅ Functional state updates where needed
- ✅ Proper effect separation
- ✅ Layer validation before operations
- ✅ No stale state references
- ✅ Clean ESLint report

---

## Performance Impact

### Improvements:
1. **Reduced Re-renders** - Removed unnecessary dependencies
2. **No Infinite Loops** - Fixed effect dependencies
3. **Better State Management** - Functional updates prevent stale reads
4. **Cleaner Code** - Easier to maintain and debug

---

## Developer Notes

### Key Patterns Applied:

1. **Functional State Updates:**
```javascript
// ❌ Bad - uses stale state
setLayers(layers.filter(...));

// ✅ Good - uses latest state
setLayers(prev => prev.filter(...));
```

2. **Effect Dependency Management:**
```javascript
// ❌ Bad - includes functions that might change
useEffect(() => {}, [func1, func2, stateVar]);

// ✅ Good - minimal, stable dependencies
useEffect(() => {}, [stateVar]);
```

3. **Early Return Validation:**
```javascript
// ✅ Validate before proceeding
if (!activeLayerId) return;
const layer = layers.find(l => l.id === activeLayerId);
if (!layer || layer.type !== 'drawing') return;
```

---

## Conclusion

All critical bugs have been identified and fixed. The Image Editor now has:
- Stable state management
- Proper layer handling
- Reliable drawing functionality
- Better user experience
- Clean code that passes linting

**Status:** ✅ All bugs resolved and tested
