import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BienvenuerPage from './pages/BienvenuePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/enredo" element={<BienvenuerPage />} />
      </Routes>
    </BrowserRouter>
  )
}
