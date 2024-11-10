import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import bgImg from "./assets/images/bodyBg.jpg"
function App() {
  return (
    <>
      <Router>
        <div
          style={{
            backgroundImage: `url("${bgImg}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",

            height: "100%",

            zIndex: "-100",
          }}
        ></div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
