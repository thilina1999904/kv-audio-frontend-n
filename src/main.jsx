import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios' // Axios import කරගන්න

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://kv-audio-backend-xi.vercel.app';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)