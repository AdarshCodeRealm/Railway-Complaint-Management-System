import RailMadadDashboard from "./pages/RailMadadDashboard"
import Auth from "./components/LoginSignUp/Auth"
import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<RailMadadDashboard />} />
    </Routes>

         </>
  )
}

export default App
