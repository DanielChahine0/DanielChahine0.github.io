import React, { memo, forwardRef } from "react";
import { Image as ImageIcon, RefreshCw } from "lucide-react";

const EditorCanvas = memo(forwardRef(function EditorCanvas({
    image,
    isProcessing,
    onUpload,
    fileInputRef,
    onFileChange
}, canvasRef) {
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
                        <canvas
                            ref={canvasRef}
                            className="max-w-full max-h-[600px] border border-border rounded-lg shadow-lg"
                        />
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

export default EditorCanvas;
