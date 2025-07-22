import { ArrowDown } from "lucide-react";
import { Mail } from "lucide-react"
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
                        className="h-full w-full max-w-xs rounded-md object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                    />
                </div>
                
                {/* Content */}
                <div className="space-y-4 md:col-span-2 flex flex-col justify-center">
                    <h1 className="flex items-center gap-3 text-3xl font-bold md:text-4xl mb-2">
                        <span>Hey, I'm</span> <span className="text-primary">Daniel Chahine</span>
                    </h1>
                    <p className="text-left text-base leading-relaxed">
                        I'm a Computer Science student and a Software Engineering enthusiast
                        based in <a href="#contact" className="inline-block transition-transform duration-200 hover:scale-105">Toronto</a> with over 6 years of coding experience under my belt and a 
                        habit of turning late-night ideas into working software.
                    </p>
                    <p className="text-left text-base leading-relaxed">
                        Some of my favorite creations include <a
                                className="text-primary font-bold underline underline-offset-1.5 inline-block transition-transform duration-200 hover:scale-105"
                                href="https://github.com/DanielChahine0/Webapp-TrueTrade"
                                target="_blank"
                                rel="noopener noreferrer">
                                    TrueTrade
                            </a>, an AI-powered trading app with Tinder-style swipes; <a
                                className="text-primary font-bold underline underline-offset-1.5 inline-block transition-transform duration-200 hover:scale-105"
                                href="https://github.com/DanielChahine0/Webapp-Think_Board"
                                target="_blank"
                                rel="noopener noreferrer">
                                    ThinkBoard
                            </a>, a real-time MERN note-taking platform; <a
                                className="text-primary font-bold underline underline-offset-1.5 inline-block transition-transform duration-200 hover:scale-105"
                                href="https://github.com/DanielChahine0/Webapp-MyCalendar"
                                target="_blank"
                                rel="noopener noreferrer">
                                    MyCalendar
                            </a>, a self-hosted Google Calendar-style web app; and <a 
                                className="text-primary font-bold underline underline-offset-1.5 inline-block transition-transform duration-200 hover:scale-105"
                                href="https://github.com/EECS3311F24/project-fit-coach"
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                    FitCoach
                            </a>, a holistic fitness tracker.
                    </p>

                    <p className="text-left text-base leading-relaxed">
                        Outside the code editor, you'll find me playing <a 
                            className="text-primary font-bold underline underline-offset-1.5 inline-block transition-transform duration-200 hover:scale-105" 
                            href="https://www.chess.com/member/danielthegm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Chess
                        </a>
                        , performing Chopin on the piano, 
                        competing in hackathons, and exploring the nature.
                        I also love <a
                            className="text-primary font-bold underline underline-offset-1.5 inline-block transition-transform duration-200 hover:scale-105"
                            href="https://liftoffrank.com/dani.ch"
                            target="_blank"
                            rel="noopener noreferrer">
                                Working Out
                            </a>
                        , and staying active through fitness, travelling, and learning new skills.
                    </p>

                    <p className="text-left text-base leading-relaxed">
                        Always down to talk tech, side projects, or travel adventures — feel free to reach out!
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2 items-center">
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.link}
                                target={social.link.startsWith("http") ? "_blank" : undefined}
                                rel={social.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="hover:text-primary inline-flex items-center gap-1.5 text-sm transition-colors"
                            >
                                {social.icon}
                                {social.name}
                            </a>
                        ))}
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
