import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../api/client';

/**
 * useStreak
 *
 * Gestiona la racha de respuestas correctas en dos niveles:
 *   1. Local  — racha dentro de la sesión actual (streak, score) actualizada al instante
 *   2. Servidor — racha diaria persistida en Supabase (currentStreak, maxStreak)
 *
 * La racha "diaria" funciona así:
 *   · Si respondió correctamente hoy → misma racha
 *   · Si respondió ayer → racha + 1
 *   · Si no respondió ayer ni antes → racha reinicia a 1
 *
 * @param {string|null} token  JWT del usuario (de useSession)
 */
export function useStreak(token = null) {
  // ── Racha local (dentro de la sesión) ───────────────────────────
  const [streak,    setStreak]    = useState(0);  // racha de correctas consecutivas en esta sesión
  const [maxStreak, setMaxStreak] = useState(0);  // máx racha de la sesión
  const [score,     setScore]     = useState(0);  // correctas totales en la sesión

  // ── Racha persistida en servidor ────────────────────────────────
  const [currentStreak, setCurrentStreak] = useState(0);  // racha diaria del servidor
  const [serverMax,     setServerMax]     = useState(0);  // máx racha histórica del servidor
  const [loadingStreak, setLoadingStreak] = useState(false);

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Carga la racha del servidor al montar (o cuando cambia el token)
  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    setLoadingStreak(true);

    api.get('/api/streak', token)
      .then(res => {
        if (!mounted.current || controller.signal.aborted) return;
        const s = res.streak;
        setCurrentStreak(s.current_streak ?? 0);
        setServerMax(s.max_streak ?? 0);
      })
      .catch(e => { if (e.name !== 'AbortError') console.error('useStreak load error:', e); })
      .finally(() => { if (mounted.current) setLoadingStreak(false); });

    return () => controller.abort();
  }, [token]);

  // ── record — llamar al responder un ejercicio ────────────────────
  const record = useCallback((correct) => {
    // 1. Actualizar estado local inmediatamente (UX fluida)
    if (correct) {
      setStreak(s => {
        const next = s + 1;
        setMaxStreak(m => Math.max(m, next));
        return next;
      });
      setScore(s => s + 1);
    } else {
      setStreak(0);
    }

    // 2. Persistir en servidor en background (sin bloquear UI)
    if (!token) return;
    api.post('/api/streak', { correct }, token)
      .then(res => {
        if (!mounted.current) return;
        const s = res.streak;
        setCurrentStreak(s.current_streak ?? 0);
        setServerMax(s.max_streak ?? 0);
      })
      .catch(e => console.error('useStreak record error:', e));
  }, [token]);

  // ── reset — al pulsar "Try Again" ────────────────────────────────
  const reset = useCallback(() => {
    setStreak(0);
    setMaxStreak(0);
    setScore(0);
    // No reseteamos currentStreak ni serverMax — son históricos
  }, []);

  return {
    // Racha de sesión (para la UI de ejercicios)
    streak,
    maxStreak,
    score,
    record,
    reset,

    // Racha diaria persistida (para badges, gamificación)
    currentStreak,
    serverMax,
    loadingStreak,
  };
}