/**
 * Footer.jsx
 * Clean, minimal footer with contact info
 */
import { ArrowUp, Mail } from "lucide-react";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

export const Footer = () => {
    const socials = [
        { icon: <FiGithub size={20} />, href: "https://github.com/DanielChahine0", label: "GitHub" },
        { icon: <FiLinkedin size={20} />, href: "https://www.linkedin.com/in/danielchahine", label: "LinkedIn" },
        { icon: <FiInstagram size={20} />, href: "http://instagram.com/dxni.ch", label: "Instagram" },
        { icon: <Mail size={20} />, href: "mailto:chahinedaniel0@gmail.com", label: "Email" },
    ];

    return (
        <footer id="footer" className="py-16 px-6 border-t border-border">
            <div className="container mx-auto max-w-6xl">
                {/* Contact Section */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        I'm always open to discussing new projects, creative ideas,
                        or opportunities to collaborate.
                    </p>
                    <a
                        href="mailto:chahinedaniel0@gmail.com"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-md font-medium hover:opacity-80 transition-opacity"
                    >
                        <Mail className="w-4 h-4" />
                        chahinedaniel0@gmail.com
                    </a>
                </div>

                {/* Divider */}
                <div className="border-t border-border pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Copyright */}
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} Daniel Chahine
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target={social.href.startsWith("http") ? "_blank" : undefined}
                                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        {/* Back to Top */}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Back to top"
                        >
                            <ArrowUp size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
