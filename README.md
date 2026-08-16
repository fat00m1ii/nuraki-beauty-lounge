# NURAKI Beauty Lounge

A luxe, interactive website for NURAKI Beauty Lounge — a nail atelier in Abu Dhabi.
Vite + React + Tailwind + GSAP, with real online booking on Supabase.

## Features

- **Cinematic GSAP scroll hero** — a "salon reveal" that builds as you scroll (with a
  reduced-motion fallback). A slot is reserved for the Higgsfield hero clip.
- **3D dome gallery** (React Bits `DomeGallery`) of the nail portfolio — drag to spin, tap to enlarge.
- **Proximity side-nav** (React Bits `LineSidebar`) with scroll-spy.
- **Real appointment booking** on Supabase: service → date → live open time slots →
  details → confirmation. Availability is computed against existing bookings.
- **Admin dashboard** at `/admin` (passcode-gated) to view and update bookings.
- **ImageKit-ready** image pipeline with a graceful local fallback.
- Services, Experience, Visit (map + "open now"), WhatsApp, SEO/OG tags.

## Local development

```bash
npm install
cp .env.example .env   # fill in the values (see below)
npm run dev
```

## Environment variables

| Var | Purpose |
|-----|---------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable/anon key |
| `VITE_IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint (optional; falls back to `/public`) |
| `VITE_ADMIN_PASSCODE` | (reference) admin passcode — must match `app_secrets.admin_passcode` in the DB |
| `IMAGEKIT_PUBLIC_KEY` / `IMAGEKIT_PRIVATE_KEY` | only for `npm run upload:imagekit` |

## Supabase

Tables and functions live in the `jptfxkcuepdqsynypdtb` project:
- `appointments` — bookings (RLS: public can insert only).
- `nuraki_booked_slots(date)` — returns booked ranges (no PII) for availability.
- `nuraki_admin_list(pass, from_date)` / `nuraki_admin_set_status(pass, id, status)` — passcode-gated admin.

Change the admin passcode:
```sql
update public.app_secrets set value = 'your-new-passcode' where key = 'admin_passcode';
```

## Editing content

All copy, services and prices live in [`src/data.js`](src/data.js). Prices marked
`TODO: confirm` are placeholders from the Fresha listing's categories — swap in the real AED numbers.

## Deploy

Push to GitHub, import into Vercel, set the `VITE_*` env vars, deploy. `vercel.json`
handles SPA routing so `/admin` works.
