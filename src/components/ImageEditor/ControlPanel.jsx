import React, { memo } from "react";
import { Palette, Sliders } from "lucide-react";

const ControlPanel = memo(function ControlPanel({
    filters,
    onFilterChange,
    onApplyPreset,
    isVisible = true
}) {
    if (!isVisible) return null;

    const presets = [
        { name: 'vintage', label: 'Vintage' },
        { name: 'bw', label: 'Black & White' },
        { name: 'vivid', label: 'Vivid' },
        { name: 'soft', label: 'Soft' },
        { name: 'dramatic', label: 'Dramatic' }
    ];

    return (
        <div className="lg:col-span-1 space-y-6">
            {/* Filter Presets */}
            <div className="bg-card rounded-lg p-4 border border-border">
                <h3 className="font-semibold mb-3 flex items-center">
                    <Palette className="w-4 h-4 mr-2" />
                    Presets
                </h3>
                <div className="grid grid-cols-1 gap-2">
                    {presets.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() => onApplyPreset(preset.name)}
                            className="px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors text-left"
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filter Controls */}
            <div className="bg-card rounded-lg p-4 border border-border">
                <h3 className="font-semibold mb-3 flex items-center">
                    <Sliders className="w-4 h-4 mr-2" />
                    Adjustments
                </h3>
                <div className="space-y-4">
                    {Object.entries(filters).map(([key, value]) => (
                        <div key={key}>
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-medium capitalize">
                                    {key}
                                </label>
                                <span className="text-sm text-muted-foreground">
                                    {key === 'hue' ? `${value}°` : 
                                     ['blur'].includes(key) ? `${value}px` : 
                                     `${value}${['brightness', 'contrast', 'saturation', 'sepia', 'grayscale'].includes(key) ? '%' : ''}`}
                                </span>
                            </div>
                            <input
                                type="range"
                                min={key === 'hue' ? -180 : key === 'blur' ? 0 : 0}
                                max={key === 'hue' ? 180 : key === 'blur' ? 10 : key === 'brightness' || key === 'contrast' ? 200 : 100}
                                value={value}
                                onChange={(e) => onFilterChange(key, parseInt(e.target.value))}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default ControlPanel;
