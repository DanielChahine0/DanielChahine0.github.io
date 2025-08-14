import React from 'react';
import { motion } from 'framer-motion';
import { Download, DownloadCloud, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { ImagePreview } from './ImagePreview';
import { cn } from '@/lib/utils';

export const ProcessedImageGrid = ({ 
  images, 
  onDownloadImage, 
  onDownloadAll, 
  onClear,
  className 
}) => {
  if (!images || images.length === 0) {
    return null;
  }

  const successfulImages = images.filter(img => img.processedUrl);
  const failedImages = images.filter(img => img.error);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("space-y-6", className)}
    >
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">
            Processed Images ({images.length})
          </h3>
          <div className="flex items-center space-x-4 text-sm">
            {successfulImages.length > 0 && (
              <div className="flex items-center space-x-1 text-green-600">
                <CheckCircle size={14} />
                <span>{successfulImages.length} successful</span>
              </div>
            )}
            {failedImages.length > 0 && (
              <div className="flex items-center space-x-1 text-destructive">
                <XCircle size={14} />
                <span>{failedImages.length} failed</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {successfulImages.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDownloadAll}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <DownloadCloud size={16} />
              <span>Download All</span>
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClear}
            className="flex items-center space-x-2 px-4 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
          >
            <Trash2 size={16} />
            <span>Clear All</span>
          </motion.button>
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <ImagePreview
              originalUrl={image.originalUrl}
              processedUrl={image.processedUrl}
              name={image.name}
              dimensions={image.dimensions}
              error={image.error}
            />

            {/* Download Button Overlay */}
            {image.processedUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute top-4 right-4 z-10"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDownloadImage(image)}
                  className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
                  title="Download this image"
                >
                  <Download size={18} />
                </motion.button>
              </motion.div>
            )}

            {/* Download Button (Always Visible on Mobile) */}
            {image.processedUrl && (
              <div className="md:hidden mt-3">
                <button
                  onClick={() => onDownloadImage(image)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      {images.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-muted/50 border border-border rounded-lg p-4 text-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium text-foreground">{images.length}</div>
              <div className="text-foreground/50">Total Images</div>
            </div>
            <div>
              <div className="font-medium text-green-600">{successfulImages.length}</div>
              <div className="text-foreground/50">Successfully Processed</div>
            </div>
            <div>
              <div className="font-medium text-destructive">{failedImages.length}</div>
              <div className="text-foreground/50">Failed</div>
            </div>
          </div>
          
          {successfulImages.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-foreground/50">
                {successfulImages.length === 1 
                  ? "1 image ready for download" 
                  : `${successfulImages.length} images ready for download`
                }
              </p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
