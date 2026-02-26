/**
 * ProjectsSection.jsx
 * Editorial numbered project cards with accent-colored tags
 * and smooth hover interactions.
 */
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
    {
        id: 1,
        title: 'Think Board',
        description: 'A full-stack web application for capturing notes, brainstorming ideas, and organizing projects in real time.',
        image: '/projects/project1.png',
        tags: ['React', 'Express', 'MongoDB'],
        link: 'https://webapp-think-board.onrender.com/',
        githubUrl: 'https://github.com/DanielChahine0/Webapp-Think_Board',
    },
    {
        id: 2,
        title: 'My Calendar',
        description: 'A modern calendar application inspired by Google Calendar, designed for scheduling and event management.',
        image: '/projects/project2.png',
        tags: ['JavaScript', 'PHP', 'PostgreSQL'],
        link: 'https://example.com/',
        githubUrl: 'https://github.com/DanielChahine0/Webapp-MyCalendar',
    },
    {
        id: 3,
        title: 'Fit Coach',
        description: 'A fitness tracker that logs calories, workouts, and progress, with tools for coaches to create plans and track client performance.',
        image: '/projects/project3.png',
        tags: ['Python', 'Flask', 'JavaScript'],
        link: 'https://example.com/project-one',
        githubUrl: 'https://github.com/EECS3311F24/project-fit-coach',
    }
]

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-24 px-6">
            <div className="container mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="mb-16">
                    <p className="section-label mb-4">Selected Work</p>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                        Featured Projects
                    </h2>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <article
                            key={project.id}
                            className="group relative"
                        >
                            {/* Project number — large faded background */}
                            <span
                                className="font-code absolute -top-4 -left-1 text-7xl font-bold leading-none select-none pointer-events-none z-0 transition-opacity duration-300 group-hover:opacity-100"
                                style={{ color: "var(--accent-color)", opacity: 0.08 }}
                                aria-hidden="true"
                            >
                                {String(project.id).padStart(2, '0')}
                            </span>

                            <div className="relative z-10">
                                {/* Project Image */}
                                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-5 bg-muted border border-border">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                    />
                                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/4 transition-colors duration-300" />

                                    {/* Hover overlay links */}
                                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-4 py-2 bg-background/95 backdrop-blur-sm rounded-md text-sm font-medium text-foreground hover:bg-background transition-colors shadow-lg"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Live
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                        </a>
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-4 py-2 bg-background/95 backdrop-blur-sm rounded-md text-sm font-medium text-foreground hover:bg-background transition-colors shadow-lg"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Github className="w-3.5 h-3.5" />
                                            Code
                                        </a>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="space-y-3">
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

                                    {/* Title */}
                                    <h3 className="font-display text-2xl font-semibold leading-tight group-hover:opacity-80 transition-opacity">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-muted-foreground text-sm leading-relaxed font-light">
                                        {project.description}
                                    </p>

                                    {/* Links */}
                                    <div className="flex gap-5 pt-1">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="link-accent"
                                        >
                                            View Project
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                        </a>
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="link-accent"
                                        >
                                            <Github className="w-3.5 h-3.5" />
                                            Source
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View More */}
                <div className="mt-16 flex justify-center">
                    <a
                        href="https://github.com/DanielChahine0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-accent text-muted-foreground text-sm"
                    >
                        View all projects on GitHub
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    )
}
