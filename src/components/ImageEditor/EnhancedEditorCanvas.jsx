/**
 * @file EnhancedEditorCanvas.jsx
 * Enhanced canvas with layer support, drawing tools, and text overlays.
 * Handles multi-layer rendering, user interactions, and tool operations.
 */

import React, { memo, forwardRef, useRef, useEffect, useState, useCallback } from "react";
import { Image as ImageIcon, RefreshCw, Move } from "lucide-react";

// Constants
const CANVAS_CONFIG = {
    MIN_HEIGHT: 400,
    MAX_HEIGHT: 800,
    Z_INDEX: {
        MAIN: 1,
        DRAWING: 2,
        OVERLAY: 3
    }
};

const DEFAULT_DRAWING_SETTINGS = {
    color: '#000000',
    brushSize: 5,
    opacity: 1,
    fill: false
};

const DRAWING_TOOLS = {
    BRUSH: 'brush',
    ERASER: 'eraser',
    LINE: 'line',
    RECTANGLE: 'rectangle',
    CIRCLE: 'circle',
    TRIANGLE: 'triangle',
    SELECT: 'select'
};

const LAYER_TYPES = {
    DRAWING: 'drawing',
    TEXT: 'text',
    IMAGE: 'image'
};

/**
 * Shape drawing functions
 */
const drawShapes = {
    [DRAWING_TOOLS.LINE]: (ctx, startPoint, coords) => {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
    },
    [DRAWING_TOOLS.RECTANGLE]: (ctx, startPoint, coords, settings) => {
        const width = coords.x - startPoint.x;
        const height = coords.y - startPoint.y;
        ctx.beginPath();
        ctx.rect(startPoint.x, startPoint.y, width, height);
        settings.fill ? ctx.fill() : ctx.stroke();
    },
    [DRAWING_TOOLS.CIRCLE]: (ctx, startPoint, coords, settings) => {
        const width = coords.x - startPoint.x;
        const height = coords.y - startPoint.y;
        const radius = Math.sqrt(width * width + height * height);
        ctx.beginPath();
        ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
        settings.fill ? ctx.fill() : ctx.stroke();
    },
    [DRAWING_TOOLS.TRIANGLE]: (ctx, startPoint, coords, settings) => {
        const width = coords.x - startPoint.x;
        const height = coords.y - startPoint.y;
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y + height);
        ctx.lineTo(startPoint.x + width / 2, startPoint.y);
        ctx.lineTo(startPoint.x + width, startPoint.y + height);
        ctx.closePath();
        settings.fill ? ctx.fill() : ctx.stroke();
    }
};

/**
 * EnhancedEditorCanvas Component
 * @param {Object} props - Component props
 * @param {Image} props.image - The current image being edited
 * @param {Array} props.layers - All layers (image, text, drawing)
 * @param {boolean} props.isProcessing - Processing state flag
 * @param {Function} props.onUpload - Image upload handler
 * @param {React.RefObject} props.fileInputRef - Reference to file input
 * @param {Function} props.onFileChange - File change handler
 * @param {string} props.activeTool - Currently active drawing tool
 * @param {Object} props.drawingSettings - Drawing settings
 * @param {Function} props.onDrawingComplete - Callback when drawing is complete
 * @param {Function} props.onTextMove - Callback when text is moved
 * @param {number} props.activeLayerId - Active layer ID
 */
