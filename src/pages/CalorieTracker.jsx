import { useState } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
import { Calculator, Target, Activity } from "lucide-react";

export default function CalorieTracker() {
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

    const activityLevels = {
        sedentary: { label: "Sedentary (little/no exercise)", multiplier: 1.2 },
        light: { label: "Light activity (light exercise 1-3 days/week)", multiplier: 1.375 },
        moderate: { label: "Moderate activity (moderate exercise 3-5 days/week)", multiplier: 1.55 },
        very: { label: "Very active (hard exercise 6-7 days/week)", multiplier: 1.725 },
        extra: { label: "Extra active (very hard exercise, physical job)", multiplier: 1.9 }
    };

    const goals = {
        lose2: { label: "Lose 2 lbs/week", adjustment: -1000 },
        lose1: { label: "Lose 1 lb/week", adjustment: -500 },
        lose0_5: { label: "Lose 0.5 lb/week", adjustment: -250 },
        maintain: { label: "Maintain weight", adjustment: 0 },
        gain0_5: { label: "Gain 0.5 lb/week", adjustment: 250 },
        gain1: { label: "Gain 1 lb/week", adjustment: 500 }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const calculateCalories = () => {
        const { age, gender, weight, height, activityLevel, goal, unit } = formData;
        
        if (!age || !weight || !height) return;

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
        const targetCalories = tdee + goals[goal].adjustment;

        setResults({
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            targetCalories: Math.round(targetCalories),
            goal: goals[goal].label,
            activityLevel: activityLevels[activityLevel].label
        });
    };

    const resetCalculator = () => {
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
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl font-bold mb-8 text-center">Calorie Calculator</h1>
                        
                        {/* Calculator Form */}
                        <div className="bg-card rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Calculator size={20} />
                                Personal Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Unit System */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Unit System</label>
                                    <select
                                        value={formData.unit}
                                        onChange={(e) => handleInputChange("unit", e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md bg-background"
                                    >
                                        <option value="metric">Metric (kg, cm)</option>
                                        <option value="imperial">Imperial (lbs, inches)</option>
                                    </select>
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Gender</label>
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => handleInputChange("gender", e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md bg-background"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                {/* Age */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Age (years)</label>
                                    <input
                                        type="number"
                                        value={formData.age}
                                        onChange={(e) => handleInputChange("age", e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md bg-background"
                                        placeholder="Enter your age"
                                        min="1"
                                        max="120"
                                    />
                                </div>

                                {/* Weight */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Weight ({formData.unit === "metric" ? "kg" : "lbs"})
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.weight}
                                        onChange={(e) => handleInputChange("weight", e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md bg-background"
                                        placeholder={`Enter weight in ${formData.unit === "metric" ? "kg" : "lbs"}`}
                                        min="1"
                                    />
                                </div>

                                {/* Height */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">
                                        Height ({formData.unit === "metric" ? "cm" : "inches"})
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.height}
                                        onChange={(e) => handleInputChange("height", e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md bg-background"
                                        placeholder={`Enter height in ${formData.unit === "metric" ? "cm" : "inches"}`}
                                        min="1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Activity Level */}
                        <div className="bg-card rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Activity size={20} />
                                Activity Level
                            </h2>
                            <div className="space-y-2">
                                {Object.entries(activityLevels).map(([key, level]) => (
                                    <label key={key} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="activityLevel"
                                            value={key}
                                            checked={formData.activityLevel === key}
                                            onChange={(e) => handleInputChange("activityLevel", e.target.value)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">{level.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Goal */}
                        <div className="bg-card rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Target size={20} />
                                Goal
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {Object.entries(goals).map(([key, goal]) => (
                                    <label key={key} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="goal"
                                            value={key}
                                            checked={formData.goal === key}
                                            onChange={(e) => handleInputChange("goal", e.target.value)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">{goal.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Calculate Button */}
                        <div className="flex gap-4 justify-center mb-6">
                            <button
                                onClick={calculateCalories}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
                            >
                                <Calculator size={20} />
                                Calculate Calories
                            </button>
                            <button
                                onClick={resetCalculator}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors font-medium"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Results */}
                        {results && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-card rounded-lg p-6"
                            >
                                <h2 className="text-xl font-semibold mb-4">Your Results</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-background rounded-lg p-4 text-center">
                                        <h3 className="text-sm font-medium text-foreground/60 mb-1">BMR</h3>
                                        <p className="text-2xl font-bold text-blue-600">{results.bmr}</p>
                                        <p className="text-xs text-foreground/60">calories/day at rest</p>
                                    </div>
                                    <div className="bg-background rounded-lg p-4 text-center">
                                        <h3 className="text-sm font-medium text-foreground/60 mb-1">TDEE</h3>
                                        <p className="text-2xl font-bold text-green-600">{results.tdee}</p>
                                        <p className="text-xs text-foreground/60">calories/day with activity</p>
                                    </div>
                                    <div className="bg-background rounded-lg p-4 text-center">
                                        <h3 className="text-sm font-medium text-foreground/60 mb-1">Target</h3>
                                        <p className="text-2xl font-bold text-purple-600">{results.targetCalories}</p>
                                        <p className="text-xs text-foreground/60">calories/day for goal</p>
                                    </div>
                                </div>
                                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        <strong>Summary:</strong> Based on your {results.activityLevel.toLowerCase()} and goal to {results.goal.toLowerCase()}, 
                                        you should consume approximately <strong>{results.targetCalories} calories per day</strong>.
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