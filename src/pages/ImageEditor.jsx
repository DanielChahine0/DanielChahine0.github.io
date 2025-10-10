import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Footer } from '../components/Footer';
import { NavBar } from '../components/NavBar';
import { PageTransition } from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Layers as LayersIcon, Type, PenTool } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
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
} from '../components/ImageEditor';

export default function ImageEditor() {
  const { toast } = useToast();
  const [image, setImage] = useState(null);
  const [_originalImage, setOriginalImage] = useState(null);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    blur: 0,
    sepia: 0,
    grayscale: 0
  });
  
  // Layer system state
  const [layers, setLayers] = useState([]);
  const [activeLayerId, setActiveLayerId] = useState(null);
  const [layerIdCounter, setLayerIdCounter] = useState(1);
  
  // Drawing tools state
  const [activeTool, setActiveTool] = useState('brush');
  const [drawingSettings, setDrawingSettings] = useState({
    brushSize: 5,
    color: '#000000',
    opacity: 1,
    fill: false
  });
  
  // UI state
  const [activePanel, setActivePanel] = useState('filters'); // 'filters', 'layers', 'text', 'drawing'
  
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  const addToHistory = useCallback((imageData) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // Layer management functions
  const addImageLayer = useCallback((img) => {
    const newLayer = {
      id: layerIdCounter,
      type: 'image',
      name: 'Image Layer',
      visible: true,
      opacity: 100,
      image: img
    };
    setLayers([newLayer]);
    setActiveLayerId(newLayer.id);
    setLayerIdCounter(prev => prev + 1);
  }, [layerIdCounter]);

  const addTextLayer = useCallback((textConfig) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newLayer = {
      id: layerIdCounter,
      type: 'text',
      name: `Text ${layerIdCounter}`,
      visible: true,
      opacity: 100,
      x: canvas.width / 2 - 100,
      y: canvas.height / 2,
      ...textConfig
    };
    setLayers(prev => [...prev, newLayer]);
    setActiveLayerId(newLayer.id);
    setLayerIdCounter(prev => prev + 1);
  }, [layerIdCounter]);

  const addDrawingLayer = useCallback(() => {
    const newLayer = {
      id: layerIdCounter,
      type: 'drawing',
      name: `Drawing ${layerIdCounter}`,
      visible: true,
      opacity: 100,
      dataUrl: null
    };
    setLayers(prev => [...prev, newLayer]);
    setActiveLayerId(newLayer.id);
    setLayerIdCounter(prev => prev + 1);
    setActivePanel('drawing');
    toast({
      title: "Drawing Layer Added",
      description: "Use the drawing tools to create on this layer.",
    });
  }, [layerIdCounter, toast]);

  const updateLayerOpacity = useCallback((layerId, opacity) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, opacity } : layer
    ));
  }, []);

  const toggleLayerVisibility = useCallback((layerId) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  }, []);

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
  }, [activeLayerId]);

  const moveLayer = useCallback((layerId, direction) => {
    setLayers(prev => {
      const index = prev.findIndex(l => l.id === layerId);
      if (index === -1) return prev;
      
      const newLayers = [...prev];
      if (direction === 'up' && index < newLayers.length - 1) {
        [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
      } else if (direction === 'down' && index > 0) {
        [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]];
      }
      return newLayers;
    });
  }, []);

  const updateTextLayer = useCallback((updates) => {
    if (!activeLayerId) return;
    setLayers(prev => prev.map(layer => 
      layer.id === activeLayerId && layer.type === 'text' 
        ? { ...layer, ...updates } 
        : layer
    ));
  }, [activeLayerId]);

  const moveTextLayer = useCallback((layerId, position) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId && layer.type === 'text' 
        ? { ...layer, x: position.x, y: position.y } 
        : layer
    ));
  }, []);

  const updateDrawingLayer = useCallback((dataUrl) => {
    if (!activeLayerId) return;
    setLayers(prev => prev.map(layer => 
      layer.id === activeLayerId && layer.type === 'drawing' 
        ? { ...layer, dataUrl } 
        : layer
    ));
  }, [activeLayerId]);

  const clearDrawing = useCallback(() => {
    if (!activeLayerId) return;
    setLayers(prev => prev.map(layer => 
      layer.id === activeLayerId && layer.type === 'drawing' 
        ? { ...layer, dataUrl: null } 
        : layer
    ));
  }, [activeLayerId]);

  // Listen for layer opacity changes from LayerPanel
  useEffect(() => {
    const handleOpacityChange = (e) => {
      updateLayerOpacity(e.detail.layerId, e.detail.opacity);
    };
    window.addEventListener('layerOpacityChange', handleOpacityChange);
    return () => window.removeEventListener('layerOpacityChange', handleOpacityChange);
  }, [updateLayerOpacity]);

  // Utility function to detect if browser supports canvas filters
  const supportsCanvasFilters = useCallback(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.filter = 'brightness(1)';
    return ctx.filter !== 'none';
  }, []);

  // Manual filter application for mobile compatibility
  const applyFiltersManually = useCallback((ctx, _imageData, activeFilters) => {
  const data = _imageData.data;
    const brightness = activeFilters.brightness / 100;
    const contrast = activeFilters.contrast / 100;
    const saturation = activeFilters.saturation / 100;
    const sepia = activeFilters.sepia / 100;
    const grayscale = activeFilters.grayscale / 100;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // Apply brightness
      r *= brightness;
      g *= brightness;
      b *= brightness;

      // Apply contrast
      r = ((r / 255 - 0.5) * contrast + 0.5) * 255;
      g = ((g / 255 - 0.5) * contrast + 0.5) * 255;
      b = ((b / 255 - 0.5) * contrast + 0.5) * 255;

      // Apply saturation
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      r = gray + saturation * (r - gray);
      g = gray + saturation * (g - gray);
      b = gray + saturation * (b - gray);

      // Apply sepia
      if (sepia > 0) {
        const sepiaR = (r * 0.393) + (g * 0.769) + (b * 0.189);
        const sepiaG = (r * 0.349) + (g * 0.686) + (b * 0.168);
        const sepiaB = (r * 0.272) + (g * 0.534) + (b * 0.131);
        
        r = r * (1 - sepia) + sepiaR * sepia;
        g = g * (1 - sepia) + sepiaG * sepia;
        b = b * (1 - sepia) + sepiaB * sepia;
      }

      // Apply grayscale
      if (grayscale > 0) {
        const grayValue = 0.299 * r + 0.587 * g + 0.114 * b;
        r = r * (1 - grayscale) + grayValue * grayscale;
        g = g * (1 - grayscale) + grayValue * grayscale;
        b = b * (1 - grayscale) + grayValue * grayscale;
      }

      // Clamp values
      data[i] = Math.max(0, Math.min(255, r));
      data[i + 1] = Math.max(0, Math.min(255, g));
      data[i + 2] = Math.max(0, Math.min(255, b));
    }

    ctx.putImageData(_imageData, 0, 0);
  }, []);

  const drawImageToCanvas = useCallback((img, customFilters = null) => {
    console.log('🎨 [CANVAS] drawImageToCanvas called');
    const canvas = canvasRef.current;
    
    if (!canvas || !img) {
      console.error('❌ [CANVAS] Canvas or image not ready:', { 
        canvas: !!canvas, 
        canvasRef: canvasRef,
        img: !!img,
        imgDimensions: img ? { width: img.width, height: img.height } : null
      });
      return;
    }
    
    console.log('✅ [CANVAS] Canvas and image ready');

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('❌ [CANVAS] Could not get canvas context');
      return;
    }
    
    console.log('✅ [CANVAS] Canvas context obtained');
    
    // Calculate dimensions to fit canvas while maintaining aspect ratio
    // Use larger dimensions to fill the available space
    const maxWidth = 1200;
    const maxHeight = 800;
    let { width, height } = img;
    
    console.log('🎨 [CANVAS] Original dimensions:', { width, height });
    
    if (width > maxWidth) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    }
    if (height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }
    
    console.log('🎨 [CANVAS] Calculated canvas dimensions:', { width, height });
    
    canvas.width = width;
    canvas.height = height;
    
    console.log('✅ [CANVAS] Canvas dimensions set');

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    console.log('✅ [CANVAS] Canvas cleared');
    
    // Log canvas visibility
    console.log('🎨 [CANVAS] Canvas visibility check:', {
      canvasDisplay: window.getComputedStyle(canvas).display,
      canvasVisibility: window.getComputedStyle(canvas).visibility,
      canvasOpacity: window.getComputedStyle(canvas).opacity,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      canvasOffsetWidth: canvas.offsetWidth,
      canvasOffsetHeight: canvas.offsetHeight
    });

    const activeFilters = customFilters || filters;
    console.log('🎨 [CANVAS] Active filters:', activeFilters);
    
    // Check if we need any filters
    const hasFilters = activeFilters.brightness !== 100 || 
                      activeFilters.contrast !== 100 || 
                      activeFilters.saturation !== 100 || 
                      activeFilters.hue !== 0 || 
                      activeFilters.blur !== 0 || 
                      activeFilters.sepia !== 0 || 
                      activeFilters.grayscale !== 0;

    // Draw image first
    console.log('🎨 [CANVAS] Drawing image to canvas...');
    try {
      ctx.drawImage(img, 0, 0, width, height);
      console.log('✅ [CANVAS] Image drawn successfully');
    } catch (error) {
      console.error('❌ [CANVAS] Error drawing image:', error);
      return;
    }

    if (hasFilters) {
      console.log('🎨 [CANVAS] Applying filters...');
      // Try CSS filters first (works on desktop)
      if (supportsCanvasFilters() && activeFilters.hue === 0 && activeFilters.blur === 0) {
        console.log('🎨 [CANVAS] Using manual filter application');
        // For simple filters that work well with manual application
        const canvasImageData = ctx.getImageData(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        applyFiltersManually(ctx, canvasImageData, activeFilters);
      } else if (supportsCanvasFilters()) {
        console.log('🎨 [CANVAS] Using CSS filters');
        // Use CSS filters for complex effects like hue and blur
        ctx.clearRect(0, 0, width, height);
        ctx.filter = `
          brightness(${activeFilters.brightness}%)
          contrast(${activeFilters.contrast}%)
          saturate(${activeFilters.saturation}%)
          hue-rotate(${activeFilters.hue}deg)
          blur(${activeFilters.blur}px)
          sepia(${activeFilters.sepia}%)
          grayscale(${activeFilters.grayscale}%)
        `;
        ctx.drawImage(img, 0, 0, width, height);
        ctx.filter = 'none';
      } else {
        console.log('🎨 [CANVAS] Using mobile fallback filters');
        // Fallback for mobile: manual filter application
        const canvasImageData = ctx.getImageData(0, 0, width, height);
        applyFiltersManually(ctx, canvasImageData, activeFilters);
      }
      console.log('✅ [CANVAS] Filters applied');
    } else {
      console.log('ℹ️ [CANVAS] No filters to apply');
    }
    
    console.log('✅ [CANVAS] drawImageToCanvas complete!');
  }, [filters, supportsCanvasFilters, applyFiltersManually]);

  // Use custom hooks
  const {
    rotateLeft,
    rotateRight,
    flipHorizontal,
    flipVertical
  } = useImageTransforms(image, setImage, addToHistory, setIsProcessing);

  const {
    handleImageUpload: originalHandleImageUpload,
    downloadImage: _originalDownloadImage,
    resetFilters,
    applyPreset
  } = useImageActions(
    image, 
    setImage, 
    setOriginalImage,
    setFilters,
    addToHistory,
    canvasRef,
    drawImageToCanvas,
    toast
  );

  // Wrap image upload to initialize layer system
  const handleImageUpload = useCallback((event) => {
    originalHandleImageUpload(event);
  }, [originalHandleImageUpload]);

  // Enhanced download that merges all layers
  const downloadImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary canvas to merge all layers
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const ctx = tempCanvas.getContext('2d');

    // Draw main image with filters
    ctx.drawImage(canvas, 0, 0);

    // Draw all visible layers
    layers.forEach(layer => {
      if (!layer.visible) return;
      
      ctx.globalAlpha = layer.opacity / 100;
      
      if (layer.type === 'drawing' && layer.dataUrl) {
        const img = new Image();
        img.src = layer.dataUrl;
        ctx.drawImage(img, 0, 0);
      } else if (layer.type === 'text') {
        ctx.font = `${layer.fontStyle} ${layer.fontWeight} ${layer.fontSize}px ${layer.fontFamily}`;
        ctx.fillStyle = layer.color;
        ctx.textAlign = layer.textAlign;
        
        if (layer.stroke) {
          ctx.strokeStyle = layer.strokeColor;
          ctx.lineWidth = layer.strokeWidth;
          ctx.strokeText(layer.text, layer.x, layer.y);
        }
        ctx.fillText(layer.text, layer.x, layer.y);
      }
    });

    ctx.globalAlpha = 1;

    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = tempCanvas.toDataURL();
    link.click();

    toast({
      title: "Success",
      description: "Image with all layers downloaded successfully",
    });
  }, [canvasRef, layers, toast]);

  // Initialize layer when image is first loaded
  useEffect(() => {
    console.log('🔷 [LAYER] Layer initialization effect triggered:', {
      hasImage: !!image,
      layersLength: layers.length
    });
    
    if (image && layers.length === 0) {
      console.log('🔷 [LAYER] Adding image layer...');
      addImageLayer(image);
      console.log('✅ [LAYER] Image layer added');
    }
  }, [image, layers.length, addImageLayer]);

  // Redraw canvas when filters or image change
  useEffect(() => {
    console.log('🔄 [REDRAW] Redraw effect triggered:', {
      hasImage: !!image,
      hasCanvas: !!canvasRef.current,
      filters
    });
    
    if (image && canvasRef.current) {
      console.log('🔄 [REDRAW] Scheduling redraw with requestAnimationFrame...');
      // Small delay to ensure canvas is ready
      requestAnimationFrame(() => {
        console.log('🔄 [REDRAW] requestAnimationFrame callback - redrawing...');
        drawImageToCanvas(image);
      });
      
      // Show mobile compatibility notice once
      if (!supportsCanvasFilters() && !sessionStorage.getItem('mobile-filter-notice')) {
        sessionStorage.setItem('mobile-filter-notice', 'shown');
        toast({
          title: "Mobile Device Detected",
          description: "Some advanced filters (hue, blur) may have limited support on mobile devices.",
          variant: "default"
        });
      }
    } else {
      console.log('⚠️ [REDRAW] Skipping redraw - missing image or canvas');
    }
  }, [filters, image, drawImageToCanvas, supportsCanvasFilters, toast]);

  const handleFilterChange = (filterName, value) => {
    console.log('🎛️ [FILTER] Filter change requested:', { filterName, value });
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [filterName]: value
      };
      console.log('🎛️ [FILTER] New filter state:', newFilters);
      return newFilters;
    });
  };

  const undo = () => {
    console.log('↩️ [HISTORY] Undo requested', { historyIndex, historyLength: history.length });
    if (historyIndex > 0) {
      const previousIndex = historyIndex - 1;
      const previousImageData = history[previousIndex];
      
      console.log('↩️ [HISTORY] Loading previous state:', { previousIndex });
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setHistoryIndex(previousIndex);
        // Redraw with current filters after undo
        setTimeout(() => drawImageToCanvas(img), 0);
        console.log('✅ [HISTORY] Undo complete');
      };
      img.onerror = () => {
        console.error('❌ [HISTORY] Failed to load previous image');
      };
      img.src = previousImageData;
    } else {
      console.log('⚠️ [HISTORY] Cannot undo - at oldest state');
    }
  };

  const redo = () => {
    console.log('↪️ [HISTORY] Redo requested', { historyIndex, historyLength: history.length });
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const nextImageData = history[nextIndex];
      
      console.log('↪️ [HISTORY] Loading next state:', { nextIndex });
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setHistoryIndex(nextIndex);
        // Redraw with current filters after redo
        setTimeout(() => drawImageToCanvas(img), 0);
        console.log('✅ [HISTORY] Redo complete');
      };
      img.onerror = () => {
        console.error('❌ [HISTORY] Failed to load next image');
      };
      img.src = nextImageData;
    } else {
      console.log('⚠️ [HISTORY] Cannot redo - at newest state');
    }
  };

  const toggleFullscreen = () => {
    console.log('🖥️ [FULLSCREEN] Toggle requested', { currentState: isFullscreen });
    if (!isFullscreen) {
      // Enter fullscreen
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
        console.log('✅ [FULLSCREEN] Entering fullscreen');
      } else if (containerRef.current?.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
        console.log('✅ [FULLSCREEN] Entering fullscreen (webkit)');
      } else if (containerRef.current?.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
        console.log('✅ [FULLSCREEN] Entering fullscreen (ms)');
      } else {
        console.error('❌ [FULLSCREEN] Fullscreen API not supported');
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
        console.log('✅ [FULLSCREEN] Exiting fullscreen');
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        console.log('✅ [FULLSCREEN] Exiting fullscreen (webkit)');
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        console.log('✅ [FULLSCREEN] Exiting fullscreen (ms)');
      } else {
        console.error('❌ [FULLSCREEN] Exit fullscreen API not supported');
      }
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const containerClass = isFullscreen 
    ? "fixed inset-0 z-50 bg-background" 
    : "min-h-screen flex flex-col bg-background";

  return (
    <PageTransition>
      <div ref={containerRef} className={containerClass}>
        {!isFullscreen && <NavBar />}
        <main className={`flex-1 ${isFullscreen ? 'h-screen' : 'mt-15 container mx-auto px-2 py-8'} max-w-[95vw]`}>
          <div className="h-full flex flex-col max-w-none mx-auto">
            {/* Enhanced Title Section */}
            {!isFullscreen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 text-center"
              >
                <h1 className="text-4xl font-bold flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 mr-3 text-primary" />
                  Image Editor
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  Edit, enhance, and transform your images with powerful tools
                </p>
              </motion.div>
            )}

            {/* Enhanced Toolbar */}
            <Toolbar
              image={image}
              onUpload={() => fileInputRef.current?.click()}
              onDownload={downloadImage}
              onRotateLeft={rotateLeft}
              onRotateRight={rotateRight}
              onFlipHorizontal={flipHorizontal}
              onFlipVertical={flipVertical}
              onUndo={undo}
              onRedo={redo}
              onReset={resetFilters}
              onToggleFullscreen={toggleFullscreen}
              isFullscreen={isFullscreen}
              isProcessing={isProcessing}
              canUndo={historyIndex > 0}
              canRedo={historyIndex < history.length - 1}
            />

            {/* Panel Tabs */}
            {image && (
              <div className="mb-6">
                <div className="bg-card rounded-lg p-2 border border-border flex gap-2 flex-wrap justify-center">
                  <button
                    onClick={() => setActivePanel('filters')}
                    className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
                      activePanel === 'filters'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    Filters
                  </button>
                  <button
                    onClick={() => setActivePanel('layers')}
                    className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
                      activePanel === 'layers'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    <LayersIcon className="w-4 h-4" />
                    Layers
                  </button>
                  <button
                    onClick={() => setActivePanel('text')}
                    className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
                      activePanel === 'text'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    <Type className="w-4 h-4" />
                    Text
                  </button>
                  <button
                    onClick={() => setActivePanel('drawing')}
                    className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
                      activePanel === 'drawing'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    <PenTool className="w-4 h-4" />
                    Drawing
                  </button>
                </div>
              </div>
            )}

            {/* Enhanced Editor and Control Layout */}
            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                {/* Dynamic Control Panel based on active tab */}
                {image && (
                  <div className="lg:col-span-1 space-y-6">
                    {activePanel === 'filters' && (
                      <ControlPanel
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onApplyPreset={applyPreset}
                        isVisible={true}
                      />
                    )}
                    {activePanel === 'layers' && (
                      <LayerPanel
                        layers={layers}
                        activeLayerId={activeLayerId}
                        onLayerSelect={setActiveLayerId}
                        onLayerToggle={toggleLayerVisibility}
                        onLayerDelete={deleteLayer}
                        onLayerMove={moveLayer}
                        onAddLayer={addDrawingLayer}
                        isVisible={true}
                      />
                    )}
                    {activePanel === 'text' && (
                      <TextToolPanel
                        onAddText={addTextLayer}
                        activeTextLayer={layers.find(l => l.id === activeLayerId && l.type === 'text')}
                        onUpdateText={updateTextLayer}
                        isVisible={true}
                      />
                    )}
                    {activePanel === 'drawing' && (
                      <DrawingToolPanel
                        activeTool={activeTool}
                        onToolChange={setActiveTool}
                        drawingSettings={drawingSettings}
                        onSettingChange={(key, value) => setDrawingSettings(prev => ({ ...prev, [key]: value }))}
                        onClearDrawing={clearDrawing}
                        isVisible={true}
                      />
                    )}
                  </div>
                )}

                {/* Enhanced Editor Canvas */}
                <EnhancedEditorCanvas
                  ref={canvasRef}
                  image={image}
                  layers={layers}
                  isProcessing={isProcessing}
                  onUpload={() => fileInputRef.current?.click()}
                  fileInputRef={fileInputRef}
                  onFileChange={handleImageUpload}
                  activeTool={activeTool}
                  drawingSettings={drawingSettings}
                  onDrawingComplete={updateDrawingLayer}
                  onTextMove={moveTextLayer}
                  activeLayerId={activeLayerId}
                />
              </div>
            </div>

            {/* Help Section */}
            <HelpSection isVisible={!isFullscreen} />
          </div>
        </main>
        {!isFullscreen && <Footer />}
      </div>
    </PageTransition>
  );
}
