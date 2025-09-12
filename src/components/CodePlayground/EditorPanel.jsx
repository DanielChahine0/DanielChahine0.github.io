import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, FileCode, Braces } from "lucide-react";

/**
 * EditorPanel Component
 * 
 * A code editor panel that supports HTML, CSS, and JavaScript editing with syntax highlighting
 * and tab-based navigation. Includes animations for tab switching and responsive design for mobile.
 * 
 * @param {Object} props
 * @param {string} props.activeTab - Currently active tab (html/css/js)
 * @param {function} props.onTabChange - Callback for tab change
 * @param {string} props.html - HTML code content
 * @param {string} props.css - CSS code content
 * @param {string} props.js - JavaScript code content
 * @param {function} props.onHtmlChange - Callback for HTML code changes
 * @param {function} props.onCssChange - Callback for CSS code changes
 * @param {function} props.onJsChange - Callback for JavaScript code changes
 * @param {boolean} props.isMobile - Flag for mobile view adaptation
 */
export default function EditorPanel({ 
    activeTab, 
    onTabChange,
    html, 
    css, 
    js,
    onHtmlChange, 
    onCssChange, 
    onJsChange,
    isMobile = false
}) {
    const tabs = [
        { 
            id: 'html', 
            label: 'HTML', 
            color: 'text-orange-500', 
            icon: FileCode,
            value: html,
            onChange: onHtmlChange,
            placeholder: 'Enter your HTML code here...'
        },
        { 
            id: 'css', 
            label: 'CSS', 
            color: 'text-blue-500', 
            icon: Code2,
            value: css,
            onChange: onCssChange,
            placeholder: 'Enter your CSS code here...'
        },
        { 
            id: 'js', 
            label: 'JavaScript', 
            color: 'text-yellow-500', 
            icon: Braces,
            value: js,
            onChange: onJsChange,
            placeholder: 'Enter your JavaScript code here...'
        }
    ];

    const currentTab = tabs.find(tab => tab.id === activeTab);

    return (
        <div className={`${isMobile ? 'w-full' : 'w-1/2'} flex flex-col ${!isMobile ? 'border-r border-border' : ''}`}>
            {/* Editor Tabs */}
            <div className="flex bg-card border-b border-border overflow-x-auto">
                {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`px-3 py-2 md:px-4 border-b-2 transition-colors flex items-center space-x-1 md:space-x-2 whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'border-primary bg-background text-foreground'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <span className={tab.color}>
                                <IconComponent className="w-3 h-3 md:w-4 md:h-4" />
                            </span>
                            <span className="text-xs md:text-sm">{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Code Editor */}
            <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                    <motion.textarea
                        key={activeTab}
                        value={currentTab?.value || ''}
                        onChange={(e) => currentTab?.onChange?.(e.target.value)}
                        className="w-full h-full p-2 md:p-4 bg-background text-foreground font-mono text-xs md:text-sm resize-none border-none outline-none focus:ring-0 leading-relaxed"
                        placeholder={currentTab?.placeholder}
                        spellCheck={false}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                            lineHeight: isMobile ? 1.4 : 1.6,
                            tabSize: 2,
                        }}
                    />
                </AnimatePresence>

                {/* Language indicator */}
                <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-card border border-border rounded px-2 py-1 text-xs text-muted-foreground">
                    {currentTab?.label}
                </div>
            </div>
        </div>
    );
}
