
// For best performance, add this to your CSS (e.g., index.css):
// .week-square:hover { transform: scale(1.5); z-index: 2; transition: transform 0.15s; }
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { InputSection } from "../components/LifeInWeeks/InputSection";
import { StatisticsSection } from "../components/LifeInWeeks/StatisticsSection";
import { Legend } from "../components/LifeInWeeks/Legend";
import { LifeGrid } from "../components/LifeInWeeks/LifeGrid";
import { LifeHighlights } from "../components/LifeInWeeks/LifeHighlights";
import { SocietalContext } from "../components/LifeInWeeks/SocietalContext";
import { NaturalWorld } from "../components/LifeInWeeks/NaturalWorld";
import { formatNumber } from "../lib/utils";
import { motion } from "framer-motion";

export default function LifeInWeeks() {
    const [birthDate, setBirthDate] = useState("");
    const [lifeExpectancy, setLifeExpectancy] = useState(80);
    const [lifeExpectancyWarning, setLifeExpectancyWarning] = useState("");

    // Fixed health constants
    const heartRate = 70; // bpm
    const breathingRate = 16; // per min

    // Ref for birth date input (for autofocus)
    const birthDateInputRef = useRef(null);

    // Handler for robust input validation
    const handleLifeExpectancyChange = useCallback((e) => {
        const value = Number(e.target.value);
        if (Number.isFinite(value) && value > 0 && value <= 150) {
            setLifeExpectancy(value);
        }
    }, []);

    // Handler for birth date input
    const handleBirthDateChange = useCallback((e) => {
        setBirthDate(e.target.value);
    }, []);

    // Reset handler
    const handleReset = useCallback(() => {
        setBirthDate("");
        setLifeExpectancy(80);
        if (birthDateInputRef.current) {
            birthDateInputRef.current.focus();
        }
    }, []);

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

    // Memoized grid columns for responsiveness
    const gridColumns = useMemo(() => {
        // 52 for normal, but for very large/small life expectancies, adjust
        if (!stats.totalWeeks) return 1;
        if (stats.totalWeeks < 52) return stats.totalWeeks;
        if (stats.totalWeeks > 1040) return 104; // 20 years per row for huge values
        return 52;
    }, [stats.totalWeeks]);

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
    }, [birthDate, stats.livedWeeks, stats.totalWeeks]);

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background">
                <NavBar />
                <main className="mt-15 flex-1 container mx-auto px-4 py-8">
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
                        <InputSection 
                            birthDate={birthDate}
                            lifeExpectancy={lifeExpectancy}
                            lifeExpectancyWarning={lifeExpectancyWarning}
                            onBirthDateChange={handleBirthDateChange}
                            onLifeExpectancyChange={handleLifeExpectancyChange}
                            onReset={handleReset}
                            birthDateInputRef={birthDateInputRef}
                        />
                        {birthDate && !stats.error && (
                            <>
                                {/* Statistics */}
                                <StatisticsSection 
                                    stats={stats}
                                    formatNumber={formatNumber}
                                />
                                {/* Legend */}
                                <Legend />
                                {/* Life Grid */}
                                <LifeGrid 
                                    weeks={weeks}
                                    gridColumns={gridColumns}
                                />
                                {/* New Statistical Sections */}
                                <LifeHighlights 
                                    birthDate={birthDate}
                                    lifeExpectancy={lifeExpectancy}
                                    heartRate={heartRate}
                                    breathingRate={breathingRate}
                                    formatNumber={formatNumber}
                                />
                                <SocietalContext 
                                    birthDate={birthDate}
                                    lifeExpectancy={lifeExpectancy}
                                    currentAge={stats.currentAge}
                                    formatNumber={formatNumber}
                                />
                                <NaturalWorld 
                                    birthDate={birthDate}
                                    currentAge={stats.currentAge}
                                    formatNumber={formatNumber}
                                />
                            </>
                        )}
                        {birthDate && stats.error && (
                            <div className="text-center py-12">
                                <p className="text-red-600">{stats.error}</p>
                            </div>
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
