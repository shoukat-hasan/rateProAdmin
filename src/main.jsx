// src\main.jsx
import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "./index.css"
import { AuthProvider } from "./context/AuthContext.jsx"
import { BrowserRouter } from "react-router-dom"


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)