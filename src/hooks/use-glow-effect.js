/**
 * useGlowEffect Hook
 * A custom React hook that creates an interactive glow effect following the mouse cursor
 * Features:
 * - Tracks mouse position relative to the element
 * - Manages hover state
 * - Provides necessary event handlers and styles
 * - Creates a smooth, performant glow effect for UI elements
 */

import { useState } from 'react';

export const useGlowEffect = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const glowStyle = {
        left: mousePosition.x - 42,
        top: mousePosition.y - 42,
    };

    return {
        mousePosition,
        isHovered,
        handleMouseMove,
        handleMouseEnter,
        handleMouseLeave,
        glowStyle,
    };
};
