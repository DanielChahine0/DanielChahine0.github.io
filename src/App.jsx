import { HashRouter, Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import { Timeline } from "./pages/Timeline"
import { Blogs } from "./pages/Blogs"
import Tools from "./pages/Tools"
import CalorieTracker from "./pages/CalorieTracker"
import ClockTimer from "./pages/ClockTimer"
import LifeInWeeks from "./pages/LifeInWeeks"
import MarkdownEditor from "./pages/MarkdownEditor"
import ColorPicker from "./pages/ColorPicker"
import TextAnalyzer from "./pages/TextAnalyzer"
import ResumeBuilder from "./pages/ResumeBuilder"
import ImageEditor from "./pages/ImageEditor"
import PortfolioGenerator from "./pages/PortfolioGenerator"
import CodePlayground from "./pages/CodePlayground"
import { Toaster } from "@/components/ui/toaster"
import { ScrollToTop } from "./components/ScrollToTop"

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/blog/:id" element={<Blogs />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/calorie-tracker" element={<CalorieTracker />} />
        <Route path="/tools/clock-timer" element={<ClockTimer />} />
        <Route path="/tools/life-in-weeks" element={<LifeInWeeks />} />
        <Route path="/tools/markdown-editor" element={<MarkdownEditor />} />
        <Route path="/tools/color-picker" element={<ColorPicker />} />
        <Route path="/tools/text-analyzer" element={<TextAnalyzer />} />
        <Route path="/tools/resume-builder" element={<ResumeBuilder />} />
        <Route path="/tools/image-editor" element={<ImageEditor />} />
        <Route path="/tools/portfolio-generator" element={<PortfolioGenerator />} />
        <Route path="/tools/code-playground" element={<CodePlayground />} />
        
        {/* Backward compatibility routes - redirect old /playground/* URLs to /tools/* */}
        <Route path="/playground" element={<Tools />} />
        <Route path="/playground/calorie-tracker" element={<CalorieTracker />} />
        <Route path="/playground/clock-timer" element={<ClockTimer />} />
        <Route path="/playground/life-in-weeks" element={<LifeInWeeks />} />
        <Route path="/playground/markdown-editor" element={<MarkdownEditor />} />
        <Route path="/playground/color-picker" element={<ColorPicker />} />
        <Route path="/playground/text-analyzer" element={<TextAnalyzer />} />
        <Route path="/playground/resume-builder" element={<ResumeBuilder />} />
        <Route path="/playground/image-editor" element={<ImageEditor />} />
        <Route path="/playground/portfolio-generator" element={<PortfolioGenerator />} />
        <Route path="/playground/code-playground" element={<CodePlayground />} />
        
        {/* When the path is *, it will render the NotFound component */}
        <Route path="*" element={<NotFound />} />
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
