import { Briefcase, Code, User, GraduationCap, Award, Target } from "lucide-react";
import { cn } from '@/lib/utils';

export const AboutSection = () => {
    const handleContactClick = () => {
        setTimeout(() => {
            const el = document.querySelector('footer');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    };

    const achievements = [
        // {
        //     icon: <Briefcase className="h-6 w-6 text-primary" />,
        //     title: "Current Role",
        //     description: "Data Analyst at the Institute for Social Research (ISR)",
        //     highlight: "Active"
        // },
        {
            icon: <GraduationCap className="h-6 w-6 text-primary" />,
            title: "Education",
            description: "Spec. Hons. BSc in Computer Science (GPA 3.9)",
            highlight: "4th Year"
        },
        {
            icon: <Code className="h-6 w-6 text-primary" />,
            title: "Experience",
            description: "Over 6+ years of coding and 3+ years web development",
            highlight: "Expert Level"
        },
        {
            icon: <Award className="h-6 w-6 text-primary" />,
            title: "Specialization",
            description: "Full-Stack Development, ML & Data Analytics",
            highlight: "Advanced"
        }
    ];

    return (
        <section id="about" className="py-3 px-4 relative overflow-hidden">
            

            <div className="container mx-auto max-w-7xl">
                {/* Enhanced Header */}
                <div className="text-center mb-16 section-fade-in">
                    <div className="inline-flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                            <User size={32} className="text-primary"/>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text ">
                            About Me
                        </h2>
                    </div>
                    
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Content - Enhanced */}
                    <div className="space-y-8 section-fade-in stagger-delay-1">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-3xl font-bold leading-tight"> 
                                    Computer Science Student & Full-Stack Developer
                                </h3>
                            </div>
                            
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p className="text-lg"> 
                                    I specialize in developing modern web applications using cutting-edge technologies like&nbsp;
                                    <span className="text-primary font-semibold custom-inline-hover">React</span>,&nbsp;
                                    <span className="text-primary font-semibold custom-inline-hover">Node.js</span>,&nbsp;
                                    <span className="text-primary font-semibold custom-inline-hover">Express.js</span>, and&nbsp;
                                    <span className="text-primary font-semibold custom-inline-hover">MongoDB</span>.
                                    My projects also leverage&nbsp;
                                    <span className="text-primary font-semibold custom-inline-hover">Next.js</span>,&nbsp;
                                    <span className="text-primary font-semibold custom-inline-hover">Vite</span>,&nbsp;
                                    <span className="text-primary font-semibold custom-inline-hover">Tailwind CSS</span>, and deployment platforms like&nbsp;
                                    <span className="text-primary font-semibold custom-inline-hover">Vercel</span> and 
                                    <span className="text-primary font-semibold custom-inline-hover">Render</span>.
                                </p>
                                
                                <p>
                                    As a 4th-year student at York University pursuing a Specialized Honours 
                                    Bachelor of Science in Computer Science with a GPA of 3.9/4.0, I focus on&nbsp;
                                    <span className="text-primary font-semibold custom-inline-hover">Software Engineering</span>,&nbsp;
                                    <span className="text-primary font-semibold custom-inline-hover">Full-Stack Development</span>,&nbsp;
                                    <span className="text-primary font-semibold custom-inline-hover">Machine Learning</span>, and&nbsp;
                                    <span className="text-primary font-semibold custom-inline-hover">Data Analytics</span>.
                                </p>
                                
                                {/* <p>
                                    Currently working as a Data Analyst at the Institute for Social Research (ISR),
                                    I specialize in 
                                    <span className="text-primary font-semibold custom-inline-hover">data collection</span>,&nbsp;
                                    <span className="text-primary font-semibold custom-inline-hover">data transformation</span>, and&nbsp;
                                    <span className="text-primary font-semibold custom-inline-hover">data visualization</span>.
                                </p> */}
                            </div>
                        </div>

                        {/* Enhanced Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button 
                                onClick={handleContactClick}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl border border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary group"
                            >
                                <Target className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                                <span>Get In Touch</span>
                            </button>
                            <a 
                                href="/files/resume.pdf" 
                                download 
                                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl border border-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 hover:bg-secondary/80"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                </svg>
                                View Resume
                            </a>
                        </div>
                    </div>

                    {/* Right Content - Enhanced Achievement Cards */}
                    <div className="grid grid-cols-1 gap-6 section-fade-in stagger-delay-2">
                        {achievements.map((achievement, index) => (
                            <div 
                                key={index}
                                className="enhanced-gradient-border p-6 group card-hover"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
                                        <div className="relative p-3 rounded-full bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                                            {achievement.icon}
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                                                {achievement.title}
                                            </h4>
                                            <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full border border-primary/30">
                                                {achievement.highlight}
                                            </span>
                                        </div>
                                        <p className="leading-relaxed">
                                            {achievement.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};