/**
 * Blogs.jsx
 * Clean, minimal blog listing and post pages
 */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ArrowUpRight, Loader2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { formatDate } from "../lib/utils";
import TableOfContents from "../components/TableOfContents";
import { MarkdownComponents } from "../components/MarkdownComponents";
import { blogPosts, getBlogById } from "../data/blogs";
import '../assets/blog-styles.css';

function BlogPost({ blog }) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadBlogContent = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/blogs/${blog?.filename}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch blog: ${response.status}`);
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
    }, [blog?.filename]);

    const handleBackToList = () => {
        navigate('/blogs');
    };

    if (!blog) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <NavBar />
                <main className="pt-24 pb-16 px-6">
                    <div className="container mx-auto max-w-3xl text-center">
                        <p className="text-muted-foreground mb-4">Blog not found</p>
                        <button
                            onClick={handleBackToList}
                            className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
                        >
                            <ArrowLeft size={16} />
                            Back to Blogs
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <NavBar />
                <main className="pt-24 pb-16 px-6">
                    <div className="container mx-auto max-w-3xl flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-muted-foreground" size={32} />
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
                <main className="pt-24 pb-16 px-6">
                    <div className="container mx-auto max-w-3xl text-center">
                        <p className="text-muted-foreground mb-4">{error}</p>
                        <button
                            onClick={handleBackToList}
                            className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
                        >
                            <ArrowLeft size={16} />
                            Back to Blogs
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <NavBar />

            <main className="pt-24 pb-16">
                {/* Header */}
                <div className="border-b border-border mb-8">
                    <div className="container mx-auto max-w-3xl px-6 pb-8">
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={handleBackToList}
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                        >
                            <ArrowLeft size={16} />
                            Back to Blogs
                        </motion.button>

                        <motion.header
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h1 className="text-3xl md:text-4xl font-semibold mb-4 leading-tight">
                                {blog.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    <span>{formatDate(blog.date)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={14} />
                                    <span>{blog.readTime}</span>
                                </div>
                            </div>

                            {blog.tags && (
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag, index) => (
                                        <span key={index} className="text-xs text-muted-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.header>
                    </div>
                </div>

                {/* Table of Contents */}
                <TableOfContents content={content} />

                {/* Blog Content */}
                <div className="container mx-auto max-w-3xl px-6">
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="prose prose-lg max-w-none text-left
                            prose-headings:font-semibold prose-headings:text-foreground
                            prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                            prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
                            prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                            prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
                            prose-a:text-foreground prose-a:underline hover:prose-a:opacity-70
                            prose-strong:text-foreground prose-strong:font-semibold
                            prose-code:text-foreground prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                            prose-pre:bg-secondary prose-pre:border prose-pre:border-border prose-pre:rounded-lg
                            prose-blockquote:border-l-2 prose-blockquote:border-l-foreground prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
                            prose-ul:mb-4 prose-ul:list-disc prose-ul:pl-5
                            prose-ol:mb-4 prose-ol:list-decimal prose-ol:pl-5
                            prose-li:text-foreground prose-li:mb-1
                            prose-img:rounded-lg"
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
    const navigate = useNavigate();
    const [isInitialized, setIsInitialized] = useState(false);

    const sortedBlogs = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

    useEffect(() => {
        setIsInitialized(true);
    }, []);

    if (!isInitialized) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <Loader2 className="animate-spin text-muted-foreground" size={32} />
            </div>
        );
    }

    if (id) {
        const selectedBlog = getBlogById(id);
        return <BlogPost blog={selectedBlog} />;
    }

    return (
        <PageTransition className="min-h-screen bg-background text-foreground">
            <NavBar />

            <main className="pt-24 pb-16 px-6">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                            Writing
                        </h1>
                        <p className="text-muted-foreground">
                            {sortedBlogs.length} articles on development, technology, and learning.
                        </p>
                    </motion.div>

                    {/* Blog List */}
                    <AnimatePresence>
                        <div className="space-y-8">
                            {sortedBlogs.map((blog, index) => (
                                <motion.article
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group cursor-pointer"
                                    onClick={() => navigate(`/blogs/blog/${blog.id}`)}
                                >
                                    <div className="pb-8 border-b border-border">
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {formatDate(blog.date)}
                                        </p>
                                        <h2 className="text-xl font-medium mb-2 group-hover:opacity-70 transition-opacity">
                                            {blog.title}
                                        </h2>
                                        <p className="text-muted-foreground mb-3 leading-relaxed">
                                            {blog.summary}
                                        </p>
                                        <span className="inline-flex items-center gap-1 text-sm font-medium">
                                            Read more
                                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </span>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </AnimatePresence>

                    {sortedBlogs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No articles yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </PageTransition>
    );
};
