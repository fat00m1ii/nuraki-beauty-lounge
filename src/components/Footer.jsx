import { site } from '../data.js'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-ink px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-shell">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-2xl font-600 tracking-[0.28em] text-cream">
              NURAKI
            </span>
            <span className="font-serif text-xs uppercase tracking-label text-taupe">
              Beauty Lounge
            </span>
          </div>
          <p className="max-w-md font-serif text-lg italic text-taupe">
            {site.tagline}.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream-dim">
            <a href={`tel:${site.phoneRaw}`} className="transition-colors hover:text-gold">
              {site.phone}
            </a>
            <span className="text-mocha">·</span>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="transition-colors hover:text-gold">
              WhatsApp
            </a>
            <span className="text-mocha">·</span>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-gold">
              Instagram
            </a>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-taupe-dim">
            {site.address.line1}, {site.address.line2}
          </p>
          <div className="hairline mt-4 w-40" />
          <p className="text-[0.7rem] tracking-wide2 text-taupe-dim">
            © {new Date().getFullYear()} NURAKI Beauty Lounge · Abu Dhabi
          </p>
        </div>
      </div>
    </footer>
  )
}
