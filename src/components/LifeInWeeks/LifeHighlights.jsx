import { motion } from "framer-motion";
import { Star } from "lucide-react";

/**
 * LifeHighlights Component
 * Presents interesting statistics and milestones about a person's life journey.
 * Calculates and displays:
 * - Weeks lived and life percentage
 * - Total days of experience
 * - Number of seasons experienced
 * - Estimated heartbeats and breaths taken
 * - Hours of sleep
 * Includes animated entrance and tooltip explanations.
 */
export function LifeHighlights({ 
    birthDate, 
    lifeExpectancy, 
    heartRate, 
    breathingRate, 
    formatNumber 
}) {
    const birth = new Date(birthDate);
    const now = new Date();
    const ageInDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 3600 * 24));
    const weeksLived = Math.floor(ageInDays / 7);
    const percentageOfFullLife = ((ageInDays / (lifeExpectancy * 365.25)) * 100).toFixed(1);
    const daysOfExperience = Math.floor(ageInDays);
    const seasonsObserved = Math.floor(ageInDays / (365.25 / 4));
    const heartBeats = Math.floor(ageInDays * 24 * 60 * heartRate);
    const breathsTaken = Math.floor(ageInDays * 24 * 60 * breathingRate);
    const hoursSlept = Math.floor(ageInDays * 8);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 p-6 bg-card rounded-lg"
            aria-label="Life Highlights"
        >
            <h3 className="text-lg font-semibold mb-4 text-center flex items-center justify-center">
                <Star className="mr-2" size={20} />
                Life Highlights
            </h3>
            <div className="text-foreground/80 space-y-2">
                <p>
                    You've lived <strong title="Weeks Lived">{formatNumber(weeksLived)}</strong> weeks, which is <strong title="Percent of full life">{percentageOfFullLife}%</strong> of a full life.
                </p>
                <p>
                    That's <strong title="Days of experience">{formatNumber(daysOfExperience)}</strong> days of experience and approximately <strong title="Seasons observed">{formatNumber(seasonsObserved)}</strong> seasons observed.
                </p>
                <p>
                    Your heart has beaten approximately <strong title="Heart beats">{formatNumber(heartBeats)}</strong> times.
                    <span className="text-xs text-foreground/50 ml-1">(Avg. {heartRate} bpm)</span>
                </p>
                <p>
                    You've taken around <strong title="Breaths taken">{formatNumber(breathsTaken)}</strong> breaths and slept about <strong title="Hours slept">{formatNumber(hoursSlept)}</strong> hours.
                    <span className="text-xs text-foreground/50 ml-1">(Avg. {breathingRate} breaths/min)</span>
                </p>
            </div>
        </motion.div>
    );
}
