# Daniel Chahine - Personal Portfolio

Last Updated: August 26, 2025

<p align="center">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/DanielChahine0/DanielChahine0.github.io?style=for-the-badge&logo=GitHub">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/DanielChahine0/DanielChahine0.github.io?style=for-the-badge&logo=Javascript">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/DanielChahine0/DanielChahine0.github.io?style=for-the-badge">
</p>

Welcome to my modern, interactive portfolio showcasing my projects, skills, and professional journey. Built with React 19 and Vite, this portfolio features smooth animations, responsive design, and a comprehensive collection of interactive development tools.

**Live Demo:** [danielchahine0.github.io](https://danielchahine0.github.io)

**Key Features:**
- Modern React with Hooks and Suspense
- Fast builds with Vite
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Interactive development tools

<p align="center">
  <a href="https://danielchahine0.github.io">
    <img src="public/photos/HeroPhoto.png" alt="Portfolio Preview" style="max-height: 300px;">
  </a>
</p>

---

## Features

- **Modern UI/UX**: Responsive, accessible, and visually appealing design with smooth transitions
- **Animated Page Transitions**: Seamless navigation using Framer Motion and React Router
- **Interactive Playground**: Collection of mini-projects and tools including:
  - Calorie Tracker
  - Clock Timer
  - Color Picker
  - Life in Weeks Visualizer
  - Markdown Editor
  - Text Analyzer
- **Project Showcase**: Highlighted projects with images, tech stack, and links to live demos and source code
- **Experience Timeline**: Chronological view of experience, projects, and extracurricular activities
- **Skills Section**: Categorized list of programming languages, technologies, and tools
- **Contact Section**: Easy ways to reach out via email or social media links
- **Downloadable Resume**: Quick access to a PDF resume
- **Dark/Light Theme Toggle**: Instantly switch between dark and light modes with persistent preferences
- **Toast Notifications**: User feedback for actions and interactions
- **Star & Cloud Backgrounds**: Animated background effects for enhanced visual appeal

---

## Tech Stack

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E">
  <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white">
  <img alt="React Router" src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img alt="Radix UI" src="https://img.shields.io/badge/Radix%20UI-161618?style=for-the-badge&logo=radixui&logoColor=white">
  <img alt="Lucide React" src="https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white">
  <img alt="React Icons" src="https://img.shields.io/badge/React%20Icons-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img alt="clsx" src="https://img.shields.io/badge/clsx-4F46E5?style=for-the-badge&logo=javascript&logoColor=white">
  <img alt="date-fns" src="https://img.shields.io/badge/date--fns-770C56?style=for-the-badge&logo=javascript&logoColor=white">
  <img alt="html2canvas" src="https://img.shields.io/badge/html2canvas-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img alt="jsPDF" src="https://img.shields.io/badge/jsPDF-FF6B6B?style=for-the-badge&logo=adobe-acrobat-reader&logoColor=white">
  <img alt="DOMPurify" src="https://img.shields.io/badge/DOMPurify-4B5563?style=for-the-badge&logo=security&logoColor=white">
  <img alt="highlight.js" src="https://img.shields.io/badge/highlight.js-9CA3AF?style=for-the-badge&logo=javascript&logoColor=white">
</p>

---


## Documentation Navigation

### Quick Links
- [📁 src/](./src/README.md) - Main source code structure and setup
- [🧩 src/components/](./src/components/README.md) - Reusable UI components and their usage
- [🎨 src/components/ui](./src/components/ui/README.md) - Fundamental UI primitives
- [🎣 src/hooks/](./src/hooks/README.md) - Custom React hooks for reusable logic
- [🛠️ src/lib/](./src/lib/README.md) - Utility functions and shared logic
- [📄 src/pages/](./src/pages/README.md) - Page components and interactive tools


### Full Structure
```
DanielChahine0.github.io/
├── public/                         # Static assets
│   ├── files/                      # Downloadable files
│   │   └── resume.pdf              
│   ├── photos/                     # Profile images
│   │   ├── DarkHeroPhoto.png
│   │   └── HeroPhoto.png
│   └── projects/                   # Project screenshots
│       ├── project1.png
│       ├── project2.png
│       └── project3.png
├── src/                            
│   ├── components/                 
│   │   ├── ui/                     
│   │   │   ├── toast.jsx           # Toast component
│   │   │   └── toaster.jsx         # Toast container
│   │   ├── AboutSection.jsx        # About section
│   │   ├── CloudBackground.jsx     # Animated cloud background
│   │   ├── Footer.jsx              # Site footer
│   │   ├── HeroSection.jsx         # Hero/landing section
│   │   ├── NavBar.jsx              # Navigation bar
│   │   ├── PageTransition.jsx      # Page transition wrapper
│   │   ├── ProjectsSection.jsx     # Projects showcase
│   │   ├── ScrollToTop.jsx         # Scroll to top button
│   │   ├── SkillsSections.jsx      # Skills showcase
│   │   ├── StarBackground.jsx      # Animated star background
│   │   └── ThemeToggle.jsx         # Dark/light mode toggle
│   ├── hooks/                      
│   │   ├── use-glow-effect.js      # Mouse glow effect hook
│   │   └── use-toast.js            # Toast notification hook
│   ├── lib/                        
│   │   └── utils.js                # Common utilities
│   ├── pages/                      
│   │   ├── CalorieTracker.jsx      # Calorie tracking tool
│   │   ├── ClockTimer.jsx          # Clock and timer tool
│   │   ├── ColorPicker.jsx         # Color picker tool
│   │   ├── Home.jsx                # Main portfolio page
│   │   ├── LifeInWeeks.jsx         # Life visualization tool
│   │   ├── MarkdownEditor.jsx      # Markdown editor tool
│   │   ├── NotFound.jsx            # 404 error page
│   │   ├── Playground.jsx          # Tools showcase page
│   │   ├── TextAnalyzer.jsx        # Text analysis tool
│   │   └── Timeline.jsx            # Experience timeline
│   ├── App.jsx                     # Main app component
│   ├── index.css                   # Global styles
│   └── main.jsx                    # App entry point
├── eslint.config.js                
├── package.json                    # Dependencies and scripts
├── vite.config.js                  
└── README.md                       
```

Each directory contains its own `README.md` with detailed information about its contents and usage patterns.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

---

## Contact Me

- Email: [Chahinedaniel0@gmail.com](mailto:Chahinedaniel0@gmail.com)
- LinkedIn: [danielchahine](https://www.linkedin.com/in/danielchahine)
- GitHub: [DanielChahine0](https://github.com/DanielChahine0)
- Instagram: [dxni.ch](https://instagram.com/dxni.ch)

---

## See Also

For detailed documentation about specific parts of the codebase:

- **[Source Code Structure](./src/README.md)** - Development setup and architecture overview
- **[Component System](./src/components/README.md)** - Reusable UI components and patterns
- **[Interactive Pages](./src/pages/README.md)** - Tools and applications within the portfolio
- **[Custom Hooks](./src/hooks/README.md)** - Reusable React logic and state management
- **[Utilities](./src/lib/README.md)** - Helper functions and shared utilities
- **[UI Primitives](./src/components/ui/README.md)** - Base components for consistent design

---

## License
This project is for personal and educational purposes. Feel free to explore and get inspired!

