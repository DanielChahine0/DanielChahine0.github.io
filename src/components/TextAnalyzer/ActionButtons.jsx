import { motion } from "framer-motion";
import { Copy, TrendingUp, FileText, Zap, BarChart3 } from "lucide-react";

export function ActionButtons({ text, analysis, copyToClipboard, downloadAnalysis, showKeywords, setShowKeywords }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="space-y-3"
        >
            <div className="flex gap-2">
                <button
                    onClick={() => copyToClipboard(`Text Analysis Results:\n• Characters: ${analysis.characters.toLocaleString()}\n• Words: ${analysis.words.toLocaleString()}\n• Reading Time: ${analysis.readingTime} min\n• Sentiment: ${analysis.sentiment}\n• Readability: ${analysis.readabilityScore}/100\n• Language: ${analysis.language.toUpperCase()}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-2 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-teal-500/25"
                    disabled={!text.trim()}
                >
                    <Copy size={16} />
                    Copy Results
                </button>
                <button
                    onClick={() => setShowKeywords(!showKeywords)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!text.trim() || analysis.keywordDensity.length === 0}
                >
                    <TrendingUp size={16} />
                    Keywords
                </button>
            </div>
            
            {/* Export Options */}
            <div className="grid grid-cols-3 gap-2">
                <button
                    onClick={() => downloadAnalysis('txt')}
                    className="flex items-center justify-center gap-1 px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!text.trim()}
                >
                    <FileText size={14} />
                    TXT
                </button>
                <button
                    onClick={() => downloadAnalysis('json')}
                    className="flex items-center justify-center gap-1 px-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!text.trim()}
                >
                    <Zap size={14} />
                    JSON
                </button>
                <button
                    onClick={() => downloadAnalysis('csv')}
                    className="flex items-center justify-center gap-1 px-2 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!text.trim()}
                >
                    <BarChart3 size={14} />
                    CSV
                </button>
            </div>
        </motion.div>
    );
}
