import { pillars, videos, gallery } from '../data.js'
import { img, assetUrl } from '../lib/imagekit.js'
import SmartImage from './SmartImage.jsx'

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 overflow-hidden bg-ink-soft px-5 py-24 sm:px-8 sm:py-32 lg:pl-[210px]">
      <div className="mx-auto max-w-shell">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Video + framed image */}
          <div className="reveal relative">
            <div className="overflow-hidden rounded-3xl ring-1 ring-gold/15 shadow-2xl">
              <video
                className="aspect-[4/5] w-full object-cover"
                src={assetUrl(videos.lounge2)}
                autoPlay
                muted
                loop
                playsInline
                poster={img(gallery[2].path, { w: 900 })}
              />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden w-40 rotate-3 overflow-hidden rounded-2xl ring-1 ring-gold/20 shadow-xl sm:block">
              <SmartImage path={gallery[8].path} alt="NURAKI nail art detail" w={400} className="aspect-[3/4]" />
            </div>
          </div>

          {/* Copy + pillars */}
          <div>
            <div className="reveal">
              <p className="eyebrow">The Experience</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-6xl">More than a manicure</h2>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-taupe">
                NURAKI was built as a retreat from the noise of the city — a warm,
                golden-lit lounge where precision meets calm. Come for the nails,
                stay for the quiet luxury of being truly looked after.
              </p>
            </div>

            <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <div key={p.title} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="mb-3 h-px w-8 bg-gold" />
                  <h3 className="font-serif text-xl text-cream">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-taupe">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
