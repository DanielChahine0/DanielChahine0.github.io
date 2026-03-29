/**
 * ProjectsSection.jsx
 * Editorial project showcase with featured hero project,
 * scroll-triggered reveals, and accent-colored interactions.
 */
import { ArrowUpRight, Github } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
    {
        id: 1,
        title: 'Intern Compass',
        description: 'An AI onboarding assistant that converts company documentation into a knowledge base, letting new employees get citation-backed answers through conversation.',
        image: null,
        tags: ['TypeScript', 'AI', 'RAG'],
        link: 'https://intern-compass-frontend.onrender.com',
        githubUrl: 'https://github.com/DanielChahine0/Intern-Compass',
    },
    {
        id: 2,
        title: 'Wealth Planner OS',
        description: 'An AI-powered wealth planning engine using real-time Monte Carlo simulation, dynamic risk modeling, and adaptive strategy optimization.',
        image: null,
        tags: ['TypeScript', 'AI', 'Finance'],
        link: 'https://frontend-dusky-chi-44.vercel.app/',
        githubUrl: 'https://github.com/DanielChahine0/Wealth-Planner-OS',
    },
    {
        id: 3,
        title: 'Neuro',
        description: 'A macOS focus tracker with distraction detection, app blocking, and social accountability to help you stay productive.',
        image: null,
        tags: ['Swift', 'macOS', 'AI'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/Neuro',
    },
    {
        id: 4,
        title: 'Think Board',
        description: 'A full-stack web application for capturing notes, brainstorming ideas, and organizing projects in real time.',
        image: '/projects/project1.png',
        tags: ['React', 'Express', 'MongoDB'],
        link: 'https://webapp-think-board.onrender.com/',
        githubUrl: 'https://github.com/DanielChahine0/Webapp-Think_Board',
    },
    {
        id: 5,
        title: 'Emotion Prediction',
        description: 'Fine-tunes GPT-2 on DailyDialog chats to predict the next emotion in a conversation using PyTorch and Hugging Face.',
        image: null,
        tags: ['Python', 'PyTorch', 'NLP'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/Emotion-Prediction',
    },
    {
        id: 6,
        title: 'Savour',
        description: 'A hackathon project built at ConUHacks 2026 — a food-focused web application for discovering and sharing recipes.',
        image: null,
        tags: ['TypeScript', 'Hackathon'],
        link: 'https://www.savourapp.tech',
        githubUrl: 'https://github.com/DanielChahine0/savour-conuhacks-2026',
    },
    {
        id: 7,
        title: 'YU Trade',
        description: 'A verified campus marketplace for York University where students and faculty can buy and sell items within a trusted community.',
        image: null,
        tags: ['Python', 'Full-Stack'],
        link: 'https://yu-trade.vercel.app',
        githubUrl: 'https://github.com/DanielChahine0/YUTrade',
    },
    {
        id: 8,
        title: 'Fix The 6ix',
        description: 'A civic tech project for reporting and tracking urban infrastructure issues across the Greater Toronto Area.',
        image: null,
        tags: ['TypeScript', 'Civic Tech'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/FixThe6ix',
    },
    {
        id: 9,
        title: 'My Calendar',
        description: 'A self-hosted Google Calendar-style web app with drag-and-drop scheduling, multi-view layouts, and recurring events.',
        image: '/projects/project2.png',
        tags: ['JavaScript', 'PHP', 'PostgreSQL'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/Webapp-MyCalendar',
    },
    {
        id: 10,
        title: 'Fitness Website',
        description: 'A fitness platform with calorie calculator, customizable workout programs, diet tips, and progress tracking tools.',
        image: '/projects/project3.png',
        tags: ['Python', 'Flask', 'JavaScript'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/Fitness_website',
    },
    {
        id: 11,
        title: 'Visual Debugger',
        description: 'A visual debugging tool that helps developers step through and understand code execution flow graphically.',
        image: null,
        tags: ['TypeScript', 'Dev Tools'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/visualDebugger',
    },
    {
        id: 12,
        title: 'Weather Trend Forecasting',
        description: 'Analyzes global daily climate data with anomaly detection, time-series forecasting, spatial visualization, and environmental insights.',
        image: null,
        tags: ['Python', 'FastAPI', 'PostgreSQL'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/PM-Accelerator-Data-Science-Assessment',
    },
    {
        id: 13,
        title: 'Weather App',
        description: 'Full-stack weather application with real-time API integration, 5-day forecasts, CRUD persistence, and location-based insights.',
        image: null,
        tags: ['Python', 'Full-Stack', 'API'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/PM-Accelerator-Full-Stack-Assessment',
    },
    {
        id: 14,
        title: 'Webpage Resource Analyzer',
        description: 'Fetches a webpage, identifies all embedded resources, and calculates their individual and total sizes with redirect handling.',
        image: null,
        tags: ['JavaScript', 'Networking'],
        link: 'https://danielchahine0.github.io/Webpage-Resource-Fetch-Analyzer/',
        githubUrl: 'https://github.com/DanielChahine0/Webpage-Resource-Fetch-Analyzer',
    },
    {
        id: 15,
        title: 'eCommerce Store',
        description: 'A full-featured eCommerce web application with product browsing, cart management, and checkout functionality.',
        image: null,
        tags: ['JavaScript', 'Full-Stack'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/eCommerce',
    },
    {
        id: 16,
        title: 'Chess 2D',
        description: 'A fully playable 2D chess game with all standard rules, piece movement validation, and game state management.',
        image: null,
        tags: ['Python', 'Pygame'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/Game-Chess_2D',
    },
    {
        id: 17,
        title: 'Platformer Game',
        description: 'A Pygame platformer with four switchable characters, double-jumping, tile levels, collectible fruit, and a lives system.',
        image: null,
        tags: ['Python', 'Pygame'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/Game-Platformer',
    },
    {
        id: 18,
        title: 'MindMaze',
        description: 'Quest for Genius — a puzzle game combining math, logic, and coding challenges into an interactive adventure.',
        image: null,
        tags: ['Python', 'Game'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/Game-MindMaze',
    },
    {
        id: 19,
        title: 'Flappy Bird',
        description: 'A browser-based Flappy Bird clone with smooth physics, score tracking, and responsive controls.',
        image: null,
        tags: ['HTML', 'JavaScript', 'Game'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/Game-Flappy_Bird_2D',
    },
    {
        id: 20,
        title: 'Pong',
        description: 'A classic Pong game recreation with two-player support, score tracking, and adjustable difficulty.',
        image: null,
        tags: ['HTML', 'JavaScript', 'Game'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/Game-Pong_2D',
    },
    {
        id: 21,
        title: 'Snake Game',
        description: 'The classic Snake game built with Pygame — eat, grow, and try not to crash into yourself.',
        image: null,
        tags: ['Python', 'Pygame'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/Game-Snake_2D',
    },
    {
        id: 22,
        title: 'Design Patterns',
        description: 'Open-source Java examples for classic design patterns inspired by Head First Design Patterns.',
        image: null,
        tags: ['Java', 'Design Patterns'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/Examples-Design_Patterns',
    },
    {
        id: 23,
        title: 'Turing Machines',
        description: 'A curated collection of educational Turing Machines in YAML with step-by-step READMEs and interactive demos.',
        image: null,
        tags: ['YAML', 'Theory', 'Education'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/Examples-Turing_Machine',
    },
    {
        id: 24,
        title: 'WebGL Examples',
        description: 'A collection of WebGL programming examples demonstrating 3D rendering, shaders, and graphics fundamentals.',
        image: null,
        tags: ['JavaScript', 'WebGL', '3D'],
        link: null,
        githubUrl: 'https://github.com/DanielChahine0/Examples-WebGL',
    },
]

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
        transition: { staggerChildren: 0.15 },
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

const FeaturedProject = ({ project }) => {
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
            className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
            {/* Featured image with parallax */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[380px] overflow-hidden rounded-lg bg-muted border border-border">
                {project.image ? (
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ y: imageY }}
                        draggable={false}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span
                            className="font-display text-[6rem] md:text-[8rem] font-bold leading-none select-none opacity-10"
                            style={{ color: "var(--accent-color)" }}
                        >
                            {project.title.charAt(0)}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />

                {/* Hover overlay links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-5 py-2.5 bg-background/95 backdrop-blur-sm rounded-md text-sm font-medium text-foreground hover:bg-background transition-colors shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Live
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                    )}
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-5 py-2.5 bg-background/95 backdrop-blur-sm rounded-md text-sm font-medium text-foreground hover:bg-background transition-colors shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Github className="w-3.5 h-3.5" />
                        Code
                    </a>
                </div>

                {/* Large number watermark */}
                <span
                    className="font-code absolute -bottom-6 -right-2 text-[8rem] font-bold leading-none select-none pointer-events-none z-0"
                    style={{ color: "var(--accent-color)", opacity: 0.06 }}
                    aria-hidden="true"
                >
                    01
                </span>
            </div>

            {/* Featured text content */}
            <div className="flex flex-col justify-center space-y-5">
                {/* Tags */}
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

                {/* Title */}
                <h3 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed font-light max-w-md">
                    {project.description}
                </p>

                {/* Links */}
                <div className="flex gap-6 pt-2">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-accent"
                        >
                            View Project
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                    )}
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
        </motion.article>
    );
};

const ProjectCard = ({ project, index }) => {
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
            {/* Project number */}
            <span
                className="font-code absolute -top-4 -left-1 text-7xl font-bold leading-none select-none pointer-events-none z-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ color: "var(--accent-color)", opacity: 0.08 }}
                aria-hidden="true"
            >
                {String(index + 2).padStart(2, '0')}
            </span>

            <div className="relative z-10">
                {/* Project Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-5 bg-muted border border-border">
                    {project.image ? (
                        <motion.img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ y: imageY }}
                            draggable={false}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span
                                className="font-display text-[5rem] font-bold leading-none select-none opacity-10"
                                style={{ color: "var(--accent-color)" }}
                            >
                                {project.title.charAt(0)}
                            </span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />

                    {/* Hover overlay links */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.link && (
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
                        )}
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
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-accent"
                            >
                                View Project
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        )}
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
        </motion.article>
    );
};

export const ProjectsSection = () => {
    const [featured, ...rest] = projects;

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
                    <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                        Featured Projects
                    </h2>
                </motion.div>

                {/* Featured Project — large editorial layout */}
                <motion.div
                    className="mb-16"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    <FeaturedProject project={featured} />
                </motion.div>

                {/* Remaining Projects Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-10"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {rest.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </motion.div>

                {/* View More */}
                <motion.div
                    className="mt-16 flex justify-center"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <a
                        href="https://github.com/DanielChahine0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-accent text-muted-foreground text-sm"
                    >
                        View all projects on GitHub
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
