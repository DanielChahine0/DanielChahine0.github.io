/**
 * ProjectsSection.jsx
 * Home page featured projects preview — editorial staggered grid
 * with bold typography, accent-driven interactions, and a "View All" CTA.
 */
import { ArrowUpRight, Github, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProjects } from "../data/projects";

const featured = getFeaturedProjects();

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
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

/* ─── Hero Featured Card (first project, large) ─── */
const HeroCard = ({ project }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

    return (
        <motion.article
            ref={ref}
            variants={cardReveal}
            className="group relative grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden rounded-xl border border-border bg-card"
        >
            {/* Image — spans 3 cols */}
            <div className="relative lg:col-span-3 aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ y: imageY }}
                    draggable={false}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />

                {/* Number watermark */}
                <span
                    className="font-code absolute bottom-4 left-6 text-[7rem] font-bold leading-none select-none pointer-events-none"
                    style={{ color: "var(--accent-color)", opacity: 0.08 }}
                    aria-hidden="true"
                >
                    01
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-5 py-2.5 bg-background/95 backdrop-blur-sm rounded-md text-sm font-medium text-foreground hover:bg-background transition-colors shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Live <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                    )}
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-5 py-2.5 bg-background/95 backdrop-blur-sm rounded-md text-sm font-medium text-foreground hover:bg-background transition-colors shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Github className="w-3.5 h-3.5" /> Code
                    </a>
                </div>
            </div>

            {/* Text content — spans 2 cols */}
            <div className="lg:col-span-2 flex flex-col justify-center p-8 lg:p-10 space-y-5">
                <div className="flex flex-wrap gap-1.5">
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

                <h3 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
                    {project.title}
                </h3>

                <p className="text-sm text-muted-foreground font-code tracking-wide uppercase">
                    {project.subtitle}
                </p>

                <p className="text-muted-foreground leading-relaxed font-light">
                    {project.description}
                </p>

                <div className="flex gap-5 pt-2">
                    <Link
                        to={`/projects/${project.slug}`}
                        className="link-accent"
                    >
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-accent"
                        >
                            Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

/* ─── Compact Card (remaining featured) ─── */
const CompactCard = ({ project, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

    return (
        <motion.article
            ref={ref}
            variants={cardReveal}
            className="group relative"
        >
            {/* Number watermark */}
            <span
                className="font-code absolute -top-5 -left-1 text-7xl font-bold leading-none select-none pointer-events-none z-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ color: "var(--accent-color)", opacity: 0.08 }}
                aria-hidden="true"
            >
                {String(index + 2).padStart(2, "0")}
            </span>

            <div className="relative z-10 overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-300 group-hover:shadow-lg"
                 style={{ '--tw-shadow-color': 'rgba(var(--accent-color-rgb), 0.08)' }}>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        style={{ y: imageY }}
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-4 py-2 bg-background/95 backdrop-blur-sm rounded-md text-sm font-medium text-foreground hover:bg-background transition-colors shadow-lg"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Live <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        )}
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2 bg-background/95 backdrop-blur-sm rounded-md text-sm font-medium text-foreground hover:bg-background transition-colors shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Github className="w-3.5 h-3.5" /> Code
                        </a>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="font-code text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border"
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

                    <h3 className="font-display text-2xl font-semibold leading-tight">
                        {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed font-light line-clamp-2">
                        {project.description}
                    </p>

                    <div className="flex gap-5 pt-1">
                        <Link
                            to={`/projects/${project.slug}`}
                            className="link-accent"
                        >
                            Details <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

/* ─── Main Section ─── */
export const ProjectsSection = () => {
    const [hero, ...rest] = featured;

    return (
        <section id="projects" className="py-24 px-6">
            <div className="container mx-auto max-w-6xl">
                {/* Section Header */}
                <motion.div
                    className="mb-16"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    <p className="section-label mb-4">Selected Work</p>
                    <div className="flex items-end justify-between flex-wrap gap-4">
                        <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                            Featured Projects
                        </h2>
                        <Link
                            to="/projects"
                            className="link-accent text-muted-foreground text-sm mb-1"
                        >
                            View all projects <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>

                {/* Hero featured project */}
                <motion.div
                    className="mb-12"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    <HeroCard project={hero} />
                </motion.div>

                {/* Remaining featured projects — 3-col grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {rest.map((project, i) => (
                        <CompactCard key={project.id} project={project} index={i} />
                    ))}
                </motion.div>

                {/* View All CTA */}
                <motion.div
                    className="mt-16 flex justify-center"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Link
                        to="/projects"
                        className="btn-primary"
                    >
                        View All Projects
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
