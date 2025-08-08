import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, FileCode, Braces } from "lucide-react";

export default function EditorPanel({ 
    activeTab, 
    onTabChange,
    html, 
    css, 
    js,
    onHtmlChange, 
    onCssChange, 
    onJsChange 
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
        <div className="w-1/2 flex flex-col border-r border-border">
            {/* Editor Tabs */}
            <div className="flex bg-card border-b border-border">
                {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`px-4 py-2 border-b-2 transition-colors flex items-center space-x-2 ${
                                activeTab === tab.id
                                    ? 'border-primary bg-background text-foreground'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <span className={tab.color}>
                                <IconComponent className="w-4 h-4" />
                            </span>
                            <span>{tab.label}</span>
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
                        className="w-full h-full p-4 bg-background text-foreground font-mono text-sm resize-none border-none outline-none focus:ring-0 leading-relaxed"
                        placeholder={currentTab?.placeholder}
                        spellCheck={false}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                            lineHeight: 1.6,
                            tabSize: 2,
                        }}
                    />
                </AnimatePresence>

                {/* Language indicator */}
                <div className="absolute bottom-4 right-4 bg-card border border-border rounded px-2 py-1 text-xs text-muted-foreground">
                    {currentTab?.label}
                </div>
            </div>
        </div>
    );
}
