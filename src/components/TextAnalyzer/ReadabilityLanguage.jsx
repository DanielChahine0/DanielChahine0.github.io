/*
 * ReadabilityLanguage.jsx
 * -----------------------
 * Small UI block showing the readability score and detected language.
 *
 * Props:
 * - analysis: object (expects analysis.readabilityScore and analysis.language)
 * - getReadabilityLevel(score) -> { level, color }
 * - getLanguageFlag(lang) -> emoji/icon
 */

import { motion } from "framer-motion";
import { BarChart3, Globe } from "lucide-react";

export function ReadabilityLanguage({ analysis, getReadabilityLevel, getLanguageFlag }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 mt-3 border border-border/50 shadow-lg shadow-black/5"
        >
            <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-3">
                <span className="w-full text-center block">Readability & Language</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.1 }}
                    className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 rounded-lg p-1 mt-1 text-center border border-indigo-200/50 dark:border-indigo-800/50"
                >
                    <BarChart3 className="text-indigo-600 dark:text-indigo-400 mx-auto mb-1" size={20} />
                    <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{analysis.readabilityScore}</div>
                    <div className={`text-sm font-medium ${getReadabilityLevel(analysis.readabilityScore).color}`}>
                        {getReadabilityLevel(analysis.readabilityScore).level}
                    </div>
                </motion.div>
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                    className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/50 dark:to-cyan-900/50 rounded-lg p-1 mt-1 text-center border border-cyan-200/50 dark:border-cyan-800/50"
                >
                    <Globe className="text-cyan-600 dark:text-cyan-400 mx-auto mb-1" size={20} />
                    <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        {getLanguageFlag(analysis.language)} {analysis.language.toUpperCase()}
                    </div>
                    <div className="text-md text-white">Language</div>
                </motion.div>
            </div>
        </motion.div>
    );
}
