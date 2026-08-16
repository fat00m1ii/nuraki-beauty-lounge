import { useEffect, useState } from 'react'
import { site } from '../data.js'

// Slim top bar. Transparent over the hero, frosted once you scroll.
export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-lux ${
        scrolled
          ? 'bg-ink/80 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-shell items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-baseline gap-2 group">
          <span className="font-sans text-lg font-600 tracking-[0.28em] text-cream">
            NURAKI
          </span>
          <span className="hidden font-serif text-[0.6rem] uppercase tracking-label text-taupe sm:inline">
            Beauty Lounge
          </span>
        </a>

        <div className="flex items-center gap-6">
          <span className="hidden text-[0.65rem] uppercase tracking-wide2 text-taupe md:inline">
            {site.hours.label}
          </span>
          <a href="#book" className="btn-gold !px-6 !py-2.5">
            Book Now
          </a>
        </div>
      </div>
    </header>
  )
}
