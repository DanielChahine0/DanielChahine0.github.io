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

export const analyzeSentiment = (text) => {
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
export const analyzeKeywords = (text) => {
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

// Simple readability score (Flesch Reading Ease approximation)
export const calculateReadability = (text, words, sentences) => {
    if (sentences === 0 || words === 0) return 0;
    
    const avgSentenceLength = words / sentences;
    const syllables = countSyllables(text);
    const avgSyllablesPerWord = syllables / words;
    
    // Simplified Flesch Reading Ease formula
    const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
    return Math.max(0, Math.min(100, Math.round(score)));
};

// Language detection (basic implementation)
export const detectLanguage = (text) => {
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

export const analyzeText = (inputText) => {
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
