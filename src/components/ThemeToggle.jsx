/**
 * ThemeToggle.jsx
 * Small UI control that opens a theme picker for background themes and
 * accent colors. Persists choices to localStorage and applies CSS classes
 * to the document element.
 * Exports: ThemeToggle (React component)
 */
import { Palette } from "lucide-react";
import { useEffect, useState, useRef } from 'react';
import { cn } from "@/lib/utils";

const BACKGROUND_THEMES = [
    { name: 'Matcha', value: 'matcha', color: '#F1EBE1' },
    { name: 'Slate', value: 'dark-gray', color: '#464646' },
    { name: 'Pure', value: 'light', color: '#FFFFFF' },
    { name: 'Midnight', value: 'dark', color: '#0D1117' },
    { name: 'Ocean', value: 'ocean', color: '#1e3a5f' }
];

const ACCENT_COLORS = [
    { name: 'Red', value: 'red', color: '#ef4444' },
    { name: 'Rose', value: 'rose', color: '#f43f5e' },
    { name: 'Pink', value: 'pink', color: '#ec4899' },
    { name: 'Purple', value: 'purple', color: '#a855f7' },
    { name: 'Indigo', value: 'indigo', color: '#6366f1' },
    { name: 'Blue', value: 'blue', color: '#3b82f6' },
    { name: 'Teal', value: 'teal', color: '#14b8a6' },
    { name: 'Emerald', value: 'emerald', color: '#10b981' },
    { name: 'Green', value: 'green', color: '#22c55e' },
    { name: 'Gold', value: 'gold', color: '#ffd700' },
    { name: 'Yellow', value: 'yellow', color: '#eab308' },
    { name: 'Orange', value: 'orange', color: '#f97316' }
];

