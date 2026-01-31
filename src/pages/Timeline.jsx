/**
 * Timeline.jsx
 * Clean, minimal timeline page
 */
import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";

const timelineEvents = [
    {
        year: "July 2025",
        title: "Hack the 6ix - Hackathon",
        description:
            "I supported hackathon operations by managing check-ins, guiding participants, ensuring safety, and assisting with event logistics for a seamless experience.",
        category: "Extracurricular",
    },
    {
        year: "January 2025",
        title: "Smart Recipe - Frontend",
        description:
            "I created Smart Recipe, a recipe assistant application that generates personalized recipes from photos or ingredients, offers meal planning, integrates with grocery stores, and supports social sharing to reduce food waste and enhance cooking experiences.",
        category: "Project",
    },
    {
        year: "September 2024",
        title: "Fit Coach - Fullstack",
        description:
            "I developed a fitness coaching app that provides personalized workout plans and nutrition tracking.",
        category: "Project",
    },
    {
        year: "April 2024",
        title: "AI Emotion Prediction Model - Research",
        description:
            "I created an AI-driven emotion prediction model by fine-tuning GPT-2 on the Daily Dialogue dataset to forecast the next emotion in a conversation based on text input.",
        category: "Experience",
    },
    {
        year: "December 2023",
        title: "Learning Linux Shell Scripting",
        description:
            "I earned a Certificate of Completion in Learning Linux Shell Scripting, showcasing my ability to write, automate, and manage tasks using shell scripts in a Linux environment.",
        category: "Education",
    },
    {
        year: "November 2023",
        title: "Learning Linux Command Line",
        description:
            "I earned a Certificate of Completion in Learning Linux Command Line, demonstrating proficiency in navigating, managing files, and executing commands within the Linux environment.",
        category: "Education",
    },
    {
        year: "October 2023",
        title: "A+i Learning - Fullstack",
        description:
            "I created A+i Learning during UNHack 2023, an AI-powered learning platform designed to personalize education by providing adaptive content and interactive resources for an engaging learning experience.",
        category: "Project",
    },
    {
        year: "August 2023",
        title: "Mind Maze - Game Development",
        description:
            "I created MindMaze, an educational adventure game built with Unity that combines fun and learning by challenging players with mathematics, logic, and computer science puzzles in a vibrant, interactive maze.",
        category: "Project",
    },
    {
        year: "June 2023",
        title: "Platformer - Game Development",
        description:
            "I created a classic 2D platformer game where players choose unique characters to explore levels, collect fruits, and avoid traps with responsive controls and vibrant animations.",
        category: "Project",
    },
    {
        year: "April 2023",
        title: "Jarvis Ambassador",
        description:
            "I served as a Jarvis Student Ambassador, promoting the company at York University by organizing career fairs and events to connect students with IT job opportunities.",
        category: "Extracurricular",
    },
    {
        year: "March 2023",
        title: "Open House - Organizer",
        description:
            "I helped organize a York University open house for Computer Science and Engineering students, ensuring smooth execution and providing key information on programs and opportunities.",
        category: "Extracurricular",
    },
    {
        year: "November 2022",
        title: "Private Tutor",
        description:
            "Tutored over 100 students from high-school to university level, specializing in math, sciences, computer science, and robotics, with guidance in coursework and test preparation.",
        category: "Experience",
    },
    {
        year: "September 2022",
        title: "York University - Computer Science",
        description:
            "I am pursuing a Bachelor of Science in Computer Science at the Lassonde School of Engineering, York University (Sep 2022 - Apr 2026), developing strong skills in programming, problem-solving, and analytical thinking, along with experience in public relations, social media, and additional technical competencies.",
        category: "Education",
    },
];

const categories = [
    { name: "All", color: null },
    { name: "Extracurricular", color: "#6366f1" },
    { name: "Experience", color: "#10b981" },
    { name: "Project", color: "#f59e42" },
    { name: "Education", color: "#f43f5e" },
];

export const Timeline = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredEvents =
        selectedCategory === "All"
            ? timelineEvents
            : timelineEvents.filter((event) => event.category === selectedCategory);

    return (
        <PageTransition className="min-h-screen bg-background text-foreground">
            <NavBar />

            <main className="pt-24 pb-16 px-6">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                            Timeline
                        </h1>
                        <p className="text-muted-foreground">
                            A chronological view of my journey in tech.
                        </p>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap gap-2 mb-12"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`px-4 py-2 text-sm rounded-md border transition-all duration-200 ${
                                    selectedCategory === cat.name
                                        ? "bg-foreground text-background border-foreground"
                                        : "bg-transparent text-muted-foreground border-border hover:border-foreground/50"
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </motion.div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />

                        {/* Timeline Events */}
                        <div className="space-y-12">
                            {filteredEvents.map((event, index) => {
                                const cat = categories.find(c => c.name === event.category);
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`relative pl-8 md:pl-0 ${
                                            index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                                        }`}
                                    >
                                        {/* Dot */}
                                        <div
                                            className="absolute left-0 md:left-1/2 top-2 w-3 h-3 rounded-full transform md:-translate-x-1/2 border-2 border-background"
                                            style={{ backgroundColor: cat?.color || "#171717" }}
                                        />

                                        {/* Content */}
                                        <div className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                                            <div className="p-6 border border-border rounded-lg hover:border-foreground/20 transition-colors">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-sm text-muted-foreground">
                                                        {event.year}
                                                    </span>
                                                    <span
                                                        className="px-2 py-0.5 text-xs rounded-full text-white"
                                                        style={{ backgroundColor: cat?.color || "#171717" }}
                                                    >
                                                        {event.category}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-medium mb-2 text-left">
                                                    {event.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground text-left">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {filteredEvents.length === 0 && (
                            <p className="text-center text-muted-foreground py-12">
                                No events found for this category.
                            </p>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </PageTransition>
    );
};
