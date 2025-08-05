import { Briefcase, Code, User } from "lucide-react";
import { useGlowEffect } from "@/hooks/use-glow-effect";
import { cn } from '@/lib/utils';

export const AboutSection = () => {
    // Initialize glow effects for each card
    const aboutCard1Glow = useGlowEffect();
    const aboutCard2Glow = useGlowEffect();
    const aboutCard3Glow = useGlowEffect();

    return (
    <section id="about" className="py-5 px-2 relative">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center flex flex-row items-center justify-center mb-12 gap-2">
                <User size={45} className="text-primary"/>
                <h2 className="text-3xl md:text-4xl font-bold">
                    About Me
                </h2>
            </div>
            

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
                <div className="md:col-span-2 space-y-6">
                    {/* Left side content */}
                    <h3 className="text-2xl font-semibold"> 
                        Data Analyst, Computer Science student and Web Developer.
                    </h3>
                    <p className="text-muted-foreground"> 
                        Developed modern web applications using technologies like&nbsp;
                        <strong className="custom-inline-hover">React,&nbsp;</strong>
                        <strong className="custom-inline-hover">Node.js,&nbsp;</strong>
                        <strong className="custom-inline-hover">Express.js,&nbsp;</strong>
                        <strong className="custom-inline-hover">MongoDB.</strong>
                        My projects also leverage 
                        <strong className="custom-inline-hover">Next.js,&nbsp;</strong>
                        <strong className="custom-inline-hover">Vite,&nbsp;</strong>
                        <strong className="custom-inline-hover">Tailwind CSS,&nbsp;</strong>
                        and deployment platforms with&nbsp;
                        <strong className="custom-inline-hover">Vercel</strong> and 
                        <strong className="custom-inline-hover">Render</strong>.
                    </p>
                    <p className="text-muted-foreground">
                        A 4th-year student at York University pursuing a Specialized Honours 
                        Bachelor of Science in Computer Science (GPA of 3.9/4.0). 
                        Focusing on&nbsp;
                        <strong className="custom-inline-hover">Software Engineering,&nbsp;</strong>
                        <strong className="custom-inline-hover">Full-Stack Development,&nbsp;</strong>
                        <strong className="custom-inline-hover">Machine Learning,&nbsp;</strong>
                        and <strong className="custom-inline-hover">Data Analytics</strong>.
                    </p>
                    <p className="text-muted-foreground">
                        Currently working as a Data Analyst under the Institute for Social Research (ISR).
                        I specialize in 
                        <strong className="custom-inline-hover">data collection,&nbsp;</strong>
                        <strong className="custom-inline-hover">data transformation,&nbsp;</strong>
                        and <strong className="custom-inline-hover">data visualization</strong>.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 pt-4 justify-center">
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <a href="#contact" className="cosmic-button">
                                Contact Me
                            </a>
                            <a href="/public/files/resume.pdf" download className="cosmic-button">
                                Download Resume
                            </a>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1 grid grid-cols-1 gap-6">
                    {/* Right side content */}
                    

                    <div 
                        className={cn(
                            "glow-container gradient-border card-hover p-6"
                        )}
                        onMouseMove={aboutCard1Glow.handleMouseMove}
                        onMouseEnter={aboutCard1Glow.handleMouseEnter}
                        onMouseLeave={aboutCard1Glow.handleMouseLeave}
                    >
                        <div
                            className="glow-layer"
                            style={aboutCard1Glow.glowStyle}
                        />
                        <div className="glow-content flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10 outline-2 outline-primary">
                                <Briefcase className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg">Current Job</h4>
                                <p className="text-muted-foreground">
                                    Data Analyst at the Institute for Social Research (ISR)    
                                </p>
                            </div>
                        </div>
                    </div>

                    <div 
                        className={cn(
                            "glow-container gradient-border card-hover p-6"
                        )}
                        onMouseMove={aboutCard2Glow.handleMouseMove}
                        onMouseEnter={aboutCard2Glow.handleMouseEnter}
                        onMouseLeave={aboutCard2Glow.handleMouseLeave}
                    >
                        <div
                            className="glow-layer"
                            style={aboutCard2Glow.glowStyle}
                        />
                        <div className="glow-content flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10 outline-2 outline-primary">
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg">Student</h4>
                                <p className="text-muted-foreground">
                                    Spec. Hons. BSc in Computer Science (GPA 3.9).
                                </p>
                            </div>
                        </div>
                    </div>

                    <div 
                        className={cn(
                            "glow-container gradient-border card-hover p-6"
                        )}
                        onMouseMove={aboutCard3Glow.handleMouseMove}
                        onMouseEnter={aboutCard3Glow.handleMouseEnter}
                        onMouseLeave={aboutCard3Glow.handleMouseLeave}
                    >
                        <div
                            className="glow-layer"
                            style={aboutCard3Glow.glowStyle}
                        />
                        <div className="glow-content flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10 outline-2 outline-primary">
                                <Code className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg">Web Development</h4>
                                <p className="text-muted-foreground">
                                    Over 3 years of experience developing web applications.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

    </section>
    );
};