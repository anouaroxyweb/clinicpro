import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './router'
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// استورد ThemeProvider
import { ThemeProvider } from './theme/ThemeProvider'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 💡 لفّ التطبيق كامل داخل ThemeProvider */}
      <ThemeProvider>
        <App />
<ToastContainer
  position="bottom-right"
  theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
/>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
