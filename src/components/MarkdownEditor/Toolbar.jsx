import React, { memo } from "react";
import { 
    Download, 
    Copy, 
    FileText, 
    Eye, 
    Maximize2, 
    Minimize2,
    RotateCcw,
    HelpCircle,
    Upload,
    Columns2,
    Bold,
    Italic,
    Code,
    Code2,
    Heading1,
    Heading2,
    List,
    Link,
    Quote
} from "lucide-react";

/**
 * Toolbar Component
 * 
 * A comprehensive toolbar for the markdown editor that provides various text formatting
 * and file operation controls. Features include text formatting, file operations,
 * view toggles, and export options.
 * 
 * Features:
 * - Text formatting (bold, italic, code, headings, lists, links, quotes)
 * - File operations (upload, download, copy, reset)
 * - View controls (preview toggle, fullscreen)
 * - Export options (PDF, raw markdown)
 * - Word and character count display
 * 
 * The component is memoized for performance optimization.
 */
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
    lineCount = 0,
    onFormatBold,
    onFormatItalic,
    onFormatCode,
    onFormatCodeBlock,
    onFormatHeader,
    onFormatList,
    onFormatLink,
    onFormatQuote
}) {
    return (
        <div className="border-b border-border bg-card/80 backdrop-blur-sm">
            <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Left Section - Title and Stats */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="p-2 bg-primary rounded-lg">
                                <FileText size={18} className="text-primary-foreground" />
                            </div>
                            <div>
                                <span className="text-lg font-semibold text-foreground">{label}</span>
                                <div className="text-xs text-muted-foreground flex space-x-3">
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
                        <div className="flex items-center space-x-1 px-1 py-1 bg-muted rounded-lg">
                            <button
                                onClick={onTogglePreview}
                                className={`p-2 rounded-md transition-all duration-200 ${
                                    isPreviewOnly 
                                        ? 'bg-primary text-primary-foreground shadow-sm' 
                                        : 'hover:bg-accent text-muted-foreground'
                                }`}
                                title={isPreviewOnly ? "Show editor" : "Preview only"}
                                aria-label={isPreviewOnly ? "Show editor" : "Preview only"}
                            >
                                {isPreviewOnly ? <Columns2 size={16} /> : <Eye size={16} />}
                            </button>
                            <button
                                onClick={onToggleFullscreen}
                                className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                            >
                                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                            </button>
                        </div>

                        <div className="w-px h-6 bg-border" />

                        {/* Text Formatting Controls */}
                        {!isPreviewOnly && (
                            <>
                                <div className="flex items-center space-x-1 px-1 py-1 bg-muted rounded-lg">
                                    <button
                                        onClick={onFormatBold}
                                        className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                                        title="Bold (Ctrl+B)"
                                        aria-label="Bold text"
                                    >
                                        <Bold size={16} />
                                    </button>
                                    <button
                                        onClick={onFormatItalic}
                                        className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                                        title="Italic (Ctrl+I)"
                                        aria-label="Italic text"
                                    >
                                        <Italic size={16} />
                                    </button>
                                    <button
                                        onClick={onFormatCode}
                                        className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                                        title="Inline code"
                                        aria-label="Inline code"
                                    >
                                        <Code size={16} />
                                    </button>
                                    <button
                                        onClick={onFormatCodeBlock}
                                        className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                                        title="Code block"
                                        aria-label="Code block"
                                    >
                                        <Code2 size={16} />
                                    </button>
                                </div>
                                
                                <div className="flex items-center space-x-1 px-1 py-1 bg-muted rounded-lg">
                                    <button
                                        onClick={() => onFormatHeader(1)}
                                        className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                                        title="Header 1"
                                        aria-label="Header 1"
                                    >
                                        <Heading1 size={16} />
                                    </button>
                                    <button
                                        onClick={() => onFormatHeader(2)}
                                        className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                                        title="Header 2"
                                        aria-label="Header 2"
                                    >
                                        <Heading2 size={16} />
                                    </button>
                                    <button
                                        onClick={onFormatList}
                                        className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                                        title="List"
                                        aria-label="Bullet list"
                                    >
                                        <List size={16} />
                                    </button>
                                    <button
                                        onClick={onFormatLink}
                                        className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                                        title="Link"
                                        aria-label="Insert link"
                                    >
                                        <Link size={16} />
                                    </button>
                                    <button
                                        onClick={onFormatQuote}
                                        className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                                        title="Quote"
                                        aria-label="Block quote"
                                    >
                                        <Quote size={16} />
                                    </button>
                                </div>

                                <div className="w-px h-6 bg-border" />
                            </>
                        )}

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
                                className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors cursor-pointer"
                                title="Upload markdown file"
                            >
                                <Upload size={16} />
                            </label>
                            {showReset && (
                                <button
                                    onClick={onReset}
                                    className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
                                    title="Reset content"
                                    aria-label="Reset content"
                                >
                                    <RotateCcw size={16} />
                                </button>
                            )}
                        </div>

                        <div className="w-px h-6 bg-border" />

                        {/* Export Operations */}
                        <div className="flex items-center space-x-1">
                            <button
                                onClick={onCopy}
                                className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
                                title="Copy to clipboard"
                                aria-label="Copy to clipboard"
                            >
                                <Copy size={16} />
                            </button>
                            <button
                                onClick={onDownload}
                                className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
                                title="Download as .md"
                                aria-label="Download as markdown"
                            >
                                <Download size={16} />
                            </button>
                            {showExportPDF && (
                                <button
                                    onClick={onExportPDF}
                                    className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                                    title="Export as PDF"
                                    aria-label="Export as PDF"
                                >
                                    PDF
                                </button>
                            )}
                        </div>

                        <div className="w-px h-6 bg-border" />

                        {/* Help */}
                        <button
                            onClick={onShowHelp}
                            className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
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

export default Toolbar;
