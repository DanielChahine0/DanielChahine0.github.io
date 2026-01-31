/**
 * AboutSection.jsx
 * Clean, minimal about section with key highlights
 */

export const AboutSection = () => {
    const highlights = [
        {
            label: "Education",
            value: "BSc Computer Science",
            detail: "York University, 4th Year, GPA 3.9"
        },
        {
            label: "Experience",
            value: "6+ Years Coding",
            detail: "3+ years web development"
        },
        {
            label: "Focus",
            value: "Full-Stack & ML",
            detail: "React, Node.js, Python"
        }
    ];

    return (
        <section id="about" className="py-24 px-6 bg-card">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left - About Text */}
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-semibold">
                            About
                        </h2>

                        <div className="space-y-4 text-muted-foreground leading-relaxed">
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
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={() => {
                                    const el = document.querySelector('footer');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
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

                    {/* Right - Highlights */}
                    <div className="space-y-6">
                        {highlights.map((item, index) => (
                            <div
                                key={index}
                                className="p-6 border border-border rounded-lg hover:border-foreground/20 transition-colors"
                            >
                                <p className="text-sm text-muted-foreground mb-1">
                                    {item.label}
                                </p>
                                <p className="text-xl font-medium mb-1">
                                    {item.value}
                                </p>
                                <p className="text-sm text-muted-foreground">
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
