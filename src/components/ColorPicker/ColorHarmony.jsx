import { motion } from "framer-motion";
import { Palette, Copy, Plus } from "lucide-react";
import ColorSwatch from "./ColorSwatch";
import IconButton from "./IconButton";

const ColorHarmony = ({ 
    complementaryColors, 
    formatColor, 
    setCurrentColor, 
    copyToClipboard, 
    addToPalette 
}) => {
    return (
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
    );
};

export default ColorHarmony;
