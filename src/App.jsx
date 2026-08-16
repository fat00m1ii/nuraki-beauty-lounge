import { useReveal } from './hooks/useReveal.js'
import Header from './components/Header.jsx'
import SideNav from './components/SideNav.jsx'
import HeroScene from './components/HeroScene.jsx'
import Services from './components/Services.jsx'
import GallerySection from './components/GallerySection.jsx'
import Experience from './components/Experience.jsx'
import Visit from './components/Visit.jsx'
import Booking from './components/Booking.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  useReveal()

  return (
    <div className="grain relative min-h-screen bg-ink">
      <Header />
      <SideNav />
      <main>
        <HeroScene />
        <Services />
        <GallerySection />
        <Experience />
        <Visit />
        <Booking />
      </main>
      <Footer />
    </div>
  )
}
