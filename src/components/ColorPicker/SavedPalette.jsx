/**
 * SavedPalette Component
 * Manages and displays the user's custom color palette.
 * Features:
 * - Display saved colors
 * - Custom palette naming
 * - Export functionality
 * - Color removal
 * - Color selection
 * - Empty state handling
 */

import { motion } from "framer-motion";
import { Download, RotateCcw } from "lucide-react";
import ColorSwatch from "./ColorSwatch";

const SavedPalette = ({ 
    savedPalette, 
    customPaletteName, 
    setCustomPaletteName, 
    exportPalette, 
    setSavedPalette, 
    setCurrentColor, 
    removeFromPalette, 
    formatColor, 
    copyToClipboard 
}) => {
    if (savedPalette.length === 0) return null;

    return (
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
    );
};

export default SavedPalette;
