/**
 * BlogsSection.jsx
 * Editorial blog section with scroll-triggered reveals,
 * hover card lifts, and accent shadow interactions.
 */
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getLatestBlogs } from "../data/blogs";

const sectionReveal = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const cardReveal = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const BlogsSection = () => {
    const latestBlogs = getLatestBlogs(3);

    return (
        <section id="blogs" className="py-24 px-6 bg-card">
            <div className="container mx-auto max-w-6xl">
                {/* Section Header */}
                <motion.div
                    className="mb-16"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    <p className="section-label mb-5">Thoughts & Ideas</p>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                        Writing
                    </h2>
                </motion.div>

                {/* Blog Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-10"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {latestBlogs.map((blog, i) => (
                        <motion.div key={blog.id} variants={cardReveal}>
                            <Link
                                to={`/blogs/blog/${blog.id}`}
                                className="group block"
                            >
                                <motion.article
                                    className="space-y-4 pb-8 border-b border-border"
                                    whileHover={{
                                        y: -4,
                                        transition: { duration: 0.25, ease: "easeOut" },
                                    }}
                                >
                                    {/* Number + Date row */}
                                    <div className="flex items-center justify-between">
                                        <span
                                            className="font-code text-4xl font-bold leading-none select-none"
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
                                </motion.article>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All */}
                <motion.div
                    className="mt-14 text-center"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Link
                        to="/blogs"
                        className="btn-primary"
                    >
                        View All Posts
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
