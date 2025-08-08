import React from "react";
import { Eye } from "lucide-react";

export default function PreviewPanel({ 
    viewMode, 
    iframeRef,
    className = ""
}) {
    const getViewportStyle = () => {
        switch (viewMode) {
            case 'mobile':
                return { width: '375px', height: '667px' };
            case 'tablet':
                return { width: '768px', height: '1024px' };
            default:
                return { width: '100%', height: '100%' };
        }
    };

    const getViewportLabel = () => {
        switch (viewMode) {
            case 'mobile':
                return 'Mobile View (375px)';
            case 'tablet':
                return 'Tablet View (768px)';
            default:
                return 'Desktop View';
        }
    };

    return (
        <div className={`w-1/2 flex flex-col ${className}`}>
            {/* Preview Header */}
            <div className="flex justify-between items-center px-4 py-2 bg-card border-b border-border">
                <h3 className="font-medium text-foreground flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                </h3>
                <div className="text-sm text-muted-foreground">
                    {getViewportLabel()}
                </div>
            </div>
            
            {/* Preview Content */}
            <div className="flex-1 bg-white flex justify-center items-center overflow-auto p-4">
                <div 
                    style={getViewportStyle()} 
                    className={`border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg ${
                        viewMode !== 'desktop' ? 'mx-auto' : ''
                    }`}
                >
                    <iframe
                        ref={iframeRef}
                        className="w-full h-full border-none"
                        title="Code Preview"
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>
            </div>
        </div>
    );
}
