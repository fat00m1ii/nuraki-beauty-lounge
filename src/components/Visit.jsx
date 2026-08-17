import { site } from '../data.js'

// "Open now" indicator based on local (Gulf Standard) hours.
function useOpenNow() {
  const now = new Date()
  // Abu Dhabi is UTC+4, no DST.
  const gst = new Date(now.getTime() + (now.getTimezoneOffset() + 240) * 60000)
  const hour = gst.getHours() + gst.getMinutes() / 60
  return hour >= site.hours.open && hour < site.hours.close
}

export default function Visit() {
  const open = useOpenNow()

  return (
    <section id="visit" className="relative z-10 bg-ink px-5 py-24 sm:px-8 sm:py-32 lg:pl-[210px]">
      <div className="mx-auto max-w-shell">
        <div className="grid gap-14 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow">Find Us</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-6xl">Visit the Lounge</h2>

            <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-ink-soft px-4 py-2">
              <span className={`relative flex h-2.5 w-2.5`}>
                <span
                  className={`absolute inline-flex h-full w-full rounded-full ${
                    open ? 'animate-ping bg-emerald-400/70' : 'bg-taupe/50'
                  }`}
                />
                <span
                  className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                    open ? 'bg-emerald-400' : 'bg-taupe'
                  }`}
                />
              </span>
              <span className="text-sm text-cream-dim">
                {open ? 'Open now' : 'Closed'} · {site.hours.label.replace('Open daily · ', '')}
              </span>
            </div>

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-[0.65rem] uppercase tracking-label text-gold">Address</dt>
                <dd className="mt-2 text-cream-dim">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-label text-gold">Hours</dt>
                <dd className="mt-2 text-cream-dim">Monday – Sunday · 10:00 AM – 8:00 PM</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-label text-gold">Contact</dt>
                <dd className="mt-2 flex flex-col gap-1 text-cream-dim">
                  <a href={`tel:${site.phoneRaw}`} className="transition-colors hover:text-gold">{site.phone}</a>
                  <a href={site.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-gold">
                    {site.instagramHandle}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href={site.address.mapUrl} target="_blank" rel="noreferrer" className="btn-gold">Get Directions</a>
              <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost">WhatsApp Us</a>
            </div>
          </div>

          {/* Map — keyless Google Maps embed centred on the street/area.
              (The business-name query returned no result → blank blue tile.) */}
          <div className="reveal overflow-hidden rounded-3xl ring-1 ring-gold/15 shadow-2xl">
            <iframe
              title="NURAKI Beauty Lounge location"
              className="block h-full min-h-[340px] w-full grayscale-[0.25] contrast-[1.05]"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=24.4924,54.3705&z=14&hl=en&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
