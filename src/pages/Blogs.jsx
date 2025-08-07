import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import TableOfContents from "../components/TableOfContents";
import { MarkdownComponents } from "../components/MarkdownComponents";
import '../assets/blog-styles.css';

// Blog posts metadata
const blogPosts = [
    {
        id: 1,
        title: "Introduction to Computer Security",
        date: "2025-08-07",
        summary: "This blog covers the fundamentals of cybersecurity. An overview of digital threats and the importance of security, then explains key cryptographic tools used to protect data. It explores common types of malicious software, methods of user authentication, major web security risks, and access control mechanisms.",
        readTime: "3 hours",
        tags: ["Computer Security"],
        filename: "eecs3482.md"
    }
];

function BlogCard({ blog, index }) {
    const navigate = useNavigate();
    
    if (!blog) {
        return null;
    }

    const handleReadMore = () => {
        if (blog?.id) {
            navigate(`/blogs/blog/${blog.id}`);
        } else {
            console.error('Blog missing id:', blog);
        }
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card/80 backdrop-blur-md rounded-2xl p-6 border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={handleReadMore}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleReadMore();
                }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Read more about ${blog.title}`}
        >
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

            <p className="text-muted-foreground leading-relaxed">
                {blog.summary}
            </p>
        </motion.article>
    );
}

function BlogPost({ blog }) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBackToList = () => {
        navigate('/blogs');
    };

    if (!blog) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <NavBar />
                <main className="pt-20 pb-12">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="text-center py-20">
                            <p className="text-destructive mb-4">Blog not found</p>
                            <button
                                onClick={handleBackToList}
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
                                onClick={handleBackToList}
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
            
            {/* Table of Contents */}
            <TableOfContents content={content} />
            
            <main className="pt-16 pb-16 lg:pl-72">
                {/* Hero Section with Back Button */}
                <div className="border-b border-border/50">
                    <div className="container mx-auto max-w-4xl px-6 py-8">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={handleBackToList}
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Blogs
                        </motion.button>

                        <motion.header
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                {blog.title}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{formatDate(blog.date)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{blog.readTime} read</span>
                                </div>
                                {blog.tags && (
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {blog.tags.map((tag, index) => (
                                            <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {blog.summary && (
                                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                                    {blog.summary}
                                </p>
                            )}
                        </motion.header>
                    </div>
                </div>

                {/* Blog Content */}
                <div className="container mx-auto max-w-4xl px-6">
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="py-12"
                    >
                        <div className="prose prose-2xl dark:prose-invert max-w-none text-left
                            prose-headings:font-bold prose-headings:text-foreground prose-headings:leading-tight prose-headings:text-left
                            prose-h1:text-5xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:pb-4 prose-h1:border-b prose-h1:border-border/30 prose-h1:text-left
                            prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:text-primary prose-h2:text-left
                            prose-h3:text-3xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-left
                            prose-h4:text-2xl prose-h4:mb-3 prose-h4:mt-6 prose-h4:text-left
                            prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-p:text-left
                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-foreground prose-strong:font-semibold
                            prose-em:text-muted-foreground
                            prose-code:text-primary prose-code:bg-muted/70 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-base prose-code:font-mono
                            prose-pre:bg-muted/70 prose-pre:border prose-pre:border-border/50 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
                            prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:bg-muted/30 prose-blockquote:rounded-r-lg prose-blockquote:text-muted-foreground prose-blockquote:italic prose-blockquote:text-left
                            prose-ul:mb-6 prose-ul:list-disc prose-ul:pl-6
                            prose-ol:mb-6 prose-ol:list-decimal prose-ol:pl-6
                            prose-li:text-foreground prose-li:mb-2 prose-li:leading-relaxed prose-li:marker:text-primary prose-li:text-lg
                            prose-table:border prose-table:border-border/50 prose-table:rounded-lg prose-table:overflow-hidden
                            prose-th:bg-muted/50 prose-th:text-foreground prose-th:font-semibold prose-th:p-3 prose-th:border-b prose-th:border-border/50
                            prose-td:p-3 prose-td:border-b prose-td:border-border/30
                            prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-border/30
                            prose-hr:border-border/50 prose-hr:my-12"
                        >
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                                components={MarkdownComponents}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    </motion.article>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export const Blogs = () => {
    const { id } = useParams();
    const [isInitialized, setIsInitialized] = useState(false);
    
    // Sort blogs by date (newest first) and initialize
    const sortedBlogs = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

    useEffect(() => {
        // Initialize the component
        setIsInitialized(true);
    }, []);

    // Show loading state during initialization
    if (!isInitialized) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    // If there's an ID in the URL, show the blog post
    if (id) {
        const blogId = parseInt(id);
        const selectedBlog = sortedBlogs.find(blog => blog.id === blogId);
        return <BlogPost blog={selectedBlog} />;
    }

    // Show the blog list
    return (
        <PageTransition className="min-h-screen bg-background text-foreground">
            <NavBar />
            
            <main className="pt-20 pb-12">
                <div className="mt-4 container mx-auto max-w-7xl px-6">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 text-center"
                    >
                        <h1 className="text-4xl font-bold">
                            My Blogs
                        </h1>
                    </motion.div>

                    {/* Blog Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-8"
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
