/**
 * BlogsSection.jsx
 * Editorial blog section with mono dates and refined typography.
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
                    <p className="section-label mb-5">Thoughts & Ideas</p>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                        Writing
                    </h2>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {latestBlogs.map((blog, i) => (
                        <Link
                            key={blog.id}
                            to={`/blogs/blog/${blog.id}`}
                            className="group block"
                        >
                            <article className="space-y-4 pb-8 border-b border-border">
                                {/* Number + Date row */}
                                <div className="flex items-center justify-between">
                                    <span
                                        className="font-code text-4xl font-bold leading-none opacity-15 select-none"
                                        style={{ color: "var(--accent-color)", opacity: 0.12 }}
                                        aria-hidden="true"
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <p className="font-code text-[11px] text-muted-foreground tracking-wide">
                                        {blog.date}
                                    </p>
                                </div>

                                {/* Title */}
                                <h3 className="font-display text-xl font-semibold leading-snug group-hover:opacity-70 transition-opacity">
                                    {blog.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 font-light">
                                    {blog.excerpt}
                                </p>

                                {/* Read More */}
                                <span className="link-accent text-sm">
                                    Read more
                                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </span>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* View All */}
                <div className="mt-14 text-center">
                    <Link
                        to="/blogs"
                        className="btn-primary"
                    >
                        View All Posts
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
