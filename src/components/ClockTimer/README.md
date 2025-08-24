# Clock Timer Components

Last Updated: August 24, 2025

## Overview
A versatile time management tool combining world clock, pomodoro timer, and alarm functionality.

## Structure

### Components
- **`CurrentTimeDisplay.jsx`** - Real-time clock display
- **`WorldClock.jsx`** - Multiple timezone tracking
- **`PomodoroTimer.jsx`** - Focus and break timer
- **`AlarmSection.jsx`** - Alarm management interface

## Key Features
- Real-time clock
- Multiple timezone support
- Pomodoro timer
- Custom alarms
- Sound notifications
- Timer presets
- Session tracking
- Visual indicators

## Usage Example
```jsx
import { 
  CurrentTimeDisplay, 
  WorldClock, 
  PomodoroTimer,
  AlarmSection 
} from '@/components/ClockTimer';

function TimeManagement() {
  return (
    <div className="time-management">
      <CurrentTimeDisplay />
      <WorldClock />
      <PomodoroTimer 
        workDuration={25} 
        breakDuration={5} 
      />
      <AlarmSection />
    </div>
  );
}
```

## Technical Details
- Date/Time API integration
- Timezone conversions
- Audio notifications
- Local storage for preferences
- Background timer tracking
- PWA compatibility
