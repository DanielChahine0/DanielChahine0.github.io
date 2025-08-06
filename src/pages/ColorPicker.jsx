
import { useState, useEffect, useCallback, useMemo } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
import { Palette, Copy, Download, RotateCcw, Eye, Shuffle, Plus, X, Lightbulb, Heart } from "lucide-react";
import { useToast } from "../hooks/use-toast";

// --- UI Helper Components ---
const IconButton = ({ onClick, label, children, className = "", ...props }) => (
    <button
        onClick={onClick}
        className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60 hover:bg-muted ${className}`}
        aria-label={label}
        {...props}
    >
        {children}
    </button>
);

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

// Helper function to determine text color based on background
const getContrastColor = (hexColor) => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return '#000000';
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
};

// Color utility functions
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const rgbToHsb = (r, g, b) => {
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

const hsbToRgb = (h, s, b) => {
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

const rgbToHex = (r, g, b) => {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
};

// Predefined popular color palettes
const POPULAR_PALETTES = {
    'Sunset': ['#FF6B6B', '#FF8E53', '#FF6B35', '#F7931E', '#FFD23F'],
    'Ocean': ['#006A6B', '#0096A0', '#40B7BA', '#7DD3C0', '#B2DFDB'],
    'Forest': ['#2E7D32', '#388E3C', '#4CAF50', '#66BB6A', '#81C784'],
    'Lavender': ['#673AB7', '#7986CB', '#9C27B0', '#BA68C8', '#E1BEE7'],
    'Autumn': ['#D84315', '#FF5722', '#FF7043', '#FF8A65', '#FFAB91'],
    'Monochrome': ['#212121', '#424242', '#616161', '#757575', '#9E9E9E']
};


/**
 * ColorPicker - An enhanced color picker and palette generator with improved UX and functionality
 */
export default function ColorPicker() {
    const { toast } = useToast();
    const [currentColor, setCurrentColor] = useState("#3B82F6");
    const [colorMode, setColorMode] = useState("hex");
    const [savedPalette, setSavedPalette] = useState([]);
    const [complementaryColors, setComplementaryColors] = useState([]);
    const [colorHistory, setColorHistory] = useState(["#3B82F6"]);
    const [selectedPalette, setSelectedPalette] = useState("");
    const [customPaletteName, setCustomPaletteName] = useState("");
    const [showColorDetails, setShowColorDetails] = useState(false);

    // Memoized color calculations for performance
    const colorDetails = useMemo(() => {
        const rgb = hexToRgb(currentColor);
        if (!rgb) return null;
        
        const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b);
        const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
        const isLight = luminance > 0.5;
        
        return { rgb, hsb, luminance, isLight };
    }, [currentColor]);

    // Generate complementary and related colors
    const generateComplementaryColors = useCallback((hex) => {
        const rgb = hexToRgb(hex);
        if (!rgb) return [];

        const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b);
        const colors = [];

        // Complementary (180 degrees)
        const compHue = (hsb.h + 180) % 360;
        const compRgb = hsbToRgb(compHue, hsb.s, hsb.b);
        colors.push({
            name: "Complementary",
            color: rgbToHex(compRgb.r, compRgb.g, compRgb.b),
            description: "Opposite on color wheel"
        });

        // Split complementary
        const split1Hue = (hsb.h + 150) % 360;
        const split1Rgb = hsbToRgb(split1Hue, hsb.s, hsb.b);
        colors.push({
            name: "Split Comp. 1",
            color: rgbToHex(split1Rgb.r, split1Rgb.g, split1Rgb.b),
            description: "Split complementary harmony"
        });

        const split2Hue = (hsb.h + 210) % 360;
        const split2Rgb = hsbToRgb(split2Hue, hsb.s, hsb.b);
        colors.push({
            name: "Split Comp. 2",
            color: rgbToHex(split2Rgb.r, split2Rgb.g, split2Rgb.b),
            description: "Split complementary harmony"
        });

        // Triadic colors
        const triad1Hue = (hsb.h + 120) % 360;
        const triad1Rgb = hsbToRgb(triad1Hue, hsb.s, hsb.b);
        colors.push({
            name: "Triadic 1",
            color: rgbToHex(triad1Rgb.r, triad1Rgb.g, triad1Rgb.b),
            description: "120° color harmony"
        });

        const triad2Hue = (hsb.h + 240) % 360;
        const triad2Rgb = hsbToRgb(triad2Hue, hsb.s, hsb.b);
        colors.push({
            name: "Triadic 2",
            color: rgbToHex(triad2Rgb.r, triad2Rgb.g, triad2Rgb.b),
            description: "240° color harmony"
        });

        // Analogous colors
        const analog1Hue = (hsb.h + 30) % 360;
        const analog1Rgb = hsbToRgb(analog1Hue, hsb.s, hsb.b);
        colors.push({
            name: "Analogous +30°",
            color: rgbToHex(analog1Rgb.r, analog1Rgb.g, analog1Rgb.b),
            description: "Adjacent harmony"
        });

        const analog2Hue = (hsb.h - 30 + 360) % 360;
        const analog2Rgb = hsbToRgb(analog2Hue, hsb.s, hsb.b);
        colors.push({
            name: "Analogous -30°",
            color: rgbToHex(analog2Rgb.r, analog2Rgb.g, analog2Rgb.b),
            description: "Adjacent harmony"
        });

        // Monochromatic variations
        const mono1Rgb = hsbToRgb(hsb.h, hsb.s, Math.min(100, hsb.b + 20));
        colors.push({
            name: "Lighter",
            color: rgbToHex(mono1Rgb.r, mono1Rgb.g, mono1Rgb.b),
            description: "Lighter shade"
        });

        const mono2Rgb = hsbToRgb(hsb.h, hsb.s, Math.max(0, hsb.b - 20));
        colors.push({
            name: "Darker",
            color: rgbToHex(mono2Rgb.r, mono2Rgb.g, mono2Rgb.b),
            description: "Darker shade"
        });

        return colors;
    }, []);

    // Update complementary colors when current color changes
    useEffect(() => {
        setComplementaryColors(generateComplementaryColors(currentColor));
    }, [currentColor, generateComplementaryColors]);


    // Format color based on current mode
    const formatColor = useCallback((hex) => {
        const rgb = hexToRgb(hex);
        if (!rgb) return hex;

        switch (colorMode) {
            case "rgb":
                return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            case "hsb": {
                const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b);
                return `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)`;
            }
            case "hsl": {
                const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b);
                const hsl = hsbToHsl(hsb.h, hsb.s, hsb.b);
                return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            }
            default:
                return hex.toUpperCase();
        }
    }, [colorMode]);

    // Convert HSB to HSL
    const hsbToHsl = (h, s, b) => {
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

    // Copy color to clipboard with improved feedback
    const copyToClipboard = useCallback(async (color) => {
        try {
            const formattedColor = formatColor(color);
            await navigator.clipboard.writeText(formattedColor);
            toast({
                title: "Copied! 🎨",
                description: `${formattedColor} copied to clipboard`,
            });
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = formatColor(color);
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            toast({
                title: "Copied! 🎨",
                description: `${formatColor(color)} copied to clipboard`,
            });
        }
    }, [formatColor, toast]);

    // Add color to palette with duplicate check
    const addToPalette = useCallback((color) => {
        if (!savedPalette.includes(color)) {
            setSavedPalette(prev => [...prev, color]);
            toast({
                title: "Added to palette 🎯",
                description: `${formatColor(color)} added to your palette`,
            });
        } else {
            toast({
                title: "Already in palette",
                description: "This color is already in your palette",
                variant: "secondary",
            });
        }
    }, [savedPalette, formatColor, toast]);

    // Remove color from palette
    const removeFromPalette = useCallback((color) => {
        setSavedPalette(prev => prev.filter(c => c !== color));
        toast({
            title: "Removed from palette",
            description: `Color removed from your palette`,
        });
    }, [toast]);

    // Generate random color with better distribution
    const generateRandomColor = useCallback(() => {
        // Generate colors with better saturation and brightness distribution
        const hue = Math.floor(Math.random() * 360);
        const saturation = 40 + Math.floor(Math.random() * 60); // 40-100%
        const brightness = 30 + Math.floor(Math.random() * 70); // 30-100%
        
        const rgb = hsbToRgb(hue, saturation, brightness);
        const randomHex = rgbToHex(rgb.r, rgb.g, rgb.b);
        
        setCurrentColor(randomHex);
        setColorHistory(prev => [randomHex, ...prev.filter(c => c !== randomHex)].slice(0, 10));
        
        toast({
            title: "New random color! 🎲",
            description: `Generated ${formatColor(randomHex)}`,
        });
    }, [formatColor, toast]);

    // Load popular palette
    const loadPopularPalette = useCallback((paletteName) => {
        const colors = POPULAR_PALETTES[paletteName];
        if (colors) {
            setSavedPalette(colors);
            setCurrentColor(colors[0]);
            setSelectedPalette(paletteName);
            toast({
                title: "Palette loaded! 🎨",
                description: `${paletteName} palette loaded with ${colors.length} colors`,
            });
        }
    }, [toast]);

    // Export palette with multiple formats
    const exportPalette = useCallback(() => {
        const paletteData = {
            name: customPaletteName || selectedPalette || "Custom Palette",
            colors: savedPalette.map(color => {
                const rgb = hexToRgb(color);
                const hsb = rgb ? rgbToHsb(rgb.r, rgb.g, rgb.b) : null;
                const hsl = hsb ? hsbToHsl(hsb.h, hsb.s, hsb.b) : null;
                return {
                    hex: color,
                    rgb: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '',
                    hsl: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '',
                    hsb: hsb ? `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)` : ''
                };
            }),
            exportDate: new Date().toISOString(),
            totalColors: savedPalette.length
        };

        const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${paletteData.name.replace(/\s+/g, '-').toLowerCase()}-palette.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({
            title: "Palette exported! 📁",
            description: `${paletteData.name} palette downloaded as JSON`,
        });
    }, [savedPalette, customPaletteName, selectedPalette, formatColor, toast]);

    // Update color and history
    const updateColor = useCallback((newColor) => {
        setCurrentColor(newColor);
        setColorHistory(prev => [newColor, ...prev.filter(c => c !== newColor)].slice(0, 12));
    }, []);


    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background">
                <NavBar />
                <main className="mt-15 flex-1 container mx-auto px-4 py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold mb-4 " tabIndex={0}>
                                Color Picker & Palette Generator
                            </h1>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Color Picker */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="lg:col-span-2 bg-card rounded-xl p-6 border border-border/50"
                                aria-label="Main Color Picker"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                                        <Palette className="text-primary" size={24} />
                                        Color Studio
                                    </h2>
                                    <button
                                        onClick={() => setShowColorDetails(!showColorDetails)}
                                        className="p-2 rounded-lg transition-colors hover:bg-muted"
                                        aria-label="Toggle color details"
                                    >
                                        <Lightbulb size={18} className={showColorDetails ? 'text-yellow-500' : 'text-muted-foreground'} />
                                    </button>
                                </div>

                                {/* Color Display */}
                                <ColorSwatch
                                    color={currentColor}
                                    onClick={() => copyToClipboard(currentColor)}
                                    label="Current color preview (click to copy)"
                                    className="w-full mb-4 border-4 hover:scale-105"
                                    size="h-40"
                                />

                                {/* Color Input */}
                                <div className="mb-4">
                                    <input
                                        type="color"
                                        value={currentColor}
                                        onChange={(e) => updateColor(e.target.value)}
                                        className="w-full h-16 rounded-lg border-2 border-border cursor-pointer"
                                        aria-label="Choose color"
                                    />
                                </div>

                                {/* Color Mode Selector */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" htmlFor="color-mode-select">Display Format:</label>
                                    <select
                                        id="color-mode-select"
                                        value={colorMode}
                                        onChange={(e) => setColorMode(e.target.value)}
                                        className="w-full p-3 rounded-lg border border-border bg-background"
                                        aria-label="Color display format"
                                    >
                                        <option value="hex">HEX</option>
                                        <option value="rgb">RGB</option>
                                        <option value="hsl">HSL</option>
                                        <option value="hsb">HSB</option>
                                    </select>
                                </div>

                                {/* Color Value Display */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg backdrop-blur-sm">
                                        <span className="font-mono text-xl flex-1 font-bold">{formatColor(currentColor)}</span>
                                        <IconButton onClick={() => copyToClipboard(currentColor)} label="Copy color value">
                                            <Copy size={18} />
                                        </IconButton>
                                    </div>
                                </div>

                                {/* Color Details Panel */}
                                {showColorDetails && colorDetails && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mb-6 p-4 bg-muted/30 rounded-lg border border-border/30"
                                    >
                                        <h3 className="font-medium mb-3 flex items-center gap-2">
                                            <Lightbulb size={16} className="text-yellow-500" />
                                            Color Analysis
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-muted-foreground">Luminance:</span>
                                                <span className="ml-2 font-mono">{(colorDetails.luminance * 100).toFixed(1)}%</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Type:</span>
                                                <span className="ml-2">{colorDetails.isLight ? 'Light' : 'Dark'}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">RGB:</span>
                                                <span className="ml-2 font-mono">{colorDetails.rgb.r}, {colorDetails.rgb.g}, {colorDetails.rgb.b}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">HSB:</span>
                                                <span className="ml-2 font-mono">{colorDetails.hsb.h}°, {colorDetails.hsb.s}%, {colorDetails.hsb.b}%</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <button
                                        onClick={generateRandomColor}
                                        className="flex items-center justify-center gap-2 p-3 hover:shadow-lg transition-all duration-500 rounded-lg bg-primary/30"
                                        aria-label="Generate random color"
                                    >
                                        <Shuffle size={18} />
                                        Random
                                    </button>
                                    <button
                                        onClick={() => addToPalette(currentColor)}
                                        className="flex items-center justify-center gap-2 p-3  rounded-lg hover:shadow-lg transition-all duration-200 bg-primary/30"
                                        aria-label="Save color to palette"
                                    >
                                        <Heart size={18} />
                                        Save
                                    </button>
                                </div>

                                {/* Color History */}
                                <div>
                                    <h3 className="text-lg font-medium mb-3">Recent Colors</h3>
                                    <div className="grid grid-cols-6 gap-2">
                                        {colorHistory.map((color, index) => (
                                            <ColorSwatch
                                                key={index}
                                                color={color}
                                                onClick={() => setCurrentColor(color)}
                                                label={`Recent color ${color}`}
                                                className="transition-all duration-200 hover:shadow-md"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Popular Palettes Sidebar */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-card rounded-xl p-6 border border-border/50"
                                aria-label="Popular Palettes"
                            >
                                <h2 className="text-2xl font-semibold mb-4">Popular Palettes</h2>
                                
                                <div className="space-y-4">
                                    {Object.entries(POPULAR_PALETTES).map(([name, colors]) => (
                                        <div key={name} className="border border-border/30 rounded-lg p-3 hover:border-border/60 transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-sm">{name}</span>
                                                <button
                                                    onClick={() => loadPopularPalette(name)}
                                                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                                                >
                                                    Load
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-5 gap-1">
                                                {colors.map((color, idx) => (
                                                    <ColorSwatch
                                                        key={idx}
                                                        color={color}
                                                        onClick={() => setCurrentColor(color)}
                                                        label={`${name} color ${color}`}
                                                        size="aspect-square h-8"
                                                        className="border border-border/30"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Color Harmony Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-8 bg-card rounded-xl p-6 border border-border/50"
                            aria-label="Color Harmony"
                        >
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <Palette className="text-blue-500" size={24} />
                                Color Harmony
                            </h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {complementaryColors.map((colorObj, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="flex items-center gap-3 p-3 rounded-lg border border-border/30 hover:border-border/60 hover:bg-muted/30 transition-all duration-200"
                                    >
                                        <ColorSwatch
                                            color={colorObj.color}
                                            onClick={() => setCurrentColor(colorObj.color)}
                                            label={`Color harmony ${colorObj.name}`}
                                            size="w-12 h-12"
                                            className="flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-sm">{colorObj.name}</div>
                                            <div className="text-xs text-muted-foreground mb-1">{colorObj.description}</div>
                                            <div className="text-xs font-mono text-foreground/70">
                                                {formatColor(colorObj.color)}
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <IconButton 
                                                onClick={() => copyToClipboard(colorObj.color)} 
                                                label={`Copy ${colorObj.name} color value`}
                                                className="p-1.5"
                                            >
                                                <Copy size={14} />
                                            </IconButton>
                                            <IconButton 
                                                onClick={() => addToPalette(colorObj.color)} 
                                                label={`Save ${colorObj.name} to palette`}
                                                className="p-1.5"
                                            >
                                                <Plus size={14} />
                                            </IconButton>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Saved Palette */}
                        {savedPalette.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mt-8 bg-card rounded-xl p-6 border border-border/50"
                                aria-label="Saved Palette"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-1">Your Palette</h2>
                                        <p className="text-sm text-muted-foreground">{savedPalette.length} colors saved</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            placeholder="Palette name..."
                                            value={customPaletteName}
                                            onChange={(e) => setCustomPaletteName(e.target.value)}
                                            className="px-3 py-1 text-sm border border-border rounded-lg bg-background"
                                        />
                                        <button
                                            onClick={exportPalette}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                                            aria-label="Export palette as JSON"
                                        >
                                            <Download size={18} />
                                            Export
                                        </button>
                                        <button
                                            onClick={() => setSavedPalette([])}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400/60"
                                            aria-label="Clear palette"
                                        >
                                            <RotateCcw size={18} />
                                            Clear
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                                    {savedPalette.map((color, index) => (
                                        <motion.div 
                                            key={index} 
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.02 }}
                                            className="text-center"
                                        >
                                            <ColorSwatch
                                                color={color}
                                                onClick={() => setCurrentColor(color)}
                                                label={`Palette color ${color}`}
                                                className="mb-2 hover:shadow-lg"
                                                showDelete={true}
                                                onDelete={() => removeFromPalette(color)}
                                            />
                                            <div className="text-xs font-mono mb-2 px-1 truncate" title={formatColor(color)}>
                                                {formatColor(color)}
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(color)}
                                                className="text-xs px-2 py-1 hover:bg-muted rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60 w-full"
                                                aria-label={`Copy palette color ${color}`}
                                            >
                                                Copy
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}
