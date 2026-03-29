/**
 * AboutSection.jsx
 * Editorial about section with geometric accent decorations,
 * animated stat cards, and scroll-triggered reveals.
 */
import { motion } from "framer-motion";

const sectionReveal = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const cardReveal = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

const highlights = [
    {
        label: "Education",
        value: "BSc Computer Science",
        detail: "York University · 4th Year · GPA 3.9",
        number: "01",
    },
    {
        label: "Experience",
        value: "6+ Years Coding",
        detail: "3+ years professional web development",
        number: "02",
    },
    {
        label: "Focus",
        value: "Full-Stack & ML",
        detail: "React · Node.js · Python · PyTorch",
        number: "03",
    },
];

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-6 bg-card relative overflow-hidden">
            {/* Geometric accent decoration — top-right */}
            <div className="absolute top-12 right-12 hidden lg:block pointer-events-none" aria-hidden="true">
                <div
                    className="w-24 h-24 border border-dashed rounded-sm opacity-[0.08]"
                    style={{ borderColor: "var(--accent-color)" }}
                />
                <div
                    className="absolute top-3 left-3 w-24 h-24 border rounded-sm opacity-[0.05]"
                    style={{ borderColor: "var(--accent-color)" }}
                />
            </div>

            {/* Thin horizontal accent line decoration */}
            <div className="absolute left-0 top-1/2 w-16 h-px hidden xl:block opacity-20" style={{ background: "var(--accent-color)" }} aria-hidden="true" />

            <div className="container mx-auto max-w-6xl relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left — About Text */}
                    <motion.div
                        className="space-y-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        <motion.div variants={cardReveal}>
                            <p className="section-label mb-5">Who I Am</p>
                            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                                About Me
                            </h2>
                        </motion.div>

                        <motion.div variants={cardReveal} className="space-y-4 text-muted-foreground leading-relaxed font-light">
                            <p>
                                I'm a 4th-year Computer Science student at York University
                                pursuing a Specialized Honours Bachelor of Science with a
                                strong academic record (GPA 3.9/4.0).
                            </p>

                            <p>
                                I specialize in developing modern web applications using
                                technologies like React, Node.js, Express.js, and MongoDB.
                                My work also extends to Next.js, Vite, Tailwind CSS, and
                                deployment platforms like Vercel and Render.
                            </p>

                            <p>
                                My focus areas include Software Engineering, Full-Stack
                                Development, Machine Learning, and Data Analytics. I enjoy
                                building tools that solve real problems and create meaningful
                                user experiences.
                            </p>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div variants={cardReveal} className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                onClick={() => {
                                    document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="btn-primary"
                            >
                                Get In Touch
                            </button>
                            <a
                                href="/files/resume.pdf"
                                download
                                className="btn-secondary text-center"
                            >
                                View Resume
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right — Highlights */}
                    <motion.div
                        className="space-y-5"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        {highlights.map((item) => (
                            <motion.div
                                key={item.number}
                                variants={cardReveal}
                                className="about-card relative group p-6 rounded-lg border border-border bg-background transition-all duration-300 overflow-hidden"
                                whileHover={{
                                    borderColor: "var(--accent-color)",
                                    boxShadow: "0 8px 30px -8px rgba(var(--accent-color-rgb), 0.15)",
                                }}
                            >
                                {/* Left accent bar — appears on hover */}
                                <motion.div
                                    className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
                                    style={{ background: "var(--accent-color)" }}
                                    initial={{ opacity: 0, scaleY: 0 }}
                                    whileHover={{ opacity: 1, scaleY: 1 }}
                                    transition={{ duration: 0.25 }}
                                    aria-hidden="true"
                                />

                                {/* Faded number in background */}
                                <span
                                    className="font-code absolute top-3 right-4 text-3xl font-bold leading-none select-none pointer-events-none"
                                    style={{ color: "var(--accent-color)", opacity: 0.06 }}
                                    aria-hidden="true"
                                >
                                    {item.number}
                                </span>

                                <p className="font-code text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                                    {item.label}
                                </p>
                                <p className="font-display text-2xl font-semibold mb-1 leading-tight">
                                    {item.value}
                                </p>
                                <p className="text-sm text-muted-foreground font-light">
                                    {item.detail}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
