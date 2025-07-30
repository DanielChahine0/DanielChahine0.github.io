import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, Clock, Calendar, ArrowRight, FileText } from "lucide-react";

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
        }
    ];

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background">
                <NavBar />
                <main className="mt-10 flex-1 container mx-auto px-4 py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-4xl font-bold mb-4">Playground</h1>
                        <p className="text-lg text-foreground/80 mb-12">
                            Welcome to the Playground! Explore these interactive tools and experiences.
                        </p>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tools.map((tool, index) => {
                                const IconComponent = tool.icon;
                                return (
                                    <motion.div
                                        key={tool.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link to={tool.path}>
                                            <div className="bg-card rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                                                <div className={`${tool.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                                                    <IconComponent className="text-white" size={24} />
                                                </div>
                                                
                                                <h3 className="text-xl font-semibold mb-3">{tool.title}</h3>
                                                <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                                                    {tool.description}
                                                </p>
                                                
                                                {/* Removed 'Try it out' call-to-action */}
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                        
                        {/* Removed 'More Coming Soon!' section */}
                    </motion.div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}
