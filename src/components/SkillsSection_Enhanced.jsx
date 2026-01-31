/**
 * SkillsSection_Enhanced.jsx
 * Clean, minimal skills display
 */

const skillsData = {
    "Languages": [
        'Python', 'JavaScript', 'Java', 'C++', 'C#', 'C',
        'Bash', 'HTML', 'CSS', 'SQL', 'PHP'
    ],
    "Technologies": [
        'PyTorch', 'TensorFlow', 'NumPy', 'React', 'Node.js', 'Next.js',
        'Express', 'Tailwind CSS', 'MongoDB', 'Redis', 'PostgreSQL', 'Git'
    ],
    "Tools": [
        'Git', 'GitHub', 'Docker', 'Postman', 'VS Code', 'Linux', 'Figma'
    ],
    "Specializations": [
        'Full-Stack Development', 'Machine Learning', 'Data Analytics',
        'Web Development', 'Software Engineering'
    ]
};

export const SkillsSections = () => {
    return (
        <section id="skills" className="py-24 px-6">
            <div className="container mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                        Skills & Technologies
                    </h2>
                    <p className="text-muted-foreground max-w-lg">
                        Technologies and tools I work with regularly.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {Object.entries(skillsData).map(([category, skills]) => (
                        <div key={category}>
                            <h3 className="text-lg font-medium mb-4">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-md"
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
