// Shared blog posts data
export const blogPosts = [
    {
        id: 1,
        title: "Introduction to Computer Security",
        date: "2025-08-07",
        summary: "This blog covers the fundamentals of cybersecurity. An overview of digital threats and the importance of security, then explains key cryptographic tools used to protect data. It explores common types of malicious software, methods of user authentication, major web security risks, and access control mechanisms.",
        readTime: "3 hours",
        tags: ["Computer Security"],
        filename: "blog1.md"
    }
];

// Get latest blogs (for home page display)
export const getLatestBlogs = (count = 3) => {
    return [...blogPosts]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, count);
};

// Get blog by ID
export const getBlogById = (id) => {
    return blogPosts.find(blog => blog.id === parseInt(id));
};
