import { cn } from '@/lib/utils';
import { Code2, Wrench, Layers, Zap } from 'lucide-react';

const skillsData = {
    "Languages": {
        icon: <Code2 className="h-6 w-6 text-primary" />,
        skills: [
            'Python', 'JavaScript', 'Java', 'C++', 'C#', 'C', 
            'Bash', 'HTML', 'CSS', 'SQL', 'PHP'
        ]
    },
    "Technologies": {
        icon: <Layers className="h-6 w-6 text-primary" />,
        skills: [
            'pytorch', 'TensorFlow', 'NumPy', 'React', 'Node.js', 'Next.js',
            'Express', 'Tailwind CSS', 'npm', 'Vite', 'mongoDB', 'Redis',
            'PostgreSQL', 'Git', 'Figma'
        ]
    },
    "Dev Tools": {
        icon: <Wrench className="h-6 w-6 text-primary" />,
        skills: [
            'Git', 'GitHub', 'Docker', 'Postman', 'VS Code', 'Linux'
        ]
    },
    "Specializations": {
        icon: <Zap className="h-6 w-6 text-primary" />,
        skills: [
            'Full-Stack Development', 'Machine Learning', 'Data Analytics', 
            'Web Development', 'Software Engineering'
        ]
    }
};

export const SkillsSections = () => {
    return (
        <section id="skills" className="py-20 px-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto max-w-7xl">
                {/* Enhanced Header */}
                <div className="text-center mb-16 section-fade-in">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                            <Code2 size={32} className="text-primary"/>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                            Skills & Technologies
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A comprehensive overview of my technical expertise and the tools I use to build amazing software
                    </p>
                </div>

                {/* Enhanced Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.entries(skillsData).map(([category, data], index) => (
                        <div 
                            key={category} 
                            className={cn(
                                "enhanced-gradient-border p-6 group card-hover section-fade-in",
                                index === 1 && "stagger-delay-1",
                                index === 2 && "stagger-delay-2",
                                index === 3 && "stagger-delay-3"
                            )}
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                                    {data.icon}
                                </div>
                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                    {category}
                                </h3>
                            </div>

                            {/* Skills Tags */}
                            <div className="flex flex-wrap gap-3">
                                {data.skills.map((skill, skillIndex) => (
                                    <span
                                        key={skill}
                                        className={cn(
                                            "px-4 py-2 rounded-lg text-sm font-medium",
                                            "bg-primary/10 text-foreground border border-primary/20",
                                            "transition-all duration-300 hover:scale-105 hover:bg-primary/20 hover:border-primary/40",
                                            "hover:shadow-lg cursor-default",
                                            "animate-fade-in"
                                        )}
                                        style={{
                                            animationDelay: `${(index * 0.1 + skillIndex * 0.05)}s`
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info Section */}
                <div className="mt-16 text-center section-fade-in stagger-delay-4">
                    <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                        <h3 className="text-xl font-semibold text-foreground">
                            Always Learning & Growing
                        </h3>
                        <p className="text-muted-foreground max-w-2xl">
                            I'm constantly exploring new technologies and expanding my skill set. 
                            Currently diving deeper into AI/ML technologies, cloud platforms, and modern web frameworks.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
