import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { PageTransition } from '../components/PageTransition';
import { CalorieForm } from '../components/CalorieCalculator/CalorieForm';
import { CalorieResults } from '../components/CalorieCalculator/CalorieResults';
import { DailyIntakeTracker } from '../components/CalorieCalculator/DailyIntakeTracker';
import { activityLevels, goals } from '../components/CalorieCalculator/calorieConstants';
import { validateFormData, calculateCalories as performCalculation } from '../components/CalorieCalculator/calorieCalculations';
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
  const memoizedActivityLevels = useMemo(() => activityLevels, []);

  // Goal adjustments
  const memoizedGoals = useMemo(() => goals, []);

  // Validate form inputs
  const validate = useCallback((data) => {
    return validateFormData(data);
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

    const calculatedResults = performCalculation(formData, memoizedActivityLevels, memoizedGoals);
    setResults(calculatedResults);
  }, [formData, validate, memoizedActivityLevels, memoizedGoals]);

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
        <main className="mt-15 flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center" aria-label="Calorie Calculator">
              Calorie Calculator & Tracker
            </h1>

            {/* Personal information form */}
            <CalorieForm
              formData={formData}
              errors={errors}
              activityLevels={memoizedActivityLevels}
              goals={memoizedGoals}
              isFormValid={isFormValid}
              onInputChange={handleInputChange}
              onCalculate={calculateCalories}
              onReset={resetCalculator}
            />

            {/* Results display */}
            <CalorieResults results={results} />

            {/* Daily intake tracker */}
            <DailyIntakeTracker
              dailyIntake={dailyIntake}
              newFood={newFood}
              newCalories={newCalories}
              totalConsumed={totalConsumed}
              onNewFoodChange={setNewFood}
              onNewCaloriesChange={setNewCalories}
              onAddFoodItem={addFoodItem}
              onClearIntake={clearIntake}
            />
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
