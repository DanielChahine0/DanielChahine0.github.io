import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

// Simulated blog data
const blogPosts = [
    // {
    //     id: 1,
    //     title: "Building Scalable React Applications with Modern Patterns",
    //     date: "2024-12-15",
    //     summary: "Explore advanced React patterns including custom hooks, context optimization, and component composition techniques that help build maintainable and scalable applications.",
    //     readTime: "8 min read",
    //     tags: ["React", "JavaScript", "Architecture"]
    // },
];

function BlogCard({ blog, index }) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card/80 backdrop-blur-md rounded-2xl p-6 border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-1"
        >
            <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <h2 className="text-xl font-bold mb-3 text-foreground hover:text-primary transition-colors">
                {blog.title}
            </h2>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(blog.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{blog.readTime}</span>
                </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
                {blog.summary}
            </p>

            <a
                href="#"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors group"
            >
                Read More
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
        </motion.article>
    );
}

export const Blogs = () => {
    // Sort blogs by date (newest first)
    const sortedBlogs = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <PageTransition className="min-h-screen bg-background text-foreground">
            <NavBar />
            
            <main className="pt-20 pb-12">
                <div className="container mx-auto max-w-6xl px-4">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <BookOpen className="text-primary" size={40} />
                            <h1 className="text-4xl md:text-5xl font-bold">
                                My Blogs
                            </h1>
                        </div>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Welcome to my blog! Here you'll find articles about web development, programming tutorials, 
                            technology insights, and my journey as a software developer.
                        </p>
                    </motion.div>

                    {/* Blog Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-12"
                    >
                        <div className="bg-card/60 backdrop-blur-md rounded-xl px-6 py-3 border border-border/50">
                            <span className="text-sm text-muted-foreground">
                                {sortedBlogs.length} articles published
                            </span>
                        </div>
                    </motion.div>

                    {/* Blog Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {sortedBlogs.map((blog, index) => (
                            <BlogCard key={blog.id} blog={blog} index={index} />
                        ))}
                    </div>

                    {/* Empty State Message (if no blogs) */}
                    {sortedBlogs.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <BookOpen className="mx-auto mb-4 text-muted-foreground" size={48} />
                            <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
                            <p className="text-muted-foreground">Check back soon for new articles!</p>
                        </motion.div>
                    )}
                </div>
            </main>

            <Footer />
        </PageTransition>
    );
};
