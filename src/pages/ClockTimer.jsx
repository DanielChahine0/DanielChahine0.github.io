import { useState, useEffect, useRef } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Plus, Minus } from "lucide-react";

// Current Time Component
function CurrentTimeDisplay({ currentTime, formatTime, formatDate }) {
    return (
        <div className="space-y-4">
            <div className="text-5xl font-mono font-bold text-blue-600 animate-pulse" aria-label="Current time">
                {formatTime(currentTime)}
            </div>
            <div className="text-lg text-foreground/80">
                {formatDate(currentTime)}
            </div>
        </div>
    );
}

// World Clock Component
function WorldClock() {
    const worldCities = [
        { name: "New York", tz: "America/New_York" },
        { name: "London", tz: "Europe/London" },
        { name: "Tokyo", tz: "Asia/Tokyo" },
        { name: "Sydney", tz: "Australia/Sydney" },
    ];
    const [selectedCities, setSelectedCities] = useState(["America/New_York", "Europe/London"]);

    const toggleCity = (tz) => {
        setSelectedCities((prev) =>
            prev.includes(tz) ? prev.filter((c) => c !== tz) : [...prev, tz]
        );
    };

    const getWorldTime = (tz) => {
        return new Date().toLocaleTimeString('en-US', {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            timeZone: tz,
        });
    };

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">World Clock</h3>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
                {worldCities.map(city => (
                    <button
                        key={city.tz}
                        onClick={() => toggleCity(city.tz)}
                        className={`px-3 py-1 rounded-md text-sm font-medium border transition-colors ${
                            selectedCities.includes(city.tz)
                                ? 'bg-blue-500 text-white border-blue-600'
                                : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-100'
                        }`}
                        aria-pressed={selectedCities.includes(city.tz)}
                    >
                        {city.name}
                    </button>
                ))}
            </div>
            <div className="space-y-2">
                {selectedCities.map(tz => {
                    const city = worldCities.find(c => c.tz === tz);
                    return city ? (
                        <div key={tz} className="flex justify-between items-center bg-blue-50 rounded px-3 py-2">
                            <span className="font-medium">{city.name}</span>
                            <span className="font-mono text-lg">{getWorldTime(tz)}</span>
                        </div>
                    ) : null;
                })}
            </div>
        </div>
    );
}

