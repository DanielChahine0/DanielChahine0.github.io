import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
import { FileSearch, Type, Clock, Hash, BarChart3, Copy, Download, Sparkles, BookOpen, MessageSquare, Target, TrendingUp, Globe, FileText, Zap } from "lucide-react";
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
        sentiment: "neutral",
        keywordDensity: [],
        readabilityScore: 0,
        language: "en",
        averageWordsPerSentence: 0,
        averageSentencesPerParagraph: 0
    });
    
    const [showKeywords, setShowKeywords] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState("");

    // Template library for different text types
    const templates = {
        "business-email": {
            name: "Business Email",
            text: "Dear [Name],\n\nI hope this email finds you well. I am writing to follow up on our recent conversation regarding the upcoming project collaboration. We are excited about the opportunity to work together and believe this partnership will yield excellent results.\n\nAs discussed, we will need to coordinate our teams and establish clear timelines for deliverables. I would appreciate the chance to schedule a meeting next week to discuss the project scope in greater detail.\n\nPlease let me know your availability, and I will send out calendar invitations accordingly. Thank you for your time and consideration.\n\nBest regards,\n[Your Name]"
        },
        "academic-essay": {
            name: "Academic Essay",
            text: "The Impact of Technology on Modern Education\n\nIn the twenty-first century, technology has fundamentally transformed the landscape of education. From interactive whiteboards to online learning platforms, technological innovations have revolutionized how students learn and how educators teach. This transformation has brought both unprecedented opportunities and significant challenges that educational institutions must navigate carefully.\n\nThe integration of digital tools in classrooms has enhanced student engagement and accessibility. Interactive learning platforms allow students to learn at their own pace, while multimedia resources cater to different learning styles. Furthermore, technology has made education more accessible to students with disabilities and those in remote locations.\n\nHowever, this digital revolution also presents challenges. The digital divide creates inequalities between students who have access to technology and those who do not. Additionally, concerns about screen time and the need for digital literacy skills have become increasingly important considerations for educators and policymakers.\n\nIn conclusion, while technology offers tremendous potential to improve educational outcomes, its implementation must be thoughtful and equitable to ensure all students benefit from these advances."
        },
        "creative-writing": {
            name: "Creative Writing",
            text: "The old lighthouse stood majestically on the rocky cliff, its weathered walls telling stories of countless storms weathered and ships guided safely to shore. Sarah approached the ancient structure with reverence, feeling the weight of history in every step she took across the moss-covered stones.\n\nThe afternoon sun cast long shadows through the lighthouse's broken windows, creating patterns that danced across the worn wooden floors. She could almost hear the echoes of the lighthouse keeper's footsteps, climbing the spiral staircase day after day, tending to the beacon that had served as a guardian angel for sailors navigating treacherous waters.\n\nAs she climbed the narrow stairs, each step creaked beneath her feet, and she wondered about all the people who had made this same journey before her. The view from the top was breathtaking – endless ocean stretching to the horizon, where the sky met the sea in a perfect line of blue.\n\nThis lighthouse had been more than just a navigation aid; it had been a symbol of hope, a beacon of safety in the darkness. Now, though no longer operational, it continued to inspire visitors like Sarah, who came seeking solitude and connection to the maritime heritage of the coast."
        },
        "technical-documentation": {
            name: "Technical Documentation",
            text: "API Authentication Guide\n\n1. Overview\nThis document provides comprehensive instructions for implementing authentication in our REST API. The authentication system uses JWT (JSON Web Tokens) for secure session management and supports both username/password and OAuth2 authentication methods.\n\n2. Prerequisites\n- Valid API credentials\n- HTTPS-enabled environment\n- JSON parsing capabilities\n- Understanding of HTTP headers\n\n3. Authentication Flow\nStep 1: Obtain authentication credentials from the developer portal\nStep 2: Make a POST request to /auth/login with your credentials\nStep 3: Store the returned JWT token securely\nStep 4: Include the token in subsequent API requests using the Authorization header\n\n4. Implementation Example\nconst response = await fetch('/api/auth/login', {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    username: 'your_username',\n    password: 'your_password'\n  })\n});\n\n5. Error Handling\nThe API returns specific error codes for authentication failures:\n- 401: Invalid credentials\n- 403: Access forbidden\n- 429: Rate limit exceeded\n\nImplement appropriate retry logic and user feedback for these scenarios."
        },
        "marketing-copy": {
            name: "Marketing Copy",
            text: "Transform Your Business with Our Revolutionary Software Solution!\n\nAre you tired of juggling multiple tools and losing valuable time on repetitive tasks? Discover the power of our all-in-one business management platform that's designed to streamline your operations and boost productivity by up to 300%.\n\nWhat makes us different?\n✓ Intuitive interface that requires zero training\n✓ Seamless integration with 200+ popular business tools\n✓ Advanced analytics that provide actionable insights\n✓ 24/7 customer support from real humans\n✓ Enterprise-grade security you can trust\n\nJoin over 50,000 satisfied customers who have already transformed their businesses. From small startups to Fortune 500 companies, our solution scales with your needs and grows with your success.\n\nDon't let inefficiency hold your business back. Take action today and experience the difference our software can make. Start your free 30-day trial now – no credit card required, no hidden fees, just pure business transformation waiting to happen.\n\nReady to revolutionize your workflow? Click the button below and join the productivity revolution!"
        }
    };

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

    // Keyword density analysis
    const analyzeKeywords = (text) => {
        if (!text.trim()) return [];
        
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 3); // Filter out short words
        
        const wordCount = {};
        const totalWords = words.length;
        
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
        
        return Object.entries(wordCount)
            .map(([word, count]) => ({
                word,
                count,
                density: ((count / totalWords) * 100).toFixed(2)
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10); // Top 10 keywords
    };

    // Simple readability score (Flesch Reading Ease approximation)
    const calculateReadability = (text, words, sentences) => {
        if (sentences === 0 || words === 0) return 0;
        
        const avgSentenceLength = words / sentences;
        const syllables = countSyllables(text);
        const avgSyllablesPerWord = syllables / words;
        
        // Simplified Flesch Reading Ease formula
        const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
        return Math.max(0, Math.min(100, Math.round(score)));
    };

    const countSyllables = (text) => {
        const words = text.toLowerCase().match(/[a-z]+/g) || [];
        return words.reduce((total, word) => {
            // Simple syllable counting heuristic
            const vowels = word.match(/[aeiouy]+/g) || [];
            let syllableCount = vowels.length;
            if (word.endsWith('e')) syllableCount--;
            return total + Math.max(1, syllableCount);
        }, 0);
    };

    // Language detection (basic implementation)
    const detectLanguage = (text) => {
        const commonWords = {
            en: ['the', 'and', 'that', 'have', 'for', 'not', 'with', 'you', 'this', 'but'],
            es: ['que', 'de', 'no', 'la', 'el', 'en', 'una', 'es', 'para', 'con'],
            fr: ['que', 'de', 'je', 'est', 'pas', 'le', 'vous', 'la', 'tu', 'dans'],
            de: ['der', 'die', 'und', 'zu', 'den', 'das', 'nicht', 'von', 'sie', 'ist'],
            it: ['che', 'di', 'non', 'la', 'il', 'per', 'una', 'in', 'con', 'da']
        };
        
        const words = text.toLowerCase().split(/\W+/);
        const scores = {};
        
        Object.keys(commonWords).forEach(lang => {
            scores[lang] = 0;
            commonWords[lang].forEach(word => {
                scores[lang] += (words.filter(w => w === word).length);
            });
        });
        
        return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b) || 'en';
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
        const keywordDensity = analyzeKeywords(inputText);
        const readabilityScore = calculateReadability(inputText, words, sentences);
        const language = detectLanguage(inputText);
        const averageWordsPerSentence = sentences > 0 ? Math.round(words / sentences) : 0;
        const averageSentencesPerParagraph = paragraphs > 0 ? Math.round(sentences / paragraphs) : 0;

        return {
            characters,
            charactersNoSpaces,
            words,
            sentences,
            paragraphs,
            readingTime,
            sentiment,
            keywordDensity,
            readabilityScore,
            language,
            averageWordsPerSentence,
            averageSentencesPerParagraph
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

    const downloadAnalysis = (format = 'txt') => {
        let content;
        let filename;
        let mimeType;

        if (format === 'json') {
            content = JSON.stringify({
                originalText: text,
                analysis: analysis,
                timestamp: new Date().toISOString()
            }, null, 2);
            filename = 'text-analysis.json';
            mimeType = 'application/json';
        } else if (format === 'csv') {
            const csvContent = [
                'Metric,Value',
                `Characters,${analysis.characters}`,
                `Characters (no spaces),${analysis.charactersNoSpaces}`,
                `Words,${analysis.words}`,
                `Sentences,${analysis.sentences}`,
                `Paragraphs,${analysis.paragraphs}`,
                `Reading Time (minutes),${analysis.readingTime}`,
                `Sentiment,${analysis.sentiment}`,
                `Readability Score,${analysis.readabilityScore}`,
                `Language,${analysis.language}`,
                `Avg Words per Sentence,${analysis.averageWordsPerSentence}`,
                `Avg Sentences per Paragraph,${analysis.averageSentencesPerParagraph}`
            ].join('\n');
            
            content = csvContent;
            filename = 'text-analysis.csv';
            mimeType = 'text/csv';
        } else {
            // Default TXT format
            content = `Text Analysis Report
========================

Original Text:
${text}

Analysis Results:
- Characters: ${analysis.characters.toLocaleString()}
- Characters (no spaces): ${analysis.charactersNoSpaces.toLocaleString()}
- Words: ${analysis.words.toLocaleString()}
- Sentences: ${analysis.sentences.toLocaleString()}
- Paragraphs: ${analysis.paragraphs.toLocaleString()}
- Estimated Reading Time: ${analysis.readingTime} minute${analysis.readingTime !== 1 ? 's' : ''}
- Sentiment: ${analysis.sentiment}
- Readability Score: ${analysis.readabilityScore}/100
- Language: ${analysis.language.toUpperCase()}
- Average Words per Sentence: ${analysis.averageWordsPerSentence}
- Average Sentences per Paragraph: ${analysis.averageSentencesPerParagraph}

Top Keywords:
${analysis.keywordDensity.map(item => `- ${item.word}: ${item.count} times (${item.density}%)`).join('\n')}

Generated on: ${new Date().toLocaleString()}
`;
            filename = 'text-analysis.txt';
            mimeType = 'text/plain';
        }

        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({
            title: "Analysis downloaded!",
            description: `Your text analysis has been saved as a ${format.toUpperCase()} file.`
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

    const getReadabilityLevel = (score) => {
        if (score >= 90) return { level: 'Very Easy', color: 'text-green-600 dark:text-green-400' };
        if (score >= 80) return { level: 'Easy', color: 'text-green-500 dark:text-green-400' };
        if (score >= 70) return { level: 'Fairly Easy', color: 'text-yellow-600 dark:text-yellow-400' };
        if (score >= 60) return { level: 'Standard', color: 'text-orange-600 dark:text-orange-400' };
        if (score >= 50) return { level: 'Fairly Difficult', color: 'text-red-500 dark:text-red-400' };
        if (score >= 30) return { level: 'Difficult', color: 'text-red-600 dark:text-red-400' };
        return { level: 'Very Difficult', color: 'text-red-700 dark:text-red-400' };
    };

    const getLanguageFlag = (lang) => {
        const flags = {
            'en': '🇺🇸',
            'es': '🇪🇸',
            'fr': '🇫🇷',
            'de': '🇩🇪',
            'it': '🇮🇹'
        };
        return flags[lang] || '🌐';
    };

    const loadTemplate = (templateKey) => {
        if (templates[templateKey]) {
            setText(templates[templateKey].text);
            setSelectedTemplate(templateKey);
            toast({
                title: "Template loaded!",
                description: `${templates[templateKey].name} template has been loaded.`
            });
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
                                    {/* Template Selector */}
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Load Template:
                                        </label>
                                        <select
                                            value={selectedTemplate}
                                            onChange={(e) => e.target.value ? loadTemplate(e.target.value) : null}
                                            className="w-full p-2 border border-border/50 rounded-lg bg-background/50 text-foreground text-sm transition-all duration-200"
                                        >
                                            <option value="">Choose a template...</option>
                                            {Object.entries(templates).map(([key, template]) => (
                                                <option key={key} value={key}>{template.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
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
                                
                                {/* Readability & Language Analysis */}
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
                                
                                {/* Keyword Density Analysis */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.1 }}
                                    className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 mt-3 border border-border/50 shadow-lg shadow-black/5"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-3">
                                            <TrendingUp size={18} />
                                            Keyword Density
                                        </h3>
                                        <button
                                            onClick={() => setShowKeywords(!showKeywords)}
                                            className="text-sm text-teal-600 hover:text-teal-700 transition-colors duration-200"
                                            disabled={analysis.keywordDensity.length === 0}
                                        >
                                            {showKeywords ? 'Hide' : 'Show'} Keywords
                                        </button>
                                    </div>
                                    
                                    {showKeywords && analysis.keywordDensity.length > 0 && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-2"
                                        >
                                            {analysis.keywordDensity.slice(0, 5).map((item, index) => (
                                                <div key={item.word} className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                                                    <span className="text-foreground font-medium">{item.word}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-foreground/70">{item.count}x</span>
                                                        <span className="text-sm font-bold text-teal-600">{item.density}%</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                    
                                    {!showKeywords && analysis.keywordDensity.length > 0 && (
                                        <div className="text-sm text-foreground/70 text-center py-2">
                                            {analysis.keywordDensity.length} keywords analyzed. Click "Show Keywords" to view details.
                                        </div>
                                    )}
                                    
                                    {analysis.keywordDensity.length === 0 && (
                                        <div className="text-sm text-foreground/50 text-center py-4">
                                            No keywords to analyze yet. Add some text to see keyword density.
                                        </div>
                                    )}
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
                        )}
                    </motion.div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}
