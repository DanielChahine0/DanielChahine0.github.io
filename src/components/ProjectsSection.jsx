/**
 * ProjectsSection.jsx
 * Clean, image-forward grid of featured projects
 */
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
    {
        id: 1,
        title: 'Think Board',
        description: 'A full-stack web application for capturing notes, brainstorming ideas, and organizing projects in real time.',
        image: '/projects/project1.png',
        tags: ['React', 'JavaScript', 'Express', 'MongoDB'],
        link: 'https://webapp-think-board.onrender.com/',
        githubUrl: 'https://github.com/DanielChahine0/Webapp-Think_Board',
    },
    {
        id: 2,
        title: 'My Calendar',
        description: 'A modern calendar application inspired by Google Calendar, designed for scheduling and event management.',
        image: '/projects/project2.png',
        tags: ['JavaScript', 'PHP', 'PostgreSQL', 'XAMPP'],
        link: 'https://example.com/',
        githubUrl: 'https://github.com/DanielChahine0/Webapp-MyCalendar',
    },
    {
        id: 3,
        title: 'Fit Coach',
        description: 'A fitness tracker that logs calories, workouts, and progress, with tools for coaches to create plans and track client performance.',
        image: '/projects/project3.png',
        tags: ['HTML', 'JavaScript', 'Python', 'Flask'],
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
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                        Featured Work
                    </h2>
                    <p className="text-muted-foreground max-w-lg">
                        A selection of projects I've built, from web applications to productivity tools.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <article
                            key={project.id}
                            className="group"
                        >
                            {/* Project Image */}
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4 bg-muted">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                            </div>

                            {/* Project Info */}
                            <div className="space-y-3">
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs text-muted-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-medium">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Links */}
                                <div className="flex gap-4 pt-2">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm font-medium hover:opacity-70 transition-opacity"
                                    >
                                        View Project
                                        <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <Github className="w-4 h-4" />
                                        Code
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View More Link */}
                <div className="mt-16 text-center">
                    <a
                        href="https://github.com/DanielChahine0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        View all projects on GitHub
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    )
}
