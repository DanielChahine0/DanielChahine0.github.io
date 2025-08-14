import { useState, useCallback, useRef } from 'react';

export const useImageProcessor = () => {
  const [processedImages, setProcessedImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const workerRef = useRef(null);

  // Initialize Web Worker for image processing
  const initWorker = useCallback(() => {
    if (!workerRef.current && typeof Worker !== 'undefined') {
      const workerCode = `
        self.onmessage = function(e) {
          const { imageData, type, id } = e.data;
          
          try {
            const canvas = new OffscreenCanvas(imageData.width, imageData.height);
            const ctx = canvas.getContext('2d');
            const data = new Uint8ClampedArray(imageData.data);
            
            // Process each pixel
            for (let i = 0; i < data.length; i += 4) {
              if (type === 'invert') {
                // Invert RGB values while preserving alpha
                data[i] = 255 - data[i];     // Red
                data[i + 1] = 255 - data[i + 1]; // Green  
                data[i + 2] = 255 - data[i + 2]; // Blue
                // Alpha channel (i + 3) remains unchanged
              }
            }
            
            const processedImageData = new ImageData(data, imageData.width, imageData.height);
            ctx.putImageData(processedImageData, 0, 0);
            
            canvas.convertToBlob().then(blob => {
              self.postMessage({ 
                success: true, 
                blob, 
                id,
                width: imageData.width,
                height: imageData.height 
              });
            });
          } catch (error) {
            self.postMessage({ success: false, error: error.message, id });
          }
        };
      `;
      
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      workerRef.current = new Worker(URL.createObjectURL(blob));
    }
    return workerRef.current;
  }, []);

  // Fallback canvas processing for older browsers
  const processImageCanvas = useCallback(async (file, canvas, ctx) => {
    console.log('Processing image with canvas:', file.name, file.type);
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        console.log('Image loaded successfully:', img.width, 'x', img.height);
        try {
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw original image
          ctx.drawImage(img, 0, 0);
          
          // Get image data
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          console.log('Image data length:', data.length);
          
          // Invert colors
          for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];     // Red
            data[i + 1] = 255 - data[i + 1]; // Green
            data[i + 2] = 255 - data[i + 2]; // Blue
            // Alpha channel (i + 3) remains unchanged
          }
          
          // Put processed image data back
          ctx.putImageData(imageData, 0, 0);
          
          // Convert to blob - preserve original format if possible
          const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const quality = file.type === 'image/jpeg' ? 0.9 : undefined;
          
          console.log('Converting to blob with type:', outputType);
          canvas.toBlob((blob) => {
            if (blob) {
              console.log('Blob created successfully:', blob.size, 'bytes');
              resolve({
                blob,
                width: canvas.width,
                height: canvas.height
              });
            } else {
              console.error('Failed to create blob');
              reject(new Error('Failed to create blob'));
            }
          }, outputType, quality);
          
        } catch (error) {
          console.error('Error during canvas processing:', error);
          reject(error);
        }
      };
      
      img.onerror = (error) => {
        console.error('Image failed to load:', error);
        reject(new Error('Failed to load image'));
      };
      
      // Set crossOrigin to handle potential CORS issues
      img.crossOrigin = 'anonymous';
      img.src = URL.createObjectURL(file);
      console.log('Started loading image:', img.src);
    });
  }, []);

  // Process multiple images
  const processImages = useCallback(async (files) => {
    if (!files || files.length === 0) return [];
    
    console.log('Starting to process', files.length, 'images');
    setIsProcessing(true);
    setProcessedImages([]);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    try {
      const results = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`Processing file ${i + 1}/${files.length}:`, file.name);
        const originalUrl = URL.createObjectURL(file);
        
        try {
          // Use canvas processing (more reliable than Web Workers for now)
          const processedData = await processImageCanvas(file, canvas, ctx);
          const processedUrl = URL.createObjectURL(processedData.blob);
          
          const result = {
            id: `${Date.now()}-${i}`,
            name: file.name,
            originalFile: file,
            originalUrl,
            processedBlob: processedData.blob,
            processedUrl,
            size: file.size,
            type: file.type,
            dimensions: {
              width: processedData.width,
              height: processedData.height
            }
          };
          
          results.push(result);
          console.log(`Successfully processed: ${file.name}`);
          
        } catch (error) {
          console.error(`Error processing ${file.name}:`, error);
          // Still add to results but mark as failed
          const result = {
            id: `${Date.now()}-${i}`,
            name: file.name,
            originalFile: file,
            originalUrl,
            processedBlob: null,
            processedUrl: null,
            size: file.size,
            type: file.type,
            error: error.message,
            dimensions: null
          };
          results.push(result);
        }
      }
      
      console.log('Processing complete. Results:', results);
      setProcessedImages(results);
      return results;
      
    } catch (error) {
      console.error('Error processing images:', error);
      return [];
    } finally {
      setIsProcessing(false);
    }
  }, [processImageCanvas]);

  // Download single image
  const downloadImage = useCallback((processedImage) => {
    if (!processedImage.processedBlob) return;
    
    const link = document.createElement('a');
    link.href = processedImage.processedUrl;
    link.download = `inverted_${processedImage.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // Download all processed images as ZIP
  const downloadAllImages = useCallback(async () => {
    if (typeof JSZip === 'undefined') {
      // Fallback: download individually
      processedImages.forEach(img => {
        if (img.processedBlob) {
          downloadImage(img);
        }
      });
      return;
    }

    const zip = new JSZip();
    const validImages = processedImages.filter(img => img.processedBlob);
    
    // Add each image to ZIP
    for (const img of validImages) {
      zip.file(`inverted_${img.name}`, img.processedBlob);
    }
    
    // Generate and download ZIP
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = 'inverted_images.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [processedImages, downloadImage]);

  // Clear all processed images
  const clearImages = useCallback(() => {
    // Clean up object URLs
    processedImages.forEach(img => {
      if (img.originalUrl) URL.revokeObjectURL(img.originalUrl);
      if (img.processedUrl) URL.revokeObjectURL(img.processedUrl);
    });
    setProcessedImages([]);
  }, [processedImages]);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    clearImages();
  }, [clearImages]);

  return {
    processedImages,
    isProcessing,
    processImages,
    downloadImage,
    downloadAllImages,
    clearImages,
    cleanup
  };
};
