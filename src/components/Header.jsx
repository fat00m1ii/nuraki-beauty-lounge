import { useEffect, useState } from 'react'
import { site, nav } from '../data.js'

// Slim top bar. Transparent over the hero, frosted once you scroll.
// On mobile (< lg, where the vertical SideNav is hidden) a hamburger opens a
// full-screen section menu so small-screen users can still jump around.
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll + close on Escape while the menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-lux ${
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

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden text-[0.65rem] uppercase tracking-wide2 text-taupe md:inline">
              {site.hours.label}
            </span>
            <a href="#book" className="btn-gold !px-6 !py-2.5">
              Book Now
            </a>

            {/* Mobile menu toggle — only where the desktop rail is hidden */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-8 items-center justify-center text-cream lg:hidden"
            >
              <span className="relative block h-[11px] w-6" aria-hidden="true">
                <span className="absolute left-0 top-0 h-px w-full bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                <span className="absolute bottom-0 left-0 h-px w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen section menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-xl transition-opacity duration-300 ease-lux lg:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 sm:px-8">
          <span className="font-sans text-lg font-600 tracking-[0.28em] text-cream">
            NURAKI
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center text-cream"
          >
            <span className="relative block h-5 w-5" aria-hidden="true">
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-1">
          {nav.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-baseline gap-3 py-2.5 font-serif text-3xl text-cream transition-colors hover:text-gold"
            >
              <span className="font-sans text-xs tracking-wide2 text-gold/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              {n.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setMenuOpen(false)}
            className="btn-gold mt-8"
          >
            Book Your Escape
          </a>
        </nav>
      </div>
    </>
  )
}
