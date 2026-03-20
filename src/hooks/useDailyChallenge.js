import { useState, useEffect, useCallback } from 'react';
import { UNITS_DATA } from '../data';

// Construye el pool de todos los ejercicios disponibles: "unitId:exerciseId"
function buildPool() {
  const pool = [];
  for (const [unitId, unit] of Object.entries(UNITS_DATA)) {
    for (const item of unit.theoryQuiz || []) {
      pool.push(`${unitId}:${item.id}`);
    }
  }
  return pool;
}

export function useDailyChallenge(token) {
  const [challenge,  setChallenge]  = useState(null); // { date, unitId, exerciseId, completed, correct, xp_awarded }
  const [exercise,   setExercise]   = useState(null); // objeto completo del ejercicio
  const [loading,    setLoading]    = useState(false);
  const [xpResult,   setXpResult]   = useState(null); // { xp_awarded, total_xp, level, level_up }

  useEffect(() => {
    if (!token) return;
    const pool = buildPool();
    if (!pool.length) return;

    const controller = new AbortController();
    setLoading(true);

    const params = new URLSearchParams({ pool: pool.join(',') });
    fetch(`/api/daily-challenge?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then(r => r.json())
      .then(data => {
        if (controller.signal.aborted) return;
        const ch = data.challenge;
        setChallenge(ch);
        // Restaurar xpResult si ya estaba completado
        if (ch.completed && ch.xp_awarded) {
          setXpResult({ xp_awarded: ch.xp_awarded });
        }
        const unit = UNITS_DATA[ch.unitId];
        const ex   = (unit?.theoryQuiz || []).find(q => q.id === ch.exerciseId);
        setExercise(ex ?? null);
      })
      .catch(e => { if (e.name !== 'AbortError') console.error('useDailyChallenge:', e); })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [token]);

  const complete = useCallback(async (correct) => {
    if (!token || !challenge || challenge.completed) return;
    try {
      const res = await fetch('/api/daily-challenge', {
        method:  'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body:    JSON.stringify({ correct, exercise_id: challenge.exerciseId }),
      });
      const data = await res.json();

      if (data.ok) {
        setChallenge(prev => ({ ...prev, completed: true, correct }));
        if (data.xp_awarded > 0) {
          setXpResult({
            xp_awarded: data.xp_awarded,
            total_xp:   data.total_xp,
            level:      data.level,
            level_up:   data.level_up,
          });
        }
      }
    } catch (e) {
      console.error('useDailyChallenge complete:', e);
    }
  }, [token, challenge]);

  return { challenge, exercise, loading, complete, xpResult };
}