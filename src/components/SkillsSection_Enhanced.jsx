/**
 * SkillsSection_Enhanced.jsx
 * Clean skills display with monospace tags and accent category labels.
 */

const skillsData = {
    "Languages": [
        'Python', 'JavaScript', 'Java', 'C++', 'C#', 'C',
        'Bash', 'HTML', 'CSS', 'SQL', 'PHP'
    ],
    "Technologies": [
        'PyTorch', 'TensorFlow', 'NumPy', 'React', 'Node.js', 'Next.js',
        'Express', 'Tailwind CSS', 'MongoDB', 'Redis', 'PostgreSQL'
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
                    <p className="section-label mb-5">Technical Toolkit</p>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                        Skills & Technologies
                    </h2>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {Object.entries(skillsData).map(([category, skills]) => (
                        <div key={category}>
                            <h3
                                className="font-code text-xs font-medium tracking-[0.2em] uppercase mb-5 pb-3 border-b border-border"
                                style={{ color: "var(--accent-color)" }}
                            >
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span key={skill} className="skill-tag">
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