// Alarm Section
function AlarmSection() {
    const [alarms, setAlarms] = useState([]);
    const [newAlarm, setNewAlarm] = useState({ time: "", label: "", sound: "default" });
    const [isRecurring, setIsRecurring] = useState(false);

    useEffect(() => {
        const checkAlarms = setInterval(() => {
            const now = new Date();
            alarms.forEach(alarm => {
                const alarmTime = new Date();
                const [hours, minutes] = alarm.time.split(":" ).map(Number);
                alarmTime.setHours(hours, minutes, 0, 0);

                if (now >= alarmTime && now - alarmTime < 1000) {
                    if (Notification.permission === "granted") {
                        new Notification(alarm.label || "Alarm", {
                            body: "Your alarm is ringing!",
                            icon: "src/assets/favicon.svg",
                        });
                    }
                    const audio = new Audio(alarm.sound);
                    audio.play().catch(err => console.error("Audio playback failed:", err));

                    if (!alarm.recurring) {
                        setAlarms(prev => prev.filter(a => a !== alarm));
                    }
                }
            });
        }, 1000);

        return () => clearInterval(checkAlarms);
    }, [alarms]);

    const addAlarm = () => {
        if (newAlarm.time) {
            const validSound = newAlarm.sound === "default" ? "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae1b6.mp3" : newAlarm.sound;
            setAlarms([...alarms, { ...newAlarm, sound: validSound, recurring: isRecurring }]);
            setNewAlarm({ time: "", label: "", sound: "default" });
        }
    };

    const removeAlarm = (index) => {
        setAlarms(alarms.filter((_, i) => i !== index));
    };

    return (
        <div className="mt-8 bg-card rounded-lg p-6 shadow-lg">
            <h3 className="text-3xl font-bold mb-6 text-center">Alarm</h3>
            <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-4 justify-center">
                    <input
                        type="time"
                        value={newAlarm.time}
                        onChange={(e) => setNewAlarm({ ...newAlarm, time: e.target.value })}
                        className="border px-4 py-2 rounded-lg focus:outline-none text-center shadow-sm"
                        placeholder="Set Time"
                    />
                    <input
                        type="text"
                        placeholder="Label"
                        value={newAlarm.label}
                        onChange={(e) => setNewAlarm({ ...newAlarm, label: e.target.value })}
                        className="border px-4 py-2 rounded-lg focus:outline-none text-center shadow-sm"
                    />
                    <select
                        value={newAlarm.sound}
                        onChange={(e) => setNewAlarm({ ...newAlarm, sound: e.target.value })}
                        className="border px-4 py-2 rounded-lg focus:outline-none shadow-sm"
                    >
                        <option value="default">Default</option>
                        <option value="https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae1b6.mp3">Beep</option>
                        <option value="https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae1b6.mp3">Chime</option>
                    </select>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isRecurring}
                            onChange={(e) => setIsRecurring(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <span className="text-sm">Recurring</span>
                    </label>
                    <button
                        onClick={addAlarm}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600  shadow-md transition-transform transform hover:scale-105"
                    >
                        Add Alarm
                    </button>
                </div>
                <ul className="space-y-4 mt-4">
                    {alarms.map((alarm, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="flex justify-between items-center bg-white px-6 py-4 rounded-lg shadow-md border-l-4 border-blue-500"
                        >
                            <div>
                                <span className="font-semibold text-lg text-blue-700">{alarm.time}</span>
                                <span className="text-sm text-gray-600 ml-2">{alarm.label || "No Label"}</span>
                            </div>
                            <button
                                onClick={() => removeAlarm(index)}
                                className="text-red-500 hover:text-red-600 focus:ring-2 focus:ring-red-400"
                            >
                                Remove
                            </button>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function ClockTimer() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timerMinutes, setTimerMinutes] = useState(25);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(25 * 60);
    const [initialTotalSeconds, setInitialTotalSeconds] = useState(25 * 60);
    const [customInput, setCustomInput] = useState(0);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const intervalRef = useRef(null);
    const audioRef = useRef(null);

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

    // Play sound when timer finishes
    useEffect(() => {
        if (totalSeconds === 0 && audioRef.current) {
            audioRef.current.play();
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
            setShowCustomInput(false);
        }
    };

    const handleCustomInput = (e) => {
        setCustomInput(e.target.value.replace(/[^0-9]/g, ''));
    };

    const setCustomTimer = () => {
        const minutes = Math.max(1, parseInt(customInput, 10) || 0);
        setPresetTimer(minutes);
        setCustomInput(0);
        setShowCustomInput(false);
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
                <main className="mt-10 flex-1 container mx-auto px-4 py-8">
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
                                className="bg-card rounded-lg p-8 text-center shadow-lg"
                            >
                                <h2 className="text-2xl font-semibold mb-6">Current Time</h2>
                                <CurrentTimeDisplay currentTime={currentTime} formatTime={formatTime} formatDate={formatDate} />
                                <WorldClock />
                            </motion.div>

                            {/* Timer */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="bg-card rounded-lg p-8 shadow-lg"
                            >
                                <h2 className="text-2xl font-semibold mb-6 text-center">Pomodoro Timer</h2>
                                {/* Timer Display */}
                                <div className="text-center mb-6">
                                    <motion.div
                                        animate={{ scale: isTimerRunning ? 1.08 : 1 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                                        className="text-6xl font-mono font-bold text-green-600 mb-4 select-none"
                                        aria-label="Timer countdown"
                                    >
                                        {String(timerMinutes).padStart(2, '0')}:
                                        {String(timerSeconds).padStart(2, '0')}
                                    </motion.div>
                                    {/* Progress Bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4" aria-label="Timer progress">
                                        <motion.div
                                            className="bg-green-500 h-2 rounded-full"
                                            animate={{ width: `${progressPercentage}%` }}
                                            transition={{ duration: 1 }}
                                            style={{ width: `${progressPercentage}%` }}
                                        ></motion.div>
                                    </div>
                                </div>
                                {/* Timer Controls */}
                                <div className="flex justify-center gap-4 mb-6">
                                    <button
                                        onClick={toggleTimer}
                                        aria-label={isTimerRunning ? "Pause timer" : "Start timer"}
                                        className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 flex items-center gap-2 px-6 py-3 rounded-md text-white font-medium transition-colors ${
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
                                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
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
                                            aria-label="Decrease timer by 5 minutes"
                                            className="focus:outline-none focus:ring-2 focus:ring-blue-400 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                                            className="focus:outline-none focus:ring-2 focus:ring-blue-400 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                                                className="focus:outline-none focus:ring-2 focus:ring-purple-400 px-3 py-1 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                {minutes}m
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setShowCustomInput((v) => !v)}
                                            disabled={isTimerRunning}
                                            aria-label="Set custom timer"
                                            className="focus:outline-none focus:ring-2 focus:ring-yellow-400 px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                                                className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center"
                                                aria-label="Custom timer minutes"
                                                placeholder="min"
                                                autoFocus
                                            />
                                            <button
                                                onClick={setCustomTimer}
                                                className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                                aria-label="Set custom timer"
                                            >
                                                Set
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {/* Hidden audio for timer end notification */}
                                <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae1b6.mp3" preload="auto" />
                            </motion.div>
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
