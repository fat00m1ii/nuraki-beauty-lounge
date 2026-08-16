import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// A single shared browser client. Safe with the public anon key because
// Row Level Security only permits: public INSERT into `appointments`,
// public SELECT of active `services`. No public read of other bookings.
export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export const supabaseReady = Boolean(supabase)
