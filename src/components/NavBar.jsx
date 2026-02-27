/**
 * NavBar Component
 * Refined navigation with display font logo, accent underlines,
 * and a clean mobile overlay.
 */

import { cn } from '@/lib/utils'
import { X, Menu } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { DarkModeToggle } from './DarkModeToggle';

const navItems = [
    { name: 'Work',     href: '#projects', isRoute: 'scroll' },
    { name: 'About',    href: '#about',    isRoute: 'scroll' },
    { name: 'Timeline', href: '/timeline', isRoute: true },
    { name: 'Contact',  href: '#footer',   isRoute: 'footer' },
]

export const NavBar = () => {
    const [isScrolled, setIsScrolled]   = useState(false);
    const [isMenuOpen, setIsMenuOpen]   = useState(false);
    const navigate                       = useNavigate();
    const location                       = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (href, isRoute = false) => {
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

    return (
        <nav
            className={cn(
                "fixed w-full z-40 transition-all duration-400",
                isScrolled
                    ? "bg-background/90 backdrop-blur-md border-b border-border"
                    : "bg-transparent"
            )}
            role="navigation"
            aria-label="Main Navigation"
        >
            {/* Accent top-line when scrolled */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                style={{
                    background: "var(--accent-color)",
                    opacity: isScrolled ? 1 : 0,
                }}
                aria-hidden="true"
            />

            <div className="container mx-auto flex items-center justify-between h-16 px-6">
                {/* Logo */}
                <button
                    className="font-display text-xl font-bold tracking-tight hover:opacity-70 transition-opacity"
                    type="button"
                    onClick={() => handleNavigation('/', true)}
                    aria-label="Go to home"
                >
                    Daniel Chahine
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleNavigation(item.href, item.isRoute)}
                            className="group relative text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                            type="button"
                        >
                            {item.name}
                            <span
                                className="absolute bottom-0 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300"
                                style={{ background: "var(--accent-color)" }}
                                aria-hidden="true"
                            />
                        </button>
                    ))}
                    <div className="flex items-center gap-3">
                        <DarkModeToggle />
                        <a
                            href="/files/resume.pdf"
                            download
                            className="btn-primary !py-2 !px-4 text-xs"
                        >
                            Resume
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-foreground hover:opacity-70 transition-opacity"
                    aria-expanded={isMenuOpen}
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                >
                    {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
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
                            aria-label="Close Menu"
                        >
                            <X size={22} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col p-8 gap-8">
                    {navItems.map((item, i) => (
                        <button
                            key={item.name}
                            onClick={() => handleNavigation(item.href, item.isRoute)}
                            className="font-display text-3xl font-semibold text-foreground hover:opacity-60 transition-opacity text-left"
                            type="button"
                            style={{ animationDelay: `${i * 0.05}s` }}
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

                    {/* Accent line at bottom */}
                    <div
                        className="mt-auto h-[2px] w-16"
                        style={{ background: "var(--accent-color)" }}
                        aria-hidden="true"
                    />
                </div>
            </div>
        </nav>
    );
}
