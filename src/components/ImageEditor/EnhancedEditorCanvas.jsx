/**
 * @file EnhancedEditorCanvas.jsx
 * Enhanced canvas with layer support, drawing tools, and text overlays.
 * Handles multi-layer rendering, user interactions, and tool operations.
 */

import React, { memo, forwardRef, useRef, useEffect, useState, useCallback } from "react";
import { Image as ImageIcon, RefreshCw, Move } from "lucide-react";

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
    isProcessing,
    onUpload,
    fileInputRef,
    onFileChange,
    activeTool = 'brush',
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
        if (image && mainCanvasRef.current) {
            const canvas = mainCanvasRef.current;
            const ctx = canvas.getContext('2d');
            
            // If canvas has no dimensions yet, it means this is first load
            if (canvas.width === 0 || canvas.height === 0) {
                // Canvas will be sized by drawImageToCanvas
                return;
            }
            
            const { width, height } = canvas;
            
            if (drawingCanvasRef.current) {
                drawingCanvasRef.current.width = width;
                drawingCanvasRef.current.height = height;
            }
            
            if (overlayCanvasRef.current) {
                overlayCanvasRef.current.width = width;
                overlayCanvasRef.current.height = height;
            }
        }
    }, [image, mainCanvasRef]);

    // Load existing drawing when active layer changes
    useEffect(() => {
        if (!drawingCanvasRef.current || !activeLayerId) return;
        
        const activeLayer = layers.find(l => l.id === activeLayerId);
        if (!activeLayer || activeLayer.type !== 'drawing') return;
        
        const ctx = drawingCanvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, drawingCanvasRef.current.width, drawingCanvasRef.current.height);
        
        if (activeLayer.dataUrl) {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            };
            img.src = activeLayer.dataUrl;
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
                            className="relative inline-block"
                            onMouseMove={draggedTextId ? handleTextMouseMove : draw}
                            onMouseUp={draggedTextId ? handleTextMouseUp : stopDrawing}
                            onMouseLeave={draggedTextId ? handleTextMouseUp : stopDrawing}
                            onTouchMove={draggedTextId ? handleTextMouseMove : draw}
                            onTouchEnd={draggedTextId ? handleTextMouseUp : stopDrawing}
                        >
                            {/* Main canvas with image and filters */}
                            <canvas
                                ref={mainCanvasRef}
                                className="max-w-full max-h-[600px] border border-border rounded-lg shadow-lg absolute top-0 left-0"
                                style={{ pointerEvents: 'none' }}
                            />
                            
                            {/* Drawing layer canvas */}
                            <canvas
                                ref={drawingCanvasRef}
                                className="max-w-full max-h-[600px] border border-border rounded-lg shadow-lg absolute top-0 left-0"
                                onMouseDown={startDrawing}
                                onTouchStart={startDrawing}
                                style={{ 
                                    pointerEvents: activeTool !== 'select' ? 'auto' : 'none',
                                    cursor: activeTool === 'eraser' ? 'crosshair' : 'default'
                                }}
                            />
                            
                            {/* Overlay canvas for shape preview */}
                            <canvas
                                ref={overlayCanvasRef}
                                className="max-w-full max-h-[600px] absolute top-0 left-0 pointer-events-none"
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
