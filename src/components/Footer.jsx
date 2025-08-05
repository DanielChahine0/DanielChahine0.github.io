
import { ArrowUp, Mail, MapPin, Phone, Send } from "lucide-react";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { SiDevpost } from "react-icons/si";
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useGlowEffect } from "@/hooks/use-glow-effect";

export const Footer = () => {
    const {toast} = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Use the custom glow effect hook for both sections
    const contactCardGlow = useGlowEffect();
    const footerGlow = useGlowEffect();

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        setTimeout(() => {
            toast({
                title: "Message Sent",
                description: "Thank you for reaching out! I will get back to you soon.",
                duration: 3000,
                variant: "success",
            });
            
        setIsSubmitting(false);
        }, 1000);

    }

    return (
        <div id="footer">
            <section 
                className="py-2 px-4 relative bg-secondary/30"
            >
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        Get in Touch
                    </h2>

                    <p className="text-center text-muted-foreground mb-8 max-w-4xl mx-auto">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>

                    {/* Contact Information */}
                    <div 
                        className="glow-container rounded-xl bg-primary/30 px-1 py-4 shadow-inner backdrop-blur-lg mx-auto flex flex-col sm:flex-row items-stretch gap-0" 
                        style={{ minHeight: '100px', maxWidth: '700px', width: '100%' }}
                        onMouseMove={contactCardGlow.handleMouseMove}
                        onMouseEnter={contactCardGlow.handleMouseEnter}
                        onMouseLeave={contactCardGlow.handleMouseLeave}
                    >
                        {/* Glow layer */}
                        <div
                            className="glow-layer"
                            style={contactCardGlow.glowStyle}
                        />
                        {/* Contact Items */}
                        <div className="glow-content flex-1 flex flex-col items-center justify-center space-y-2 text-center py-4">
                            <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                            <a 
                                href="mailto:chahinedaniel0@gmail.com" 
                                className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                chahinedaniel0@gmail.com
                            </a>
                        </div>
                        <div className="glow-content flex-1 flex flex-col items-center justify-center space-y-2 text-center py-4 border-l border-r border-primary/20">
                            <Phone className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                            <a 
                                href="tel:+1234567890" 
                                className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                +1 (416) 209-2420
                            </a>
                        </div>
                        <div className="glow-content flex-1 flex flex-col items-center justify-center space-y-2 text-center py-4">
                            <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                            <p className="text-xs md:text-sm text-muted-foreground">
                                Toronto, Canada
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="relative bg-secondary/30 py-3">
                <div
                    className={cn(
                        "glow-container w-4/5 flex flex-col sm:flex-row mx-auto items-center sm:justify-between gap-5",
                        "rounded-lg bg-primary/30 px-5 py-3 shadow-inner backdrop-blur-lg",
                    )}
                    onMouseMove={footerGlow.handleMouseMove}
                    onMouseEnter={footerGlow.handleMouseEnter}
                    onMouseLeave={footerGlow.handleMouseLeave}
                >
                    {/* Glow layer */}
                    <div
                        className="glow-layer"
                        style={footerGlow.glowStyle}
                    />

                    <p className="glow-content flex items-center gap-3 font-medium text-foreground">
                        <span>&copy; {new Date().getFullYear()} Daniel Chahine</span>
                        {/* status indicator */}
                        <span className="h-2 w-2 rounded-full bg-green-400 animate-flash" />
                    </p>

                    <div className="glow-content flex items-center gap-4">
                        <a href="https://github.com/DanielChahine0" target="_blank" className="text-foreground hover:text-primary transition-colors">
                            <FiGithub size={25} />
                        </a>
                        <a href="https://www.linkedin.com/in/danielchahine" target="_blank" className="text-foreground hover:text-primary transition-colors">
                            <FiLinkedin size={25} />
                        </a>
                        <a href="http://instagram.com/dxni.ch" target="_blank" className="text-foreground hover:text-primary transition-colors">
                            <FiInstagram size={25} />
                        </a>
                        <a href="mailto:chahinedaniel0@gmail.com" className="text-foreground hover:text-primary transition-colors">
                            <Mail size={25} />
                        </a>
                        <a href="#hero" className="text-foreground hover:text-primary transition-colors">
                            <ArrowUp size={25} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
        
    );
}