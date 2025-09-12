/**
 * calorieConstants.js
 * 
 * Constants and configuration objects used in the calorie tracker application.
 * Contains activity level multipliers and goal adjustments for calorie calculations.
 */

/**
 * Activity level multipliers used for TDEE calculation
 * Each level represents a different amount of physical activity:
 * - Sedentary: Little to no exercise, desk job
 * - Light: Light exercise 1-3 days per week
 * - Moderate: Moderate exercise 3-5 days per week
 * - Very: Hard exercise 6-7 days per week
 * - Extra: Very hard exercise and physical job
 */
export const activityLevels = {
  sedentary: { label: 'Sedentary (little/no exercise)', multiplier: 1.2 },
  light: { label: 'Light activity (1–3 days/week)', multiplier: 1.375 },
  moderate: { label: 'Moderate activity (3–5 days/week)', multiplier: 1.55 },
  very: { label: 'Very active (6–7 days/week)', multiplier: 1.725 },
  extra: { label: 'Extra active (physical job)', multiplier: 1.9 },
};

// Goal adjustments for calorie recommendations
export const goals = {
  lose2: { label: 'Lose 2 lbs/week', adjustment: -1000 },
  lose1: { label: 'Lose 1 lb/week', adjustment: -500 },
  lose0_5: { label: 'Lose 0.5 lb/week', adjustment: -250 },
  maintain: { label: 'Maintain weight', adjustment: 0 },
  gain0_5: { label: 'Gain 0.5 lb/week', adjustment: 250 },
  gain1: { label: 'Gain 1 lb/week', adjustment: 500 },
};
