/**
 * @file TextToolPanel.jsx
 * Provides text overlay tools for the image editor.
 * Allows adding and customizing text layers with fonts, colors, and styles.
 */

import React, { memo, useState } from "react";
import { Type, Plus, Bold, Italic, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

/**
 * TextToolPanel Component
 * @param {Object} props - Component props
 * @param {Function} props.onAddText - Callback to add text layer
 * @param {Object} props.activeTextLayer - Currently active text layer
 * @param {Function} props.onUpdateText - Callback to update text properties
 * @param {boolean} props.isVisible - Controls component visibility
 */
const TextToolPanel = memo(function TextToolPanel({
    onAddText,
    activeTextLayer,
    onUpdateText,
    isVisible = true
}) {
    const [textInput, setTextInput] = useState('');

    if (!isVisible) return null;

    const handleAddText = () => {
        if (textInput.trim()) {
            onAddText({
                text: textInput,
                fontSize: 32,
                fontFamily: 'Arial',
                color: '#ffffff',
                fontWeight: 'normal',
                fontStyle: 'normal',
                textAlign: 'left',
                stroke: false,
                strokeColor: '#000000',
                strokeWidth: 2
            });
            setTextInput('');
        }
    };

    const fonts = [
        'Arial',
        'Helvetica',
        'Times New Roman',
        'Courier New',
        'Georgia',
        'Verdana',
        'Impact',
        'Comic Sans MS'
    ];

    return (
        <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="font-semibold mb-3 flex items-center">
                <Type className="w-4 h-4 mr-2" />
                Text Tool
            </h3>

            {/* Add New Text */}
            <div className="mb-4">
                <label className="text-sm font-medium block mb-2">Add Text</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddText()}
                        placeholder="Enter text..."
                        className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        onClick={handleAddText}
                        disabled={!textInput.trim()}
                        className="px-3 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Text Editing Controls (shown when text layer is active) */}
            {activeTextLayer && (
                <div className="space-y-4 pt-4 border-t border-border">
                    <div className="text-sm font-medium mb-2">Edit Text</div>

                    {/* Text Content */}
                    <div>
                        <label className="text-xs text-muted-foreground block mb-1">Content</label>
                        <input
                            type="text"
                            value={activeTextLayer.text}
                            onChange={(e) => onUpdateText({ text: e.target.value })}
                            className="w-full px-2 py-1.5 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Font Family */}
                    <div>
                        <label className="text-xs text-muted-foreground block mb-1">Font</label>
                        <select
                            value={activeTextLayer.fontFamily}
                            onChange={(e) => onUpdateText({ fontFamily: e.target.value })}
                            className="w-full px-2 py-1.5 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {fonts.map(font => (
                                <option key={font} value={font}>{font}</option>
                            ))}
                        </select>
                    </div>

                    {/* Font Size */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-xs text-muted-foreground">Size</label>
                            <span className="text-xs text-muted-foreground">{activeTextLayer.fontSize}px</span>
                        </div>
                        <input
                            type="range"
                            min="12"
                            max="120"
                            value={activeTextLayer.fontSize}
                            onChange={(e) => onUpdateText({ fontSize: parseInt(e.target.value) })}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Text Color */}
                    <div>
                        <label className="text-xs text-muted-foreground block mb-1">Color</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={activeTextLayer.color}
                                onChange={(e) => onUpdateText({ color: e.target.value })}
                                className="w-12 h-8 rounded border border-border cursor-pointer"
                            />
                            <input
                                type="text"
                                value={activeTextLayer.color}
                                onChange={(e) => onUpdateText({ color: e.target.value })}
                                className="flex-1 px-2 py-1.5 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Text Style */}
                    <div>
                        <label className="text-xs text-muted-foreground block mb-2">Style</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onUpdateText({ 
                                    fontWeight: activeTextLayer.fontWeight === 'bold' ? 'normal' : 'bold' 
                                })}
                                className={`px-3 py-2 rounded border transition-colors ${
                                    activeTextLayer.fontWeight === 'bold'
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-secondary text-secondary-foreground border-border'
                                }`}
                                title="Bold"
                            >
                                <Bold className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onUpdateText({ 
                                    fontStyle: activeTextLayer.fontStyle === 'italic' ? 'normal' : 'italic' 
                                })}
                                className={`px-3 py-2 rounded border transition-colors ${
                                    activeTextLayer.fontStyle === 'italic'
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-secondary text-secondary-foreground border-border'
                                }`}
                                title="Italic"
                            >
                                <Italic className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Text Alignment */}
                    <div>
                        <label className="text-xs text-muted-foreground block mb-2">Align</label>
                        <div className="flex gap-2">
                            {['left', 'center', 'right'].map(align => (
                                <button
                                    key={align}
                                    onClick={() => onUpdateText({ textAlign: align })}
                                    className={`px-3 py-2 rounded border transition-colors ${
                                        activeTextLayer.textAlign === align
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'bg-secondary text-secondary-foreground border-border'
                                    }`}
                                    title={`Align ${align}`}
                                >
                                    {align === 'left' && <AlignLeft className="w-4 h-4" />}
                                    {align === 'center' && <AlignCenter className="w-4 h-4" />}
                                    {align === 'right' && <AlignRight className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stroke/Outline */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={activeTextLayer.stroke}
                                onChange={(e) => onUpdateText({ stroke: e.target.checked })}
                                className="w-4 h-4 rounded border-border"
                            />
                            <span className="text-xs text-muted-foreground">Add Stroke/Outline</span>
                        </label>
                        {activeTextLayer.stroke && (
                            <div className="space-y-2 ml-6">
                                <div>
                                    <label className="text-xs text-muted-foreground block mb-1">Stroke Color</label>
                                    <input
                                        type="color"
                                        value={activeTextLayer.strokeColor}
                                        onChange={(e) => onUpdateText({ strokeColor: e.target.value })}
                                        className="w-12 h-8 rounded border border-border cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs text-muted-foreground">Stroke Width</label>
                                        <span className="text-xs text-muted-foreground">{activeTextLayer.strokeWidth}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={activeTextLayer.strokeWidth}
                                        onChange={(e) => onUpdateText({ strokeWidth: parseInt(e.target.value) })}
                                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!activeTextLayer && (
                <p className="text-xs text-muted-foreground text-center py-4">
                    Add text or select a text layer to edit
                </p>
            )}
        </div>
    );
});

export default TextToolPanel;
