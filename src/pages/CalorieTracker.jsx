import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { PageTransition } from '../components/PageTransition';
import { Calculator, Plus, Trash2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

/**
 * CalorieTracker
 *
 * This implementation extends the simple calorie calculator to add a daily
 * intake tracker and persistent storage. Users can enter their personal
 * information, calculate their basal metabolic rate (BMR), total daily
 * energy expenditure (TDEE) and recommended calories, then record the
 * foods they eat throughout the day. The intake log and form inputs are
 * persisted to localStorage so that refreshing the page will restore the
 * previous state. A running total of calories consumed is displayed and
 * can be reset independently of the calculator.
 */
export default function CalorieTracker() {
  const { toast } = useToast();

  // Form state. Persisted to localStorage.
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'sedentary',
    goal: 'maintain',
    unit: 'metric',
  });

  // Result of calorie calculation
  const [results, setResults] = useState(null);

  // Validation errors
  const [errors, setErrors] = useState({});

  // Daily intake log and temporary inputs for new items. Persisted to localStorage.
  const [dailyIntake, setDailyIntake] = useState([]);
  const [newFood, setNewFood] = useState('');
  const [newCalories, setNewCalories] = useState('');

  // Load persisted form data and intake on initial mount
  useEffect(() => {
    try {
      const savedForm = localStorage.getItem('calorieTrackerFormData');
      const savedIntake = localStorage.getItem('calorieTrackerDailyIntake');
      if (savedForm) {
        setFormData(prev => ({ ...prev, ...JSON.parse(savedForm) }));
      }
      if (savedIntake) {
        setDailyIntake(JSON.parse(savedIntake));
      }
    } catch (err) {
      // ignore JSON parsing errors and start fresh
    }
  }, []);

  // Persist form data and intake whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('calorieTrackerFormData', JSON.stringify(formData));
      localStorage.setItem('calorieTrackerDailyIntake', JSON.stringify(dailyIntake));
    } catch (err) {
      // storage may be unavailable; ignore
    }
  }, [formData, dailyIntake]);

  // Activity level multipliers
  const activityLevels = useMemo(
    () => ({
      sedentary: { label: 'Sedentary (little/no exercise)', multiplier: 1.2 },
      light: { label: 'Light activity (1–3 days/week)', multiplier: 1.375 },
      moderate: { label: 'Moderate activity (3–5 days/week)', multiplier: 1.55 },
      very: { label: 'Very active (6–7 days/week)', multiplier: 1.725 },
      extra: { label: 'Extra active (physical job)', multiplier: 1.9 },
    }),
    []
  );

  // Goal adjustments
  const goals = useMemo(
    () => ({
      lose2: { label: 'Lose 2 lbs/week', adjustment: -1000 },
      lose1: { label: 'Lose 1 lb/week', adjustment: -500 },
      lose0_5: { label: 'Lose 0.5 lb/week', adjustment: -250 },
      maintain: { label: 'Maintain weight', adjustment: 0 },
      gain0_5: { label: 'Gain 0.5 lb/week', adjustment: 250 },
      gain1: { label: 'Gain 1 lb/week', adjustment: 500 },
    }),
    []
  );

  // Validate form inputs
  const validate = useCallback((data) => {
    const errs = {};
    const ageNum = parseFloat(data.age);
    if (!data.age || isNaN(ageNum) || ageNum < 1 || ageNum > 120 || ageNum !== Math.floor(ageNum)) {
      errs.age = 'Enter a valid age (1–120, whole numbers only).';
    }
    const weightNum = parseFloat(data.weight);
    if (!data.weight || isNaN(weightNum) || weightNum <= 0 || weightNum > 1000) {
      errs.weight = `Enter a valid weight (0–1000 ${data.unit === 'metric' ? 'kg' : 'lbs'}).`;
    }
    const heightNum = parseFloat(data.height);
    const maxHeight = data.unit === 'metric' ? 300 : 120;
    if (!data.height || isNaN(heightNum) || heightNum <= 0 || heightNum > maxHeight) {
      errs.height = `Enter a valid height (0–${maxHeight} ${data.unit === 'metric' ? 'cm' : 'inches'}).`;
    }
    return errs;
  }, []);

  // Handle changes to form inputs
  const handleInputChange = useCallback(
    (field, value) => {
      setFormData((prev) => {
        const updated = { ...prev, [field]: value };
        // Reset results when user edits form
        if (results) setResults(null);
        setErrors(validate(updated));
        return updated;
      });
    },
    [results, validate]
  );

  // Calculate BMR, TDEE and recommended calories
  const calculateCalories = useCallback(() => {
    const validation = validate(formData);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    let weightKg = parseFloat(formData.weight);
    let heightCm = parseFloat(formData.height);
    if (formData.unit === 'imperial') {
      weightKg = weightKg * 0.453592;
      heightCm = heightCm * 2.54;
    }
    let bmr;
    if (formData.gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(formData.age, 10) + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(formData.age, 10) - 161;
    }
    const tdee = bmr * activityLevels[formData.activityLevel].multiplier;
    const target = Math.max(tdee + goals[formData.goal].adjustment, 1200);
    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(target),
      goal: goals[formData.goal].label,
      activityLevel: activityLevels[formData.activityLevel].label,
    });
  }, [formData, validate, activityLevels, goals]);

  // Reset form and results
  const resetCalculator = useCallback(() => {
    setFormData({
      age: '',
      gender: 'male',
      weight: '',
      height: '',
      activityLevel: 'sedentary',
      goal: 'maintain',
      unit: 'metric',
    });
    setResults(null);
    setErrors({});
  }, []);

  // Add a new food item to the daily intake log
  const addFoodItem = useCallback(() => {
    const name = newFood.trim();
    const cals = parseFloat(newCalories);
    if (!name || isNaN(cals) || cals <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid entry',
        description: 'Please enter a food name and a positive calorie value.',
      });
      return;
    }
    setDailyIntake((prev) => [...prev, { food: name, calories: cals }]);
    setNewFood('');
    setNewCalories('');
    toast({ title: 'Item added', description: `${name} (${cals} cal) recorded.` });
  }, [newFood, newCalories, toast]);

  // Remove all items from daily intake
  const clearIntake = useCallback(() => {
    setDailyIntake([]);
    toast({ title: 'Log cleared', description: 'Daily intake log has been reset.' });
  }, [toast]);

  // Compute total calories consumed
  const totalConsumed = useMemo(
    () => dailyIntake.reduce((sum, item) => sum + item.calories, 0),
    [dailyIntake]
  );

  // Determine if form is valid for submission
  const isFormValid = useMemo(
    () =>
      Object.keys(errors).length === 0 && formData.age && formData.weight && formData.height,
    [errors, formData.age, formData.weight, formData.height]
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <NavBar />
        <main className="mt-10 flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center" aria-label="Calorie Calculator">
              Calorie Calculator & Tracker
            </h1>

            {/* Personal information form */}
            <form
              className="bg-card rounded-xl p-6 mb-8 shadow-md"
              onSubmit={(e) => {
                e.preventDefault();
                calculateCalories();
              }}
              autoComplete="off"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Calculator size={22} /> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="unit" className="block text-sm font-medium mb-1">
                    Unit System
                  </label>
                  <select
                    id="unit"
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-background focus:ring focus:ring-blue-500"
                  >
                    <option value="metric">Metric (kg, cm)</option>
                    <option value="imperial">Imperial (lbs, inches)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium mb-1">
                    Gender
                  </label>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-background focus:ring focus:ring-blue-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-medium mb-1">
                    Age (years)
                  </label>
                  <input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md bg-background ${errors.age ? 'border-red-500' : ''}`}
                    placeholder="e.g. 30"
                    min="1"
                    max="120"
                    step="1"
                    required
                  />
                  {errors.age && <span className="text-xs text-red-500">{errors.age}</span>}
                </div>
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium mb-1">
                    Weight ({formData.unit === 'metric' ? 'kg' : 'lbs'})
                  </label>
                  <input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md bg-background ${errors.weight ? 'border-red-500' : ''}`}
                    placeholder={formData.unit === 'metric' ? 'e.g. 70' : 'e.g. 154'}
                    min="1"
                    max="1000"
                    step="0.1"
                    required
                  />
                  {errors.weight && <span className="text-xs text-red-500">{errors.weight}</span>}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="height" className="block text-sm font-medium mb-1">
                    Height ({formData.unit === 'metric' ? 'cm' : 'inches'})
                  </label>
                  <input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md bg-background ${errors.height ? 'border-red-500' : ''}`}
                    placeholder={formData.unit === 'metric' ? 'e.g. 175' : 'e.g. 69'}
                    min="1"
                    max={formData.unit === 'metric' ? 300 : 120}
                    step="0.1"
                    required
                  />
                  {errors.height && <span className="text-xs text-red-500">{errors.height}</span>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="activityLevel" className="block text-sm font-medium mb-1">
                    Activity Level
                  </label>
                  <select
                    id="activityLevel"
                    value={formData.activityLevel}
                    onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-background focus:ring focus:ring-blue-500"
                  >
                    {Object.entries(activityLevels).map(([key, obj]) => (
                      <option key={key} value={key}>
                        {obj.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="goal" className="block text-sm font-medium mb-1">
                    Goal
                  </label>
                  <select
                    id="goal"
                    value={formData.goal}
                    onChange={(e) => handleInputChange('goal', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-background focus:ring focus:ring-blue-500"
                  >
                    {Object.entries(goals).map(([key, obj]) => (
                      <option key={key} value={key}>
                        {obj.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-start mt-6">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`px-6 py-2 rounded-md text-white font-medium transition-colors ${!isFormValid ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  Calculate
                </button>
                <button
                  type="button"
                  onClick={resetCalculator}
                  className="px-6 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
                >
                  Reset
                </button>
              </div>
            </form>

            {/* Results display */}
            {results && (
              <div className="bg-card p-6 rounded-xl mb-8 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Results</h3>
                <p className="mb-1">BMR: {results.bmr} calories/day</p>
                <p className="mb-1">TDEE: {results.tdee} calories/day</p>
                <p className="mb-1">Recommended intake: {results.targetCalories} calories/day</p>
                <p className="text-sm text-gray-500">Goal: {results.goal} &middot; Activity: {results.activityLevel}</p>
              </div>
            )}

            {/* Daily intake tracker */}
            <div className="bg-card p-6 rounded-xl mb-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Plus size={20} /> Daily Intake
              </h2>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                  type="text"
                  value={newFood}
                  onChange={(e) => setNewFood(e.target.value)}
                  placeholder="Food name"
                  className="flex-1 px-3 py-2 border rounded-md bg-background"
                />
                <input
                  type="number"
                  value={newCalories}
                  onChange={(e) => setNewCalories(e.target.value)}
                  placeholder="Calories"
                  className="w-32 px-3 py-2 border rounded-md bg-background"
                  min="1"
                />
                <button
                  type="button"
                  onClick={addFoodItem}
                  className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                >
                  Add
                </button>
              </div>
              {dailyIntake.length > 0 ? (
                <>
                  <ul className="mb-4">
                    {dailyIntake.map((item, idx) => (
                      <li key={idx} className="flex justify-between py-1 border-b border-border/20">
                        <span>{item.food}</span>
                        <span>{item.calories} cal</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-medium mb-4">Total consumed: {totalConsumed} calories</p>
                  <button
                    type="button"
                    onClick={clearIntake}
                    className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Clear Log
                  </button>
                </>
              ) : (
                <p className="text-sm text-gray-500">No items added yet.</p>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}