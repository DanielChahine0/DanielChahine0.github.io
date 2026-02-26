/**
 * HeroSection Component
 * Typographic editorial hero with Cormorant Garamond display font,
 * framer-motion entrance animations, and accent-color photo brackets.
 */

import { useCallback } from "react";
import { Download } from "lucide-react";
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

const fadeUp = (delay = 0, duration = 0.75) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, delay },
});

export const HeroSection = () => {
    const socials = [
        { icon: <FiGithub size={18} />, name: "GitHub", link: "https://github.com/DanielChahine0" },
        { icon: <FiLinkedin size={18} />, name: "LinkedIn", link: "https://linkedin.com/in/DanielChahine" },
        { icon: <FiInstagram size={18} />, name: "Instagram", link: "https://instagram.com/dxni.ch" },
        { icon: <FiMail size={18} />, name: "Email", link: "mailto:Chahinedaniel0@gmail.com" },
    ];

    const scrollToProjects = useCallback(() => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <section
            id="hero"
            className="min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden"
        >
            {/* Background watermark */}
            <div
                className="absolute inset-0 pointer-events-none overflow-hidden select-none"
                aria-hidden="true"
            >
                <span
                    className="font-display absolute bottom-0 right-0 text-[22vw] font-bold leading-none tracking-tighter text-foreground opacity-[0.025] translate-x-[8%] translate-y-[10%]"
                >
                    DC
                </span>
            </div>

            {/* Vertical accent line — desktop only */}
            <div
                className="absolute left-6 top-1/4 bottom-1/4 w-px hidden xl:block opacity-30"
                style={{ background: "var(--accent-color)" }}
                aria-hidden="true"
            />

            <div className="container mx-auto px-6 relative">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">

                        {/* ── Text Content (3 cols) ── */}
                        <div className="lg:col-span-3 order-2 lg:order-1 space-y-8">

                            {/* Role label */}
                            <motion.div {...fadeIn(0.1)}>
                                <span className="section-label">
                                    Software Engineer
                                </span>
                            </motion.div>

                            {/* Name */}
                            <div className="space-y-0">
                                <motion.p
                                    {...fadeUp(0.18)}
                                    className="font-display text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-light leading-[0.92] tracking-tight text-foreground"
                                >
                                    Daniel
                                </motion.p>
                                <motion.p
                                    {...fadeUp(0.28)}
                                    className="font-display text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold leading-[0.92] tracking-tight"
                                    style={{ color: "var(--accent-color)" }}
                                >
                                    Chahine
                                </motion.p>
                            </div>

                            {/* Description */}
                            <motion.div {...fadeUp(0.4)} className="space-y-3 max-w-md">
                                <p className="text-muted-foreground leading-relaxed text-[1.05rem] font-light">
                                    CS student at York University with 6+ years of coding experience.
                                    Building modern web apps and turning innovative ideas into working software.
                                </p>
                                <p className="text-muted-foreground leading-relaxed text-[1.05rem] font-light">
                                    Focused on full-stack development, machine learning, and creating
                                    tools that solve real problems.
                                </p>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div {...fadeUp(0.52)} className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={scrollToProjects}
                                    className="btn-primary"
                                    aria-label="View my work"
                                >
                                    View My Work
                                </button>
                                <a
                                    href="/files/resume.pdf"
                                    download
                                    className="btn-secondary"
                                >
                                    <Download className="w-4 h-4" />
                                    Download Resume
                                </a>
                            </motion.div>

                            {/* Social Links */}
                            <motion.div {...fadeUp(0.62)} className="flex gap-3 pt-1">
                                {socials.map((social, i) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.link}
                                        target={social.link.startsWith("http") ? "_blank" : undefined}
                                        rel={social.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="p-2.5 border border-border rounded-lg text-muted-foreground transition-all duration-200"
                                        aria-label={social.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.62 + i * 0.06, duration: 0.4 }}
                                        whileHover={{
                                            scale: 1.1,
                                            borderColor: "var(--accent-color)",
                                            color: "var(--accent-color)",
                                        }}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </motion.div>
                        </div>

                        {/* ── Photo (2 cols) ── */}
                        <motion.div
                            className="lg:col-span-2 order-1 lg:order-2 flex justify-center lg:justify-end"
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <div className="relative">
                                {/* Corner accent brackets */}
                                <div
                                    className="absolute -top-2.5 -left-2.5 w-7 h-7 border-t-2 border-l-2"
                                    style={{ borderColor: "var(--accent-color)" }}
                                    aria-hidden="true"
                                />
                                <div
                                    className="absolute -top-2.5 -right-2.5 w-7 h-7 border-t-2 border-r-2"
                                    style={{ borderColor: "var(--accent-color)" }}
                                    aria-hidden="true"
                                />
                                <div
                                    className="absolute -bottom-2.5 -left-2.5 w-7 h-7 border-b-2 border-l-2"
                                    style={{ borderColor: "var(--accent-color)" }}
                                    aria-hidden="true"
                                />
                                <div
                                    className="absolute -bottom-2.5 -right-2.5 w-7 h-7 border-b-2 border-r-2"
                                    style={{ borderColor: "var(--accent-color)" }}
                                    aria-hidden="true"
                                />

                                <img
                                    src="/photos/HeroPhoto.png"
                                    alt="Daniel Chahine"
                                    className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover rounded-xl"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="flex justify-center mt-16 pb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
            >
                <button
                    onClick={scrollToProjects}
                    className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Scroll to projects"
                >
                    <span className="font-code text-[10px] tracking-[0.25em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                        Scroll
                    </span>
                    <div className="w-px h-10 bg-border relative overflow-hidden rounded-full">
                        <div
                            className="absolute inset-x-0 top-0 h-full translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700"
                            style={{ background: "var(--accent-color)" }}
                        />
                    </div>
                </button>
            </motion.div>
        </section>
    );
};
