import { useEffect, useRef, useState } from 'react'
import LineSidebar from './LineSidebar.jsx'
import { nav } from '../data.js'

// Fixed vertical section nav (desktop only). Wraps the React Bits LineSidebar
// with scroll-spy (active section) + smooth-scroll on click.
export default function SideNav() {
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  useEffect(() => {
    // Scroll-position spy: the active item is the last section whose top has
    // crossed a reference line 35% down the viewport. At the very bottom of the
    // page (footer) we force the final section so it never sticks on a
    // mid-page item like "Experience".
    let lastRun = 0

    const compute = () => {
      const sections = nav
        .map((n) => document.getElementById(n.id))
        .filter(Boolean)
      if (!sections.length) return

      const line = window.innerHeight * 0.35
      let idx = 0
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top - line <= 0) idx = i
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      if (atBottom) idx = sections.length - 1

      if (idx !== activeRef.current) {
        activeRef.current = idx
        setActive(idx)
      }
    }

    const onScroll = () => {
      const now = performance.now()
      if (now - lastRun < 80) return
      lastRun = now
      compute()
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goTo = (index) => {
    const el = document.getElementById(nav[index].id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
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
