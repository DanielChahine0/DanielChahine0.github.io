/**
 * @file useImageActions.js
 * Custom hook for handling image-related actions like upload and download.
 * Provides functionality for image processing, including HEIC conversion.
 */

import { useCallback } from 'react';
import heic2any from 'heic2any';

/**
 * Custom hook for image actions
 * @param {Image} image - Current image being edited
 * @param {Function} setImage - Function to update current image
 * @param {Function} setOriginalImage - Function to store original image
 * @param {Function} setFilters - Function to reset filters
 * @param {Function} addToHistory - Function to add state to history
 * @param {React.RefObject} canvasRef - Reference to canvas element
 * @param {Function} drawImageToCanvas - Function to render image to canvas
 * @param {Function} toast - Toast notification function
 * @returns {Object} Object containing image action handlers
 */
export const useImageActions = (
    image, 
    setImage, 
    setOriginalImage,
    setFilters,
    addToHistory,
    canvasRef,
    drawImageToCanvas,
    toast
) => {
    const handleImageUpload = useCallback(async (event) => {
        console.log('🔵 [UPLOAD] Step 1: handleImageUpload called');
        const file = event.target.files[0];
        
        if (file) {
            console.log('🔵 [UPLOAD] Step 2: File selected:', {
                name: file.name,
                type: file.type,
                size: file.size
            });
            
            // Check if it's a valid image file or HEIC
            const isHeic = file.type === 'image/heic' || file.type === 'image/heif' || 
                          file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
            
            if (!file.type.startsWith('image/') && !isHeic) {
                console.error('❌ [UPLOAD] Invalid file type:', file.type);
                toast({
                    title: "Error",
                    description: "Please select a valid image file",
                    variant: "destructive"
                });
                return;
            }

            try {
                let processedFile = file;
                
                // Convert HEIC to JPEG if needed
                if (isHeic) {
                    console.log('🔵 [UPLOAD] Step 3: Converting HEIC file...');
                    toast({
                        title: "Processing",
                        description: "Converting HEIC file, please wait...",
                    });
                    
                    const convertedBlob = await heic2any({
                        blob: file,
                        toType: 'image/jpeg',
                        quality: 0.9
                    });
                    
                    processedFile = new File([convertedBlob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
                        type: 'image/jpeg'
                    });
                    console.log('✅ [UPLOAD] HEIC conversion complete');
                }

                console.log('🔵 [UPLOAD] Step 4: Reading file as DataURL...');
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    console.log('🔵 [UPLOAD] Step 5: FileReader loaded, creating Image object...');
                    const img = new Image();
                    
                    img.onload = () => {
                        console.log('✅ [UPLOAD] Step 6: Image loaded successfully:', {
                            width: img.width,
                            height: img.height,
                            src_length: e.target.result.length
                        });
                        
                        console.log('🔵 [UPLOAD] Step 7: Setting image state...');
                        setImage(img);
                        setOriginalImage(img);
                        
                        console.log('🔵 [UPLOAD] Step 8: Scheduling canvas draw with requestAnimationFrame...');
                        // Use requestAnimationFrame to ensure canvas is ready
                        requestAnimationFrame(() => {
                            console.log('🔵 [UPLOAD] Step 9: requestAnimationFrame callback - calling drawImageToCanvas...');
                            drawImageToCanvas(img);
                            console.log('🔵 [UPLOAD] Step 10: Adding to history...');
                            addToHistory(e.target.result);
                        });
                        
                        console.log('🔵 [UPLOAD] Step 11: Resetting filters...');
                        setFilters({
                            brightness: 100,
                            contrast: 100,
                            saturation: 100,
                            hue: 0,
                            blur: 0,
                            sepia: 0,
                            grayscale: 0
                        });
                        
                        if (isHeic) {
                            toast({
                                title: "Success",
                                description: "HEIC file converted and loaded successfully",
                            });
                        }
                        console.log('✅ [UPLOAD] Upload process complete!');
                    };
                    
                    img.onerror = (error) => {
                        console.error('❌ [UPLOAD] Image failed to load:', error);
                    };
                    
                    img.src = e.target.result;
                };
                
                reader.onerror = (error) => {
                    console.error('❌ [UPLOAD] FileReader error:', error);
                };
                
                reader.readAsDataURL(processedFile);
                
            } catch (error) {
                console.error('Error processing file:', error);
                toast({
                    title: "Error",
                    description: "Failed to process the image file. Please try another file.",
                    variant: "destructive"
                });
            }
        }
    }, [setImage, setOriginalImage, drawImageToCanvas, addToHistory, setFilters, toast]);

    const downloadImage = useCallback(() => {
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
    }, [canvasRef, toast]);

    const resetFilters = useCallback(() => {
        setFilters({
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            blur: 0,
            sepia: 0,
            grayscale: 0
        });
    }, [setFilters]);

    const applyPreset = useCallback((presetName) => {
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
    }, [setFilters]);

    return {
        handleImageUpload,
        downloadImage,
        resetFilters,
        applyPreset
    };
};
