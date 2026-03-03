/**
 * NavBar Component
 * Glass dock navigation — macOS-inspired floating pill with
 * icon-based items, spring-scale hover, and animated tooltips.
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
    const navigate                        = useNavigate();
    const location                        = useLocation();

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
            {/* ── Desktop glass dock ─────────────────────────────── */}
            <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
                <div className="flex items-start justify-between px-6 pt-5">

                    {/* Logo */}
                    <button
                        className="pointer-events-auto font-display text-xl font-bold tracking-tight hover:opacity-70 transition-opacity pt-1"
                        type="button"
                        onClick={() => navigate('/')}
                        aria-label="Go to home"
                    >
                        Daniel Chahine
                    </button>

                    {/* Glass dock — desktop only */}
                    <nav
                        className="pointer-events-auto hidden md:flex relative items-center gap-0.5 px-3 py-2.5 rounded-2xl glass-border bg-background/80 backdrop-blur-xl shadow-2xl"
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
                                    {/* Tooltip */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none z-50 px-3 py-1.5 rounded-lg"
                                                style={{
                                                    background: 'var(--foreground)',
                                                    color: 'var(--background)',
                                                    fontSize: '12px',
                                                    fontWeight: 500,
                                                    whiteSpace: 'nowrap',
                                                    letterSpacing: '0.025em',
                                                    fontFamily: "'Outfit', sans-serif",
                                                }}
                                                initial={{ opacity: 0, y: 8, scale: 0.88 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.88 }}
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
                                        className="relative w-10 h-10 flex items-center justify-center cursor-pointer rounded-xl"
                                        animate={{
                                            scale: isHovered ? 1.15 : 1,
                                            y: isHovered ? -3 : 0,
                                        }}
                                        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {/* Subtle hover bg */}
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
                                            size={19}
                                            strokeWidth={1.75}
                                            style={{
                                                color: isHovered ? 'var(--foreground)' : 'var(--muted-foreground)',
                                                transition: 'color 0.18s ease',
                                                position: 'relative',
                                            }}
                                        />
                                    </motion.button>
                                </div>
                            );
                        })}

                        {/* Divider */}
                        <div
                            className="w-px h-5 mx-1.5 flex-shrink-0 rounded-full"
                            style={{ background: 'var(--border)' }}
                            aria-hidden="true"
                        />

                        {/* Dark mode toggle */}
                        <div className="w-10 h-10 flex items-center justify-center">
                            <DarkModeToggle />
                        </div>
                    </nav>

                    {/* Mobile hamburger */}
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="pointer-events-auto md:hidden p-2 text-foreground hover:opacity-70 transition-opacity mt-1"
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