const EnhancedEditorCanvas = memo(forwardRef(function EnhancedEditorCanvas({
    image,
    layers = [],
    isProcessing = false,
    onUpload,
    fileInputRef,
    onFileChange,
    activeTool = DRAWING_TOOLS.BRUSH,
    drawingSettings = {},
    onDrawingComplete,
    onTextMove,
    activeLayerId
}, mainCanvasRef) {
    const containerRef = useRef(null);
    const drawingCanvasRef = useRef(null);
    const overlayCanvasRef = useRef(null);
    
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState(null);
    const [draggedTextId, setDraggedTextId] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Merge default drawing settings with provided settings
    const settings = { ...DEFAULT_DRAWING_SETTINGS, ...drawingSettings };

    // Get canvas coordinates from mouse/touch event
    const getCanvasCoordinates = useCallback((e, canvas) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }, []);

    // Initialize drawing on the overlay canvas
    const startDrawing = useCallback((e) => {
        if (!drawingCanvasRef.current || !activeLayerId) return;
        
        // Check if active layer is a drawing layer
        const activeLayer = layers.find(l => l.id === activeLayerId);
        if (!activeLayer || activeLayer.type !== 'drawing') return;
        
        const coords = getCanvasCoordinates(e, drawingCanvasRef.current);
        setIsDrawing(true);
        setStartPoint(coords);

        const ctx = drawingCanvasRef.current.getContext('2d');
        ctx.strokeStyle = activeTool === 'eraser' ? '#FFFFFF' : (drawingSettings.color || '#000000');
        ctx.lineWidth = drawingSettings.brushSize || 5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = activeTool === 'eraser' ? 1 : (drawingSettings.opacity || 1);
        ctx.globalCompositeOperation = activeTool === 'eraser' ? 'destination-out' : 'source-over';

        if (activeTool === 'brush' || activeTool === 'eraser') {
            ctx.beginPath();
            ctx.moveTo(coords.x, coords.y);
        }
    }, [activeTool, drawingSettings, getCanvasCoordinates, activeLayerId, layers]);

    // Continue drawing
    const draw = useCallback((e) => {
        if (!isDrawing || !drawingCanvasRef.current || !overlayCanvasRef.current) return;

        const coords = getCanvasCoordinates(e, drawingCanvasRef.current);
        const ctx = drawingCanvasRef.current.getContext('2d');
        const overlayCtx = overlayCanvasRef.current.getContext('2d');

        if (activeTool === 'brush' || activeTool === 'eraser') {
            // Freehand drawing
            ctx.lineTo(coords.x, coords.y);
            ctx.stroke();
        } else {
            // Shape preview on overlay
            overlayCtx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
            overlayCtx.strokeStyle = drawingSettings.color || '#000000';
            overlayCtx.fillStyle = drawingSettings.color || '#000000';
            overlayCtx.lineWidth = drawingSettings.brushSize || 5;
            overlayCtx.globalAlpha = drawingSettings.opacity || 1;

            const width = coords.x - startPoint.x;
            const height = coords.y - startPoint.y;

            switch (activeTool) {
                case 'line': {
                    overlayCtx.beginPath();
                    overlayCtx.moveTo(startPoint.x, startPoint.y);
                    overlayCtx.lineTo(coords.x, coords.y);
                    overlayCtx.stroke();
                    break;
                }
                case 'rectangle': {
                    overlayCtx.beginPath();
                    overlayCtx.rect(startPoint.x, startPoint.y, width, height);
                    if (drawingSettings.fill) {
                        overlayCtx.fill();
                    } else {
                        overlayCtx.stroke();
                    }
                    break;
                }
                case 'circle': {
                    const radius = Math.sqrt(width * width + height * height);
                    overlayCtx.beginPath();
                    overlayCtx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
                    if (drawingSettings.fill) {
                        overlayCtx.fill();
                    } else {
                        overlayCtx.stroke();
                    }
                    break;
                }
                case 'triangle': {
                    overlayCtx.beginPath();
                    overlayCtx.moveTo(startPoint.x, startPoint.y + height);
                    overlayCtx.lineTo(startPoint.x + width / 2, startPoint.y);
                    overlayCtx.lineTo(startPoint.x + width, startPoint.y + height);
                    overlayCtx.closePath();
                    if (drawingSettings.fill) {
                        overlayCtx.fill();
                    } else {
                        overlayCtx.stroke();
                    }
                    break;
                }
                default:
                    break;
            }
        }
    }, [isDrawing, activeTool, drawingSettings, startPoint, getCanvasCoordinates]);

    // Finish drawing
    const stopDrawing = useCallback(() => {
        if (!isDrawing || !drawingCanvasRef.current || !overlayCanvasRef.current) return;

        const ctx = drawingCanvasRef.current.getContext('2d');
        const overlayCtx = overlayCanvasRef.current.getContext('2d');

        // For shapes, commit the overlay to the drawing canvas
        if (activeTool !== 'brush' && activeTool !== 'eraser' && startPoint) {
            ctx.drawImage(overlayCanvasRef.current, 0, 0);
            overlayCtx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
        }

        setIsDrawing(false);
        setStartPoint(null);
        
        if (onDrawingComplete) {
            onDrawingComplete(drawingCanvasRef.current.toDataURL());
        }
    }, [isDrawing, activeTool, startPoint, onDrawingComplete]);

    // Handle text drag start
    const handleTextMouseDown = useCallback((e, textLayer) => {
        e.stopPropagation();
        e.preventDefault();
        
        const canvas = mainCanvasRef.current;
        if (!canvas) return;

        const coords = getCanvasCoordinates(e, canvas);
        setDraggedTextId(textLayer.id);
        setDragOffset({
            x: coords.x - textLayer.x,
            y: coords.y - textLayer.y
        });
    }, [getCanvasCoordinates, mainCanvasRef]);

    // Handle text drag
    const handleTextMouseMove = useCallback((e) => {
        if (!draggedTextId || !mainCanvasRef.current) return;

        const coords = getCanvasCoordinates(e, mainCanvasRef.current);
        if (onTextMove) {
            onTextMove(draggedTextId, {
                x: coords.x - dragOffset.x,
                y: coords.y - dragOffset.y
            });
        }
    }, [draggedTextId, dragOffset, getCanvasCoordinates, mainCanvasRef, onTextMove]);

    // Handle text drag end
    const handleTextMouseUp = useCallback(() => {
        setDraggedTextId(null);
    }, []);

    // Sync canvas dimensions when image changes
    useEffect(() => {
        console.log('🖼️ [ENHANCED_CANVAS] Dimension sync effect triggered:', {
            hasImage: !!image,
            hasMainCanvas: !!mainCanvasRef.current,
            mainCanvasDimensions: mainCanvasRef.current 
                ? { width: mainCanvasRef.current.width, height: mainCanvasRef.current.height }
                : null
        });
        
        if (image && mainCanvasRef.current) {
            const canvas = mainCanvasRef.current;
            const ctx = canvas.getContext('2d');
            
            // If canvas has no dimensions yet, it means this is first load
            if (canvas.width === 0 || canvas.height === 0) {
                console.log('⚠️ [ENHANCED_CANVAS] Canvas not sized yet, skipping dimension sync');
                // Canvas will be sized by drawImageToCanvas
                return;
            }
            
            const { width, height } = canvas;
            
            console.log('🖼️ [ENHANCED_CANVAS] Syncing overlay canvas dimensions:', { width, height });
            
            if (drawingCanvasRef.current) {
                drawingCanvasRef.current.width = width;
                drawingCanvasRef.current.height = height;
                console.log('✅ [ENHANCED_CANVAS] Drawing canvas dimensions synced');
            }
            
            if (overlayCanvasRef.current) {
                overlayCanvasRef.current.width = width;
                overlayCanvasRef.current.height = height;
                console.log('✅ [ENHANCED_CANVAS] Overlay canvas dimensions synced');
            }
        }
    }, [image, mainCanvasRef]);

    // Load existing drawing when active layer changes
    useEffect(() => {
        console.log('🖼️ [ENHANCED_CANVAS] Active layer changed:', {
            activeLayerId,
            hasDrawingCanvas: !!drawingCanvasRef.current,
            layersCount: layers.length
        });
        
        if (!drawingCanvasRef.current || !activeLayerId) return;
        
        const activeLayer = layers.find(l => l.id === activeLayerId);
        
        console.log('🖼️ [ENHANCED_CANVAS] Active layer details:', activeLayer);
        
        if (!activeLayer || activeLayer.type !== 'drawing') {
            console.log('ℹ️ [ENHANCED_CANVAS] Active layer is not a drawing layer');
            return;
        }
        
        const ctx = drawingCanvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, drawingCanvasRef.current.width, drawingCanvasRef.current.height);
        
        if (activeLayer.dataUrl) {
            console.log('🖼️ [ENHANCED_CANVAS] Loading drawing layer data...');
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
                console.log('✅ [ENHANCED_CANVAS] Drawing layer loaded');
            };
            img.onerror = (error) => {
                console.error('❌ [ENHANCED_CANVAS] Failed to load drawing layer:', error);
            };
            img.src = activeLayer.dataUrl;
        } else {
            console.log('ℹ️ [ENHANCED_CANVAS] No drawing data for active layer');
        }
    }, [activeLayerId, layers]);

    return (
        <div className={`${image ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <div className="bg-card rounded-lg p-6 border border-border">
                {!image ? (
                    <div className="text-center py-20">
                        <div 
                            onClick={onUpload}
                            className="border-2 border-dashed border-border rounded-lg p-12 cursor-pointer hover:border-primary transition-colors"
                        >
                            <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                Upload an image to get started
                            </h3>
                            <p className="text-muted-foreground">
                                Drag and drop an image here, or click to select
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Supports JPG, PNG, GIF, WebP, HEIC
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <div 
                            ref={containerRef}
                            className="relative inline-block min-h-[400px] w-full"
                            onMouseMove={draggedTextId ? handleTextMouseMove : draw}
                            onMouseUp={draggedTextId ? handleTextMouseUp : stopDrawing}
                            onMouseLeave={draggedTextId ? handleTextMouseUp : stopDrawing}
                            onTouchMove={draggedTextId ? handleTextMouseMove : draw}
                            onTouchEnd={draggedTextId ? handleTextMouseUp : stopDrawing}
                        >
                            {/* Main canvas with image and filters */}
                            <canvas
                                ref={mainCanvasRef}
                                className="w-full h-auto max-h-[800px] border border-border rounded-lg shadow-lg"
                                style={{ display: 'block', position: 'relative', zIndex: 1, margin: '0 auto' }}
                            />
                            
                            {/* Drawing layer canvas */}
                            <canvas
                                ref={drawingCanvasRef}
                                className="w-full h-auto max-h-[800px] border border-border rounded-lg shadow-lg absolute top-0 left-0"
                                onMouseDown={startDrawing}
                                onTouchStart={startDrawing}
                                style={{ 
                                    pointerEvents: activeTool !== 'select' ? 'auto' : 'none',
                                    cursor: activeTool === 'eraser' ? 'crosshair' : 'default',
                                    zIndex: 2
                                }}
                            />
                            
                            {/* Overlay canvas for shape preview */}
                            <canvas
                                ref={overlayCanvasRef}
                                className="w-full h-auto max-h-[800px] absolute top-0 left-0 pointer-events-none"
                                style={{ zIndex: 3 }}
                            />
                            
                            {/* Text layers rendered as DOM elements for easy interaction */}
                            {layers
                                .filter(layer => layer.type === 'text' && layer.visible)
                                .map(textLayer => (
                                    <div
                                        key={textLayer.id}
                                        onMouseDown={(e) => handleTextMouseDown(e, textLayer)}
                                        onTouchStart={(e) => handleTextMouseDown(e, textLayer)}
                                        style={{
                                            position: 'absolute',
                                            left: `${textLayer.x}px`,
                                            top: `${textLayer.y}px`,
                                            fontFamily: textLayer.fontFamily,
                                            fontSize: `${textLayer.fontSize}px`,
                                            color: textLayer.color,
                                            fontWeight: textLayer.fontWeight,
                                            fontStyle: textLayer.fontStyle,
                                            textAlign: textLayer.textAlign,
                                            cursor: 'move',
                                            userSelect: 'none',
                                            WebkitUserSelect: 'none',
                                            pointerEvents: 'auto',
                                            whiteSpace: 'nowrap',
                                            WebkitTextStroke: textLayer.stroke 
                                                ? `${textLayer.strokeWidth}px ${textLayer.strokeColor}` 
                                                : 'none',
                                            textStroke: textLayer.stroke 
                                                ? `${textLayer.strokeWidth}px ${textLayer.strokeColor}` 
                                                : 'none',
                                            opacity: textLayer.opacity / 100,
                                            border: textLayer.id === activeLayerId ? '2px dashed #3b82f6' : 'none',
                                            padding: '2px 4px'
                                        }}
                                    >
                                        {textLayer.id === activeLayerId && (
                                            <Move className="w-4 h-4 absolute -top-6 left-0 text-primary" />
                                        )}
                                        {textLayer.text}
                                    </div>
                                ))}
                        </div>
                        
                        {isProcessing && (
                            <div className="mt-4">
                                <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-lg">
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                    Processing...
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.heic,.HEIC"
                onChange={onFileChange}
                className="hidden"
            />
        </div>
    );
}));

export default EnhancedEditorCanvas;
