import React from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

export default function PreviewPanel({ 
    isPreviewOnly, 
    markdown, 
    previewRef, 
    markdownComponents 
}) {
    return (
        <motion.div
            className={isPreviewOnly ? "w-full" : "w-1/2"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
        >
            {/* Preview Header */}
            <div className="px-4 py-2 bg-muted border-b border-border flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Eye size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Preview</span>
                </div>
                <div className="text-xs text-muted-foreground">
                    Live rendering • GitHub Flavored Markdown
                </div>
            </div>
            
            {/* Enhanced Preview Content */}
            <div className="h-full overflow-auto">
                <div className="p-6 bg-card min-h-full">
                    <div
                        ref={previewRef}
                        className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20"
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight, rehypeRaw]}
                            components={markdownComponents}
                        >
                            {markdown || "*Start typing to see the preview...*"}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
