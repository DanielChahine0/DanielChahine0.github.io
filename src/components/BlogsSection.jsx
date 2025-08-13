import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { getLatestBlogs } from "../data/blogs";
import { BlogCard } from "./BlogCard";

export const BlogsSection = () => {
    const latestBlogs = getLatestBlogs(3);
    
    return (
        <section id="blogs" className="py-10 px-4 relative">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                            <BookOpen className="text-primary" size={32} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            My Blogs
                        </h2>
                    </div>

                </div>

                {/* Latest 3 Blog Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
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
