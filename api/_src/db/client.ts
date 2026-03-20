// api/src/db/client.ts
// Dos clientes Supabase:
//   - adminDb: service_role (bypasa RLS) → solo para crear usuarios en auth.ts
//   - userDb(jwt): anon key + JWT del usuario → RLS activo, seguro
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;
const anonKey = process.env.SUPABASE_ANON_KEY;

if (!url || !serviceKey || !anonKey) {
  throw new Error('Missing SUPABASE_URL, SUPABASE_SERVICE_KEY or SUPABASE_ANON_KEY in .env');
}

// Solo para operaciones de admin (crear usuario anónimo)
export const adminDb = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

// Para todas las queries de datos — RLS activo
export function userDb(userJwt: string): SupabaseClient {
  return createClient(url!, anonKey!, {
    auth: { persistSession: false },
    global: {
      headers: { Authorization: `Bearer ${userJwt}` },
    },
  });
}