/**
 * TableOfContents.jsx
 * Generates a Table of Contents from markdown content. Provides a
 * desktop sticky TOC with reading progress and a mobile collapsible
 * version. Exports: default TableOfContents component.
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronUp, ChevronDown, Hash } from 'lucide-react';

const TableOfContents = ({ content, className = '' }) => {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);

    // Extract headings from markdown content
    useEffect(() => {
        if (!content) return;

        // Regex captures markdown headings like '# Heading' up to '###### Heading'
        // Group 1: leading hashes (used for level), Group 2: heading text
        const headingRegex = /^(#{1,6})\s+(.+)$/gm;
        const extractedHeadings = [];
        let match;

        while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1].length;
            const title = match[2].trim();
            const id = title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');

            extractedHeadings.push({
                id,
                title,
                level,
            });
        }

        setHeadings(extractedHeadings);
    }, [content]);

    // Handle scroll-based active heading detection and reading progress
    useEffect(() => {
        const handleScroll = () => {
            const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
            
            // Calculate reading progress
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min((scrollTop / docHeight) * 100, 100);
            setReadingProgress(progress);
            
            if (headingElements.length === 0) return;

            // Find the heading that's currently in view
            let activeHeading = null;
            const scrollPosition = window.scrollY + 120; // Offset for better UX

            for (let i = headingElements.length - 1; i >= 0; i--) {
                const element = headingElements[i];
                if (element && element.offsetTop <= scrollPosition) {
                    activeHeading = element.id;
                    break;
                }
            }

            if (activeHeading !== activeId) {
                setActiveId(activeHeading || '');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [headings, activeId]);

    const scrollToHeading = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Account for navbar height
            const elementPosition = element.offsetTop - offset;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    const getHeadingIcon = (level) => {
        if (level <= 2) return <Hash size={12} className="text-primary/60 flex-shrink-0" />;
        return <div className="w-2 h-2 rounded-full bg-primary/40 flex-shrink-0" />;
    };

    if (headings.length === 0) {
        return null;
    }

    return (
        <div className={`${className}`}>
            {/* Desktop TOC */}
            <div className="hidden lg:block">
                <div className="fixed left-8 top-1/2 -translate-y-1/2 w-72 max-h-[75vh] z-40">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                        className="bg-card/90 backdrop-blur-xl rounded-2xl border border-border/40 shadow-2xl shadow-black/10 overflow-hidden"
                    >
                        {/* Header with progress bar */}
                        <div className="px-6 py-4 border-b border-border/30 bg-card/50">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-1.5 rounded-lg bg-primary/10">
                                    <FileText size={16} className="text-primary" />
                                </div>
                                <div>
                                    <span className="font-semibold text-sm text-foreground">Table of Contents</span>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {headings.length} sections
                                    </p>
                                </div>
                            </div>
                            
                            {/* Reading progress bar */}
                            <div className="relative h-1.5 bg-muted/50 rounded-full overflow-hidden">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-primary rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${readingProgress}%` }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-muted-foreground">Progress</span>
                                <span className="text-xs text-primary font-medium">
                                    {Math.round(readingProgress)}%
                                </span>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="p-3 max-h-96 overflow-y-auto toc-scroll">
                            <nav className="space-y-1">
                                {headings.map((heading, index) => {
                                    const isActive = activeId === heading.id;
                                    const indentLevel = Math.max(0, heading.level - 1);

                                    return (
                                        <motion.button
                                            key={heading.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index, duration: 0.3 }}
                                            onClick={() => scrollToHeading(heading.id)}
                                            className={`
                                                group w-full text-left px-3 py-2.5 rounded-xl transition-all duration-300 text-sm
                                                hover:bg-primary/8 hover:text-primary hover:shadow-sm
                                                ${isActive 
                                                    ? 'bg-primary/12 text-primary shadow-sm ring-1 ring-primary/20 font-medium' 
                                                    : 'text-muted-foreground hover:text-foreground'
                                                }
                                            `}
                                            style={{
                                                paddingLeft: `${0.75 + (indentLevel * 0.8)}rem`,
                                                fontSize: heading.level === 1 ? '0.875rem' : 
                                                         heading.level === 2 ? '0.8125rem' :
                                                         heading.level === 3 ? '0.75rem' : '0.6875rem',
                                                fontWeight: heading.level === 1 ? '600' :
                                                           heading.level === 2 ? '500' : '400'
                                            }}
                                        >
                                            <div className="flex items-start gap-2">
                                                {getHeadingIcon(heading.level)}
                                                <span className="line-clamp-2 leading-snug group-hover:line-clamp-none">
                                                    {heading.title}
                                                </span>
                                            </div>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeIndicator"
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </nav>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile TOC - Collapsible */}
            <div className="lg:hidden fixed top-20 left-4 right-4 z-40">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                    className="bg-card/95 backdrop-blur-xl rounded-2xl border border-border/40 shadow-2xl shadow-black/10 overflow-hidden"
                >
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-all duration-200 group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                                <FileText size={16} className="text-primary" />
                            </div>
                            <div className="text-left">
                                <span className="font-semibold text-sm text-foreground block">Table of Contents</span>
                                <span className="text-xs text-muted-foreground">
                                    {headings.length} sections • {Math.round(readingProgress)}% read
                                </span>
                            </div>
                        </div>
                        <motion.div
                            animate={{ rotate: isCollapsed ? 0 : 180 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="p-1 rounded-lg hover:bg-primary/10 transition-colors"
                        >
                            <ChevronUp size={16} className="text-muted-foreground group-hover:text-primary" />
                        </motion.div>
                    </button>

                    {/* Progress bar for mobile */}
                    <div className="px-5 pb-3">
                        <div className="relative h-1.5 bg-muted/50 rounded-full overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-primary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${readingProgress}%` }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </div>
                    </div>

                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden border-t border-border/30"
                            >
                                <nav className="px-4 py-4 space-y-1 max-h-80 overflow-y-auto toc-scroll">
                                    {headings.map((heading, index) => {
                                        const isActive = activeId === heading.id;
                                        const indentLevel = Math.max(0, heading.level - 1);

                                        return (
                                            <motion.button
                                                key={heading.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.05 * index, duration: 0.2 }}
                                                onClick={() => {
                                                    scrollToHeading(heading.id);
                                                    setIsCollapsed(true);
                                                }}
                                                className={`
                                                    group w-full text-left px-3 py-2.5 rounded-xl transition-all duration-300 text-sm
                                                    hover:bg-primary/8 hover:text-primary hover:shadow-sm
                                                    ${isActive 
                                                        ? 'bg-primary/12 text-primary shadow-sm ring-1 ring-primary/20 font-medium' 
                                                        : 'text-muted-foreground hover:text-foreground'
                                                    }
                                                `}
                                                style={{
                                                    paddingLeft: `${0.75 + (indentLevel * 0.8)}rem`,
                                                    fontSize: heading.level === 1 ? '0.875rem' : 
                                                             heading.level === 2 ? '0.8125rem' :
                                                             heading.level === 3 ? '0.75rem' : '0.6875rem',
                                                    fontWeight: heading.level === 1 ? '600' :
                                                               heading.level === 2 ? '500' : '400'
                                                }}
                                            >
                                                <div className="flex items-start gap-2">
                                                    {getHeadingIcon(heading.level)}
                                                    <span className="line-clamp-2 leading-snug">
                                                        {heading.title}
                                                    </span>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default TableOfContents;
