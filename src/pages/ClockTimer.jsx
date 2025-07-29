import { useState, useEffect, useRef } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Plus, Minus } from "lucide-react";

export default function ClockTimer() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timerMinutes, setTimerMinutes] = useState(25);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(25 * 60);
    const [initialTotalSeconds, setInitialTotalSeconds] = useState(25 * 60);
    const intervalRef = useRef(null);

    // Update current time every second
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timeInterval);
    }, []);

    // Timer logic
    useEffect(() => {
        if (isTimerRunning && totalSeconds > 0) {
            intervalRef.current = setInterval(() => {
                setTotalSeconds(prev => {
                    if (prev <= 1) {
                        setIsTimerRunning(false);
                        // Timer finished - you could add notification here
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isTimerRunning, totalSeconds]);

    // Update display minutes and seconds when totalSeconds changes
    useEffect(() => {
        setTimerMinutes(Math.floor(totalSeconds / 60));
        setTimerSeconds(totalSeconds % 60);
    }, [totalSeconds]);

    const toggleTimer = () => {
        setIsTimerRunning(!isTimerRunning);
    };

    const resetTimer = () => {
        setIsTimerRunning(false);
        setTotalSeconds(initialTotalSeconds);
    };

    const adjustTimer = (minutes) => {
        if (!isTimerRunning) {
            const newMinutes = Math.max(1, Math.floor(totalSeconds / 60) + minutes);
            const newTotal = newMinutes * 60;
            setTotalSeconds(newTotal);
            setInitialTotalSeconds(newTotal);
        }
    };

    const setPresetTimer = (minutes) => {
        if (!isTimerRunning) {
            const newTotal = minutes * 60;
            setTotalSeconds(newTotal);
            setInitialTotalSeconds(newTotal);
        }
    };

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

    const progressPercentage = initialTotalSeconds > 0 
        ? ((initialTotalSeconds - totalSeconds) / initialTotalSeconds) * 100 
        : 0;

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background">
                <NavBar />
                <main className="flex-1 container mx-auto px-4 py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl font-bold mb-8 text-center">Clock & Timer</h1>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Current Time Display */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-card rounded-lg p-8 text-center"
                            >
                                <h2 className="text-2xl font-semibold mb-6">Current Time</h2>
                                <div className="space-y-4">
                                    <div className="text-5xl font-mono font-bold text-blue-500">
                                        {formatTime(currentTime)}
                                    </div>
                                    <div className="text-lg text-foreground/80">
                                        {formatDate(currentTime)}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Timer */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="bg-card rounded-lg p-8"
                            >
                                <h2 className="text-2xl font-semibold mb-6 text-center">Pomodoro Timer</h2>
                                
                                {/* Timer Display */}
                                <div className="text-center mb-6">
                                    <div className="text-6xl font-mono font-bold text-green-500 mb-4">
                                        {String(timerMinutes).padStart(2, '0')}:
                                        {String(timerSeconds).padStart(2, '0')}
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                        <div
                                            className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                                            style={{ width: `${progressPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Timer Controls */}
                                <div className="flex justify-center gap-4 mb-6">
                                    <button
                                        onClick={toggleTimer}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-md text-white font-medium transition-colors ${
                                            isTimerRunning 
                                                ? "bg-red-500 hover:bg-red-600" 
                                                : "bg-green-500 hover:bg-green-600"
                                        }`}
                                    >
                                        {isTimerRunning ? <Pause size={20} /> : <Play size={20} />}
                                        {isTimerRunning ? "Pause" : "Start"}
                                    </button>
                                    <button
                                        onClick={resetTimer}
                                        className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                                    >
                                        <RotateCcw size={20} />
                                        Reset
                                    </button>
                                </div>

                                {/* Timer Adjustment */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => adjustTimer(-5)}
                                            disabled={isTimerRunning}
                                            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="text-sm font-medium min-w-20 text-center">
                                            Adjust ±5min
                                        </span>
                                        <button
                                            onClick={() => adjustTimer(5)}
                                            disabled={isTimerRunning}
                                            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    {/* Preset Buttons */}
                                    <div className="flex gap-2 justify-center flex-wrap">
                                        {[5, 15, 25, 45].map((minutes) => (
                                            <button
                                                key={minutes}
                                                onClick={() => setPresetTimer(minutes)}
                                                disabled={isTimerRunning}
                                                className="px-3 py-1 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                {minutes}m
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Timer Status */}
                        {totalSeconds === 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-8 p-6 bg-green-100 border border-green-300 rounded-lg text-center"
                            >
                                <h3 className="text-xl font-semibold text-green-800 mb-2">Time's Up! 🎉</h3>
                                <p className="text-green-700">Great job! Time for a break.</p>
                            </motion.div>
                        )}
                    </motion.div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}
