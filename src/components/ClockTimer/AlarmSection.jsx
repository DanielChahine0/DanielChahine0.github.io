import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

// Alarm Section
const DEFAULT_SOUND = "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae1b6.mp3";
const CHIME_SOUND = "https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3";

export function AlarmSection() {
    const [alarms, setAlarms] = useState(() => {
        // Persist alarms in localStorage
        try {
            const stored = localStorage.getItem('alarms');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });
    const [newAlarm, setNewAlarm] = useState({ time: "", label: "", sound: "default" });
    const [isRecurring, setIsRecurring] = useState(false);
    const [audioPermissionGranted, setAudioPermissionGranted] = useState(false);
    const inputRef = useRef(null);

    // Request audio and notification permission on mount
    useEffect(() => {
        const requestAudioPermission = async () => {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                if (audioContext.state === 'suspended') {
                    await audioContext.resume();
                }
                setAudioPermissionGranted(true);
                audioContext.close();
            } catch {
                setAudioPermissionGranted(false);
            }
        };
        requestAudioPermission();
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
    }, []);

    // Persist alarms to localStorage
    useEffect(() => {
        localStorage.setItem('alarms', JSON.stringify(alarms));
    }, [alarms]);

    // Alarm checking interval
    useEffect(() => {
        const checkAlarms = setInterval(() => {
            const now = new Date();
            const currentTimeString = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
            alarms.forEach((alarm, index) => {
                if (currentTimeString === alarm.time) {
                    const alarmKey = `${alarm.time}-${alarm.id || index}-${now.getDate()}-${now.getMonth()}`;
                    const triggeredAlarms = JSON.parse(localStorage.getItem('triggeredAlarms') || '[]');
                    if (!triggeredAlarms.includes(alarmKey)) {
                        triggeredAlarms.push(alarmKey);
                        localStorage.setItem('triggeredAlarms', JSON.stringify(triggeredAlarms));
                        if (Notification.permission === "default") {
                            Notification.requestPermission();
                        }
                        if (Notification.permission === "granted") {
                            new Notification(alarm.label || "Alarm", {
                                body: "Your alarm is ringing!",
                                icon: "/favicon.ico",
                            });
                        }
                        // Play sound
                        const audio = new Audio(alarm.sound);
                        audio.volume = 0.7;
                        audio.play().catch(() => {
                            alert(alarm.label || "Alarm is ringing!");
                        });
                        // Vibrate if supported
                        if (navigator.vibrate) {
                            navigator.vibrate([200, 100, 200]);
                        }
                        if (!alarm.recurring) {
                            setAlarms(prev => prev.filter((_, i) => i !== index));
                        }
                    }
                }
            });
            // Clean up old triggered alarms (older than 1 day)
            const triggeredAlarms = JSON.parse(localStorage.getItem('triggeredAlarms') || '[]');
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const cleanedAlarms = triggeredAlarms.filter(key => {
                const parts = key.split('-');
                if (parts.length >= 4) {
                    const day = parseInt(parts[2]);
                    const month = parseInt(parts[3]);
                    return day >= yesterday.getDate() && month >= yesterday.getMonth();
                }
                return false;
            });
            localStorage.setItem('triggeredAlarms', JSON.stringify(cleanedAlarms));
        }, 1000);
        return () => clearInterval(checkAlarms);
    }, [alarms]);

    const addAlarm = useCallback(() => {
        if (newAlarm.time) {
            const validSound = newAlarm.sound === "default" ? DEFAULT_SOUND : newAlarm.sound;
            setAlarms(prev => [
                ...prev,
                { ...newAlarm, sound: validSound, recurring: isRecurring, id: Date.now() + Math.random() }
            ]);
            setNewAlarm({ time: "", label: "", sound: "default" });
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [newAlarm, isRecurring]);

    const removeAlarm = useCallback((index) => {
        if (window.confirm("Remove this alarm?")) {
            setAlarms(alarms.filter((_, i) => i !== index));
        }
    }, [alarms]);

    const testSound = useCallback((soundUrl) => {
        const testAudio = new Audio(soundUrl || DEFAULT_SOUND);
        testAudio.volume = 0.7;
        testAudio.play()
            .then(() => setAudioPermissionGranted(true))
            .catch(() => {
                alert("Please interact with the page first to enable audio playback");
            });
    }, []);

    return (
        <section className="mt-8 bg-card rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center">Alarm</h3>
            {!audioPermissionGranted && (
                <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-800 text-sm text-center">
                    <strong>Note:</strong> Audio may not work until you interact with the page. Click the test sound button (🔊) to enable audio playback.
                </div>
            )}
            <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-4 justify-center">
                    <input
                        ref={inputRef}
                        type="time"
                        value={newAlarm.time}
                        onChange={(e) => setNewAlarm({ ...newAlarm, time: e.target.value })}
                        className="px-4 py-2 rounded-md text-center shadow-sm border border-input focus:outline-none"
                        placeholder="Set Time"
                        aria-label="Set alarm time"
                    />
                    <input
                        type="text"
                        placeholder="Label"
                        value={newAlarm.label}
                        onChange={(e) => setNewAlarm({ ...newAlarm, label: e.target.value })}
                        className="px-4 py-2 rounded-md text-center shadow-sm border border-input focus:outline-none"
                        aria-label="Alarm label"
                    />
                    <select
                        value={newAlarm.sound}
                        onChange={(e) => setNewAlarm({ ...newAlarm, sound: e.target.value })}
                        className="px-4 py-2 rounded-md shadow-sm border border-input focus:outline-none"
                        aria-label="Alarm sound"
                    >
                        <option value="default">Default</option>
                        <option value={DEFAULT_SOUND}>Beep</option>
                        <option value={CHIME_SOUND}>Chime</option>
                    </select>
                    <button
                        type="button"
                        onClick={() => testSound(newAlarm.sound === "default" ? DEFAULT_SOUND : newAlarm.sound)}
                        className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 shadow-sm text-sm focus:outline-none"
                        title="Test sound"
                        aria-label="Test alarm sound"
                    >
                        🔊
                    </button>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isRecurring}
                            onChange={(e) => setIsRecurring(e.target.checked)}
                            className="w-4 h-4 focus:outline-none accent-primary"
                            aria-label="Recurring alarm"
                        />
                        <span className="text-sm">Recurring</span>
                    </label>
                    <button
                        onClick={addAlarm}
                        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/60 shadow-md transition-transform transform hover:scale-105 focus:outline-none"
                        aria-label="Add alarm"
                    >
                        Add Alarm
                    </button>
                </div>
                <ul className="space-y-4 mt-4">
                    {alarms.map((alarm, index) => (
                        <motion.li
                            key={alarm.id || index}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="flex justify-between items-center bg-muted px-6 py-4 rounded-lg shadow-md"
                            role="listitem"
                        >
                            <div>
                                <span className="font-semibold text-lg text-primary">{alarm.time}</span>
                                <span className="text-sm text-muted-foreground ml-2">{alarm.label || "No Label"}</span>
                                {alarm.recurring && <span className="ml-2 text-xs text-green-600">(Recurring)</span>}
                            </div>
                            <button
                                onClick={() => removeAlarm(index)}
                                className="text-red-500 hover:text-red-600 focus:outline-none"
                                aria-label="Remove alarm"
                            >
                                Remove
                            </button>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
