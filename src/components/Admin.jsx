import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, supabaseReady } from '../lib/supabase.js'

const STATUS = ['pending', 'confirmed', 'completed', 'cancelled']
const badge = {
  pending: 'text-amber-300 border-amber-300/40',
  confirmed: 'text-emerald-300 border-emerald-300/40',
  completed: 'text-sky-300 border-sky-300/40',
  cancelled: 'text-red-300 border-red-300/40',
}

export default function Admin() {
  const [pass, setPass] = useState('')
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async (p = pass) => {
    setError('')
    setLoading(true)
    const { data, error } = await supabase.rpc('nuraki_admin_list', { pass: p })
    setLoading(false)
    if (error) {
      setError('Wrong passcode or connection error.')
      setRows(null)
      return
    }
    setRows(data || [])
  }

  const setStatus = async (id, status) => {
    const { error } = await supabase.rpc('nuraki_admin_set_status', {
      pass,
      appt_id: id,
      new_status: status,
    })
    if (!error) load()
  }

  return (
    <div className="min-h-screen bg-ink px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl text-cream">NURAKI · Bookings</h1>
            <p className="text-sm text-taupe">Admin dashboard</p>
          </div>
          <Link to="/" className="text-xs uppercase tracking-wide2 text-taupe hover:text-gold">
            ← Back to site
          </Link>
        </div>

        {!supabaseReady && (
          <p className="rounded-lg border border-white/10 bg-ink-soft p-4 text-sm text-taupe">
            Supabase is not configured (missing env vars).
          </p>
        )}

        {rows === null ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              load()
            }}
            className="max-w-sm rounded-2xl border border-white/10 bg-ink-soft p-6"
          >
            <label className="mb-1.5 block text-[0.65rem] uppercase tracking-label text-taupe">
              Passcode
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2.5 text-sm text-cream outline-none focus:border-gold"
              placeholder="Enter admin passcode"
            />
            {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
            <button type="submit" disabled={loading} className="btn-gold mt-4 w-full">
              {loading ? 'Checking…' : 'View Bookings'}
            </button>
          </form>
        ) : (
          <div>
            <div className="mb-4 flex items-center gap-4 text-sm text-taupe">
              <span>{rows.length} upcoming booking{rows.length === 1 ? '' : 's'}</span>
              <button onClick={() => load()} className="text-gold hover:underline">Refresh</button>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-ink-soft text-[0.65rem] uppercase tracking-wide2 text-taupe">
                  <tr>
                    {['When', 'Service', 'Client', 'Contact', 'Status', ''].map((h) => (
                      <th key={h} className="px-4 py-3 font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t border-white/5 text-cream-dim">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-cream">
                          {new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-xs text-taupe">{r.start_time?.slice(0, 5)}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-cream">{r.service}</div>
                        <div className="text-xs text-taupe">{r.duration_min} min · {r.price_aed} AED</div>
                      </td>
                      <td className="px-4 py-3 text-cream">{r.customer_name}</td>
                      <td className="px-4 py-3">
                        <a href={`tel:${r.phone}`} className="hover:text-gold">{r.phone}</a>
                        {r.notes && <div className="mt-1 max-w-[180px] truncate text-xs text-taupe" title={r.notes}>“{r.notes}”</div>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full border px-2.5 py-1 text-[0.65rem] uppercase ${badge[r.status] || ''}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={r.status}
                          onChange={(e) => setStatus(r.id, e.target.value)}
                          className="rounded-md border border-white/10 bg-ink px-2 py-1 text-xs text-cream-dim outline-none focus:border-gold"
                        >
                          {STATUS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-taupe">No upcoming bookings.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
