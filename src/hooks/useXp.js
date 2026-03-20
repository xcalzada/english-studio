import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../api/client';

// Nombres de niveles — simples para niños de 9-10 años
export const LEVELS = [
  { level: 1, name: 'Beginner',   minXp: 0,    emoji: '🌱' },
  { level: 2, name: 'Explorer',   minXp: 100,  emoji: '🔍' },
  { level: 3, name: 'Learner',    minXp: 250,  emoji: '📚' },
  { level: 4, name: 'Smart',      minXp: 500,  emoji: '⭐' },
  { level: 5, name: 'Expert',     minXp: 1000, emoji: '🏆' },
  { level: 6, name: 'Champion',   minXp: 2000, emoji: '🥇' },
];

export function getLevelInfo(totalXp) {
  const current = [...LEVELS].reverse().find(l => totalXp >= l.minXp) ?? LEVELS[0];
  const next    = LEVELS.find(l => l.level === current.level + 1) ?? null;
  const progress = next
    ? Math.round(((totalXp - current.minXp) / (next.minXp - current.minXp)) * 100)
    : 100;
  return { current, next, progress };
}

/**
 * useXp
 *
 * Gestiona el sistema de puntos de experiencia del usuario.
 *
 * Reglas de XP:
 *   +10  por respuesta correcta
 *   +5   bonus si la racha es ≥ 3
 *   +5   bonus si es la primera vez que hace ese ejercicio
 *    0   por respuesta incorrecta (nunca restar)
 *
 * @param {string|null} token  JWT del usuario
 */
export function useXp(token = null) {
  const [totalXp,   setTotalXp]   = useState(0);
  const [level,     setLevel]     = useState(1);
  const [lastGain,  setLastGain]  = useState(null);  // { amount, levelUp } — para animaciones
  const [loading,   setLoading]   = useState(false);

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Carga XP actual del servidor al montar
  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    setLoading(true);

    api.get('/api/xp', token)
      .then(res => {
        if (!mounted.current || controller.signal.aborted) return;
        setTotalXp(res.xp.total_xp ?? 0);
        setLevel(res.xp.level ?? 1);
      })
      .catch(e => { if (e.name !== 'AbortError') console.error('useXp load error:', e); })
      .finally(() => { if (mounted.current) setLoading(false); });

    return () => controller.abort();
  }, [token]);

  /**
   * award — llamar después de cada respuesta
   * @param {boolean} correct   — respuesta correcta
   * @param {number}  streak    — racha actual de la sesión
   * @param {boolean} isNew     — true si el ejercicio no estaba completado antes
   */
  const award = useCallback(async (correct, streak = 0, isNew = true) => {
    if (!token) return;

    try {
      const res = await api.post('/api/xp', { correct, streak, is_new: isNew }, token);
      if (!mounted.current) return;

      const { total_xp, level: newLevel, xp_gained, level_up } = res.xp;
      setTotalXp(total_xp);
      setLevel(newLevel);

      if (xp_gained > 0) {
        setLastGain({ amount: xp_gained, levelUp: level_up });
        setTimeout(() => {
          if (mounted.current) setLastGain(null);
        }, 2000);
      }
      return xp_gained ?? 0;
    } catch (e) {
      console.error('useXp award error:', e);
      return 0;
    }
  }, [token]);

  const levelInfo = getLevelInfo(totalXp);

  return {
    totalXp,
    level,
    levelInfo,   // { current, next, progress }
    lastGain,    // { amount, levelUp } | null — para mostrar "+15 XP" en pantalla
    loading,
    award,
  };
}