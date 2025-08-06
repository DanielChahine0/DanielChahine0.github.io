// --- UI Helper Components ---
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
