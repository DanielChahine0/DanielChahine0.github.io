
import { useState, useCallback, useMemo } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
import { Calculator, Target, Activity, RotateCcw } from "lucide-react";


/**
 * CalorieTracker - A calorie calculator using the Mifflin-St Jeor Equation.
 * Users can input their personal data, select activity level and goal, and get BMR, TDEE, and target calories.
 */
export default function CalorieTracker() {
    // State for form data, results, and errors
    const [formData, setFormData] = useState({
        age: "",
        gender: "male",
        weight: "",
        height: "",
        activityLevel: "sedentary",
        goal: "maintain",
        unit: "metric"
    });
    const [results, setResults] = useState(null);
    const [errors, setErrors] = useState({});


    // Activity levels and their multipliers (moved to useMemo for performance)
    const activityLevels = useMemo(() => ({
        sedentary: { label: "Sedentary (little/no exercise)", multiplier: 1.2 },
        light: { label: "Light activity (light exercise 1-3 days/week)", multiplier: 1.375 },
        moderate: { label: "Moderate activity (moderate exercise 3-5 days/week)", multiplier: 1.55 },
        very: { label: "Very active (hard exercise 6-7 days/week)", multiplier: 1.725 },
        extra: { label: "Extra active (very hard exercise, physical job)", multiplier: 1.9 }
    }), []);

    // Goal options and their calorie adjustments (moved to useMemo for performance)
    const goals = useMemo(() => ({
        lose2: { label: "Lose 2 lbs/week", adjustment: -1000 },
        lose1: { label: "Lose 1 lb/week", adjustment: -500 },
        lose0_5: { label: "Lose 0.5 lb/week", adjustment: -250 },
        maintain: { label: "Maintain weight", adjustment: 0 },
        gain0_5: { label: "Gain 0.5 lb/week", adjustment: 250 },
        gain1: { label: "Gain 1 lb/week", adjustment: 500 }
    }), []);



    // Validate form data with improved validation
    const validate = useCallback((data) => {
        const newErrors = {};
        
        // Age validation
        const age = parseFloat(data.age);
        if (!data.age || isNaN(age) || age < 1 || age > 120 || age !== Math.floor(age)) {
            newErrors.age = "Enter a valid age (1-120, whole numbers only).";
        }
        
        // Weight validation - allow decimals
        const weight = parseFloat(data.weight);
        if (!data.weight || isNaN(weight) || weight <= 0 || weight > 1000) {
            newErrors.weight = `Enter a valid weight (0-1000 ${data.unit === "metric" ? "kg" : "lbs"}).`;
        }
        
        // Height validation - allow decimals
        const height = parseFloat(data.height);
        const maxHeight = data.unit === "metric" ? 300 : 120; // 300cm or 120 inches
        if (!data.height || isNaN(height) || height <= 0 || height > maxHeight) {
            newErrors.height = `Enter a valid height (0-${maxHeight} ${data.unit === "metric" ? "cm" : "inches"}).`;
        }
        
        return newErrors;
    }, []);


    // Handle input changes and validate (optimized with useCallback)
    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };
            // Clear results when form data changes to avoid confusion
            if (results) setResults(null);
            // Validate on change for immediate feedback
            setErrors(validate(updated));
            return updated;
        });
    }, [validate, results]);


    // Calculate calories based on form data (optimized with useCallback)
    const calculateCalories = useCallback(() => {
        const { age, gender, weight, height, activityLevel, goal, unit } = formData;
        const validation = validate(formData);
        setErrors(validation);
        if (Object.keys(validation).length > 0) return;

        let weightKg = parseFloat(weight);
        let heightCm = parseFloat(height);

        // Convert to metric if needed
        if (unit === "imperial") {
            weightKg = weightKg * 0.453592; // lbs to kg
            heightCm = heightCm * 2.54; // inches to cm
        }

        // Calculate BMR using Mifflin-St Jeor Equation
        let bmr;
        if (gender === "male") {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(age) + 5;
        } else {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(age) - 161;
        }

        // Calculate TDEE (Total Daily Energy Expenditure)
        const tdee = bmr * activityLevels[activityLevel].multiplier;

        // Adjust for goal
        const targetCalories = Math.max(tdee + goals[goal].adjustment, 1200); // Minimum 1200 calories for safety

        setResults({
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            targetCalories: Math.round(targetCalories),
            goal: goals[goal].label,
            activityLevel: activityLevels[activityLevel].label,
            summary: `Based on your activity level (${activityLevels[activityLevel].label.toLowerCase()}) and your goal (${goals[goal].label.toLowerCase()}), you should consume approximately ${Math.round(targetCalories)} calories per day.${targetCalories < tdee ? ' Note: Very low calorie diets should be supervised by a healthcare professional.' : ''}`
        });
    }, [formData, validate, activityLevels, goals]);


    // Reset all fields (optimized with useCallback)
    const resetCalculator = useCallback(() => {
        setFormData({
            age: "",
            gender: "male",
            weight: "",
            height: "",
            activityLevel: "sedentary",
            goal: "maintain",
            unit: "metric"
        });
        setResults(null);
        setErrors({});
    }, []);

    // Memoize form validation state for performance
    const isFormValid = useMemo(() => {
        return Object.keys(errors).length === 0 && 
               formData.age && 
               formData.weight && 
               formData.height;
    }, [errors, formData.age, formData.weight, formData.height]);

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
                        <h1 className="text-4xl font-bold mb-8 text-center" tabIndex={0} aria-label="Calorie Calculator">Calorie Calculator</h1>

                        {/* Calculator Form */}
                        <form
                            className="bg-card rounded-lg p-6 mb-6"
                            onSubmit={e => { e.preventDefault(); calculateCalories(); }}
                            aria-label="Calorie Calculator Form"
                            autoComplete="off"
                        >
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Calculator size={20} />
                                Personal Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Unit System */}
                                <div>
                                    <label htmlFor="unit" className="block text-sm font-medium mb-2">Unit System</label>
                                    <select
                                        id="unit"
                                        aria-label="Unit System"
                                        value={formData.unit}
                                        onChange={(e) => handleInputChange("unit", e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md bg-background focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                    >
                                        <option value="metric">Metric (kg, cm)</option>
                                        <option value="imperial">Imperial (lbs, inches)</option>
                                    </select>
                                </div>

                                {/* Gender */}
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium mb-2">Gender</label>
                                    <select
                                        id="gender"
                                        aria-label="Gender"
                                        value={formData.gender}
                                        onChange={(e) => handleInputChange("gender", e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md bg-background focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                {/* Age */}
                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium mb-2">Age (years)</label>
                                    <input
                                        id="age"
                                        aria-label="Age"
                                        type="number"
                                        value={formData.age}
                                        onChange={(e) => handleInputChange("age", e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md bg-background ${errors.age ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'} transition-colors`}
                                        placeholder="Enter your age"
                                        min="1"
                                        max="120"
                                        step="1"
                                        required
                                        aria-describedby={errors.age ? "age-error" : undefined}
                                    />
                                    {errors.age && <span id="age-error" className="text-xs text-red-500" role="alert">{errors.age}</span>}
                                </div>

                                {/* Weight */}
                                <div>
                                    <label htmlFor="weight" className="block text-sm font-medium mb-2">
                                        Weight ({formData.unit === "metric" ? "kg" : "lbs"})
                                    </label>
                                    <input
                                        id="weight"
                                        aria-label="Weight"
                                        type="number"
                                        value={formData.weight}
                                        onChange={(e) => handleInputChange("weight", e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md bg-background ${errors.weight ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'} transition-colors`}
                                        placeholder={`Enter weight in ${formData.unit === "metric" ? "kg" : "lbs"}`}
                                        min="1"
                                        max="1000"
                                        step="0.1"
                                        required
                                        aria-describedby={errors.weight ? "weight-error" : undefined}
                                    />
                                    {errors.weight && <span id="weight-error" className="text-xs text-red-500" role="alert">{errors.weight}</span>}
                                </div>

                                {/* Height */}
                                <div className="md:col-span-2">
                                    <label htmlFor="height" className="block text-sm font-medium mb-2">
                                        Height ({formData.unit === "metric" ? "cm" : "inches"})
                                    </label>
                                    <input
                                        id="height"
                                        aria-label="Height"
                                        type="number"
                                        value={formData.height}
                                        onChange={(e) => handleInputChange("height", e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md bg-background ${errors.height ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'} transition-colors`}
                                        placeholder={`Enter height in ${formData.unit === "metric" ? "cm" : "inches"}`}
                                        min="1"
                                        max={formData.unit === "metric" ? "300" : "120"}
                                        step="0.1"
                                        required
                                        aria-describedby={errors.height ? "height-error" : undefined}
                                    />
                                    {errors.height && <span id="height-error" className="text-xs text-red-500" role="alert">{errors.height}</span>}
                                </div>
                            </div>
                            <div className="flex gap-4 justify-center mt-6">
                                <button
                                    type="submit"
                                    disabled={!isFormValid}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${!isFormValid ? 'bg-blue-300 text-white cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                                    aria-disabled={!isFormValid}
                                >
                                    <Calculator size={20} />
                                    Calculate Calories
                                </button>
                                <button
                                    type="button"
                                    onClick={resetCalculator}
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                    aria-label="Reset all form fields"
                                >
                                    <RotateCcw size={20} />
                                    Reset
                                </button>
                            </div>
                        </form>

                        {/* Activity Level */}
                        <section className="bg-card rounded-lg p-6 mb-6" aria-labelledby="activity-level-heading">
                            <h2 id="activity-level-heading" className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Activity size={20} />
                                Activity Level
                            </h2>
                            <div className="space-y-2">
                                {Object.entries(activityLevels).map(([key, level]) => (
                                    <label key={key} className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-background/50 transition-colors">
                                        <input
                                            type="radio"
                                            name="activityLevel"
                                            value={key}
                                            checked={formData.activityLevel === key}
                                            onChange={(e) => handleInputChange("activityLevel", e.target.value)}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                            aria-checked={formData.activityLevel === key}
                                        />
                                        <span className="text-sm">{level.label}</span>
                                    </label>
                                ))}
                            </div>
                        </section>

                        {/* Goal */}
                        <section className="bg-card rounded-lg p-6 mb-6" aria-labelledby="goal-heading">
                            <h2 id="goal-heading" className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Target size={20} />
                                Goal
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {Object.entries(goals).map(([key, goal]) => (
                                    <label key={key} className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-background/50 transition-colors">
                                        <input
                                            type="radio"
                                            name="goal"
                                            value={key}
                                            checked={formData.goal === key}
                                            onChange={(e) => handleInputChange("goal", e.target.value)}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                            aria-checked={formData.goal === key}
                                        />
                                        <span className="text-sm">{goal.label}</span>
                                    </label>
                                ))}
                            </div>
                        </section>

                        {/* Results */}
                        {results && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-card rounded-lg p-6"
                                aria-live="polite"
                                aria-label="Calorie calculation results"
                            >
                                <h2 className="text-xl font-semibold mb-4" tabIndex={0}>Your Results</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-background rounded-lg p-4 text-center" aria-label="BMR result">
                                        <h3 className="text-sm font-medium text-foreground/60 mb-1">BMR</h3>
                                        <p className="text-2xl font-bold text-blue-600">{results.bmr}</p>
                                        <p className="text-xs text-foreground/60">calories/day at rest</p>
                                    </div>
                                    <div className="bg-background rounded-lg p-4 text-center" aria-label="TDEE result">
                                        <h3 className="text-sm font-medium text-foreground/60 mb-1">TDEE</h3>
                                        <p className="text-2xl font-bold text-green-600">{results.tdee}</p>
                                        <p className="text-xs text-foreground/60">calories/day with activity</p>
                                    </div>
                                    <div className="bg-background rounded-lg p-4 text-center" aria-label="Target calories result">
                                        <h3 className="text-sm font-medium text-foreground/60 mb-1">Target</h3>
                                        <p className="text-2xl font-bold text-purple-600">{results.targetCalories}</p>
                                        <p className="text-xs text-foreground/60">calories/day for goal</p>
                                    </div>
                                </div>
                                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg" aria-label="Summary of calorie recommendation">
                                    <p className="text-sm text-blue-800 dark:text-blue-200">
                                        <strong>Summary:</strong> {results.summary}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}