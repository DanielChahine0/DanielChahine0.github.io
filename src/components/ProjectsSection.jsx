import { ArrowRight, ExternalLink, Github } from "lucide-react";

function handleSpotlight(e, id) {
    const spotlight = document.getElementById('spotlight-' + id);
    if (!spotlight) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlight.style.background = `radial-gradient(circle 120px at ${x}px ${y}px, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)`;
}
function removeSpotlight(id) {
    const spotlight = document.getElementById('spotlight-' + id);
    if (spotlight) spotlight.style.background = 'none';
}

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
        tags: ['JavaScript', 'PHP', 'CSS', 'PostgreSQL', 'XAMPP'],
        link: 'https://example.com/',
        githubUrl: 'https://github.com/DanielChahine0/Webapp-MyCalendar',
    },
    {
        id: 3,
        title: 'Fit Coach',
        description: 'A fitness tracker that monitors calories, workouts, and progress, including features for coaches.',
        image: '/projects/project3.png',
        tags: ['HTML', 'JavaScript', 'CSS', 'Python', 'Flask'],
        link: 'https://example.com/project-one',
        githubUrl: 'https://github.com/EECS3311F24/project-fit-coach',
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
                    A selection of my recent work that showcases my skills in web development using 
                    React, Javascript, NodeJS, Express, PHP, HTML, and CSS.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, key) => (
                        <div key={key} className="group gradient-border overflow-hidden shadow-xs card-hover spotlight-hover" onMouseMove={e => handleSpotlight(e, 'project-' + key)} onMouseLeave={() => removeSpotlight('project-' + key)}>
                            <div className="spotlight-layer" id={'spotlight-project-' + key}></div>
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
                    <a className="cosmic-button w-fit flex items-center mx-auto gap-2" href="/timeline">
                        View my Timeline <ArrowRight size={16}/>
                    </a>
                </div>
            </div>
        </section>
    );
}