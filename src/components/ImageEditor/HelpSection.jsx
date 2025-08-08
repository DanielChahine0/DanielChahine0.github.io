import React, { memo } from "react";

const HelpSection = memo(function HelpSection({ isVisible = true }) {
    if (!isVisible) return null;

    return (
        <div className="bg-card rounded-lg p-6 border border-border mt-6">
            <h3 className="text-xl font-semibold mb-4">How to Use</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div>
                    <h4 className="font-medium text-foreground mb-2">Getting Started</h4>
                    <ul className="space-y-1 list-disc list-inside">
                        <li>Upload an image using the Upload button</li>
                        <li>Choose from preset filters for quick results</li>
                        <li>Use adjustment sliders for fine-tuning</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-medium text-foreground mb-2">Editing Tools</h4>
                    <ul className="space-y-1 list-disc list-inside">
                        <li>Rotate and flip images with transform tools</li>
                        <li>Adjust brightness, contrast, and saturation</li>
                        <li>Apply effects like blur, sepia, and grayscale</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-medium text-foreground mb-2">Saving Work</h4>
                    <ul className="space-y-1 list-disc list-inside">
                        <li>Use Undo/Redo to navigate edit history</li>
                        <li>Download your edited image as PNG</li>
                        <li>Reset filters to start over</li>
                    </ul>
                </div>
            </div>
        </div>
    );
});

export default HelpSection;
