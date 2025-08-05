import { HashRouter, Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import { Timeline } from "./pages/Timeline"
import Playground from "./pages/Playground"
import CalorieTracker from "./pages/CalorieTracker"
import ClockTimer from "./pages/ClockTimer"
import LifeInWeeks from "./pages/LifeInWeeks"
import MarkdownEditor from "./pages/MarkdownEditor"
import ColorPicker from "./pages/ColorPicker"
import TextAnalyzer from "./pages/TextAnalyzer"
import ResumeBuilder from "./pages/ResumeBuilder"
import PasswordGenerator from "./pages/PasswordGenerator"
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
        <Route path="/playground" element={<Playground />} />
        <Route path="/playground/calorie-tracker" element={<CalorieTracker />} />
        <Route path="/playground/clock-timer" element={<ClockTimer />} />
        <Route path="/playground/life-in-weeks" element={<LifeInWeeks />} />
        <Route path="/playground/markdown-editor" element={<MarkdownEditor />} />
        <Route path="/playground/color-picker" element={<ColorPicker />} />
        <Route path="/playground/text-analyzer" element={<TextAnalyzer />} />
        <Route path="/playground/resume-builder" element={<ResumeBuilder />} />
        <Route path="/playground/password-generator" element={<PasswordGenerator />} />
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
