
// For best performance, add this to your CSS (e.g., index.css):
// .week-square:hover { transform: scale(1.5); z-index: 2; transition: transform 0.15s; }
import { useState, useMemo, useEffect } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
import { Calendar, Heart, Clock, Star, Users, TreePine } from "lucide-react";

// Helper to ensure date is always yyyy-mm-dd or empty
const getDateInputValue = (dateStr) => {
    if (!dateStr) return "";
    // If already in yyyy-mm-dd, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    // Try to parse and format
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

export default function LifeInWeeks() {
    const [birthDate, setBirthDate] = useState("");
    const [lifeExpectancy, setLifeExpectancy] = useState(80);
    const [lifeExpectancyWarning, setLifeExpectancyWarning] = useState("");
    // Fixed health constants
    const heartRate = 70; // bpm
    const breathingRate = 16; // per min
    // weeks and stats will be calculated with useMemo below


    // useEffect removed; calculations are now memoized

    // Handler for robust input validation
    const handleLifeExpectancyChange = (e) => {
        const value = Number(e.target.value);
        if (Number.isFinite(value) && value > 0 && value <= 150) {
            setLifeExpectancy(value);
        }
        // Don't update if invalid, preserving user's typing
    };

    // calculateWeeks removed; logic will be in useMemo
    // Memoized stats calculation
    const stats = useMemo(() => {
        if (!birthDate) return {
            totalWeeks: 0,
            livedWeeks: 0,
            remainingWeeks: 0,
            currentAge: 0,
            weekProgress: 0,
            error: undefined
        };
        const birth = new Date(birthDate);
        const now = new Date();
        const WEEKS_PER_YEAR = 365.25 / 7;
        const totalWeeksInLife = Math.round(lifeExpectancy * WEEKS_PER_YEAR);
        if (birth > now) {
            return {
                totalWeeks: totalWeeksInLife,
                livedWeeks: 0,
                remainingWeeks: totalWeeksInLife,
                currentAge: 0,
                weekProgress: 0,
                error: "Birth date cannot be in the future"
            };
        }
        const timeDiff = now.getTime() - birth.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        const livedWeeks = Math.min(Math.floor(daysDiff / 7), totalWeeksInLife);
        const currentAge = now.getFullYear() - birth.getFullYear() -
            (now.getMonth() < birth.getMonth() ||
                (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate()) ? 1 : 0);
        // weekProgress is not used in UI, so remove it
        const remainingWeeks = Math.max(0, totalWeeksInLife - livedWeeks);
        return {
            totalWeeks: totalWeeksInLife,
            livedWeeks,
            remainingWeeks,
            currentAge,
            error: undefined
        };
    }, [birthDate, lifeExpectancy]);

    // Move warning logic to useEffect
    useEffect(() => {
        if (!birthDate) {
            if (lifeExpectancyWarning) setLifeExpectancyWarning("");
            return;
        }
        const birth = new Date(birthDate);
        const now = new Date();
        if (birth > now) {
            if (lifeExpectancyWarning) setLifeExpectancyWarning("");
            return;
        }
        if (lifeExpectancy < stats.currentAge) {
            if (!lifeExpectancyWarning) setLifeExpectancyWarning("Warning: Life expectancy is less than your current age.");
        } else {
            if (lifeExpectancyWarning) setLifeExpectancyWarning("");
        }
    }, [birthDate, lifeExpectancy, stats.currentAge, lifeExpectancyWarning]);

    // Memoized weeks array
    const weeks = useMemo(() => {
        if (!birthDate || stats.totalWeeks === 0) return [];
        const WEEKS_PER_YEAR = 365.25 / 7;
        const arr = [];
        for (let i = 0; i < stats.totalWeeks; i++) {
            let status = 'future';
            if (i < stats.livedWeeks) {
                status = 'lived';
            } else if (i === Math.min(stats.livedWeeks, stats.totalWeeks - 1)) {
                status = 'current';
            }
            arr.push({
                id: i,
                status,
                year: Math.floor(i / WEEKS_PER_YEAR),
                weekInYear: i % Math.round(WEEKS_PER_YEAR)
            });
        }
        return arr;
    }, [birthDate, lifeExpectancy, stats.livedWeeks, stats.totalWeeks]);

    const getWeekColor = (status) => {
        switch (status) {
            case 'lived': return 'bg-blue-500';
            case 'current': return 'bg-yellow-500';
            case 'future': return 'bg-gray-200';
            default: return 'bg-gray-200';
        }
    };

    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    const renderLifeHighlights = () => {
        const birth = new Date(birthDate);
        const now = new Date();
        const ageInDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 3600 * 24));
        const ageInYears = stats.currentAge;

        const weeksLived = Math.floor(ageInDays / 7);
        const percentageOfFullLife = ((ageInDays / (lifeExpectancy * 365.25)) * 100).toFixed(1);
        const daysOfExperience = Math.floor(ageInDays);
        const seasonsObserved = Math.floor(ageInDays / (365.25 / 4));
        // Use configurable heart/breathing rates
        const heartBeats = Math.floor(ageInDays * 24 * 60 * heartRate);
        const breathsTaken = Math.floor(ageInDays * 24 * 60 * breathingRate);
        const hoursSlept = Math.floor(ageInDays * 8);

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 p-6 bg-card rounded-lg"
            >
                <h3 className="text-lg font-semibold mb-4 text-center flex items-center justify-center">
                    <Star className="mr-2" size={20} />
                    Life Highlights
                </h3>
                <div className="text-foreground/80 space-y-2">
                    <p>
                        You've lived <strong>{formatNumber(weeksLived)}</strong> weeks, which is <strong>{percentageOfFullLife}%</strong> of a full life.
                    </p>
                    <p>
                        That's <strong>{formatNumber(daysOfExperience)}</strong> days of experience and approximately <strong>{formatNumber(seasonsObserved)}</strong> seasons observed.
                    </p>
                    <p>
                        Your heart has beaten approximately <strong>{formatNumber(heartBeats)}</strong> times.
                        <span className="text-xs text-foreground/50 ml-1">(Avg. {heartRate} bpm)</span>
                    </p>
                    <p>
                        You've taken around <strong>{formatNumber(breathsTaken)}</strong> breaths and slept about <strong>{formatNumber(hoursSlept)}</strong> hours.
                        <span className="text-xs text-foreground/50 ml-1">(Avg. {breathingRate} breaths/min)</span>
                    </p>
                </div>
            </motion.div>
        );
    };

    const renderSocietalContext = () => {

        const birth = new Date(birthDate);
        const now = new Date();
        const ageInDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 3600 * 24));
        const ageInYears = stats.currentAge;

        // Dynamic world population calculation
        // UN estimates: 6.14B in 2000, 6.92B in 2010, 7.79B in 2021, 8.1B in 2025
        // We'll interpolate between these for a more dynamic estimate
        function estimateWorldPopulation(date) {
            const data = [
                { year: 1900, month: 1, day: 1, pop: 1650000000 }, // UN estimate
                { year: 1927, month: 1, day: 1, pop: 2000000000 },
                { year: 1950, month: 1, day: 1, pop: 2530000000 },
                { year: 1960, month: 1, day: 1, pop: 3030000000 },
                { year: 1970, month: 1, day: 1, pop: 3700000000 },
                { year: 1980, month: 1, day: 1, pop: 4440000000 },
                { year: 1990, month: 1, day: 1, pop: 5320000000 },
                { year: 2000, month: 1, day: 1, pop: 6140000000 },
                { year: 2010, month: 1, day: 1, pop: 6920000000 },
                { year: 2021, month: 1, day: 1, pop: 7790000000 },
                { year: 2025, month: 7, day: 1, pop: 8100000000 } // July 2025
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

        const worldPopulationAtBirth = estimateWorldPopulation(birth);
        const currentWorldPopulation = estimateWorldPopulation(now);
        const peopleMet = Math.round((ageInYears / lifeExpectancy) * 80000);
        // Births and deaths: keep as rough estimates
        const birthsWorldwide = Math.floor(ageInDays * 383014); // 140M/yr / 365
        const deathsWorldwide = Math.floor(ageInDays * 167123); // 61M/yr / 365

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-6 p-6 bg-card rounded-lg"
            >
                <h3 className="text-lg font-semibold mb-4 text-center flex items-center justify-center">
                    <Users className="mr-2" size={20} />
                    Societal Context
                </h3>
                <div className="text-foreground/80 space-y-2">
                    <p>
                        During your lifetime, humanity's population has grown from <strong>{formatNumber(worldPopulationAtBirth)}</strong> to over <strong>{formatNumber(currentWorldPopulation)}</strong> people.
                        <span className="text-xs text-foreground/50 ml-1">(Approximate global averages for illustration)</span>
                    </p>
                    <p>
                        The average person will meet around 80,000 people in their lifetime. You've likely already met approximately <strong>{formatNumber(peopleMet)}</strong> individuals.
                    </p>
                    <p>
                        Since your birth, humanity has collectively experienced approximately <strong>{formatNumber(birthsWorldwide)}</strong> births and <strong>{formatNumber(deathsWorldwide)}</strong> deaths.
                        <span className="text-xs text-foreground/50 ml-1">(Approximate global averages for illustration)</span>
                    </p>
                </div>
            </motion.div>
        );
    };

    const renderNaturalWorld = () => {
        const birth = new Date(birthDate);
        const now = new Date();
        const ageInDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 3600 * 24));
        const ageInYears = stats.currentAge;

        const lunarCycles = Math.floor(ageInDays / 29.53);
        const tripsAroundSun = Math.floor(ageInYears);
        const sequoiaComparison = ((ageInYears / 3000) * 100).toFixed(2);

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-6 p-6 bg-card rounded-lg"
            >
                <h3 className="text-lg font-semibold mb-4 text-center flex items-center justify-center">
                    <TreePine className="mr-2" size={20} />
                    Natural World
                </h3>
                <div className="text-foreground/80 space-y-2">
                    <p>
                        You've experienced approximately <strong>{formatNumber(lunarCycles)}</strong> lunar cycles and <strong>{formatNumber(tripsAroundSun)}</strong> trips around the Sun.
                    </p>
                    <p>
                        A giant sequoia tree can live over 3,000 years. Your current age is <strong>{sequoiaComparison}%</strong> of its potential lifespan.
                    </p>
                    <p>
                        During your lifetime, your body has replaced most of its cells several times. You are not made of the same atoms you were born with.
                    </p>
                </div>
            </motion.div>
        );
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background">
                <NavBar />
                <main className="mt-10 flex-1 container mx-auto px-4 py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-6xl mx-auto"
                    >
                        <h1 className="text-4xl font-bold mb-8 text-center">Your Life in Weeks</h1>
                        
                        <div className="text-center mb-8 text-foreground/80">
                            <p>Each square represents one week of your life. This visualization helps put time into perspective.</p>
                        </div>

                        {/* Input Section */}
                        <div className="bg-card rounded-lg p-6 mb-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        <Calendar className="inline mr-2 text-foreground" size={20} />
                                        Your Birth Date
                                    </label>
                                    <input
                                        type="date"
                                        value={getDateInputValue(birthDate)}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md bg-background"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        <Heart className="inline mr-2" size={16} />
                                        Life Expectancy (years)
                                    </label>
                                    <input
                                        type="number"
                                        value={lifeExpectancy}
                                        onChange={handleLifeExpectancyChange}
                                        className="w-full px-3 py-2 border rounded-md bg-background"
                                        min="1"
                                        max="150"
                                    />
                                    {lifeExpectancyWarning && (
                                        <div className="text-yellow-600 text-xs mt-1">{lifeExpectancyWarning}</div>
                                    )}
                                    {/* ...existing code... */}
                                </div>
                            </div>
                        </div>

                        {birthDate && (
                            <>
                                {/* Statistics */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="grid md:grid-cols-4 gap-4 mb-8"
                                >
                                    <div className="bg-card rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-500">{stats.currentAge}</div>
                                        <div className="text-sm text-foreground/60">Years Old</div>
                                    </div>
                                    <div className="bg-card rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-500">{formatNumber(stats.livedWeeks)}</div>
                                        <div className="text-sm text-foreground/60">Weeks Lived</div>
                                    </div>
                                    <div className="bg-card rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-green-500">{formatNumber(stats.remainingWeeks)}</div>
                                        <div className="text-sm text-foreground/60">Weeks Remaining</div>
                                    </div>
                                    <div className="bg-card rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-purple-500">
                                            {Math.min(100, Math.max(0, (stats.livedWeeks / stats.totalWeeks) * 100)).toFixed(1)}%
                                        </div>
                                        <div className="text-sm text-foreground/60">Life Progress</div>
                                    </div>
                                </motion.div>

                                {/* Legend */}
                                <div className="flex justify-center gap-6 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                        <span className="text-sm">Weeks Lived</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                                        <span className="text-sm">Current Week</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-gray-200 rounded"></div>
                                        <span className="text-sm">Future Weeks</span>
                                    </div>
                                </div>

                                {/* Life Grid */}
                                <div className="bg-card rounded-lg p-6">
                                    <h2 className="text-xl font-semibold mb-4 text-center">
                                        <Clock className="inline mr-2" size={20} />
                                        Your Life Grid
                                    </h2>
                                    <div
                                        className="grid gap-1"
                                        style={{
                                            gridTemplateColumns: `repeat(${Math.min(52, Math.ceil(Math.sqrt(stats.totalWeeks)))}, minmax(0, 1fr))`
                                        }}
                                    >
                                        {weeks.map((week) => (
                                            <div
                                                key={week.id}
                                                className={`w-2 h-2 rounded-sm ${getWeekColor(week.status)} week-square`}
                                                title={`Week ${week.id + 1}, Year ${Math.floor(week.id / 52) + 1}, Status: ${week.status}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-4 text-center text-sm text-foreground/60">
                                        Each row represents one year (52 weeks). Hover over squares for details.
                                    </div>
                                </div>

                                {/* New Statistical Sections */}
                                {renderLifeHighlights()}
                                {renderSocietalContext()}
                                {renderNaturalWorld()}
                            </>
                        )}

                        {!birthDate && (
                            <div className="text-center py-12">
                                <p className="text-foreground/60">Enter your birth date above to visualize your life in weeks.</p>
                            </div>
                        )}
                    </motion.div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}
