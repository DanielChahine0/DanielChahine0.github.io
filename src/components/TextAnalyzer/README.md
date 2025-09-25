# Text Analyzer Components

Last Updated: August 26, 2025

## Overview

A comprehensive set of components for analyzing text content, providing insights through various metrics and visualization tools.

### Features
- Word and character counting
- Readability scoring
- Sentiment analysis
- Keyword extraction
- Text statistics
A comprehensive text analysis tool providing linguistic insights, readability metrics, and content optimization suggestions.

## Structure

### Components
- **`TextInput.jsx`** - Text entry and template loader
- **`QuickStats.jsx`** - Compact numeric metrics (characters, words, read time)
- **`ReadabilityLanguage.jsx`** - Readability score + detected language
- **`KeywordDensity.jsx`** - Top keyword list and densities
- **`SentimentAnalysis.jsx`** - Emotional tone classification
- **`DetailedAnalysis.jsx`** - Sentences/paragraphs and averages
- **`ActionButtons.jsx`** - Copy / export / keyword toggle actions
- **`EmptyState.jsx`** - Friendly empty state explaining features

## Key Features
- Word count statistics
- Readability scoring
- Keyword extraction
- Sentiment analysis
- Grammar checking
- Reading time estimation
- Text optimization
- Export capabilities

## Usage Example
```jsx
import { 
  TextInput, 
  StatisticsPanel, 
  ReadabilityScore,
  KeywordAnalysis 
} from '@/components/TextAnalyzer';

function TextAnalysis() {
  const [text, setText] = useState('');
  
  return (
    <div className="text-analyzer">
      <TextInput 
        value={text} 
        onChange={setText} 
      />
      <StatisticsPanel text={text} />
      <ReadabilityScore content={text} />
      <KeywordAnalysis text={text} />
    </div>
  );
}
```

## Technical Details
- Text processing algorithms
- Reading level formulas
- NLP integration
- Real-time analysis
- Performance optimization
- Multi-language support
- Export formats (PDF, TXT)

### Quick usage & props

Most components expect an `analysis` object produced by `analyzeText(inputText)`
from `textAnalysisUtils.js`. The shape is:

```
{
  characters, charactersNoSpaces, words, sentences, paragraphs,
  readingTime, sentiment, keywordDensity, readabilityScore, language,
  averageWordsPerSentence, averageSentencesPerParagraph
}
```

Pass the `analysis` object to display components (QuickStats, SentimentAnalysis,
ReadabilityLanguage, KeywordDensity, DetailedAnalysis). The TextInput component
handles user input and template loading.
