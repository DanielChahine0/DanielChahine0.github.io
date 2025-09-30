/**
 * HeroSection Component
 * The main landing section of the portfolio website that displays:
 * - Personal introduction
 * - Social media links
 * - Call-to-action buttons
 * - Smooth scroll navigation
 */

import { ArrowDown, Mail, Download, ExternalLink } from "lucide-react";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

export const HeroSection = () => {
    /**
     * HeroSection
     * Top landing section of the site. Contains:
     * - Social links array
     * - scrollToAbout helper which smooth-scrolls to the About section
     * The component intentionally manipulates the DOM for smooth scrolling
     * because it needs to scroll to an element outside this component tree.
     */
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

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        aboutSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col justify-center items-center px-4 py-8 overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-subtle"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-subtle" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl animate-pulse-subtle" style={{animationDelay: '4s'}}></div>
            </div>

            <div className="mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                {/* Avatar with Enhanced Animation */}
                <div className="lg:col-span-1 flex items-center justify-center section-fade-in">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                        <img
                            src="/photos/HeroPhoto.png"
                            alt="Daniel Chahine"
                            className="relative h-full w-full max-w-sm rounded-2xl object-cover shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl"
                        />
                    </div>
                </div>

                {/* Enhanced Content */}
                <div className="space-y-6 lg:col-span-2 flex flex-col justify-center section-fade-in stagger-delay-2">
                    {/* Greeting with Better Typography */}
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            I'm Daniel Chahine
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-light">
                            Software Engineer & Full-Stack Developer
                        </p>
                    </div>

                    {/* Enhanced Description */}
                    <div className="space-y-4 text-base md:text-lg leading-relaxed max-w-3xl">
                        <p className="text-foreground/90">
                            I'm a Computer Science student and Software Engineering enthusiast
                            based in{" "}
                            <span className="text-primary font-semibold hover:scale-105 inline-block transition-transform duration-200 cursor-pointer">
                                Toronto
                            </span>{" "}
                            with over 6 years of coding experience and a
                            passion for turning innovative ideas into working software.
                        </p>

                        <p className="text-foreground/80">
                            Some of my favorite creations include{" "}
                            <a
                                className="text-primary font-semibold hover:text-accent underline underline-offset-2 decoration-2 inline-flex items-center gap-1 transition-all duration-200 hover:scale-105"
                                href="https://github.com/DanielChahine0/Webapp-TrueTrade"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                TrueTrade <ExternalLink className="w-4 h-4" />
                            </a>
                            , an AI-powered trading app with Tinder-style swipes;{" "}
                            <a
                                className="text-primary font-semibold hover:text-accent underline underline-offset-2 decoration-2 inline-flex items-center gap-1 transition-all duration-200 hover:scale-105"
                                href="https://github.com/DanielChahine0/Webapp-Think_Board"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ThinkBoard <ExternalLink className="w-4 h-4" />
                            </a>
                            , a real-time MERN note-taking platform; and{" "}
                            <a
                                className="text-primary font-semibold hover:text-accent underline underline-offset-2 decoration-2 inline-flex items-center gap-1 transition-all duration-200 hover:scale-105"
                                href="https://github.com/EECS3311F24/project-fit-coach"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                FitCoach <ExternalLink className="w-4 h-4" />
                            </a>
                            , a holistic fitness tracker.
                        </p>

                        <p className="text-foreground/80">
                            Outside the code editor, you'll find me playing{" "}
                            <a
                                className="text-primary font-semibold hover:text-accent underline underline-offset-2 decoration-2 inline-flex items-center gap-1 transition-all duration-200 hover:scale-105"
                                href="https://www.chess.com/member/danielthegm"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Chess <ExternalLink className="w-4 h-4" />
                            </a>
                            , performing Chopin on the piano, competing in hackathons, and exploring nature.
                            I also love staying active through fitness and traveling.
                        </p>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button 
                            onClick={scrollToAbout}
                            className="modern-button inline-flex items-center gap-2 group"
                        >
                            <span>Explore My Work</span>
                            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                        </button>
                        <a 
                            href="/files/resume.pdf" 
                            download
                            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl border border-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 hover:bg-secondary/80"
                        >
                            <Download className="w-4 h-4" />
                            Download Resume
                        </a>
                    </div>

                    {/* Enhanced Social Links */}
                    <div className="flex flex-wrap gap-6 pt-4 items-center">
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.link}
                                target={social.link.startsWith("http") ? "_blank" : undefined}
                                rel={social.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                            >
                                <div className="p-2 rounded-lg bg-card border border-border/50 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                                    {social.icon}
                                </div>
                                <span className="font-medium">{social.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <button 
                    onClick={scrollToAbout}
                    className="p-2 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card hover:border-primary/50 transition-all duration-300"
                >
                    <ArrowDown className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
                </button>
            </div>
        </section>
    );
};
