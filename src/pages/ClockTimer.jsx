import { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { CurrentTimeDisplay } from "../components/ClockTimer/CurrentTimeDisplay";
import { WorldClock } from "../components/ClockTimer/WorldClock";
import { AlarmSection } from "../components/ClockTimer/AlarmSection";
import { PomodoroTimer } from "../components/ClockTimer/PomodoroTimer";
import { motion } from "framer-motion";

export default function ClockTimer() {
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update current time every second (requestAnimationFrame for better accuracy)
    useEffect(() => {
        let frame;
        const update = () => {
            setCurrentTime(new Date());
            frame = requestAnimationFrame(update);
        };
        frame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frame);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background">
                <NavBar />
                <main className="mt-15 flex-1 container mx-auto px-4 py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl font-bold mb-8 text-center">Clock & Timer</h1>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Current Time Display */}
                            <motion.section
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-card rounded-lg p-8 text-center shadow-md flex flex-col gap-6"
                            >
                                <h2 className="text-2xl font-semibold mb-4">Current Time</h2>
                                <CurrentTimeDisplay currentTime={currentTime} formatTime={formatTime} formatDate={formatDate} />
                                <WorldClock />
                            </motion.section>
                            {/* Timer */}
                            <PomodoroTimer />
                        </div>
                        {/* Alarm Section */}
                        <AlarmSection />
                    </motion.div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}
