/**
 * NavBar Component
 * A clean, minimal navigation bar with:
 * - Navigation links to different sections/pages
 * - Mobile menu support
 * - Scroll-based styling
 */

import { cn } from '@/lib/utils'
import { X, Menu } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const navItems = [
    { name: 'Work', href: '#projects', isRoute: 'scroll' },
    { name: 'About', href: '#about', isRoute: 'scroll' },
    { name: 'Timeline', href: '/timeline', isRoute: true },
    { name: 'Tools', href: '/tools', isRoute: true },
    { name: 'Contact', href: '#footer', isRoute: 'footer' },
]

export const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (href, isRoute = false) => {
        if (isRoute === true) {
            navigate(href);
        } else if (isRoute === 'footer') {
            const el = document.querySelector('footer');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else if (isRoute === 'scroll') {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <nav
            className={cn(
                "fixed w-full z-40 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-border"
                    : "bg-transparent"
            )}
            role="navigation"
            aria-label="Main Navigation"
        >
            <div className="container mx-auto flex items-center justify-between h-16 px-6">
                {/* Logo */}
                <button
                    className="text-lg font-semibold tracking-tight hover:opacity-70 transition-opacity"
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
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            type="button"
                        >
                            {item.name}
                        </button>
                    ))}
                    <a
                        href="/files/resume.pdf"
                        download
                        className="text-sm font-medium px-4 py-2 bg-foreground text-background rounded-md hover:opacity-80 transition-opacity"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-foreground hover:opacity-70 transition-opacity"
                    aria-expanded={isMenuOpen}
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 bg-background z-40 flex flex-col md:hidden transition-all duration-300",
                isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <div className="flex justify-between items-center h-16 px-6 border-b border-border">
                    <span className="text-lg font-semibold">Daniel Chahine</span>
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 text-foreground hover:opacity-70 transition-opacity"
                        aria-label="Close Menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col p-6 gap-6">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleNavigation(item.href, item.isRoute)}
                            className="text-2xl font-light text-foreground hover:opacity-70 transition-opacity text-left"
                            type="button"
                        >
                            {item.name}
                        </button>
                    ))}
                    <a
                        href="/files/resume.pdf"
                        download
                        className="text-2xl font-light text-foreground hover:opacity-70 transition-opacity"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Resume
                    </a>
                </div>
            </div>
        </nav>
    );
}
