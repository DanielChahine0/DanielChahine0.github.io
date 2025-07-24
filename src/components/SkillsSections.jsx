
import { cn } from '@/lib/utils';

// Map base color to hover color class
const hoverColorMap = {
    'bg-blue-500': 'hover:bg-blue-500',
    'bg-yellow-400': 'hover:bg-yellow-400',
    'bg-green-500': 'hover:bg-green-500',
    'bg-blue-600': 'hover:bg-blue-600',
    'bg-cyan-500': 'hover:bg-cyan-500',
    'bg-gray-600': 'hover:bg-gray-600',
    'bg-orange-500': 'hover:bg-orange-500',
    'bg-blue-400': 'hover:bg-blue-400',
    'bg-indigo-500': 'hover:bg-indigo-500',
    'bg-cyan-400': 'hover:bg-cyan-400',
    'bg-red-500': 'hover:bg-red-500',
    'bg-purple-500': 'hover:bg-purple-500',
    'bg-gray-700': 'hover:bg-gray-700',
    'bg-green-600': 'hover:bg-green-600',
    'bg-yellow-500': 'hover:bg-yellow-500',
    'bg-orange-600': 'hover:bg-orange-600',
    'bg-purple-600': 'hover:bg-purple-600',
    'bg-green-400': 'hover:bg-green-400',
    'bg-pink-500': 'hover:bg-pink-500',
    'bg-orange-400': 'hover:bg-orange-400',
    'bg-gray-500': 'hover:bg-gray-500',
};

const skillsData = {
    "Languages": [
        { name: 'TypeScript', color: 'bg-blue-400' },
        { name: 'JavaScript', color: 'bg-yellow-400' },
        { name: 'Python', color: 'bg-green-500' },
        { name: 'C++', color: 'bg-blue-600' },
        { name: 'Go', color: 'bg-cyan-500' },
        { name: 'Bash', color: 'bg-gray-600' },
        { name: 'HTML', color: 'bg-orange-500' },
        { name: 'CSS', color: 'bg-blue-400' },
        { name: 'SQL', color: 'bg-indigo-500' },
    ],
    "Technologies": [
        { name: 'React', color: 'bg-cyan-400' },
        { name: 'Angular', color: 'bg-red-500' },
        { name: 'LitElement', color: 'bg-purple-500' },
        { name: 'Three.js', color: 'bg-gray-700' },
        { name: 'Node.js', color: 'bg-green-600' },
        { name: 'Express', color: 'bg-yellow-500' },
        { name: 'Jest', color: 'bg-orange-600' },
        { name: 'Unity', color: 'bg-purple-600' },
        { name: 'Qt', color: 'bg-green-400' },
    ],
    "Creative": [
        { name: 'Figma', color: 'bg-pink-500' },
        { name: 'Illustrator', color: 'bg-orange-500' },
        { name: 'Procreate', color: 'bg-purple-500' },
        { name: 'Houdini', color: 'bg-orange-600' },
        { name: 'Motion 5', color: 'bg-purple-600' },
        { name: 'Autodesk Inventor', color: 'bg-red-500' },
        { name: 'MS PowerPoint', color: 'bg-orange-400' },
    ],
    "Dev Tools": [
        { name: 'Git', color: 'bg-gray-500' },
        { name: 'VSCode', color: 'bg-blue-500' },
        { name: 'Postman', color: 'bg-orange-500' },
    ]
};

export const SkillsSections = () => {
    return (
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Skills</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {Object.entries(skillsData).map(([category, skills]) => (
                        <div key={category} className="space-y-6">
                            <h3 className="text-xl md:text-2xl font-semibold text-left">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className={cn(
                                            // Less rounding, more rectangular
                                            "px-4 py-2 rounded-md font-medium text-sm md:text-base",
                                            // Use nav/footer background for default
                                            "bg-primary/30 transition-all duration-300 ease-in-out hover:scale-105 hover:font-bold cursor-default",
                                            // Only show color on hover (explicit for Tailwind JIT)
                                            hoverColorMap[skill.color]
                                        )}
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
