/**
 * Footer.jsx
 * Elegant footer with large display CTA and glass dock social links.
 */
import { useState } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export const Footer = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const socials = [
        { Icon: FiGithub,    href: "https://github.com/DanielChahine0",           label: "GitHub" },
        { Icon: FiLinkedin,  href: "https://www.linkedin.com/in/danielchahine",   label: "LinkedIn" },
        { Icon: FiInstagram, href: "http://instagram.com/dxni.ch",                label: "Instagram" },
        { Icon: FiMail,      href: "mailto:chahinedaniel0@gmail.com",             label: "Email" },
    ];

    return (
        <footer id="footer" className="relative pt-24 pb-10 px-6 border-t border-border overflow-hidden">
            {/* Background watermark */}
            <div
                className="font-display absolute bottom-0 right-0 text-[18vw] font-bold leading-none tracking-tighter text-foreground pointer-events-none select-none translate-x-[5%] translate-y-[20%]"
                style={{ opacity: 0.025 }}
                aria-hidden="true"
            >
                DC
            </div>

            <div className="container mx-auto max-w-6xl relative">
                {/* Main CTA */}
                <div className="mb-16">
                    <p className="section-label mb-6">Let's Connect</p>

                    <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-8 max-w-3xl">
                        Have a project in mind?
                        <br />
                        <span style={{ color: "var(--accent-color)" }}>Let's talk.</span>
                    </h2>

                    <p className="text-muted-foreground mb-8 max-w-md font-light leading-relaxed">
                        I'm always open to discussing new projects, creative ideas,
                        or opportunities to collaborate.
                    </p>

                    <a
                        href="mailto:chahinedaniel0@gmail.com"
                        className="btn-primary inline-flex"
                    >
                        <FiMail size={16} />
                        chahinedaniel0@gmail.com
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                    </a>
                </div>

                {/* Divider */}
                <div className="border-t border-border pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Copyright */}
                        <div className="flex items-center gap-3">
                            <span className="font-display text-lg font-bold">Daniel Chahine</span>
                            <span className="text-border">·</span>
                            <p className="font-code text-xs text-muted-foreground">
                                © {new Date().getFullYear()}
                            </p>
                        </div>

                        {/* Social Links — glass dock */}
                        <nav
                            className="relative flex gap-0.5 items-center px-3 py-2.5 rounded-2xl glass-border bg-background/80 backdrop-blur-xl shadow-2xl"
                            onMouseLeave={() => setHoveredIndex(null)}
                            aria-label="Social Links"
                        >
                            {socials.map((social, index) => {
                                const { Icon, href, label } = social;
                                const isHovered = hoveredIndex === index;
                                return (
                                    <div
                                        key={label}
                                        className="relative flex items-center justify-center"
                                        onMouseEnter={() => setHoveredIndex(index)}
                                    >
                                        {/* Tooltip — appears above */}
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
                                                    initial={{ opacity: 0, y: 6, scale: 0.88 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 6, scale: 0.88 }}
                                                    transition={{ duration: 0.13, ease: 'easeOut' }}
                                                >
                                                    {label}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <motion.a
                                            href={href}
                                            target={href.startsWith("http") ? "_blank" : undefined}
                                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                            aria-label={label}
                                            className="relative w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer"
                                            animate={{
                                                scale: isHovered ? 1.15 : 1,
                                                y: isHovered ? -3 : 0,
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
                                                style={{
                                                    color: isHovered ? 'var(--foreground)' : 'var(--muted-foreground)',
                                                    transition: 'color 0.18s ease',
                                                    position: 'relative',
                                                    flexShrink: 0,
                                                }}
                                            />
                                        </motion.a>
                                    </div>
                                );
                            })}
                        </nav>

                        {/* Back to Top */}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Back to top"
                        >
                            <span className="font-code text-[10px] tracking-widest uppercase">Top</span>
                            <div
                                className="p-1.5 border border-border rounded group-hover:border-foreground transition-colors"
                            >
                                <ArrowUp size={14} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
