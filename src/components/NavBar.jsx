/**
 * NavBar Component
 * Full-width bar at top of page → compact glass dock on scroll.
 * Tooltips appear below icons in compact mode.
 */

import { cn } from '@/lib/utils'
import { X, Menu, Briefcase, User, Clock, Mail, FileDown } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DarkModeToggle } from './DarkModeToggle';

const dockItems = [
    { title: 'Work',     icon: Briefcase, href: '#projects', isRoute: 'scroll' },
    { title: 'About',   icon: User,       href: '#about',    isRoute: 'scroll' },
    { title: 'Timeline',icon: Clock,      href: '/timeline', isRoute: true },
    { title: 'Contact', icon: Mail,       href: '#footer',   isRoute: 'footer' },
    { title: 'Resume',  icon: FileDown,   href: '/files/resume.pdf', isDownload: true },
];

const mobileNavItems = [
    { name: 'Work',     href: '#projects', isRoute: 'scroll' },
    { name: 'About',    href: '#about',    isRoute: 'scroll' },
    { name: 'Timeline', href: '/timeline', isRoute: true },
    { name: 'Contact',  href: '#footer',   isRoute: 'footer' },
];

export const NavBar = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isMenuOpen, setIsMenuOpen]     = useState(false);
    const [scrolled, setScrolled]         = useState(false);
    const navigate                        = useNavigate();
    const location                        = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (item) => {
        if (item.isDownload) {
            const a = document.createElement('a');
            a.href = item.href;
            a.download = '';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            return;
        }
        const { href, isRoute } = item;
        if (isRoute === true) {
            navigate(href);
        } else if (isRoute === 'footer') {
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' }), 400);
            } else {
                document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (isRoute === 'scroll') {
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 400);
            } else {
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMenuOpen(false);
    };

    const handleMobileNav = (href, isRoute) => {
        handleNavigation({ href, isRoute });
    };

    return (
        <>
            {/* ── Desktop nav ─────────────────────────────────────── */}
            <div className={cn(
                "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
                scrolled
                    ? "pointer-events-none"
                    : "pointer-events-auto bg-background/85 backdrop-blur-xl border-b border-border/40"
            )}>
                <div className={cn(
                    "flex items-center justify-between transition-all duration-300",
                    scrolled ? "px-6 py-3" : "px-8 py-3"
                )}>

                    {/* Logo */}
                    <button
                        className="pointer-events-auto font-display text-xl font-bold tracking-tight hover:opacity-70 transition-opacity"
                        type="button"
                        onClick={() => navigate('/')}
                        aria-label="Go to home"
                    >
                        Daniel Chahine
                    </button>

                    {/* Glass dock — desktop only */}
                    <nav
                        className={cn(
                            "pointer-events-auto hidden md:flex relative items-center transition-all duration-300",
                            scrolled
                                ? "gap-0.5 px-3 py-2.5 rounded-2xl glass-border bg-background/80 backdrop-blur-xl shadow-2xl"
                                : "gap-1"
                        )}
                        aria-label="Main Navigation"
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {dockItems.map((item, index) => {
                            const Icon = item.icon;
                            const isHovered = hoveredIndex === index;

                            return (
                                <div
                                    key={item.title}
                                    className="relative flex items-center justify-center"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                >
                                    {/* Tooltip — compact mode only, appears below icon */}
                                    <AnimatePresence>
                                        {scrolled && isHovered && (
                                            <motion.div
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 pointer-events-none z-50 px-3 py-1.5 rounded-lg"
                                                style={{
                                                    background: 'var(--foreground)',
                                                    color: 'var(--background)',
                                                    fontSize: '12px',
                                                    fontWeight: 500,
                                                    whiteSpace: 'nowrap',
                                                    letterSpacing: '0.025em',
                                                    fontFamily: "'Outfit', sans-serif",
                                                }}
                                                initial={{ opacity: 0, y: -6, scale: 0.88 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -6, scale: 0.88 }}
                                                transition={{ duration: 0.13, ease: 'easeOut' }}
                                            >
                                                {item.title}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Icon button */}
                                    <motion.button
                                        type="button"
                                        onClick={() => handleNavigation(item)}
                                        aria-label={item.title}
                                        className={cn(
                                            "relative flex items-center cursor-pointer rounded-xl transition-all duration-300",
                                            scrolled
                                                ? "w-10 h-10 justify-center"
                                                : "h-9 px-2 gap-1.5"
                                        )}
                                        animate={{
                                            scale: isHovered ? (scrolled ? 1.15 : 1.05) : 1,
                                            y: scrolled && isHovered ? -3 : 0,
                                        }}
                                        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {/* Hover bg */}
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.span
                                                    className="absolute inset-0 rounded-xl"
                                                    style={{ background: 'rgba(var(--accent-color-rgb), 0.09)' }}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.15 }}
                                                />
                                            )}
                                        </AnimatePresence>

                                        <Icon
                                            size={18}
                                            strokeWidth={1.75}
                                            style={{
                                                color: isHovered ? 'var(--foreground)' : 'var(--muted-foreground)',
                                                transition: 'color 0.18s ease',
                                                position: 'relative',
                                                flexShrink: 0,
                                            }}
                                        />

                                        {/* Label — visible in expanded (top) mode only */}
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                maxWidth: scrolled ? '0px' : '120px',
                                                opacity: scrolled ? 0 : 1,
                                                overflow: 'hidden',
                                                transition: 'max-width 0.3s ease, opacity 0.25s ease',
                                                whiteSpace: 'nowrap',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                fontFamily: "'Outfit', sans-serif",
                                                color: isHovered ? 'var(--foreground)' : 'var(--muted-foreground)',
                                                position: 'relative',
                                            }}
                                            aria-hidden={scrolled}
                                        >
                                            {item.title}
                                        </span>
                                    </motion.button>
                                </div>
                            );
                        })}

                        {/* Divider — compact mode only */}
                        <div
                            className="h-5 flex-shrink-0 rounded-full transition-all duration-300"
                            style={{
                                width: scrolled ? '1px' : '0px',
                                marginLeft: scrolled ? '6px' : '0px',
                                marginRight: scrolled ? '6px' : '0px',
                                opacity: scrolled ? 1 : 0,
                                background: 'var(--border)',
                            }}
                            aria-hidden="true"
                        />

                        {/* Dark mode toggle */}
                        <div className={cn(
                            "flex items-center justify-center transition-all duration-300",
                            scrolled ? "w-10 h-10" : "h-9 w-9"
                        )}>
                            <DarkModeToggle />
                        </div>
                    </nav>

                    {/* Mobile hamburger */}
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="pointer-events-auto md:hidden p-2 text-foreground hover:opacity-70 transition-opacity"
                        aria-expanded={isMenuOpen}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* ── Mobile menu overlay ────────────────────────────── */}
            <div className={cn(
                "fixed inset-0 bg-background z-40 flex flex-col md:hidden transition-all duration-300",
                isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <div className="flex justify-between items-center h-16 px-6 border-b border-border">
                    <span className="font-display text-xl font-bold">Daniel Chahine</span>
                    <div className="flex items-center gap-3">
                        <DarkModeToggle />
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 text-foreground hover:opacity-70 transition-opacity"
                            aria-label="Close menu"
                        >
                            <X size={22} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col p-8 gap-8">
                    {mobileNavItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleMobileNav(item.href, item.isRoute)}
                            className="font-display text-3xl font-semibold text-foreground hover:opacity-60 transition-opacity text-left"
                            type="button"
                        >
                            {item.name}
                        </button>
                    ))}
                    <a
                        href="/files/resume.pdf"
                        download
                        className="font-display text-3xl font-semibold text-foreground hover:opacity-60 transition-opacity"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Resume
                    </a>

                    <div
                        className="mt-auto h-[2px] w-16"
                        style={{ background: 'var(--accent-color)' }}
                        aria-hidden="true"
                    />
                </div>
            </div>
        </>
    );
}
