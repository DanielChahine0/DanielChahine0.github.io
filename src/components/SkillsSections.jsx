
import { cn } from '@/lib/utils';

const skillColors = [
    'hover:bg-blue-400',
    'hover:bg-yellow-400',
    'hover:bg-green-500',
    'hover:bg-blue-600',
    'hover:bg-cyan-500',
    'hover:bg-orange-500',
    'hover:bg-indigo-500',
    'hover:bg-cyan-400',
    'hover:bg-red-500',
    'hover:bg-purple-500',
    'hover:bg-green-600',
    'hover:bg-yellow-500',
    'hover:bg-orange-600',
    'hover:bg-purple-600',
    'hover:bg-green-400',
    'hover:bg-pink-500',
    'hover:bg-orange-400',
];

const skillsData = {
    "Languages": [
        'Python',
        'JavaScript',
        'Java',
        'C++',
        'C#',
        'C',
        'Bash',
        'HTML',
        'CSS',
        'SQL',
        'PHP',
    ],
    "Technologies": [
        'pytorch',
        'TensorFlow',
        'NumPy',
        'React',
        'Node.js',
        'Next.js',
        'Express',
        'Tailwind CSS',
        'npm',
        'Vite',
        'mongoDB',
        'Redis',

    ],
    "Softwares": [
        'VSCode',
        'PyCharm',
        'IntelliJ IDEA',
        'PostgreSQL',
        'Eclipse',
        'Unity',
        'Figma',
    ],
    "Dev Tools": [
        'Git',
        'GitHub',
        'Docker',
        'Postman',
    ]
};

export const SkillsSections = () => {
    // Flatten all skills to assign unique color per skill across all categories
    const allSkills = Object.values(skillsData).flat();
    const skillColorMap = {};
    allSkills.forEach((skill, idx) => {
        skillColorMap[skill] = skillColors[idx % skillColors.length];
    });

    return (
        <section id="skills" className="py-10 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-5">
                    {Object.entries(skillsData).map(([category, skills]) => (
                        <div key={category} className="space-y-3">
                            <h3 className="text-xl md:text-xl font-semibold text-left">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className={cn(
                                            "px-5 py-2 rounded-lg hover:rounded-2xl text-sm md:text-base",
                                            "bg-primary/30 transition-all duration-300 ease-in-out hover:scale-105 cursor-default",
                                            "shadow-md outline-2 outline-primary/40",
                                            skillColorMap[skill]
                                        )}
                                    >
                                        {skill}
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
