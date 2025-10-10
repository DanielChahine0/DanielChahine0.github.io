/**
 * @file DrawingToolPanel.jsx
 * Provides drawing tools for the image editor.
 * Includes brush, shapes, eraser, and drawing settings.
 */

import React, { memo } from "react";
import { 
    PenTool, 
    Eraser, 
    Circle, 
    Square, 
    Minus,
    Triangle
} from "lucide-react";

/**
 * DrawingToolPanel Component
 * @param {Object} props - Component props
 * @param {string} props.activeTool - Currently active drawing tool
 * @param {Function} props.onToolChange - Tool change handler
 * @param {Object} props.drawingSettings - Current drawing settings
 * @param {Function} props.onSettingChange - Drawing setting change handler
 * @param {Function} props.onClearDrawing - Clear drawing layer handler
 * @param {boolean} props.isVisible - Controls component visibility
 */
const DrawingToolPanel = memo(function DrawingToolPanel({
    activeTool,
    onToolChange,
    drawingSettings = {},
    onSettingChange,
    onClearDrawing,
    isVisible = true
}) {
    if (!isVisible) return null;

    const tools = [
        { id: 'brush', label: 'Brush', icon: PenTool },
        { id: 'eraser', label: 'Eraser', icon: Eraser },
        { id: 'line', label: 'Line', icon: Minus },
        { id: 'rectangle', label: 'Rectangle', icon: Square },
        { id: 'circle', label: 'Circle', icon: Circle },
        { id: 'triangle', label: 'Triangle', icon: Triangle }
    ];

    const presetColors = [
        '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
        '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
    ];

    return (
        <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="font-semibold mb-3 flex items-center">
                <PenTool className="w-4 h-4 mr-2" />
                Drawing Tools
            </h3>

            {/* Tool Selection */}
            <div className="mb-4">
                <label className="text-sm font-medium block mb-2">Tool</label>
                <div className="grid grid-cols-3 gap-2">
                    {tools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                            <button
                                key={tool.id}
                                onClick={() => onToolChange(tool.id)}
                                className={`p-3 rounded border transition-all ${
                                    activeTool === tool.id
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-secondary text-secondary-foreground border-border hover:border-primary/50'
                                }`}
                                title={tool.label}
                            >
                                <Icon className="w-5 h-5 mx-auto" />
                                <span className="text-xs block mt-1">{tool.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Drawing Settings */}
            <div className="space-y-4">
                {/* Brush Size / Line Width */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium">
                            {activeTool === 'eraser' ? 'Eraser Size' : 'Brush Size'}
                        </label>
                        <span className="text-sm text-muted-foreground">
                            {drawingSettings.brushSize || 5}px
                        </span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={drawingSettings.brushSize || 5}
                        onChange={(e) => onSettingChange('brushSize', parseInt(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Color Picker (not for eraser) */}
                {activeTool !== 'eraser' && (
                    <>
                        <div>
                            <label className="text-sm font-medium block mb-2">Color</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="color"
                                    value={drawingSettings.color || '#000000'}
                                    onChange={(e) => onSettingChange('color', e.target.value)}
                                    className="w-12 h-10 rounded border border-border cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={drawingSettings.color || '#000000'}
                                    onChange={(e) => onSettingChange('color', e.target.value)}
                                    className="flex-1 px-2 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            {/* Preset Colors */}
                            <div className="grid grid-cols-5 gap-2">
                                {presetColors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => onSettingChange('color', color)}
                                        className={`w-full h-8 rounded border-2 transition-all ${
                                            drawingSettings.color === color
                                                ? 'border-primary scale-110'
                                                : 'border-border hover:scale-105'
                                        }`}
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Opacity */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-medium">Opacity</label>
                                <span className="text-sm text-muted-foreground">
                                    {Math.round((drawingSettings.opacity || 1) * 100)}%
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={(drawingSettings.opacity || 1) * 100}
                                onChange={(e) => onSettingChange('opacity', parseInt(e.target.value) / 100)}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        {/* Fill (for shapes) */}
                        {['rectangle', 'circle', 'triangle'].includes(activeTool) && (
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={drawingSettings.fill || false}
                                        onChange={(e) => onSettingChange('fill', e.target.checked)}
                                        className="w-4 h-4 rounded border-border"
                                    />
                                    <span className="text-sm font-medium">Fill Shape</span>
                                </label>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Clear Drawing Button */}
            <div className="mt-4 pt-4 border-t border-border">
                <button
                    onClick={onClearDrawing}
                    className="w-full px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors flex items-center justify-center gap-2"
                >
                    <Eraser className="w-4 h-4" />
                    Clear All Drawing
                </button>
            </div>

            {/* Drawing Tips */}
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                    💡 <strong>Tip:</strong> Click and drag to draw. For shapes, click and drag to define the size.
                </p>
            </div>
        </div>
    );
});

export default DrawingToolPanel;
