import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
import { toast } from "../hooks/use-toast";

// Import TextAnalyzer components
import { TextInput } from "../components/TextAnalyzer/TextInput";
import { QuickStats } from "../components/TextAnalyzer/QuickStats";
import { ReadabilityLanguage } from "../components/TextAnalyzer/ReadabilityLanguage";
import { DetailedAnalysis } from "../components/TextAnalyzer/DetailedAnalysis";
import { KeywordDensity } from "../components/TextAnalyzer/KeywordDensity";
import { SentimentAnalysis } from "../components/TextAnalyzer/SentimentAnalysis";
import { ActionButtons } from "../components/TextAnalyzer/ActionButtons";
import { EmptyState } from "../components/TextAnalyzer/EmptyState";

// Import utilities and data
import { templates } from "../components/TextAnalyzer/templates";
import { analyzeText } from "../components/TextAnalyzer/textAnalysisUtils";
import { 
    getSentimentColor, 
    getSentimentEmoji, 
    getReadabilityLevel, 
    getLanguageFlag, 
    copyToClipboard as copyUtil, 
    downloadAnalysis as downloadUtil 
} from "../components/TextAnalyzer/uiUtils";

export default function TextAnalyzer() {
    const [text, setText] = useState("");
    const [analysis, setAnalysis] = useState({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        sentiment: "neutral",
        keywordDensity: [],
        readabilityScore: 0,
        language: "en",
        averageWordsPerSentence: 0,
        averageSentencesPerParagraph: 0
    });
    
    const [showKeywords, setShowKeywords] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState("");

    useEffect(() => {
        setAnalysis(analyzeText(text));
    }, [text]);

    const copyToClipboard = async (content) => {
        await copyUtil(content, toast);
    };

    const downloadAnalysis = (format = 'txt') => {
        downloadUtil(format, text, analysis, toast);
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col">
                <NavBar />
                <main className="mt-15 flex-1 container mx-auto px-2 py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-7xl mx-auto"
                    >
                        {/* Header Section */}
                        <div className="text-center mb-8">
                            <motion.h1 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-4xl font-bold mb-4 tracking-tight text-foreground"
                            >
                                Text Analyzer
                            </motion.h1>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 mt-4">
                            {/* Input Section */}
                            <TextInput 
                                text={text}
                                setText={setText}
                                templates={templates}
                                selectedTemplate={selectedTemplate}
                                setSelectedTemplate={setSelectedTemplate}
                                toast={toast}
                            />

                            {/* Analysis Results */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="space-y-6"
                            >
                                {/* Quick Stats */}
                                <QuickStats analysis={analysis} />
                                
                                {/* Readability & Language Analysis */}
                                <ReadabilityLanguage 
                                    analysis={analysis}
                                    getReadabilityLevel={getReadabilityLevel}
                                    getLanguageFlag={getLanguageFlag}
                                />
                                
                                {/* Detailed Analysis */}
                                <DetailedAnalysis analysis={analysis} />
                                
                                {/* Keyword Density Analysis */}
                                <KeywordDensity 
                                    analysis={analysis}
                                    showKeywords={showKeywords}
                                    setShowKeywords={setShowKeywords}
                                />
                                
                                {/* Sentiment Analysis */}
                                <SentimentAnalysis 
                                    analysis={analysis}
                                    getSentimentColor={getSentimentColor}
                                    getSentimentEmoji={getSentimentEmoji}
                                />

                                {/* Action Buttons */}
                                <ActionButtons 
                                    text={text}
                                    analysis={analysis}
                                    copyToClipboard={copyToClipboard}
                                    downloadAnalysis={downloadAnalysis}
                                    showKeywords={showKeywords}
                                    setShowKeywords={setShowKeywords}
                                />
                            </motion.div>
                        </div>
                        {/* Empty State */}
                        {!text.trim() && <EmptyState />}
                    </motion.div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}
