import { useEffect, useRef, useState } from 'react'
import LineSidebar from './LineSidebar.jsx'
import { nav } from '../data.js'

// Fixed vertical section nav (desktop only). Wraps the React Bits LineSidebar
// with scroll-spy (active section) + smooth-scroll on click.
export default function SideNav() {
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter(Boolean)
    if (!sections.length) return

    // A zero-height line across the viewport middle: exactly one section
    // straddles it at any moment, so the highlight always matches what's on
    // screen. We only ever move the highlight onto an intersecting section
    // (never reset it), so past the last section the footer keeps "Book" lit.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = nav.findIndex((n) => n.id === entry.target.id)
          if (idx !== -1 && idx !== activeRef.current) {
            activeRef.current = idx
            setActive(idx)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const goTo = (index) => {
    const el = document.getElementById(nav[index].id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="pointer-events-none fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
      <div className="pointer-events-auto rounded-2xl bg-ink/25 px-4 py-5 ring-1 ring-white/5 backdrop-blur-[3px]">
        <LineSidebar
          key={active}
          items={nav.map((n) => n.label)}
          accentColor="#c9a24b"
          textColor="#7c6a5c"
          markerColor="#4a382e"
          defaultActive={active}
          onItemClick={goTo}
          proximityRadius={90}
          maxShift={18}
          markerLength={44}
          itemGap={16}
          fontSize={0.82}
          showIndex
        />
      </div>
    </div>
  )
}
