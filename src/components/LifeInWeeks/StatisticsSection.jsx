import { motion } from "framer-motion";

/**
 * StatisticsSection Component
 * Displays key life statistics in an animated grid layout.
 * Shows:
 * - Current age in years
 * - Number of weeks lived
 * - Number of weeks remaining
 * - Overall life progress as a percentage
 * Features smooth animations and responsive design.
 */
export function StatisticsSection({ stats, formatNumber }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-4 gap-4 mb-8"
        >
            <div className="bg-card rounded-lg p-4 text-center" aria-label="Current Age">
                <div className="text-2xl font-bold text-blue-600" title="Current Age">{stats.currentAge}</div>
                <div className="text-sm text-foreground/60">Years Old</div>
            </div>
            <div className="bg-card rounded-lg p-4 text-center" aria-label="Weeks Lived">
                <div className="text-2xl font-bold text-blue-600" title="Weeks Lived">{formatNumber(stats.livedWeeks)}</div>
                <div className="text-sm text-foreground/60">Weeks Lived</div>
            </div>
            <div className="bg-card rounded-lg p-4 text-center" aria-label="Weeks Remaining">
                <div className="text-2xl font-bold text-green-600" title="Weeks Remaining">{formatNumber(stats.remainingWeeks)}</div>
                <div className="text-sm text-foreground/60">Weeks Remaining</div>
            </div>
            <div className="bg-card rounded-lg p-4 text-center" aria-label="Life Progress">
                <div className="text-2xl font-bold text-purple-600" title="Life Progress">
                    {Math.min(100, Math.max(0, (stats.livedWeeks / stats.totalWeeks) * 100)).toFixed(1)}%
                </div>
                <div className="text-sm text-foreground/60">Life Progress</div>
            </div>
        </motion.div>
    );
}
