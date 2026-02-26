/**
 * Footer.jsx
 * Elegant footer with large display CTA and refined social links.
 */
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";

export const Footer = () => {
    const socials = [
        { icon: <FiGithub size={18} />, href: "https://github.com/DanielChahine0",           label: "GitHub" },
        { icon: <FiLinkedin size={18} />, href: "https://www.linkedin.com/in/danielchahine", label: "LinkedIn" },
        { icon: <FiInstagram size={18} />, href: "http://instagram.com/dxni.ch",             label: "Instagram" },
        { icon: <FiMail size={18} />, href: "mailto:chahinedaniel0@gmail.com",               label: "Email" },
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

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target={social.href.startsWith("http") ? "_blank" : undefined}
                                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="p-2 text-muted-foreground rounded-md border border-transparent hover:border-border transition-all duration-200"
                                    style={{
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.color = "var(--accent-color)";
                                        e.currentTarget.style.borderColor = "var(--accent-color)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = "";
                                        e.currentTarget.style.borderColor = "";
                                    }}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

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
