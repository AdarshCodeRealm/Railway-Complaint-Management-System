import RailMadadDashboard from "./pages/RailMadadDashboard"
import Auth from "./components/LoginSignUp/Auth"
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<RailMadadDashboard />} />
          <Route path="/test" element={<Navbar />} />
      </Routes>
    </>
  )
}

export default App
