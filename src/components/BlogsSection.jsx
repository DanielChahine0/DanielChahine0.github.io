import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export const BlogsSection = () => {
    return (
        <section id="blogs" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center">
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
