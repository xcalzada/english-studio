// src/hooks/useSession.ts
import { useState, useEffect } from 'react';
import { api } from '../api/client';

interface Session {
  user_id: string;
  token:   string;
  is_new:  boolean;
}

interface UseSessionReturn {
  userId: string | null;
  token:  string | null;
  ready:  boolean;
  error:  string | null;
}

const TOKEN_KEY = 'gl_token';

export function useSession(): UseSessionReturn {
  const [token,  setToken]  = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));
  const [userId, setUserId] = useState<string | null>(null);
  const [ready,  setReady]  = useState(false);
  const [error,  setError]  = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(TOKEN_KEY);

    api.post<Session>('/api/auth/session', {}, stored ? stored : undefined)
      .then(s => {
        sessionStorage.setItem(TOKEN_KEY, s.token);
        setToken(s.token);
        setUserId(s.user_id);
        setReady(true);
      })
      .catch(e => {
        console.error('Session error:', e);
        setError(e.message);
        setReady(true);
      });
  }, []);

  return { userId, token, ready, error };
}