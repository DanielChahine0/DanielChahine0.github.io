/**
 * Color Utility Functions
 * A collection of helper functions for color conversion and manipulation.
 * Supports conversions between different color formats: HEX, RGB, HSB, HSL.
 */

/**
 * Converts a hexadecimal color string to RGB values
 * @param {string} hex - The hexadecimal color code (e.g., "#FF0000")
 * @returns {Object|null} An object containing r, g, b values or null if invalid
 */
export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

/**
 * Converts RGB values to HSB (Hue, Saturation, Brightness) color space
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {Object} An object containing h (0-360), s (0-100), b (0-100) values
 */
export const rgbToHsb = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;
    if (diff !== 0) {
        if (max === r) h = ((g - b) / diff) % 6;
        else if (max === g) h = (b - r) / diff + 2;
        else h = (r - g) / diff + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;

    const s = Math.round((max === 0 ? 0 : diff / max) * 100);
    const brightness = Math.round(max * 100);

    return { h, s, b: brightness };
};

export const hsbToRgb = (h, s, b) => {
    s /= 100;
    b /= 100;
    const c = b * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = b - c;

    let r = 0, g = 0, blue = 0;
    if (h >= 0 && h < 60) { r = c; g = x; blue = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; blue = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; blue = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; blue = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; blue = c; }
    else if (h >= 300 && h < 360) { r = c; g = 0; blue = x; }

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((blue + m) * 255)
    };
};

export const rgbToHex = (r, g, b) => {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
};

// Convert HSB to HSL
export const hsbToHsl = (h, s, b) => {
    s /= 100;
    b /= 100;
    const l = b * (2 - s) / 2;
    const sl = l !== 0 && l !== 1 ? (b - l) / Math.min(l, 1 - l) : 0;
    return {
        h: Math.round(h),
        s: Math.round(sl * 100),
        l: Math.round(l * 100)
    };
};
