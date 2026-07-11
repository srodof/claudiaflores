import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import ServicePage from './pages/ServicePage'

// El build portátil (un solo .html, abierto con doble clic vía file://) no tiene
// servidor que resuelva rutas, así que usa hash routing en vez de History API.
const Router = import.meta.env.MODE === 'portable' ? HashRouter : BrowserRouter

export default function App() {
  return (
    <Router>
      <div className="grain">
        <Preloader />
        <Cursor />
        <Navbar />
        <ScrollToTop />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicios/:slug" element={<ServicePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFab />
      </div>
    </Router>
  )
}
