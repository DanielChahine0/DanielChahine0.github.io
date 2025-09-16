/**
 * @file useImageTransforms.js
 * Custom hook for handling image transformation operations.
 * Provides functionality for rotation and flipping of images.
 */

import { useCallback } from 'react';

/**
 * Custom hook for image transformations
 * @param {Image} image - Current image being edited
 * @param {Function} setImage - Function to update current image
 * @param {Function} addToHistory - Function to add state to history
 * @param {Function} setIsProcessing - Function to update processing state
 * @returns {Object} Object containing transformation functions
 */
export const useImageTransforms = (image, setImage, addToHistory, setIsProcessing) => {
    const rotateImage = useCallback((degrees) => {
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
    }, [image, setImage, addToHistory, setIsProcessing]);

    const flipImage = useCallback((direction) => {
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
    }, [image, setImage, addToHistory, setIsProcessing]);

    const rotateLeft = useCallback(() => rotateImage(-90), [rotateImage]);
    const rotateRight = useCallback(() => rotateImage(90), [rotateImage]);
    const flipHorizontal = useCallback(() => flipImage('horizontal'), [flipImage]);
    const flipVertical = useCallback(() => flipImage('vertical'), [flipImage]);

    return {
        rotateLeft,
        rotateRight,
        flipHorizontal,
        flipVertical
    };
};
