/**
 * AboutSection.jsx
 * Editorial about section with left-accent stat cards
 * and Cormorant display heading.
 */

export const AboutSection = () => {
    const highlights = [
        {
            label: "Education",
            value: "BSc Computer Science",
            detail: "York University · 4th Year · GPA 3.9"
        },
        {
            label: "Experience",
            value: "6+ Years Coding",
            detail: "3+ years professional web development"
        },
        {
            label: "Focus",
            value: "Full-Stack & ML",
            detail: "React · Node.js · Python · PyTorch"
        }
    ];

    return (
        <section id="about" className="py-24 px-6 bg-card">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left — About Text */}
                    <div className="space-y-8">
                        <div>
                            <p className="section-label mb-5">Who I Am</p>
                            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                                About Me
                            </h2>
                        </div>

                        <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
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
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
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
                        </div>
                    </div>

                    {/* Right — Highlights */}
                    <div className="space-y-5">
                        {highlights.map((item, index) => (
                            <div
                                key={index}
                                className="relative group p-6 rounded-lg border border-border bg-background hover:border-transparent transition-all duration-300 overflow-hidden"
                                style={{
                                    boxShadow: "none",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.boxShadow = `0 0 0 1px var(--accent-color), 0 8px 30px -8px rgba(var(--accent-color-rgb), 0.2)`;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.boxShadow = "none";
                                    e.currentTarget.style.border = "";
                                }}
                            >
                                {/* Left accent bar */}
                                <div
                                    className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: "var(--accent-color)" }}
                                    aria-hidden="true"
                                />

                                <p className="font-code text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                                    {item.label}
                                </p>
                                <p className="font-display text-2xl font-semibold mb-1 leading-tight">
                                    {item.value}
                                </p>
                                <p className="text-sm text-muted-foreground font-light">
                                    {item.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
