import { useCallback } from 'react';
import heic2any from 'heic2any';

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
        const file = event.target.files[0];
        if (file) {
            // Check if it's a valid image file or HEIC
            const isHeic = file.type === 'image/heic' || file.type === 'image/heif' || 
                          file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
            
            if (!file.type.startsWith('image/') && !isHeic) {
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
                        
                        if (isHeic) {
                            toast({
                                title: "Success",
                                description: "HEIC file converted and loaded successfully",
                            });
                        }
                    };
                    img.src = e.target.result;
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
