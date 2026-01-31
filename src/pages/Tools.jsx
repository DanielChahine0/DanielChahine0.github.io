/**
 * Tools.jsx
 * Clean, minimal tools hub page
 */
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Calculator, Clock, Calendar, ArrowUpRight, FileText, Palette, FileSearch,
    User, Image, Code
} from "lucide-react";

function ToolCard({ tool, index }) {
    const IconComponent = tool.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
        >
            <Link
                to={tool.path}
                className="group block h-full"
                aria-label={`Open ${tool.title} tool`}
            >
                <div className="h-full p-6 border border-border rounded-lg hover:border-foreground/20 transition-all duration-200">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-secondary rounded-md">
                            <IconComponent className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium mb-2 group-hover:opacity-70 transition-opacity">
                                {tool.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {tool.description}
                            </p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function Tools() {
    const tools = [
        {
            title: "Calorie Tracker",
            description: "Track your daily calorie intake and monitor your nutrition goals.",
            icon: Calculator,
            path: "/tools/calorie-tracker"
        },
        {
            title: "Clock & Timer",
            description: "Digital clock with Pomodoro timer for productivity.",
            icon: Clock,
            path: "/tools/clock-timer"
        },
        {
            title: "Life in Weeks",
            description: "Visualize your life as a grid of weeks.",
            icon: Calendar,
            path: "/tools/life-in-weeks"
        },
        {
            title: "Markdown Editor",
            description: "Write markdown with live preview and export options.",
            icon: FileText,
            path: "/tools/markdown-editor"
        },
        {
            title: "Color Picker",
            description: "Create color palettes with various color modes.",
            icon: Palette,
            path: "/tools/color-picker"
        },
        {
            title: "Text Analyzer",
            description: "Analyze text for word count, reading time, and more.",
            icon: FileSearch,
            path: "/tools/text-analyzer"
        },
        {
            title: "Resume Builder",
            description: "Create professional resumes with customizable templates.",
            icon: User,
            path: "/tools/resume-builder"
        },
        {
            title: "Image Editor",
            description: "Edit images with filters and adjustments.",
            icon: Image,
            path: "/tools/image-editor"
        },
        {
            title: "Code Editor",
            description: "Online HTML, CSS, and JavaScript editor with live preview.",
            icon: Code,
            path: "/tools/code-playground"
        },
    ];

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background">
                <NavBar />
                <main className="flex-1 pt-24 pb-16 px-6">
                    <div className="container mx-auto max-w-6xl">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mb-12"
                        >
                            <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                                Tools
                            </h1>
                            <p className="text-muted-foreground max-w-lg">
                                A collection of useful tools I've built for productivity and development.
                            </p>
                        </motion.div>

                        {/* Tools Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tools.map((tool, index) => (
                                <ToolCard key={tool.title} tool={tool} index={index} />
                            ))}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}
