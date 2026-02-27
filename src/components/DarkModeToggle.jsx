/**
 * DarkModeToggle.jsx
 * Animated dark/light mode toggle. Integrates with the html class-based
 * theme system (class="dark" on <html> = dark mode).
 * Preserves the previous light theme when toggling back.
 * Exports: DarkModeToggle (React component)
 */
import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Sync with current html class
        setIsDark(document.documentElement.classList.contains('dark'));

        // Stay in sync if ThemeToggle or another source changes the theme
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => observer.disconnect();
    }, []);

    const toggle = () => {
        const html = document.documentElement;

        if (isDark) {
            // Restore the last light theme (default: matcha)
            const prev = localStorage.getItem('prev-light-theme') || 'matcha';
            html.classList.remove('dark', 'dark-gray', 'matcha', 'ocean');
            if (prev !== 'light') html.classList.add(prev);
            localStorage.setItem('theme-background', prev);
        } else {
            // Save current light theme, then go dark
            const current = localStorage.getItem('theme-background') || 'matcha';
            if (current !== 'dark') localStorage.setItem('prev-light-theme', current);
            html.classList.remove('dark-gray', 'matcha', 'ocean');
            html.classList.add('dark');
            localStorage.setItem('theme-background', 'dark');
        }
    };

    return (
        <motion.button
            type="button"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            title={isDark ? 'Light mode' : 'Dark mode'}
            className="relative flex items-center justify-center overflow-hidden"
            style={{
                width: 32,
                height: 32,
                borderRadius: 4,
                border: '1px solid',
                borderColor: isDark
                    ? 'rgba(var(--accent-color-rgb), 0.35)'
                    : 'var(--border)',
                background: isDark
                    ? 'rgba(var(--accent-color-rgb), 0.07)'
                    : 'transparent',
                color: isDark ? 'var(--accent-color)' : 'var(--muted-foreground)',
                transition: 'border-color 0.25s ease, background 0.25s ease, color 0.25s ease',
                flexShrink: 0,
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        >
            {/* Expanding ring pulse on each toggle */}
            <AnimatePresence>
                <motion.span
                    key={`ring-${isDark}`}
                    initial={{ scale: 0.6, opacity: 0.5 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 4,
                        border: '1px solid var(--accent-color)',
                        pointerEvents: 'none',
                    }}
                />
            </AnimatePresence>

            {/* Sun ↔ Moon morph */}
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ opacity: 0, rotate: -70, scale: 0.4 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 70, scale: 0.4 }}
                    transition={{ duration: 0.14, ease: [0.4, 0, 0.2, 1] }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    aria-hidden="true"
                >
                    {isDark
                        ? <Moon size={15} strokeWidth={1.75} />
                        : <Sun size={15} strokeWidth={1.75} />
                    }
                </motion.span>
            </AnimatePresence>
        </motion.button>
    );
};
