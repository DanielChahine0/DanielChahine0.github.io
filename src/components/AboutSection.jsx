import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
    return (
    <section id="about" className="py-24 px-4 position-relative">
        <div className="container mx-auto max-w-5xl">
            <div className="text-center flex flex-row items-center justify-center mb-12 gap-2">
                <User size={45} className="text-primary"/>
                <h2 className="text-3xl md:text-4xl font-bold">
                    About Me
                </h2>
            </div>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold"> Some sentences about me, passionate and so on...</h3>
                    <p className="text-muted-foreground"> 
                        With X years of experience.... 
                        just some text in a paragraph.
                    </p>
                    <p className="text-muted-foreground">
                        Some paragraphs about my background, skills, and interests.
                        Filler text to give an idea of what this section is about.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 pt-4 justify-center">
                        <a href="#contact" className="cosmic-button">
                            Contact Me
                        </a>
                        <a href="#portfolio" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/30 transition-colors duration-300">
                            Download CV
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="gradient-border card-hover p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Code className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg">Web Developement </h4>
                                <p className="text-muted-foreground">Some information with modern frameworks.</p>
                            </div>
                        </div>
                    </div>
                    <div className="gradient-border card-hover p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg">Web Developement </h4>
                                <p className="text-muted-foreground">Some information with modern frameworks.</p>
                            </div>
                            
                        </div>
                    </div>
                    <div className="gradient-border card-hover p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Briefcase className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg">Web Developement </h4>
                                <p className="text-muted-foreground">Some information with modern frameworks.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
    );
};