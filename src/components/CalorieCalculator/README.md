# Calorie Calculator Components

Last Updated: August 24, 2025

## Overview
A comprehensive calorie tracking and nutritional calculation tool for managing daily dietary intake and goals.

## Structure

### Components
- **`CalorieForm.jsx`** - Input form for user metrics and activity level
- **`CalorieResults.jsx`** - Display of calculated nutritional requirements
- **`DailyIntakeTracker.jsx`** - Daily food logging and progress tracking
- **`calorieCalculations.js`** - Core calculation logic and formulas
- **`calorieConstants.js`** - Nutritional constants and conversion factors

## Key Features
- BMR calculation
- TDEE estimation
- Macro nutrient breakdown
- Daily intake tracking
- Goal setting
- Progress visualization
- Meal logging
- Nutritional analysis

## Usage Example
```jsx
import { 
  CalorieForm, 
  CalorieResults, 
  DailyIntakeTracker 
} from '@/components/CalorieCalculator';

function CalorieTracker() {
  const [userMetrics, setUserMetrics] = useState({});
  
  return (
    <div className="calorie-tracker">
      <CalorieForm onSubmit={setUserMetrics} />
      <CalorieResults metrics={userMetrics} />
      <DailyIntakeTracker />
    </div>
  );
}
```

## Technical Details
- Formula-based calculations
- Local storage for progress tracking
- Real-time updates
- Input validation
- Unit conversion support
