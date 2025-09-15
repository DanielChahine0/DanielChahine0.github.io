/**
 * ColorStudio Component
 * The main color picker interface that allows users to:
 * - Select colors using a color picker
 * - View color in different formats (HEX, RGB, HSL, HSB)
 * - Copy color values
 * - Generate random colors
 * - View color analysis
 * - Add colors to palette
 */

import { motion } from "framer-motion";
import { Palette, Copy, Shuffle, Heart } from "lucide-react";
import { Lightbulb } from "lucide-react";
import ColorSwatch from "./ColorSwatch";
import IconButton from "./IconButton";

const ColorStudio = ({ 
    currentColor, 
    colorMode, 
    setColorMode, 
    formatColor, 
    copyToClipboard, 
    updateColor, 
    generateRandomColor, 
    addToPalette, 
    colorHistory, 
    showColorDetails, 
    setShowColorDetails, 
    colorDetails 
}) => {
    return (
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
                            onClick={() => updateColor(color)}
                            label={`Recent color ${color}`}
                            className="transition-all duration-200 hover:shadow-md"
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ColorStudio;
