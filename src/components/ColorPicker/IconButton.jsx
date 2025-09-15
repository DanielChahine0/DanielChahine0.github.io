/**
 * IconButton Component
 * A reusable button component that wraps an icon with proper styling and accessibility features.
 * Includes hover states, focus rings, and aria-labels for better accessibility.
 * 
 * @param {Function} onClick - Click handler function
 * @param {string} label - Accessibility label for the button
 * @param {React.ReactNode} children - Icon component to be rendered
 * @param {string} className - Additional CSS classes
 */
const IconButton = ({ onClick, label, children, className = "", ...props }) => (
    <button
        onClick={onClick}
        className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60 hover:bg-muted ${className}`}
        aria-label={label}
        {...props}
    >
        {children}
    </button>
);

export default IconButton;
