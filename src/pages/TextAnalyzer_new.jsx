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
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-teal-50/20 dark:to-teal-950/20">
                <NavBar />
                <main className="mt-10 flex-1 container mx-auto px-4 py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-7xl mx-auto"
                    >
                        {/* Header Section */}
                        <div className="text-center mb-12">
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl shadow-lg shadow-teal-500/25 mx-auto mb-6"
                            >
                                <FileSearch className="text-white" size={36} />
                                <div className="absolute -top-1 -right-1">
                                    <Sparkles className="text-yellow-400" size={16} />
                                </div>
                            </motion.div>
                            <motion.h1 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="text-5xl font-bold mb-4 tracking-tight bg-gradient-to-r from-teal-600 to-teal-800 dark:from-teal-400 dark:to-teal-300 bg-clip-text text-transparent"
                            >
                                Text Analyzer
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
                            >
                                Unlock insights from your text with comprehensive analysis including word count, character count, reading time, and intelligent sentiment detection.
                            </motion.p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Input Section - Takes 2 columns */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="lg:col-span-2 space-y-6"
                            >
                                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg shadow-black/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/50 rounded-lg flex items-center justify-center">
                                            <Type className="text-teal-600 dark:text-teal-400" size={18} />
                                        </div>
                                        <label htmlFor="text-input" className="text-lg font-semibold text-foreground">
                                            Enter your text
                                        </label>
                                    </div>
                                    <textarea
                                        id="text-input"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Paste or type your text here to analyze... The more text you provide, the more accurate the analysis will be!"
                                        className="w-full h-80 p-4 border border-border/50 rounded-xl bg-background/50 text-foreground resize-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-200 placeholder:text-foreground/40 backdrop-blur-sm"
                                    />
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setText("")}
                                                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                                            >
                                                Clear
                                            </button>
                                            <button
                                                onClick={() => setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nThis is a wonderful example of positive sentiment analysis. The results should be amazing and fantastic! I love how this tool provides incredible insights into text analysis. It's truly outstanding and delivers excellent performance.\n\nOn the other hand, some people might feel frustrated or disappointed with poor quality content. Bad writing can be terrible and awful to read.")}
                                                className="px-4 py-2 text-sm text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-all duration-200"
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

                            {/* Analysis Results - Takes 1 column */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="space-y-6"
                            >
                                {/* Quick Stats */}
                                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg shadow-black/5">
                                    <h2 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                                            <BarChart3 className="text-white" size={18} />
                                        </div>
                                        Quick Stats
                                    </h2>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <motion.div 
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.7 }}
                                            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-xl p-4 text-center border border-blue-200/50 dark:border-blue-800/50"
                                        >
                                            <Type className="text-blue-600 dark:text-blue-400 mx-auto mb-2" size={24} />
                                            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{analysis.characters.toLocaleString()}</div>
                                            <div className="text-xs text-blue-600/70 dark:text-blue-400/70">Characters</div>
                                        </motion.div>
                                        
                                        <motion.div 
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.8 }}
                                            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-xl p-4 text-center border border-green-200/50 dark:border-green-800/50"
                                        >
                                            <Hash className="text-green-600 dark:text-green-400 mx-auto mb-2" size={24} />
                                            <div className="text-2xl font-bold text-green-700 dark:text-green-300">{analysis.charactersNoSpaces.toLocaleString()}</div>
                                            <div className="text-xs text-green-600/70 dark:text-green-400/70">No Spaces</div>
                                        </motion.div>
                                        
                                        <motion.div 
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.9 }}
                                            className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 rounded-xl p-4 text-center border border-purple-200/50 dark:border-purple-800/50"
                                        >
                                            <BookOpen className="text-purple-600 dark:text-purple-400 mx-auto mb-2" size={24} />
                                            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{analysis.words.toLocaleString()}</div>
                                            <div className="text-xs text-purple-600/70 dark:text-purple-400/70">Words</div>
                                        </motion.div>
                                        
                                        <motion.div 
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 1.0 }}
                                            className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 rounded-xl p-4 text-center border border-orange-200/50 dark:border-orange-800/50"
                                        >
                                            <Clock className="text-orange-600 dark:text-orange-400 mx-auto mb-2" size={24} />
                                            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">{analysis.readingTime}</div>
                                            <div className="text-xs text-orange-600/70 dark:text-orange-400/70">Min Read</div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Detailed Analysis */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.1 }}
                                    className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg shadow-black/5"
                                >
                                    <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center">
                                            <Target className="text-white" size={18} />
                                        </div>
                                        Detailed Analysis
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                                            <span className="text-foreground/70 flex items-center gap-2">
                                                <MessageSquare size={16} />
                                                Sentences:
                                            </span>
                                            <span className="font-semibold text-foreground">{analysis.sentences.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                                            <span className="text-foreground/70 flex items-center gap-2">
                                                <FileSearch size={16} />
                                                Paragraphs:
                                            </span>
                                            <span className="font-semibold text-foreground">{analysis.paragraphs.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                                            <span className="text-foreground/70">Avg words/sentence:</span>
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
                                    transition={{ duration: 0.5, delay: 1.2 }}
                                    className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg shadow-black/5"
                                >
                                    <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center">
                                            <Sparkles className="text-white" size={18} />
                                        </div>
                                        Sentiment Analysis
                                    </h3>
                                    <div className={`p-4 rounded-xl border-2 ${getSentimentColor(analysis.sentiment)} transition-all duration-300`}>
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl">{getSentimentEmoji(analysis.sentiment)}</span>
                                            <div className="flex-1">
                                                <div className="font-bold text-lg capitalize">{analysis.sentiment}</div>
                                                <div className="text-sm opacity-75">
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
                                    transition={{ duration: 0.5, delay: 1.3 }}
                                    className="flex gap-3"
                                >
                                    <button
                                        onClick={() => copyToClipboard(`Text Analysis Results:\n• Characters: ${analysis.characters.toLocaleString()}\n• Words: ${analysis.words.toLocaleString()}\n• Reading Time: ${analysis.readingTime} min\n• Sentiment: ${analysis.sentiment}`)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-teal-500/25"
                                        disabled={!text.trim()}
                                    >
                                        <Copy size={16} />
                                        Copy Results
                                    </button>
                                    <button
                                        onClick={downloadAnalysis}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-border text-foreground rounded-xl hover:bg-accent transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
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
                                transition={{ duration: 0.5, delay: 1.4 }}
                                className="mt-12 text-center"
                            >
                                <div className="max-w-md mx-auto">
                                    <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-50">
                                        <FileSearch className="text-gray-500 dark:text-gray-400" size={24} />
                                    </div>
                                    <p className="text-foreground/50 mb-4">Start typing or paste your text to see the magic happen!</p>
                                    <div className="flex justify-center gap-2">
                                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
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
