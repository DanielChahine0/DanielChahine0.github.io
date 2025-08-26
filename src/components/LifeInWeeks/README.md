# Life in Weeks Components

Last Updated: August 26, 2025

## Overview

A collection of components that create an interactive life visualization tool, helping users understand and plan their life journey through a visual grid representation.

### Purpose
- Visualize life in weekly blocks
- Track milestones and achievements
- Analyze life patterns
- Plan future goals
A visual life planning and reflection tool that represents life in weeks, incorporating personal milestones and societal context.

## Structure

### Components
- **`LifeGrid.jsx`** - Visual week-by-week life representation
- **`InputSection.jsx`** - User data and milestone input
- **`Legend.jsx`** - Grid color and category explanation
- **`LifeHighlights.jsx`** - Key life events display
- **`StatisticsSection.jsx`** - Life metrics and analysis
- **`NaturalWorld.jsx`** - Nature-based life events
- **`SocietalContext.jsx`** - Historical/cultural context

## Key Features
- Life visualization
- Milestone tracking
- Age calculations
- Event categorization
- Timeline generation
- Statistical analysis
- Historical context
- Natural cycles

## Usage Example
```jsx
import { 
  LifeGrid, 
  InputSection, 
  LifeHighlights,
  StatisticsSection 
} from '@/components/LifeInWeeks';

function LifePlanner() {
  const [lifeData, setLifeData] = useState({});
  
  return (
    <div className="life-planner">
      <InputSection onUpdate={setLifeData} />
      <LifeGrid data={lifeData} />
      <LifeHighlights events={lifeData.events} />
      <StatisticsSection data={lifeData} />
    </div>
  );
}
```

## Technical Details
- Date calculations
- Event persistence
- Interactive grid
- Category color coding
- Export functionality
- Data visualization
- Timeline algorithms
