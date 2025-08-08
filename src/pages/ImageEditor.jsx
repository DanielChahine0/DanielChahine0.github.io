import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Footer } from '../components/Footer';
import { NavBar } from '../components/NavBar';
import { PageTransition } from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { 
  Toolbar, 
  ControlPanel, 
  EditorCanvas, 
  HelpSection,
  useImageTransforms,
  useImageActions 
} from '../components/ImageEditor';

export default function ImageEditor() {
  const { toast } = useToast();
  const [image, setImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    blur: 0,
    sepia: 0,
    grayscale: 0
  });
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

  const drawImageToCanvas = useCallback((img, customFilters = null) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    
    // Calculate dimensions to fit canvas while maintaining aspect ratio
    const maxWidth = 800;
    const maxHeight = 600;
    let { width, height } = img;
    
    if (width > maxWidth) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    }
    if (height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }
    
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Apply filters
    const activeFilters = customFilters || filters;
    ctx.filter = `
      brightness(${activeFilters.brightness}%)
      contrast(${activeFilters.contrast}%)
      saturate(${activeFilters.saturation}%)
      hue-rotate(${activeFilters.hue}deg)
      blur(${activeFilters.blur}px)
      sepia(${activeFilters.sepia}%)
      grayscale(${activeFilters.grayscale}%)
    `;

    // Draw image
    ctx.drawImage(img, 0, 0, width, height);
  }, [filters]);

  // Use custom hooks
  const {
    rotateLeft,
    rotateRight,
    flipHorizontal,
    flipVertical
  } = useImageTransforms(image, setImage, addToHistory, setIsProcessing);

  const {
    handleImageUpload,
    downloadImage,
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

  useEffect(() => {
    if (image) {
      drawImageToCanvas(image);
    }
  }, [filters, image, drawImageToCanvas]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const undo = () => {
    if (historyIndex > 0) {
      const previousIndex = historyIndex - 1;
      const previousImageData = history[previousIndex];
      
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setHistoryIndex(previousIndex);
      };
      img.src = previousImageData;
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const nextImageData = history[nextIndex];
      
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setHistoryIndex(nextIndex);
      };
      img.src = nextImageData;
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Enter fullscreen
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current?.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current?.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
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

            {/* Enhanced Editor and Control Layout */}
            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                {/* Control Panel */}
                <ControlPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onApplyPreset={applyPreset}
                  isVisible={!!image}
                />

                {/* Editor Canvas */}
                <EditorCanvas
                  ref={canvasRef}
                  image={image}
                  isProcessing={isProcessing}
                  onUpload={() => fileInputRef.current?.click()}
                  fileInputRef={fileInputRef}
                  onFileChange={handleImageUpload}
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
