import React from 'react';

/**
 * CalorieResults Component
 * 
 * Displays the calculated results from the calorie calculator:
 * - BMR (Basal Metabolic Rate): Calories burned at complete rest
 * - TDEE (Total Daily Energy Expenditure): Calories burned including activity
 * - Recommended daily calorie intake based on user's goals
 * 
 * Props:
 * @param {Object} results - Contains calculated values:
 *   - bmr: Base metabolic rate
 *   - tdee: Total daily energy expenditure
 *   - targetCalories: Recommended daily calorie intake
 *   - goal: Selected weight management goal
 *   - activityLevel: Selected activity level
 */
export function CalorieResults({ results }) {
  if (!results) return null;

  return (
    <div className="bg-card p-6 rounded-xl mb-8 shadow-sm">
      <h3 className="text-xl font-semibold mb-2">Results</h3>
      <p className="mb-1">BMR: {results.bmr} calories/day</p>
      <p className="mb-1">TDEE: {results.tdee} calories/day</p>
      <p className="mb-1">Recommended intake: {results.targetCalories} calories/day</p>
      <p className="text-sm text-primary">Goal: {results.goal} &middot; Activity: {results.activityLevel}</p>
    </div>
  );
}
