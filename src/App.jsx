/**
 * App.jsx - Main application component that handles routing and layout
 * This file sets up the application's routing structure and provides smooth page transitions
 * using React Router and Framer Motion for animations.
 */

import { lazy, Suspense } from "react"
import { HashRouter, Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { Toaster } from "./components/ui/toaster"
import { ScrollToTop } from "./components/ScrollToTop"

// Eager load Home page for better initial experience
import { Home } from "./pages/Home"

// Lazy load other pages to improve initial bundle size
const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.NotFound })))
const Timeline = lazy(() => import("./pages/Timeline").then(m => ({ default: m.Timeline })))
const Blogs = lazy(() => import("./pages/Blogs").then(m => ({ default: m.Blogs })))
const Tools = lazy(() => import("./pages/Tools"))
const CalorieTracker = lazy(() => import("./pages/CalorieTracker"))
const ClockTimer = lazy(() => import("./pages/ClockTimer"))
const LifeInWeeks = lazy(() => import("./pages/LifeInWeeks"))
const MarkdownEditor = lazy(() => import("./pages/MarkdownEditor"))
const ColorPicker = lazy(() => import("./pages/ColorPicker"))
const TextAnalyzer = lazy(() => import("./pages/TextAnalyzer"))
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"))
const ImageEditor = lazy(() => import("./pages/ImageEditor"))
const CodePlayground = lazy(() => import("./pages/CodePlayground"))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
)

/**
 * AnimatedRoutes Component
 * Handles the route transitions with animations using Framer Motion's AnimatePresence
 * Each route change triggers a smooth page transition animation
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/timeline" element={<Suspense fallback={<PageLoader />}><Timeline /></Suspense>} />
        <Route path="/blogs" element={<Suspense fallback={<PageLoader />}><Blogs /></Suspense>} />
        <Route path="/blogs/blog/:id" element={<Suspense fallback={<PageLoader />}><Blogs /></Suspense>} />
        <Route path="/tools" element={<Suspense fallback={<PageLoader />}><Tools /></Suspense>} />
        <Route path="/tools/calorie-tracker" element={<Suspense fallback={<PageLoader />}><CalorieTracker /></Suspense>} />
        <Route path="/tools/clock-timer" element={<Suspense fallback={<PageLoader />}><ClockTimer /></Suspense>} />
        <Route path="/tools/life-in-weeks" element={<Suspense fallback={<PageLoader />}><LifeInWeeks /></Suspense>} />
        <Route path="/tools/markdown-editor" element={<Suspense fallback={<PageLoader />}><MarkdownEditor /></Suspense>} />
        <Route path="/tools/color-picker" element={<Suspense fallback={<PageLoader />}><ColorPicker /></Suspense>} />
        <Route path="/tools/text-analyzer" element={<Suspense fallback={<PageLoader />}><TextAnalyzer /></Suspense>} />
        <Route path="/tools/resume-builder" element={<Suspense fallback={<PageLoader />}><ResumeBuilder /></Suspense>} />
        <Route path="/tools/image-editor" element={<Suspense fallback={<PageLoader />}><ImageEditor /></Suspense>} />
        <Route path="/tools/code-playground" element={<Suspense fallback={<PageLoader />}><CodePlayground /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <Toaster />
      <HashRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </HashRouter>
    </>
  )
}

export default App
