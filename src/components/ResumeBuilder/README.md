# Resume Builder Components

This directory contains the modular components for the Resume Builder feature.

## Component Structure

### Main Components

- **`PersonalInfoSection.jsx`** - Handles personal information form (name, email, phone, location)
- **`SummarySection.jsx`** - Professional summary textarea component
- **`ExperienceSection.jsx`** - Work experience management with add/edit/remove functionality
- **`EducationSection.jsx`** - Education background management with add/edit/remove functionality
- **`SkillsSection.jsx`** - Skills management with proficiency levels
- **`ResumeSidebar.jsx`** - Navigation sidebar for switching between resume sections
- **`ResumePreview.jsx`** - Formatted resume preview display
- **`ResumeContentArea.jsx`** - Main content area that renders the active section
- **`ResumeHeader.jsx`** - Header for the builder interface with action buttons
- **`ResumePreviewHeader.jsx`** - Header for the preview interface with action buttons

### Component Props

Each section component receives:
- `resumeData` - The complete resume data object
- Relevant handler functions for data manipulation (add/update/remove)

### Usage

All components are imported and used in the main `ResumeBuilder.jsx` page component located in `/src/pages/ResumeBuilder.jsx`.

### Export

The `index.js` file provides a convenient way to import all components:

```javascript
import { 
  PersonalInfoSection,
  SummarySection,
  ExperienceSection,
  // ... other components
} from '@/components/ResumeBuilder';
```

## Features Maintained

- ✅ Data persistence via localStorage
- ✅ Form validation and user input handling
- ✅ Responsive design
- ✅ Motion animations
- ✅ JSON export functionality
- ✅ Preview mode
- ✅ All original functionality preserved
