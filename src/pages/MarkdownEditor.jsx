import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
import { useToast } from "../hooks/use-toast";
import Toolbar from "../components/MarkdownEditor/Toolbar";
import { markdownComponents } from "../components/MarkdownEditor/MarkdownComponents";
import EditorPanel from "../components/MarkdownEditor/EditorPanel";
import PreviewPanel from "../components/MarkdownEditor/PreviewPanel";
import { useMarkdownFormatting } from "../components/MarkdownEditor/useMarkdownFormatting";
import { useMarkdownActions } from "../components/MarkdownEditor/useMarkdownActions";

export default function MarkdownEditor() {
    const { toast } = useToast();
    const [markdown, setMarkdown] = useState(`# 🚀 Welcome to Enhanced Markdown Editor
Start writing your markdown here...
`);
    
    const [isPreviewOnly, setIsPreviewOnly] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const previewRef = useRef(null);
    const containerRef = useRef(null);
    const textareaRef = useRef(null);

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

    // Use custom hooks
    const {
        formatBold,
        formatItalic,
        formatCode,
        formatCodeBlock,
        formatHeader,
        formatList,
        formatLink,
        formatQuote
    } = useMarkdownFormatting(markdown, setMarkdown, textareaRef);

    const {
        handleFileUpload,
        copyToClipboard,
        downloadMarkdown,
        exportToPDF,
        resetContent,
        showHelp
    } = useMarkdownActions(markdown, setMarkdown, previewRef, toast);

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
    useEffect(() => {
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

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeydown = (e) => {
            if (!textareaRef.current) return;
            
            // Only handle shortcuts when textarea is focused or when target is body
            if (document.activeElement !== textareaRef.current && document.activeElement !== document.body) {
                return;
            }

            if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
                switch (e.key.toLowerCase()) {
                    case 'b':
                        e.preventDefault();
                        formatBold();
                        break;
                    case 'i':
                        e.preventDefault();
                        formatItalic();
                        break;
                    case 'k':
                        e.preventDefault();
                        formatLink();
                        break;
                    case '`':
                        e.preventDefault();
                        formatCode();
                        break;
                }
            }
            
            // Header shortcuts with Ctrl+1, Ctrl+2, etc.
            if ((e.ctrlKey || e.metaKey) && /^[1-6]$/.test(e.key)) {
                e.preventDefault();
                formatHeader(parseInt(e.key));
            }
        };

        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [formatBold, formatItalic, formatCode, formatLink, formatHeader]);


    const containerClass = isFullscreen 
        ? "fixed inset-0 z-50 bg-background" 
        : "min-h-screen flex flex-col bg-background";

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
                            onFormatBold={formatBold}
                            onFormatItalic={formatItalic}
                            onFormatCode={formatCode}
                            onFormatCodeBlock={formatCodeBlock}
                            onFormatHeader={formatHeader}
                            onFormatList={formatList}
                            onFormatLink={formatLink}
                            onFormatQuote={formatQuote}
                        />
                        
                        {/* Enhanced Editor and Preview Layout */}
                        <div className="flex-1 flex overflow-hidden min-h-[600px] rounded-lg border border-border shadow-lg bg-card">
                            {/* Editor Panel */}
                            <EditorPanel
                                isPreviewOnly={isPreviewOnly}
                                markdown={markdown}
                                onMarkdownChange={handleMarkdownChange}
                                textareaRef={textareaRef}
                            />
                            
                            {/* Preview Panel */}
                            <PreviewPanel
                                isPreviewOnly={isPreviewOnly}
                                markdown={markdown}
                                previewRef={previewRef}
                                markdownComponents={markdownComponents}
                            />
                        </div>
                    </div>
                </main>
                {!isFullscreen && <Footer />}
            </div>
        </PageTransition>
    );
}