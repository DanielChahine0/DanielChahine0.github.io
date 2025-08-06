import React, { useState, useCallback, useRef, useEffect, memo, useMemo } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { 
    Download, 
    Copy, 
    FileText, 
    Eye, 
    EyeOff, 
    Maximize2, 
    Minimize2,
    RotateCcw,
    HelpCircle,
    Save,
    Upload,
    Type,
    Palette,
    Settings,
    Columns2,
    PanelLeftClose,
    PanelRightClose,
    Sun,
    Moon
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

// Enhanced Toolbar Component with better grouping and design
const Toolbar = memo(function Toolbar({
    isPreviewOnly,
    onShowHelp,
    onTogglePreview,
    onReset,
    onCopy,
    onDownload,
    onExportPDF,
    onToggleFullscreen,
    isFullscreen,
    onFileUpload,
    showReset = true,
    showExportPDF = true,
    label = "Editor",
    wordCount = 0,
    charCount = 0,
    lineCount = 0
}) {
    return (
        <div className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Left Section - Title and Stats */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="p-2 bg-blue-500 rounded-lg">
                                <FileText size={18} className="text-white" />
                            </div>
                            <div>
                                <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">{label}</span>
                                <div className="text-xs text-slate-500 dark:text-slate-400 flex space-x-3">
                                    <span>{wordCount} words</span>
                                    <span>{charCount} chars</span>
                                    <span>{lineCount} lines</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Action Buttons */}
                    <div className="flex items-center space-x-1">
                        {/* View Controls */}
                        <div className="flex items-center space-x-1 px-1 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            <button
                                onClick={onTogglePreview}
                                className={`p-2 rounded-md transition-all duration-200 ${
                                    isPreviewOnly 
                                        ? 'bg-blue-500 text-white shadow-sm' 
                                        : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                                }`}
                                title={isPreviewOnly ? "Show editor" : "Preview only"}
                                aria-label={isPreviewOnly ? "Show editor" : "Preview only"}
                            >
                                {isPreviewOnly ? <Columns2 size={16} /> : <Eye size={16} />}
                            </button>
                            <button
                                onClick={onToggleFullscreen}
                                className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                            >
                                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                            </button>
                        </div>

                        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />

                        {/* File Operations */}
                        <div className="flex items-center space-x-1">
                            <input
                                type="file"
                                accept=".md,.txt"
                                onChange={onFileUpload}
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
                                title="Upload markdown file"
                            >
                                <Upload size={16} />
                            </label>
                            {showReset && (
                                <button
                                    onClick={onReset}
                                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                                    title="Reset content"
                                    aria-label="Reset content"
                                >
                                    <RotateCcw size={16} />
                                </button>
                            )}
                        </div>

                        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />

                        {/* Export Operations */}
                        <div className="flex items-center space-x-1">
                            <button
                                onClick={onCopy}
                                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                                title="Copy to clipboard"
                                aria-label="Copy to clipboard"
                            >
                                <Copy size={16} />
                            </button>
                            <button
                                onClick={onDownload}
                                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                                title="Download as .md"
                                aria-label="Download as markdown"
                            >
                                <Download size={16} />
                            </button>
                            {showExportPDF && (
                                <button
                                    onClick={onExportPDF}
                                    className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                                    title="Export as PDF"
                                    aria-label="Export as PDF"
                                >
                                    PDF
                                </button>
                            )}
                        </div>

                        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />

                        {/* Help */}
                        <button
                            onClick={onShowHelp}
                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                            title="Show help"
                            aria-label="Show help"
                        >
                            <HelpCircle size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});
// Enhanced markdown components with better styling and UX
const markdownComponents = {
    h1: ({ children }) => (
        <h1 className="text-4xl font-bold mt-8 mb-6 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-3">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-3xl font-bold mt-7 mb-4 text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-2xl font-bold mt-6 mb-3 text-slate-900 dark:text-slate-100">
            {children}
        </h3>
    ),
    h4: ({ children }) => (
        <h4 className="text-xl font-semibold mt-5 mb-2 text-slate-800 dark:text-slate-200">
            {children}
        </h4>
    ),
    h5: ({ children }) => (
        <h5 className="text-lg font-semibold mt-4 mb-2 text-slate-800 dark:text-slate-200">
            {children}
        </h5>
    ),
    h6: ({ children }) => (
        <h6 className="text-base font-semibold mt-3 mb-1 text-slate-700 dark:text-slate-300">
            {children}
        </h6>
    ),
    p: ({ children }) => (
        <p className="text-base leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
            {children}
        </p>
    ),
    ul: ({ children }) => (
        <ul className="list-disc pl-6 mb-4 space-y-1 text-slate-700 dark:text-slate-300">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal pl-6 mb-4 space-y-1 text-slate-700 dark:text-slate-300">
            {children}
        </ol>
    ),
    li: ({ children }) => (
        <li className="text-slate-700 dark:text-slate-300">{children}</li>
    ),
    strong: ({ children }) => (
        <strong className="text-slate-900 dark:text-slate-100 font-bold">{children}</strong>
    ),
    em: ({ children }) => (
        <em className="text-slate-800 dark:text-slate-200 italic">{children}</em>
    ),
    code: ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        
        if (!inline && match) {
            const codeString = String(children).replace(/\n$/, '');
            
            const copyCodeToClipboard = async () => {
                try {
                    await navigator.clipboard.writeText(codeString);
                    // Enhanced toast notification
                    const toast = document.createElement('div');
                    toast.innerHTML = `
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                            <span>Code copied!</span>
                        </div>
                    `;
                    toast.className = 'fixed top-4 right-4 bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg z-50 transition-all transform translate-x-0';
                    document.body.appendChild(toast);
                    
                    setTimeout(() => {
                        toast.style.transform = 'translateX(100%)';
                        toast.style.opacity = '0';
                        setTimeout(() => document.body.removeChild(toast), 300);
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy code:', err);
                }
            };

            return (
                <div className="relative group my-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 capitalize">
                            {match[1]}
                        </span>
                        <button
                            onClick={copyCodeToClipboard}
                            className="flex items-center space-x-1 px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded transition-colors"
                            title="Copy code"
                            aria-label="Copy code to clipboard"
                        >
                            <Copy size={12} />
                            <span>Copy</span>
                        </button>
                    </div>
                    <pre className="p-4 overflow-x-auto bg-white dark:bg-slate-900 text-sm">
                        <code className={className} {...props}>
                            {children}
                        </code>
                    </pre>
                </div>
            );
        }
        
        return (
            <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm text-slate-800 dark:text-slate-200 font-mono border border-slate-200 dark:border-slate-700" {...props}>
                {children}
            </code>
        );
    },
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
            <div className="text-slate-700 dark:text-slate-300 italic">
                {children}
            </div>
        </blockquote>
    ),
    table: ({ children }) => (
        <div className="overflow-x-auto my-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="min-w-full">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }) => (
        <thead className="bg-slate-50 dark:bg-slate-800">
            {children}
        </thead>
    ),
    th: ({ children }) => (
        <th className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 text-left font-semibold text-slate-900 dark:text-slate-100">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="border-b border-slate-100 dark:border-slate-800 px-4 py-3 text-slate-700 dark:text-slate-300">
            {children}
        </td>
    ),
    a: ({ children, href }) => (
        <a
            href={href}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-blue-300 dark:decoration-blue-600 underline-offset-2 hover:decoration-blue-500 dark:hover:decoration-blue-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    ),
    hr: () => (
        <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
    ),
};

export default function MarkdownEditor() {
    const { toast } = useToast();
    const [markdown, setMarkdown] = useState(`# 🚀 Welcome to Enhanced Markdown Editor

This is a **live preview** markdown editor with real-time rendering and modern design!

## ✨ Features

- ✅ **Live preview** with syntax highlighting
- ✅ **Dark/Light mode** support  
- ✅ **Export** to MD/PDF with beautiful formatting
- ✅ **Copy to clipboard** functionality
- ✅ **File upload** support (.md, .txt)
- ✅ **Word/Character count** statistics
- ✅ **GitHub Flavored Markdown** support
- ✅ **Responsive design** with fullscreen mode

## 💻 Code Example

\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}! 👋\`;
}

console.log(greet("World"));
// Output: Hello, World! 👋
\`\`\`

## 📊 Table Example

| Feature | Status | Priority |
|---------|--------|----------|
| Live Preview | ✅ Done | High |
| Export PDF | ✅ Done | High |
| File Upload | ✅ Done | Medium |
| Syntax Highlighting | ✅ Done | High |

## 📝 Lists & Quotes

### Unordered List
- First item with **bold text**
- Second item with *italic text*
- Third item with \`inline code\`

### Ordered List
1. Step one: Write your content
2. Step two: See live preview
3. Step three: Export or share

> **💡 Pro Tip:** Use the toolbar buttons to quickly access all features. Try uploading your own markdown files or exporting to PDF for sharing!

## 🔗 Links and More

[Visit GitHub](https://github.com) | [Markdown Guide](https://www.markdownguide.org)

---

*Happy writing!* ✍️ Made with ❤️
`);
    
    const [isPreviewOnly, setIsPreviewOnly] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const previewRef = useRef(null);
    const containerRef = useRef(null);
    const fileInputRef = useRef(null);

    // Calculate text statistics
    const textStats = useMemo(() => {
        const words = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
        const chars = markdown.length;
        const lines = markdown.split('\n').length;
        return { words, chars, lines };
    }, [markdown]);

    const handleMarkdownChange = useCallback((e) => {
        setMarkdown(e.target.value);
    }, []);

    const handleFileUpload = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result;
            if (typeof content === 'string') {
                setMarkdown(content);
                toast({
                    title: "File uploaded!",
                    description: `${file.name} has been loaded successfully`,
                    duration: 2000,
                });
            }
        };
        reader.readAsText(file);
        // Reset the input value so the same file can be uploaded again
        e.target.value = '';
    }, [toast]);

    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(markdown);
            toast({
                title: "Copied!",
                description: "Markdown content copied to clipboard",
                duration: 2000,
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to copy to clipboard",
                variant: "destructive",
                duration: 2000,
            });
        }
    }, [markdown, toast]);

    const downloadMarkdown = useCallback(() => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast({
            title: "Downloaded!",
            description: "Markdown file saved successfully",
            duration: 2000,
        });
    }, [markdown, toast]);

    const exportToPDF = useCallback(async () => {
        if (!previewRef.current) return;
        
        try {
            toast({
                title: "Generating PDF...",
                description: "Please wait while we create your PDF",
                duration: 1000,
            });

            // Create a temporary container with enhanced styling for PDF
            const tempDiv = document.createElement('div');
            tempDiv.style.cssText = `
                position: absolute;
                top: -9999px;
                left: -9999px;
                width: 800px;
                padding: 40px;
                background: white;
                color: #1e293b;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
            `;
            
            // Clone the preview content
            const clonedContent = previewRef.current.cloneNode(true);
            
            // Apply explicit styles for PDF optimization
            const elements = clonedContent.querySelectorAll('*');
            elements.forEach((element) => {
                // Reset any dark mode styles
                element.style.color = '#1e293b';
                element.style.backgroundColor = 'transparent';
                
                // Enhance specific elements
                if (element.tagName === 'CODE' && !element.closest('PRE')) {
                    element.style.backgroundColor = '#f1f5f9';
                    element.style.padding = '2px 4px';
                    element.style.borderRadius = '3px';
                }
                if (element.tagName === 'PRE') {
                    element.style.backgroundColor = '#f8fafc';
                    element.style.border = '1px solid #e2e8f0';
                    element.style.borderRadius = '8px';
                }
                if (element.tagName === 'BLOCKQUOTE') {
                    element.style.backgroundColor = '#eff6ff';
                    element.style.borderLeft = '4px solid #3b82f6';
                }
            });
            
            tempDiv.appendChild(clonedContent);
            document.body.appendChild(tempDiv);

            const canvas = await html2canvas(tempDiv, {
                scale: 2,
                useCORS: true,
                allowTaint: false,
                backgroundColor: '#ffffff',
                logging: false,
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            const fileName = `markdown-document-${new Date().toISOString().split('T')[0]}.pdf`;
            pdf.save(fileName);
            document.body.removeChild(tempDiv);
            
            toast({
                title: "PDF exported!",
                description: `${fileName} has been saved successfully`,
                duration: 3000,
            });
        } catch (error) {
            console.error('PDF export error:', error);
            toast({
                title: "Export failed",
                description: "Failed to export PDF. Please try again.",
                variant: "destructive",
                duration: 3000,
            });
        }
    }, [toast]);

    const resetContent = useCallback(() => {
        setMarkdown(`# 🚀 Welcome to Enhanced Markdown Editor

Start writing your markdown here...

## ✨ Getting Started

1. **Type** in the editor on the left
2. **See** live preview on the right  
3. **Use** the toolbar to export or copy content
4. **Upload** existing markdown files
5. **Export** to PDF for sharing

**Happy writing!** ✍️ 
`);
        toast({
            title: "Content reset",
            description: "Editor has been reset to default content",
            duration: 2000,
        });
    }, [toast]);

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            // Enter fullscreen
            if (containerRef.current?.requestFullscreen) {
                containerRef.current.requestFullscreen();
            } else if (containerRef.current?.webkitRequestFullscreen) {
                containerRef.current.webkitRequestFullscreen();
            } else if (containerRef.current?.msRequestFullscreen) {
                containerRef.current.msRequestFullscreen();
            }
            setIsFullscreen(true);
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    // Listen for fullscreen changes
    React.useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('msfullscreenchange', handleFullscreenChange);
        };
    }, []);

    const showHelp = useCallback(() => {
        toast({
            title: "📝 Markdown Help",
            description: "Use # for headers, **bold**, *italic*, `code`, [links](url), and - for lists",
            duration: 5000,
        });
    }, [toast]);


    const containerClass = isFullscreen 
        ? "fixed inset-0 z-50 bg-background" 
        : "min-h-screen flex flex-col bg-background";

    // Memoize markdown components for performance
    const memoizedMarkdownComponents = useMemo(() => markdownComponents, []);

    return (
        <PageTransition>
            <div ref={containerRef} className={containerClass}>
                {!isFullscreen && <NavBar />}
                <main className={`flex-1 ${isFullscreen ? 'h-screen' : 'mt-15 container mx-auto px-2 py-8'} max-w-[95vw]`}>
                    <div className="h-full flex flex-col max-w-none mx-auto">
                        {/* Enhanced Title Section */}
                        {!isFullscreen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-8 text-center"
                            >
                                <h1 className="text-4xl font-bold">
                                            Enhanced Markdown Editor
                                        </h1>
                            </motion.div>
                        )}
                        {/* Enhanced Toolbar */}
                        <Toolbar
                            isPreviewOnly={isPreviewOnly}
                            onShowHelp={showHelp}
                            onTogglePreview={() => setIsPreviewOnly((v) => !v)}
                            onReset={resetContent}
                            onCopy={copyToClipboard}
                            onDownload={downloadMarkdown}
                            onExportPDF={exportToPDF}
                            onToggleFullscreen={toggleFullscreen}
                            onFileUpload={handleFileUpload}
                            isFullscreen={isFullscreen}
                            showReset={true}
                            showExportPDF={true}
                            label={isFullscreen ? 'Enhanced Markdown Editor' : 'Enhanced Editor'}
                            wordCount={textStats.words}
                            charCount={textStats.chars}
                            lineCount={textStats.lines}
                        />
                        
                        {/* Enhanced Editor and Preview Layout */}
                        <div className="flex-1 flex overflow-hidden min-h-[600px] rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-900">
                            {/* Editor Panel */}
                            <AnimatePresence mode="wait">
                                {!isPreviewOnly && (
                                    <motion.div
                                        key="editor"
                                        className="w-1/2 border-r border-slate-200 dark:border-slate-700 flex flex-col"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Editor Header */}
                                        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Type size={16} className="text-slate-600 dark:text-slate-400" />
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Editor</span>
                                            </div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                Ctrl+S to save • Tab for indentation
                                            </div>
                                        </div>
                                        
                                        {/* Enhanced Textarea */}
                                        <textarea
                                            value={markdown}
                                            onChange={handleMarkdownChange}
                                            className="flex-1 p-4 font-mono text-sm resize-none border-none outline-none bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 focus:bg-white dark:focus:bg-slate-800 transition-colors leading-relaxed"
                                            placeholder="# Start writing your markdown here...

Use **bold**, *italic*, `code`, and more!"
                                            spellCheck={false}
                                            style={{
                                                fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                                                lineHeight: 1.6,
                                                tabSize: 2,
                                            }}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            {/* Preview Panel */}
                            <motion.div
                                className={isPreviewOnly ? "w-full" : "w-1/2"}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                {/* Preview Header */}
                                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Eye size={16} className="text-slate-600 dark:text-slate-400" />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Preview</span>
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        Live rendering • GitHub Flavored Markdown
                                    </div>
                                </div>
                                
                                {/* Enhanced Preview Content */}
                                <div className="h-full overflow-auto">
                                    <div className="p-6 bg-white dark:bg-slate-900 min-h-full">
                                        <div
                                            ref={previewRef}
                                            className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20"
                                        >
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                                                components={memoizedMarkdownComponents}
                                            >
                                                {markdown || "*Start typing to see the preview...*"}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </main>
                {!isFullscreen && <Footer />}
            </div>
        </PageTransition>
    );
}