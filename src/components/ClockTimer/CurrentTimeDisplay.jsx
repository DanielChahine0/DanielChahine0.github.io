// Current Time Component
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
