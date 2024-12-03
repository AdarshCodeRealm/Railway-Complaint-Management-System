import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import NavStateProvider from "./context/navbarContext/navbarState.jsx"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NavStateProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NavStateProvider>
  </React.StrictMode>
)
