import { useState } from 'react';
import { cn } from '@/lib/utils';
// Import icons from react-icons
import { 
    SiJavascript, 
    SiHtml5, 
    SiCss3, 
    SiReact, 
    SiNodedotjs, 
    SiPython, 
    SiMysql, 
    SiGit,
    SiCplusplus,
    SiC,
} from 'react-icons/si';
import { FaJava } from "react-icons/fa";
import { PiFileCSharpDuotone } from "react-icons/pi";
import { RiJavaLine } from "react-icons/ri";
import { DiPostgresql } from "react-icons/di";

const skills = [
    // Programming languages
    { name: 'Python', icon: <SiPython size={32} />, category: 'Programming' },
    { name: 'Java', icon: <FaJava size={32} />, category: 'Programming' },
    { name: 'JavaScript', icon: <SiJavascript size={32} />, category: 'Programming' },
    { name: 'C++', icon: <SiCplusplus size={32} />, category: 'Programming' },
    { name: 'C#', icon: <PiFileCSharpDuotone size={32} />, category: 'Programming' },
    { name: 'C', icon: <SiC size={32} />, category: 'Programming' },

    // Full Stack
    { name: 'HTML', icon: <SiHtml5 size={32} />, category: 'Full Stack' },
    { name: 'CSS', icon: <SiCss3 size={32} />, category: 'Full Stack' },
    { name: 'React', icon: <SiReact size={32} />, category: 'Full Stack' },
    { name: 'Node.js', icon: <SiNodedotjs size={32} />, category: 'Full Stack' },
    { name: 'Express.js', icon: <SiNodedotjs size={32} />, category: 'Full Stack' },
    

    // Database
    { name: 'MySQL', icon: <SiMysql size={32} />, category: 'Database' },
    { name: 'PostgreSQL', icon: <DiPostgresql size={32} />, category: 'Database' },

    // Frameworks
    { name: 'JavaFX', icon: <RiJavaLine size={32} />, category: 'Frameworks' },
    { name: 'Git', icon: <SiGit size={32} />, category: 'Frameworks' },
];

const categories = ["All", "Full Stack", "Programming", "Database", "Frameworks"];

export const SkillsSections = () => {
    const [activeCategory, setActiveCategory] = useState("All"); 
    const filteredSkills = skills.filter((skill) => 
        activeCategory === "All" || skill.category === activeCategory);

    return (
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">My Skills</h2>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category, key) => (
                        <button 
                            key={key} 
                            className={cn(
                                'px-5 py-2 rounded-full transition-colors duration-300 capitalize',
                                activeCategory === category ? 'bg-primary text-primary-foreground' : 'bg-secondary/70 text-foreground hover:bg-secondary/80'
                            )}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div
                    className="grid gap-3"
                    style={{
                        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))"
                    }}
                >
                    {filteredSkills.map((skill, key) => (
                        <div key={key} className="bg-card p-6 rounded-lg shadow-xs card-hover">
                            <div className="flex items-center gap-3 justify-center">
                                <span>{skill.icon}</span>
                                <h3 className="font-semibold text-lg">
                                    {skill.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
