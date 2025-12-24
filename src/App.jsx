import './App.css'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminPage from './pages/admin/adminpage'
import HomePage from './pages/home/homePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomePage/>}/>
        <Route path="/admin/*" element={<AdminPage />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
