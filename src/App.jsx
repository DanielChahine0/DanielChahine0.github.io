import { BrowserRouter, Route, Routes } from "react-router"
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          // When the path is *, it will render the NotFound component
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
