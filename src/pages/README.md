# Pages

This directory contains all the main page components that represent different routes and views in the portfolio application. Each page is a complete, self-contained component that can be rendered as a full-screen experience.

---

## Structure

```
pages/
├── CalorieTracker.jsx         # Calorie tracking tool
├── ClockTimer.jsx             # Clock and timer application
├── ColorPicker.jsx            # Color selection utility
├── Home.jsx                   # Main portfolio homepage
├── LifeInWeeks.jsx            # Life visualization tool
├── MarkdownEditor.jsx         # Markdown editing tool
├── NotFound.jsx               # 404 error page
├── Playground.jsx             # Interactive tools showcase
├── TextAnalyzer.jsx           # Text analysis utility
├── TextAnalyzer_new.jsx       # Updated text analyzer
├── TextAnalyzer_old.jsx       # Legacy text analyzer
├── Timeline.jsx               # Experience timeline
└── README.md                  # This documentation
```

---

## Pages Overview

### Core Portfolio Pages

#### `Home.jsx`
**Purpose:** Main portfolio landing page  
**Route:** `/`  
**Features:**
- Hero section with personal introduction
- About section with background information
- Skills showcase with technology stack
- Featured projects portfolio
- Contact information and social links
- Animated background effects (stars and clouds)

**Components Used:**
- `NavBar`, `HeroSection`, `AboutSection`
- `SkillsSections`, `ProjectsSection`, `Footer`
- `StarBackground`, `CloudBackground`
- `PageTransition`

#### `Timeline.jsx`
**Purpose:** Professional and personal timeline  
**Route:** `/timeline`  
**Features:**
- Chronological experience display
- Education milestones
- Project timeline
- Interactive timeline navigation
- Responsive design

#### `Playground.jsx`
**Purpose:** Showcase of interactive tools and mini-projects  
**Route:** `/playground`  
**Features:**
- Grid layout of available tools
- Tool previews and descriptions
- Navigation to individual tools
- Search and filtering capabilities

#### `NotFound.jsx`
**Purpose:** 404 error page  
**Route:** `*` (catch-all)  
**Features:**
- Friendly error message
- Navigation back to home
- Consistent branding
- Animated error illustration

---

### Interactive Tools & Applications

#### `CalorieTracker.jsx`
**Purpose:** Calorie tracking and nutrition tool  
**Route:** `/playground/calorie-tracker`  
**Features:**
- Food database search
- Calorie calculation
- Daily intake tracking
- Nutritional information display
- Data persistence
- Export functionality

**Key Technologies:**
- Local storage for data persistence
- Search functionality
- Data visualization
- Form handling

#### `ClockTimer.jsx`
**Purpose:** Clock, timer, and stopwatch application  
**Route:** `/playground/clock-timer`  
**Features:**
- Real-time clock display
- Countdown timer functionality
- Stopwatch with lap times
- Multiple time zones
- Alarm functionality
- Customizable themes

**Key Technologies:**
- Date/time manipulation with `date-fns`
- Interval management
- Audio notifications
- localStorage for settings

#### `ColorPicker.jsx`
**Purpose:** Color selection and palette tool  
**Route:** `/playground/color-picker`  
**Features:**
- HSL/RGB/HEX color selection
- Color palette generation
- Accessibility contrast checking
- Color history
- Export formats (CSS, JSON, etc.)

**Key Technologies:**
- Color space conversions
- Canvas-based color picker
- Accessibility calculations
- Local storage for history

#### `LifeInWeeks.jsx`
**Purpose:** Life visualization in weeks format  
**Route:** `/playground/life-in-weeks`  
**Features:**
- Interactive life calendar
- Week-by-week visualization
- Milestone tracking
- Progress indicators
- Customizable life events
- Motivational insights

**Key Technologies:**
- Date calculations
- Interactive grid components
- Data visualization
- Local storage for personal data

#### `MarkdownEditor.jsx`
**Purpose:** Live markdown editor with preview  
**Route:** `/playground/markdown-editor`  
**Features:**
- Split-pane editor/preview
- Syntax highlighting
- Live preview updates
- Export to HTML/PDF
- Template library
- Fullscreen mode

