import React, { memo } from "react";
import { 
    Play, 
    Download, 
    Save, 
    Share2, 
    RotateCcw,
    Code,
    Monitor, 
    Smartphone, 
    Tablet,
    Settings,
    Eye,
    EyeOff
} from "lucide-react";

const Toolbar = memo(function Toolbar({
    onRun,
    onSave,
    onShare,
    onDownload,
    onReset,
    onLoadTemplate,
    autoRun,
    onAutoRunToggle,
    viewMode,
    onViewModeChange,
    templates = [],
    isFullscreen = false,
    label = "Code Editor",
    isMobile = false,
    showPreview = false,
    onTogglePreview
}) {
    return (
        <div className="bg-card border-b border-border px-2 md:px-4 py-2 md:py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2 md:space-x-4">
                <h1 className="text-lg md:text-xl font-bold text-foreground flex items-center">
                    <Code className="w-4 h-4 md:w-6 md:h-6 mr-2 text-primary" />
                    <span className="hidden sm:inline">{label}</span>
                </h1>
                
                {/* Templates Dropdown - Hidden on mobile */}
                {!isMobile && (
                    <select 
                        onChange={(e) => {
                            if (e.target.value && onLoadTemplate) {
                                const template = templates.find(t => t.name === e.target.value);
                                if (template) onLoadTemplate(template);
                                e.target.value = '';
                            }
                        }}
                        className="px-3 py-1 bg-background border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="">Load Template</option>
                        {templates.map(template => (
                            <option key={template.name} value={template.name}>{template.name}</option>
                        ))}
                    </select>
                )}
            </div>

            <div className="flex items-center space-x-1 md:space-x-2">
                {/* Mobile Preview Toggle */}
                {isMobile && (
                    <button
                        onClick={onTogglePreview}
                        className={`p-2 rounded ${
                            showPreview 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-secondary text-secondary-foreground'
                        }`}
                        title={showPreview ? "Show Editor" : "Show Preview"}
                    >
                        {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                )}

                {/* Auto-run toggle - Simplified for mobile */}
                <label className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
                    <input
                        type="checkbox"
                        checked={autoRun}
                        onChange={(e) => onAutoRunToggle?.(e.target.checked)}
                        className="rounded"
                    />
                    <span className="hidden md:inline">Auto-run</span>
                </label>

                {/* Viewport selector - Hidden on mobile */}
                {!isMobile && (
                    <div className="flex border border-border rounded overflow-hidden">
                        <button
                            onClick={() => onViewModeChange?.('desktop')}
                            className={`p-2 ${viewMode === 'desktop' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                            title="Desktop View"
                        >
                            <Monitor className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onViewModeChange?.('tablet')}
                            className={`p-2 border-l border-border ${viewMode === 'tablet' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                            title="Tablet View"
                        >
                            <Tablet className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onViewModeChange?.('mobile')}
                            className={`p-2 border-l border-border ${viewMode === 'mobile' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                            title="Mobile View"
                        >
                            <Smartphone className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Action buttons - Compact for mobile */}
                <button
                    onClick={onRun}
                    className="px-2 md:px-3 py-1 md:py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center text-xs md:text-sm"
                    title="Run Code (F5)"
                >
                    <Play className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    <span className="hidden sm:inline">Run</span>
                </button>
                
                {!isMobile && (
                    <>
                        <button
                            onClick={onSave}
                            className="px-2 md:px-3 py-1 md:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center text-xs md:text-sm"
                            title="Save Project (Ctrl+S)"
                        >
                            <Save className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            <span className="hidden sm:inline">Save</span>
                        </button>
                        
                        <button
                            onClick={onShare}
                            className="px-2 md:px-3 py-1 md:py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center text-xs md:text-sm"
                            title="Share Project"
                        >
                            <Share2 className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            <span className="hidden sm:inline">Share</span>
                        </button>
                        
                        <button
                            onClick={onDownload}
                            className="px-2 md:px-3 py-1 md:py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors flex items-center text-xs md:text-sm"
                            title="Export as HTML"
                        >
                            <Download className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                        
                        <button
                            onClick={onReset}
                            className="px-2 md:px-3 py-1 md:py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors flex items-center text-xs md:text-sm"
                            title="Reset Code"
                        >
                            <RotateCcw className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            <span className="hidden sm:inline">Reset</span>
                        </button>
                    </>
                )}
                
                {/* Mobile menu button for additional actions */}
                {isMobile && (
                    <div className="relative">
                        <details className="relative">
                            <summary className="p-2 bg-secondary text-secondary-foreground rounded cursor-pointer list-none">
                                <Settings className="w-4 h-4" />
                            </summary>
                            <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded shadow-lg p-2 space-y-2 z-10 min-w-[120px]">
                                <button
                                    onClick={onSave}
                                    className="w-full px-2 py-1 text-left hover:bg-accent rounded text-sm flex items-center"
                                >
                                    <Save className="w-3 h-3 mr-2" />
                                    Save
                                </button>
                                <button
                                    onClick={onShare}
                                    className="w-full px-2 py-1 text-left hover:bg-accent rounded text-sm flex items-center"
                                >
                                    <Share2 className="w-3 h-3 mr-2" />
                                    Share
                                </button>
                                <button
                                    onClick={onDownload}
                                    className="w-full px-2 py-1 text-left hover:bg-accent rounded text-sm flex items-center"
                                >
                                    <Download className="w-3 h-3 mr-2" />
                                    Export
                                </button>
                                <button
                                    onClick={onReset}
                                    className="w-full px-2 py-1 text-left hover:bg-accent rounded text-sm flex items-center"
                                >
                                    <RotateCcw className="w-3 h-3 mr-2" />
                                    Reset
                                </button>
                            </div>
                        </details>
                    </div>
                )}
            </div>
        </div>
    );
});

export default Toolbar;
