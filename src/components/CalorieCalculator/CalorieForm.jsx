import React from 'react';
import { Calculator } from 'lucide-react';

/**
 * CalorieForm Component
 * 
 * A form component for collecting personal information needed for calorie calculations.
 * Features:
 * - Unit system selection (metric/imperial)
 * - Personal details input (age, gender, weight, height)
 * - Activity level selection
 * - Weight management goal selection
 * 
 * Props:
 * @param {Object} formData - Current form values
 * @param {Object} errors - Validation errors
 * @param {Object} activityLevels - Available activity level options
 * @param {Object} goals - Available weight management goals
 * @param {boolean} isFormValid - Form validation status
 * @param {Function} onInputChange - Handler for input changes
 * @param {Function} onCalculate - Handler for form submission
 * @param {Function} onReset - Handler for form reset
 */
export function CalorieForm({
  formData,
  errors,
  activityLevels,
  goals,
  isFormValid,
  onInputChange,
  onCalculate,
  onReset,
}) {
  return (
    <form
      className="bg-card rounded-xl p-6 mb-8 shadow-md"
      onSubmit={(e) => {
        e.preventDefault();
        onCalculate();
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
            onChange={(e) => onInputChange('unit', e.target.value)}
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
              onChange={(e) => onInputChange('gender', e.target.value)}
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
            onChange={(e) => onInputChange('age', e.target.value)}
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
            onChange={(e) => onInputChange('weight', e.target.value)}
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
            onChange={(e) => onInputChange('height', e.target.value)}
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
            onChange={(e) => onInputChange('activityLevel', e.target.value)}
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
            onChange={(e) => onInputChange('goal', e.target.value)}
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
          className={`px-6 py-2 rounded-md text-white font-medium transition-colors ${!isFormValid ? 'bg-primary/25 cursor-not-allowed' : 'bg-primary hover:bg-primary/60'}`}
        >
          Calculate
        </button>
        <button
          type="button"
          onClick={onReset}
          className="px-6 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