export const ThemeToggle = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBackground, setSelectedBackground] = useState('matcha');
    const [selectedAccent, setSelectedAccent] = useState('blue');
    const dropdownRef = useRef(null);
    const hoverTimeoutRef = useRef(null);

    useEffect(() => {
        // Load saved theme preferences or detect system preference
        const savedBackground = localStorage.getItem("theme-background");
        const savedAccent = localStorage.getItem("theme-accent") || 'blue';
        
        let background = savedBackground;
        
        // If no saved preference, detect system preference
        if (!savedBackground) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            background = prefersDark ? 'dark' : 'light';
        }
        
        setSelectedBackground(background);
        setSelectedAccent(savedAccent);
        applyTheme(background, savedAccent);
    }, []);

    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 100); // Small delay to prevent flickering when moving between elements
    };

    const applyTheme = (background, accent) => {
        // Remove all theme classes
        document.documentElement.classList.remove('dark', 'dark-gray', 'matcha', 'light', 'ocean');
        document.documentElement.classList.remove('accent-green', 'accent-blue', 'accent-red', 'accent-yellow', 'accent-orange', 'accent-purple', 'accent-pink', 'accent-indigo', 'accent-teal', 'accent-emerald', 'accent-rose', 'accent-gold');
        
        // Add selected theme classes
        if (background !== 'light') {
            document.documentElement.classList.add(background);
        }
        document.documentElement.classList.add(`accent-${accent}`);
    };

    const handleBackgroundSelect = (background) => {
        setSelectedBackground(background);
        localStorage.setItem("theme-background", background);
        applyTheme(background, selectedAccent);
    };

    const handleAccentSelect = (accent) => {
        setSelectedAccent(accent);
        localStorage.setItem("theme-accent", accent);
        applyTheme(selectedBackground, accent);
    };

    const getCurrentAccentColor = () => {
        return ACCENT_COLORS.find(color => color.value === selectedAccent)?.color || '#3b82f6';
    };

    const getCurrentAccentRgb = () => {
        const color = getCurrentAccentColor();
        const rgb = hexToRgb(color);
        return rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : '59, 130, 246';
    };

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    return (
        <div 
            className="relative" 
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button 
                className={cn(
                    "p-2 rounded-full transition-all duration-300 flex items-center gap-1",
                    "focus:outline-none hover:bg-primary/10"
                )}
                aria-label="Open theme picker"
            > 
                <Palette className="h-6 w-6" />
            </button>

            {/* Theme Picker Dropdown */}
            <div className={cn(
                "absolute top-full right-0 mt-2 w-100 max-w-[calc(100vw-2rem)]",
                "bg-card/95 backdrop-blur-xl border border-border/30",
                "rounded-lg shadow-xl transition-all duration-150 ease-out",
                "transform origin-top-right z-[100]",
                "md:right-0 right-4", // Responsive positioning
                isOpen 
                    ? "opacity-100 scale-100 translate-y-0" 
                    : "opacity-0 scale-30 translate-y-2 pointer-events-none",
                // Ensure dropdown stays within viewport
                "max-h-[80vh] overflow-y-auto"
            )}>
                <div className="p-4">
                    {/* Background Selection */}
                    <div className="mb-4">
                        <div className="flex bg-muted/30 rounded-md p-1 border border-border/20">
                            {BACKGROUND_THEMES.map((theme) => (
                                <button
                                    key={theme.value}
                                    onClick={() => handleBackgroundSelect(theme.value)}
                                    className={cn(
                                        "flex-1 px-1.5 py-2 text-xs font-medium rounded-sm transition-all duration-200",
                                        "tracking-wide relative",
                                        selectedBackground === theme.value
                                            ? "text-foreground shadow-sm"
                                            : "text-foreground/70 hover:text-foreground/90 hover:bg-muted/20"
                                    )}
                                    style={{
                                        backgroundColor: selectedBackground === theme.value 
                                            ? `rgba(${getCurrentAccentRgb()}, 0.08)` 
                                            : 'transparent',
                                        outline: selectedBackground === theme.value 
                                            ? `2px solid ${getCurrentAccentColor()}` 
                                            : 'none',
                                        outlineOffset: selectedBackground === theme.value ? '2px' : '0'
                                    }}
                                >
                                    {theme.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Accent Color Selection */}
                    <div>
                        {/* First row - 6 colors */}
                        <div className="flex gap-2 justify-center mb-2">
                            {ACCENT_COLORS.slice(0, 6).map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => handleAccentSelect(color.value)}
                                    className={cn(
                                        "w-10 h-10 rounded-md transition-all duration-200",
                                        "hover:scale-101 focus:outline-none focus:scale-105",
                                        "border border-border/20"
                                    )}
                                    style={{
                                        backgroundColor: color.color,
                                        outline: selectedAccent === color.value 
                                            ? `2px solid ${color.color}` 
                                            : 'none',
                                        outlineOffset: selectedAccent === color.value ? '2px' : '0',
                                        boxShadow: selectedAccent === color.value 
                                            ? `0 0 0 4px rgba(${(() => {
                                                const rgb = hexToRgb(color.color);
                                                return rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : '59, 130, 246';
                                            })()}, 0.1)`
                                            : 'none'
                                    }}
                                    title={color.name}
                                    aria-label={`Select ${color.name} accent color`}
                                />
                            ))}
                        </div>
                        
                        {/* Second row - 6 colors */}
                        <div className="flex gap-2 justify-center">
                            {ACCENT_COLORS.slice(6, 12).map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => handleAccentSelect(color.value)}
                                    className={cn(
                                        "w-10 h-10 rounded-md transition-all duration-200",
                                        "hover:scale-101 focus:outline-none focus:scale-105",
                                        "border border-border/20"
                                    )}
                                    style={{
                                        backgroundColor: color.color,
                                        outline: selectedAccent === color.value 
                                            ? `2px solid ${color.color}` 
                                            : 'none',
                                        outlineOffset: selectedAccent === color.value ? '2px' : '0',
                                        boxShadow: selectedAccent === color.value 
                                            ? `0 0 0 4px rgba(${(() => {
                                                const rgb = hexToRgb(color.color);
                                                return rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : '59, 130, 246';
                                            })()}, 0.1)`
                                            : 'none'
                                    }}
                                    title={color.name}
                                    aria-label={`Select ${color.name} accent color`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}