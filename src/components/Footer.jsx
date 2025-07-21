import { ArrowUp, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { cn } from '@/lib/utils';

export const Footer = () => {
    return (
        <footer className="relative bg-seconday/30 py-5">
            <div 
                className={cn(
                    "w-4/5 flex flex-col sm:flex-row mx-auto items-center sm:justify-between gap-5",
                    "rounded-lg bg-primary/20 px-5 py-3 shadow-inner",
                )}
            >
                <p className="flex items-center gap-3 font-medium text-foreground">
                    <span>&copy; {new Date().getFullYear()} Daniel Chahine</span>
                    {/* status indicator */}
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-flash" />
                </p>

                <div className="flex items-center gap-4">
                    <a href="https://github.com/DanielChahine0" target="_blank" className="text-foreground hover:text-primary transition-colors">
                        <Github size={25} />
                    </a>
                    <a href="https://www.linkedin.com/in/danielchahine" target="_blank" className="text-foreground hover:text-primary transition-colors">
                        <Linkedin size={25} />
                    </a>
                    <a href="http://instagram.com/dxni.ch" target="_blank" className="text-foreground hover:text-primary transition-colors">
                        <Instagram size={25} />
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