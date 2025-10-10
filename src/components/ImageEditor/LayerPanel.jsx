/**
 * @file LayerPanel.jsx
 * Provides layer management interface for the image editor.
 * Supports multiple layers, visibility toggles, reordering, and deletion.
 */

import React, { memo } from "react";
import { 
    Layers, 
    Eye, 
    EyeOff, 
    Trash2, 
    Plus,
    ChevronUp,
    ChevronDown,
    Image as ImageIcon,
    Type,
    PenTool
} from "lucide-react";

/**
 * LayerPanel Component
 * @param {Object} props - Component props
 * @param {Array} props.layers - Array of layer objects
 * @param {number} props.activeLayerId - ID of currently selected layer
 * @param {Function} props.onLayerSelect - Layer selection handler
 * @param {Function} props.onLayerToggle - Layer visibility toggle handler
 * @param {Function} props.onLayerDelete - Layer deletion handler
 * @param {Function} props.onLayerMove - Layer reordering handler
 * @param {Function} props.onAddLayer - Add new layer handler
 * @param {boolean} props.isVisible - Controls component visibility
 */
const LayerPanel = memo(function LayerPanel({
    layers = [],
    activeLayerId,
    onLayerSelect,
    onLayerToggle,
    onLayerDelete,
    onLayerMove,
    onAddLayer,
    isVisible = true
}) {
    if (!isVisible) return null;

    const getLayerIcon = (type) => {
        switch (type) {
            case 'image':
                return <ImageIcon className="w-4 h-4" />;
            case 'text':
                return <Type className="w-4 h-4" />;
            case 'drawing':
                return <PenTool className="w-4 h-4" />;
            default:
                return <Layers className="w-4 h-4" />;
        }
    };

    return (
        <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center">
                    <Layers className="w-4 h-4 mr-2" />
                    Layers
                </h3>
                <button
                    onClick={onAddLayer}
                    className="p-1 rounded hover:bg-secondary transition-colors"
                    title="Add Drawing Layer"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {layers.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No layers yet. Upload an image to start.
                    </p>
                ) : (
                    layers.map((layer, index) => (
                        <div
                            key={layer.id}
                            className={`p-2 rounded border transition-all cursor-pointer ${
                                layer.id === activeLayerId
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => onLayerSelect(layer.id)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    {getLayerIcon(layer.type)}
                                    <span className="text-sm font-medium truncate">
                                        {layer.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {layer.opacity}%
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    {/* Move Up/Down */}
                                    {index < layers.length - 1 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onLayerMove(layer.id, 'up');
                                            }}
                                            className="p-1 rounded hover:bg-secondary transition-colors"
                                            title="Move Up"
                                        >
                                            <ChevronUp className="w-3 h-3" />
                                        </button>
                                    )}
                                    {index > 0 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onLayerMove(layer.id, 'down');
                                            }}
                                            className="p-1 rounded hover:bg-secondary transition-colors"
                                            title="Move Down"
                                        >
                                            <ChevronDown className="w-3 h-3" />
                                        </button>
                                    )}
                                    {/* Visibility Toggle */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onLayerToggle(layer.id);
                                        }}
                                        className="p-1 rounded hover:bg-secondary transition-colors"
                                        title={layer.visible ? 'Hide Layer' : 'Show Layer'}
                                    >
                                        {layer.visible ? (
                                            <Eye className="w-3 h-3" />
                                        ) : (
                                            <EyeOff className="w-3 h-3 opacity-50" />
                                        )}
                                    </button>
                                    {/* Delete */}
                                    {layer.type !== 'image' && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onLayerDelete(layer.id);
                                            }}
                                            className="p-1 rounded hover:bg-destructive/20 hover:text-destructive transition-colors"
                                            title="Delete Layer"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Opacity Slider for active layer */}
                            {layer.id === activeLayerId && (
                                <div className="mt-2 pt-2 border-t border-border">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span>Opacity</span>
                                        <span>{layer.opacity}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={layer.opacity}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            // This will be handled by the parent
                                            const event = new CustomEvent('layerOpacityChange', {
                                                detail: { layerId: layer.id, opacity: parseInt(e.target.value) }
                                            });
                                            window.dispatchEvent(event);
                                        }}
                                        className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
});

export default LayerPanel;
