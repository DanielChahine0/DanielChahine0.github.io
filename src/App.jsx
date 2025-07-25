import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import { Timeline } from "./pages/Timeline"
import { Toaster } from "@/components/ui/toaster"
import { ScrollToTop } from "./components/ScrollToTop"

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
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
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
