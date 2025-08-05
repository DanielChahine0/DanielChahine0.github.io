# Pages

This directory contains all the main page components that represent different routes and views in the portfolio application. Each page is a complete, self-contained component that can be rendered as a full-screen experience.

---

## Structure

```
pages/
├── CalorieTracker.jsx         # Calorie tracking tool
├── ClockTimer.jsx             # Clock and timer application
├── CodePlayground.jsx         # Online code editor with preview ✨ NEW
├── ColorPicker.jsx            # Color selection utility
├── Home.jsx                   # Main portfolio homepage
├── ImageEditor.jsx            # Basic image manipulation tool ✨ NEW
├── LifeInWeeks.jsx            # Life visualization tool
├── MarkdownEditor.jsx         # Markdown editing tool
├── NotFound.jsx               # 404 error page
├── PasswordGenerator.jsx      # Secure password creation utility ✨ NEW
├── Playground.jsx             # Interactive tools showcase
├── PortfolioGenerator.jsx     # Template-based portfolio builder ✨ NEW
├── ResumeBuilder.jsx          # Interactive resume creation tool ✨ NEW
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

#### `CodePlayground.jsx` ✨ **NEW**
**Purpose:** Online code editor with live preview  
**Route:** `/playground/code-playground`  
**Features:**
- HTML, CSS, and JavaScript editing
- Real-time preview with iframe
- Multiple viewport modes (desktop, tablet, mobile)
- Template library with pre-built examples
- Code sharing functionality
- Project save/load system
- Export to HTML file
- Auto-run toggle for live coding

**Key Technologies:**
- Real-time code compilation
- iframe sandboxing for security
- Local storage for project persistence
- Base64 encoding for share links
- Responsive viewport simulation

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

#### `ImageEditor.jsx` ✨ **NEW**
**Purpose:** Basic image manipulation and enhancement tool  
**Route:** `/playground/image-editor`  
**Features:**
- Image upload and processing
- Filter adjustments (brightness, contrast, saturation, etc.)
- Transform operations (rotate, flip)
- Preset filter effects (vintage, B&W, vivid, etc.)
- Real-time canvas rendering
- Undo/redo functionality
- Image export capabilities
- Drag-and-drop upload

**Key Technologies:**
- HTML5 Canvas API for image processing
- File API for image upload
- CSS filters for real-time effects
- Local storage for edit history
- Blob API for image export

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

#### `PasswordGenerator.jsx` ✨ **NEW**
**Purpose:** Secure password creation and analysis tool  
**Route:** `/playground/password-generator`  
**Features:**
- Customizable password generation
- Character set selection (uppercase, lowercase, numbers, symbols)
- Password strength analysis and scoring
- Exclude similar/ambiguous characters option
- Preset configurations for different use cases
- Password history tracking
- Cryptographically secure random generation
- Security tips and best practices
- One-click copy to clipboard

**Key Technologies:**
- Crypto.getRandomValues() for secure randomness
- Real-time strength calculation algorithms
- Local storage for password history
- Clipboard API for copy functionality
- Advanced password entropy analysis

#### `PortfolioGenerator.jsx` ✨ **NEW**
**Purpose:** Template-based portfolio website builder  
**Route:** `/playground/portfolio-generator`  
**Features:**
- Personal information management
- Project showcase with descriptions and links
- Skills visualization with progress bars
- Work experience timeline
- Multiple design templates
- Customizable color themes
- Social media integration
- Real-time preview mode
- Export to complete HTML website
- Responsive design templates

**Key Technologies:**
- Dynamic HTML generation
- Template engine for multiple layouts
- CSS-in-JS for theme customization
- Local storage for project persistence
- Blob API for HTML export
- Responsive design patterns

#### `ResumeBuilder.jsx` ✨ **NEW**
**Purpose:** Interactive resume creation and management tool  
**Route:** `/playground/resume-builder`  
**Features:**
- Professional resume sections (personal info, experience, education, skills)
- Dynamic section management (add/edit/remove entries)
- Real-time preview with professional formatting
- Multiple input types for different data
- Data validation and formatting
- Export functionality (JSON format)
- Clean, print-ready design
- Section-based navigation
- Auto-save functionality

**Key Technologies:**
- Form validation and state management
- JSON data structure for resume content
- CSS print media queries for export
- Local storage for draft persistence
- Component-based architecture for sections

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

### Planned Pages ✅ **IMPLEMENTED**
- **Resume Builder** - Interactive resume creation tool ✅
- **Portfolio Generator** - Template-based portfolio builder ✅
- **Code Playground** - Online code editor with preview ✅
- **Image Editor** - Basic image manipulation tool ✅
- **Password Generator** - Secure password creation utility ✅

### Additional Future Pages
- **QR Code Generator** - Create and customize QR codes
- **URL Shortener** - Shorten and manage URLs
- **JSON Formatter** - Format and validate JSON data
- **Base64 Encoder/Decoder** - Encode and decode Base64 strings
- **Hash Generator** - Generate MD5, SHA1, SHA256 hashes

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
