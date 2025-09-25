/*
 * DetailedAnalysis.jsx
 * --------------------
 * Displays secondary metrics derived from the main analysis object such as
 * sentences, paragraphs, and averages. This is a pure presentational
 * component and expects a fully-formed `analysis` object (see
 * textAnalysisUtils.analyzeText for structure).
 *
 * Props:
 * - analysis: object with keys { sentences, paragraphs, averageWordsPerSentence, averageSentencesPerParagraph }
 */

import { motion } from "framer-motion";
import { MessageSquare, FileSearch } from "lucide-react";

export function DetailedAnalysis({ analysis }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 mt-3 border border-border/50 shadow-lg shadow-black/5"
        >
            <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-3">
                <span className="w-full text-center block">Detailed Analysis</span>
            </h3>
            <div className="space-y-1">
                <div className="flex justify-between items-center p-1 mt-1 bg-background/50 rounded-lg">
                    <span className="text-foreground flex items-center gap-2">
                        <MessageSquare size={16} />
                        Sentences:
                    </span>
                    <span className="font-semibold text-foreground">{analysis.sentences.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-1 mt-1 bg-background/50 rounded-lg">
                    <span className="text-foreground flex items-center gap-2">
                        <FileSearch size={16} />
                        Paragraphs:
                    </span>
                    <span className="font-semibold text-foreground">{analysis.paragraphs.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-1 mt-1 bg-background/50 rounded-lg">
                    <span className="text-foreground">Avg words/sentence:</span>
                    <span className="font-semibold text-foreground">
                        {analysis.averageWordsPerSentence}
                    </span>
                </div>
                <div className="flex justify-between items-center p-1 mt-1 bg-background/50 rounded-lg">
                    <span className="text-foreground">Avg sentences/paragraph:</span>
                    <span className="font-semibold text-foreground">
                        {analysis.averageSentencesPerParagraph}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
