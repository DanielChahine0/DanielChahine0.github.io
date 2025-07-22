import { User, Github, Linkedin, Mail, ArrowDown, Instagram } from "lucide-react";

export const HeroSection = () => {

    // Dynamic image path depending on the theme
    
    return (
        <section 
            id="hero" 
            className="relative min-h-screen flex flex-col justify-center items-center px-4 py-8"
        >
            <div className="mx-auto max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Avatar */}
                <div className="md:col-span-1 flex items-center justify-center">
                    <img 
                        src="/photos/HeroPhoto.png" 
                        alt="Daniel Chahine" 
                        className="h-full w-full max-h-72 max-w-xs rounded-md object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                    />
                </div>
                {/* Content */}
                <div className="space-y-4 md:col-span-2 flex flex-col justify-center">
                    <h1 className="flex items-center gap-3 text-3xl font-bold md:text-4xl mb-2">
                        <span>Hey, I'm</span> <span className="text-primary">Daniel Chahine</span>
                    </h1>
                    <p className="text-left text-base leading-relaxed">
                        I'm a student and programmer based out of Toronto. I like to make cool projects when I'm bored.
                    </p>
                    <p className="text-left text-base leading-relaxed">
                        Some of my more notable projects are <a href="#" className="underline text-primary">ProjectName</a>, <a href="#" className="underline text-primary">AnotherProject</a>, and more. Most of my work is centered around backend development or system administration. Some sites that I run include <a href="#" className="underline text-primary">metropolis</a>, <a href="#" className="underline text-primary">mCTF</a>, <a href="#" className="underline text-primary">MCPT</a>, <a href="#" className="underline text-primary">foodle</a> as well as a bunch of others.
                    </p>
                    <p className="text-left text-base leading-relaxed">
                        Outside of software, I enjoy playing Ultimate frisbee, <a href="#" className="underline text-primary">photography</a>, organizing/participating at/mentoring hackathons and spending time with my dog, Bella (<a href="#bella" className="underline text-primary">see below</a>). I also have a passion for exploring the world in general! Feel free to <a href="#" className="underline text-primary">book a chat</a> if you'd like to connect.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2 items-center">
                        <a
                            href="https://github.com/DanielChahine0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary inline-flex items-center gap-1.5 text-sm transition-colors"
                        >
                            <Github className="w-5 h-5" />
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/DanielChahine"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary inline-flex items-center gap-1.5 text-sm transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                            LinkedIn
                        </a>
                        <a
                            href="https://instagram.com/dxni.ch"
                            className="hover:text-primary inline-flex items-center gap-1.5 text-sm transition-colors"
                        >
                            <Instagram className="w-5 h-5" />
                            Instagram
                        </a>
                        
                        <a
                            href="mailto:Chahinedaniel0@email.com"
                            className="hover:text-primary inline-flex items-center gap-1.5 text-sm transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            Email
                        </a>
                    </div>
                </div>
            </div>


            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                <a href="#about">
                    <ArrowDown className="w-5 h-5 text-primary"/>
                </a>
                
            </div>
        </section>
    );
}
