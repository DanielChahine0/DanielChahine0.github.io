/**
 * Projects.jsx
 * All projects page with category/tech filtering, editorial grid,
 * and navigation to individual project detail views.
 */
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, ArrowRight, Search, X } from "lucide-react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import projects, { getAllCategories } from "../data/projects";

const categories = ["All", ...getAllCategories()];

const containerReveal = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
};

const cardReveal = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
        opacity: 0,
        y: -12,
        transition: { duration: 0.25 },
    },
};

/* ─── Project Card ─── */
const ProjectCard = ({ project, index }) => (
    <motion.div
        layout
        variants={cardReveal}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="group relative"
    >
        {/* Faint number */}
        <span
            className="font-code absolute -top-4 -left-1 text-6xl font-bold leading-none select-none pointer-events-none z-0"
            style={{ color: "var(--accent-color)", opacity: 0.06 }}
            aria-hidden="true"
        >
            {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative z-10 overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1"
             style={{ '--tw-shadow-color': 'rgba(var(--accent-color-rgb), 0.08)' }}>
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    draggable={false}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />

                {/* Year badge */}
                <span
                    className="absolute top-3 right-3 font-code text-[10px] px-2 py-0.5 rounded bg-background/90 backdrop-blur-sm text-muted-foreground border border-border"
                >
                    {project.year}
                </span>

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
            <div className="p-5 space-y-3">
                {/* Tags */}
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

                <h3 className="font-display text-xl font-semibold leading-tight">
                    {project.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed font-light line-clamp-2">
                    {project.description}
                </p>

                <Link
                    to={`/projects/${project.slug}`}
                    className="link-accent inline-flex items-center gap-1 pt-1"
                >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>
        </div>
    </motion.div>
);

/* ─── Main Page ─── */
export const Projects = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = useMemo(() => {
        let result = projects;

        if (activeCategory !== "All") {
            result = result.filter((p) => p.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.tags.some((t) => t.toLowerCase().includes(q)) ||
                    p.category.toLowerCase().includes(q)
            );
        }

        return result;
    }, [activeCategory, searchQuery]);

    return (
        <PageTransition className="min-h-screen bg-background text-foreground">
            <NavBar />

            <main className="pt-32 pb-24 px-6">
                <div className="container mx-auto max-w-6xl">
                    {/* Page Header */}
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <p className="section-label mb-4">Portfolio</p>
                        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-4">
                            All Projects
                        </h1>
                        <p className="text-muted-foreground text-lg font-light max-w-xl">
                            A collection of {projects.length} projects spanning AI, full-stack development, data science, games, and developer tools.
                        </p>
                    </motion.div>

                    {/* Search + Filters */}
                    <motion.div
                        className="mb-12 space-y-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        {/* Search */}
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search projects..."
                                className="w-full pl-10 pr-10 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] font-light transition-shadow"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Category filters */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => {
                                const isActive = activeCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className="font-code text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-md border transition-all duration-200 cursor-pointer"
                                        style={
                                            isActive
                                                ? {
                                                      color: "#fff",
                                                      background: "var(--accent-color)",
                                                      borderColor: "var(--accent-color)",
                                                  }
                                                : {
                                                      color: "var(--muted-foreground)",
                                                      background: "transparent",
                                                      borderColor: "var(--border)",
                                                  }
                                        }
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Results count */}
                    <motion.p
                        className="font-code text-xs text-muted-foreground mb-8 uppercase tracking-wider"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                    >
                        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                        {activeCategory !== "All" && ` in ${activeCategory}`}
                        {searchQuery && ` matching "${searchQuery}"`}
                    </motion.p>

                    {/* Projects Grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerReveal}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((project, i) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={i}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Empty state */}
                    {filtered.length === 0 && (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p className="font-display text-2xl text-muted-foreground mb-2">
                                No projects found
                            </p>
                            <p className="text-sm text-muted-foreground font-light">
                                Try adjusting your search or filters.
                            </p>
                        </motion.div>
                    )}
                </div>
            </main>

            <Footer />
        </PageTransition>
    );
};
