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

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = nav.findIndex((n) => n.id === entry.target.id)
            if (idx !== -1 && idx !== activeRef.current) {
              activeRef.current = idx
              setActive(idx)
            }
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const goTo = (index) => {
    const el = document.getElementById(nav[index].id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="pointer-events-none fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
      <div className="pointer-events-auto">
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
