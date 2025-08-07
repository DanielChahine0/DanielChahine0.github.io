import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Type } from "lucide-react";

export default function EditorPanel({ 
    isPreviewOnly, 
    markdown, 
    onMarkdownChange, 
    textareaRef 
}) {
    return (
        <AnimatePresence mode="wait">
            {!isPreviewOnly && (
                <motion.div
                    key="editor"
                    className="w-1/2 border-r border-border flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Editor Header */}
                    <div className="px-4 py-2 bg-muted border-b border-border flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Type size={16} className="text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">Editor</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Ctrl+S to save • Tab for indentation
                        </div>
                    </div>
                    
                    {/* Enhanced Textarea */}
                    <textarea
                        ref={textareaRef}
                        value={markdown}
                        onChange={onMarkdownChange}
                        className="flex-1 p-4 font-mono text-sm resize-none border-none outline-none bg-muted/30 text-foreground placeholder-muted-foreground focus:bg-card transition-colors leading-relaxed"
                        placeholder="# Start writing your markdown here...

Use **bold**, *italic*, `code`, and more!"
                        spellCheck={false}
                        style={{
                            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                            lineHeight: 1.6,
                            tabSize: 2,
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
