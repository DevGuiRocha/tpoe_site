import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BienvenuePage from './pages/BienvenuePage'
import FamiliesPage from './pages/FamiliesPage'
import FamilyDetailPage from './pages/FamilyDetailPage'
import IndependentesPage from './pages/IndependentesPage'
import CenariosPage from './pages/CenariosPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/enredo" element={<BienvenuePage />} />
        <Route path="/familias/alfa" element={<FamiliesPage tier="Alfa" />} />
        <Route path="/familias/beta" element={<FamiliesPage tier="Beta" />} />
        <Route path="/familias/gama" element={<FamiliesPage tier="Gama" />} />
        <Route path="/familias/:slug" element={<FamilyDetailPage />} />
        <Route path="/independentes" element={<IndependentesPage />} />
        <Route path="/cenarios" element={<CenariosPage />} />
      </Routes>
    </BrowserRouter>
  )
}
