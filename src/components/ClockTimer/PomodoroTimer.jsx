/**
 * PomodoroTimer.jsx
 * 
 * A Pomodoro timer component that implements the Pomodoro Technique for time management.
 * Features include:
 * - Customizable timer duration with preset options
 * - Play/Pause functionality with visual state indication
 * - Audio notification and vibration on completion
 * - Visual progress tracking with circular progress bar
 * - Quick adjustment controls (+/- minutes)
 * - Custom duration input
 * - Memory of last used duration
 * - Mobile-friendly interface
 * 
 * @component
 * @example
 * <PomodoroTimer />
 * 
 * State Management:
 * - Uses multiple useState hooks for timer state
 * - Manages intervals with useRef to prevent memory leaks
 * - Implements useCallback for optimized event handlers
 */

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Plus, Minus } from "lucide-react";

export function PomodoroTimer() {
    const [timerMinutes, setTimerMinutes] = useState(25);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(25 * 60);
    const [initialTotalSeconds, setInitialTotalSeconds] = useState(25 * 60);
    const [customInput, setCustomInput] = useState(0);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const intervalRef = useRef(null);
    const audioRef = useRef(null);

    // Timer logic
    useEffect(() => {
        if (isTimerRunning && totalSeconds > 0) {
            intervalRef.current = setInterval(() => {
                setTotalSeconds(prev => {
                    if (prev <= 1) {
                        setIsTimerRunning(false);
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

    // Play sound and vibrate when timer finishes
    useEffect(() => {
        if (totalSeconds === 0 && audioRef.current) {
            audioRef.current.volume = 0.7;
            audioRef.current.play().catch(() => {
                alert("Timer finished!");
            });
            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200]);
            }
        }
    }, [totalSeconds]);

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

    const adjustTimer = useCallback((minutes) => {
        if (!isTimerRunning) {
            const newMinutes = Math.max(1, Math.floor(totalSeconds / 60) + minutes);
            const newTotal = Math.max(60, newMinutes * 60);
            setTotalSeconds(newTotal);
            setInitialTotalSeconds(newTotal);
        }
    }, [isTimerRunning, totalSeconds]);

    const setPresetTimer = useCallback((minutes) => {
        if (!isTimerRunning) {
            const newTotal = Math.max(60, minutes * 60);
            setTotalSeconds(newTotal);
            setInitialTotalSeconds(newTotal);
            setShowCustomInput(false);
        }
    }, [isTimerRunning]);

    const handleCustomInput = useCallback((e) => {
        setCustomInput(e.target.value.replace(/[^0-9]/g, ''));
    }, []);

    const setCustomTimer = useCallback(() => {
        const minutes = Math.max(1, parseInt(customInput, 10) || 0);
        setPresetTimer(minutes);
        setCustomInput(0);
        setShowCustomInput(false);
    }, [customInput, setPresetTimer]);

    const progressPercentage = useMemo(() => (
        initialTotalSeconds > 0 
            ? ((initialTotalSeconds - totalSeconds) / initialTotalSeconds) * 100 
            : 0
    ), [initialTotalSeconds, totalSeconds]);

    return (
        <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card rounded-lg p-8 shadow-md flex flex-col gap-6"
        >
            <h2 className="text-2xl font-semibold mb-4 text-center">Pomodoro Timer</h2>
            {/* Timer Display */}
            <div className="text-center mb-4">
                <motion.div
                    animate={{ scale: isTimerRunning ? 1.08 : 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    className="text-6xl font-mono font-bold text-green-600 mb-2 select-none"
                    aria-label="Timer countdown"
                >
                    {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
                </motion.div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2" aria-label="Timer progress">
                    <motion.div
                        className="bg-green-500 h-2 rounded-full"
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 1 }}
                        style={{ width: `${progressPercentage}%` }}
                    ></motion.div>
                </div>
            </div>
            {/* Timer Controls */}
            <div className="flex justify-center gap-4 mb-4">
                <button
                    onClick={toggleTimer}
                    aria-label={isTimerRunning ? "Pause timer" : "Start timer"}
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
                    aria-label="Reset timer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                    <RotateCcw size={20} />
                    Reset
                </button>
            </div>
            {/* Timer Adjustment */}
            <div className="space-y-3">
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => adjustTimer(-5)}
                        disabled={isTimerRunning}
                        aria-label="Decrease timer by 5 minutes"
                        className="p-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="text-sm font-medium min-w-20 text-center">
                        Adjust ±5min
                    </span>
                    <button
                        onClick={() => adjustTimer(5)}
                        disabled={isTimerRunning}
                        aria-label="Increase timer by 5 minutes"
                        className="p-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                            aria-label={`Set timer to ${minutes} minutes`}
                            className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/60 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {minutes}m
                        </button>
                    ))}
                    <button
                        onClick={() => setShowCustomInput((v) => !v)}
                        disabled={isTimerRunning}
                        aria-label="Set custom timer"
                        className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/60 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Custom
                    </button>
                </div>
                {/* Custom Timer Input */}
                {showCustomInput && !isTimerRunning && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <input
                            type="number"
                            min="1"
                            max="999"
                            value={customInput || ''}
                            onChange={handleCustomInput}
                            onKeyDown={e => { if (e.key === 'Enter') setCustomTimer(); }}
                            className="w-20 px-2 py-1 border border-input rounded-md text-center"
                            aria-label="Custom timer minutes"
                            placeholder="min"
                            autoFocus
                        />
                        <button
                            onClick={setCustomTimer}
                            className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                            aria-label="Set custom timer"
                        >
                            Set
                        </button>
                    </div>
                )}
            </div>
            {/* Hidden audio for timer end notification */}
            <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae1b6.mp3" preload="auto" />
        </motion.section>
    );
}
