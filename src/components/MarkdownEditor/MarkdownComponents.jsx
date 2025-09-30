import React from "react";
import { Copy } from "lucide-react";

/**
 * MarkdownComponents
 * 
 * A collection of custom React components for rendering markdown content with enhanced styling.
 * These components are used by the markdown parser to render different markdown elements
 * with consistent styling and interactive features.
 * 
 * Components include:
 * - Headings (h1-h6) with consistent typography and spacing
 * - Code blocks with syntax highlighting and copy button
 * - Lists with proper indentation and bullets
 * - Blockquotes with visual styling
 * - Links with hover effects
 * - Tables with responsive layout
 * 
 * All components are styled using Tailwind CSS classes for consistency
 * with the application's design system.
 */
export const markdownComponents = {
    h1: ({ children }) => (
        <h1 className="text-4xl font-bold mt-8 mb-6 text-foreground border-b border-border pb-3">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-3xl font-bold mt-7 mb-4 text-foreground border-b border-muted pb-2">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-2xl font-bold mt-6 mb-3 text-foreground">
            {children}
        </h3>
    ),
    h4: ({ children }) => (
        <h4 className="text-xl font-semibold mt-5 mb-2 text-foreground">
            {children}
        </h4>
    ),
    h5: ({ children }) => (
        <h5 className="text-lg font-semibold mt-4 mb-2 text-foreground">
            {children}
        </h5>
    ),
    h6: ({ children }) => (
        <h6 className="text-base font-semibold mt-3 mb-1 text-card-foreground">
            {children}
        </h6>
    ),
    p: ({ children }) => (
        <p className="text-base leading-relaxed mb-4 text-card-foreground">
            {children}
        </p>
    ),
    ul: ({ children }) => (
        <ul className="list-disc pl-6 mb-4 space-y-1 text-card-foreground">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal pl-6 mb-4 space-y-1 text-card-foreground">
            {children}
        </ol>
    ),
    li: ({ children }) => (
        <li className="text-card-foreground">{children}</li>
    ),
    strong: ({ children }) => (
        <strong className="text-foreground font-bold">{children}</strong>
    ),
    em: ({ children }) => (
        <em className="text-foreground italic">{children}</em>
    ),
    code: ({ inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        
        if (!inline && match) {
            const codeString = String(children).replace(/\n$/, '');
            
            const copyCodeToClipboard = async () => {
                try {
                    await navigator.clipboard.writeText(codeString);
                    // Enhanced toast notification
                    const toast = document.createElement('div');
                    toast.innerHTML = `
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                            <span>Code copied!</span>
                        </div>
                    `;
                    toast.className = 'fixed top-4 right-4 bg-card text-foreground px-4 py-3 rounded-lg shadow-lg z-50 transition-all transform translate-x-0 border border-border';
                    document.body.appendChild(toast);
                    
                    setTimeout(() => {
                        toast.style.transform = 'translateX(100%)';
                        toast.style.opacity = '0';
                        setTimeout(() => document.body.removeChild(toast), 300);
                    }, 2000);
                } catch (error) {
                    console.error('Failed to copy code:', error);
                }
            };

            return (
                <div className="relative group my-6 rounded-xl overflow-hidden border border-border">
                    <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
                        <span className="text-sm font-medium text-muted-foreground capitalize">
                            {match[1]}
                        </span>
                        <button
                            onClick={copyCodeToClipboard}
                            className="flex items-center space-x-1 px-2 py-1 text-xs bg-accent hover:bg-accent/80 text-foreground rounded transition-colors"
                            title="Copy code"
                            aria-label="Copy code to clipboard"
                        >
                            <Copy size={12} />
                            <span>Copy</span>
                        </button>
                    </div>
                    <pre className="p-4 overflow-x-auto bg-card text-sm">
                        <code className={className} {...props}>
                            {children}
                        </code>
                    </pre>
                </div>
            );
        }
        
        return (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm text-foreground font-mono border border-border" {...props}>
                {children}
            </code>
        );
    },
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 bg-primary/5 rounded-r-lg">
            <div className="text-card-foreground italic">
                {children}
            </div>
        </blockquote>
    ),
    table: ({ children }) => (
        <div className="overflow-x-auto my-6 rounded-lg border border-border">
            <table className="min-w-full">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }) => (
        <thead className="bg-muted">
            {children}
        </thead>
    ),
    th: ({ children }) => (
        <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="border-b border-border/50 px-4 py-3 text-card-foreground">
            {children}
        </td>
    ),
    a: ({ children, href }) => (
        <a
            href={href}
            className="text-primary hover:text-primary/80 underline decoration-primary/30 underline-offset-2 hover:decoration-primary/60 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    ),
    hr: () => (
        <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    ),
};
