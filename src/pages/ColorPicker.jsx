
import { useState, useEffect, useCallback, useMemo } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
import { useToast } from "../hooks/use-toast";

// Import Color Picker Components
import ColorStudio from "../components/ColorPicker/ColorStudio";
import PopularPalettes from "../components/ColorPicker/PopularPalettes";
import ColorHarmony from "../components/ColorPicker/ColorHarmony";
import SavedPalette from "../components/ColorPicker/SavedPalette";

// Import utilities and constants
import { hexToRgb, rgbToHsb, hsbToRgb, rgbToHex } from "../components/ColorPicker/colorUtils";
import { POPULAR_PALETTES } from "../components/ColorPicker/colorPalettes";


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
                title: "Copied!",
                description: `${formattedColor} copied to clipboard`,
            });
        } catch (error) {
                console.error('copyToClipboard fallback error:', error);
                // Fallback for older browsers
                const textArea = document.createElement("textarea");
                textArea.value = formatColor(color);
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            
                toast({
                    title: "Copied!",
                    description: `${formatColor(color)} copied to clipboard`,
                });
            }
    }, [formatColor, toast]);

    // Add color to palette with duplicate check
    const addToPalette = useCallback((color) => {
        if (!savedPalette.includes(color)) {
            setSavedPalette(prev => [...prev, color]);
            toast({
                title: "Added to palette",
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
            title: "New random color!",
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
                title: "Palette loaded!",
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
            title: "Palette exported!",
            description: `${paletteData.name} palette downloaded as JSON`,
        });
    }, [savedPalette, customPaletteName, selectedPalette, toast]);

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
                            <ColorStudio 
                                currentColor={currentColor}
                                colorMode={colorMode}
                                setColorMode={setColorMode}
                                formatColor={formatColor}
                                copyToClipboard={copyToClipboard}
                                updateColor={updateColor}
                                generateRandomColor={generateRandomColor}
                                addToPalette={addToPalette}
                                colorHistory={colorHistory}
                                showColorDetails={showColorDetails}
                                setShowColorDetails={setShowColorDetails}
                                colorDetails={colorDetails}
                            />

                            {/* Popular Palettes Sidebar */}
                            <PopularPalettes 
                                setCurrentColor={setCurrentColor}
                                loadPopularPalette={loadPopularPalette}
                            />
                        </div>

                        {/* Color Harmony Section */}
                        <ColorHarmony 
                            complementaryColors={complementaryColors}
                            formatColor={formatColor}
                            setCurrentColor={setCurrentColor}
                            copyToClipboard={copyToClipboard}
                            addToPalette={addToPalette}
                        />

                        {/* Saved Palette */}
                        <SavedPalette 
                            savedPalette={savedPalette}
                            customPaletteName={customPaletteName}
                            setCustomPaletteName={setCustomPaletteName}
                            exportPalette={exportPalette}
                            setSavedPalette={setSavedPalette}
                            setCurrentColor={setCurrentColor}
                            removeFromPalette={removeFromPalette}
                            formatColor={formatColor}
                            copyToClipboard={copyToClipboard}
                        />
                    </motion.div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}
