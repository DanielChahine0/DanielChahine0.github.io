import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

/**
 * DailyIntakeTracker Component
 * 
 * A tracking tool for monitoring daily food intake and calorie consumption.
 * Features:
 * - Add food items with their calorie values
 * - Display a running list of consumed foods
 * - Show total calories consumed
 * - Clear the daily log
 * 
 * Props:
 * @param {Array} dailyIntake - List of consumed food items
 * @param {string} newFood - Current value of food input field
 * @param {string} newCalories - Current value of calories input field
 * @param {number} totalConsumed - Sum of all consumed calories
 * @param {Function} onNewFoodChange - Handler for food name input
 * @param {Function} onNewCaloriesChange - Handler for calorie value input
 * @param {Function} onAddFoodItem - Handler for adding new food items
 * @param {Function} onClearIntake - Handler for clearing the intake log
 */
export function DailyIntakeTracker({
  dailyIntake,
  newFood,
  newCalories,
  totalConsumed,
  onNewFoodChange,
  onNewCaloriesChange,
  onAddFoodItem,
  onClearIntake,
}) {
  return (
    <div className="bg-card p-6 rounded-xl mb-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Plus size={20} /> Daily Intake
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          value={newFood}
          onChange={(e) => onNewFoodChange(e.target.value)}
          placeholder="Food name"
          className="flex-1 px-3 py-2 border rounded-md bg-background"
        />
        <input
          type="number"
          value={newCalories}
          onChange={(e) => onNewCaloriesChange(e.target.value)}
          placeholder="Calories"
          className="w-32 px-3 py-2 border rounded-md bg-background"
          min="1"
        />
        <button
          type="button"
          onClick={onAddFoodItem}
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/60"
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
            onClick={onClearIntake}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 flex items-center gap-1"
          >
            <Trash2 size={16} /> Clear Log
          </button>
        </>
      ) : (
        <p className="text-sm text-gray-500">No items added yet.</p>
      )}
    </div>
  );
}
