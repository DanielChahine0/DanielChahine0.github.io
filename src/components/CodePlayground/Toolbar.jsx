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
    Settings
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
    label = "Code Editor"
}) {
    return (
        <div className="bg-card border-b border-border px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-foreground flex items-center">
                    <Code className="w-6 h-6 mr-2 text-primary" />
                    {label}
                </h1>
                
                {/* Templates Dropdown */}
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
            </div>

            <div className="flex items-center space-x-2">
                {/* Auto-run toggle */}
                <label className="flex items-center space-x-2 text-sm">
                    <input
                        type="checkbox"
                        checked={autoRun}
                        onChange={(e) => onAutoRunToggle?.(e.target.checked)}
                        className="rounded"
                    />
                    <span>Auto-run</span>
                </label>

                {/* Viewport selector */}
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

                {/* Action buttons */}
                <button
                    onClick={onRun}
                    className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center text-sm"
                    title="Run Code (F5)"
                >
                    <Play className="w-4 h-4 mr-1" />
                    Run
                </button>
                
                <button
                    onClick={onSave}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center text-sm"
                    title="Save Project (Ctrl+S)"
                >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                </button>
                
                <button
                    onClick={onShare}
                    className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center text-sm"
                    title="Share Project"
                >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                </button>
                
                <button
                    onClick={onDownload}
                    className="px-3 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors flex items-center text-sm"
                    title="Export as HTML"
                >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                </button>
                
                <button
                    onClick={onReset}
                    className="px-3 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors flex items-center text-sm"
                    title="Reset Code"
                >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                </button>
            </div>
        </div>
    );
});

export default Toolbar;
