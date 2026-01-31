/**
 * HeroSection Component
 * Clean, minimal landing section with:
 * - Personal introduction
 * - Prominent photo
 * - Social media links
 * - Call-to-action buttons
 */

import { useCallback } from "react";
import { ArrowDown, Mail, Download } from "lucide-react";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

export const HeroSection = () => {
    const socials = [
        {
            icon: <FiGithub className="w-5 h-5" />,
            name: "GitHub",
            link: "https://github.com/DanielChahine0",
        },
        {
            icon: <FiLinkedin className="w-5 h-5" />,
            name: "LinkedIn",
            link: "https://linkedin.com/in/DanielChahine",
        },
        {
            icon: <FiInstagram className="w-5 h-5" />,
            name: "Instagram",
            link: "https://instagram.com/dxni.ch",
        },
        {
            icon: <Mail className="w-5 h-5" />,
            name: "Email",
            link: "mailto:Chahinedaniel0@email.com",
        },
    ];

    const scrollToProjects = useCallback(() => {
        const projectsSection = document.getElementById('projects');
        projectsSection?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <section
            id="hero"
            className="min-h-screen flex flex-col justify-center pt-16"
        >
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Text Content */}
                        <div className="order-2 lg:order-1 space-y-8">
                            <div className="space-y-4">
                                <p className="text-muted-foreground text-lg">
                                    Software Engineer
                                </p>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
                                    Daniel Chahine
                                </h1>
                            </div>

                            <div className="space-y-4 text-muted-foreground leading-relaxed max-w-lg">
                                <p>
                                    I'm a Computer Science student based in Toronto with over 6 years
                                    of coding experience. I specialize in building modern web applications
                                    and turning innovative ideas into working software.
                                </p>
                                <p>
                                    Currently focused on full-stack development, machine learning,
                                    and creating tools that solve real problems.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={scrollToProjects}
                                    className="btn-primary inline-flex items-center justify-center gap-2"
                                    aria-label="View my work"
                                >
                                    View My Work
                                    <ArrowDown className="w-4 h-4" />
                                </button>
                                <a
                                    href="/files/resume.pdf"
                                    download
                                    className="btn-secondary inline-flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    Download Resume
                                </a>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-4 pt-4">
                                {socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.link}
                                        target={social.link.startsWith("http") ? "_blank" : undefined}
                                        rel={social.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="p-3 border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-200"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Photo */}
                        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                            <div className="relative">
                                <img
                                    src="/photos/HeroPhoto.png"
                                    alt="Daniel Chahine"
                                    className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-16 pb-8">
                <button
                    onClick={scrollToProjects}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
                    aria-label="Scroll to projects"
                >
                    <ArrowDown className="w-5 h-5" />
                </button>
            </div>
        </section>
    );
};
