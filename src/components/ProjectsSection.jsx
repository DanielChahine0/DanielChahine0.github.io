/**
 * ProjectsSection.jsx
 * Renders a grid of featured projects with images, tags and links to
 * live demos and source repositories.
 * Exports: ProjectsSection (React component)
 */
import { ArrowRight, ExternalLink, Github, FolderOpen } from "lucide-react";
import { cn } from '@/lib/utils';

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
        description: 'A fitness tracker that logs calories, workouts, and progress, with tools for coaches to create plans, track client performance, and provide feedback.',
        image: '/projects/project3.png',
        tags: ['HTML', 'JavaScript', 'Python', 'Flask'],
        link: 'https://example.com/project-one',
        githubUrl: 'https://github.com/EECS3311F24/project-fit-coach',
    }
]

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-0 px-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto max-w-7xl">
                {/* Enhanced Header */}
                <div className="text-center mb-10 section-fade-in">
                    <div className="inline-flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                            <FolderOpen size={32} className="text-primary"/>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            Featured Projects
                        </h2>
                    </div>
                </div>

                {/* Enhanced Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => {
                        return (
                            <div 
                                key={project.id} 
                                className={cn(
                                    "group enhanced-gradient-border overflow-hidden card-hover section-fade-in",
                                    index === 1 && "stagger-delay-1",
                                    index === 2 && "stagger-delay-2"
                                )}
                            >
                                {/* Project Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                    />
                                    
                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                                        <a 
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-110"
                                            title="View Live Demo"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                        <a 
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full bg-card text-foreground hover:bg-card/90 transition-all duration-300 hover:scale-110"
                                            title="View Source Code"
                                        >
                                            <Github className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                                        
                                {/* Project Content */}
                                <div className="p-6 space-y-4">
                                    {/* Tech Stack Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span 
                                                key={tag}
                                                className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/30 transition-all duration-300 hover:bg-primary/30 hover:scale-105"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                

                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Action Links */}
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex space-x-3">
                                            <a 
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium transition-all duration-300 hover:bg-primary/20 hover:scale-105"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                <span className="text-sm">Demo</span>
                                            </a>
                                            <a 
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border/50 rounded-lg font-medium transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:scale-105"
                                            >
                                                <Github className="w-4 h-4" />
                                                <span className="text-sm">Code</span>
                                            </a>
                                        </div>
                                        
                                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-10 section-fade-in stagger-delay-3">
                    <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                        <h3 className="text-xl font-semibold text-foreground">
                            Want to see more of my work?
                        </h3>
                        
                        <a 
                            href="https://github.com/DanielChahine0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="modern-button inline-flex items-center gap-2 group"
                        >
                            <Github className="w-4 h-4" />
                            <span>View All Projects</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}