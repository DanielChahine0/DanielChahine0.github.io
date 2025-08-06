import { motion } from "framer-motion";
import { POPULAR_PALETTES } from "./colorPalettes";
import ColorSwatch from "./ColorSwatch";

const PopularPalettes = ({ setCurrentColor, loadPopularPalette }) => {
    return (
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
    );
};

export default PopularPalettes;
