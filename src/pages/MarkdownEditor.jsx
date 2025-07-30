import React, { useState, useCallback, useRef, useEffect } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
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
    HelpCircle
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

export default function MarkdownEditor() {
    const { toast } = useToast();
    const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

This is a **live preview** markdown editor with real-time rendering!

## Features

- ✅ Live preview
- ✅ Syntax highlighting
- ✅ Export to MD/PDF
- ✅ Copy to clipboard
- ✅ GitHub Flavored Markdown support

## Code Example

\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

## Table Example

| Feature | Status |
|---------|--------|
| Preview | ✅ |
| Export | ✅ |
| Copy | ✅ |

> **Tip:** Try editing the markdown on the left to see the live preview!

### Links and Images
[Visit GitHub](https://github.com)

---

*Happy writing!* 🚀
`);
    
    const [isPreviewOnly, setIsPreviewOnly] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const previewRef = useRef(null);
    const containerRef = useRef(null);

    const handleMarkdownChange = useCallback((e) => {
        setMarkdown(e.target.value);
    }, []);

    const copyToClipboard = async () => {
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
    };

    const downloadMarkdown = () => {
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
    };

    const exportToPDF = async () => {
        if (!previewRef.current) return;
        
        try {
            // Create a temporary container with better styling for PDF
            const tempDiv = document.createElement('div');
            tempDiv.style.cssText = `
                position: absolute;
                top: -9999px;
                left: -9999px;
                width: 800px;
                padding: 40px;
                background: white;
                color: black;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
            `;
            
            // Clone the preview content
            const clonedContent = previewRef.current.cloneNode(true);
            
            // Apply explicit styles to headers in the cloned content
            const headers = clonedContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headers.forEach((header) => {
                const tagName = header.tagName.toLowerCase();
                const styles = {
                    h1: 'font-size: 2.5em; font-weight: 700; margin: 0.67em 0;',
                    h2: 'font-size: 2em; font-weight: 700; margin: 0.83em 0;',
                    h3: 'font-size: 1.5em; font-weight: 700; margin: 1em 0;',
                    h4: 'font-size: 1.2em; font-weight: 700; margin: 1.33em 0;',
                    h5: 'font-size: 1em; font-weight: 700; margin: 1.67em 0;',
                    h6: 'font-size: 0.85em; font-weight: 700; margin: 2.33em 0;'
                };
                header.style.cssText = styles[tagName] || '';
            });
            
            tempDiv.appendChild(clonedContent);
            document.body.appendChild(tempDiv);

            const canvas = await html2canvas(tempDiv, {
                scale: 2,
                useCORS: true,
                allowTaint: false,
                backgroundColor: '#ffffff'
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

            pdf.save('document.pdf');
            document.body.removeChild(tempDiv);
            
            toast({
                title: "Exported!",
                description: "PDF exported successfully",
                duration: 2000,
            });
        } catch (error) {
            console.error('PDF export error:', error);
            toast({
                title: "Error",
                description: "Failed to export PDF",
                variant: "destructive",
                duration: 2000,
            });
        }
    };

    const resetContent = () => {
        setMarkdown(`# Welcome to Markdown Editor

Start writing your markdown here...

## Getting Started

1. Type in the editor on the left
2. See live preview on the right
3. Use the toolbar to export or copy content

**Happy writing!** 🚀
`);
        toast({
            title: "Reset",
            description: "Editor content has been reset",
            duration: 2000,
        });
    };

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

    const showHelp = () => {
        toast({
            title: "Markdown Help",
            description: "# Headers, **bold**, *italic*, `code`, [links](url), - lists",
            duration: 5000,
        });
    };

    const containerClass = isFullscreen 
        ? "fixed inset-0 z-50 bg-background" 
        : "min-h-screen flex flex-col bg-background";

    return (
        <PageTransition>
            <div ref={containerRef} className={containerClass}>
                {!isFullscreen && <NavBar />}
                
                <main className={`flex-1 ${isFullscreen ? 'h-screen' : 'mt-10 container mx-auto px-4 py-8'}`}>
                    <div className="h-full flex flex-col max-w-7xl mx-auto">
                        {/* Title - matching CalorieTracker style */}
                        {!isFullscreen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-8"
                            >
                                <h1 className="text-4xl font-bold text-center">Markdown Editor</h1>
                            </motion.div>
                        )}

                        {/* Toolbar */}
                        <div className="border-b bg-card/50 backdrop-blur-sm rounded-t-lg">
                            <div className="px-4 py-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <FileText size={20} />
                                        <span className="text-xl font-semibold">
                                            {isFullscreen ? 'Markdown Editor' : 'Editor'}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={showHelp}
                                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                                            title="Show help"
                                        >
                                            <HelpCircle size={16} />
                                        </button>
                                        
                                        <button
                                            onClick={() => setIsPreviewOnly(!isPreviewOnly)}
                                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                                            title={isPreviewOnly ? "Show editor" : "Preview only"}
                                        >
                                            {isPreviewOnly ? <Eye size={16} /> : <EyeOff size={16} />}
                                        </button>
                                        
                                        <button
                                            onClick={toggleFullscreen}
                                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                                            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                                        >
                                            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                        </button>
                                        
                                        <div className="w-px h-6 bg-border" />
                                        
                                        <button
                                            onClick={resetContent}
                                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                                            title="Reset content"
                                        >
                                            <RotateCcw size={16} />
                                        </button>
                                        
                                        <button
                                            onClick={copyToClipboard}
                                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                                            title="Copy to clipboard"
                                        >
                                            <Copy size={16} />
                                        </button>
                                        
                                        <button
                                            onClick={downloadMarkdown}
                                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                                            title="Download as .md"
                                        >
                                            <Download size={16} />
                                        </button>
                                        
                                        <button
                                            onClick={exportToPDF}
                                            className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                                            title="Export as PDF"
                                        >
                                            PDF
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Editor and Preview */}
                        <div className="flex-1 flex bg-card rounded-b-lg overflow-hidden">
                            {!isPreviewOnly && (
                                <motion.div
                                    className="w-1/2 border-r"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <textarea
                                        value={markdown}
                                        onChange={handleMarkdownChange}
                                        className="w-full h-full p-4 bg-background text-foreground font-mono text-sm resize-none border-none outline-none"
                                        placeholder="Start typing your markdown here..."
                                        spellCheck={false}
                                    />
                                </motion.div>
                            )}
                            
                            <motion.div
                                className={isPreviewOnly ? "w-full" : "w-1/2"}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                <div className="h-full overflow-auto p-4 bg-card/30">
                                    <div 
                                        ref={previewRef}
                                        className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base prose-p:text-base prose-p:leading-relaxed"
                                    >
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[rehypeHighlight, rehypeRaw]}
                                            components={{
                                                // Custom components for better styling
                                                h1: ({ children }) => (
                                                    <h1 className="text-4xl font-bold mt-6 mb-4">{children}</h1>
                                                ),
                                                h2: ({ children }) => (
                                                    <h2 className="text-3xl font-bold mt-5 mb-3">{children}</h2>
                                                ),
                                                h3: ({ children }) => (
                                                    <h3 className="text-2xl font-bold mt-4 mb-2">{children}</h3>
                                                ),
                                                h4: ({ children }) => (
                                                    <h4 className="text-xl font-bold mt-3 mb-2">{children}</h4>
                                                ),
                                                h5: ({ children }) => (
                                                    <h5 className="text-lg font-bold mt-3 mb-1">{children}</h5>
                                                ),
                                                h6: ({ children }) => (
                                                    <h6 className="text-base font-bold mt-3 mb-1">{children}</h6>
                                                ),
                                                p: ({ children }) => (
                                                    <p className="text-base leading-relaxed mb-4">{children}</p>
                                                ),
                                                code: ({ node, inline, className, children, ...props }) => {
                                                    const match = /language-(\w+)/.exec(className || '');
                                                    return !inline && match ? (
                                                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
                                                            <code className={className} {...props}>
                                                                {children}
                                                            </code>
                                                        </pre>
                                                    ) : (
                                                        <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                },
                                                blockquote: ({ children }) => (
                                                    <blockquote className="border-l-4 border-primary pl-4 italic bg-muted/50 py-2 my-4">
                                                        {children}
                                                    </blockquote>
                                                ),
                                                table: ({ children }) => (
                                                    <div className="overflow-x-auto my-4">
                                                        <table className="min-w-full border border-border rounded-lg">
                                                            {children}
                                                        </table>
                                                    </div>
                                                ),
                                                th: ({ children }) => (
                                                    <th className="border border-border px-4 py-2 bg-muted font-semibold text-left">
                                                        {children}
                                                    </th>
                                                ),
                                                td: ({ children }) => (
                                                    <td className="border border-border px-4 py-2">
                                                        {children}
                                                    </td>
                                                ),
                                            }}
                                        >
                                            {markdown}
                                        </ReactMarkdown>
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