import { Clock } from "lucide-react";

/**
 * LifeGrid Component
 * Visualizes a person's life in weeks using a grid of colored squares.
 * Each square represents one week, with rows typically representing years (52 weeks).
 * The grid is responsive and adjusts its layout based on screen size.
 * Features:
 * - Color-coded squares for lived, current, and future weeks
 * - Hover tooltips with detailed week information
 * - Accessible design with ARIA labels
 * - Responsive grid layout
 */

// Color palette for better contrast
const getWeekColor = (status) => {
    switch (status) {
        case 'lived': return 'bg-blue-600';
        case 'current': return 'bg-yellow-400';
        case 'future': return 'bg-gray-300';
        default: return 'bg-gray-300';
    }
};

export function LifeGrid({ weeks, gridColumns }) {
    return (
        <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
                <Clock className="inline mr-2" size={20} />
                Your Life Grid
            </h2>
            <div
                className="grid gap-1"
                style={{
                    gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`
                }}
                aria-label="Life Grid"
            >
                {weeks.map((week) => (
                    <div
                        key={week.id}
                        className={`w-2 h-2 rounded-sm ${getWeekColor(week.status)} week-square`}
                        title={`Week ${week.id + 1}, Year ${Math.floor(week.id / gridColumns) + 1}, Status: ${week.status}`}
                        aria-label={`Week ${week.id + 1}, Year ${Math.floor(week.id / gridColumns) + 1}, Status: ${week.status}`}
                    />
                ))}
            </div>
            <div className="mt-4 text-center text-sm text-foreground/60">
                {gridColumns === 52 && (
                    <>Each row represents one year (52 weeks). Hover over squares for details.</>
                )}
                {gridColumns !== 52 && (
                    <>Grid columns adjusted for visualization. Hover over squares for details.</>
                )}
            </div>
        </div>
    );
}
