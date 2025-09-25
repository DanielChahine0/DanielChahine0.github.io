/*
 * KeywordDensity.jsx
 * ------------------
 * Renders the detected keywords and their densities. The component is
 * controlled via `showKeywords` to allow collapsing the list while keeping
 * the analysis available.
 *
 * Props:
 * - analysis: object (expects analysis.keywordDensity array)
 * - showKeywords: boolean - controls visibility
 * - setShowKeywords: function - toggles visibility
 */

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export function KeywordDensity({ analysis, showKeywords, setShowKeywords }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 mt-3 border border-border/50 shadow-lg shadow-black/5"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-3">
                    <TrendingUp size={18} />
                    Keyword Density
                </h3>
                <button
                    onClick={() => setShowKeywords(!showKeywords)}
                    className="text-sm text-teal-600 hover:text-teal-700 transition-colors duration-200"
                    disabled={analysis.keywordDensity.length === 0}
                >
                    {showKeywords ? 'Hide' : 'Show'} Keywords
                </button>
            </div>
            
            {showKeywords && analysis.keywordDensity.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                >
                    {analysis.keywordDensity.slice(0, 5).map((item, index) => (
                        <div key={item.word} className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                            <span className="text-foreground font-medium">{item.word}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-foreground/70">{item.count}x</span>
                                <span className="text-sm font-bold text-teal-600">{item.density}%</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}
            
            {!showKeywords && analysis.keywordDensity.length > 0 && (
                <div className="text-sm text-foreground/70 text-center py-2">
                    {analysis.keywordDensity.length} keywords analyzed. Click "Show Keywords" to view details.
                </div>
            )}
            
            {analysis.keywordDensity.length === 0 && (
                <div className="text-sm text-foreground/50 text-center py-4">
                    No keywords to analyze yet. Add some text to see keyword density.
                </div>
            )}
        </motion.div>
    );
}
