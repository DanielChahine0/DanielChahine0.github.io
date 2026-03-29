/**
 * ProjectDetail.jsx
 * Rich individual project detail page with editorial layout,
 * full descriptions, tech stack, challenges, outcomes, and links.
 */
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github, Calendar, User, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import projects, { getProjectBySlug } from "../data/projects";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

/* ─── Info Block ─── */
const InfoBlock = ({ icon: Icon, label, children }) => (
    <div className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
            <Icon className="w-4 h-4" style={{ color: "var(--accent-color)" }} />
            <span className="font-code text-[10px] uppercase tracking-wider">{label}</span>
        </div>
        <div className="text-foreground text-sm leading-relaxed font-light">
            {children}
        </div>
    </div>
);

/* ─── Section Heading ─── */
const SectionHeading = ({ children }) => (
    <h2
        className="font-display text-2xl md:text-3xl font-semibold mb-4"
    >
        {children}
    </h2>
);

/* ─── Adjacent Project Navigation ─── */
const AdjacentNav = ({ project, direction }) => {
    if (!project) return <div />;

    return (
        <Link
            to={`/projects/${project.slug}`}
            className="group flex items-center gap-3 p-4 rounded-lg border border-border hover:border-[var(--accent-color)] transition-colors bg-card"
        >
            {direction === "prev" && (
                <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-[var(--accent-color)] transition-colors flex-shrink-0" />
            )}
            <div className={direction === "next" ? "text-right flex-1" : "flex-1"}>
                <span className="font-code text-[10px] uppercase tracking-wider text-muted-foreground block mb-0.5">
                    {direction === "prev" ? "Previous" : "Next"}
                </span>
                <span className="font-display text-lg font-semibold group-hover:text-[var(--accent-color)] transition-colors line-clamp-1">
                    {project.title}
                </span>
            </div>
            {direction === "next" && (
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-[var(--accent-color)] transition-colors flex-shrink-0" />
            )}
        </Link>
    );
};

/* ─── Main Component ─── */
export const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const project = getProjectBySlug(slug);

    if (!project) {
        return (
            <PageTransition className="min-h-screen bg-background text-foreground">
                <NavBar />
                <main className="pt-32 pb-24 px-6">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h1 className="font-display text-4xl font-semibold mb-4">Project Not Found</h1>
                        <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
                        <Link to="/projects" className="btn-primary">
                            <ArrowLeft className="w-4 h-4" /> Back to Projects
                        </Link>
                    </div>
                </main>
                <Footer />
            </PageTransition>
        );
    }

    const currentIndex = projects.findIndex((p) => p.slug === slug);
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

    return (
        <PageTransition className="min-h-screen bg-background text-foreground">
            <NavBar />

            <main className="pt-28 pb-24">
                {/* Back link */}
                <div className="px-6">
                    <div className="container mx-auto max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link
                                to="/projects"
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="font-code text-xs uppercase tracking-wider">All Projects</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Hero Image */}
                <motion.div
                    className="w-full mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                >
                    <div className="px-6">
                        <div className="container mx-auto max-w-5xl">
                            <div className="relative aspect-[21/9] overflow-hidden rounded-xl border border-border bg-muted">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    draggable={false}
                                />
                                {/* Gradient overlay at bottom */}
                                <div
                                    className="absolute inset-x-0 bottom-0 h-1/3"
                                    style={{
                                        background: "linear-gradient(to top, var(--background), transparent)",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Content */}
                <div className="px-6">
                    <div className="container mx-auto max-w-5xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                            {/* Main Content — 2 cols */}
                            <div className="lg:col-span-2 space-y-10">
                                {/* Title Block */}
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    custom={1}
                                >
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-code text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border"
                                                style={{
                                                    color: "var(--accent-color)",
                                                    borderColor: "rgba(var(--accent-color-rgb), 0.3)",
                                                    background: "rgba(var(--accent-color-rgb), 0.06)",
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-3">
                                        {project.title}
                                    </h1>

                                    <p
                                        className="font-code text-sm tracking-wide uppercase"
                                        style={{ color: "var(--accent-color)" }}
                                    >
                                        {project.subtitle}
                                    </p>
                                </motion.div>

                                {/* Description */}
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    custom={2}
                                >
                                    <SectionHeading>Overview</SectionHeading>
                                    <p className="text-muted-foreground leading-relaxed font-light text-[15px]">
                                        {project.fullDescription}
                                    </p>
                                </motion.div>

                                {/* Challenges */}
                                {project.challenges && (
                                    <motion.div
                                        variants={fadeUp}
                                        initial="hidden"
                                        animate="visible"
                                        custom={3}
                                    >
                                        <SectionHeading>Challenges</SectionHeading>
                                        <p className="text-muted-foreground leading-relaxed font-light text-[15px]">
                                            {project.challenges}
                                        </p>
                                    </motion.div>
                                )}

                                {/* Outcomes */}
                                {project.outcomes && (
                                    <motion.div
                                        variants={fadeUp}
                                        initial="hidden"
                                        animate="visible"
                                        custom={4}
                                    >
                                        <SectionHeading>Outcomes</SectionHeading>
                                        <p className="text-muted-foreground leading-relaxed font-light text-[15px]">
                                            {project.outcomes}
                                        </p>
                                    </motion.div>
                                )}
                            </div>

                            {/* Sidebar — 1 col */}
                            <motion.aside
                                className="space-y-8"
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                custom={2}
                            >
                                {/* Sticky sidebar content */}
                                <div className="lg:sticky lg:top-28 space-y-8">
                                    {/* Quick Info */}
                                    <div className="p-6 rounded-xl border border-border bg-card space-y-6">
                                        <InfoBlock icon={User} label="Role">
                                            {project.role}
                                        </InfoBlock>

                                        <InfoBlock icon={Calendar} label="Year">
                                            {project.year}
                                        </InfoBlock>

                                        <InfoBlock icon={Layers} label="Category">
                                            {project.category}
                                        </InfoBlock>

                                        {/* Divider */}
                                        <div className="h-px bg-border" />

                                        {/* Tech Stack */}
                                        <div className="space-y-3">
                                            <span className="font-code text-[10px] uppercase tracking-wider text-muted-foreground">
                                                Tech Stack
                                            </span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.techStack.map((tech) => (
                                                    <span key={tech} className="skill-tag text-[11px]">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-px bg-border" />

                                        {/* Links */}
                                        <div className="space-y-3">
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-secondary w-full"
                                            >
                                                <Github className="w-4 h-4" />
                                                View Source Code
                                            </a>

                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-primary w-full"
                                                >
                                                    Live Demo
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.aside>
                        </div>

                        {/* Adjacent project navigation */}
                        <motion.div
                            className="mt-20 pt-10 border-t border-border"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={5}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AdjacentNav project={prevProject} direction="prev" />
                                <AdjacentNav project={nextProject} direction="next" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </PageTransition>
    );
};
