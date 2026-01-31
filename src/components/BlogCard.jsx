/**
 * BlogCard.jsx
 * Clean, minimal blog card component
 */
import { ArrowUpRight } from "lucide-react";
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group cursor-pointer"
            onClick={handleReadMore}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Read more about ${blog.title}`}
        >
            <div className="space-y-3">
                {/* Date */}
                <p className="text-sm text-muted-foreground">
                    {formatDate(blog.date)}
                </p>

                {/* Title */}
                <h3 className="text-lg font-medium group-hover:opacity-70 transition-opacity line-clamp-2">
                    {blog.title}
                </h3>

                {/* Summary */}
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {blog.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                            key={tagIndex}
                            className="text-xs text-muted-foreground"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Read More */}
                <span className="inline-flex items-center gap-1 text-sm font-medium">
                    Read more
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
            </div>
        </motion.article>
    );
}
