/*
 * uiUtils.js
 * ---------
 * Small collection of UI helper utilities used by the Text Analyzer
 * components. These helpers map analysis values to display strings, emojis,
 * CSS classes and also implement clipboard/download helper wrappers that
 * trigger user-facing toasts.
 *
 * Important: the clipboard and download helpers call browser APIs and a
 * `toast` callback. They assume a modern browser environment.
 */

export const getSentimentColor = (sentiment) => {
    switch (sentiment) {
        case 'positive': return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/50 dark:border-green-800';
        case 'negative': return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/50 dark:border-red-800';
        default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-800/50 dark:border-gray-700';
    }
};

export const getSentimentEmoji = (sentiment) => {
    switch (sentiment) {
        case 'positive': return '😊';
        case 'negative': return '😔';
        default: return '😐';
    }
};

export const getReadabilityLevel = (score) => {
    if (score >= 90) return { level: 'Very Easy', color: 'text-green-600 dark:text-green-400' };
    if (score >= 80) return { level: 'Easy', color: 'text-green-500 dark:text-green-400' };
    if (score >= 70) return { level: 'Fairly Easy', color: 'text-yellow-600 dark:text-yellow-400' };
    if (score >= 60) return { level: 'Standard', color: 'text-orange-600 dark:text-orange-400' };
    if (score >= 50) return { level: 'Fairly Difficult', color: 'text-red-500 dark:text-red-400' };
    if (score >= 30) return { level: 'Difficult', color: 'text-red-600 dark:text-red-400' };
    return { level: 'Very Difficult', color: 'text-red-700 dark:text-red-400' };
};

export const getLanguageFlag = (lang) => {
    const flags = {
        'en': '🇺🇸',
        'es': '🇪🇸',
        'fr': '🇫🇷',
        'de': '🇩🇪',
        'it': '🇮🇹'
    };
    return flags[lang] || '🌐';
};

export const copyToClipboard = async (content, toast) => {
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

export const downloadAnalysis = (format = 'txt', text, analysis, toast) => {
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
