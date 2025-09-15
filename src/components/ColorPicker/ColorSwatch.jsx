/**
 * ColorSwatch Component
 * A reusable component that displays a color sample with interactive features.
 * Features include:
 * - Click to select/copy color
 * - Optional delete button
 * - Automatic text contrast calculation
 * - Keyboard accessibility
 * - Hover effects
 */

import { X } from "lucide-react";

/**
 * Helper function to determine text color based on background color brightness
 * Returns black for light backgrounds and white for dark backgrounds
 * @param {string} hexColor - The background color in hex format
 * @returns {string} The contrasting text color ('#000000' or '#FFFFFF')
 */
const getContrastColor = (hexColor) => {
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const rgb = hexToRgb(hexColor);
    if (!rgb) return '#000000';
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
};

const ColorSwatch = ({ 
    color, 
    onClick, 
    label, 
    tabIndex = 0, 
    className = "", 
    size = "aspect-square",
    showDelete = false,
    onDelete = null,
    ...props 
}) => (
    <div className={`${size} rounded-lg border-2 border-border cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg relative group ${className}`}>
        <div
            className="w-full h-full rounded-lg"
            style={{ backgroundColor: color }}
            onClick={onClick}
            title={label}
            aria-label={label}
            tabIndex={tabIndex}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
            {...props}
        />
        {showDelete && onDelete && (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                aria-label="Remove color"
            >
                <X size={12} />
            </button>
        )}
        {/* Color contrast indicator */}
        <div className="absolute inset-0 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span 
                className="text-xs font-bold px-2 py-1 rounded backdrop-blur-sm"
                style={{ 
                    color: getContrastColor(color),
                    backgroundColor: `${color}80`
                }}
            >
                {color.toUpperCase()}
            </span>
        </div>
    </div>
);

export default ColorSwatch;
