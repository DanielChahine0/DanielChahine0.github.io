import { motion } from "framer-motion";
import { Users } from "lucide-react";

// Helper for world population estimate
function estimateWorldPopulation(date) {
    const data = [
        { year: 1900, month: 1, day: 1, pop: 1650000000 },
        { year: 1927, month: 1, day: 1, pop: 2000000000 },
        { year: 1950, month: 1, day: 1, pop: 2530000000 },
        { year: 1960, month: 1, day: 1, pop: 3030000000 },
        { year: 1970, month: 1, day: 1, pop: 3700000000 },
        { year: 1980, month: 1, day: 1, pop: 4440000000 },
        { year: 1990, month: 1, day: 1, pop: 5320000000 },
        { year: 2000, month: 1, day: 1, pop: 6140000000 },
        { year: 2010, month: 1, day: 1, pop: 6920000000 },
        { year: 2021, month: 1, day: 1, pop: 7790000000 },
        { year: 2025, month: 7, day: 1, pop: 8100000000 }
    ];
    const d = date;
    const dateValue = d.getFullYear() + (d.getMonth() + 1) / 12 + d.getDate() / 365.25;
    for (let i = 1; i < data.length; i++) {
        const prev = data[i - 1];
        const next = data[i];
        const prevValue = prev.year + prev.month / 12 + prev.day / 365.25;
        const nextValue = next.year + next.month / 12 + next.day / 365.25;
        if (dateValue <= nextValue) {
            const t = (dateValue - prevValue) / (nextValue - prevValue);
            return Math.round(prev.pop + t * (next.pop - prev.pop));
        }
    }
    // If after last data point, extrapolate
    const last = data[data.length - 1];
    const prev = data[data.length - 2];
    const lastValue = last.year + last.month / 12 + last.day / 365.25;
    const prevValue = prev.year + prev.month / 12 + prev.day / 365.25;
    const growthPerYear = (last.pop - prev.pop) / (lastValue - prevValue);
    return Math.round(last.pop + (dateValue - lastValue) * growthPerYear);
}

export function SocietalContext({ 
    birthDate, 
    lifeExpectancy, 
    currentAge,
    formatNumber 
}) {
    const birth = new Date(birthDate);
    const now = new Date();
    const ageInDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 3600 * 24));
    const ageInYears = currentAge;
    const worldPopulationAtBirth = estimateWorldPopulation(birth);
    const currentWorldPopulation = estimateWorldPopulation(now);
    const peopleMet = Math.round((ageInYears / lifeExpectancy) * 80000);
    const birthsWorldwide = Math.floor(ageInDays * 383014);
    const deathsWorldwide = Math.floor(ageInDays * 167123);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 p-6 bg-card rounded-lg"
            aria-label="Societal Context"
        >
            <h3 className="text-lg font-semibold mb-4 text-center flex items-center justify-center">
                <Users className="mr-2" size={20} />
                Societal Context
            </h3>
            <div className="text-foreground/80 space-y-2">
                <p>
                    During your lifetime, humanity's population has grown from <strong title="World population at birth">{formatNumber(worldPopulationAtBirth)}</strong> to over <strong title="Current world population">{formatNumber(currentWorldPopulation)}</strong> people.
                    <span className="text-xs text-foreground/50 ml-1">(Approximate global averages for illustration)</span>
                </p>
                <p>
                    The average person will meet around 80,000 people in their lifetime. You've likely already met approximately <strong title="People met">{formatNumber(peopleMet)}</strong> individuals.
                </p>
                <p>
                    Since your birth, humanity has collectively experienced approximately <strong title="Births worldwide">{formatNumber(birthsWorldwide)}</strong> births and <strong title="Deaths worldwide">{formatNumber(deathsWorldwide)}</strong> deaths.
                    <span className="text-xs text-foreground/50 ml-1">(Approximate global averages for illustration)</span>
                </p>
            </div>
        </motion.div>
    );
}
