import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formatDate } from "../lib/utils";

// Latest blog posts (latest 3)
const latestBlogs = [
    {
        id: 3,
        title: "Web Performance Optimization: A Complete Guide",
        date: "2025-08-08",
        summary: "Learn essential strategies and techniques to optimize your web applications for maximum speed and efficiency. Covers Core Web Vitals, frontend optimization, backend performance strategies, and monitoring tools.",
        readTime: "15 min",
        tags: ["Web Performance", "Optimization"],
        filename: "blog3.md"
    },
    {
        id: 2,
        title: "Modern React Development: Best Practices and Patterns",
        date: "2025-08-07",
        summary: "Explore the latest best practices, patterns, and techniques for building scalable, maintainable, and performant React applications. Learn about modern hooks, state management, and development workflow.",
        readTime: "12 min",
        tags: ["React", "JavaScript", "Frontend"],
        filename: "blog2.md"
    },
    {
        id: 1,
        title: "Introduction to Computer Security",
        date: "2025-08-07",
        summary: "This blog covers the fundamentals of cybersecurity. An overview of digital threats and the importance of security, then explains key cryptographic tools used to protect data.",
        readTime: "3 hours",
        tags: ["Computer Security"],
        filename: "blog1.md"
    }
];

function BlogCard({ blog, index }) {
    const navigate = useNavigate();
    
    const handleReadMore = () => {
        navigate(`/blogs/blog/${blog.id}`);
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card/80 backdrop-blur-md rounded-xl p-6 border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            onClick={handleReadMore}
        >
            <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {blog.title}
            </h3>

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

            <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3 mb-4">
                {blog.summary}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all duration-200">
                Read More
                <ArrowRight size={14} />
            </div>
        </motion.article>
    );
}

export const BlogsSection = () => {
    return (
        <section id="blogs" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <BookOpen className="text-primary" size={32} />
                        <h2 className="text-3xl md:text-4xl font-bold">
                            My Blogs
                        </h2>
                    </div>

                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Insights, tutorials, and thoughts on web development, technology, and programming. 
                        Stay updated with my latest articles and technical discoveries.
                    </p>
                </div>

                {/* Latest 3 Blog Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {latestBlogs.map((blog, index) => (
                        <BlogCard key={blog.id} blog={blog} index={index} />
                    ))}
                </div>

                {/* View All Blogs Button */}
                <div className="text-center">
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        View All Blogs
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};
