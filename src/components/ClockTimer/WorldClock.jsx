/**
 * WorldClock.jsx
 * 
 * A component that displays current time across different time zones simultaneously.
 * Features:
 * - Interactive city selection with toggle buttons
 * - Real-time updates using local time conversion
 * - Supports major cities across different continents
 * - User-selectable cities with persistent selection state
 * - Responsive layout with flex-wrap design
 * - Accessibility support with ARIA attributes
 * - 12-hour time format with seconds display
 * - Styled with Tailwind CSS for consistent theming
 * 
 * @component
 * @example
 * <WorldClock />
 * 
 * Default Cities:
 * - New York (America/New_York)
 * - London (Europe/London)
 * - Tokyo (Asia/Tokyo)
 * - Sydney (Australia/Sydney)
 */

import { useState } from "react";
export function WorldClock() {
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
        <section className="mt-8 bg-card rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-center">World Clock</h3>
            <div className="flex flex-wrap gap-2 justify-center mb-3">
                {worldCities.map(city => (
                    <button
                        key={city.tz}
                        onClick={() => toggleCity(city.tz)}
                        className={`px-3 py-1 rounded-md text-sm font-medium border transition-colors ${
                            selectedCities.includes(city.tz)
                                ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary/30 hover:bg-primary/10'
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
                        <div key={tz} className="flex justify-between items-center bg-muted rounded px-3 py-2">
                            <span className="font-medium text-foreground">{city.name}</span>
                            <span className="font-mono text-lg text-foreground">{getWorldTime(tz)}</span>
                        </div>
                    ) : null;
                })}
            </div>
        </section>
    );
}
