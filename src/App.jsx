import './App.css'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminPage from './pages/admin/adminpage'
import HomePage from './pages/home/homePage'
import Testing from './components/testing'
import LoginPage from './pages/login/login'
import RegisterPage from './pages/register/register'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'


function App() {
  return (
   <GoogleOAuthProvider clientId="254403227621-g45egel754ovjcqt0mf46eoulrktkvb1.apps.googleusercontent.com">
    <BrowserRouter>
    <Toaster position='top-right'/>
      <Routes>
        <Route path="/testing" element={<Testing/>}/>
        <Route path="/*" element={<HomePage/>}/>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
