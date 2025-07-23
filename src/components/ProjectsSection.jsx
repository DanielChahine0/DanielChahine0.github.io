import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
    {
        id: 1,
        title: 'Think Board',
        description: 'A full-stack web application for capturing notes, brainstorming ideas, and organizing projects in real time.',
        image: '/projects/project1.png',
        tags: ['React', 'JavaScript', 'CSS'],
        link: 'https://webapp-think-board.onrender.com/',
        githubUrl: 'https://github.com/DanielChahine0/Webapp-Think_Board',
    },
    {
        id: 2,
        title: 'Project 2',
        description: 'This is a brief description of Project One.',
        image: '/projects/project2.png',
        tags: ['React', 'JavaScript', 'CSS'],
        link: 'https://example.com/project-one',
        githubUrl: '#',
    },
    {
        id: 3,
        title: 'Project 3',
        description: 'This is a brief description of Project One.',
        image: '/projects/project3.png',
        tags: ['React', 'JavaScript', 'CSS'],
        link: 'https://example.com/project-one',
        githubUrl: '#',
    }

]

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Featured Projects
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    here is a selection of my recent work. Each project showcases my skills and creativity in web development.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, key) => (
                        <div key={key} className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
                            <div className="h-48 overflow-hidden">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                            </div >
                                
                            <div className="p-3">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {project.tags.map((tag) => (
                                        <span className="px-2 py-1 text-xs font-medium bg-primary/20 border rounded-full background-secondary text-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            

                                <h3 className="text-xl font-semibold mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    {project.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-3">
                                        <a 
                                            href={project.link} 
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                            target="_blank">
                                        <ExternalLink size={20}/> 
                                        </a>
                                        <a 
                                            href={project.githubUrl} 
                                            target="_blank"
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                        >
                                            <Github size={20}/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a className="cosmic-button w-fit flex items-center mx-auto gap-2" href="https://github.com/DanielChahine0" target="_blank">
                        Check My Github <ArrowRight size={16}/>
                    </a>
                </div>
            </div>
        </section>
    );
}