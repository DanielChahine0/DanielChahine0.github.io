import { useState } from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility function for class names

const skills = [
    // Make one for each skill
    {name: 'JavaScript', level: 90, category: 'Programming'},
    {name: 'HTML/CSS', level: 95, category: 'Frontend'},
    {name: 'React', level: 85, category: 'Frontend'},
    {name: 'Node.js', level: 80, category: 'Backend'},
    {name: 'Python', level: 75, category: 'Programming'},
    {name: 'Django', level: 70, category: 'Backend'},
    {name: 'SQL', level: 80, category: 'Database'},
    {name: 'Git', level: 90, category: 'Version Control'},
]

const categories = ["all", "frontend", "backend", "programming", "database", "version control"];

export const SkillsSections = () => {
    const [activeCategory, setActiveCategory] = useState("all"); 
    const filteredSkills = skills.filter((skill) => 
        activeCategory === "all" || skill.category.toLowerCase() === activeCategory);

    return (
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center1">My Skills</h2>

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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredSkills.map((skill, key) => (
                        <div key={key} className="bg-card p-6 rounded-lg shadow-xs card-hover">
                            <div className="text-left mb-4">
                                <h3 className="font-semibold text-lg">
                                    {skill.name}
                                </h3>
                                <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]" 
                                        style={{width:skill.level + "%"}} />
                                </div>
                                <div className="text-right mt-1">
                                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
