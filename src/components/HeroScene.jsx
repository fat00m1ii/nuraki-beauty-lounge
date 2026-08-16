import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site, videos, gallery } from '../data.js'
import { img } from '../lib/imagekit.js'

gsap.registerPlugin(ScrollTrigger)

// Floating nail-photo layers used as parallax depth in the reveal.
const floatShots = [gallery[0], gallery[5], gallery[12], gallery[20]]

export default function HeroScene() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const [reduce] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (reduce) {
      // No scroll choreography — just reveal the ambient layers cleanly.
      gsap.set('.hero-cine', { opacity: 1, scale: 1 })
      gsap.set('.hero-veil', { opacity: 0.6 })
      gsap.set('.hero-cue', { opacity: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=3200',
          scrub: 1,
          pin: stageRef.current,
          pinSpacing: true,
          anticipatePin: 1,
        },
      })

      // 1 — Wordmark settles, ambience wakes up
      tl.to('.hero-word', { letterSpacing: '0.5em', duration: 1 }, 0)
        .to('.hero-cine', { opacity: 1, scale: 1, duration: 1.4 }, 0)
        .to('.hero-veil', { opacity: 0.55, duration: 1.2 }, 0)
        .to('.hero-cue', { opacity: 0, duration: 0.4 }, 0)

      // 2 — Glide inward: wordmark lifts, first line, photos drift in
      tl.to('.hero-word', { yPercent: -120, scale: 0.6, opacity: 0.9, duration: 1.4 }, 1)
        .to('.hero-sub', { opacity: 0, duration: 0.6 }, 1)
        .fromTo('.hero-line-1', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 1.2)
        .fromTo(
          '.hero-shot',
          { opacity: 0, scale: 0.8, y: 60 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.15, duration: 1.2 },
          1
        )

      // 3 — Deeper: photos parallax apart, second line
      tl.to('.hero-shot-a', { xPercent: -30, yPercent: -14, duration: 1.6 }, 2.2)
        .to('.hero-shot-b', { xPercent: 34, yPercent: 12, duration: 1.6 }, 2.2)
        .to('.hero-shot-c', { xPercent: -40, yPercent: 20, duration: 1.6 }, 2.2)
        .to('.hero-shot-d', { xPercent: 42, yPercent: -18, duration: 1.6 }, 2.2)
        .to('.hero-line-1', { opacity: 0, y: -30, duration: 0.8 }, 2.2)
        .fromTo('.hero-line-2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 2.5)

      // 4 — Arrive: everything settles behind the tagline + CTA
      tl.to('.hero-shot', { opacity: 0.25, filter: 'blur(6px)', duration: 1.2 }, 3.6)
        .to('.hero-line-2', { opacity: 0, y: -30, duration: 0.8 }, 3.6)
        .to('.hero-cine', { scale: 1.08, duration: 1.4 }, 3.6)
        .to('.hero-veil', { opacity: 0.72, duration: 1 }, 3.6)
        .fromTo('.hero-final', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2 }, 3.9)
    }, rootRef)

    return () => ctx.revert()
  }, [reduce])

  return (
    <section id="home" ref={rootRef} className="relative">
      <div
        ref={stageRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-ink"
      >
        {/* Cinematic base layer — Higgsfield hero slot.
            Swap this <video> src for the approved Higgsfield lounge fly-through. */}
        <video
          className={`hero-cine absolute inset-0 h-full w-full object-cover ${
            reduce ? '' : 'scale-125 opacity-0'
          }`}
          src={videos.lounge1}
          autoPlay
          muted
          loop
          playsInline
          poster={img(gallery[0].path, { w: 1200 })}
          data-higgsfield-slot="hero"
        />

        {/* Warm gradient + dark veil for depth and legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 30%, rgba(94,34,48,0.25), transparent 60%), linear-gradient(180deg, rgba(10,9,8,0.6), rgba(10,9,8,0.2) 40%, rgba(10,9,8,0.9))',
          }}
        />
        <div
          className={`hero-veil pointer-events-none absolute inset-0 bg-ink ${
            reduce ? '' : 'opacity-30'
          }`}
        />

        {/* Floating nail-photo parallax layers (animated path only) */}
        {!reduce && (
          <div className="pointer-events-none absolute inset-0">
            {floatShots.map((shot, i) => {
              const pos = [
                'left-[8%] top-[18%] w-40 sm:w-52',
                'right-[10%] top-[22%] w-32 sm:w-44',
                'left-[14%] bottom-[16%] w-36 sm:w-48',
                'right-[12%] bottom-[18%] w-40 sm:w-52',
              ][i]
              const tag = ['hero-shot-a', 'hero-shot-b', 'hero-shot-c', 'hero-shot-d'][i]
              return (
                <div
                  key={i}
                  className={`hero-shot ${tag} absolute ${pos} aspect-[3/4] overflow-hidden rounded-2xl opacity-0 shadow-2xl ring-1 ring-gold/20`}
                >
                  <img src={img(shot.path, { w: 500 })} alt="" className="h-full w-full object-cover" />
                </div>
              )
            })}
          </div>
        )}

        {/* Centered content stack */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <p className="eyebrow mb-6 opacity-80">Abu Dhabi · Est. 2025</p>

          <h1 className="hero-word font-sans text-5xl font-600 tracking-[0.25em] text-cream sm:text-7xl md:text-8xl">
            NURAKI
          </h1>
          <p className="hero-sub mt-3 font-serif text-sm uppercase tracking-label text-taupe sm:text-base">
            Beauty Lounge
          </p>

          {/* Reduced-motion: a clean static tagline + CTA right here */}
          {reduce && (
            <div className="mt-8 flex max-w-xl flex-col items-center">
              <p className="text-shimmer font-serif text-3xl italic sm:text-5xl">{site.tagline}</p>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-cream-dim">{site.intro}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a href="#book" className="btn-gold">Book Your Escape</a>
                <a href="#gallery" className="btn-ghost">View Gallery</a>
              </div>
            </div>
          )}

          {/* Scroll-driven lines + final CTA (animated path only) */}
          {!reduce && (
            <>
              <div className="pointer-events-none absolute left-1/2 top-1/2 w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2">
                <p className="hero-line-1 font-serif text-3xl italic text-cream opacity-0 sm:text-5xl">
                  Bespoke nail artistry
                </p>
                <p className="hero-line-2 font-serif text-3xl italic text-cream opacity-0 sm:text-5xl">
                  in the heart of Abu Dhabi
                </p>
              </div>

              <div className="hero-final absolute left-1/2 top-1/2 flex w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col items-center opacity-0">
                <p className="text-shimmer font-serif text-4xl italic sm:text-6xl">{site.tagline}</p>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-cream-dim">{site.intro}</p>
                <div className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-4">
                  <a href="#book" className="btn-gold">Book Your Escape</a>
                  <a href="#gallery" className="btn-ghost">View Gallery</a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Scroll cue */}
        <div className="hero-cue absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="mb-2 text-[0.6rem] uppercase tracking-label text-taupe">Scroll</p>
          <div className="mx-auto h-10 w-[1px] animate-pulse bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>
    </section>
  )
}
