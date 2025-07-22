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
                        Some of my more notable projects are ProjectNameAnotherProject and more. Most of my work is centered around backend development or system administration. Some sites that I run include foodle as well as a bunch of others.
                    </p>
                    <p className="text-left text-base leading-relaxed">
                        Outside of software, I enjoy playing Ultimate frisbee, photographyorganizing/participating at/mentoring hackathons and spending time with my dog, Bella. I also have a passion for exploring the world in general! Feel free to <a href="#" className="underline text-primary">book a chat</a> if you'd like to connect.
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
