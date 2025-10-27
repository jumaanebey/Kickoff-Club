import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { initGA4 } from './utils/initGA4'

// Initialize Google Analytics 4
initGA4()

createRoot(document.getElementById('root')).render(<App />)
