import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, FileText } from 'lucide-react';

const TableOfContents = ({ content, className = '' }) => {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Extract headings from markdown content
    useEffect(() => {
        if (!content) return;

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

    // Handle scroll-based active heading detection
    useEffect(() => {
        const handleScroll = () => {
            const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
            
            if (headingElements.length === 0) return;

            // Find the heading that's currently in view
            let activeHeading = null;
            const scrollPosition = window.scrollY + 100; // Offset for better UX

            for (let i = headingElements.length - 1; i >= 0; i--) {
                const element = headingElements[i];
                if (element.offsetTop <= scrollPosition) {
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
            const offset = 80; // Account for navbar height
            const elementPosition = element.offsetTop - offset;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    if (headings.length === 0) {
        return null;
    }

    return (
        <div className={`${className}`}>
            {/* Desktop TOC */}
            <div className="hidden lg:block">
                <div className="fixed left-6 top-1/2 -translate-y-1/2 w-64 max-h-[70vh] overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-card/80 backdrop-blur-md rounded-xl border border-border/50 p-4 shadow-lg"
                    >
                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
                            <FileText size={16} className="text-primary" />
                            <span className="font-semibold text-sm text-foreground">Table of Contents</span>
                        </div>

                        <nav className="space-y-1">
                            {headings.map((heading, index) => {
                                const isActive = activeId === heading.id;
                                const indentLevel = Math.max(0, heading.level - 1);

                                return (
                                    <motion.button
                                        key={heading.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        onClick={() => scrollToHeading(heading.id)}
                                        className={`
                                            w-full text-left p-2 rounded-lg transition-all duration-200 text-sm
                                            hover:bg-primary/10 hover:text-primary
                                            ${isActive 
                                                ? 'bg-primary/15 text-primary border-l-2 border-primary font-medium' 
                                                : 'text-muted-foreground hover:text-foreground'
                                            }
                                        `}
                                        style={{
                                            paddingLeft: `${0.5 + (indentLevel * 0.75)}rem`,
                                            fontSize: heading.level === 1 ? '0.875rem' : 
                                                     heading.level === 2 ? '0.8125rem' :
                                                     heading.level === 3 ? '0.75rem' : '0.6875rem',
                                            fontWeight: heading.level === 1 ? '600' :
                                                       heading.level === 2 ? '500' : '400'
                                        }}
                                    >
                                        <span className="line-clamp-2 leading-tight">
                                            {heading.title}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </nav>
                    </motion.div>
                </div>
            </div>

            {/* Mobile TOC - Collapsible */}
            <div className="lg:hidden fixed top-20 left-4 right-4 z-30">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-card/95 backdrop-blur-md rounded-xl border border-border/50 shadow-lg"
                >
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-xl"
                    >
                        <div className="flex items-center gap-2">
                            <FileText size={16} className="text-primary" />
                            <span className="font-semibold text-sm text-foreground">Table of Contents</span>
                        </div>
                        <ChevronRight 
                            size={16} 
                            className={`text-muted-foreground transition-transform ${
                                isCollapsed ? 'rotate-90' : 'rotate-0'
                            }`} 
                        />
                    </button>

                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <nav className="px-4 pb-4 space-y-1 max-h-64 overflow-y-auto">
                                    {headings.map((heading, index) => {
                                        const isActive = activeId === heading.id;
                                        const indentLevel = Math.max(0, heading.level - 1);

                                        return (
                                            <button
                                                key={heading.id}
                                                onClick={() => {
                                                    scrollToHeading(heading.id);
                                                    setIsCollapsed(true);
                                                }}
                                                className={`
                                                    w-full text-left p-2 rounded-lg transition-all duration-200 text-sm
                                                    hover:bg-primary/10 hover:text-primary
                                                    ${isActive 
                                                        ? 'bg-primary/15 text-primary border-l-2 border-primary font-medium' 
                                                        : 'text-muted-foreground hover:text-foreground'
                                                    }
                                                `}
                                                style={{
                                                    paddingLeft: `${0.5 + (indentLevel * 0.75)}rem`,
                                                    fontSize: heading.level === 1 ? '0.875rem' : 
                                                             heading.level === 2 ? '0.8125rem' :
                                                             heading.level === 3 ? '0.75rem' : '0.6875rem',
                                                    fontWeight: heading.level === 1 ? '600' :
                                                               heading.level === 2 ? '500' : '400'
                                                }}
                                            >
                                                <span className="line-clamp-2 leading-tight">
                                                    {heading.title}
                                                </span>
                                            </button>
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
