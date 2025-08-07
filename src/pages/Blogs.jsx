import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen, ArrowLeft, Loader2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { formatDate } from "../lib/utils";
import '../assets/blog-styles.css';

// Blog posts metadata
const blogPosts = [
    {
        id: 1,
        title: "My Journey into Full-Stack Development: From Curiosity to Career",
        date: "2024-11-28",
        summary: "Every developer has a unique origin story. Mine began with curiosity, evolved through countless hours of debugging, and culminated in the realization that programming isn't just about writing code—it's about solving problems and creating meaningful experiences.",
        readTime: "12 min read",
        tags: ["Career", "Full-Stack", "Journey", "Learning"],
        filename: "fullstack-journey.md"
    },
    {
        id: 2,
        title: "Building Scalable React Applications with Modern Patterns",
        date: "2024-12-01",
        summary: "Explore advanced React patterns including custom hooks, context optimization, and component composition techniques that help build maintainable and scalable applications.",
        readTime: "8 min read",
        tags: ["React", "JavaScript", "Architecture", "Patterns"],
        filename: "react-modern-patterns.md"
    },
    {
        id: 3,
        title: "Web Performance Optimization: Making Your Sites Lightning Fast",
        date: "2024-12-10",
        summary: "Learn essential techniques to optimize your web applications for better performance, including lazy loading, code splitting, image optimization, and caching strategies.",
        readTime: "10 min read",
        tags: ["Performance", "Optimization", "Web Development", "Speed"],
        filename: "web-performance-optimization.md"
    },
    {
        id: 4,
        title: "Programming as Creative Expression: Beyond Logic and Syntax",
        date: "2024-12-15",
        summary: "Discover how programming transcends mere problem-solving to become a form of creative expression, exploring the artistic side of code and software craftsmanship.",
        readTime: "6 min read",
        tags: ["Creativity", "Programming", "Philosophy", "Craftsmanship"],
        filename: "programming-creativity.md"
    }
];

function BlogCard({ blog, index, onReadMore }) {
    if (!blog) {
        return null;
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card/80 backdrop-blur-md rounded-2xl p-6 border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-1"
        >
            <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags?.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                    >
                        {tag}
                    </span>
                )) || null}
            </div>

            <h2 
                className="text-xl font-bold mb-3 text-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={() => onReadMore(blog)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onReadMore(blog);
                    }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Read more about ${blog.title}`}
            >
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

            <button
                onClick={() => onReadMore(blog)}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors group"
            >
                Read More
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </motion.article>
    );
}

function BlogPost({ blog, onBack }) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    if (!blog) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <NavBar />
                <main className="pt-20 pb-12">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="text-center py-20">
                            <p className="text-destructive mb-4">Blog not found</p>
                            <button
                                onClick={onBack}
                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Back to Blogs
                            </button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    useEffect(() => {
        const loadBlogContent = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch the markdown file from the public directory
                const response = await fetch(`/blogs/${blog.filename}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch blog: ${response.status} ${response.statusText}`);
                }
                const markdownContent = await response.text();
                
                if (!markdownContent.trim()) {
                    throw new Error('Blog content is empty');
                }
                
                setContent(markdownContent);
            } catch (err) {
                console.error('Error loading blog content:', err);
                setError(`Failed to load blog content: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (blog?.filename) {
            loadBlogContent();
        } else {
            setError('No blog filename provided');
            setLoading(false);
        }
    }, [blog.filename]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <NavBar />
                <main className="pt-20 pb-12">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <Loader2 className="animate-spin text-primary mx-auto mb-4" size={48} />
                                <p className="text-muted-foreground">Loading blog content...</p>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <NavBar />
                <main className="pt-20 pb-12">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="text-center py-20">
                            <p className="text-destructive mb-4">{error}</p>
                            <button
                                onClick={onBack}
                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Back to Blogs
                            </button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <NavBar />
            <main className="pt-20 pb-12">
                <div className="container mx-auto max-w-4xl px-4">
                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={onBack}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Blogs
                    </motion.button>

                    {/* Blog Header */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                    >
                        <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                                >
                                    {tag}
                                </span>
                            )) || null}
                        </div>
                        
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {blog.title}
                        </h1>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span>{formatDate(blog.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{blog.readTime}</span>
                            </div>
                        </div>
                    </motion.header>

                    {/* Blog Content */}
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground"
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight, rehypeRaw]}
                        >
                            {content}
                        </ReactMarkdown>
                    </motion.article>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export const Blogs = () => {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);
    
    // Sort blogs by date (newest first) and initialize
    const sortedBlogs = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

    useEffect(() => {
        // Initialize the component
        setIsInitialized(true);
    }, []);

    const handleReadMore = (blog) => {
        if (blog?.filename) {
            setSelectedBlog(blog);
        } else {
            console.error('Blog missing filename:', blog);
        }
    };

    const handleBackToList = () => {
        setSelectedBlog(null);
    };

    // Show loading state during initialization
    if (!isInitialized) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    // If a blog is selected, show the blog post
    if (selectedBlog) {
        return <BlogPost blog={selectedBlog} onBack={handleBackToList} />;
    }

    // Show the blog list
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
                    <AnimatePresence>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {sortedBlogs.map((blog, index) => (
                                <BlogCard 
                                    key={blog.id} 
                                    blog={blog} 
                                    index={index} 
                                    onReadMore={handleReadMore}
                                />
                            ))}
                        </div>
                    </AnimatePresence>

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
