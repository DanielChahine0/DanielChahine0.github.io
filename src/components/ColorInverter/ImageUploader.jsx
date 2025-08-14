import React, { useCallback, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ImageUploader = ({ onImagesSelected, isProcessing, className }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const validateFile = useCallback((file) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Only PNG and JPEG files are allowed' };
    }
    
    if (file.size > maxSize) {
      return { valid: false, error: 'File size must be less than 10MB' };
    }
    
    return { valid: true };
  }, []);

  const handleFiles = useCallback((files) => {
    const fileList = Array.from(files);
    const validFiles = [];
    const errors = [];
    
    fileList.forEach((file, index) => {
      const validation = validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });
    
    if (errors.length > 0) {
      console.warn('File validation errors:', errors);
    }
    
    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      onImagesSelected(validFiles);
    }
  }, [validateFile, onImagesSelected]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) setIsDragOver(true);
  }, [isDragOver]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, [handleFiles]);

  const openFileDialog = useCallback(() => {
    if (fileInputRef.current && !isProcessing) {
      fileInputRef.current.click();
    }
  }, [isProcessing]);

  const removeFile = useCallback((indexToRemove) => {
    const newFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(newFiles);
    if (newFiles.length === 0) {
      onImagesSelected([]);
    }
  }, [selectedFiles, onImagesSelected]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300",
          isDragOver 
            ? "border-primary bg-primary/5 scale-[1.02]" 
            : "border-border hover:border-primary/50",
          isProcessing && "opacity-50 pointer-events-none"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          multiple
          onChange={handleFileInput}
          className="hidden"
          disabled={isProcessing}
        />

        <div className="flex flex-col items-center space-y-4">
          <motion.div
            animate={{ 
              scale: isDragOver ? 1.1 : 1,
              rotate: isDragOver ? 5 : 0
            }}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
              isDragOver ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
            )}
          >
            <Upload size={32} />
          </motion.div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {isDragOver ? "Drop images here" : "Upload Images"}
            </h3>
            <p className="text-sm text-foreground/70">
              Drag and drop images here, or click to select files
            </p>
            <p className="text-xs text-foreground/50">
              PNG and JPEG files only • Max 10MB per file
            </p>
          </div>

          {!isDragOver && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              disabled={isProcessing}
            >
              Choose Files
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">
              Selected Files ({selectedFiles.length})
            </h4>
            <button
              onClick={() => {
                setSelectedFiles([]);
                onImagesSelected([]);
              }}
              className="text-xs text-foreground/50 hover:text-foreground/70 transition-colors"
              disabled={isProcessing}
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedFiles.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group bg-card border border-border rounded-lg p-3 flex items-center space-x-3"
              >
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Image size={20} className="text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-foreground/50">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                
                {!isProcessing && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="w-6 h-6 rounded-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center"
                  >
                    <X size={12} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Processing Status */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center space-x-3 py-4"
            >
              <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
              <span className="text-sm text-foreground/70">Processing images...</span>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-primary/5 border border-primary/10 rounded-lg p-4"
      >
        <div className="flex items-start space-x-3">
          <AlertCircle size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <h5 className="font-medium text-foreground">How it works:</h5>
            <ul className="text-sm text-foreground/70 space-y-1 list-disc list-inside ml-0">
              <li>Upload one or more PNG or JPEG images</li>
              <li>The tool will automatically invert all colors (black ↔ white)</li>
              <li>Transparency in PNG files will be preserved</li>
              <li>Download individual images or all as a ZIP file</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
