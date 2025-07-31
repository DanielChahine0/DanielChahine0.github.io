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
            case 'positive': return 'text-green-600 bg-green-50 border-green-200';
            case 'negative': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
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
                            {/* Input Section */}
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="text-input" className="block text-sm font-medium text-foreground mb-2">
                                        Enter your text
                                    </label>
                                    <textarea
                                        id="text-input"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Paste or type your text here to analyze..."
                                        className="w-full h-96 p-4 border border-border rounded-lg bg-card text-foreground resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setText("")}
                                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        onClick={() => setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. This is a wonderful example of positive sentiment analysis. The results should be amazing and fantastic!")}
                                        className="px-4 py-2 text-sm text-teal-600 hover:text-teal-800 hover:bg-teal-50 rounded-md transition-colors"
                                    >
                                        Sample Text
                                    </button>
                                </div>
                            </div>

                            {/* Analysis Results */}
                            <div className="space-y-6">
                                <div className="bg-card rounded-lg p-6 border border-border">
                                    <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                                        <BarChart3 size={20} />
                                        Analysis Results
                                    </h2>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-background rounded-lg p-4 text-center">
                                            <Type className="text-blue-500 mx-auto mb-2" size={24} />
                                            <div className="text-2xl font-bold text-foreground">{analysis.characters.toLocaleString()}</div>
                                            <div className="text-sm text-foreground/70">Characters</div>
                                        </div>
                                        
                                        <div className="bg-background rounded-lg p-4 text-center">
                                            <Hash className="text-green-500 mx-auto mb-2" size={24} />
                                            <div className="text-2xl font-bold text-foreground">{analysis.charactersNoSpaces.toLocaleString()}</div>
                                            <div className="text-sm text-foreground/70">No Spaces</div>
                                        </div>
                                        
                                        <div className="bg-background rounded-lg p-4 text-center">
                                            <FileSearch className="text-purple-500 mx-auto mb-2" size={24} />
                                            <div className="text-2xl font-bold text-foreground">{analysis.words.toLocaleString()}</div>
                                            <div className="text-sm text-foreground/70">Words</div>
                                        </div>
                                        
                                        <div className="bg-background rounded-lg p-4 text-center">
                                            <Clock className="text-orange-500 mx-auto mb-2" size={24} />
                                            <div className="text-2xl font-bold text-foreground">{analysis.readingTime}</div>
                                            <div className="text-sm text-foreground/70">Min Read</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-foreground/70">Sentences:</span>
                                            <span className="font-semibold text-foreground">{analysis.sentences.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-foreground/70">Paragraphs:</span>
                                            <span className="font-semibold text-foreground">{analysis.paragraphs.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Sentiment Analysis */}
                                <div className="bg-card rounded-lg p-6 border border-border">
                                    <h3 className="text-lg font-semibold mb-4 text-foreground">Sentiment Analysis</h3>
                                    <div className={`p-4 rounded-lg border ${getSentimentColor(analysis.sentiment)}`}>
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{getSentimentEmoji(analysis.sentiment)}</span>
                                            <div>
                                                <div className="font-semibold capitalize">{analysis.sentiment}</div>
                                                <div className="text-sm opacity-75">
                                                    {analysis.sentiment === 'positive' && "This text has a positive tone"}
                                                    {analysis.sentiment === 'negative' && "This text has a negative tone"}
                                                    {analysis.sentiment === 'neutral' && "This text has a neutral tone"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => copyToClipboard(`Characters: ${analysis.characters}, Words: ${analysis.words}, Reading Time: ${analysis.readingTime} min, Sentiment: ${analysis.sentiment}`)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                                    >
                                        <Copy size={16} />
                                        Copy Results
                                    </button>
                                    <button
                                        onClick={downloadAnalysis}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent transition-colors"
                                    >
                                        <Download size={16} />
                                        Download Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}
