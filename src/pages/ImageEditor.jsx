import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { NavBar } from '@/components/NavBar';
import { motion } from 'framer-motion';
import { 
  Upload, Download, RotateCw, RotateCcw, FlipHorizontal, FlipVertical,
  Crop, Sliders, Palette, Undo, Redo, RefreshCw, Image as ImageIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ImageEditor = () => {
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
  
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const addToHistory = useCallback((imageData) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please select a valid image file",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          setOriginalImage(img);
          drawImageToCanvas(img);
          addToHistory(e.target.result);
          setFilters({
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            blur: 0,
            sepia: 0,
            grayscale: 0
          });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const drawImageToCanvas = (img, customFilters = null) => {
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
  };

  useEffect(() => {
    if (image) {
      drawImageToCanvas(image);
    }
  }, [filters, image]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      blur: 0,
      sepia: 0,
      grayscale: 0
    });
  };

  const rotateImage = (degrees) => {
    if (!image) return;
    setIsProcessing(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (degrees === 90 || degrees === 270) {
      canvas.width = image.height;
      canvas.height = image.width;
    } else {
      canvas.width = image.width;
      canvas.height = image.height;
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);

    const rotatedImage = new Image();
    rotatedImage.onload = () => {
      setImage(rotatedImage);
      addToHistory(canvas.toDataURL());
      setIsProcessing(false);
    };
    rotatedImage.src = canvas.toDataURL();
  };

  const flipImage = (direction) => {
    if (!image) return;
    setIsProcessing(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.save();
    if (direction === 'horizontal') {
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
    } else {
      ctx.scale(1, -1);
      ctx.translate(0, -canvas.height);
    }
    ctx.drawImage(image, 0, 0);
    ctx.restore();

    const flippedImage = new Image();
    flippedImage.onload = () => {
      setImage(flippedImage);
      addToHistory(canvas.toDataURL());
      setIsProcessing(false);
    };
    flippedImage.src = canvas.toDataURL();
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

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "Success",
      description: "Image downloaded successfully",
    });
  };

  const applyPreset = (presetName) => {
    const presets = {
      vintage: { brightness: 110, contrast: 120, saturation: 80, hue: 10, blur: 0, sepia: 30, grayscale: 0 },
      bw: { brightness: 100, contrast: 110, saturation: 0, hue: 0, blur: 0, sepia: 0, grayscale: 100 },
      vivid: { brightness: 105, contrast: 130, saturation: 150, hue: 0, blur: 0, sepia: 0, grayscale: 0 },
      soft: { brightness: 105, contrast: 90, saturation: 110, hue: 0, blur: 1, sepia: 0, grayscale: 0 },
      dramatic: { brightness: 90, contrast: 150, saturation: 120, hue: 0, blur: 0, sepia: 0, grayscale: 0 }
    };

    if (presets[presetName]) {
      setFilters(presets[presetName]);
    }
  };

  return (
    <PageTransition className="min-h-screen bg-background">
      <NavBar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center">
                <ImageIcon className="w-10 h-10 mr-3 text-primary" />
                Image Editor
              </h1>
              <p className="text-lg text-muted-foreground">
                Edit, enhance, and transform your images with powerful tools
              </p>
            </div>

            {/* Toolbar */}
            <div className="bg-card rounded-lg p-4 mb-6 border border-border">
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </button>
                
                {image && (
                  <>
                    <div className="flex border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={undo}
                        disabled={historyIndex <= 0}
                        className="px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Undo"
                      >
                        <Undo className="w-4 h-4" />
                      </button>
                      <button
                        onClick={redo}
                        disabled={historyIndex >= history.length - 1}
                        className="px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-l border-border"
                        title="Redo"
                      >
                        <Redo className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => rotateImage(-90)}
                        disabled={isProcessing}
                        className="px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 transition-colors"
                        title="Rotate Left"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => rotateImage(90)}
                        disabled={isProcessing}
                        className="px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 transition-colors border-l border-border"
                        title="Rotate Right"
                      >
                        <RotateCw className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => flipImage('horizontal')}
                        disabled={isProcessing}
                        className="px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 transition-colors"
                        title="Flip Horizontal"
                      >
                        <FlipHorizontal className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => flipImage('vertical')}
                        disabled={isProcessing}
                        className="px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 transition-colors border-l border-border"
                        title="Flip Vertical"
                      >
                        <FlipVertical className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset
                    </button>

                    <button
                      onClick={downloadImage}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Controls Panel */}
              {image && (
                <div className="lg:col-span-1 space-y-6">
                  {/* Filter Presets */}
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Palette className="w-4 h-4 mr-2" />
                      Presets
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {['vintage', 'bw', 'vivid', 'soft', 'dramatic'].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => applyPreset(preset)}
                          className="px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors capitalize"
                        >
                          {preset.replace('bw', 'Black & White')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filter Controls */}
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Sliders className="w-4 h-4 mr-2" />
                      Adjustments
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(filters).map(([key, value]) => (
                        <div key={key}>
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-medium capitalize">
                              {key}
                            </label>
                            <span className="text-sm text-muted-foreground">
                              {key === 'hue' ? `${value}°` : 
                               ['blur'].includes(key) ? `${value}px` : 
                               `${value}${['brightness', 'contrast', 'saturation', 'sepia', 'grayscale'].includes(key) ? '%' : ''}`}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={key === 'hue' ? -180 : key === 'blur' ? 0 : 0}
                            max={key === 'hue' ? 180 : key === 'blur' ? 10 : key === 'brightness' || key === 'contrast' ? 200 : 100}
                            value={value}
                            onChange={(e) => handleFilterChange(key, parseInt(e.target.value))}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Image Canvas */}
              <div className={`${image ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
                <div className="bg-card rounded-lg p-6 border border-border">
                  {!image ? (
                    <div className="text-center py-20">
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-border rounded-lg p-12 cursor-pointer hover:border-primary transition-colors"
                      >
                        <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Upload an image to get started
                        </h3>
                        <p className="text-muted-foreground">
                          Drag and drop an image here, or click to select
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Supports JPG, PNG, GIF, WebP
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <canvas
                        ref={canvasRef}
                        className="max-w-full max-h-[600px] border border-border rounded-lg shadow-lg"
                      />
                      {isProcessing && (
                        <div className="mt-4">
                          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-lg">
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Help Section */}
            <div className="bg-card rounded-lg p-6 border border-border mt-6">
              <h3 className="text-xl font-semibold mb-4">How to Use</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Getting Started</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Upload an image using the Upload button</li>
                    <li>Choose from preset filters for quick results</li>
                    <li>Use adjustment sliders for fine-tuning</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Editing Tools</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Rotate and flip images with transform tools</li>
                    <li>Adjust brightness, contrast, and saturation</li>
                    <li>Apply effects like blur, sepia, and grayscale</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Saving Work</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Use Undo/Redo to navigate edit history</li>
                    <li>Download your edited image as PNG</li>
                    <li>Reset filters to start over</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ImageEditor;
