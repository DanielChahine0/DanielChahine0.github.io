import { Calendar, Heart } from "lucide-react";

// Helper to ensure date is always yyyy-mm-dd or empty
function getDateInputValue(dateStr) {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

export function InputSection({ 
    birthDate, 
    lifeExpectancy, 
    lifeExpectancyWarning,
    onBirthDateChange,
    onLifeExpectancyChange,
    onReset,
    birthDateInputRef
}) {
    return (
        <div className="bg-card rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="birth-date-input" className="block text-sm font-medium mb-2" title="Select your date of birth">
                        <Calendar className="inline mr-2 text-foreground" size={20} />
                        Your Birth Date
                    </label>
                    <input
                        id="birth-date-input"
                        type="date"
                        value={getDateInputValue(birthDate)}
                        onChange={onBirthDateChange}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        aria-label="Birth date"
                        ref={birthDateInputRef}
                        autoFocus
                    />
                </div>
                <div>
                    <label htmlFor="life-expectancy-input" className="block text-sm font-medium mb-2" title="Average global life expectancy is about 73 years">
                        <Heart className="inline mr-2" size={16} />
                        Life Expectancy (years)
                    </label>
                    <input
                        id="life-expectancy-input"
                        type="number"
                        value={lifeExpectancy}
                        onChange={onLifeExpectancyChange}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        min="1"
                        max="150"
                        aria-label="Life expectancy in years"
                        title="Enter your expected lifespan in years"
                    />
                    {lifeExpectancyWarning && (
                        <div className="text-yellow-600 text-xs mt-1" role="alert" aria-live="polite">{lifeExpectancyWarning}</div>
                    )}
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm text-gray-700 transition"
                    onClick={onReset}
                    aria-label="Reset inputs"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
