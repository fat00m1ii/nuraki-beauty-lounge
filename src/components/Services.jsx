import { services } from '../data.js'

export default function Services() {
  return (
    <section id="services" className="relative z-10 bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-shell">
        <div className="reveal mb-16 text-center">
          <p className="eyebrow">The Menu</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-6xl">Services & Pricing</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-taupe">
            Prices in AED. Every appointment includes shaping, cuticle care and a
            calm, unhurried finish. Bespoke art quoted on the day.
          </p>
        </div>

        <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
          {services.map((cat, i) => (
            <div
              key={cat.category}
              className="reveal"
              style={{ transitionDelay: `${(i % 2) * 90}ms` }}
            >
              <div className="mb-5 flex items-baseline justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif text-2xl text-cream">{cat.category}</h3>
              </div>
              <p className="mb-6 text-sm italic text-taupe">{cat.blurb}</p>
              <ul className="space-y-4">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-baseline gap-3">
                    <span className="text-cream-dim">{item.name}</span>
                    <span className="mx-1 flex-1 translate-y-[-3px] border-b border-dotted border-mocha/60" />
                    <span className="whitespace-nowrap font-sans text-sm text-gold">
                      {item.from ? 'from ' : ''}
                      {item.price} <span className="text-taupe-dim">AED</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="reveal mt-16 text-center">
          <a href="#book" className="btn-gold">Reserve Your Appointment</a>
        </div>
      </div>
    </section>
  )
}
