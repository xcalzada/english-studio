import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

// Cliente Supabase — usa las mismas vars que el backend
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export { supabase };

export function useSession() {
  const [session, setSession] = useState(null);
  const [ready,   setReady]   = useState(false);

  useEffect(() => {
    // Sesión actual al montar
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });

    // Escuchar cambios (login, logout, refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return {
    userId:  session?.user?.id   ?? null,
    token:   session?.access_token ?? null,
    email:   session?.user?.email  ?? null,
    ready,
    signOut,
  };
}