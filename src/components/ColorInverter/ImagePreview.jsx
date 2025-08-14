import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ImagePreview = ({ 
  originalUrl, 
  processedUrl, 
  name, 
  dimensions, 
  error,
  className 
}) => {
  const [showComparison, setShowComparison] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [showOriginal, setShowOriginal] = useState(false);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "bg-destructive/5 border border-destructive/20 rounded-lg p-6 text-center",
          className
        )}
      >
        <div className="text-destructive text-sm">
          <p className="font-medium">Failed to process {name}</p>
          <p className="mt-1 opacity-75">{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-card border border-border rounded-lg overflow-hidden", className)}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground truncate">{name}</h4>
            {dimensions && (
              <p className="text-xs text-foreground/50">
                {dimensions.width} × {dimensions.height}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-muted rounded-md">
              <button
                onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
                className="p-1 hover:bg-muted-foreground/10 rounded transition-colors"
                disabled={zoom <= 0.25}
              >
                <ZoomOut size={14} />
              </button>
              <span className="text-xs px-2 py-1 min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                className="p-1 hover:bg-muted-foreground/10 rounded transition-colors"
                disabled={zoom >= 3}
              >
                <ZoomIn size={14} />
              </button>
            </div>

            {/* Reset Zoom */}
            <button
              onClick={() => setZoom(1)}
              className="p-1 hover:bg-muted-foreground/10 rounded transition-colors"
              disabled={zoom === 1}
            >
              <RotateCcw size={14} />
            </button>

            {/* Toggle Comparison */}
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={cn(
                "p-1 rounded transition-colors",
                showComparison 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted-foreground/10"
              )}
            >
              {showComparison ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* Image Preview */}
      <div className="p-4">
        <div className="relative overflow-hidden rounded-lg bg-muted">
          {showComparison && processedUrl ? (
            /* Before/After Comparison */
            <div className="grid grid-cols-2 gap-1">
              {/* Original */}
              <div className="relative aspect-square">
                <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-black/50 text-white text-xs rounded">
                  Original
                </div>
                <img
                  src={originalUrl}
                  alt={`Original ${name}`}
                  className="w-full h-full object-contain"
                  style={{ transform: `scale(${zoom})` }}
                />
              </div>
              
              {/* Processed */}
              <div className="relative aspect-square">
                <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-black/50 text-white text-xs rounded">
                  Inverted
                </div>
                <img
                  src={processedUrl}
                  alt={`Inverted ${name}`}
                  className="w-full h-full object-contain"
                  style={{ transform: `scale(${zoom})` }}
                />
              </div>
            </div>
          ) : (
            /* Single Image View */
            <div className="relative aspect-square">
              <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-black/50 text-white text-xs rounded">
                {processedUrl ? 'Inverted' : 'Original'}
              </div>
              <img
                src={processedUrl || originalUrl}
                alt={name}
                className="w-full h-full object-contain cursor-pointer"
                style={{ transform: `scale(${zoom})` }}
                onClick={() => processedUrl && setShowOriginal(!showOriginal)}
              />
              
              {/* Toggle overlay for processed images */}
              {processedUrl && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showOriginal ? 1 : 0 }}
                  className="absolute inset-0 bg-black/20 flex items-center justify-center"
                  onClick={() => setShowOriginal(false)}
                >
                  <div className="px-3 py-2 bg-black/70 text-white text-sm rounded-lg">
                    Click to toggle view
                  </div>
                </motion.div>
              )}
            </div>
          )}
          
          {/* Processing Overlay */}
          {!processedUrl && !error && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
                <span className="text-sm text-foreground/70">Processing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        {showComparison && (
          <div className="mt-3 text-center">
            <p className="text-xs text-foreground/50">
              Side-by-side comparison view
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
