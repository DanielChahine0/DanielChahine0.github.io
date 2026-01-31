/**
 * BlogsSection.jsx
 * Clean, minimal blog section
 */
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getLatestBlogs } from "../data/blogs";

export const BlogsSection = () => {
    const latestBlogs = getLatestBlogs(3);

    return (
        <section id="blogs" className="py-24 px-6 bg-card">
            <div className="container mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                        Writing
                    </h2>
                    <p className="text-muted-foreground max-w-lg">
                        Thoughts on development, technology, and learning.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestBlogs.map((blog) => (
                        <Link
                            key={blog.id}
                            to={`/blogs/blog/${blog.id}`}
                            className="group block"
                        >
                            <article className="space-y-3">
                                {/* Date */}
                                <p className="text-sm text-muted-foreground">
                                    {blog.date}
                                </p>

                                {/* Title */}
                                <h3 className="text-lg font-medium group-hover:opacity-70 transition-opacity">
                                    {blog.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                                    {blog.excerpt}
                                </p>

                                {/* Read More */}
                                <span className="inline-flex items-center gap-1 text-sm font-medium">
                                    Read more
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </span>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* View All Link */}
                <div className="mt-16 text-center">
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-md font-medium hover:opacity-80 transition-opacity"
                    >
                        View All Posts
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
