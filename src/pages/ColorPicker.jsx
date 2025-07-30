import { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
import { Palette, Copy, Download, RotateCcw, Eye, Shuffle } from "lucide-react";
import { useToast } from "../hooks/use-toast";

export default function ColorPicker() {
    const { toast } = useToast();
    const [currentColor, setCurrentColor] = useState("#3B82F6");
    const [colorMode, setColorMode] = useState("hex");
    const [savedPalette, setSavedPalette] = useState([]);
    const [complementaryColors, setComplementaryColors] = useState([]);
    const [colorHistory, setColorHistory] = useState(["#3B82F6"]);

    // Convert hex to RGB
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    // Convert RGB to HSB
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

    // Convert HSB to RGB
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

    // Convert RGB to hex
    const rgbToHex = (r, g, b) => {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    };

    // Generate complementary and related colors
    const generateComplementaryColors = (hex) => {
        const rgb = hexToRgb(hex);
        if (!rgb) return [];

        const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b);
        const colors = [];

        // Complementary (180 degrees)
        const compHue = (hsb.h + 180) % 360;
        const compRgb = hsbToRgb(compHue, hsb.s, hsb.b);
        colors.push({
            name: "Complementary",
            color: rgbToHex(compRgb.r, compRgb.g, compRgb.b)
        });

        // Triadic (120 degrees)
        const triad1Hue = (hsb.h + 120) % 360;
        const triad1Rgb = hsbToRgb(triad1Hue, hsb.s, hsb.b);
        colors.push({
            name: "Triadic 1",
            color: rgbToHex(triad1Rgb.r, triad1Rgb.g, triad1Rgb.b)
        });

        const triad2Hue = (hsb.h + 240) % 360;
        const triad2Rgb = hsbToRgb(triad2Hue, hsb.s, hsb.b);
        colors.push({
            name: "Triadic 2",
            color: rgbToHex(triad2Rgb.r, triad2Rgb.g, triad2Rgb.b)
        });

        // Analogous colors
        const analog1Hue = (hsb.h + 30) % 360;
        const analog1Rgb = hsbToRgb(analog1Hue, hsb.s, hsb.b);
        colors.push({
            name: "Analogous 1",
            color: rgbToHex(analog1Rgb.r, analog1Rgb.g, analog1Rgb.b)
        });

        const analog2Hue = (hsb.h - 30 + 360) % 360;
        const analog2Rgb = hsbToRgb(analog2Hue, hsb.s, hsb.b);
        colors.push({
            name: "Analogous 2",
            color: rgbToHex(analog2Rgb.r, analog2Rgb.g, analog2Rgb.b)
        });

        return colors;
    };

    // Update complementary colors when current color changes
    useEffect(() => {
        setComplementaryColors(generateComplementaryColors(currentColor));
    }, [currentColor]);

    // Format color based on current mode
    const formatColor = (hex) => {
        const rgb = hexToRgb(hex);
        if (!rgb) return hex;

        switch (colorMode) {
            case "rgb":
                return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            case "hsb":
                const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b);
                return `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)`;
            default:
                return hex.toUpperCase();
        }
    };

    // Copy color to clipboard
    const copyToClipboard = async (color) => {
        try {
            await navigator.clipboard.writeText(formatColor(color));
            toast({
                title: "Copied!",
                description: `${formatColor(color)} copied to clipboard`,
            });
        } catch (err) {
            toast({
                title: "Copy failed",
                description: "Failed to copy color to clipboard",
                variant: "destructive",
            });
        }
    };

    // Add color to palette
    const addToPalette = (color) => {
        if (!savedPalette.includes(color)) {
            setSavedPalette(prev => [...prev, color]);
            toast({
                title: "Added to palette",
                description: `${formatColor(color)} added to your palette`,
            });
        }
    };

    // Remove color from palette
    const removeFromPalette = (color) => {
        setSavedPalette(prev => prev.filter(c => c !== color));
    };

    // Generate random color
    const generateRandomColor = () => {
        const randomHex = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        setCurrentColor(randomHex);
        setColorHistory(prev => [randomHex, ...prev.slice(0, 9)]);
    };

    // Export palette
    const exportPalette = () => {
        const paletteData = {
            colors: savedPalette.map(color => ({
                hex: color,
                rgb: formatColor(color).includes('rgb') ? formatColor(color) : `rgb(${hexToRgb(color)?.r}, ${hexToRgb(color)?.g}, ${hexToRgb(color)?.b})`,
                hsb: (() => {
                    const rgb = hexToRgb(color);
                    const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b);
                    return `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)`;
                })()
            })),
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'color-palette.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({
            title: "Palette exported",
            description: "Your color palette has been downloaded as JSON",
        });
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background">
                <NavBar />
                <main className="mt-10 flex-1 container mx-auto px-4 py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold mb-4">Color Picker & Palette Generator</h1>
                            <p className="text-lg text-foreground/80">
                                Create beautiful color palettes with complementary colors, multiple formats, and export capabilities.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Main Color Picker */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-card rounded-lg p-6"
                            >
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                                    <Palette className="text-pink-500" size={24} />
                                    Main Color
                                </h2>
                                
                                {/* Color Display */}
                                <div 
                                    className="w-full h-32 rounded-lg mb-4 border-4 border-border cursor-pointer transition-transform hover:scale-105"
                                    style={{ backgroundColor: currentColor }}
                                    onClick={() => copyToClipboard(currentColor)}
                                />

                                {/* Color Input */}
                                <div className="mb-4">
                                    <input
                                        type="color"
                                        value={currentColor}
                                        onChange={(e) => {
                                            setCurrentColor(e.target.value);
                                            setColorHistory(prev => [e.target.value, ...prev.slice(0, 9)]);
                                        }}
                                        className="w-full h-12 rounded-lg border-2 border-border cursor-pointer"
                                    />
                                </div>

                                {/* Color Mode Selector */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Display Format:</label>
                                    <select 
                                        value={colorMode} 
                                        onChange={(e) => setColorMode(e.target.value)}
                                        className="w-full p-2 rounded-lg border border-border bg-background"
                                    >
                                        <option value="hex">HEX</option>
                                        <option value="rgb">RGB</option>
                                        <option value="hsb">HSB</option>
                                    </select>
                                </div>

                                {/* Color Value Display */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                                        <span className="font-mono text-lg flex-1">{formatColor(currentColor)}</span>
                                        <button
                                            onClick={() => copyToClipboard(currentColor)}
                                            className="p-2 hover:bg-background rounded-lg transition-colors"
                                        >
                                            <Copy size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 mb-4">
                                    <button
                                        onClick={generateRandomColor}
                                        className="flex-1 flex items-center justify-center gap-2 p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        <Shuffle size={18} />
                                        Random
                                    </button>
                                    <button
                                        onClick={() => addToPalette(currentColor)}
                                        className="flex-1 flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        <Eye size={18} />
                                        Save
                                    </button>
                                </div>

                                {/* Color History */}
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Recent Colors</h3>
                                    <div className="grid grid-cols-5 gap-2">
                                        {colorHistory.map((color, index) => (
                                            <div
                                                key={index}
                                                className="aspect-square rounded-lg border-2 border-border cursor-pointer hover:scale-110 transition-transform"
                                                style={{ backgroundColor: color }}
                                                onClick={() => setCurrentColor(color)}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Complementary Colors */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-card rounded-lg p-6"
                            >
                                <h2 className="text-2xl font-semibold mb-4">Color Harmony</h2>
                                
                                <div className="space-y-4">
                                    {complementaryColors.map((colorObj, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div
                                                className="w-12 h-12 rounded-lg border-2 border-border cursor-pointer hover:scale-110 transition-transform"
                                                style={{ backgroundColor: colorObj.color }}
                                                onClick={() => setCurrentColor(colorObj.color)}
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium">{colorObj.name}</div>
                                                <div className="text-sm text-foreground/70 font-mono">
                                                    {formatColor(colorObj.color)}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(colorObj.color)}
                                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                                            >
                                                <Copy size={16} />
                                            </button>
                                            <button
                                                onClick={() => addToPalette(colorObj.color)}
                                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Saved Palette */}
                        {savedPalette.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="mt-8 bg-card rounded-lg p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-semibold">Your Palette</h2>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={exportPalette}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            <Download size={18} />
                                            Export
                                        </button>
                                        <button
                                            onClick={() => setSavedPalette([])}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            <RotateCcw size={18} />
                                            Clear
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {savedPalette.map((color, index) => (
                                        <div key={index} className="text-center">
                                            <div
                                                className="aspect-square rounded-lg border-2 border-border cursor-pointer hover:scale-110 transition-transform mb-2"
                                                style={{ backgroundColor: color }}
                                                onClick={() => setCurrentColor(color)}
                                            />
                                            <div className="text-xs font-mono mb-1">{formatColor(color)}</div>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => copyToClipboard(color)}
                                                    className="flex-1 p-1 text-xs hover:bg-muted rounded transition-colors"
                                                >
                                                    Copy
                                                </button>
                                                <button
                                                    onClick={() => removeFromPalette(color)}
                                                    className="flex-1 p-1 text-xs hover:bg-muted rounded transition-colors text-red-500"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
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
