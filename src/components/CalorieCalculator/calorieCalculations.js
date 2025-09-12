/**
 * calorieCalculations.js
 * 
 * Utility functions for calorie calculations including form validation,
 * BMR calculation, TDEE calculation, and target calorie determination.
 */

/**
 * Validate form inputs for age, weight, and height
 */
/**
 * Validates user input data for the calorie calculator
 * @param {Object} data - Form data containing age, weight, height, and unit system
 * @returns {Object} Object containing validation errors for each field if any
 */
export const validateFormData = (data) => {
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
};

/**
 * Calculate BMR, TDEE, and target calories based on form data
 */
/**
 * Calculates BMR, TDEE, and target calories based on user's data
 * Uses the Mifflin-St Jeor Equation for BMR calculation
 * @param {Object} formData - User's personal data (age, weight, height, gender, etc.)
 * @param {Object} activityLevels - Activity level multipliers
 * @param {Object} goals - Weight goals and their caloric adjustments
 * @returns {Object} Contains calculated BMR, TDEE, and target calories
 */
export const calculateCalories = (formData, activityLevels, goals) => {
  let weightKg = parseFloat(formData.weight);
  let heightCm = parseFloat(formData.height);
  
  // Convert imperial units to metric for calculation
  if (formData.unit === 'imperial') {
    weightKg = weightKg * 0.453592;
    heightCm = heightCm * 2.54;
  }
  
  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr;
  if (formData.gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(formData.age, 10) + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(formData.age, 10) - 161;
  }
  
  // Calculate TDEE (Total Daily Energy Expenditure)
  const tdee = bmr * activityLevels[formData.activityLevel].multiplier;
  
  // Calculate target calories based on goal (minimum 1200 calories)
  const target = Math.max(tdee + goals[formData.goal].adjustment, 1200);
  
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(target),
    goal: goals[formData.goal].label,
    activityLevel: activityLevels[formData.activityLevel].label,
  };
};
