import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, Clock, Calendar, ArrowRight } from "lucide-react";

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
        }
    ];

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background">
                <NavBar />
                <main className="flex-1 container mx-auto px-4 py-8">
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
                        
                        <div className="grid md:grid-cols-3 gap-6">
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
                                                
                                                <div className="flex items-center justify-center text-blue-500 group-hover:text-blue-600 transition-colors">
                                                    <span className="text-sm font-medium">Try it out</span>
                                                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                        >
                            <h2 className="text-2xl font-semibold mb-2">More Coming Soon!</h2>
                            <p className="text-foreground/70">
                                I'm constantly working on new tools and experiences. Check back regularly for updates!
                            </p>
                        </motion.div>
                    </motion.div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}
