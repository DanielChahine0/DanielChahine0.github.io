/**
 * @file HelpSection.jsx
 * Provides user documentation and instructions for the image editor.
 * Displays a guide for basic usage, editing tools, and saving work.
 */

import React, { memo } from "react";

/**
 * HelpSection Component
 * @param {Object} props - Component props
 * @param {boolean} props.isVisible - Controls component visibility
 */
const HelpSection = memo(function HelpSection({ isVisible = true }) {
    if (!isVisible) return null;

    return (
        <div className="bg-card rounded-lg p-6 border border-border mt-6">
            <h3 className="text-xl font-semibold mb-4">How to Use</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                <div>
                    <h4 className="font-medium text-foreground mb-2">Getting Started</h4>
                    <ul className="space-y-1 list-disc list-inside">
                        <li>Upload an image using the Upload button</li>
                        <li>Switch between Filters, Layers, Text, and Drawing tabs</li>
                        <li>Choose from preset filters for quick results</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-medium text-foreground mb-2">Layers & Text</h4>
                    <ul className="space-y-1 list-disc list-inside">
                        <li>Add text overlays with custom fonts and colors</li>
                        <li>Manage multiple layers (reorder, hide/show)</li>
                        <li>Adjust layer opacity for blending effects</li>
                        <li>Drag text layers to reposition them</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-medium text-foreground mb-2">Drawing Tools</h4>
                    <ul className="space-y-1 list-disc list-inside">
                        <li>Use brush tool for freehand drawing</li>
                        <li>Add shapes: lines, rectangles, circles, triangles</li>
                        <li>Erase with the eraser tool</li>
                        <li>Customize brush size, color, and opacity</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-medium text-foreground mb-2">Saving Work</h4>
                    <ul className="space-y-1 list-disc list-inside">
                        <li>Use Undo/Redo to navigate edit history</li>
                        <li>Download merges all visible layers</li>
                        <li>Reset filters to start over</li>
                        <li>All layers are preserved in final download</li>
                    </ul>
                </div>
            </div>
        </div>
    );
});

export default HelpSection;
