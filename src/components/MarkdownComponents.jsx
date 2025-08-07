// Custom markdown components for adding IDs to headings
export const MarkdownComponents = {
    h1: ({ children, ...props }) => {
        const text = children?.toString() || '';
        const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        
        return (
            <h1 id={id} {...props}>
                {children}
            </h1>
        );
    },
    h2: ({ children, ...props }) => {
        const text = children?.toString() || '';
        const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        
        return (
            <h2 id={id} {...props}>
                {children}
            </h2>
        );
    },
    h3: ({ children, ...props }) => {
        const text = children?.toString() || '';
        const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        
        return (
            <h3 id={id} {...props}>
                {children}
            </h3>
        );
    },
    h4: ({ children, ...props }) => {
        const text = children?.toString() || '';
        const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        
        return (
            <h4 id={id} {...props}>
                {children}
            </h4>
        );
    },
    h5: ({ children, ...props }) => {
        const text = children?.toString() || '';
        const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        
        return (
            <h5 id={id} {...props}>
                {children}
            </h5>
        );
    },
    h6: ({ children, ...props }) => {
        const text = children?.toString() || '';
        const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        
        return (
            <h6 id={id} {...props}>
                {children}
            </h6>
        );
    },
};
