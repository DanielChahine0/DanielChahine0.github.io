import { motion } from "framer-motion";
import { Type, Hash, BookOpen, Clock } from "lucide-react";

export function QuickStats({ analysis }) {
    return (
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 mt-3 border border-border/50 shadow-lg shadow-black/5">
            <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-3">
                <span className="w-full text-center block">Quick Stats</span>
            </h2>
            <div className="grid grid-cols-2 gap-2 mt-2">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg p-1 mt-1 text-center border border-blue-200/50 dark:border-blue-800/50"
                >
                    <Type className="text-blue-600 dark:text-blue-400 mx-auto mb-1" size={20} />
                    <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{analysis.characters.toLocaleString()}</div>
                    <div className="text-md text-white">Characters</div>
                </motion.div>
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-lg p-1 mt-1 text-center border border-green-200/50 dark:border-green-800/50"
                >
                    <Hash className="text-green-600 dark:text-green-400 mx-auto mb-1" size={20} />
                    <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{analysis.charactersNoSpaces.toLocaleString()}</div>
                    <div className="text-md text-white">Spaces</div>
                </motion.div>
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 rounded-lg p-1 mt-1 text-center border border-purple-200/50 dark:border-purple-800/50"
                >
                    <BookOpen className="text-purple-600 dark:text-purple-400 mx-auto mb-1" size={20} />
                    <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{analysis.words.toLocaleString()}</div>
                    <div className="text-md text-white">Words</div>
                </motion.div>
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.9 }}
                    className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 rounded-lg p-1 mt-1 text-center border border-orange-200/50 dark:border-orange-800/50"
                >
                    <Clock className="text-orange-600 dark:text-orange-400 mx-auto mb-1" size={20} />
                    <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{analysis.readingTime}</div>
                    <div className="text-md text-white">Min Read</div>
                </motion.div>
            </div>
        </div>
    );
}
