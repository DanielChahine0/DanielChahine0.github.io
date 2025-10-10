/**
 * @file Toolbar.jsx
 * Provides the main toolbar interface for image manipulation actions.
 * Includes controls for file operations, transformations, and history.
 */

import React, { memo } from "react";
import { 
    Upload, 
    Download, 
    RotateCw, 
    RotateCcw, 
    FlipHorizontal, 
    FlipVertical,
    Undo, 
    Redo, 
    RefreshCw, 
    Maximize2, 
    Minimize2,
    Palette,
    Sliders
} from "lucide-react";

/**
 * Toolbar Component
 * @param {Object} props - Component props
 * @param {Image} props.image - Current image being edited
 * @param {Function} props.onUpload - Image upload handler
 * @param {Function} props.onDownload - Image download handler
 * @param {Function} props.onRotateLeft - Rotate left handler
 * @param {Function} props.onRotateRight - Rotate right handler
 * @param {Function} props.onFlipHorizontal - Horizontal flip handler
 * @param {Function} props.onFlipVertical - Vertical flip handler
 * @param {Function} props.onUndo - Undo action handler
 * @param {Function} props.onRedo - Redo action handler
 * @param {Function} props.onReset - Reset all changes handler
 * @param {Function} props.onToggleFullscreen - Fullscreen toggle handler
 * @param {boolean} props.isFullscreen - Fullscreen state
 * @param {boolean} props.isProcessing - Processing state
 * @param {boolean} props.canUndo - Whether undo is available
 * @param {boolean} props.canRedo - Whether redo is available
 * @param {boolean} props.showStats - Whether to show statistics
 */
const Toolbar = memo(function Toolbar({
    image,
    onUpload,
    onDownload,
    onRotateLeft,
    onRotateRight,
    onFlipHorizontal,
    onFlipVertical,
    onUndo,
    onRedo,
    onReset,
    onToggleFullscreen,
    isFullscreen = false,
    isProcessing = false,
    canUndo = false,
    canRedo = false,
    // showStats intentionally omitted; not used in this toolbar
}) {
    console.log('🛠️ [TOOLBAR] Rendered with props:', {
        hasImage: !!image,
        isFullscreen,
        isProcessing,
        canUndo,
        canRedo,
        hasCallbacks: {
            onUpload: typeof onUpload === 'function',
            onDownload: typeof onDownload === 'function',
            onRotateLeft: typeof onRotateLeft === 'function',
            onRotateRight: typeof onRotateRight === 'function',
            onFlipHorizontal: typeof onFlipHorizontal === 'function',
            onFlipVertical: typeof onFlipVertical === 'function',
            onUndo: typeof onUndo === 'function',
            onRedo: typeof onRedo === 'function',
            onReset: typeof onReset === 'function',
            onToggleFullscreen: typeof onToggleFullscreen === 'function',
        }
    });

    return (
        <div className="bg-card rounded-lg p-4 mb-6 border border-border">
            <div className="flex flex-wrap gap-2 justify-center">
                {/* Upload Button */}
                <button
                    onClick={() => {
                        console.log('🛠️ [TOOLBAR] Upload button clicked');
                        onUpload?.();
                    }}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                </button>
                
                {image && (
                    <>
                        {/* History Controls */}
                        <div className="flex border border-border rounded-lg overflow-hidden">
                            <button
                                onClick={() => {
                                    console.log('🛠️ [TOOLBAR] Undo button clicked', { canUndo });
                                    onUndo?.();
                                }}
                                disabled={!canUndo}
                                className="px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title="Undo"
                            >
                                <Undo className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => {
                                    console.log('🛠️ [TOOLBAR] Redo button clicked', { canRedo });
                                    onRedo?.();
                                }}
                                disabled={!canRedo}
                                className="px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-l border-border"
                                title="Redo"
                            >
                                <Redo className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Rotation Controls */}
                        <div className="flex border border-border rounded-lg overflow-hidden">
                            <button
                                onClick={() => {
                                    console.log('🛠️ [TOOLBAR] Rotate Left button clicked');
                                    onRotateLeft?.();
                                }}
                                disabled={isProcessing}
                                className="px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 transition-colors"
                                title="Rotate Left"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => {
                                    console.log('🛠️ [TOOLBAR] Rotate Right button clicked');
                                    onRotateRight?.();
                                }}
                                disabled={isProcessing}
                                className="px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 transition-colors border-l border-border"
                                title="Rotate Right"
                            >
                                <RotateCw className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Flip Controls */}
                        <div className="flex border border-border rounded-lg overflow-hidden">
                            <button
                                onClick={() => {
                                    console.log('🛠️ [TOOLBAR] Flip Horizontal button clicked');
                                    onFlipHorizontal?.();
                                }}
                                disabled={isProcessing}
                                className="px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 transition-colors"
                                title="Flip Horizontal"
                            >
                                <FlipHorizontal className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => {
                                    console.log('🛠️ [TOOLBAR] Flip Vertical button clicked');
                                    onFlipVertical?.();
                                }}
                                disabled={isProcessing}
                                className="px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 transition-colors border-l border-border"
                                title="Flip Vertical"
                            >
                                <FlipVertical className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Utility Controls */}
                        <button
                            onClick={() => {
                                console.log('🛠️ [TOOLBAR] Reset button clicked');
                                onReset?.();
                            }}
                            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Reset
                        </button>

                        {/* Fullscreen Toggle */}
                        <button
                            onClick={() => {
                                console.log('🛠️ [TOOLBAR] Fullscreen toggle clicked', { currentState: isFullscreen });
                                onToggleFullscreen?.();
                            }}
                            className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        >
                            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>

                        {/* Download Button */}
                        <button
                            onClick={() => {
                                console.log('🛠️ [TOOLBAR] Download button clicked');
                                onDownload?.();
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </button>
                    </>
                )}
            </div>
        </div>
    );
});

export default Toolbar;
