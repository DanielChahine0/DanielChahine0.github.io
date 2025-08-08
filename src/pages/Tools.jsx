
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    Calculator, Clock, Calendar, ArrowRight, FileText, Palette, FileSearch,
    User, Image, Globe, Code
} from "lucide-react";

// ToolCard component for better separation of concerns
function ToolCard({ tool, index }) {
    const IconComponent = tool.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
        >
            <Link
                to={tool.path}
                aria-label={`Open ${tool.title} tool`}
                tabIndex={0}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-2xl group"
            >
                <div className="bg-card/80 backdrop-blur-md rounded-2xl p-5 border border-border/50 shadow-lg shadow-black/5 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/60 group focus-within:border-primary/80">
                    <div className="bg-primary w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                        <IconComponent className="text-primary-foreground" size={30} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-foreground text-center">{tool.title}</h3>
                    <p className="text-foreground/70 text-sm mb-4 leading-relaxed text-center">
                        {tool.description}
                    </p>
                    <span className="sr-only">Go to {tool.title}</span>
                    <button
                        className="mt-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all text-sm font-medium opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
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


export default function Tools() {
    const tools = [
        {
            title: "Calorie Tracker",
            description: "Track your daily calorie intake and monitor your nutrition goals with an easy-to-use interface.",
            icon: Calculator,
            path: "/tools/calorie-tracker",
            color: "bg-green-500"
        },
        {
            title: "Clock & Timer",
            description: "A digital clock with a built-in Pomodoro timer to help you stay productive and manage your time.",
            icon: Clock,
            path: "/tools/clock-timer",
            color: "bg-blue-500"
        },
        {
            title: "Life in Weeks",
            description: "Visualize your entire life as a grid of weeks to gain perspective on time and make every week count.",
            icon: Calendar,
            path: "/tools/life-in-weeks",
            color: "bg-purple-500"
        },
        {
            title: "Markdown Editor",
            description: "A powerful markdown editor with live preview, syntax highlighting, and export capabilities to MD and PDF.",
            icon: FileText,
            path: "/tools/markdown-editor",
            color: "bg-orange-500"
        },
        {
            title: "Color Picker",
            description: "Create color palettes with complementary colors and HEX/RGB/HSB modes.",
            icon: Palette,
            path: "/tools/color-picker",
            color: "bg-pink-500"
        },
        {
            title: "Text Analyzer",
            description: "Analyze your text for word count, character count, reading time, and sentiment.",
            icon: FileSearch,
            path: "/tools/text-analyzer",
            color: "bg-teal-500"
        },
        {
            title: "Resume Builder",
            description: "Create professional resumes with customizable templates and easy-to-use interface.",
            icon: User,
            path: "/tools/resume-builder",
            color: "bg-indigo-500"
        },
        {
            title: "Image Editor",
            description: "Edit images with filters, adjustments, and basic manipulation tools.",
            icon: Image,
            path: "/tools/image-editor",
            color: "bg-yellow-500"
        },
        {
            title: "Portfolio Generator",
            description: "Create stunning portfolio websites with templates and customizable themes.",
            icon: Globe,
            path: "/tools/portfolio-generator",
            color: "bg-cyan-500"
        },
        {
            title: "Code Editor",
            description: "Online code editor with live preview for HTML, CSS, and JavaScript.",
            icon: Code,
            path: "/tools/code-playground",
            color: "bg-violet-500"
        },
    ];

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
                <NavBar />
                <main className="mt-14 flex-1 container mx-auto px-2 py-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold mb-2 tracking-tight text-foreground">
                                Tools
                            </h1>
                            <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                                Welcome to the Tools section! Explore these interactive tools and utilities.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {tools.map((tool, index) => (
                                <ToolCard key={tool.title} tool={tool} index={index} />
                            ))}
                        </div>
                        {/* More Coming Soon section */}
                        <div className="mt-20 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary/60 via-primary/80 to-primary flex items-center justify-center animate-pulse mb-4">
                                <span className="text-primary-foreground text-3xl font-bold" aria-hidden="true">+</span>
                                <span className="sr-only">More tools coming soon</span>
                            </div>
                            <p className="text-foreground/60 text-base">More tools coming soon!</p>
                        </div>
                    </motion.div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}
