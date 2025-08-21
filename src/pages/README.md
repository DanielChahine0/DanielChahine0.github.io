# Pages

Page components representing different routes in the portfolio application.

**Built with:** React Router, Framer Motion, various specialized libraries

## Documentation Navigation
- [⬆️ Main README](../../README.md) - Project overview and features
- [⬆️ Source Overview](../README.md) - Source code structure

## Core Pages

- `Home.jsx` - Main portfolio landing page (`/`)
- `Blogs.jsx` - Blog posts and articles (`/blogs`)
- `Timeline.jsx` - Professional timeline (`/timeline`) 
- `Tools.jsx` - Interactive tools showcase (`/tools`)
- `NotFound.jsx` - 404 error page (`*`)

## Interactive Tools

**Development:**
- `CodePlayground.jsx` - Online code editor with live preview (`/tools/code-playground`)
- `MarkdownEditor.jsx` - Real-time markdown editing (`/tools/markdown-editor`)
- `TextAnalyzer.jsx` - Text analysis and statistics (`/tools/text-analyzer`)

**Health & Lifestyle:**
- `CalorieTracker.jsx` - Nutrition and calorie tracking (`/tools/calorie-tracker`)
- `ClockTimer.jsx` - Clock, timer, and Pomodoro (`/tools/clock-timer`)

**Creative:**
- `ColorPicker.jsx` - Color selection and palettes (`/tools/color-picker`)
- `ImageEditor.jsx` - Basic image manipulation (`/tools/image-editor`)
- `ResumeBuilder.jsx` - Interactive resume creation (`/tools/resume-builder`)
- `LifeInWeeks.jsx` - Life timeline visualization (`/tools/life-in-weeks`)

## Tool Details

#### `CodePlayground.jsx`
- Multiple panel layout with editor and preview
- Code templates and project management
- Real-time preview rendering
- Custom hooks for code actions

#### `ClockTimer.jsx`
- World clock functionality
- Pomodoro timer implementation
- Alarm system
- Current time display

#### `ColorPicker.jsx`
- Color harmony and palette generation
- Popular color schemes
- Custom swatches and saved palettes
- Color utility functions

#### `ImageEditor.jsx`
- Canvas-based image manipulation
- Transform operations and filters
- Custom hooks for image actions
- Toolbar with editing controls

#### `LifeInWeeks.jsx`
- Life grid visualization
- Natural world and societal context
- Statistics and highlights
- Interactive input sections

#### `ResumeBuilder.jsx`
- Multiple content sections (Education, Experience, Skills)
- Live preview functionality
- Header and sidebar components
- Export capabilities

---

## Key Technologies

**Core:**
- React
- React Router
- Framer Motion
- Custom hooks

**Specialized Components:**
- Canvas API
- Date manipulation
- Color utilities
- Markdown processing

---

## Common Features

- Consistent UI components
- Dark/light theme support
- Responsive design
- Custom hooks integration
- Component-specific README files

---

## Project Structure

```
pages/
├── Core Pages
│   ├── Home.jsx
│   ├── Blogs.jsx
│   ├── Timeline.jsx
│   ├── Tools.jsx
│   └── NotFound.jsx
│
└── Tool Pages
    ├── CalorieTracker.jsx
    ├── ClockTimer.jsx
    ├── CodePlayground.jsx
    ├── ColorPicker.jsx
    ├── ImageEditor.jsx
    ├── LifeInWeeks.jsx
    ├── MarkdownEditor.jsx
    ├── ResumeBuilder.jsx
    └── TextAnalyzer.jsx
```
