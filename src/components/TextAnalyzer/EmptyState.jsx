import { motion } from "framer-motion";

export function EmptyState() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="mt-16 text-center"
        >
            <div className="max-w-md mx-auto">
                <p className="text-foreground mb-6">Start typing, paste your text, or load a template to see comprehensive analysis including readability scoring, keyword density, language detection, and more!</p>
                <div className="flex flex-wrap justify-center gap-2 text-sm text-foreground/70">
                    <span className="bg-teal-100 dark:bg-teal-900/30 px-2 py-1 rounded">📊 Readability Scoring</span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded">🔍 Keyword Density</span>
                    <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">🌐 Language Detection</span>
                    <span className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">📁 Multiple Export Formats</span>
                    <span className="bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded">📝 Template Library</span>
                </div>
            </div>
        </motion.div>
    );
}
