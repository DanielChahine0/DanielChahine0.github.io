/**
 * SkillsSection_Enhanced.jsx
 * Skills display with staggered scroll-triggered tag animations
 * and accent-colored hover interactions.
 */
import { motion } from "framer-motion";

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

const sectionReveal = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

const categoryReveal = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 },
    },
};

const tagReveal = {
    hidden: { opacity: 0, y: 12, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const SkillsSections = () => {
    return (
        <section id="skills" className="py-24 px-6">
            <div className="container mx-auto max-w-6xl">
                {/* Section Header */}
                <motion.div
                    className="mb-16"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    <p className="section-label mb-5">Technical Toolkit</p>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                        Skills & Technologies
                    </h2>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {Object.entries(skillsData).map(([category, skills], catIndex) => (
                        <motion.div
                            key={category}
                            variants={categoryReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                        >
                            <motion.h3
                                className="font-code text-xs font-medium tracking-[0.2em] uppercase mb-5 pb-3 border-b border-border"
                                style={{ color: "var(--accent-color)" }}
                                variants={tagReveal}
                            >
                                {category}
                            </motion.h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <motion.span
                                        key={skill}
                                        className="skill-tag"
                                        variants={tagReveal}
                                        whileHover={{
                                            scale: 1.06,
                                            borderColor: "var(--accent-color)",
                                            color: "var(--accent-color)",
                                            boxShadow: "0 2px 12px -4px rgba(var(--accent-color-rgb), 0.25)",
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
