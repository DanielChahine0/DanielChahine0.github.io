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
        left: mousePosition.x - 60,
        top: mousePosition.y - 60,
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
