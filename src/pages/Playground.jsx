
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, Clock, Calendar, ArrowRight, FileText, Palette, FileSearch } from "lucide-react";

// ToolCard component for better separation of concerns
function ToolCard({ tool, index }) {
    const IconComponent = tool.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link
                to={tool.path}
                aria-label={`Open ${tool.title} tool`}
                tabIndex={0}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 rounded-lg group"
            >
                <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-indigo-300 focus-within:border-indigo-400 flex flex-col h-full">
                    <div className={`${tool.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                        <IconComponent className="text-white" size={28} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{tool.title}</h3>
                    <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                        {tool.description}
                    </p>
                    <span className="sr-only">Go to {tool.title}</span>
                    <button
                        className="mt-auto px-4 py-2 bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all text-sm font-medium opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                        tabIndex={-1}
                        aria-label={`Try out ${tool.title}`}
                    >
                        Try it out <ArrowRight className="inline ml-1" size={16} />
                    </button>
                </div>
            </Link>
        </motion.div>
    );
}


export default function Playground() {
    const tools = [
        {
            title: "Calorie Tracker",
            description: "Track your daily calorie intake and monitor your nutrition goals with an easy-to-use interface.",
            icon: Calculator,
            path: "/playground/calorie-tracker",
            color: "bg-green-500"
        },
        {
            title: "Clock & Timer",
            description: "A digital clock with a built-in Pomodoro timer to help you stay productive and manage your time.",
            icon: Clock,
            path: "/playground/clock-timer",
            color: "bg-blue-500"
        },
        {
            title: "Life in Weeks",
            description: "Visualize your entire life as a grid of weeks to gain perspective on time and make every week count.",
            icon: Calendar,
            path: "/playground/life-in-weeks",
            color: "bg-purple-500"
        },
        {
            title: "Markdown Editor",
            description: "A powerful markdown editor with live preview, syntax highlighting, and export capabilities to MD and PDF.",
            icon: FileText,
            path: "/playground/markdown-editor",
            color: "bg-orange-500"
        },
        {
            title: "Color Picker",
            description: "Create color palettes with complementary colors and HEX/RGB/HSB modes.",
            icon: Palette,
            path: "/playground/color-picker",
            color: "bg-pink-500"
        },
        {
            title: "Text Analyzer",
            description: "Analyze your text for word count, character count, reading time, and sentiment.",
            icon: FileSearch,
            path: "/playground/text-analyzer",
            color: "bg-teal-500"
        },
    ];

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
                <NavBar />
                <main className="mt-10 flex-1 container mx-auto px-4 py-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-4xl font-bold mb-4 tracking-tight text-foreground">
                            Playground
                        </h1>
                        <p className="text-lg text-foreground/80 mb-12">
                            Welcome to the Playground! Explore these interactive tools and experiences.
                        </p>


                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tools.map((tool, index) => (
                                <ToolCard key={tool.title} tool={tool} index={index} />
                            ))}
                        </div>

                        {/* More Coming Soon section */}
                        <div className="mt-16 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-400 via-fuchsia-400 to-pink-400 flex items-center justify-center animate-pulse mb-4">
                                <span className="text-white text-3xl font-bold" aria-hidden="true">+</span>
                                <span className="sr-only">More tools coming soon</span>
                            </div>
                            <p className="text-foreground/60 text-base">More tools coming soon!</p>
                        </div>
                    </motion.div>
                </main>
                <Footer />
            </div>
            {/* Subtle hover effect for ToolCard */}
            <style>{`
                .group:hover .group-hover\\:scale-110 { transform: scale(1.10) rotate(6deg); }
                .group:focus-within .group-hover\\:scale-110 { transform: scale(1.10) rotate(6deg); }
            `}</style>
        </PageTransition>
    );
}
