import { useEffect, useMemo, useState } from 'react'
import { supabase, supabaseReady } from '../lib/supabase.js'
import { site, services, bookingServices } from '../data.js'

// ── time helpers (minutes from midnight) ──
const OPEN = site.hours.open * 60
const CLOSE = site.hours.close * 60
const STEP = 30

const toMin = (t) => {
  const [h, m] = String(t).split(':')
  return parseInt(h, 10) * 60 + parseInt(m, 10)
}
const pad = (n) => String(n).padStart(2, '0')
const toHHMM = (min) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`
const fmt = (min) => {
  let h = Math.floor(min / 60)
  const m = min % 60
  const ap = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return `${h}:${pad(m)} ${ap}`
}

// Build the next N days as selectable pills.
function nextDays(n) {
  const out = []
  const base = new Date()
  for (let i = 0; i < n; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    const iso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    out.push({
      iso,
      dow: d.toLocaleDateString('en-US', { weekday: 'short' }),
      day: d.getDate(),
      mon: d.toLocaleDateString('en-US', { month: 'short' }),
      isToday: i === 0,
    })
  }
  return out
}

const STEPS = ['Service', 'Date', 'Time', 'Details']

export default function Booking() {
  const [step, setStep] = useState(0)
  const [serviceId, setServiceId] = useState(null)
  const [date, setDate] = useState(null)
  const [slot, setSlot] = useState(null)
  const [booked, setBooked] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const days = useMemo(() => nextDays(21), [])
  const service = useMemo(
    () => bookingServices.find((s) => s.id === serviceId) || null,
    [serviceId]
  )

  // Fetch booked slots whenever the date changes.
  useEffect(() => {
    if (!date || !supabaseReady) return
    let cancelled = false
    setLoadingSlots(true)
    supabase
      .rpc('nuraki_booked_slots', { d: date })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) setBooked([])
        else setBooked((data || []).map((r) => ({ start: toMin(r.start_time), dur: r.duration_min })))
        setLoadingSlots(false)
      })
    return () => {
      cancelled = true
    }
  }, [date])

  // Compute free start times for the chosen service + date.
  const freeSlots = useMemo(() => {
    if (!service || !date) return []
    const now = new Date()
    const todayIso = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
    const nowMin = now.getHours() * 60 + now.getMinutes()
    const out = []
    for (let s = OPEN; s + service.duration <= CLOSE; s += STEP) {
      const e = s + service.duration
      if (date === todayIso && s <= nowMin + 30) continue // small lead time
      const overlaps = booked.some((b) => s < b.start + b.dur && b.start < e)
      if (!overlaps) out.push(s)
    }
    return out
  }, [service, date, booked])

  const go = (n) => {
    setError('')
    setStep(n)
  }

  const submit = async () => {
    setError('')
    if (!form.name.trim() || form.phone.trim().length < 4) {
      setError('Please add your name and a contact number.')
      return
    }
    if (!supabaseReady) {
      setError('Booking is not connected yet. Please reach us on WhatsApp.')
      return
    }
    setSubmitting(true)
    const { error: insErr } = await supabase.from('appointments').insert({
      service: service.label,
      service_category: service.category,
      duration_min: service.duration,
      price_aed: service.price,
      date,
      start_time: toHHMM(slot),
      end_time: toHHMM(slot + service.duration),
      customer_name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      notes: form.notes.trim() || null,
    })
    setSubmitting(false)
    if (insErr) {
      setError('Something went wrong saving your booking. Please try WhatsApp.')
      return
    }
    setDone(true)
  }

  const reset = () => {
    setStep(0)
    setServiceId(null)
    setDate(null)
    setSlot(null)
    setForm({ name: '', phone: '', email: '', notes: '' })
    setDone(false)
    setError('')
  }

  return (
    <section id="book" className="relative z-10 bg-ink-soft px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="reveal mb-12 text-center">
          <p className="eyebrow">Reservations</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-6xl">Book Your Appointment</h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-taupe">
            Choose your service and a time that suits you. We'll confirm your
            booking shortly after.
          </p>
        </div>

        <div className="reveal rounded-3xl border border-white/10 bg-ink/60 p-6 shadow-2xl backdrop-blur-sm sm:p-10">
          {done ? (
            <Success service={service} date={date} slot={slot} fmt={fmt} onReset={reset} />
          ) : (
            <>
              {/* Stepper */}
              <ol className="mb-8 flex items-center justify-center gap-2 sm:gap-4">
                {STEPS.map((label, i) => (
                  <li key={label} className="flex items-center gap-2 sm:gap-4">
                    <button
                      type="button"
                      disabled={i > step}
                      onClick={() => i < step && go(i)}
                      className={`flex items-center gap-2 text-xs uppercase tracking-wide2 transition-colors ${
                        i === step ? 'text-gold' : i < step ? 'text-cream-dim hover:text-gold' : 'text-taupe-dim'
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border text-[0.65rem] ${
                          i <= step ? 'border-gold text-gold' : 'border-mocha text-taupe-dim'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                    {i < STEPS.length - 1 && <span className="h-px w-4 bg-mocha sm:w-8" />}
                  </li>
                ))}
              </ol>

              {/* Step 1 — Service */}
              {step === 0 && (
                <div>
                  <div className="space-y-6">
                    {services.map((cat) => (
                      <div key={cat.category}>
                        <h4 className="mb-3 text-[0.65rem] uppercase tracking-label text-gold">{cat.category}</h4>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {cat.items.map((item) => {
                            const id = `${cat.category}::${item.name}`
                            const active = serviceId === id
                            return (
                              <button
                                key={id}
                                type="button"
                                onClick={() => {
                                  setServiceId(id)
                                  go(1)
                                }}
                                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                                  active
                                    ? 'border-gold bg-gold/10'
                                    : 'border-white/10 hover:border-gold/50 hover:bg-white/5'
                                }`}
                              >
                                <span className="text-sm text-cream-dim">{item.name}</span>
                                <span className="ml-3 whitespace-nowrap text-xs text-gold">
                                  {item.from ? 'from ' : ''}
                                  {item.price} AED
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 — Date */}
              {step === 1 && (
                <div>
                  <p className="mb-5 text-center text-sm text-taupe">
                    {service?.label} · {service?.duration} min
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {days.map((d) => {
                      const active = date === d.iso
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          onClick={() => {
                            setDate(d.iso)
                            setSlot(null)
                            go(2)
                          }}
                          className={`flex w-16 flex-col items-center rounded-xl border px-2 py-3 transition-all ${
                            active ? 'border-gold bg-gold/10' : 'border-white/10 hover:border-gold/50'
                          }`}
                        >
                          <span className="text-[0.6rem] uppercase tracking-wide2 text-taupe">{d.dow}</span>
                          <span className="mt-1 font-serif text-xl text-cream">{d.day}</span>
                          <span className="text-[0.6rem] text-taupe-dim">{d.isToday ? 'Today' : d.mon}</span>
                        </button>
                      )
                    })}
                  </div>
                  <StepNav onBack={() => go(0)} />
                </div>
              )}

              {/* Step 3 — Time */}
              {step === 2 && (
                <div>
                  <p className="mb-5 text-center text-sm text-taupe">
                    {service?.label} ·{' '}
                    {date &&
                      new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                  </p>
                  {loadingSlots ? (
                    <p className="py-8 text-center text-sm text-taupe">Finding open times…</p>
                  ) : freeSlots.length === 0 ? (
                    <p className="py-8 text-center text-sm text-taupe">
                      No open times left that day. Please try another date.
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {freeSlots.map((s) => {
                        const active = slot === s
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => {
                              setSlot(s)
                              go(3)
                            }}
                            className={`rounded-lg border py-2.5 text-sm transition-all ${
                              active
                                ? 'border-gold bg-gold/10 text-gold'
                                : 'border-white/10 text-cream-dim hover:border-gold/50'
                            }`}
                          >
                            {fmt(s)}
                          </button>
                        )
                      })}
                    </div>
                  )}
                  <StepNav onBack={() => go(1)} />
                </div>
              )}

              {/* Step 4 — Details */}
              {step === 3 && (
                <div>
                  <div className="mb-6 rounded-xl border border-gold/20 bg-gold/5 p-4 text-center">
                    <p className="font-serif text-lg text-cream">{service?.label}</p>
                    <p className="mt-1 text-sm text-taupe">
                      {date &&
                        new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}{' '}
                      · {slot != null && fmt(slot)} · {service?.duration} min · {service?.price} AED
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <Field label="Phone *" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} type="tel" />
                    <Field label="Email (optional)" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" className="sm:col-span-2" />
                    <Field label="Notes (inspo, allergies, requests)" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} className="sm:col-span-2" textarea />
                  </div>
                  {error && <p className="mt-4 text-center text-sm text-wine-deep bg-wine/10 rounded-lg py-2 text-red-300">{error}</p>}
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <button type="button" onClick={() => go(2)} className="text-xs uppercase tracking-wide2 text-taupe hover:text-gold">
                      ← Back
                    </button>
                    <button type="button" onClick={submit} disabled={submitting} className="btn-gold disabled:opacity-60">
                      {submitting ? 'Booking…' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              )}

              {!supabaseReady && (
                <p className="mt-6 text-center text-xs text-taupe-dim">
                  Booking backend not connected. Reach us on{' '}
                  <a href={site.whatsapp} className="text-gold underline" target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                  .
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function StepNav({ onBack }) {
  return (
    <div className="mt-6 text-center">
      <button type="button" onClick={onBack} className="text-xs uppercase tracking-wide2 text-taupe hover:text-gold">
        ← Back
      </button>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', className = '', textarea }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[0.65rem] uppercase tracking-label text-taupe">{label}</span>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full resize-none rounded-lg border border-white/10 bg-ink px-3 py-2.5 text-sm text-cream outline-none transition-colors focus:border-gold"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2.5 text-sm text-cream outline-none transition-colors focus:border-gold"
        />
      )}
    </label>
  )
}

function Success({ service, date, slot, fmt, onReset }) {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="font-serif text-3xl text-cream">Booking received</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-taupe">
        Thank you — your request for <span className="text-gold">{service?.label}</span> on{' '}
        {date &&
          new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}{' '}
        at {slot != null && fmt(slot)} is in. We'll confirm shortly via phone or WhatsApp.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost">Message Us</a>
        <button type="button" onClick={onReset} className="btn-gold">Book Another</button>
      </div>
    </div>
  )
}
