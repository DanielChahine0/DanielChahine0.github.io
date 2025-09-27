/**
 * BlogCard.jsx
 * Small card component that renders a blog summary used in lists/grids.
 * Handles keyboard accessibility and navigates to the blog detail page.
 * Exports: BlogCard (React component)
 */
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formatDate } from "../lib/utils";

export function BlogCard({ blog, index }) {
    const navigate = useNavigate();
    
    if (!blog) {
        return null;
    }

    const handleReadMore = () => {
        navigate(`/blogs/blog/${blog.id}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleReadMore();
        }
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card/80 backdrop-blur-md rounded-xl p-4 border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            onClick={handleReadMore}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Read more about ${blog.title}`}
        >
            <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {blog.title}
            </h3>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(blog.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{blog.readTime}</span>
                </div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3 mb-3">
                {blog.summary}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
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