**Key Technologies:**
- `highlight.js` for syntax highlighting
- `DOMPurify` for XSS protection
- Real-time parsing and rendering
- File operations

#### `TextAnalyzer.jsx`
**Purpose:** Comprehensive text analysis tool  
**Route:** `/playground/text-analyzer`  
**Features:**
- Word and character counting
- Reading time estimation
- Keyword density analysis
- Readability scoring
- Language detection
- Text statistics

**Key Technologies:**
- Text processing algorithms
- Statistical analysis
- Real-time calculations
- Data visualization

---

## Design Patterns

### Page Component Structure
```jsx
import { PageTransition } from '@/components/PageTransition';
import { NavBar } from '@/components/NavBar';

export const PageName = () => {
  return (
    <PageTransition className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page content */}
      </main>
      
      {/* Optional footer or additional components */}
    </PageTransition>
  );
};
```

### Responsive Design
```jsx
// Consistent responsive patterns
<div className={cn(
  // Mobile-first approach
  'px-4 py-6',                    // Base mobile styles
  'md:px-6 md:py-8',              // Tablet styles
  'lg:px-8 lg:py-12',             // Desktop styles
  'xl:px-12 xl:py-16'             // Large desktop styles
)}>
```

### State Management
```jsx
// Local state for page-specific data
const [pageData, setPageData] = useState(initialState);

// Persistent state using localStorage
useEffect(() => {
  const saved = localStorage.getItem('pageData');
  if (saved) {
    setPageData(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem('pageData', JSON.stringify(pageData));
}, [pageData]);
```

---

## Common Features

### Navigation Integration
All pages integrate with the main navigation system:
- Consistent navbar placement
- Active route highlighting
- Breadcrumb navigation (where applicable)
- Back button functionality

### Theme Support
Pages respect the global theme system:
- Dark/light mode compatibility
- Consistent color schemes
- Theme-aware animations
- Accessibility compliance

### Performance Optimization
- Lazy loading for tool pages
- Code splitting at route level
- Optimized bundle sizes
- Image optimization

### Accessibility Features
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Screen reader compatibility
- Focus management

---

## Dependencies

### Core Dependencies
- **React 19** - Component framework
- **React Router** - Client-side routing
- **Framer Motion** - Page transitions and animations

### Tool-Specific Dependencies
- **date-fns** - Date manipulation (ClockTimer, LifeInWeeks)
- **highlight.js** - Syntax highlighting (MarkdownEditor)
- **DOMPurify** - XSS protection (MarkdownEditor)
- **html2canvas** - Screenshot generation (various tools)
- **jsPDF** - PDF generation (MarkdownEditor, reports)

---

## Performance Considerations

### Code Splitting
```jsx
// Lazy loading for tool pages
const CalorieTracker = lazy(() => import('./CalorieTracker'));
const MarkdownEditor = lazy(() => import('./MarkdownEditor'));

// Route configuration with suspense
<Route 
  path="/playground/calorie-tracker" 
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <CalorieTracker />
    </Suspense>
  } 
/>
```

### Data Management
- Local storage for user preferences
- Session storage for temporary data
- Efficient state updates
- Memory leak prevention

### Bundle Optimization
- Dynamic imports for heavy dependencies
- Tree shaking for unused code
- Optimized asset loading
- Progressive enhancement

---

## Future Enhancements

### Planned Pages
- **Resume Builder** - Interactive resume creation tool
- **Portfolio Generator** - Template-based portfolio builder
- **Code Playground** - Online code editor with preview
- **Image Editor** - Basic image manipulation tool
- **Password Generator** - Secure password creation utility

### Page Improvements
- **Enhanced Analytics** - User interaction tracking
- **Offline Support** - Progressive Web App features
- **Data Export** - Enhanced export capabilities
- **Collaboration Features** - Sharing and collaboration tools
- **Advanced Theming** - Custom theme creation

### Technical Enhancements
- **TypeScript Migration** - Full type safety
- **Testing Coverage** - Comprehensive test suites
- **Performance Monitoring** - Real-user metrics
- **Accessibility Auditing** - Automated a11y testing
- **SEO Optimization** - Meta tags and structured data
