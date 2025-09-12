/**
 * CurrentTimeDisplay.jsx
 * 
 * A component that displays the current time and date.
 * @param {Date} currentTime - The current time to display
 * @param {Function} formatTime - Function to format the time string
 * @param {Function} formatDate - Function to format the date string
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
