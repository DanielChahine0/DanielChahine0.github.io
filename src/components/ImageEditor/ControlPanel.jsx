/**
 * @file ControlPanel.jsx
 * Provides the control interface for image adjustments and presets.
 * Features filter adjustments and preset filters for quick image enhancements.
 */

import React, { memo, useMemo } from "react";
import { Palette, Sliders, Smartphone } from "lucide-react";

/**
 * ControlPanel Component
 * @param {Object} props - Component props
 * @param {Object} props.filters - Current filter values
 * @param {Function} props.onFilterChange - Callback for filter value changes
 * @param {Function} props.onApplyPreset - Callback for applying preset filters
 * @param {boolean} props.isVisible - Controls component visibility
 */
const ControlPanel = memo(function ControlPanel({
    filters,
    onFilterChange,
    onApplyPreset,
    isVisible = true
}) {
    // Check if browser supports canvas filters
    const supportsCanvasFilters = useMemo(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.filter = 'brightness(1)';
        return ctx.filter !== 'none';
    }, []);

    if (!isVisible) return null;

    const presets = [
        { name: 'vintage', label: 'Vintage' },
        { name: 'bw', label: 'Black & White' },
        { name: 'vivid', label: 'Vivid' },
        { name: 'soft', label: 'Soft', limitedMobile: true },
        { name: 'dramatic', label: 'Dramatic' }
    ];

    const filterLabels = {
        brightness: 'Brightness',
        contrast: 'Contrast',
        saturation: 'Saturation',
        hue: 'Hue',
        blur: 'Blur',
        sepia: 'Sepia',
        grayscale: 'Grayscale'
    };

    const limitedMobileFilters = ['hue', 'blur'];

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
                            onClick={() => onApplyPreset?.(preset.name)}
                            className={`px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors text-left flex items-center justify-between
                                ${preset.limitedMobile && !supportsCanvasFilters ? 'opacity-60' : ''}`}
                        >
                            <span>{preset.label}</span>
                            {preset.limitedMobile && !supportsCanvasFilters && (
                                <Smartphone className="w-3 h-3 text-muted-foreground" />
                            )}
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
                        <div key={key} className={limitedMobileFilters.includes(key) && !supportsCanvasFilters ? 'opacity-60' : ''}>
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-medium flex items-center">
                                    {filterLabels[key] || key}
                                    {limitedMobileFilters.includes(key) && !supportsCanvasFilters && (
                                        <Smartphone className="w-3 h-3 ml-1 text-muted-foreground" />
                                    )}
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
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    onFilterChange?.(key, newValue);
                                }}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
                {!supportsCanvasFilters && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-start">
                            <Smartphone className="w-4 h-4 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
                            <p className="text-xs text-muted-foreground">
                                Some filters (hue, blur) have limited support on mobile browsers. 
                                Basic filters work normally.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default ControlPanel;
