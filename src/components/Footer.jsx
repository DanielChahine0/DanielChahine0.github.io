
import { ArrowUp, Mail } from "lucide-react";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { SiDevpost } from "react-icons/si";
import { cn } from '@/lib/utils';
import { useState } from 'react';

export const Footer = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <footer className="relative bg-seconday/30 py-5">
            <div
                className={cn(
                    "w-4/5 flex flex-col sm:flex-row mx-auto items-center sm:justify-between gap-5",
                    "rounded-lg bg-primary/30 px-5 py-3 shadow-inner backdrop-blur-lg",
                )}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ position: 'relative', overflow: 'hidden' }}
            >
                {/* Glow layer - same as NavBar */}
                <div
                    className={cn(
                        "absolute pointer-events-none transition-opacity duration-75 z-0",
                        isHovered ? "opacity-75" : "opacity-0"
                    )}
                    style={{
                        left: mousePosition.x - 60,
                        top: mousePosition.y - 60,
                        width: 120,
                        height: 120,
                        background: `radial-gradient(
                            circle,
                            rgba(255, 255, 255, 0.22) 55%,
                            rgba(255, 255, 255, 0.12) 60%,
                            transparent 810%
                        )`,
                        borderRadius: '50%',
                        transform: 'translate3d(0, 0, 0)',
                        filter: 'blur(12px)',
                    }}
                />

                <p className="flex items-center gap-3 font-medium text-foreground relative z-10">
                    <span>&copy; {new Date().getFullYear()} Daniel Chahine</span>
                    {/* status indicator */}
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-flash" />
                </p>

                <div className="flex items-center gap-4 relative z-10">
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
    )
}