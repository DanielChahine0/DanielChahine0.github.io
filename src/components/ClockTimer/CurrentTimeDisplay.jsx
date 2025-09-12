/**
 * CurrentTimeDisplay.jsx
 * 
 * A component that displays the current time and date in a large, readable format.
 * Features a pulsing animation for the time display and muted styling for the date.
 * 
 * @component
 * @param {Date} currentTime - The current time to display
 * @param {Function} formatTime - Function to format the time string (HH:MM:SS)
 * @param {Function} formatDate - Function to format the date string (Day, Month Date, Year)
 * 
 * @example
 * <CurrentTimeDisplay 
 *   currentTime={new Date()} 
 *   formatTime={(time) => time.toLocaleTimeString()}
 *   formatDate={(date) => date.toLocaleDateString()}
 * />
 */
export function CurrentTimeDisplay({ currentTime, formatTime, formatDate }) {
    return (
        <div className="space-y-2 flex flex-col items-center">
            <div className="text-5xl font-mono font-bold text-primary animate-pulse" aria-label="Current time">
                {formatTime(currentTime)}
            </div>
            <div className="text-base text-muted-foreground">
                {formatDate(currentTime)}
            </div>
        </div>
    );
}
