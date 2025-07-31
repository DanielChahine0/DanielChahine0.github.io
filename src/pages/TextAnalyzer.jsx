import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
import { FileSearch, Type, Clock, Hash, BarChart3, Copy, Download, Sparkles, BookOpen, MessageSquare, Target } from "lucide-react";
import { toast } from "../hooks/use-toast";

export default function TextAnalyzer() {
    const [text, setText] = useState("");
    const [analysis, setAnalysis] = useState({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        sentiment: "neutral"
    });

    // Simple sentiment analysis based on positive/negative word lists
    const positiveWords = [
        'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'awesome', 'brilliant',
        'perfect', 'outstanding', 'superb', 'marvelous', 'incredible', 'magnificent', 'spectacular',
        'love', 'like', 'enjoy', 'happy', 'joy', 'excited', 'thrilled', 'delighted', 'pleased',
        'beautiful', 'gorgeous', 'stunning', 'lovely', 'charming', 'elegant', 'graceful',
        'success', 'successful', 'achieve', 'accomplished', 'victory', 'win', 'winner'
    ];

    const negativeWords = [
        'bad', 'terrible', 'awful', 'horrible', 'disgusting', 'ugly', 'nasty', 'gross',
        'hate', 'dislike', 'angry', 'mad', 'furious', 'annoyed', 'frustrated', 'disappointed',
        'sad', 'depressed', 'miserable', 'unhappy', 'gloomy', 'devastated', 'heartbroken',
        'fail', 'failure', 'lose', 'lost', 'defeat', 'worst', 'useless', 'worthless'
    ];

    const analyzeSentiment = (text) => {
        const words = text.toLowerCase().split(/\W+/);
        let positiveCount = 0;
        let negativeCount = 0;

        words.forEach(word => {
            if (positiveWords.includes(word)) positiveCount++;
            if (negativeWords.includes(word)) negativeCount++;
        });

        if (positiveCount > negativeCount) return "positive";
        if (negativeCount > positiveCount) return "negative";
        return "neutral";
    };

    const analyzeText = (inputText) => {
        const characters = inputText.length;
        const charactersNoSpaces = inputText.replace(/\s/g, '').length;
        const words = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length;
        const sentences = inputText.trim() === '' ? 0 : inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const paragraphs = inputText.trim() === '' ? 0 : inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
        
        // Average reading speed is 200-250 words per minute, using 225
        const readingTime = Math.ceil(words / 225);
        
        const sentiment = analyzeSentiment(inputText);

        return {
            characters,
            charactersNoSpaces,
            words,
            sentences,
            paragraphs,
            readingTime,
            sentiment
        };
    };

    useEffect(() => {
        setAnalysis(analyzeText(text));
    }, [text]);

    const copyToClipboard = async (content) => {
        try {
            await navigator.clipboard.writeText(content);
            toast({
                title: "Copied to clipboard!",
                description: "The analysis has been copied to your clipboard."
            });
        } catch (err) {
            toast({
                title: "Failed to copy",
                description: "Could not copy to clipboard.",
                variant: "destructive"
            });
        }
    };

    const downloadAnalysis = () => {
        const analysisText = `Text Analysis Report
========================

Original Text:
${text}

Analysis Results:
- Characters: ${analysis.characters}
- Characters (no spaces): ${analysis.charactersNoSpaces}
- Words: ${analysis.words}
- Sentences: ${analysis.sentences}
- Paragraphs: ${analysis.paragraphs}
- Estimated Reading Time: ${analysis.readingTime} minute${analysis.readingTime !== 1 ? 's' : ''}
- Sentiment: ${analysis.sentiment}

Generated on: ${new Date().toLocaleString()}
`;
        const blob = new Blob([analysisText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'text-analysis.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({
            title: "Analysis downloaded!",
            description: "Your text analysis has been saved as a text file."
        });
    };

    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case 'positive': return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/50 dark:border-green-800';
            case 'negative': return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/50 dark:border-red-800';
            default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-800/50 dark:border-gray-700';
        }
    };

    const getSentimentEmoji = (sentiment) => {
        switch (sentiment) {
            case 'positive': return '😊';
            case 'negative': return '😔';
            default: return '😐';
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col">
                <NavBar />
                <main className="mt-14 flex-1 container mx-auto px-2 py-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-7xl mx-auto"
                    >
                        {/* Header Section */}
                        <div className="text-center mb-4">
                            <motion.h1 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-4xl font-bold mb-4 tracking-tight text-foreground"
                            >
                                Text Analyzer
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed"
                            >
                                Analyze your text for detailed insights including word count, character count, reading time, and sentiment analysis.
                            </motion.p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 mt-4">
                            {/* Input Section */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="space-y-3"
                            >
                                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 mt-3 border border-border/50 shadow-lg shadow-black/5">
                                    {/* Removed 'Enter your text' label for cleaner UI */}
                                    <textarea
                                        id="text-input"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Paste or type your text here to analyze... The more text you provide, the more accurate the analysis will be!"
                                        className="w-full h-160 p-1 border border-border/50 rounded-xl bg-background/50 text-neutral-900 resize-none  transition-all duration-200 placeholder:text-foreground backdrop-blur-sm"
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => setText("")}
                                                className="px-2 py-1 text-sm text-foreground dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-red-600/50 rounded-lg transition-all duration-200"
                                            >
                                                Clear
                                            </button>
                                            <button
                                                onClick={() => setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nThis is a wonderful example of positive sentiment analysis. The results should be amazing and fantastic! I love how this tool provides incredible insights into text analysis. It's truly outstanding and delivers excellent performance.\n\nOn the other hand, some people might feel frustrated or disappointed with poor quality content. Bad writing can be terrible and awful to read.")}
                                                className="px-2 py-1 text-sm text-foreground hover:bg-teal-300/50 rounded-lg transition-all duration-200"
                                            >
                                                Load Sample
                                            </button>
                                        </div>
                                        <div className="text-sm text-foreground/50">
                                            {text.length > 0 && `${text.length} characters`}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Analysis Results */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="space-y-6"
                            >
                                {/* Quick Stats */}
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
                                {/* Detailed Analysis */}
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
                                                {analysis.sentences > 0 ? Math.round(analysis.words / analysis.sentences) : 0}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                                {/* Sentiment Analysis */}
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
                                {/* Action Buttons */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.2 }}
                                    className="flex gap-2 mt-2"
                                >
                                    <button
                                        onClick={() => copyToClipboard(`Text Analysis Results:\n• Characters: ${analysis.characters.toLocaleString()}\n• Words: ${analysis.words.toLocaleString()}\n• Reading Time: ${analysis.readingTime} min\n• Sentiment: ${analysis.sentiment}`)}
                                        className="flex-1 flex items-center justify-center gap-2 px-2 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-teal-500/25"
                                        disabled={!text.trim()}
                                    >
                                        <Copy size={16} />
                                        Copy Results
                                    </button>
                                    <button
                                        onClick={downloadAnalysis}
                                        className="flex-1 flex items-center justify-center gap-2 px-2 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-teal-500/25"
                                        disabled={!text.trim()}
                                    >
                                        <Download size={16} />
                                        Download
                                    </button>
                                </motion.div>
                            </motion.div>
                        </div>
                        {/* Empty State */}
                        {!text.trim() && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1.3 }}
                                className="mt-16 text-center"
                            >
                                <div className="max-w-md mx-auto">
                                    <p className="text-foreground mb-6">Start typing or paste your text to see the magic happen!</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}
