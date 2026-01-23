import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios' // Axios import කරගන්න

// Backend URL එක මෙතන සෙට් කරන්න. 
// Vercel එකේදී Environment Variable එක ගනීවි, නැත්නම් default backend URL එක පාවිච්චි කරයි.
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://kv-audio-backend-xi.vercel.app';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)