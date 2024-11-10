import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import "react-toastify/dist/ReactToastify.css"
import CustomToastContainer from "./components/CustomTostifyContainer.jsx"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
   <CustomToastContainer/>
  </React.StrictMode>
)
