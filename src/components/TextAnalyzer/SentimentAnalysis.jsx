import { motion } from "framer-motion";

export function SentimentAnalysis({ analysis, getSentimentColor, getSentimentEmoji }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 mt-3 border border-border/50 shadow-lg shadow-black/5"
        >
            <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-3">
                <span className="w-full text-center block">Sentiment Analysis</span>
            </h3>
            <div className={`p-1 mt-1 rounded-xl border-2 ${getSentimentColor(analysis.sentiment)} transition-all duration-300`}>
                <div className="flex items-center gap-2">
                    <span className="text-3xl">{getSentimentEmoji(analysis.sentiment)}</span>
                    <div className="flex-1">
                        <div className="font-bold text-lg capitalize text-neutral-900 dark:text-neutral-100">{analysis.sentiment}</div>
                        <div className="text-sm text-neutral-700 dark:text-neutral-300">
                            {analysis.sentiment === 'positive' && "Your text conveys positive emotions and optimism"}
                            {analysis.sentiment === 'negative' && "Your text expresses negative emotions or concerns"}
                            {analysis.sentiment === 'neutral' && "Your text maintains a balanced, neutral tone"}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
